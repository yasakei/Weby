/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as schema from './schema.js';
export * from './schema.js';
import type { WritableStream, ReadableStream } from 'node:stream/web';
export declare class AgentSideConnection implements Client {
    #private;
    constructor(toAgent: (conn: Client) => Agent, input: WritableStream<Uint8Array>, output: ReadableStream<Uint8Array>);
    /**
     * Streams new content to the client including text, tool calls, etc.
     */
    sessionUpdate(params: schema.SessionNotification): Promise<void>;
    /**
     * Request permission before running a tool
     *
     * The agent specifies a series of permission options with different granularity,
     * and the client returns the chosen one.
     */
    requestPermission(params: schema.RequestPermissionRequest): Promise<schema.RequestPermissionResponse>;
    readTextFile(params: schema.ReadTextFileRequest): Promise<schema.ReadTextFileResponse>;
    writeTextFile(params: schema.WriteTextFileRequest): Promise<schema.WriteTextFileResponse>;
}
type Result<T> = {
    result: T;
} | {
    error: ErrorResponse;
};
type ErrorResponse = {
    code: number;
    message: string;
    data?: unknown;
};
export declare class RequestError extends Error {
    code: number;
    data?: {
        details?: string;
    };
    constructor(code: number, message: string, details?: string);
    static parseError(details?: string): RequestError;
    static invalidRequest(details?: string): RequestError;
    static methodNotFound(details?: string): RequestError;
    static invalidParams(details?: string): RequestError;
    static internalError(details?: string): RequestError;
    static authRequired(details?: string): RequestError;
    toResult<T>(): Result<T>;
}
export interface Client {
    requestPermission(params: schema.RequestPermissionRequest): Promise<schema.RequestPermissionResponse>;
    sessionUpdate(params: schema.SessionNotification): Promise<void>;
    writeTextFile(params: schema.WriteTextFileRequest): Promise<schema.WriteTextFileResponse>;
    readTextFile(params: schema.ReadTextFileRequest): Promise<schema.ReadTextFileResponse>;
}
export interface Agent {
    initialize(params: schema.InitializeRequest): Promise<schema.InitializeResponse>;
    newSession(params: schema.NewSessionRequest): Promise<schema.NewSessionResponse>;
    loadSession?(params: schema.LoadSessionRequest): Promise<schema.LoadSessionResponse>;
    authenticate(params: schema.AuthenticateRequest): Promise<void>;
    prompt(params: schema.PromptRequest): Promise<schema.PromptResponse>;
    cancel(params: schema.CancelNotification): Promise<void>;
}
