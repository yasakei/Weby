import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import process from 'node:process';
import { formatMemoryUsage } from '../utils/formatters.js';
export const MemoryUsageDisplay = () => {
    const [memoryUsage, setMemoryUsage] = useState('');
    const [memoryUsageColor, setMemoryUsageColor] = useState(Colors.Gray);
    useEffect(() => {
        const updateMemory = () => {
            const usage = process.memoryUsage().rss;
            setMemoryUsage(formatMemoryUsage(usage));
            setMemoryUsageColor(usage >= 2 * 1024 * 1024 * 1024 ? Colors.AccentRed : Colors.Gray);
        };
        const intervalId = setInterval(updateMemory, 2000);
        updateMemory(); // Initial update
        return () => clearInterval(intervalId);
    }, []);
    return (_jsxs(Box, { children: [_jsx(Text, { color: Colors.Gray, children: " | " }), _jsx(Text, { color: memoryUsageColor, children: memoryUsage })] }));
};
//# sourceMappingURL=MemoryUsageDisplay.js.map