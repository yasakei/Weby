/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { GeminiClient } from '../core/client.js';
import type { GeminiChat } from '../core/geminiChat.js';
export interface NextSpeakerResponse {
    reasoning: string;
    next_speaker: 'user' | 'model';
}
export declare function checkNextSpeaker(chat: GeminiChat, geminiClient: GeminiClient, abortSignal: AbortSignal): Promise<NextSpeakerResponse | null>;
