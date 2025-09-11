import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { render } from 'ink-testing-library';
import { describe, it, expect, vi } from 'vitest';
import { HistoryItemDisplay } from './HistoryItemDisplay.js';
import { MessageType } from '../types.js';
import { SessionStatsProvider } from '../contexts/SessionContext.js';
// Mock child components
vi.mock('./messages/ToolGroupMessage.js', () => ({
    ToolGroupMessage: () => _jsx("div", {}),
}));
describe('<HistoryItemDisplay />', () => {
    const mockConfig = {};
    const baseItem = {
        id: 1,
        timestamp: 12345,
        isPending: false,
        terminalWidth: 80,
        config: mockConfig,
    };
    it('renders UserMessage for "user" type', () => {
        const item = {
            ...baseItem,
            type: MessageType.USER,
            text: 'Hello',
        };
        const { lastFrame } = render(_jsx(HistoryItemDisplay, { ...baseItem, item: item }));
        expect(lastFrame()).toContain('Hello');
    });
    it('renders UserMessage for "user" type with slash command', () => {
        const item = {
            ...baseItem,
            type: MessageType.USER,
            text: '/theme',
        };
        const { lastFrame } = render(_jsx(HistoryItemDisplay, { ...baseItem, item: item }));
        expect(lastFrame()).toContain('/theme');
    });
    it('renders StatsDisplay for "stats" type', () => {
        const item = {
            ...baseItem,
            type: MessageType.STATS,
            duration: '1s',
        };
        const { lastFrame } = render(_jsx(SessionStatsProvider, { children: _jsx(HistoryItemDisplay, { ...baseItem, item: item }) }));
        expect(lastFrame()).toContain('Stats');
    });
    it('renders AboutBox for "about" type', () => {
        const item = {
            ...baseItem,
            type: MessageType.ABOUT,
            cliVersion: '1.0.0',
            osVersion: 'test-os',
            sandboxEnv: 'test-env',
            modelVersion: 'test-model',
            selectedAuthType: 'test-auth',
            gcpProject: 'test-project',
            ideClient: 'test-ide',
        };
        const { lastFrame } = render(_jsx(HistoryItemDisplay, { ...baseItem, item: item }));
        expect(lastFrame()).toContain('About Gemini CLI');
    });
    it('renders ModelStatsDisplay for "model_stats" type', () => {
        const item = {
            ...baseItem,
            type: 'model_stats',
        };
        const { lastFrame } = render(_jsx(SessionStatsProvider, { children: _jsx(HistoryItemDisplay, { ...baseItem, item: item }) }));
        expect(lastFrame()).toContain('No API calls have been made in this session.');
    });
    it('renders ToolStatsDisplay for "tool_stats" type', () => {
        const item = {
            ...baseItem,
            type: 'tool_stats',
        };
        const { lastFrame } = render(_jsx(SessionStatsProvider, { children: _jsx(HistoryItemDisplay, { ...baseItem, item: item }) }));
        expect(lastFrame()).toContain('No tool calls have been made in this session.');
    });
    it('renders SessionSummaryDisplay for "quit" type', () => {
        const item = {
            ...baseItem,
            type: 'quit',
            duration: '1s',
        };
        const { lastFrame } = render(_jsx(SessionStatsProvider, { children: _jsx(HistoryItemDisplay, { ...baseItem, item: item }) }));
        expect(lastFrame()).toContain('Agent powering down. Goodbye!');
    });
});
//# sourceMappingURL=HistoryItemDisplay.test.js.map