import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { PrepareLabel } from './PrepareLabel.js';
import { isSlashCommand } from '../utils/commandUtils.js';
export const MAX_SUGGESTIONS_TO_SHOW = 8;
export function SuggestionsDisplay({ suggestions, activeIndex, isLoading, width, scrollOffset, userInput, }) {
    if (isLoading) {
        return (_jsx(Box, { paddingX: 1, width: width, children: _jsx(Text, { color: "gray", children: "Loading suggestions..." }) }));
    }
    if (suggestions.length === 0) {
        return null; // Don't render anything if there are no suggestions
    }
    // Calculate the visible slice based on scrollOffset
    const startIndex = scrollOffset;
    const endIndex = Math.min(scrollOffset + MAX_SUGGESTIONS_TO_SHOW, suggestions.length);
    const visibleSuggestions = suggestions.slice(startIndex, endIndex);
    const isSlashCommandMode = isSlashCommand(userInput);
    let commandNameWidth = 0;
    if (isSlashCommandMode) {
        const maxLabelLength = visibleSuggestions.length
            ? Math.max(...visibleSuggestions.map((s) => s.label.length))
            : 0;
        const maxAllowedWidth = Math.floor(width * 0.35);
        commandNameWidth = Math.max(15, Math.min(maxLabelLength + 2, maxAllowedWidth));
    }
    return (_jsxs(Box, { flexDirection: "column", paddingX: 1, width: width, children: [scrollOffset > 0 && _jsx(Text, { color: Colors.Foreground, children: "\u25B2" }), visibleSuggestions.map((suggestion, index) => {
                const originalIndex = startIndex + index;
                const isActive = originalIndex === activeIndex;
                const textColor = isActive ? Colors.AccentPurple : Colors.Gray;
                const labelElement = (_jsx(PrepareLabel, { label: suggestion.label, matchedIndex: suggestion.matchedIndex, userInput: userInput, textColor: textColor }));
                return (_jsx(Box, { width: width, children: _jsx(Box, { flexDirection: "row", children: isSlashCommandMode ? (_jsxs(_Fragment, { children: [_jsx(Box, { width: commandNameWidth, flexShrink: 0, children: labelElement }), suggestion.description ? (_jsx(Box, { flexGrow: 1, marginLeft: 1, children: _jsx(Text, { color: textColor, wrap: "wrap", children: suggestion.description }) })) : null] })) : (_jsxs(_Fragment, { children: [labelElement, suggestion.description ? (_jsx(Box, { flexGrow: 1, marginLeft: 1, children: _jsx(Text, { color: textColor, wrap: "wrap", children: suggestion.description }) })) : null] })) }) }, `${suggestion.value}-${originalIndex}`));
            }), endIndex < suggestions.length && _jsx(Text, { color: "gray", children: "\u25BC" }), suggestions.length > MAX_SUGGESTIONS_TO_SHOW && (_jsxs(Text, { color: "gray", children: ["(", activeIndex + 1, "/", suggestions.length, ")"] }))] }));
}
//# sourceMappingURL=SuggestionsDisplay.js.map