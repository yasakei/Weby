import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { Text, Box } from 'ink';
import { common, createLowlight } from 'lowlight';
import { themeManager } from '../themes/theme-manager.js';
import { MaxSizedBox, MINIMUM_MAX_HEIGHT, } from '../components/shared/MaxSizedBox.js';
// Configure theming and parsing utilities.
const lowlight = createLowlight(common);
function renderHastNode(node, theme, inheritedColor) {
    if (node.type === 'text') {
        // Use the color passed down from parent element, if any
        return _jsx(Text, { color: inheritedColor, children: node.value });
    }
    // Handle Element Nodes: Determine color and pass it down, don't wrap
    if (node.type === 'element') {
        const nodeClasses = node.properties?.['className'] || [];
        let elementColor = undefined;
        // Find color defined specifically for this element's class
        for (let i = nodeClasses.length - 1; i >= 0; i--) {
            const color = theme.getInkColor(nodeClasses[i]);
            if (color) {
                elementColor = color;
                break;
            }
        }
        // Determine the color to pass down: Use this element's specific color
        // if found; otherwise, continue passing down the already inherited color.
        const colorToPassDown = elementColor || inheritedColor;
        // Recursively render children, passing the determined color down
        // Ensure child type matches expected HAST structure (ElementContent is common)
        const children = node.children?.map((child, index) => (_jsx(React.Fragment, { children: renderHastNode(child, theme, colorToPassDown) }, index)));
        // Element nodes now only group children; color is applied by Text nodes.
        // Use a React Fragment to avoid adding unnecessary elements.
        return _jsx(React.Fragment, { children: children });
    }
    // Handle Root Node: Start recursion with initially inherited color
    if (node.type === 'root') {
        // Check if children array is empty - this happens when lowlight can't detect language – fall back to plain text
        if (!node.children || node.children.length === 0) {
            return null;
        }
        // Pass down the initial inheritedColor (likely undefined from the top call)
        // Ensure child type matches expected HAST structure (RootContent is common)
        return node.children?.map((child, index) => (_jsx(React.Fragment, { children: renderHastNode(child, theme, inheritedColor) }, index)));
    }
    // Handle unknown or unsupported node types
    return null;
}
function highlightAndRenderLine(line, language, theme) {
    try {
        const getHighlightedLine = () => !language || !lowlight.registered(language)
            ? lowlight.highlightAuto(line)
            : lowlight.highlight(language, line);
        const renderedNode = renderHastNode(getHighlightedLine(), theme, undefined);
        return renderedNode !== null ? renderedNode : line;
    }
    catch (_error) {
        return line;
    }
}
export function colorizeLine(line, language, theme) {
    const activeTheme = theme || themeManager.getActiveTheme();
    return highlightAndRenderLine(line, language, activeTheme);
}
/**
 * Renders syntax-highlighted code for Ink applications using a selected theme.
 *
 * @param code The code string to highlight.
 * @param language The language identifier (e.g., 'javascript', 'css', 'html')
 * @returns A React.ReactNode containing Ink <Text> elements for the highlighted code.
 */
export function colorizeCode(code, language, availableHeight, maxWidth, theme, settings) {
    const codeToHighlight = code.replace(/\n$/, '');
    const activeTheme = theme || themeManager.getActiveTheme();
    const showLineNumbers = settings?.merged.ui?.showLineNumbers ?? true;
    try {
        // Render the HAST tree using the adapted theme
        // Apply the theme's default foreground color to the top-level Text element
        let lines = codeToHighlight.split('\n');
        const padWidth = String(lines.length).length; // Calculate padding width based on number of lines
        let hiddenLinesCount = 0;
        // Optimization to avoid highlighting lines that cannot possibly be displayed.
        if (availableHeight !== undefined) {
            availableHeight = Math.max(availableHeight, MINIMUM_MAX_HEIGHT);
            if (lines.length > availableHeight) {
                const sliceIndex = lines.length - availableHeight;
                hiddenLinesCount = sliceIndex;
                lines = lines.slice(sliceIndex);
            }
        }
        return (_jsx(MaxSizedBox, { maxHeight: availableHeight, maxWidth: maxWidth, additionalHiddenLinesCount: hiddenLinesCount, overflowDirection: "top", children: lines.map((line, index) => {
                const contentToRender = highlightAndRenderLine(line, language, activeTheme);
                return (_jsxs(Box, { children: [showLineNumbers && (_jsx(Text, { color: activeTheme.colors.Gray, children: `${String(index + 1 + hiddenLinesCount).padStart(padWidth, ' ')} ` })), _jsx(Text, { color: activeTheme.defaultColor, wrap: "wrap", children: contentToRender })] }, index));
            }) }));
    }
    catch (error) {
        console.error(`[colorizeCode] Error highlighting code for language "${language}":`, error);
        // Fall back to plain text with default color on error
        // Also display line numbers in fallback
        const lines = codeToHighlight.split('\n');
        const padWidth = String(lines.length).length; // Calculate padding width based on number of lines
        return (_jsx(MaxSizedBox, { maxHeight: availableHeight, maxWidth: maxWidth, overflowDirection: "top", children: lines.map((line, index) => (_jsxs(Box, { children: [showLineNumbers && (_jsx(Text, { color: activeTheme.defaultColor, children: `${String(index + 1).padStart(padWidth, ' ')} ` })), _jsx(Text, { color: activeTheme.colors.Gray, children: line })] }, index))) }));
    }
}
//# sourceMappingURL=CodeColorizer.js.map