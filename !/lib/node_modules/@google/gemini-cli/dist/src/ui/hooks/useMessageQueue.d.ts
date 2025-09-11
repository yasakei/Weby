/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { StreamingState } from '../types.js';
export interface UseMessageQueueOptions {
    streamingState: StreamingState;
    submitQuery: (query: string) => void;
}
export interface UseMessageQueueReturn {
    messageQueue: string[];
    addMessage: (message: string) => void;
    clearQueue: () => void;
    getQueuedMessagesText: () => string;
}
/**
 * Hook for managing message queuing during streaming responses.
 * Allows users to queue messages while the AI is responding and automatically
 * sends them when streaming completes.
 */
export declare function useMessageQueue({ streamingState, submitQuery, }: UseMessageQueueOptions): UseMessageQueueReturn;
