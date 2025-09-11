/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export type HighlightToken = {
    text: string;
    type: 'default' | 'command' | 'file';
};
export declare function parseInputForHighlighting(text: string): readonly HighlightToken[];
