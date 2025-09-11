/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { McpClientManager } from './mcp-client-manager.js';
import { McpClient } from './mcp-client.js';
vi.mock('./mcp-client.js', async () => {
    const originalModule = await vi.importActual('./mcp-client.js');
    return {
        ...originalModule,
        McpClient: vi.fn(),
        populateMcpServerCommand: vi.fn(() => ({
            'test-server': {},
        })),
    };
});
describe('McpClientManager', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it('should discover tools from all servers', async () => {
        const mockedMcpClient = {
            connect: vi.fn(),
            discover: vi.fn(),
            disconnect: vi.fn(),
            getStatus: vi.fn(),
        };
        vi.mocked(McpClient).mockReturnValue(mockedMcpClient);
        const manager = new McpClientManager({
            'test-server': {},
        }, '', {}, {}, false, {});
        await manager.discoverAllMcpTools({
            isTrustedFolder: () => true,
        });
        expect(mockedMcpClient.connect).toHaveBeenCalledOnce();
        expect(mockedMcpClient.discover).toHaveBeenCalledOnce();
    });
    it('should not discover tools if folder is not trusted', async () => {
        const mockedMcpClient = {
            connect: vi.fn(),
            discover: vi.fn(),
            disconnect: vi.fn(),
            getStatus: vi.fn(),
        };
        vi.mocked(McpClient).mockReturnValue(mockedMcpClient);
        const manager = new McpClientManager({
            'test-server': {},
        }, '', {}, {}, false, {});
        await manager.discoverAllMcpTools({
            isTrustedFolder: () => false,
        });
        expect(mockedMcpClient.connect).not.toHaveBeenCalled();
        expect(mockedMcpClient.discover).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=mcp-client-manager.test.js.map