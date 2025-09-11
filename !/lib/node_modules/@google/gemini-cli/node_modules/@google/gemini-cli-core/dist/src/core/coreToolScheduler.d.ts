/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ToolCallRequestInfo, ToolCallResponseInfo, ToolCallConfirmationDetails, EditorType, Config, ToolConfirmationPayload, AnyDeclarativeTool, AnyToolInvocation } from '../index.js';
import { ToolConfirmationOutcome } from '../index.js';
import type { Part, PartListUnion } from '@google/genai';
export type ValidatingToolCall = {
    status: 'validating';
    request: ToolCallRequestInfo;
    tool: AnyDeclarativeTool;
    invocation: AnyToolInvocation;
    startTime?: number;
    outcome?: ToolConfirmationOutcome;
};
export type ScheduledToolCall = {
    status: 'scheduled';
    request: ToolCallRequestInfo;
    tool: AnyDeclarativeTool;
    invocation: AnyToolInvocation;
    startTime?: number;
    outcome?: ToolConfirmationOutcome;
};
export type ErroredToolCall = {
    status: 'error';
    request: ToolCallRequestInfo;
    response: ToolCallResponseInfo;
    tool?: AnyDeclarativeTool;
    durationMs?: number;
    outcome?: ToolConfirmationOutcome;
};
export type SuccessfulToolCall = {
    status: 'success';
    request: ToolCallRequestInfo;
    tool: AnyDeclarativeTool;
    response: ToolCallResponseInfo;
    invocation: AnyToolInvocation;
    durationMs?: number;
    outcome?: ToolConfirmationOutcome;
};
export type ExecutingToolCall = {
    status: 'executing';
    request: ToolCallRequestInfo;
    tool: AnyDeclarativeTool;
    invocation: AnyToolInvocation;
    liveOutput?: string;
    startTime?: number;
    outcome?: ToolConfirmationOutcome;
};
export type CancelledToolCall = {
    status: 'cancelled';
    request: ToolCallRequestInfo;
    response: ToolCallResponseInfo;
    tool: AnyDeclarativeTool;
    invocation: AnyToolInvocation;
    durationMs?: number;
    outcome?: ToolConfirmationOutcome;
};
export type WaitingToolCall = {
    status: 'awaiting_approval';
    request: ToolCallRequestInfo;
    tool: AnyDeclarativeTool;
    invocation: AnyToolInvocation;
    confirmationDetails: ToolCallConfirmationDetails;
    startTime?: number;
    outcome?: ToolConfirmationOutcome;
};
export type Status = ToolCall['status'];
export type ToolCall = ValidatingToolCall | ScheduledToolCall | ErroredToolCall | SuccessfulToolCall | ExecutingToolCall | CancelledToolCall | WaitingToolCall;
export type CompletedToolCall = SuccessfulToolCall | CancelledToolCall | ErroredToolCall;
export type ConfirmHandler = (toolCall: WaitingToolCall) => Promise<ToolConfirmationOutcome>;
export type OutputUpdateHandler = (toolCallId: string, outputChunk: string) => void;
export type AllToolCallsCompleteHandler = (completedToolCalls: CompletedToolCall[]) => Promise<void>;
export type ToolCallsUpdateHandler = (toolCalls: ToolCall[]) => void;
export declare function convertToFunctionResponse(toolName: string, callId: string, llmContent: PartListUnion): Part[];
interface CoreToolSchedulerOptions {
    config: Config;
    outputUpdateHandler?: OutputUpdateHandler;
    onAllToolCallsComplete?: AllToolCallsCompleteHandler;
    onToolCallsUpdate?: ToolCallsUpdateHandler;
    getPreferredEditor: () => EditorType | undefined;
    onEditorClose: () => void;
}
export declare class CoreToolScheduler {
    private toolRegistry;
    private toolCalls;
    private outputUpdateHandler?;
    private onAllToolCallsComplete?;
    private onToolCallsUpdate?;
    private getPreferredEditor;
    private config;
    private onEditorClose;
    private isFinalizingToolCalls;
    private isScheduling;
    private requestQueue;
    constructor(options: CoreToolSchedulerOptions);
    private setStatusInternal;
    private setArgsInternal;
    private isRunning;
    private buildInvocation;
    /**
     * Generates a suggestion string for a tool name that was not found in the registry.
     * It finds the closest matches based on Levenshtein distance.
     * @param unknownToolName The tool name that was not found.
     * @param topN The number of suggestions to return. Defaults to 3.
     * @returns A suggestion string like " Did you mean 'tool'?" or " Did you mean one of: 'tool1', 'tool2'?", or an empty string if no suggestions are found.
     */
    private getToolSuggestion;
    schedule(request: ToolCallRequestInfo | ToolCallRequestInfo[], signal: AbortSignal): Promise<void>;
    private _schedule;
    handleConfirmationResponse(callId: string, originalOnConfirm: (outcome: ToolConfirmationOutcome) => Promise<void>, outcome: ToolConfirmationOutcome, signal: AbortSignal, payload?: ToolConfirmationPayload): Promise<void>;
    /**
     * Applies user-provided content changes to a tool call that is awaiting confirmation.
     * This method updates the tool's arguments and refreshes the confirmation prompt with a new diff
     * before the tool is scheduled for execution.
     * @private
     */
    private _applyInlineModify;
    private attemptExecutionOfScheduledCalls;
    private checkAndNotifyCompletion;
    private notifyToolCallsUpdate;
    private setToolCallOutcome;
    private autoApproveCompatiblePendingTools;
}
export {};
