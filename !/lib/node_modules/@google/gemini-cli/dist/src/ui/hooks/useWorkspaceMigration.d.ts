/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type Extension } from '../../config/extension.js';
import { type LoadedSettings } from '../../config/settings.js';
export declare function useWorkspaceMigration(settings: LoadedSettings): {
    showWorkspaceMigrationDialog: boolean;
    workspaceExtensions: Extension[];
    onWorkspaceMigrationDialogOpen: () => void;
    onWorkspaceMigrationDialogClose: () => void;
};
