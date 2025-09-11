import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ToolConfirmationOutcome } from '@google/gemini-cli-core';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { RenderInline } from '../utils/InlineMarkdownRenderer.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { useKeypress } from '../hooks/useKeypress.js';
export const ShellConfirmationDialog = ({ request }) => {
    const { commands, onConfirm } = request;
    useKeypress((key) => {
        if (key.name === 'escape') {
            onConfirm(ToolConfirmationOutcome.Cancel);
        }
    }, { isActive: true });
    const handleSelect = (item) => {
        if (item === ToolConfirmationOutcome.Cancel) {
            onConfirm(item);
        }
        else {
            // For both ProceedOnce and ProceedAlways, we approve all the
            // commands that were requested.
            onConfirm(item, commands);
        }
    };
    const options = [
        {
            label: 'Yes, allow once',
            value: ToolConfirmationOutcome.ProceedOnce,
        },
        {
            label: 'Yes, allow always for this session',
            value: ToolConfirmationOutcome.ProceedAlways,
        },
        {
            label: 'No (esc)',
            value: ToolConfirmationOutcome.Cancel,
        },
    ];
    return (_jsxs(Box, { flexDirection: "column", borderStyle: "round", borderColor: Colors.AccentYellow, padding: 1, width: "100%", marginLeft: 1, children: [_jsxs(Box, { flexDirection: "column", marginBottom: 1, children: [_jsx(Text, { bold: true, children: "Shell Command Execution" }), _jsx(Text, { children: "A custom command wants to run the following shell commands:" }), _jsx(Box, { flexDirection: "column", borderStyle: "round", borderColor: Colors.Gray, paddingX: 1, marginTop: 1, children: commands.map((cmd) => (_jsx(Text, { color: Colors.AccentCyan, children: _jsx(RenderInline, { text: cmd }) }, cmd))) })] }), _jsx(Box, { marginBottom: 1, children: _jsx(Text, { children: "Do you want to proceed?" }) }), _jsx(RadioButtonSelect, { items: options, onSelect: handleSelect, isFocused: true })] }));
};
//# sourceMappingURL=ShellConfirmationDialog.js.map