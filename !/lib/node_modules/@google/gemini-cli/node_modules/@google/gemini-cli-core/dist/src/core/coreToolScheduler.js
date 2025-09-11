/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ToolConfirmationOutcome, ApprovalMode, logToolCall, ToolErrorType, ToolCallEvent, } from '../index.js';
import { getResponseTextFromParts } from '../utils/generateContentResponseUtilities.js';
import { isModifiableDeclarativeTool, modifyWithEditor, } from '../tools/modifiable-tool.js';
import * as Diff from 'diff';
import { doesToolInvocationMatch } from '../utils/tool-utils.js';
import levenshtein from 'fast-levenshtein';
/**
 * Formats tool output for a Gemini FunctionResponse.
 */
function createFunctionResponsePart(callId, toolName, output) {
    return {
        functionResponse: {
            id: callId,
            name: toolName,
            response: { output },
        },
    };
}
export function convertToFunctionResponse(toolName, callId, llmContent) {
    const contentToProcess = Array.isArray(llmContent) && llmContent.length === 1
        ? llmContent[0]
        : llmContent;
    if (typeof contentToProcess === 'string') {
        return [createFunctionResponsePart(callId, toolName, contentToProcess)];
    }
    if (Array.isArray(contentToProcess)) {
        const functionResponse = createFunctionResponsePart(callId, toolName, 'Tool execution succeeded.');
        return [functionResponse, ...toParts(contentToProcess)];
    }
    // After this point, contentToProcess is a single Part object.
    if (contentToProcess.functionResponse) {
        if (contentToProcess.functionResponse.response?.['content']) {
            const stringifiedOutput = getResponseTextFromParts(contentToProcess.functionResponse.response['content']) || '';
            return [createFunctionResponsePart(callId, toolName, stringifiedOutput)];
        }
        // It's a functionResponse that we should pass through as is.
        return [contentToProcess];
    }
    if (contentToProcess.inlineData || contentToProcess.fileData) {
        const mimeType = contentToProcess.inlineData?.mimeType ||
            contentToProcess.fileData?.mimeType ||
            'unknown';
        const functionResponse = createFunctionResponsePart(callId, toolName, `Binary content of type ${mimeType} was processed.`);
        return [functionResponse, contentToProcess];
    }
    if (contentToProcess.text !== undefined) {
        return [
            createFunctionResponsePart(callId, toolName, contentToProcess.text),
        ];
    }
    // Default case for other kinds of parts.
    return [
        createFunctionResponsePart(callId, toolName, 'Tool execution succeeded.'),
    ];
}
function toParts(input) {
    const parts = [];
    for (const part of Array.isArray(input) ? input : [input]) {
        if (typeof part === 'string') {
            parts.push({ text: part });
        }
        else if (part) {
            parts.push(part);
        }
    }
    return parts;
}
const createErrorResponse = (request, error, errorType) => ({
    callId: request.callId,
    error,
    responseParts: [
        {
            functionResponse: {
                id: request.callId,
                name: request.name,
                response: { error: error.message },
            },
        },
    ],
    resultDisplay: error.message,
    errorType,
});
export class CoreToolScheduler {
    toolRegistry;
    toolCalls = [];
    outputUpdateHandler;
    onAllToolCallsComplete;
    onToolCallsUpdate;
    getPreferredEditor;
    config;
    onEditorClose;
    isFinalizingToolCalls = false;
    isScheduling = false;
    requestQueue = [];
    constructor(options) {
        this.config = options.config;
        this.toolRegistry = options.config.getToolRegistry();
        this.outputUpdateHandler = options.outputUpdateHandler;
        this.onAllToolCallsComplete = options.onAllToolCallsComplete;
        this.onToolCallsUpdate = options.onToolCallsUpdate;
        this.getPreferredEditor = options.getPreferredEditor;
        this.onEditorClose = options.onEditorClose;
    }
    setStatusInternal(targetCallId, newStatus, auxiliaryData) {
        this.toolCalls = this.toolCalls.map((currentCall) => {
            if (currentCall.request.callId !== targetCallId ||
                currentCall.status === 'success' ||
                currentCall.status === 'error' ||
                currentCall.status === 'cancelled') {
                return currentCall;
            }
            // currentCall is a non-terminal state here and should have startTime and tool.
            const existingStartTime = currentCall.startTime;
            const toolInstance = currentCall.tool;
            const invocation = currentCall.invocation;
            const outcome = currentCall.outcome;
            switch (newStatus) {
                case 'success': {
                    const durationMs = existingStartTime
                        ? Date.now() - existingStartTime
                        : undefined;
                    return {
                        request: currentCall.request,
                        tool: toolInstance,
                        invocation,
                        status: 'success',
                        response: auxiliaryData,
                        durationMs,
                        outcome,
                    };
                }
                case 'error': {
                    const durationMs = existingStartTime
                        ? Date.now() - existingStartTime
                        : undefined;
                    return {
                        request: currentCall.request,
                        status: 'error',
                        tool: toolInstance,
                        response: auxiliaryData,
                        durationMs,
                        outcome,
                    };
                }
                case 'awaiting_approval':
                    return {
                        request: currentCall.request,
                        tool: toolInstance,
                        status: 'awaiting_approval',
                        confirmationDetails: auxiliaryData,
                        startTime: existingStartTime,
                        outcome,
                        invocation,
                    };
                case 'scheduled':
                    return {
                        request: currentCall.request,
                        tool: toolInstance,
                        status: 'scheduled',
                        startTime: existingStartTime,
                        outcome,
                        invocation,
                    };
                case 'cancelled': {
                    const durationMs = existingStartTime
                        ? Date.now() - existingStartTime
                        : undefined;
                    // Preserve diff for cancelled edit operations
                    let resultDisplay = undefined;
                    if (currentCall.status === 'awaiting_approval') {
                        const waitingCall = currentCall;
                        if (waitingCall.confirmationDetails.type === 'edit') {
                            resultDisplay = {
                                fileDiff: waitingCall.confirmationDetails.fileDiff,
                                fileName: waitingCall.confirmationDetails.fileName,
                                originalContent: waitingCall.confirmationDetails.originalContent,
                                newContent: waitingCall.confirmationDetails.newContent,
                            };
                        }
                    }
                    return {
                        request: currentCall.request,
                        tool: toolInstance,
                        invocation,
                        status: 'cancelled',
                        response: {
                            callId: currentCall.request.callId,
                            responseParts: [
                                {
                                    functionResponse: {
                                        id: currentCall.request.callId,
                                        name: currentCall.request.name,
                                        response: {
                                            error: `[Operation Cancelled] Reason: ${auxiliaryData}`,
                                        },
                                    },
                                },
                            ],
                            resultDisplay,
                            error: undefined,
                            errorType: undefined,
                        },
                        durationMs,
                        outcome,
                    };
                }
                case 'validating':
                    return {
                        request: currentCall.request,
                        tool: toolInstance,
                        status: 'validating',
                        startTime: existingStartTime,
                        outcome,
                        invocation,
                    };
                case 'executing':
                    return {
                        request: currentCall.request,
                        tool: toolInstance,
                        status: 'executing',
                        startTime: existingStartTime,
                        outcome,
                        invocation,
                    };
                default: {
                    const exhaustiveCheck = newStatus;
                    return exhaustiveCheck;
                }
            }
        });
        this.notifyToolCallsUpdate();
        this.checkAndNotifyCompletion();
    }
    setArgsInternal(targetCallId, args) {
        this.toolCalls = this.toolCalls.map((call) => {
            // We should never be asked to set args on an ErroredToolCall, but
            // we guard for the case anyways.
            if (call.request.callId !== targetCallId || call.status === 'error') {
                return call;
            }
            const invocationOrError = this.buildInvocation(call.tool, args);
            if (invocationOrError instanceof Error) {
                const response = createErrorResponse(call.request, invocationOrError, ToolErrorType.INVALID_TOOL_PARAMS);
                return {
                    request: { ...call.request, args: args },
                    status: 'error',
                    tool: call.tool,
                    response,
                };
            }
            return {
                ...call,
                request: { ...call.request, args: args },
                invocation: invocationOrError,
            };
        });
    }
    isRunning() {
        return (this.isFinalizingToolCalls ||
            this.toolCalls.some((call) => call.status === 'executing' || call.status === 'awaiting_approval'));
    }
    buildInvocation(tool, args) {
        try {
            return tool.build(args);
        }
        catch (e) {
            if (e instanceof Error) {
                return e;
            }
            return new Error(String(e));
        }
    }
    /**
     * Generates a suggestion string for a tool name that was not found in the registry.
     * It finds the closest matches based on Levenshtein distance.
     * @param unknownToolName The tool name that was not found.
     * @param topN The number of suggestions to return. Defaults to 3.
     * @returns A suggestion string like " Did you mean 'tool'?" or " Did you mean one of: 'tool1', 'tool2'?", or an empty string if no suggestions are found.
     */
    getToolSuggestion(unknownToolName, topN = 3) {
        const allToolNames = this.toolRegistry.getAllToolNames();
        const matches = allToolNames.map((toolName) => ({
            name: toolName,
            distance: levenshtein.get(unknownToolName, toolName),
        }));
        matches.sort((a, b) => a.distance - b.distance);
        const topNResults = matches.slice(0, topN);
        if (topNResults.length === 0) {
            return '';
        }
        const suggestedNames = topNResults
            .map((match) => `"${match.name}"`)
            .join(', ');
        if (topNResults.length > 1) {
            return ` Did you mean one of: ${suggestedNames}?`;
        }
        else {
            return ` Did you mean ${suggestedNames}?`;
        }
    }
    schedule(request, signal) {
        if (this.isRunning() || this.isScheduling) {
            return new Promise((resolve, reject) => {
                const abortHandler = () => {
                    // Find and remove the request from the queue
                    const index = this.requestQueue.findIndex((item) => item.request === request);
                    if (index > -1) {
                        this.requestQueue.splice(index, 1);
                        reject(new Error('Tool call cancelled while in queue.'));
                    }
                };
                signal.addEventListener('abort', abortHandler, { once: true });
                this.requestQueue.push({
                    request,
                    signal,
                    resolve: () => {
                        signal.removeEventListener('abort', abortHandler);
                        resolve();
                    },
                    reject: (reason) => {
                        signal.removeEventListener('abort', abortHandler);
                        reject(reason);
                    },
                });
            });
        }
        return this._schedule(request, signal);
    }
    async _schedule(request, signal) {
        this.isScheduling = true;
        try {
            if (this.isRunning()) {
                throw new Error('Cannot schedule new tool calls while other tool calls are actively running (executing or awaiting approval).');
            }
            const requestsToProcess = Array.isArray(request) ? request : [request];
            const newToolCalls = requestsToProcess.map((reqInfo) => {
                const toolInstance = this.toolRegistry.getTool(reqInfo.name);
                if (!toolInstance) {
                    const suggestion = this.getToolSuggestion(reqInfo.name);
                    const errorMessage = `Tool "${reqInfo.name}" not found in registry. Tools must use the exact names that are registered.${suggestion}`;
                    return {
                        status: 'error',
                        request: reqInfo,
                        response: createErrorResponse(reqInfo, new Error(errorMessage), ToolErrorType.TOOL_NOT_REGISTERED),
                        durationMs: 0,
                    };
                }
                const invocationOrError = this.buildInvocation(toolInstance, reqInfo.args);
                if (invocationOrError instanceof Error) {
                    return {
                        status: 'error',
                        request: reqInfo,
                        tool: toolInstance,
                        response: createErrorResponse(reqInfo, invocationOrError, ToolErrorType.INVALID_TOOL_PARAMS),
                        durationMs: 0,
                    };
                }
                return {
                    status: 'validating',
                    request: reqInfo,
                    tool: toolInstance,
                    invocation: invocationOrError,
                    startTime: Date.now(),
                };
            });
            this.toolCalls = this.toolCalls.concat(newToolCalls);
            this.notifyToolCallsUpdate();
            for (const toolCall of newToolCalls) {
                if (toolCall.status !== 'validating') {
                    continue;
                }
                const { request: reqInfo, invocation } = toolCall;
                try {
                    if (signal.aborted) {
                        this.setStatusInternal(reqInfo.callId, 'cancelled', 'Tool call cancelled by user.');
                        continue;
                    }
                    const confirmationDetails = await invocation.shouldConfirmExecute(signal);
                    if (!confirmationDetails) {
                        this.setToolCallOutcome(reqInfo.callId, ToolConfirmationOutcome.ProceedAlways);
                        this.setStatusInternal(reqInfo.callId, 'scheduled');
                        continue;
                    }
                    const allowedTools = this.config.getAllowedTools() || [];
                    if (this.config.getApprovalMode() === ApprovalMode.YOLO ||
                        doesToolInvocationMatch(toolCall.tool, invocation, allowedTools)) {
                        this.setToolCallOutcome(reqInfo.callId, ToolConfirmationOutcome.ProceedAlways);
                        this.setStatusInternal(reqInfo.callId, 'scheduled');
                    }
                    else {
                        // Allow IDE to resolve confirmation
                        if (confirmationDetails.type === 'edit' &&
                            confirmationDetails.ideConfirmation) {
                            confirmationDetails.ideConfirmation.then((resolution) => {
                                if (resolution.status === 'accepted') {
                                    this.handleConfirmationResponse(reqInfo.callId, confirmationDetails.onConfirm, ToolConfirmationOutcome.ProceedOnce, signal);
                                }
                                else {
                                    this.handleConfirmationResponse(reqInfo.callId, confirmationDetails.onConfirm, ToolConfirmationOutcome.Cancel, signal);
                                }
                            });
                        }
                        const originalOnConfirm = confirmationDetails.onConfirm;
                        const wrappedConfirmationDetails = {
                            ...confirmationDetails,
                            onConfirm: (outcome, payload) => this.handleConfirmationResponse(reqInfo.callId, originalOnConfirm, outcome, signal, payload),
                        };
                        this.setStatusInternal(reqInfo.callId, 'awaiting_approval', wrappedConfirmationDetails);
                    }
                }
                catch (error) {
                    this.setStatusInternal(reqInfo.callId, 'error', createErrorResponse(reqInfo, error instanceof Error ? error : new Error(String(error)), ToolErrorType.UNHANDLED_EXCEPTION));
                }
            }
            this.attemptExecutionOfScheduledCalls(signal);
            void this.checkAndNotifyCompletion();
        }
        finally {
            this.isScheduling = false;
        }
    }
    async handleConfirmationResponse(callId, originalOnConfirm, outcome, signal, payload) {
        const toolCall = this.toolCalls.find((c) => c.request.callId === callId && c.status === 'awaiting_approval');
        if (toolCall && toolCall.status === 'awaiting_approval') {
            await originalOnConfirm(outcome);
        }
        if (outcome === ToolConfirmationOutcome.ProceedAlways) {
            await this.autoApproveCompatiblePendingTools(signal, callId);
        }
        this.setToolCallOutcome(callId, outcome);
        if (outcome === ToolConfirmationOutcome.Cancel || signal.aborted) {
            this.setStatusInternal(callId, 'cancelled', 'User did not allow tool call');
        }
        else if (outcome === ToolConfirmationOutcome.ModifyWithEditor) {
            const waitingToolCall = toolCall;
            if (isModifiableDeclarativeTool(waitingToolCall.tool)) {
                const modifyContext = waitingToolCall.tool.getModifyContext(signal);
                const editorType = this.getPreferredEditor();
                if (!editorType) {
                    return;
                }
                this.setStatusInternal(callId, 'awaiting_approval', {
                    ...waitingToolCall.confirmationDetails,
                    isModifying: true,
                });
                const { updatedParams, updatedDiff } = await modifyWithEditor(waitingToolCall.request.args, modifyContext, editorType, signal, this.onEditorClose);
                this.setArgsInternal(callId, updatedParams);
                this.setStatusInternal(callId, 'awaiting_approval', {
                    ...waitingToolCall.confirmationDetails,
                    fileDiff: updatedDiff,
                    isModifying: false,
                });
            }
        }
        else {
            // If the client provided new content, apply it before scheduling.
            if (payload?.newContent && toolCall) {
                await this._applyInlineModify(toolCall, payload, signal);
            }
            this.setStatusInternal(callId, 'scheduled');
        }
        this.attemptExecutionOfScheduledCalls(signal);
    }
    /**
     * Applies user-provided content changes to a tool call that is awaiting confirmation.
     * This method updates the tool's arguments and refreshes the confirmation prompt with a new diff
     * before the tool is scheduled for execution.
     * @private
     */
    async _applyInlineModify(toolCall, payload, signal) {
        if (toolCall.confirmationDetails.type !== 'edit' ||
            !isModifiableDeclarativeTool(toolCall.tool)) {
            return;
        }
        const modifyContext = toolCall.tool.getModifyContext(signal);
        const currentContent = await modifyContext.getCurrentContent(toolCall.request.args);
        const updatedParams = modifyContext.createUpdatedParams(currentContent, payload.newContent, toolCall.request.args);
        const updatedDiff = Diff.createPatch(modifyContext.getFilePath(toolCall.request.args), currentContent, payload.newContent, 'Current', 'Proposed');
        this.setArgsInternal(toolCall.request.callId, updatedParams);
        this.setStatusInternal(toolCall.request.callId, 'awaiting_approval', {
            ...toolCall.confirmationDetails,
            fileDiff: updatedDiff,
        });
    }
    attemptExecutionOfScheduledCalls(signal) {
        const allCallsFinalOrScheduled = this.toolCalls.every((call) => call.status === 'scheduled' ||
            call.status === 'cancelled' ||
            call.status === 'success' ||
            call.status === 'error');
        if (allCallsFinalOrScheduled) {
            const callsToExecute = this.toolCalls.filter((call) => call.status === 'scheduled');
            callsToExecute.forEach((toolCall) => {
                if (toolCall.status !== 'scheduled')
                    return;
                const scheduledCall = toolCall;
                const { callId, name: toolName } = scheduledCall.request;
                const invocation = scheduledCall.invocation;
                this.setStatusInternal(callId, 'executing');
                const liveOutputCallback = scheduledCall.tool.canUpdateOutput && this.outputUpdateHandler
                    ? (outputChunk) => {
                        if (this.outputUpdateHandler) {
                            this.outputUpdateHandler(callId, outputChunk);
                        }
                        this.toolCalls = this.toolCalls.map((tc) => tc.request.callId === callId && tc.status === 'executing'
                            ? { ...tc, liveOutput: outputChunk }
                            : tc);
                        this.notifyToolCallsUpdate();
                    }
                    : undefined;
                invocation
                    .execute(signal, liveOutputCallback)
                    .then(async (toolResult) => {
                    if (signal.aborted) {
                        this.setStatusInternal(callId, 'cancelled', 'User cancelled tool execution.');
                        return;
                    }
                    if (toolResult.error === undefined) {
                        const response = convertToFunctionResponse(toolName, callId, toolResult.llmContent);
                        const successResponse = {
                            callId,
                            responseParts: response,
                            resultDisplay: toolResult.returnDisplay,
                            error: undefined,
                            errorType: undefined,
                        };
                        this.setStatusInternal(callId, 'success', successResponse);
                    }
                    else {
                        // It is a failure
                        const error = new Error(toolResult.error.message);
                        const errorResponse = createErrorResponse(scheduledCall.request, error, toolResult.error.type);
                        this.setStatusInternal(callId, 'error', errorResponse);
                    }
                })
                    .catch((executionError) => {
                    this.setStatusInternal(callId, 'error', createErrorResponse(scheduledCall.request, executionError instanceof Error
                        ? executionError
                        : new Error(String(executionError)), ToolErrorType.UNHANDLED_EXCEPTION));
                });
            });
        }
    }
    async checkAndNotifyCompletion() {
        const allCallsAreTerminal = this.toolCalls.every((call) => call.status === 'success' ||
            call.status === 'error' ||
            call.status === 'cancelled');
        if (this.toolCalls.length > 0 && allCallsAreTerminal) {
            const completedCalls = [...this.toolCalls];
            this.toolCalls = [];
            for (const call of completedCalls) {
                logToolCall(this.config, new ToolCallEvent(call));
            }
            if (this.onAllToolCallsComplete) {
                this.isFinalizingToolCalls = true;
                await this.onAllToolCallsComplete(completedCalls);
                this.isFinalizingToolCalls = false;
            }
            this.notifyToolCallsUpdate();
            // After completion, process the next item in the queue.
            if (this.requestQueue.length > 0) {
                const next = this.requestQueue.shift();
                this._schedule(next.request, next.signal)
                    .then(next.resolve)
                    .catch(next.reject);
            }
        }
    }
    notifyToolCallsUpdate() {
        if (this.onToolCallsUpdate) {
            this.onToolCallsUpdate([...this.toolCalls]);
        }
    }
    setToolCallOutcome(callId, outcome) {
        this.toolCalls = this.toolCalls.map((call) => {
            if (call.request.callId !== callId)
                return call;
            return {
                ...call,
                outcome,
            };
        });
    }
    async autoApproveCompatiblePendingTools(signal, triggeringCallId) {
        const pendingTools = this.toolCalls.filter((call) => call.status === 'awaiting_approval' &&
            call.request.callId !== triggeringCallId);
        for (const pendingTool of pendingTools) {
            try {
                const stillNeedsConfirmation = await pendingTool.invocation.shouldConfirmExecute(signal);
                if (!stillNeedsConfirmation) {
                    this.setToolCallOutcome(pendingTool.request.callId, ToolConfirmationOutcome.ProceedAlways);
                    this.setStatusInternal(pendingTool.request.callId, 'scheduled');
                }
            }
            catch (error) {
                console.error(`Error checking confirmation for tool ${pendingTool.request.callId}:`, error);
            }
        }
    }
}
//# sourceMappingURL=coreToolScheduler.js.map