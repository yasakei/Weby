/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { FileDiscoveryService } from '../services/fileDiscoveryService.js';
import type { FileFilteringOptions } from '../config/config.js';
export interface LoadServerHierarchicalMemoryResponse {
    memoryContent: string;
    fileCount: number;
}
/**
 * Loads hierarchical GEMINI.md files and concatenates their content.
 * This function is intended for use by the server.
 */
export declare function loadServerHierarchicalMemory(currentWorkingDirectory: string, includeDirectoriesToReadGemini: readonly string[], debugMode: boolean, fileService: FileDiscoveryService, extensionContextFilePaths: string[] | undefined, folderTrust: boolean, importFormat?: 'flat' | 'tree', fileFilteringOptions?: FileFilteringOptions, maxDirs?: number): Promise<LoadServerHierarchicalMemoryResponse>;
