/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Config } from '../config/config.js';
import type { ToolInvocation, ToolResult } from './tools.js';
import { BaseDeclarativeTool } from './tools.js';
export declare const OUTPUT_UPDATE_INTERVAL_MS = 1000;
export interface ShellToolParams {
    command: string;
    description?: string;
    directory?: string;
}
export declare class ShellTool extends BaseDeclarativeTool<ShellToolParams, ToolResult> {
    private readonly config;
    static Name: string;
    private allowlist;
    constructor(config: Config);
    protected validateToolParamValues(params: ShellToolParams): string | null;
    protected createInvocation(params: ShellToolParams): ToolInvocation<ShellToolParams, ToolResult>;
}
