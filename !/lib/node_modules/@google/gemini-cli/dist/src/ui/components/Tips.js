import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import {} from '@google/gemini-cli-core';
export const Tips = ({ config }) => {
    const geminiMdFileCount = config.getGeminiMdFileCount();
    return (_jsxs(Box, { flexDirection: "column", children: [_jsx(Text, { color: Colors.Foreground, children: "Tips for getting started:" }), _jsx(Text, { color: Colors.Foreground, children: "1. Ask questions, edit files, or run commands." }), _jsx(Text, { color: Colors.Foreground, children: "2. Be specific for the best results." }), geminiMdFileCount === 0 && (_jsxs(Text, { color: Colors.Foreground, children: ["3. Create", ' ', _jsx(Text, { bold: true, color: Colors.AccentPurple, children: "GEMINI.md" }), ' ', "files to customize your interactions with Gemini."] })), _jsxs(Text, { color: Colors.Foreground, children: [geminiMdFileCount === 0 ? '4.' : '3.', ' ', _jsx(Text, { bold: true, color: Colors.AccentPurple, children: "/help" }), ' ', "for more information."] })] }));
};
//# sourceMappingURL=Tips.js.map