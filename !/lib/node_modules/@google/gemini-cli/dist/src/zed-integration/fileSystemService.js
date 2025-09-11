/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * ACP client-based implementation of FileSystemService
 */
export class AcpFileSystemService {
    client;
    sessionId;
    capabilities;
    fallback;
    constructor(client, sessionId, capabilities, fallback) {
        this.client = client;
        this.sessionId = sessionId;
        this.capabilities = capabilities;
        this.fallback = fallback;
    }
    async readTextFile(filePath) {
        if (!this.capabilities.readTextFile) {
            return this.fallback.readTextFile(filePath);
        }
        const response = await this.client.readTextFile({
            path: filePath,
            sessionId: this.sessionId,
            line: null,
            limit: null,
        });
        return response.content;
    }
    async writeTextFile(filePath, content) {
        if (!this.capabilities.writeTextFile) {
            return this.fallback.writeTextFile(filePath, content);
        }
        await this.client.writeTextFile({
            path: filePath,
            content,
            sessionId: this.sessionId,
        });
    }
}
//# sourceMappingURL=fileSystemService.js.map