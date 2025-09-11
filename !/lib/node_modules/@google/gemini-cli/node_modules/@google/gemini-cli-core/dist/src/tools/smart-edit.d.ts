/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseDeclarativeTool, type ToolInvocation, type ToolResult } from './tools.js';
import { ToolErrorType } from './tool-error.js';
import { type Config } from '../config/config.js';
import { type ModifiableDeclarativeTool, type ModifyContext } from './modifiable-tool.js';
export declare function applyReplacement(currentContent: string | null, oldString: string, newString: string, isNewFile: boolean): string;
interface ReplacementContext {
    params: EditToolParams;
    currentContent: string;
    abortSignal: AbortSignal;
}
interface ReplacementResult {
    newContent: string;
    occurrences: number;
    finalOldString: string;
    finalNewString: string;
}
export declare function calculateReplacement(context: ReplacementContext): Promise<ReplacementResult>;
export declare function getErrorReplaceResult(params: EditToolParams, occurrences: number, expectedReplacements: number, finalOldString: string, finalNewString: string): {
    display: string;
    raw: string;
    type: ToolErrorType;
} | undefined;
/**
 * Parameters for the Edit tool
 */
export interface EditToolParams {
    /**
     * The absolute path to the file to modify
     */
    file_path: string;
    /**
     * The text to replace
     */
    old_string: string;
    /**
     * The text to replace it with
     */
    new_string: string;
    /**
     * The instruction for what needs to be done.
     */
    instruction: string;
    /**
     * Whether the edit was modified manually by the user.
     */
    modified_by_user?: boolean;
    /**
     * Initially proposed string.
     */
    ai_proposed_string?: string;
}
/**
 * Implementation of the Edit tool logic
 */
export declare class SmartEditTool extends BaseDeclarativeTool<EditToolParams, ToolResult> implements ModifiableDeclarativeTool<EditToolParams> {
    private readonly config;
    static readonly Name = "replace";
    constructor(config: Config);
    /**
     * Validates the parameters for the Edit tool
     * @param params Parameters to validate
     * @returns Error message string or null if valid
     */
    protected validateToolParamValues(params: EditToolParams): string | null;
    protected createInvocation(params: EditToolParams): ToolInvocation<EditToolParams, ToolResult>;
    getModifyContext(_: AbortSignal): ModifyContext<EditToolParams>;
}
export {};
