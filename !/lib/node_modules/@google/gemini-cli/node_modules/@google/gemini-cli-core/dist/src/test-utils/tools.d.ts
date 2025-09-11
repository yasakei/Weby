/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ToolCallConfirmationDetails, ToolInvocation, ToolResult } from '../tools/tools.js';
import { BaseDeclarativeTool, BaseToolInvocation } from '../tools/tools.js';
import type { ModifiableDeclarativeTool, ModifyContext } from '../tools/modifiable-tool.js';
/**
 * A highly configurable mock tool for testing purposes.
 */
export declare class MockTool extends BaseDeclarativeTool<{
    [key: string]: unknown;
}, ToolResult> {
    executeFn: import("vitest").Mock<(...args: any[]) => any>;
    shouldConfirm: boolean;
    constructor(name?: string, displayName?: string, description?: string, params?: {
        type: string;
        properties: {
            param: {
                type: string;
            };
        };
    });
    protected createInvocation(params: {
        [key: string]: unknown;
    }): ToolInvocation<{
        [key: string]: unknown;
    }, ToolResult>;
}
export declare class MockModifiableToolInvocation extends BaseToolInvocation<Record<string, unknown>, ToolResult> {
    private readonly tool;
    constructor(tool: MockModifiableTool, params: Record<string, unknown>);
    execute(_abortSignal: AbortSignal): Promise<ToolResult>;
    shouldConfirmExecute(_abortSignal: AbortSignal): Promise<ToolCallConfirmationDetails | false>;
    getDescription(): string;
}
/**
 * Configurable mock modifiable tool for testing.
 */
export declare class MockModifiableTool extends MockTool implements ModifiableDeclarativeTool<Record<string, unknown>> {
    constructor(name?: string);
    getModifyContext(_abortSignal: AbortSignal): ModifyContext<Record<string, unknown>>;
    protected createInvocation(params: Record<string, unknown>): ToolInvocation<Record<string, unknown>, ToolResult>;
}
