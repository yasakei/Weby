/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
interface PrepareLabelProps {
    label: string;
    matchedIndex?: number;
    userInput: string;
    textColor: string;
    highlightColor?: string;
}
export declare const PrepareLabel: React.FC<PrepareLabelProps>;
export {};
