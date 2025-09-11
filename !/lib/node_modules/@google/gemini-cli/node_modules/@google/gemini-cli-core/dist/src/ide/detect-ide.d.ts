/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare enum DetectedIde {
    Devin = "devin",
    Replit = "replit",
    Cursor = "cursor",
    CloudShell = "cloudshell",
    Codespaces = "codespaces",
    FirebaseStudio = "firebasestudio",
    Trae = "trae",
    VSCode = "vscode",
    VSCodeFork = "vscodefork"
}
export interface IdeInfo {
    displayName: string;
}
export declare function getIdeInfo(ide: DetectedIde): IdeInfo;
export declare function detectIdeFromEnv(): DetectedIde;
export declare function detectIde(ideProcessInfo: {
    pid: number;
    command: string;
}): DetectedIde | undefined;
