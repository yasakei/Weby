/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { vi } from 'vitest';
/**
 * Creates a deep, fully-typed mock of the CommandContext for use in tests.
 * All functions are pre-mocked with `vi.fn()`.
 *
 * @param overrides - A deep partial object to override any default mock values.
 * @returns A complete, mocked CommandContext object.
 */
export const createMockCommandContext = (overrides = {}) => {
    const defaultMocks = {
        invocation: {
            raw: '',
            name: '',
            args: '',
        },
        services: {
            config: null,
            settings: { merged: {} },
            git: undefined,
            logger: {
                log: vi.fn(),
                logMessage: vi.fn(),
                saveCheckpoint: vi.fn(),
                loadCheckpoint: vi.fn().mockResolvedValue([]),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }, // Cast because Logger is a class.
        },
        ui: {
            addItem: vi.fn(),
            clear: vi.fn(),
            setDebugMessage: vi.fn(),
            pendingItem: null,
            setPendingItem: vi.fn(),
            loadHistory: vi.fn(),
            toggleCorgiMode: vi.fn(),
            toggleVimEnabled: vi.fn(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        },
        session: {
            sessionShellAllowlist: new Set(),
            stats: {
                sessionStartTime: new Date(),
                lastPromptTokenCount: 0,
                metrics: {
                    models: {},
                    tools: {
                        totalCalls: 0,
                        totalSuccess: 0,
                        totalFail: 0,
                        totalDurationMs: 0,
                        totalDecisions: { accept: 0, reject: 0, modify: 0 },
                        byName: {},
                    },
                },
            },
        },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const merge = (target, source) => {
        const output = { ...target };
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const sourceValue = source[key];
                const targetValue = output[key];
                if (
                // We only want to recursivlty merge plain objects
                Object.prototype.toString.call(sourceValue) === '[object Object]' &&
                    Object.prototype.toString.call(targetValue) === '[object Object]') {
                    output[key] = merge(targetValue, sourceValue);
                }
                else {
                    // If not, we do a direct assignment. This preserves Date objects and others.
                    output[key] = sourceValue;
                }
            }
        }
        return output;
    };
    return merge(defaultMocks, overrides);
};
//# sourceMappingURL=mockCommandContext.js.map