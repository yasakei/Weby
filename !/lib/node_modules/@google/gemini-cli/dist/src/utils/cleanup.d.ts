/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export declare function registerCleanup(fn: (() => void) | (() => Promise<void>)): void;
export declare function runExitCleanup(): Promise<void>;
export declare function cleanupCheckpoints(): Promise<void>;
