import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState, useRef } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../semantic-colors.js';
import { SuggestionsDisplay } from './SuggestionsDisplay.js';
import { useInputHistory } from '../hooks/useInputHistory.js';
import { logicalPosToOffset } from './shared/text-buffer.js';
import { cpSlice, cpLen, toCodePoints } from '../utils/textUtils.js';
import chalk from 'chalk';
import stringWidth from 'string-width';
import { useShellHistory } from '../hooks/useShellHistory.js';
import { useReverseSearchCompletion } from '../hooks/useReverseSearchCompletion.js';
import { useCommandCompletion } from '../hooks/useCommandCompletion.js';
import { useKeypress } from '../hooks/useKeypress.js';
import { keyMatchers, Command } from '../keyMatchers.js';
import { parseInputForHighlighting } from '../utils/highlight.js';
import { clipboardHasImage, saveClipboardImage, cleanupOldClipboardImages, } from '../utils/clipboardUtils.js';
import * as path from 'node:path';
import { SCREEN_READER_USER_PREFIX } from '../textConstants.js';
export const InputPrompt = ({ buffer, onSubmit, userMessages, onClearScreen, config, slashCommands, commandContext, placeholder = '  Type your message or @path/to/file', focus = true, inputWidth, suggestionsWidth, shellModeActive, setShellModeActive, onEscapePromptChange, vimHandleInput, }) => {
    const [justNavigatedHistory, setJustNavigatedHistory] = useState(false);
    const [escPressCount, setEscPressCount] = useState(0);
    const [showEscapePrompt, setShowEscapePrompt] = useState(false);
    const escapeTimerRef = useRef(null);
    const [dirs, setDirs] = useState(config.getWorkspaceContext().getDirectories());
    const dirsChanged = config.getWorkspaceContext().getDirectories();
    useEffect(() => {
        if (dirs.length !== dirsChanged.length) {
            setDirs(dirsChanged);
        }
    }, [dirs.length, dirsChanged]);
    const [reverseSearchActive, setReverseSearchActive] = useState(false);
    const [textBeforeReverseSearch, setTextBeforeReverseSearch] = useState('');
    const [cursorPosition, setCursorPosition] = useState([
        0, 0,
    ]);
    const shellHistory = useShellHistory(config.getProjectRoot(), config.storage);
    const historyData = shellHistory.history;
    const completion = useCommandCompletion(buffer, dirs, config.getTargetDir(), slashCommands, commandContext, reverseSearchActive, config);
    const reverseSearchCompletion = useReverseSearchCompletion(buffer, historyData, reverseSearchActive);
    const resetCompletionState = completion.resetCompletionState;
    const resetReverseSearchCompletionState = reverseSearchCompletion.resetCompletionState;
    const resetEscapeState = useCallback(() => {
        if (escapeTimerRef.current) {
            clearTimeout(escapeTimerRef.current);
            escapeTimerRef.current = null;
        }
        setEscPressCount(0);
        setShowEscapePrompt(false);
    }, []);
    // Notify parent component about escape prompt state changes
    useEffect(() => {
        if (onEscapePromptChange) {
            onEscapePromptChange(showEscapePrompt);
        }
    }, [showEscapePrompt, onEscapePromptChange]);
    // Clear escape prompt timer on unmount
    useEffect(() => () => {
        if (escapeTimerRef.current) {
            clearTimeout(escapeTimerRef.current);
        }
    }, []);
    const handleSubmitAndClear = useCallback((submittedValue) => {
        if (shellModeActive) {
            shellHistory.addCommandToHistory(submittedValue);
        }
        // Clear the buffer *before* calling onSubmit to prevent potential re-submission
        // if onSubmit triggers a re-render while the buffer still holds the old value.
        buffer.setText('');
        onSubmit(submittedValue);
        resetCompletionState();
        resetReverseSearchCompletionState();
    }, [
        onSubmit,
        buffer,
        resetCompletionState,
        shellModeActive,
        shellHistory,
        resetReverseSearchCompletionState,
    ]);
    const customSetTextAndResetCompletionSignal = useCallback((newText) => {
        buffer.setText(newText);
        setJustNavigatedHistory(true);
    }, [buffer, setJustNavigatedHistory]);
    const inputHistory = useInputHistory({
        userMessages,
        onSubmit: handleSubmitAndClear,
        isActive: (!completion.showSuggestions || completion.suggestions.length === 1) &&
            !shellModeActive,
        currentQuery: buffer.text,
        onChange: customSetTextAndResetCompletionSignal,
    });
    // Effect to reset completion if history navigation just occurred and set the text
    useEffect(() => {
        if (justNavigatedHistory) {
            resetCompletionState();
            resetReverseSearchCompletionState();
            setJustNavigatedHistory(false);
        }
    }, [
        justNavigatedHistory,
        buffer.text,
        resetCompletionState,
        setJustNavigatedHistory,
        resetReverseSearchCompletionState,
    ]);
    // Handle clipboard image pasting with Ctrl+V
    const handleClipboardImage = useCallback(async () => {
        try {
            if (await clipboardHasImage()) {
                const imagePath = await saveClipboardImage(config.getTargetDir());
                if (imagePath) {
                    // Clean up old images
                    cleanupOldClipboardImages(config.getTargetDir()).catch(() => {
                        // Ignore cleanup errors
                    });
                    // Get relative path from current directory
                    const relativePath = path.relative(config.getTargetDir(), imagePath);
                    // Insert @path reference at cursor position
                    const insertText = `@${relativePath}`;
                    const currentText = buffer.text;
                    const [row, col] = buffer.cursor;
                    // Calculate offset from row/col
                    let offset = 0;
                    for (let i = 0; i < row; i++) {
                        offset += buffer.lines[i].length + 1; // +1 for newline
                    }
                    offset += col;
                    // Add spaces around the path if needed
                    let textToInsert = insertText;
                    const charBefore = offset > 0 ? currentText[offset - 1] : '';
                    const charAfter = offset < currentText.length ? currentText[offset] : '';
                    if (charBefore && charBefore !== ' ' && charBefore !== '\n') {
                        textToInsert = ' ' + textToInsert;
                    }
                    if (!charAfter || (charAfter !== ' ' && charAfter !== '\n')) {
                        textToInsert = textToInsert + ' ';
                    }
                    // Insert at cursor position
                    buffer.replaceRangeByOffset(offset, offset, textToInsert);
                }
            }
        }
        catch (error) {
            console.error('Error handling clipboard image:', error);
        }
    }, [buffer, config]);
    const handleInput = useCallback((key) => {
        /// We want to handle paste even when not focused to support drag and drop.
        if (!focus && !key.paste) {
            return;
        }
        if (key.paste) {
            // Ensure we never accidentally interpret paste as regular input.
            buffer.handleInput(key);
            return;
        }
        if (vimHandleInput && vimHandleInput(key)) {
            return;
        }
        // Reset ESC count and hide prompt on any non-ESC key
        if (key.name !== 'escape') {
            if (escPressCount > 0 || showEscapePrompt) {
                resetEscapeState();
            }
        }
        if (key.sequence === '!' &&
            buffer.text === '' &&
            !completion.showSuggestions) {
            setShellModeActive(!shellModeActive);
            buffer.setText(''); // Clear the '!' from input
            return;
        }
        if (keyMatchers[Command.ESCAPE](key)) {
            if (reverseSearchActive) {
                setReverseSearchActive(false);
                reverseSearchCompletion.resetCompletionState();
                buffer.setText(textBeforeReverseSearch);
                const offset = logicalPosToOffset(buffer.lines, cursorPosition[0], cursorPosition[1]);
                buffer.moveToOffset(offset);
                return;
            }
            if (shellModeActive) {
                setShellModeActive(false);
                resetEscapeState();
                return;
            }
            if (completion.showSuggestions) {
                completion.resetCompletionState();
                resetEscapeState();
                return;
            }
            // Handle double ESC for clearing input
            if (escPressCount === 0) {
                if (buffer.text === '') {
                    return;
                }
                setEscPressCount(1);
                setShowEscapePrompt(true);
                if (escapeTimerRef.current) {
                    clearTimeout(escapeTimerRef.current);
                }
                escapeTimerRef.current = setTimeout(() => {
                    resetEscapeState();
                }, 500);
            }
            else {
                // clear input and immediately reset state
                buffer.setText('');
                resetCompletionState();
                resetEscapeState();
            }
            return;
        }
        if (shellModeActive && keyMatchers[Command.REVERSE_SEARCH](key)) {
            setReverseSearchActive(true);
            setTextBeforeReverseSearch(buffer.text);
            setCursorPosition(buffer.cursor);
            return;
        }
        if (keyMatchers[Command.CLEAR_SCREEN](key)) {
            onClearScreen();
            return;
        }
        if (reverseSearchActive) {
            const { activeSuggestionIndex, navigateUp, navigateDown, showSuggestions, suggestions, } = reverseSearchCompletion;
            if (showSuggestions) {
                if (keyMatchers[Command.NAVIGATION_UP](key)) {
                    navigateUp();
                    return;
                }
                if (keyMatchers[Command.NAVIGATION_DOWN](key)) {
                    navigateDown();
                    return;
                }
                if (keyMatchers[Command.ACCEPT_SUGGESTION_REVERSE_SEARCH](key)) {
                    reverseSearchCompletion.handleAutocomplete(activeSuggestionIndex);
                    reverseSearchCompletion.resetCompletionState();
                    setReverseSearchActive(false);
                    return;
                }
            }
            if (keyMatchers[Command.SUBMIT_REVERSE_SEARCH](key)) {
                const textToSubmit = showSuggestions && activeSuggestionIndex > -1
                    ? suggestions[activeSuggestionIndex].value
                    : buffer.text;
                handleSubmitAndClear(textToSubmit);
                reverseSearchCompletion.resetCompletionState();
                setReverseSearchActive(false);
                return;
            }
            // Prevent up/down from falling through to regular history navigation
            if (keyMatchers[Command.NAVIGATION_UP](key) ||
                keyMatchers[Command.NAVIGATION_DOWN](key)) {
                return;
            }
        }
        // If the command is a perfect match, pressing enter should execute it.
        if (completion.isPerfectMatch && keyMatchers[Command.RETURN](key)) {
            handleSubmitAndClear(buffer.text);
            return;
        }
        if (completion.showSuggestions) {
            if (completion.suggestions.length > 1) {
                if (keyMatchers[Command.COMPLETION_UP](key)) {
                    completion.navigateUp();
                    return;
                }
                if (keyMatchers[Command.COMPLETION_DOWN](key)) {
                    completion.navigateDown();
                    return;
                }
            }
            if (keyMatchers[Command.ACCEPT_SUGGESTION](key)) {
                if (completion.suggestions.length > 0) {
                    const targetIndex = completion.activeSuggestionIndex === -1
                        ? 0 // Default to the first if none is active
                        : completion.activeSuggestionIndex;
                    if (targetIndex < completion.suggestions.length) {
                        completion.handleAutocomplete(targetIndex);
                    }
                }
                return;
            }
        }
        // Handle Tab key for ghost text acceptance
        if (key.name === 'tab' &&
            !completion.showSuggestions &&
            completion.promptCompletion.text) {
            completion.promptCompletion.accept();
            return;
        }
        if (!shellModeActive) {
            if (keyMatchers[Command.HISTORY_UP](key)) {
                inputHistory.navigateUp();
                return;
            }
            if (keyMatchers[Command.HISTORY_DOWN](key)) {
                inputHistory.navigateDown();
                return;
            }
            // Handle arrow-up/down for history on single-line or at edges
            if (keyMatchers[Command.NAVIGATION_UP](key) &&
                (buffer.allVisualLines.length === 1 ||
                    (buffer.visualCursor[0] === 0 && buffer.visualScrollRow === 0))) {
                inputHistory.navigateUp();
                return;
            }
            if (keyMatchers[Command.NAVIGATION_DOWN](key) &&
                (buffer.allVisualLines.length === 1 ||
                    buffer.visualCursor[0] === buffer.allVisualLines.length - 1)) {
                inputHistory.navigateDown();
                return;
            }
        }
        else {
            // Shell History Navigation
            if (keyMatchers[Command.NAVIGATION_UP](key)) {
                const prevCommand = shellHistory.getPreviousCommand();
                if (prevCommand !== null)
                    buffer.setText(prevCommand);
                return;
            }
            if (keyMatchers[Command.NAVIGATION_DOWN](key)) {
                const nextCommand = shellHistory.getNextCommand();
                if (nextCommand !== null)
                    buffer.setText(nextCommand);
                return;
            }
        }
        if (keyMatchers[Command.SUBMIT](key)) {
            if (buffer.text.trim()) {
                const [row, col] = buffer.cursor;
                const line = buffer.lines[row];
                const charBefore = col > 0 ? cpSlice(line, col - 1, col) : '';
                if (charBefore === '\\') {
                    buffer.backspace();
                    buffer.newline();
                }
                else {
                    handleSubmitAndClear(buffer.text);
                }
            }
            return;
        }
        // Newline insertion
        if (keyMatchers[Command.NEWLINE](key)) {
            buffer.newline();
            return;
        }
        // Ctrl+A (Home) / Ctrl+E (End)
        if (keyMatchers[Command.HOME](key)) {
            buffer.move('home');
            return;
        }
        if (keyMatchers[Command.END](key)) {
            buffer.move('end');
            return;
        }
        // Ctrl+C (Clear input)
        if (keyMatchers[Command.CLEAR_INPUT](key)) {
            if (buffer.text.length > 0) {
                buffer.setText('');
                resetCompletionState();
            }
            return;
        }
        // Kill line commands
        if (keyMatchers[Command.KILL_LINE_RIGHT](key)) {
            buffer.killLineRight();
            return;
        }
        if (keyMatchers[Command.KILL_LINE_LEFT](key)) {
            buffer.killLineLeft();
            return;
        }
        if (keyMatchers[Command.DELETE_WORD_BACKWARD](key)) {
            buffer.deleteWordLeft();
            return;
        }
        // External editor
        if (keyMatchers[Command.OPEN_EXTERNAL_EDITOR](key)) {
            buffer.openInExternalEditor();
            return;
        }
        // Ctrl+V for clipboard image paste
        if (keyMatchers[Command.PASTE_CLIPBOARD_IMAGE](key)) {
            handleClipboardImage();
            return;
        }
        // Fall back to the text buffer's default input handling for all other keys
        buffer.handleInput(key);
        // Clear ghost text when user types regular characters (not navigation/control keys)
        if (completion.promptCompletion.text &&
            key.sequence &&
            key.sequence.length === 1 &&
            !key.ctrl &&
            !key.meta) {
            completion.promptCompletion.clear();
        }
    }, [
        focus,
        buffer,
        completion,
        shellModeActive,
        setShellModeActive,
        onClearScreen,
        inputHistory,
        handleSubmitAndClear,
        shellHistory,
        reverseSearchCompletion,
        handleClipboardImage,
        resetCompletionState,
        escPressCount,
        showEscapePrompt,
        resetEscapeState,
        vimHandleInput,
        reverseSearchActive,
        textBeforeReverseSearch,
        cursorPosition,
    ]);
    useKeypress(handleInput, {
        isActive: true,
    });
    const linesToRender = buffer.viewportVisualLines;
    const [cursorVisualRowAbsolute, cursorVisualColAbsolute] = buffer.visualCursor;
    const scrollVisualRow = buffer.visualScrollRow;
    const getGhostTextLines = useCallback(() => {
        if (!completion.promptCompletion.text ||
            !buffer.text ||
            !completion.promptCompletion.text.startsWith(buffer.text)) {
            return { inlineGhost: '', additionalLines: [] };
        }
        const ghostSuffix = completion.promptCompletion.text.slice(buffer.text.length);
        if (!ghostSuffix) {
            return { inlineGhost: '', additionalLines: [] };
        }
        const currentLogicalLine = buffer.lines[buffer.cursor[0]] || '';
        const cursorCol = buffer.cursor[1];
        const textBeforeCursor = cpSlice(currentLogicalLine, 0, cursorCol);
        const usedWidth = stringWidth(textBeforeCursor);
        const remainingWidth = Math.max(0, inputWidth - usedWidth);
        const ghostTextLinesRaw = ghostSuffix.split('\n');
        const firstLineRaw = ghostTextLinesRaw.shift() || '';
        let inlineGhost = '';
        let remainingFirstLine = '';
        if (stringWidth(firstLineRaw) <= remainingWidth) {
            inlineGhost = firstLineRaw;
        }
        else {
            const words = firstLineRaw.split(' ');
            let currentLine = '';
            let wordIdx = 0;
            for (const word of words) {
                const prospectiveLine = currentLine ? `${currentLine} ${word}` : word;
                if (stringWidth(prospectiveLine) > remainingWidth) {
                    break;
                }
                currentLine = prospectiveLine;
                wordIdx++;
            }
            inlineGhost = currentLine;
            if (words.length > wordIdx) {
                remainingFirstLine = words.slice(wordIdx).join(' ');
            }
        }
        const linesToWrap = [];
        if (remainingFirstLine) {
            linesToWrap.push(remainingFirstLine);
        }
        linesToWrap.push(...ghostTextLinesRaw);
        const remainingGhostText = linesToWrap.join('\n');
        const additionalLines = [];
        if (remainingGhostText) {
            const textLines = remainingGhostText.split('\n');
            for (const textLine of textLines) {
                const words = textLine.split(' ');
                let currentLine = '';
                for (const word of words) {
                    const prospectiveLine = currentLine ? `${currentLine} ${word}` : word;
                    const prospectiveWidth = stringWidth(prospectiveLine);
                    if (prospectiveWidth > inputWidth) {
                        if (currentLine) {
                            additionalLines.push(currentLine);
                        }
                        let wordToProcess = word;
                        while (stringWidth(wordToProcess) > inputWidth) {
                            let part = '';
                            const wordCP = toCodePoints(wordToProcess);
                            let partWidth = 0;
                            let splitIndex = 0;
                            for (let i = 0; i < wordCP.length; i++) {
                                const char = wordCP[i];
                                const charWidth = stringWidth(char);
                                if (partWidth + charWidth > inputWidth) {
                                    break;
                                }
                                part += char;
                                partWidth += charWidth;
                                splitIndex = i + 1;
                            }
                            additionalLines.push(part);
                            wordToProcess = cpSlice(wordToProcess, splitIndex);
                        }
                        currentLine = wordToProcess;
                    }
                    else {
                        currentLine = prospectiveLine;
                    }
                }
                if (currentLine) {
                    additionalLines.push(currentLine);
                }
            }
        }
        return { inlineGhost, additionalLines };
    }, [
        completion.promptCompletion.text,
        buffer.text,
        buffer.lines,
        buffer.cursor,
        inputWidth,
    ]);
    const { inlineGhost, additionalLines } = getGhostTextLines();
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { borderStyle: "round", borderColor: shellModeActive ? theme.status.warning : theme.border.focused, paddingX: 1, children: [_jsx(Text, { color: shellModeActive ? theme.status.warning : theme.text.accent, children: shellModeActive ? (reverseSearchActive ? (_jsxs(Text, { color: theme.text.link, "aria-label": SCREEN_READER_USER_PREFIX, children: ["(r:)", ' '] })) : ('! ')) : ('> ') }), _jsx(Box, { flexGrow: 1, flexDirection: "column", children: buffer.text.length === 0 && placeholder ? (focus ? (_jsxs(Text, { children: [chalk.inverse(placeholder.slice(0, 1)), _jsx(Text, { color: theme.text.secondary, children: placeholder.slice(1) })] })) : (_jsx(Text, { color: theme.text.secondary, children: placeholder }))) : (linesToRender
                            .map((lineText, visualIdxInRenderedSet) => {
                            const tokens = parseInputForHighlighting(lineText);
                            const cursorVisualRow = cursorVisualRowAbsolute - scrollVisualRow;
                            const isOnCursorLine = focus && visualIdxInRenderedSet === cursorVisualRow;
                            const renderedLine = [];
                            let charCount = 0;
                            tokens.forEach((token, tokenIdx) => {
                                let display = token.text;
                                if (isOnCursorLine) {
                                    const relativeVisualColForHighlight = cursorVisualColAbsolute;
                                    const tokenStart = charCount;
                                    const tokenEnd = tokenStart + cpLen(token.text);
                                    if (relativeVisualColForHighlight >= tokenStart &&
                                        relativeVisualColForHighlight < tokenEnd) {
                                        const charToHighlight = cpSlice(token.text, relativeVisualColForHighlight - tokenStart, relativeVisualColForHighlight - tokenStart + 1);
                                        const highlighted = chalk.inverse(charToHighlight);
                                        display =
                                            cpSlice(token.text, 0, relativeVisualColForHighlight - tokenStart) +
                                                highlighted +
                                                cpSlice(token.text, relativeVisualColForHighlight - tokenStart + 1);
                                    }
                                    charCount = tokenEnd;
                                }
                                const color = token.type === 'command' || token.type === 'file'
                                    ? theme.text.accent
                                    : undefined;
                                renderedLine.push(_jsx(Text, { color: color, children: display }, `token-${tokenIdx}`));
                            });
                            const currentLineGhost = isOnCursorLine ? inlineGhost : '';
                            if (isOnCursorLine &&
                                cursorVisualColAbsolute === cpLen(lineText)) {
                                if (!currentLineGhost) {
                                    renderedLine.push(_jsx(Text, { children: chalk.inverse(' ') }, "cursor-end"));
                                }
                            }
                            const showCursorBeforeGhost = focus &&
                                isOnCursorLine &&
                                cursorVisualColAbsolute === cpLen(lineText) &&
                                currentLineGhost;
                            return (_jsxs(Text, { children: [renderedLine, showCursorBeforeGhost && chalk.inverse(' '), currentLineGhost && (_jsx(Text, { color: theme.text.secondary, children: currentLineGhost }))] }, `line-${visualIdxInRenderedSet}`));
                        })
                            .concat(additionalLines.map((ghostLine, index) => {
                            const padding = Math.max(0, inputWidth - stringWidth(ghostLine));
                            return (_jsxs(Text, { color: theme.text.secondary, children: [ghostLine, ' '.repeat(padding)] }, `ghost-line-${index}`));
                        }))) })] }), completion.showSuggestions && (_jsx(Box, { paddingRight: 2, children: _jsx(SuggestionsDisplay, { suggestions: completion.suggestions, activeIndex: completion.activeSuggestionIndex, isLoading: completion.isLoadingSuggestions, width: suggestionsWidth, scrollOffset: completion.visibleStartIndex, userInput: buffer.text }) })), reverseSearchActive && (_jsx(Box, { paddingRight: 2, children: _jsx(SuggestionsDisplay, { suggestions: reverseSearchCompletion.suggestions, activeIndex: reverseSearchCompletion.activeSuggestionIndex, isLoading: reverseSearchCompletion.isLoadingSuggestions, width: suggestionsWidth, scrollOffset: reverseSearchCompletion.visibleStartIndex, userInput: buffer.text }) }))] }));
};
//# sourceMappingURL=InputPrompt.js.map