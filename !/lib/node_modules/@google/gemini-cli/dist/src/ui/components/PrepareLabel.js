import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from 'ink';
import { Colors } from '../colors.js';
export const PrepareLabel = ({ label, matchedIndex, userInput, textColor, highlightColor = Colors.AccentYellow, }) => {
    if (matchedIndex === undefined ||
        matchedIndex < 0 ||
        matchedIndex >= label.length ||
        userInput.length === 0) {
        return _jsx(Text, { color: textColor, children: label });
    }
    const start = label.slice(0, matchedIndex);
    const match = label.slice(matchedIndex, matchedIndex + userInput.length);
    const end = label.slice(matchedIndex + userInput.length);
    return (_jsxs(Text, { children: [_jsx(Text, { color: textColor, children: start }), _jsx(Text, { color: "black", bold: true, backgroundColor: highlightColor, children: match }), _jsx(Text, { color: textColor, children: end })] }));
};
//# sourceMappingURL=PrepareLabel.js.map