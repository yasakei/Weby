/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type Config } from '../config/config.js';
import { type Status } from '../core/coreToolScheduler.js';
import { type ThoughtSummary } from '../core/turn.js';
import type { PartListUnion, GenerateContentResponseUsageMetadata } from '@google/genai';
/**
 * Token usage summary for a message or conversation.
 */
export interface TokensSummary {
    input: number;
    output: number;
    cached: number;
    thoughts?: number;
    tool?: number;
    total: number;
}
/**
 * Base fields common to all messages.
 */
export interface BaseMessageRecord {
    id: string;
    timestamp: string;
    content: PartListUnion;
}
/**
 * Record of a tool call execution within a conversation.
 */
export interface ToolCallRecord {
    id: string;
    name: string;
    args: Record<string, unknown>;
    result?: PartListUnion | null;
    status: Status;
    timestamp: string;
    displayName?: string;
    description?: string;
    resultDisplay?: string;
    renderOutputAsMarkdown?: boolean;
}
/**
 * Message type and message type-specific fields.
 */
export type ConversationRecordExtra = {
    type: 'user';
} | {
    type: 'gemini';
    toolCalls?: ToolCallRecord[];
    thoughts?: Array<ThoughtSummary & {
        timestamp: string;
    }>;
    tokens?: TokensSummary | null;
    model?: string;
};
/**
 * A single message record in a conversation.
 */
export type MessageRecord = BaseMessageRecord & ConversationRecordExtra;
/**
 * Complete conversation record stored in session files.
 */
export interface ConversationRecord {
    sessionId: string;
    projectHash: string;
    startTime: string;
    lastUpdated: string;
    messages: MessageRecord[];
}
/**
 * Data structure for resuming an existing session.
 */
export interface ResumedSessionData {
    conversation: ConversationRecord;
    filePath: string;
}
/**
 * Service for automatically recording chat conversations to disk.
 *
 * This service provides comprehensive conversation recording that captures:
 * - All user and assistant messages
 * - Tool calls and their execution results
 * - Token usage statistics
 * - Assistant thoughts and reasoning
 *
 * Sessions are stored as JSON files in ~/.gemini/tmp/<project_hash>/chats/
 */
export declare class ChatRecordingService {
    private conversationFile;
    private cachedLastConvData;
    private sessionId;
    private projectHash;
    private queuedThoughts;
    private queuedTokens;
    private config;
    constructor(config: Config);
    /**
     * Initializes the chat recording service: creates a new conversation file and associates it with
     * this service instance, or resumes from an existing session if resumedSessionData is provided.
     */
    initialize(resumedSessionData?: ResumedSessionData): void;
    private getLastMessage;
    private newMessage;
    /**
     * Records a message in the conversation.
     */
    recordMessage(message: {
        type: ConversationRecordExtra['type'];
        content: PartListUnion;
    }): void;
    /**
     * Records a thought from the assistant's reasoning process.
     */
    recordThought(thought: ThoughtSummary): void;
    /**
     * Updates the tokens for the last message in the conversation (which should be by Gemini).
     */
    recordMessageTokens(respUsageMetadata: GenerateContentResponseUsageMetadata): void;
    /**
     * Adds tool calls to the last message in the conversation (which should be by Gemini).
     * This method enriches tool calls with metadata from the ToolRegistry.
     */
    recordToolCalls(toolCalls: ToolCallRecord[]): void;
    /**
     * Loads up the conversation record from disk.
     */
    private readConversation;
    /**
     * Saves the conversation record; overwrites the file.
     */
    private writeConversation;
    /**
     * Convenient helper for updating the conversation without file reading and writing and time
     * updating boilerplate.
     */
    private updateConversation;
    /**
     * Deletes a session file by session ID.
     */
    deleteSession(sessionId: string): void;
}
