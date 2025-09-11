/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Config } from '../config/config.js';
import type { ApiErrorEvent, ApiRequestEvent, ApiResponseEvent, FileOperationEvent, IdeConnectionEvent, StartSessionEvent, ToolCallEvent, UserPromptEvent, FlashFallbackEvent, NextSpeakerCheckEvent, LoopDetectedEvent, SlashCommandEvent, ConversationFinishedEvent, KittySequenceOverflowEvent, ChatCompressionEvent, MalformedJsonResponseEvent, InvalidChunkEvent, ContentRetryEvent, ContentRetryFailureEvent } from './types.js';
export declare function logCliConfiguration(config: Config, event: StartSessionEvent): void;
export declare function logUserPrompt(config: Config, event: UserPromptEvent): void;
export declare function logToolCall(config: Config, event: ToolCallEvent): void;
export declare function logFileOperation(config: Config, event: FileOperationEvent): void;
export declare function logApiRequest(config: Config, event: ApiRequestEvent): void;
export declare function logFlashFallback(config: Config, event: FlashFallbackEvent): void;
export declare function logApiError(config: Config, event: ApiErrorEvent): void;
export declare function logApiResponse(config: Config, event: ApiResponseEvent): void;
export declare function logLoopDetected(config: Config, event: LoopDetectedEvent): void;
export declare function logNextSpeakerCheck(config: Config, event: NextSpeakerCheckEvent): void;
export declare function logSlashCommand(config: Config, event: SlashCommandEvent): void;
export declare function logIdeConnection(config: Config, event: IdeConnectionEvent): void;
export declare function logConversationFinishedEvent(config: Config, event: ConversationFinishedEvent): void;
export declare function logChatCompression(config: Config, event: ChatCompressionEvent): void;
export declare function logKittySequenceOverflow(config: Config, event: KittySequenceOverflowEvent): void;
export declare function logMalformedJsonResponse(config: Config, event: MalformedJsonResponseEvent): void;
export declare function logInvalidChunk(config: Config, event: InvalidChunkEvent): void;
export declare function logContentRetry(config: Config, event: ContentRetryEvent): void;
export declare function logContentRetryFailure(config: Config, event: ContentRetryFailureEvent): void;
