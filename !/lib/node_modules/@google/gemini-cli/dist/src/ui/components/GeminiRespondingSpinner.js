import { jsx as _jsx } from "react/jsx-runtime";
import { Text, useIsScreenReaderEnabled } from 'ink';
import Spinner from 'ink-spinner';
import { useStreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';
import { SCREEN_READER_LOADING, SCREEN_READER_RESPONDING, } from '../textConstants.js';
export const GeminiRespondingSpinner = ({ nonRespondingDisplay, spinnerType = 'dots' }) => {
    const streamingState = useStreamingContext();
    const isScreenReaderEnabled = useIsScreenReaderEnabled();
    if (streamingState === StreamingState.Responding) {
        return isScreenReaderEnabled ? (_jsx(Text, { children: SCREEN_READER_RESPONDING })) : (_jsx(Spinner, { type: spinnerType }));
    }
    else if (nonRespondingDisplay) {
        return isScreenReaderEnabled ? (_jsx(Text, { children: SCREEN_READER_LOADING })) : (_jsx(Text, { children: nonRespondingDisplay }));
    }
    return null;
};
//# sourceMappingURL=GeminiRespondingSpinner.js.map