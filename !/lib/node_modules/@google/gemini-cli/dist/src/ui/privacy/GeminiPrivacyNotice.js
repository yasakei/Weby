import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, Newline, Text } from 'ink';
import { Colors } from '../colors.js';
import { useKeypress } from '../hooks/useKeypress.js';
export const GeminiPrivacyNotice = ({ onExit }) => {
    useKeypress((key) => {
        if (key.name === 'escape') {
            onExit();
        }
    }, { isActive: true });
    return (_jsxs(Box, { flexDirection: "column", marginBottom: 1, children: [_jsx(Text, { bold: true, color: Colors.AccentPurple, children: "Gemini API Key Notice" }), _jsx(Newline, {}), _jsxs(Text, { children: ["By using the Gemini API", _jsx(Text, { color: Colors.AccentBlue, children: "[1]" }), ", Google AI Studio", _jsx(Text, { color: Colors.AccentRed, children: "[2]" }), ", and the other Google developer services that reference these terms (collectively, the \"APIs\" or \"Services\"), you are agreeing to Google APIs Terms of Service (the \"API Terms\")", _jsx(Text, { color: Colors.AccentGreen, children: "[3]" }), ", and the Gemini API Additional Terms of Service (the \"Additional Terms\")", _jsx(Text, { color: Colors.AccentPurple, children: "[4]" }), "."] }), _jsx(Newline, {}), _jsxs(Text, { children: [_jsx(Text, { color: Colors.AccentBlue, children: "[1]" }), ' ', "https://ai.google.dev/docs/gemini_api_overview"] }), _jsxs(Text, { children: [_jsx(Text, { color: Colors.AccentRed, children: "[2]" }), " https://aistudio.google.com/"] }), _jsxs(Text, { children: [_jsx(Text, { color: Colors.AccentGreen, children: "[3]" }), ' ', "https://developers.google.com/terms"] }), _jsxs(Text, { children: [_jsx(Text, { color: Colors.AccentPurple, children: "[4]" }), ' ', "https://ai.google.dev/gemini-api/terms"] }), _jsx(Newline, {}), _jsx(Text, { color: Colors.Gray, children: "Press Esc to exit." })] }));
};
//# sourceMappingURL=GeminiPrivacyNotice.js.map