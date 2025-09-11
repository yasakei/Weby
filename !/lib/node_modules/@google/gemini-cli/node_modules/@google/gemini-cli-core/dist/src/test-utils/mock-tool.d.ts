/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ToolCallConfirmationDetails, ToolInvocation, ToolResult } from '../tools/tools.js';
import { BaseDeclarativeTool } from '../tools/tools.js';
interface MockToolOptions {
    name: string;
    displayName?: string;
    description?: string;
    canUpdateOutput?: boolean;
    isOutputMarkdown?: boolean;
    shouldConfirmExecute?: (params: {
        [key: string]: unknown;
    }, signal: AbortSignal) => Promise<ToolCallConfirmationDetails | false>;
    execute?: (params: {
        [key: string]: unknown;
    }, signal: AbortSignal, updateOutput?: (output: string) => void) => Promise<ToolResult>;
    params?: object;
}
/**
 * A highly configurable mock tool for testing purposes.
 */
export declare class MockTool extends BaseDeclarativeTool<{
    [key: string]: unknown;
}, ToolResult> {
    shouldConfirmExecute: (params: {
        [key: string]: unknown;
    }, signal: AbortSignal) => Promise<ToolCallConfirmationDetails | false>;
    execute: (params: {
        [key: string]: unknown;
    }, signal: AbortSignal, updateOutput?: (output: string) => void) => Promise<ToolResult>;
    constructor(options: MockToolOptions);
    protected createInvocation(params: {
        [key: string]: unknown;
    }): ToolInvocation<{
        [key: string]: unknown;
    }, ToolResult>;
}
export {};
