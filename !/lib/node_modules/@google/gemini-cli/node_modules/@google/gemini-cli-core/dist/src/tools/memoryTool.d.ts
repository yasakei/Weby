/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ToolEditConfirmationDetails, ToolResult } from './tools.js';
import { BaseDeclarativeTool, BaseToolInvocation } from './tools.js';
import type { ModifiableDeclarativeTool, ModifyContext } from './modifiable-tool.js';
export declare const GEMINI_CONFIG_DIR = ".gemini";
export declare const DEFAULT_CONTEXT_FILENAME = "GEMINI.md";
export declare const MEMORY_SECTION_HEADER = "## Gemini Added Memories";
export declare function setGeminiMdFilename(newFilename: string | string[]): void;
export declare function getCurrentGeminiMdFilename(): string;
export declare function getAllGeminiMdFilenames(): string[];
interface SaveMemoryParams {
    fact: string;
    modified_by_user?: boolean;
    modified_content?: string;
}
declare class MemoryToolInvocation extends BaseToolInvocation<SaveMemoryParams, ToolResult> {
    private static readonly allowlist;
    getDescription(): string;
    shouldConfirmExecute(_abortSignal: AbortSignal): Promise<ToolEditConfirmationDetails | false>;
    execute(_signal: AbortSignal): Promise<ToolResult>;
}
export declare class MemoryTool extends BaseDeclarativeTool<SaveMemoryParams, ToolResult> implements ModifiableDeclarativeTool<SaveMemoryParams> {
    static readonly Name: string;
    constructor();
    protected validateToolParamValues(params: SaveMemoryParams): string | null;
    protected createInvocation(params: SaveMemoryParams): MemoryToolInvocation;
    static performAddMemoryEntry(text: string, memoryFilePath: string, fsAdapter: {
        readFile: (path: string, encoding: 'utf-8') => Promise<string>;
        writeFile: (path: string, data: string, encoding: 'utf-8') => Promise<void>;
        mkdir: (path: string, options: {
            recursive: boolean;
        }) => Promise<string | undefined>;
    }): Promise<void>;
    getModifyContext(_abortSignal: AbortSignal): ModifyContext<SaveMemoryParams>;
}
export {};
