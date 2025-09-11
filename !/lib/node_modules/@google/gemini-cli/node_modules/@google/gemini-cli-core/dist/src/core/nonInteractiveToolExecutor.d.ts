/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ToolCallRequestInfo, ToolCallResponseInfo, Config } from '../index.js';
/**
 * Executes a single tool call non-interactively by leveraging the CoreToolScheduler.
 */
export declare function executeToolCall(config: Config, toolCallRequest: ToolCallRequestInfo, abortSignal: AbortSignal): Promise<ToolCallResponseInfo>;
