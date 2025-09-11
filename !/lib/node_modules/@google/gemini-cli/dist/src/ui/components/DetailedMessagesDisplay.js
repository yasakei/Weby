import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { MaxSizedBox } from './shared/MaxSizedBox.js';
export const DetailedMessagesDisplay = ({ messages, maxHeight, width }) => {
    if (messages.length === 0) {
        return null; // Don't render anything if there are no messages
    }
    const borderAndPadding = 4;
    return (_jsxs(Box, { flexDirection: "column", marginTop: 1, borderStyle: "round", borderColor: Colors.Gray, paddingX: 1, width: width, children: [_jsx(Box, { marginBottom: 1, children: _jsxs(Text, { bold: true, color: Colors.Foreground, children: ["Debug Console ", _jsx(Text, { color: Colors.Gray, children: "(ctrl+o to close)" })] }) }), _jsx(MaxSizedBox, { maxHeight: maxHeight, maxWidth: width - borderAndPadding, children: messages.map((msg, index) => {
                    let textColor = Colors.Foreground;
                    let icon = '\u2139'; // Information source (ℹ)
                    switch (msg.type) {
                        case 'warn':
                            textColor = Colors.AccentYellow;
                            icon = '\u26A0'; // Warning sign (⚠)
                            break;
                        case 'error':
                            textColor = Colors.AccentRed;
                            icon = '\u2716'; // Heavy multiplication x (✖)
                            break;
                        case 'debug':
                            textColor = Colors.Gray; // Or Colors.Gray
                            icon = '\u{1F50D}'; // Left-pointing magnifying glass (🔍)
                            break;
                        case 'log':
                        default:
                            // Default textColor and icon are already set
                            break;
                    }
                    return (_jsxs(Box, { flexDirection: "row", children: [_jsxs(Text, { color: textColor, children: [icon, " "] }), _jsxs(Text, { color: textColor, wrap: "wrap", children: [msg.content, msg.count && msg.count > 1 && (_jsxs(Text, { color: Colors.Gray, children: [" (x", msg.count, ")"] }))] })] }, index));
                }) })] }));
};
//# sourceMappingURL=DetailedMessagesDisplay.js.map