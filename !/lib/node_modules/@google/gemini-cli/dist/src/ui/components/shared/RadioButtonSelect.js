import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import { Text, Box } from 'ink';
import { Colors } from '../../colors.js';
import { useKeypress } from '../../hooks/useKeypress.js';
/**
 * A custom component that displays a list of items with radio buttons,
 * supporting scrolling and keyboard navigation.
 *
 * @template T The type of the value associated with each radio item.
 */
export function RadioButtonSelect({ items, initialIndex = 0, onSelect, onHighlight, isFocused = true, showScrollArrows = false, maxItemsToShow = 10, showNumbers = true, }) {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [numberInput, setNumberInput] = useState('');
    const numberInputTimer = useRef(null);
    useEffect(() => {
        const newScrollOffset = Math.max(0, Math.min(activeIndex - maxItemsToShow + 1, items.length - maxItemsToShow));
        if (activeIndex < scrollOffset) {
            setScrollOffset(activeIndex);
        }
        else if (activeIndex >= scrollOffset + maxItemsToShow) {
            setScrollOffset(newScrollOffset);
        }
    }, [activeIndex, items.length, scrollOffset, maxItemsToShow]);
    useEffect(() => () => {
        if (numberInputTimer.current) {
            clearTimeout(numberInputTimer.current);
        }
    }, []);
    useKeypress((key) => {
        const { sequence, name } = key;
        const isNumeric = showNumbers && /^[0-9]$/.test(sequence);
        // Any key press that is not a digit should clear the number input buffer.
        if (!isNumeric && numberInputTimer.current) {
            clearTimeout(numberInputTimer.current);
            setNumberInput('');
        }
        if (name === 'k' || name === 'up') {
            const newIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
            setActiveIndex(newIndex);
            onHighlight?.(items[newIndex].value);
            return;
        }
        if (name === 'j' || name === 'down') {
            const newIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
            setActiveIndex(newIndex);
            onHighlight?.(items[newIndex].value);
            return;
        }
        if (name === 'return') {
            onSelect(items[activeIndex].value);
            return;
        }
        // Handle numeric input for selection.
        if (isNumeric) {
            if (numberInputTimer.current) {
                clearTimeout(numberInputTimer.current);
            }
            const newNumberInput = numberInput + sequence;
            setNumberInput(newNumberInput);
            const targetIndex = Number.parseInt(newNumberInput, 10) - 1;
            // A single '0' is not a valid selection since items are 1-indexed.
            if (newNumberInput === '0') {
                numberInputTimer.current = setTimeout(() => setNumberInput(''), 350);
                return;
            }
            if (targetIndex >= 0 && targetIndex < items.length) {
                const targetItem = items[targetIndex];
                setActiveIndex(targetIndex);
                onHighlight?.(targetItem.value);
                // If the typed number can't be a prefix for another valid number,
                // select it immediately. Otherwise, wait for more input.
                const potentialNextNumber = Number.parseInt(newNumberInput + '0', 10);
                if (potentialNextNumber > items.length) {
                    onSelect(targetItem.value);
                    setNumberInput('');
                }
                else {
                    numberInputTimer.current = setTimeout(() => {
                        onSelect(targetItem.value);
                        setNumberInput('');
                    }, 350); // Debounce time for multi-digit input.
                }
            }
            else {
                // The typed number is out of bounds, clear the buffer
                setNumberInput('');
            }
        }
    }, { isActive: !!(isFocused && items.length > 0) });
    const visibleItems = items.slice(scrollOffset, scrollOffset + maxItemsToShow);
    return (_jsxs(Box, { flexDirection: "column", children: [showScrollArrows && (_jsx(Text, { color: scrollOffset > 0 ? Colors.Foreground : Colors.Gray, children: "\u25B2" })), visibleItems.map((item, index) => {
                const itemIndex = scrollOffset + index;
                const isSelected = activeIndex === itemIndex;
                let textColor = Colors.Foreground;
                let numberColor = Colors.Foreground;
                if (isSelected) {
                    textColor = Colors.AccentGreen;
                    numberColor = Colors.AccentGreen;
                }
                else if (item.disabled) {
                    textColor = Colors.Gray;
                    numberColor = Colors.Gray;
                }
                if (!showNumbers) {
                    numberColor = Colors.Gray;
                }
                const numberColumnWidth = String(items.length).length;
                const itemNumberText = `${String(itemIndex + 1).padStart(numberColumnWidth)}.`;
                return (_jsxs(Box, { alignItems: "center", children: [_jsx(Box, { minWidth: 2, flexShrink: 0, children: _jsx(Text, { color: isSelected ? Colors.AccentGreen : Colors.Foreground, "aria-hidden": true, children: isSelected ? '●' : ' ' }) }), _jsx(Box, { marginRight: 1, flexShrink: 0, minWidth: itemNumberText.length, "aria-state": { checked: isSelected }, children: _jsx(Text, { color: numberColor, children: itemNumberText }) }), item.themeNameDisplay && item.themeTypeDisplay ? (_jsxs(Text, { color: textColor, wrap: "truncate", children: [item.themeNameDisplay, ' ', _jsx(Text, { color: Colors.Gray, children: item.themeTypeDisplay })] })) : (_jsx(Text, { color: textColor, wrap: "truncate", children: item.label }))] }, item.label));
            }), showScrollArrows && (_jsx(Text, { color: scrollOffset + maxItemsToShow < items.length
                    ? Colors.Foreground
                    : Colors.Gray, children: "\u25BC" }))] }));
}
//# sourceMappingURL=RadioButtonSelect.js.map