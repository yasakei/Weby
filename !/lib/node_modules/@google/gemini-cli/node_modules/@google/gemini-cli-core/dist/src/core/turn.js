/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { getResponseText } from '../utils/partUtils.js';
import { reportError } from '../utils/errorReporting.js';
import { getErrorMessage, UnauthorizedError, toFriendlyError, } from '../utils/errors.js';
export var GeminiEventType;
(function (GeminiEventType) {
    GeminiEventType["Content"] = "content";
    GeminiEventType["ToolCallRequest"] = "tool_call_request";
    GeminiEventType["ToolCallResponse"] = "tool_call_response";
    GeminiEventType["ToolCallConfirmation"] = "tool_call_confirmation";
    GeminiEventType["UserCancelled"] = "user_cancelled";
    GeminiEventType["Error"] = "error";
    GeminiEventType["ChatCompressed"] = "chat_compressed";
    GeminiEventType["Thought"] = "thought";
    GeminiEventType["MaxSessionTurns"] = "max_session_turns";
    GeminiEventType["Finished"] = "finished";
    GeminiEventType["LoopDetected"] = "loop_detected";
    GeminiEventType["Citation"] = "citation";
    GeminiEventType["Retry"] = "retry";
})(GeminiEventType || (GeminiEventType = {}));
export var CompressionStatus;
(function (CompressionStatus) {
    /** The compression was successful */
    CompressionStatus[CompressionStatus["COMPRESSED"] = 1] = "COMPRESSED";
    /** The compression failed due to the compression inflating the token count */
    CompressionStatus[CompressionStatus["COMPRESSION_FAILED_INFLATED_TOKEN_COUNT"] = 2] = "COMPRESSION_FAILED_INFLATED_TOKEN_COUNT";
    /** The compression failed due to an error counting tokens */
    CompressionStatus[CompressionStatus["COMPRESSION_FAILED_TOKEN_COUNT_ERROR"] = 3] = "COMPRESSION_FAILED_TOKEN_COUNT_ERROR";
    /** The compression was not necessary and no action was taken */
    CompressionStatus[CompressionStatus["NOOP"] = 4] = "NOOP";
})(CompressionStatus || (CompressionStatus = {}));
// A turn manages the agentic loop turn within the server context.
export class Turn {
    chat;
    prompt_id;
    pendingToolCalls = [];
    debugResponses = [];
    pendingCitations = new Set();
    finishReason = undefined;
    constructor(chat, prompt_id) {
        this.chat = chat;
        this.prompt_id = prompt_id;
    }
    // The run method yields simpler events suitable for server logic
    async *run(req, signal) {
        try {
            // Note: This assumes `sendMessageStream` yields events like
            // { type: StreamEventType.RETRY } or { type: StreamEventType.CHUNK, value: GenerateContentResponse }
            const responseStream = await this.chat.sendMessageStream({
                message: req,
                config: {
                    abortSignal: signal,
                },
            }, this.prompt_id);
            for await (const streamEvent of responseStream) {
                if (signal?.aborted) {
                    yield { type: GeminiEventType.UserCancelled };
                    return;
                }
                // Handle the new RETRY event
                if (streamEvent.type === 'retry') {
                    yield { type: GeminiEventType.Retry };
                    continue; // Skip to the next event in the stream
                }
                // Assuming other events are chunks with a `value` property
                const resp = streamEvent.value;
                if (!resp)
                    continue; // Skip if there's no response body
                this.debugResponses.push(resp);
                const thoughtPart = resp.candidates?.[0]?.content?.parts?.[0];
                if (thoughtPart?.thought) {
                    // Thought always has a bold "subject" part enclosed in double asterisks
                    // (e.g., **Subject**). The rest of the string is considered the description.
                    const rawText = thoughtPart.text ?? '';
                    const subjectStringMatches = rawText.match(/\*\*(.*?)\*\*/s);
                    const subject = subjectStringMatches
                        ? subjectStringMatches[1].trim()
                        : '';
                    const description = rawText.replace(/\*\*(.*?)\*\*/s, '').trim();
                    const thought = {
                        subject,
                        description,
                    };
                    yield {
                        type: GeminiEventType.Thought,
                        value: thought,
                    };
                    continue;
                }
                const text = getResponseText(resp);
                if (text) {
                    yield { type: GeminiEventType.Content, value: text };
                }
                // Handle function calls (requesting tool execution)
                const functionCalls = resp.functionCalls ?? [];
                for (const fnCall of functionCalls) {
                    const event = this.handlePendingFunctionCall(fnCall);
                    if (event) {
                        yield event;
                    }
                }
                for (const citation of getCitations(resp)) {
                    this.pendingCitations.add(citation);
                }
                // Check if response was truncated or stopped for various reasons
                const finishReason = resp.candidates?.[0]?.finishReason;
                // This is the key change: Only yield 'Finished' if there is a finishReason.
                if (finishReason) {
                    if (this.pendingCitations.size > 0) {
                        yield {
                            type: GeminiEventType.Citation,
                            value: `Citations:\n${[...this.pendingCitations].sort().join('\n')}`,
                        };
                        this.pendingCitations.clear();
                    }
                    this.finishReason = finishReason;
                    yield {
                        type: GeminiEventType.Finished,
                        value: {
                            reason: finishReason,
                            usageMetadata: resp.usageMetadata,
                        },
                    };
                }
            }
        }
        catch (e) {
            if (signal.aborted) {
                yield { type: GeminiEventType.UserCancelled };
                // Regular cancellation error, fail gracefully.
                return;
            }
            const error = toFriendlyError(e);
            if (error instanceof UnauthorizedError) {
                throw error;
            }
            const contextForReport = [...this.chat.getHistory(/*curated*/ true), req];
            await reportError(error, 'Error when talking to Gemini API', contextForReport, 'Turn.run-sendMessageStream');
            const status = typeof error === 'object' &&
                error !== null &&
                'status' in error &&
                typeof error.status === 'number'
                ? error.status
                : undefined;
            const structuredError = {
                message: getErrorMessage(error),
                status,
            };
            await this.chat.maybeIncludeSchemaDepthContext(structuredError);
            yield { type: GeminiEventType.Error, value: { error: structuredError } };
            return;
        }
    }
    handlePendingFunctionCall(fnCall) {
        const callId = fnCall.id ??
            `${fnCall.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const name = fnCall.name || 'undefined_tool_name';
        const args = (fnCall.args || {});
        const toolCallRequest = {
            callId,
            name,
            args,
            isClientInitiated: false,
            prompt_id: this.prompt_id,
        };
        this.pendingToolCalls.push(toolCallRequest);
        // Yield a request for the tool call, not the pending/confirming status
        return { type: GeminiEventType.ToolCallRequest, value: toolCallRequest };
    }
    getDebugResponses() {
        return this.debugResponses;
    }
}
function getCitations(resp) {
    return (resp.candidates?.[0]?.citationMetadata?.citations ?? [])
        .filter((citation) => citation.uri !== undefined)
        .map((citation) => {
        if (citation.title) {
            return `(${citation.title}) ${citation.uri}`;
        }
        return citation.uri;
    });
}
//# sourceMappingURL=turn.js.map