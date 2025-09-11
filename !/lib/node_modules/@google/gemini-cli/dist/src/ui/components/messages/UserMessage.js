import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, Box } from 'ink';
import { Colors } from '../../colors.js';
import { SCREEN_READER_USER_PREFIX } from '../../textConstants.js';
import { isSlashCommand as checkIsSlashCommand } from '../../utils/commandUtils.js';
export const UserMessage = ({ text }) => {
    const prefix = '> ';
    const prefixWidth = prefix.length;
    const isSlashCommand = checkIsSlashCommand(text);
    const textColor = isSlashCommand ? Colors.AccentPurple : Colors.Gray;
    const borderColor = isSlashCommand ? Colors.AccentPurple : Colors.Gray;
    return (_jsxs(Box, { borderStyle: "round", borderColor: borderColor, flexDirection: "row", paddingX: 2, paddingY: 0, marginY: 1, alignSelf: "flex-start", children: [_jsx(Box, { width: prefixWidth, children: _jsx(Text, { color: textColor, "aria-label": SCREEN_READER_USER_PREFIX, children: prefix }) }), _jsx(Box, { flexGrow: 1, children: _jsx(Text, { wrap: "wrap", color: textColor, children: text }) })] }));
};
//# sourceMappingURL=UserMessage.js.map