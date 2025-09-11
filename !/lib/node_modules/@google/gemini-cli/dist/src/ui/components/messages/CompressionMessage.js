import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { Colors } from '../../colors.js';
import { SCREEN_READER_MODEL_PREFIX } from '../../textConstants.js';
/*
 * Compression messages appear when the /compress command is run, and show a loading spinner
 * while compression is in progress, followed up by some compression stats.
 */
export const CompressionMessage = ({ compression, }) => {
    const text = compression.isPending
        ? 'Compressing chat history'
        : `Chat history compressed from ${compression.originalTokenCount ?? 'unknown'}` +
            ` to ${compression.newTokenCount ?? 'unknown'} tokens.`;
    return (_jsxs(Box, { flexDirection: "row", children: [_jsx(Box, { marginRight: 1, children: compression.isPending ? (_jsx(Spinner, { type: "dots" })) : (_jsx(Text, { color: Colors.AccentPurple, children: "\u2726" })) }), _jsx(Box, { children: _jsx(Text, { color: compression.isPending ? Colors.AccentPurple : Colors.AccentGreen, "aria-label": SCREEN_READER_MODEL_PREFIX, children: text }) })] }));
};
//# sourceMappingURL=CompressionMessage.js.map