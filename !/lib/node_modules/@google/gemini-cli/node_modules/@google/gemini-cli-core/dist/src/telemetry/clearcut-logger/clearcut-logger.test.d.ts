/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import 'vitest';
import { EventNames } from './clearcut-logger.js';
import { EventMetadataKey } from './event-metadata-key.js';
interface CustomMatchers<R = unknown> {
    toHaveMetadataValue: ([key, value]: [EventMetadataKey, string]) => R;
    toHaveEventName: (name: EventNames) => R;
}
declare module 'vitest' {
    interface Matchers<T = any> extends CustomMatchers<T> {
    }
}
export {};
