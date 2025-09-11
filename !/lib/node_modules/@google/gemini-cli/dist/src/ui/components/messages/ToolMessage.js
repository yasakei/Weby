import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Box, Text } from 'ink';
import { ToolCallStatus } from '../../types.js';
import { DiffRenderer } from './DiffRenderer.js';
import { Colors } from '../../colors.js';
import { MarkdownDisplay } from '../../utils/MarkdownDisplay.js';
import { GeminiRespondingSpinner } from '../GeminiRespondingSpinner.js';
import { MaxSizedBox } from '../shared/MaxSizedBox.js';
import { TOOL_STATUS } from '../../constants.js';
const STATIC_HEIGHT = 1;
const RESERVED_LINE_COUNT = 5; // for tool name, status, padding etc.
const STATUS_INDICATOR_WIDTH = 3;
const MIN_LINES_SHOWN = 2; // show at least this many lines
// Large threshold to ensure we don't cause performance issues for very large
// outputs that will get truncated further MaxSizedBox anyway.
const MAXIMUM_RESULT_DISPLAY_CHARACTERS = 1000000;
export const ToolMessage = ({ name, description, resultDisplay, status, availableTerminalHeight, terminalWidth, emphasis = 'medium', renderOutputAsMarkdown = true, }) => {
    const availableHeight = availableTerminalHeight
        ? Math.max(availableTerminalHeight - STATIC_HEIGHT - RESERVED_LINE_COUNT, MIN_LINES_SHOWN + 1)
        : undefined;
    // Long tool call response in MarkdownDisplay doesn't respect availableTerminalHeight properly,
    // we're forcing it to not render as markdown when the response is too long, it will fallback
    // to render as plain text, which is contained within the terminal using MaxSizedBox
    if (availableHeight) {
        renderOutputAsMarkdown = false;
    }
    const childWidth = terminalWidth - 3; // account for padding.
    if (typeof resultDisplay === 'string') {
        if (resultDisplay.length > MAXIMUM_RESULT_DISPLAY_CHARACTERS) {
            // Truncate the result display to fit within the available width.
            resultDisplay =
                '...' + resultDisplay.slice(-MAXIMUM_RESULT_DISPLAY_CHARACTERS);
        }
    }
    return (_jsxs(Box, { paddingX: 1, paddingY: 0, flexDirection: "column", children: [_jsxs(Box, { minHeight: 1, children: [_jsx(ToolStatusIndicator, { status: status }), _jsx(ToolInfo, { name: name, status: status, description: description, emphasis: emphasis }), emphasis === 'high' && _jsx(TrailingIndicator, {})] }), resultDisplay && (_jsx(Box, { paddingLeft: STATUS_INDICATOR_WIDTH, width: "100%", marginTop: 1, children: _jsxs(Box, { flexDirection: "column", children: [typeof resultDisplay === 'string' && renderOutputAsMarkdown && (_jsx(Box, { flexDirection: "column", children: _jsx(MarkdownDisplay, { text: resultDisplay, isPending: false, availableTerminalHeight: availableHeight, terminalWidth: childWidth }) })), typeof resultDisplay === 'string' && !renderOutputAsMarkdown && (_jsx(MaxSizedBox, { maxHeight: availableHeight, maxWidth: childWidth, children: _jsx(Box, { children: _jsx(Text, { wrap: "wrap", children: resultDisplay }) }) })), typeof resultDisplay !== 'string' && (_jsx(DiffRenderer, { diffContent: resultDisplay.fileDiff, filename: resultDisplay.fileName, availableTerminalHeight: availableHeight, terminalWidth: childWidth }))] }) }))] }));
};
const ToolStatusIndicator = ({ status, }) => (_jsxs(Box, { minWidth: STATUS_INDICATOR_WIDTH, children: [status === ToolCallStatus.Pending && (_jsx(Text, { color: Colors.AccentGreen, children: TOOL_STATUS.PENDING })), status === ToolCallStatus.Executing && (_jsx(GeminiRespondingSpinner, { spinnerType: "toggle", nonRespondingDisplay: TOOL_STATUS.EXECUTING })), status === ToolCallStatus.Success && (_jsx(Text, { color: Colors.AccentGreen, "aria-label": 'Success:', children: TOOL_STATUS.SUCCESS })), status === ToolCallStatus.Confirming && (_jsx(Text, { color: Colors.AccentYellow, "aria-label": 'Confirming:', children: TOOL_STATUS.CONFIRMING })), status === ToolCallStatus.Canceled && (_jsx(Text, { color: Colors.AccentYellow, "aria-label": 'Canceled:', bold: true, children: TOOL_STATUS.CANCELED })), status === ToolCallStatus.Error && (_jsx(Text, { color: Colors.AccentRed, "aria-label": 'Error:', bold: true, children: TOOL_STATUS.ERROR }))] }));
const ToolInfo = ({ name, description, status, emphasis, }) => {
    const nameColor = React.useMemo(() => {
        switch (emphasis) {
            case 'high':
                return Colors.Foreground;
            case 'medium':
                return Colors.Foreground;
            case 'low':
                return Colors.Gray;
            default: {
                const exhaustiveCheck = emphasis;
                return exhaustiveCheck;
            }
        }
    }, [emphasis]);
    return (_jsx(Box, { children: _jsxs(Text, { wrap: "truncate-end", strikethrough: status === ToolCallStatus.Canceled, children: [_jsx(Text, { color: nameColor, bold: true, children: name }), ' ', _jsx(Text, { color: Colors.Gray, children: description })] }) }));
};
const TrailingIndicator = () => (_jsxs(Text, { color: Colors.Foreground, wrap: "truncate", children: [' ', "\u2190"] }));
//# sourceMappingURL=ToolMessage.js.map