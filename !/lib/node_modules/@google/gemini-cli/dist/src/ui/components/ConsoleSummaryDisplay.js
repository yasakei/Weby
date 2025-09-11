import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
export const ConsoleSummaryDisplay = ({ errorCount, }) => {
    if (errorCount === 0) {
        return null;
    }
    const errorIcon = '\u2716'; // Heavy multiplication x (✖)
    return (_jsx(Box, { children: errorCount > 0 && (_jsxs(Text, { color: Colors.AccentRed, children: [errorIcon, " ", errorCount, " error", errorCount > 1 ? 's' : '', ' ', _jsx(Text, { color: Colors.Gray, children: "(ctrl+o for details)" })] })) }));
};
//# sourceMappingURL=ConsoleSummaryDisplay.js.map