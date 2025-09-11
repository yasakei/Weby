/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type Extension } from '../../config/extension.js';
export declare function WorkspaceMigrationDialog(props: {
    workspaceExtensions: Extension[];
    onOpen: () => void;
    onClose: () => void;
}): import("react/jsx-runtime").JSX.Element;
