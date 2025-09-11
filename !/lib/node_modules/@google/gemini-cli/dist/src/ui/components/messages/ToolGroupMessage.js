import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Box } from 'ink';
import { ToolCallStatus } from '../../types.js';
import { ToolMessage } from './ToolMessage.js';
import { ToolConfirmationMessage } from './ToolConfirmationMessage.js';
import { Colors } from '../../colors.js';
import { SHELL_COMMAND_NAME } from '../../constants.js';
// Main component renders the border and maps the tools using ToolMessage
export const ToolGroupMessage = ({ toolCalls, availableTerminalHeight, terminalWidth, config, isFocused = true, }) => {
    const hasPending = !toolCalls.every((t) => t.status === ToolCallStatus.Success);
    const isShellCommand = toolCalls.some((t) => t.name === SHELL_COMMAND_NAME);
    const borderColor = hasPending || isShellCommand ? Colors.AccentYellow : Colors.Gray;
    const staticHeight = /* border */ 2 + /* marginBottom */ 1;
    // This is a bit of a magic number, but it accounts for the border and
    // marginLeft.
    const innerWidth = terminalWidth - 4;
    // only prompt for tool approval on the first 'confirming' tool in the list
    // note, after the CTA, this automatically moves over to the next 'confirming' tool
    const toolAwaitingApproval = useMemo(() => toolCalls.find((tc) => tc.status === ToolCallStatus.Confirming), [toolCalls]);
    let countToolCallsWithResults = 0;
    for (const tool of toolCalls) {
        if (tool.resultDisplay !== undefined && tool.resultDisplay !== '') {
            countToolCallsWithResults++;
        }
    }
    const countOneLineToolCalls = toolCalls.length - countToolCallsWithResults;
    const availableTerminalHeightPerToolMessage = availableTerminalHeight
        ? Math.max(Math.floor((availableTerminalHeight - staticHeight - countOneLineToolCalls) /
            Math.max(1, countToolCallsWithResults)), 1)
        : undefined;
    return (_jsx(Box, { flexDirection: "column", borderStyle: "round", 
        /*
          This width constraint is highly important and protects us from an Ink rendering bug.
          Since the ToolGroup can typically change rendering states frequently, it can cause
          Ink to render the border of the box incorrectly and span multiple lines and even
          cause tearing.
        */
        width: "100%", marginLeft: 1, borderDimColor: hasPending, borderColor: borderColor, gap: 1, children: toolCalls.map((tool) => {
            const isConfirming = toolAwaitingApproval?.callId === tool.callId;
            return (_jsxs(Box, { flexDirection: "column", minHeight: 1, children: [_jsx(Box, { flexDirection: "row", alignItems: "center", children: _jsx(ToolMessage, { callId: tool.callId, name: tool.name, description: tool.description, resultDisplay: tool.resultDisplay, status: tool.status, confirmationDetails: tool.confirmationDetails, availableTerminalHeight: availableTerminalHeightPerToolMessage, terminalWidth: innerWidth, emphasis: isConfirming
                                ? 'high'
                                : toolAwaitingApproval
                                    ? 'low'
                                    : 'medium', renderOutputAsMarkdown: tool.renderOutputAsMarkdown }) }), tool.status === ToolCallStatus.Confirming &&
                        isConfirming &&
                        tool.confirmationDetails && (_jsx(ToolConfirmationMessage, { confirmationDetails: tool.confirmationDetails, config: config, isFocused: isFocused, availableTerminalHeight: availableTerminalHeightPerToolMessage, terminalWidth: innerWidth }))] }, tool.callId));
        }) }));
};
//# sourceMappingURL=ToolGroupMessage.js.map