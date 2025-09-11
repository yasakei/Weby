/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { GenerateContentConfig, PartListUnion, Content, GenerateContentResponse } from '@google/genai';
import type { ServerGeminiStreamEvent, ChatCompressionInfo } from './turn.js';
import { Turn } from './turn.js';
import type { Config } from '../config/config.js';
import type { UserTierId } from '../code_assist/types.js';
import { GeminiChat } from './geminiChat.js';
import type { ChatRecordingService } from '../services/chatRecordingService.js';
import type { ContentGenerator, ContentGeneratorConfig } from './contentGenerator.js';
export declare function isThinkingSupported(model: string): boolean;
export declare function isThinkingDefault(model: string): boolean;
/**
 * Returns the index of the content after the fraction of the total characters in the history.
 *
 * Exported for testing purposes.
 */
export declare function findIndexAfterFraction(history: Content[], fraction: number): number;
export declare class GeminiClient {
    private readonly config;
    private chat?;
    private contentGenerator?;
    private readonly embeddingModel;
    private readonly generateContentConfig;
    private sessionTurnCount;
    private readonly loopDetector;
    private lastPromptId;
    private lastSentIdeContext;
    private forceFullIdeContext;
    /**
     * At any point in this conversation, was compression triggered without
     * being forced and did it fail?
     */
    private hasFailedCompressionAttempt;
    constructor(config: Config);
    initialize(contentGeneratorConfig: ContentGeneratorConfig): Promise<void>;
    getContentGenerator(): ContentGenerator;
    getUserTier(): UserTierId | undefined;
    addHistory(content: Content): Promise<void>;
    getChat(): GeminiChat;
    isInitialized(): boolean;
    getHistory(): Content[];
    setHistory(history: Content[], { stripThoughts }?: {
        stripThoughts?: boolean;
    }): void;
    setTools(): Promise<void>;
    resetChat(): Promise<void>;
    getChatRecordingService(): ChatRecordingService | undefined;
    addDirectoryContext(): Promise<void>;
    startChat(extraHistory?: Content[]): Promise<GeminiChat>;
    private getIdeContextParts;
    sendMessageStream(request: PartListUnion, signal: AbortSignal, prompt_id: string, turns?: number, originalModel?: string): AsyncGenerator<ServerGeminiStreamEvent, Turn>;
    generateJson(contents: Content[], schema: Record<string, unknown>, abortSignal: AbortSignal, model: string, config?: GenerateContentConfig): Promise<Record<string, unknown>>;
    generateContent(contents: Content[], generationConfig: GenerateContentConfig, abortSignal: AbortSignal, model: string): Promise<GenerateContentResponse>;
    generateEmbedding(texts: string[]): Promise<number[][]>;
    tryCompressChat(prompt_id: string, force?: boolean): Promise<ChatCompressionInfo>;
    /**
     * Handles falling back to Flash model when persistent 429 errors occur for OAuth users.
     * Uses a fallback handler if provided by the config; otherwise, returns null.
     */
    private handleFlashFallback;
}
export declare const TEST_ONLY: {
    COMPRESSION_PRESERVE_THRESHOLD: number;
    COMPRESSION_TOKEN_THRESHOLD: number;
};
