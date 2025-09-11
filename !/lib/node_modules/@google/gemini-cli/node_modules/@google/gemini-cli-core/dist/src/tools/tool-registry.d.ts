/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { FunctionDeclaration } from '@google/genai';
import type { AnyDeclarativeTool, ToolResult, ToolInvocation } from './tools.js';
import { BaseDeclarativeTool } from './tools.js';
import type { Config } from '../config/config.js';
import type { EventEmitter } from 'node:events';
type ToolParams = Record<string, unknown>;
export declare class DiscoveredTool extends BaseDeclarativeTool<ToolParams, ToolResult> {
    private readonly config;
    readonly description: string;
    readonly parameterSchema: Record<string, unknown>;
    constructor(config: Config, name: string, description: string, parameterSchema: Record<string, unknown>);
    protected createInvocation(params: ToolParams): ToolInvocation<ToolParams, ToolResult>;
}
export declare class ToolRegistry {
    private tools;
    private config;
    private mcpClientManager;
    constructor(config: Config, eventEmitter?: EventEmitter);
    /**
     * Registers a tool definition.
     * @param tool - The tool object containing schema and execution logic.
     */
    registerTool(tool: AnyDeclarativeTool): void;
    private removeDiscoveredTools;
    /**
     * Removes all tools from a specific MCP server.
     * @param serverName The name of the server to remove tools from.
     */
    removeMcpToolsByServer(serverName: string): void;
    /**
     * Discovers tools from project (if available and configured).
     * Can be called multiple times to update discovered tools.
     * This will discover tools from the command line and from MCP servers.
     */
    discoverAllTools(): Promise<void>;
    /**
     * Discovers tools from project (if available and configured).
     * Can be called multiple times to update discovered tools.
     * This will NOT discover tools from the command line, only from MCP servers.
     */
    discoverMcpTools(): Promise<void>;
    /**
     * Restarts all MCP servers and re-discovers tools.
     */
    restartMcpServers(): Promise<void>;
    /**
     * Discover or re-discover tools for a single MCP server.
     * @param serverName - The name of the server to discover tools from.
     */
    discoverToolsForServer(serverName: string): Promise<void>;
    private discoverAndRegisterToolsFromCommand;
    /**
     * Retrieves the list of tool schemas (FunctionDeclaration array).
     * Extracts the declarations from the ToolListUnion structure.
     * Includes discovered (vs registered) tools if configured.
     * @returns An array of FunctionDeclarations.
     */
    getFunctionDeclarations(): FunctionDeclaration[];
    /**
     * Retrieves a filtered list of tool schemas based on a list of tool names.
     * @param toolNames - An array of tool names to include.
     * @returns An array of FunctionDeclarations for the specified tools.
     */
    getFunctionDeclarationsFiltered(toolNames: string[]): FunctionDeclaration[];
    /**
     * Returns an array of all registered and discovered tool names.
     */
    getAllToolNames(): string[];
    /**
     * Returns an array of all registered and discovered tool instances.
     */
    getAllTools(): AnyDeclarativeTool[];
    /**
     * Returns an array of tools registered from a specific MCP server.
     */
    getToolsByServer(serverName: string): AnyDeclarativeTool[];
    /**
     * Get the definition of a specific tool.
     */
    getTool(name: string): AnyDeclarativeTool | undefined;
}
export {};
