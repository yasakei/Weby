/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Command enum for all available keyboard shortcuts
 */
export declare enum Command {
    RETURN = "return",
    ESCAPE = "escape",
    HOME = "home",
    END = "end",
    KILL_LINE_RIGHT = "killLineRight",
    KILL_LINE_LEFT = "killLineLeft",
    CLEAR_INPUT = "clearInput",
    DELETE_WORD_BACKWARD = "deleteWordBackward",
    CLEAR_SCREEN = "clearScreen",
    HISTORY_UP = "historyUp",
    HISTORY_DOWN = "historyDown",
    NAVIGATION_UP = "navigationUp",
    NAVIGATION_DOWN = "navigationDown",
    ACCEPT_SUGGESTION = "acceptSuggestion",
    COMPLETION_UP = "completionUp",
    COMPLETION_DOWN = "completionDown",
    SUBMIT = "submit",
    NEWLINE = "newline",
    OPEN_EXTERNAL_EDITOR = "openExternalEditor",
    PASTE_CLIPBOARD_IMAGE = "pasteClipboardImage",
    SHOW_ERROR_DETAILS = "showErrorDetails",
    TOGGLE_TOOL_DESCRIPTIONS = "toggleToolDescriptions",
    TOGGLE_IDE_CONTEXT_DETAIL = "toggleIDEContextDetail",
    QUIT = "quit",
    EXIT = "exit",
    SHOW_MORE_LINES = "showMoreLines",
    REVERSE_SEARCH = "reverseSearch",
    SUBMIT_REVERSE_SEARCH = "submitReverseSearch",
    ACCEPT_SUGGESTION_REVERSE_SEARCH = "acceptSuggestionReverseSearch"
}
/**
 * Data-driven key binding structure for user configuration
 */
export interface KeyBinding {
    /** The key name (e.g., 'a', 'return', 'tab', 'escape') */
    key?: string;
    /** The key sequence (e.g., '\x18' for Ctrl+X) - alternative to key name */
    sequence?: string;
    /** Control key requirement: true=must be pressed, false=must not be pressed, undefined=ignore */
    ctrl?: boolean;
    /** Shift key requirement: true=must be pressed, false=must not be pressed, undefined=ignore */
    shift?: boolean;
    /** Command/meta key requirement: true=must be pressed, false=must not be pressed, undefined=ignore */
    command?: boolean;
    /** Paste operation requirement: true=must be paste, false=must not be paste, undefined=ignore */
    paste?: boolean;
}
/**
 * Configuration type mapping commands to their key bindings
 */
export type KeyBindingConfig = {
    readonly [C in Command]: readonly KeyBinding[];
};
/**
 * Default key binding configuration
 * Matches the original hard-coded logic exactly
 */
export declare const defaultKeyBindings: KeyBindingConfig;
