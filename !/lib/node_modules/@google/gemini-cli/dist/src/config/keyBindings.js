/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Command enum for all available keyboard shortcuts
 */
export var Command;
(function (Command) {
    // Basic bindings
    Command["RETURN"] = "return";
    Command["ESCAPE"] = "escape";
    // Cursor movement
    Command["HOME"] = "home";
    Command["END"] = "end";
    // Text deletion
    Command["KILL_LINE_RIGHT"] = "killLineRight";
    Command["KILL_LINE_LEFT"] = "killLineLeft";
    Command["CLEAR_INPUT"] = "clearInput";
    Command["DELETE_WORD_BACKWARD"] = "deleteWordBackward";
    // Screen control
    Command["CLEAR_SCREEN"] = "clearScreen";
    // History navigation
    Command["HISTORY_UP"] = "historyUp";
    Command["HISTORY_DOWN"] = "historyDown";
    Command["NAVIGATION_UP"] = "navigationUp";
    Command["NAVIGATION_DOWN"] = "navigationDown";
    // Auto-completion
    Command["ACCEPT_SUGGESTION"] = "acceptSuggestion";
    Command["COMPLETION_UP"] = "completionUp";
    Command["COMPLETION_DOWN"] = "completionDown";
    // Text input
    Command["SUBMIT"] = "submit";
    Command["NEWLINE"] = "newline";
    // External tools
    Command["OPEN_EXTERNAL_EDITOR"] = "openExternalEditor";
    Command["PASTE_CLIPBOARD_IMAGE"] = "pasteClipboardImage";
    // App level bindings
    Command["SHOW_ERROR_DETAILS"] = "showErrorDetails";
    Command["TOGGLE_TOOL_DESCRIPTIONS"] = "toggleToolDescriptions";
    Command["TOGGLE_IDE_CONTEXT_DETAIL"] = "toggleIDEContextDetail";
    Command["QUIT"] = "quit";
    Command["EXIT"] = "exit";
    Command["SHOW_MORE_LINES"] = "showMoreLines";
    // Shell commands
    Command["REVERSE_SEARCH"] = "reverseSearch";
    Command["SUBMIT_REVERSE_SEARCH"] = "submitReverseSearch";
    Command["ACCEPT_SUGGESTION_REVERSE_SEARCH"] = "acceptSuggestionReverseSearch";
})(Command || (Command = {}));
/**
 * Default key binding configuration
 * Matches the original hard-coded logic exactly
 */
export const defaultKeyBindings = {
    // Basic bindings
    [Command.RETURN]: [{ key: 'return' }],
    [Command.ESCAPE]: [{ key: 'escape' }],
    // Cursor movement
    [Command.HOME]: [{ key: 'a', ctrl: true }],
    [Command.END]: [{ key: 'e', ctrl: true }],
    // Text deletion
    [Command.KILL_LINE_RIGHT]: [{ key: 'k', ctrl: true }],
    [Command.KILL_LINE_LEFT]: [{ key: 'u', ctrl: true }],
    [Command.CLEAR_INPUT]: [{ key: 'c', ctrl: true }],
    // Added command (meta/alt/option) for mac compatibility
    [Command.DELETE_WORD_BACKWARD]: [
        { key: 'backspace', ctrl: true },
        { key: 'backspace', command: true },
    ],
    // Screen control
    [Command.CLEAR_SCREEN]: [{ key: 'l', ctrl: true }],
    // History navigation
    [Command.HISTORY_UP]: [{ key: 'p', ctrl: true }],
    [Command.HISTORY_DOWN]: [{ key: 'n', ctrl: true }],
    [Command.NAVIGATION_UP]: [{ key: 'up' }],
    [Command.NAVIGATION_DOWN]: [{ key: 'down' }],
    // Auto-completion
    [Command.ACCEPT_SUGGESTION]: [{ key: 'tab' }, { key: 'return', ctrl: false }],
    // Completion navigation (arrow or Ctrl+P/N)
    [Command.COMPLETION_UP]: [{ key: 'up' }, { key: 'p', ctrl: true }],
    [Command.COMPLETION_DOWN]: [{ key: 'down' }, { key: 'n', ctrl: true }],
    // Text input
    // Must also exclude shift to allow shift+enter for newline
    [Command.SUBMIT]: [
        {
            key: 'return',
            ctrl: false,
            command: false,
            paste: false,
            shift: false,
        },
    ],
    // Split into multiple data-driven bindings
    // Now also includes shift+enter for multi-line input
    [Command.NEWLINE]: [
        { key: 'return', ctrl: true },
        { key: 'return', command: true },
        { key: 'return', paste: true },
        { key: 'return', shift: true },
        { key: 'j', ctrl: true },
    ],
    // External tools
    [Command.OPEN_EXTERNAL_EDITOR]: [
        { key: 'x', ctrl: true },
        { sequence: '\x18', ctrl: true },
    ],
    [Command.PASTE_CLIPBOARD_IMAGE]: [{ key: 'v', ctrl: true }],
    // App level bindings
    [Command.SHOW_ERROR_DETAILS]: [{ key: 'o', ctrl: true }],
    [Command.TOGGLE_TOOL_DESCRIPTIONS]: [{ key: 't', ctrl: true }],
    [Command.TOGGLE_IDE_CONTEXT_DETAIL]: [{ key: 'g', ctrl: true }],
    [Command.QUIT]: [{ key: 'c', ctrl: true }],
    [Command.EXIT]: [{ key: 'd', ctrl: true }],
    [Command.SHOW_MORE_LINES]: [{ key: 's', ctrl: true }],
    // Shell commands
    [Command.REVERSE_SEARCH]: [{ key: 'r', ctrl: true }],
    // Note: original logic ONLY checked ctrl=false, ignored meta/shift/paste
    [Command.SUBMIT_REVERSE_SEARCH]: [{ key: 'return', ctrl: false }],
    [Command.ACCEPT_SUGGESTION_REVERSE_SEARCH]: [{ key: 'tab' }],
};
//# sourceMappingURL=keyBindings.js.map