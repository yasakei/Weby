/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CoreToolScheduler } from './coreToolScheduler.js';
/**
 * Executes a single tool call non-interactively by leveraging the CoreToolScheduler.
 */
export async function executeToolCall(config, toolCallRequest, abortSignal) {
    return new Promise((resolve, reject) => {
        new CoreToolScheduler({
            config,
            getPreferredEditor: () => undefined,
            onEditorClose: () => { },
            onAllToolCallsComplete: async (completedToolCalls) => {
                resolve(completedToolCalls[0].response);
            },
        })
            .schedule(toolCallRequest, abortSignal)
            .catch(reject);
    });
}
//# sourceMappingURL=nonInteractiveToolExecutor.js.map