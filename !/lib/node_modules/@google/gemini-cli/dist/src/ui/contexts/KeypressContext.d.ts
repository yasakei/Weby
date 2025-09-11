/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Config } from '@google/gemini-cli-core';
import type React from 'react';
export declare const PASTE_MODE_PREFIX = "\u001B[200~";
export declare const PASTE_MODE_SUFFIX = "\u001B[201~";
export interface Key {
    name: string;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
    paste: boolean;
    sequence: string;
    kittyProtocol?: boolean;
}
export type KeypressHandler = (key: Key) => void;
interface KeypressContextValue {
    subscribe: (handler: KeypressHandler) => void;
    unsubscribe: (handler: KeypressHandler) => void;
}
export declare function useKeypressContext(): KeypressContextValue;
export declare function KeypressProvider({ children, kittyProtocolEnabled, config, debugKeystrokeLogging, }: {
    children: React.ReactNode;
    kittyProtocolEnabled: boolean;
    config?: Config;
    debugKeystrokeLogging?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export {};
