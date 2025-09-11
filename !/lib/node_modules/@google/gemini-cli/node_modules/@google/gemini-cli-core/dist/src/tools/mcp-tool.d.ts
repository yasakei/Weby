/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ToolInvocation, ToolResult } from './tools.js';
import { BaseDeclarativeTool } from './tools.js';
import type { CallableTool } from '@google/genai';
import type { Config } from '../config/config.js';
type ToolParams = Record<string, unknown>;
export declare class DiscoveredMCPTool extends BaseDeclarativeTool<ToolParams, ToolResult> {
    private readonly mcpTool;
    readonly serverName: string;
    readonly serverToolName: string;
    readonly parameterSchema: unknown;
    readonly trust?: boolean | undefined;
    private readonly cliConfig?;
    constructor(mcpTool: CallableTool, serverName: string, serverToolName: string, description: string, parameterSchema: unknown, trust?: boolean | undefined, nameOverride?: string, cliConfig?: Config | undefined);
    asFullyQualifiedTool(): DiscoveredMCPTool;
    protected createInvocation(params: ToolParams): ToolInvocation<ToolParams, ToolResult>;
}
/** Visible for testing */
export declare function generateValidName(name: string): string;
export {};
