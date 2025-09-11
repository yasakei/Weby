import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, Box } from 'ink';
import { MarkdownDisplay } from '../../utils/MarkdownDisplay.js';
import { Colors } from '../../colors.js';
import { SCREEN_READER_MODEL_PREFIX } from '../../textConstants.js';
export const GeminiMessage = ({ text, isPending, availableTerminalHeight, terminalWidth, }) => {
    const prefix = '✦ ';
    const prefixWidth = prefix.length;
    return (_jsxs(Box, { flexDirection: "row", children: [_jsx(Box, { width: prefixWidth, children: _jsx(Text, { color: Colors.AccentPurple, "aria-label": SCREEN_READER_MODEL_PREFIX, children: prefix }) }), _jsx(Box, { flexGrow: 1, flexDirection: "column", children: _jsx(MarkdownDisplay, { text: text, isPending: isPending, availableTerminalHeight: availableTerminalHeight, terminalWidth: terminalWidth }) })] }));
};
//# sourceMappingURL=GeminiMessage.js.map