/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
interface FooterProps {
    model: string;
    targetDir: string;
    branchName?: string;
    debugMode: boolean;
    debugMessage: string;
    corgiMode: boolean;
    errorCount: number;
    showErrorDetails: boolean;
    showMemoryUsage?: boolean;
    promptTokenCount: number;
    nightly: boolean;
    vimMode?: string;
    isTrustedFolder?: boolean;
    hideCWD?: boolean;
    hideSandboxStatus?: boolean;
    hideModelInfo?: boolean;
}
export declare const Footer: React.FC<FooterProps>;
export {};
