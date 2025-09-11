/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Meter } from '@opentelemetry/api';
import type { Config } from '../config/config.js';
export declare enum FileOperation {
    CREATE = "create",
    READ = "read",
    UPDATE = "update"
}
export declare function getMeter(): Meter | undefined;
export declare function initializeMetrics(config: Config): void;
export declare function recordChatCompressionMetrics(config: Config, args: {
    tokens_before: number;
    tokens_after: number;
}): void;
export declare function recordToolCallMetrics(config: Config, functionName: string, durationMs: number, success: boolean, decision?: 'accept' | 'reject' | 'modify' | 'auto_accept', tool_type?: 'native' | 'mcp'): void;
export declare function recordTokenUsageMetrics(config: Config, model: string, tokenCount: number, type: 'input' | 'output' | 'thought' | 'cache' | 'tool'): void;
export declare function recordApiResponseMetrics(config: Config, model: string, durationMs: number, statusCode?: number | string, error?: string): void;
export declare function recordApiErrorMetrics(config: Config, model: string, durationMs: number, statusCode?: number | string, errorType?: string): void;
export declare function recordFileOperationMetric(config: Config, operation: FileOperation, lines?: number, mimetype?: string, extension?: string, programming_language?: string): void;
/**
 * Records a metric for when an invalid chunk is received from a stream.
 */
export declare function recordInvalidChunk(config: Config): void;
/**
 * Records a metric for when a retry is triggered due to a content error.
 */
export declare function recordContentRetry(config: Config): void;
/**
 * Records a metric for when all content error retries have failed for a request.
 */
export declare function recordContentRetryFailure(config: Config): void;
