/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { FileFilteringOptions } from '@google/gemini-cli-core';
import { Config, FileDiscoveryService } from '@google/gemini-cli-core';
import type { Settings } from './settings.js';
import type { Extension } from './extension.js';
export interface CliArgs {
    model: string | undefined;
    sandbox: boolean | string | undefined;
    sandboxImage: string | undefined;
    debug: boolean | undefined;
    prompt: string | undefined;
    promptInteractive: string | undefined;
    allFiles: boolean | undefined;
    showMemoryUsage: boolean | undefined;
    yolo: boolean | undefined;
    approvalMode: string | undefined;
    telemetry: boolean | undefined;
    checkpointing: boolean | undefined;
    telemetryTarget: string | undefined;
    telemetryOtlpEndpoint: string | undefined;
    telemetryOtlpProtocol: string | undefined;
    telemetryLogPrompts: boolean | undefined;
    telemetryOutfile: string | undefined;
    allowedMcpServerNames: string[] | undefined;
    allowedTools: string[] | undefined;
    experimentalAcp: boolean | undefined;
    extensions: string[] | undefined;
    listExtensions: boolean | undefined;
    proxy: string | undefined;
    includeDirectories: string[] | undefined;
    screenReader: boolean | undefined;
    useSmartEdit: boolean | undefined;
    sessionSummary: string | undefined;
    promptWords: string[] | undefined;
}
export declare function parseArguments(settings: Settings): Promise<CliArgs>;
export declare function loadHierarchicalGeminiMemory(currentWorkingDirectory: string, includeDirectoriesToReadGemini: readonly string[] | undefined, debugMode: boolean, fileService: FileDiscoveryService, settings: Settings, extensionContextFilePaths: string[] | undefined, folderTrust: boolean, memoryImportFormat?: 'flat' | 'tree', fileFilteringOptions?: FileFilteringOptions): Promise<{
    memoryContent: string;
    fileCount: number;
}>;
export declare function loadCliConfig(settings: Settings, extensions: Extension[], sessionId: string, argv: CliArgs, cwd?: string): Promise<Config>;
