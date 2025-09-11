/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
interface DiffRendererProps {
    diffContent: string;
    filename?: string;
    tabWidth?: number;
    availableTerminalHeight?: number;
    terminalWidth: number;
    theme?: import('../../themes/theme.js').Theme;
}
export declare const DiffRenderer: React.FC<DiffRendererProps>;
export {};
