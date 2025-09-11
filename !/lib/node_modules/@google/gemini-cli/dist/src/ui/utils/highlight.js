/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const HIGHLIGHT_REGEX = /(\/[a-zA-Z0-9_-]+|@[a-zA-Z0-9_./-]+)/g;
export function parseInputForHighlighting(text) {
    if (!text) {
        return [{ text: '', type: 'default' }];
    }
    const tokens = [];
    let lastIndex = 0;
    let match;
    while ((match = HIGHLIGHT_REGEX.exec(text)) !== null) {
        const [fullMatch] = match;
        const matchIndex = match.index;
        // Add the text before the match as a default token
        if (matchIndex > lastIndex) {
            tokens.push({
                text: text.slice(lastIndex, matchIndex),
                type: 'default',
            });
        }
        // Add the matched token
        const type = fullMatch.startsWith('/') ? 'command' : 'file';
        tokens.push({
            text: fullMatch,
            type,
        });
        lastIndex = matchIndex + fullMatch.length;
    }
    // Add any remaining text after the last match
    if (lastIndex < text.length) {
        tokens.push({
            text: text.slice(lastIndex),
            type: 'default',
        });
    }
    return tokens;
}
//# sourceMappingURL=highlight.js.map