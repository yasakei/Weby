/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type Settings, type MemoryImportFormat } from './settingsSchema.js';
export type { Settings, MemoryImportFormat };
export declare const SETTINGS_DIRECTORY_NAME = ".gemini";
export declare const USER_SETTINGS_PATH: string;
export declare const USER_SETTINGS_DIR: string;
export declare const DEFAULT_EXCLUDED_ENV_VARS: string[];
export declare function getSystemSettingsPath(): string;
export declare function getSystemDefaultsPath(): string;
export type { DnsResolutionOrder } from './settingsSchema.js';
export declare enum SettingScope {
    User = "User",
    Workspace = "Workspace",
    System = "System",
    SystemDefaults = "SystemDefaults"
}
export interface CheckpointingSettings {
    enabled?: boolean;
}
export interface SummarizeToolOutputSettings {
    tokenBudget?: number;
}
export interface AccessibilitySettings {
    disableLoadingPhrases?: boolean;
    screenReader?: boolean;
}
export interface SettingsError {
    message: string;
    path: string;
}
export interface SettingsFile {
    settings: Settings;
    path: string;
}
export declare function needsMigration(settings: Record<string, unknown>): boolean;
export declare function migrateSettingsToV1(v2Settings: Record<string, unknown>): Record<string, unknown>;
export declare class LoadedSettings {
    constructor(system: SettingsFile, systemDefaults: SettingsFile, user: SettingsFile, workspace: SettingsFile, isTrusted: boolean, migratedInMemorScopes: Set<SettingScope>);
    readonly system: SettingsFile;
    readonly systemDefaults: SettingsFile;
    readonly user: SettingsFile;
    readonly workspace: SettingsFile;
    readonly isTrusted: boolean;
    readonly migratedInMemorScopes: Set<SettingScope>;
    private _merged;
    get merged(): Settings;
    private computeMergedSettings;
    forScope(scope: SettingScope): SettingsFile;
    setValue(scope: SettingScope, key: string, value: unknown): void;
}
export declare function setUpCloudShellEnvironment(envFilePath: string | null): void;
export declare function loadEnvironment(settings: Settings): void;
/**
 * Loads settings from user and workspace directories.
 * Project settings override user settings.
 */
export declare function loadSettings(workspaceDir?: string): LoadedSettings;
export declare function saveSettings(settingsFile: SettingsFile): void;
