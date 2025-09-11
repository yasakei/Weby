import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { useStreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';
import { GeminiRespondingSpinner } from './GeminiRespondingSpinner.js';
import { formatDuration } from '../utils/formatters.js';
import { useTerminalSize } from '../hooks/useTerminalSize.js';
import { isNarrowWidth } from '../utils/isNarrowWidth.js';
export const LoadingIndicator = ({ currentLoadingPhrase, elapsedTime, rightContent, thought, }) => {
    const streamingState = useStreamingContext();
    const { columns: terminalWidth } = useTerminalSize();
    const isNarrow = isNarrowWidth(terminalWidth);
    if (streamingState === StreamingState.Idle) {
        return null;
    }
    const primaryText = thought?.subject || currentLoadingPhrase;
    const cancelAndTimerContent = streamingState !== StreamingState.WaitingForConfirmation
        ? `(esc to cancel, ${elapsedTime < 60 ? `${elapsedTime}s` : formatDuration(elapsedTime * 1000)})`
        : null;
    return (_jsxs(Box, { paddingLeft: 0, flexDirection: "column", children: [_jsxs(Box, { width: "100%", flexDirection: isNarrow ? 'column' : 'row', alignItems: isNarrow ? 'flex-start' : 'center', children: [_jsxs(Box, { children: [_jsx(Box, { marginRight: 1, children: _jsx(GeminiRespondingSpinner, { nonRespondingDisplay: streamingState === StreamingState.WaitingForConfirmation
                                        ? '⠏'
                                        : '' }) }), primaryText && (_jsx(Text, { color: Colors.AccentPurple, children: primaryText })), !isNarrow && cancelAndTimerContent && (_jsxs(Text, { color: Colors.Gray, children: [" ", cancelAndTimerContent] }))] }), !isNarrow && _jsx(Box, { flexGrow: 1 }), !isNarrow && rightContent && _jsx(Box, { children: rightContent })] }), isNarrow && cancelAndTimerContent && (_jsx(Box, { children: _jsx(Text, { color: Colors.Gray, children: cancelAndTimerContent }) })), isNarrow && rightContent && _jsx(Box, { children: rightContent })] }));
};
//# sourceMappingURL=LoadingIndicator.js.map