/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
import type { TextBuffer } from './shared/text-buffer.js';
import type { Key } from '../hooks/useKeypress.js';
import type { CommandContext, SlashCommand } from '../commands/types.js';
import type { Config } from '@google/gemini-cli-core';
export interface InputPromptProps {
    buffer: TextBuffer;
    onSubmit: (value: string) => void;
    userMessages: readonly string[];
    onClearScreen: () => void;
    config: Config;
    slashCommands: readonly SlashCommand[];
    commandContext: CommandContext;
    placeholder?: string;
    focus?: boolean;
    inputWidth: number;
    suggestionsWidth: number;
    shellModeActive: boolean;
    setShellModeActive: (value: boolean) => void;
    onEscapePromptChange?: (showPrompt: boolean) => void;
    vimHandleInput?: (key: Key) => boolean;
}
export declare const InputPrompt: React.FC<InputPromptProps>;
