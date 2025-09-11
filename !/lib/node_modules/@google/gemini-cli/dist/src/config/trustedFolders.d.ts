/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Settings } from './settings.js';
export declare const TRUSTED_FOLDERS_FILENAME = "trustedFolders.json";
export declare const SETTINGS_DIRECTORY_NAME = ".gemini";
export declare const USER_SETTINGS_DIR: string;
export declare const USER_TRUSTED_FOLDERS_PATH: string;
export declare enum TrustLevel {
    TRUST_FOLDER = "TRUST_FOLDER",
    TRUST_PARENT = "TRUST_PARENT",
    DO_NOT_TRUST = "DO_NOT_TRUST"
}
export interface TrustRule {
    path: string;
    trustLevel: TrustLevel;
}
export interface TrustedFoldersError {
    message: string;
    path: string;
}
export interface TrustedFoldersFile {
    config: Record<string, TrustLevel>;
    path: string;
}
export declare class LoadedTrustedFolders {
    readonly user: TrustedFoldersFile;
    readonly errors: TrustedFoldersError[];
    constructor(user: TrustedFoldersFile, errors: TrustedFoldersError[]);
    get rules(): TrustRule[];
    /**
     * Returns true or false if the path should be "trusted". This function
     * should only be invoked when the folder trust setting is active.
     *
     * @param location path
     * @returns
     */
    isPathTrusted(location: string): boolean | undefined;
    setValue(path: string, trustLevel: TrustLevel): void;
}
export declare function loadTrustedFolders(): LoadedTrustedFolders;
export declare function saveTrustedFolders(trustedFoldersFile: TrustedFoldersFile): void;
/** Is folder trust feature enabled per the current applied settings */
export declare function isFolderTrustEnabled(settings: Settings): boolean;
export declare function isWorkspaceTrusted(settings: Settings): boolean | undefined;
