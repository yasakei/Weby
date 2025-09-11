import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, Box } from 'ink';
import { Colors } from '../../colors.js';
import { RenderInline } from '../../utils/InlineMarkdownRenderer.js';
export const InfoMessage = ({ text }) => {
    const prefix = 'ℹ ';
    const prefixWidth = prefix.length;
    return (_jsxs(Box, { flexDirection: "row", marginTop: 1, children: [_jsx(Box, { width: prefixWidth, children: _jsx(Text, { color: Colors.AccentYellow, children: prefix }) }), _jsx(Box, { flexGrow: 1, children: _jsx(Text, { wrap: "wrap", color: Colors.AccentYellow, children: _jsx(RenderInline, { text: text }) }) })] }));
};
//# sourceMappingURL=InfoMessage.js.map