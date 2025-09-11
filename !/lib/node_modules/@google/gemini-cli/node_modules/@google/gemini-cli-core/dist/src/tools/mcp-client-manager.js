/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { McpClient, MCPDiscoveryState, populateMcpServerCommand, } from './mcp-client.js';
import { getErrorMessage } from '../utils/errors.js';
/**
 * Manages the lifecycle of multiple MCP clients, including local child processes.
 * This class is responsible for starting, stopping, and discovering tools from
 * a collection of MCP servers defined in the configuration.
 */
export class McpClientManager {
    clients = new Map();
    mcpServers;
    mcpServerCommand;
    toolRegistry;
    promptRegistry;
    debugMode;
    workspaceContext;
    discoveryState = MCPDiscoveryState.NOT_STARTED;
    eventEmitter;
    constructor(mcpServers, mcpServerCommand, toolRegistry, promptRegistry, debugMode, workspaceContext, eventEmitter) {
        this.mcpServers = mcpServers;
        this.mcpServerCommand = mcpServerCommand;
        this.toolRegistry = toolRegistry;
        this.promptRegistry = promptRegistry;
        this.debugMode = debugMode;
        this.workspaceContext = workspaceContext;
        this.eventEmitter = eventEmitter;
    }
    /**
     * Initiates the tool discovery process for all configured MCP servers.
     * It connects to each server, discovers its available tools, and registers
     * them with the `ToolRegistry`.
     */
    async discoverAllMcpTools(cliConfig) {
        if (!cliConfig.isTrustedFolder()) {
            return;
        }
        await this.stop();
        const servers = populateMcpServerCommand(this.mcpServers, this.mcpServerCommand);
        const serverEntries = Object.entries(servers);
        const total = serverEntries.length;
        this.eventEmitter?.emit('mcp-servers-discovery-start', { count: total });
        this.discoveryState = MCPDiscoveryState.IN_PROGRESS;
        const discoveryPromises = serverEntries.map(async ([name, config], index) => {
            const current = index + 1;
            this.eventEmitter?.emit('mcp-server-connecting', {
                name,
                current,
                total,
            });
            const client = new McpClient(name, config, this.toolRegistry, this.promptRegistry, this.workspaceContext, this.debugMode);
            this.clients.set(name, client);
            try {
                await client.connect();
                await client.discover(cliConfig);
                this.eventEmitter?.emit('mcp-server-connected', {
                    name,
                    current,
                    total,
                });
            }
            catch (error) {
                this.eventEmitter?.emit('mcp-server-error', {
                    name,
                    current,
                    total,
                    error,
                });
                // Log the error but don't let a single failed server stop the others
                console.error(`Error during discovery for server '${name}': ${getErrorMessage(error)}`);
            }
        });
        await Promise.all(discoveryPromises);
        this.discoveryState = MCPDiscoveryState.COMPLETED;
    }
    /**
     * Stops all running local MCP servers and closes all client connections.
     * This is the cleanup method to be called on application exit.
     */
    async stop() {
        const disconnectionPromises = Array.from(this.clients.entries()).map(async ([name, client]) => {
            try {
                await client.disconnect();
            }
            catch (error) {
                console.error(`Error stopping client '${name}': ${getErrorMessage(error)}`);
            }
        });
        await Promise.all(disconnectionPromises);
        this.clients.clear();
    }
    getDiscoveryState() {
        return this.discoveryState;
    }
}
//# sourceMappingURL=mcp-client-manager.js.map