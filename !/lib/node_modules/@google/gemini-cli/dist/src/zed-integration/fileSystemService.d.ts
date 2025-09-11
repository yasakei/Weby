/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { FileSystemService } from '@google/gemini-cli-core';
import type * as acp from './acp.js';
/**
 * ACP client-based implementation of FileSystemService
 */
export declare class AcpFileSystemService implements FileSystemService {
    private readonly client;
    private readonly sessionId;
    private readonly capabilities;
    private readonly fallback;
    constructor(client: acp.Client, sessionId: string, capabilities: acp.FileSystemCapability, fallback: FileSystemService);
    readTextFile(filePath: string): Promise<string>;
    writeTextFile(filePath: string, content: string): Promise<void>;
}
