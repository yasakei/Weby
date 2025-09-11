/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Detects Kitty keyboard protocol support.
 * Definitive document about this protocol lives at https://sw.kovidgoyal.net/kitty/keyboard-protocol/
 * This function should be called once at app startup.
 */
export declare function detectAndEnableKittyProtocol(): Promise<boolean>;
export declare function isKittyProtocolEnabled(): boolean;
export declare function isKittyProtocolSupported(): boolean;
