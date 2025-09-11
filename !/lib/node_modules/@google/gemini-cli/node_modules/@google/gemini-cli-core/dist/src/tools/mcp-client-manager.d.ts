/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Config, MCPServerConfig } from '../config/config.js';
import type { ToolRegistry } from './tool-registry.js';
import type { PromptRegistry } from '../prompts/prompt-registry.js';
import { MCPDiscoveryState } from './mcp-client.js';
import type { EventEmitter } from 'node:events';
import type { WorkspaceContext } from '../utils/workspaceContext.js';
/**
 * Manages the lifecycle of multiple MCP clients, including local child processes.
 * This class is responsible for starting, stopping, and discovering tools from
 * a collection of MCP servers defined in the configuration.
 */
export declare class McpClientManager {
    private clients;
    private readonly mcpServers;
    private readonly mcpServerCommand;
    private readonly toolRegistry;
    private readonly promptRegistry;
    private readonly debugMode;
    private readonly workspaceContext;
    private discoveryState;
    private readonly eventEmitter?;
    constructor(mcpServers: Record<string, MCPServerConfig>, mcpServerCommand: string | undefined, toolRegistry: ToolRegistry, promptRegistry: PromptRegistry, debugMode: boolean, workspaceContext: WorkspaceContext, eventEmitter?: EventEmitter);
    /**
     * Initiates the tool discovery process for all configured MCP servers.
     * It connects to each server, discovers its available tools, and registers
     * them with the `ToolRegistry`.
     */
    discoverAllMcpTools(cliConfig: Config): Promise<void>;
    /**
     * Stops all running local MCP servers and closes all client connections.
     * This is the cleanup method to be called on application exit.
     */
    stop(): Promise<void>;
    getDiscoveryState(): MCPDiscoveryState;
}
