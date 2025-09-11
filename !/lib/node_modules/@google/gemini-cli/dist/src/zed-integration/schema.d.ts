/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { z } from 'zod';
export declare const AGENT_METHODS: {
    authenticate: string;
    initialize: string;
    session_cancel: string;
    session_load: string;
    session_new: string;
    session_prompt: string;
};
export declare const CLIENT_METHODS: {
    fs_read_text_file: string;
    fs_write_text_file: string;
    session_request_permission: string;
    session_update: string;
};
export declare const PROTOCOL_VERSION = 1;
export type WriteTextFileRequest = z.infer<typeof writeTextFileRequestSchema>;
export type ReadTextFileRequest = z.infer<typeof readTextFileRequestSchema>;
export type PermissionOptionKind = z.infer<typeof permissionOptionKindSchema>;
export type Role = z.infer<typeof roleSchema>;
export type TextResourceContents = z.infer<typeof textResourceContentsSchema>;
export type BlobResourceContents = z.infer<typeof blobResourceContentsSchema>;
export type ToolKind = z.infer<typeof toolKindSchema>;
export type ToolCallStatus = z.infer<typeof toolCallStatusSchema>;
export type WriteTextFileResponse = z.infer<typeof writeTextFileResponseSchema>;
export type ReadTextFileResponse = z.infer<typeof readTextFileResponseSchema>;
export type RequestPermissionOutcome = z.infer<typeof requestPermissionOutcomeSchema>;
export type CancelNotification = z.infer<typeof cancelNotificationSchema>;
export type AuthenticateRequest = z.infer<typeof authenticateRequestSchema>;
export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;
export type NewSessionResponse = z.infer<typeof newSessionResponseSchema>;
export type LoadSessionResponse = z.infer<typeof loadSessionResponseSchema>;
export type StopReason = z.infer<typeof stopReasonSchema>;
export type PromptResponse = z.infer<typeof promptResponseSchema>;
export type ToolCallLocation = z.infer<typeof toolCallLocationSchema>;
export type PlanEntry = z.infer<typeof planEntrySchema>;
export type PermissionOption = z.infer<typeof permissionOptionSchema>;
export type Annotations = z.infer<typeof annotationsSchema>;
export type RequestPermissionResponse = z.infer<typeof requestPermissionResponseSchema>;
export type FileSystemCapability = z.infer<typeof fileSystemCapabilitySchema>;
export type EnvVariable = z.infer<typeof envVariableSchema>;
export type McpServer = z.infer<typeof mcpServerSchema>;
export type AgentCapabilities = z.infer<typeof agentCapabilitiesSchema>;
export type AuthMethod = z.infer<typeof authMethodSchema>;
export type PromptCapabilities = z.infer<typeof promptCapabilitiesSchema>;
export type ClientResponse = z.infer<typeof clientResponseSchema>;
export type ClientNotification = z.infer<typeof clientNotificationSchema>;
export type EmbeddedResourceResource = z.infer<typeof embeddedResourceResourceSchema>;
export type NewSessionRequest = z.infer<typeof newSessionRequestSchema>;
export type LoadSessionRequest = z.infer<typeof loadSessionRequestSchema>;
export type InitializeResponse = z.infer<typeof initializeResponseSchema>;
export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type ToolCallContent = z.infer<typeof toolCallContentSchema>;
export type ToolCall = z.infer<typeof toolCallSchema>;
export type ClientCapabilities = z.infer<typeof clientCapabilitiesSchema>;
export type PromptRequest = z.infer<typeof promptRequestSchema>;
export type SessionUpdate = z.infer<typeof sessionUpdateSchema>;
export type AgentResponse = z.infer<typeof agentResponseSchema>;
export type RequestPermissionRequest = z.infer<typeof requestPermissionRequestSchema>;
export type InitializeRequest = z.infer<typeof initializeRequestSchema>;
export type SessionNotification = z.infer<typeof sessionNotificationSchema>;
export type ClientRequest = z.infer<typeof clientRequestSchema>;
export type AgentRequest = z.infer<typeof agentRequestSchema>;
export type AgentNotification = z.infer<typeof agentNotificationSchema>;
export declare const writeTextFileRequestSchema: z.ZodObject<{
    content: z.ZodString;
    path: z.ZodString;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    path: string;
    sessionId: string;
}, {
    content: string;
    path: string;
    sessionId: string;
}>;
export declare const readTextFileRequestSchema: z.ZodObject<{
    limit: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    path: z.ZodString;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    sessionId: string;
    line?: number | null | undefined;
    limit?: number | null | undefined;
}, {
    path: string;
    sessionId: string;
    line?: number | null | undefined;
    limit?: number | null | undefined;
}>;
export declare const permissionOptionKindSchema: z.ZodUnion<[z.ZodLiteral<"allow_once">, z.ZodLiteral<"allow_always">, z.ZodLiteral<"reject_once">, z.ZodLiteral<"reject_always">]>;
export declare const roleSchema: z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>;
export declare const textResourceContentsSchema: z.ZodObject<{
    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    text: z.ZodString;
    uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    uri: string;
    mimeType?: string | null | undefined;
}, {
    text: string;
    uri: string;
    mimeType?: string | null | undefined;
}>;
export declare const blobResourceContentsSchema: z.ZodObject<{
    blob: z.ZodString;
    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uri: string;
    blob: string;
    mimeType?: string | null | undefined;
}, {
    uri: string;
    blob: string;
    mimeType?: string | null | undefined;
}>;
export declare const toolKindSchema: z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>;
export declare const toolCallStatusSchema: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>;
export declare const writeTextFileResponseSchema: z.ZodNull;
export declare const readTextFileResponseSchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export declare const requestPermissionOutcomeSchema: z.ZodUnion<[z.ZodObject<{
    outcome: z.ZodLiteral<"cancelled">;
}, "strip", z.ZodTypeAny, {
    outcome: "cancelled";
}, {
    outcome: "cancelled";
}>, z.ZodObject<{
    optionId: z.ZodString;
    outcome: z.ZodLiteral<"selected">;
}, "strip", z.ZodTypeAny, {
    outcome: "selected";
    optionId: string;
}, {
    outcome: "selected";
    optionId: string;
}>]>;
export declare const cancelNotificationSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
export declare const authenticateRequestSchema: z.ZodObject<{
    methodId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    methodId: string;
}, {
    methodId: string;
}>;
export declare const authenticateResponseSchema: z.ZodNull;
export declare const newSessionResponseSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
export declare const loadSessionResponseSchema: z.ZodNull;
export declare const stopReasonSchema: z.ZodUnion<[z.ZodLiteral<"end_turn">, z.ZodLiteral<"max_tokens">, z.ZodLiteral<"refusal">, z.ZodLiteral<"cancelled">]>;
export declare const promptResponseSchema: z.ZodObject<{
    stopReason: z.ZodUnion<[z.ZodLiteral<"end_turn">, z.ZodLiteral<"max_tokens">, z.ZodLiteral<"refusal">, z.ZodLiteral<"cancelled">]>;
}, "strip", z.ZodTypeAny, {
    stopReason: "cancelled" | "end_turn" | "max_tokens" | "refusal";
}, {
    stopReason: "cancelled" | "end_turn" | "max_tokens" | "refusal";
}>;
export declare const toolCallLocationSchema: z.ZodObject<{
    line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    line?: number | null | undefined;
}, {
    path: string;
    line?: number | null | undefined;
}>;
export declare const planEntrySchema: z.ZodObject<{
    content: z.ZodString;
    priority: z.ZodUnion<[z.ZodLiteral<"high">, z.ZodLiteral<"medium">, z.ZodLiteral<"low">]>;
    status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">]>;
}, "strip", z.ZodTypeAny, {
    content: string;
    status: "pending" | "in_progress" | "completed";
    priority: "medium" | "high" | "low";
}, {
    content: string;
    status: "pending" | "in_progress" | "completed";
    priority: "medium" | "high" | "low";
}>;
export declare const permissionOptionSchema: z.ZodObject<{
    kind: z.ZodUnion<[z.ZodLiteral<"allow_once">, z.ZodLiteral<"allow_always">, z.ZodLiteral<"reject_once">, z.ZodLiteral<"reject_always">]>;
    name: z.ZodString;
    optionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
    optionId: string;
}, {
    name: string;
    kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
    optionId: string;
}>;
export declare const annotationsSchema: z.ZodObject<{
    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    priority?: number | null | undefined;
    audience?: ("user" | "assistant")[] | null | undefined;
    lastModified?: string | null | undefined;
}, {
    priority?: number | null | undefined;
    audience?: ("user" | "assistant")[] | null | undefined;
    lastModified?: string | null | undefined;
}>;
export declare const requestPermissionResponseSchema: z.ZodObject<{
    outcome: z.ZodUnion<[z.ZodObject<{
        outcome: z.ZodLiteral<"cancelled">;
    }, "strip", z.ZodTypeAny, {
        outcome: "cancelled";
    }, {
        outcome: "cancelled";
    }>, z.ZodObject<{
        optionId: z.ZodString;
        outcome: z.ZodLiteral<"selected">;
    }, "strip", z.ZodTypeAny, {
        outcome: "selected";
        optionId: string;
    }, {
        outcome: "selected";
        optionId: string;
    }>]>;
}, "strip", z.ZodTypeAny, {
    outcome: {
        outcome: "cancelled";
    } | {
        outcome: "selected";
        optionId: string;
    };
}, {
    outcome: {
        outcome: "cancelled";
    } | {
        outcome: "selected";
        optionId: string;
    };
}>;
export declare const fileSystemCapabilitySchema: z.ZodObject<{
    readTextFile: z.ZodBoolean;
    writeTextFile: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    readTextFile: boolean;
    writeTextFile: boolean;
}, {
    readTextFile: boolean;
    writeTextFile: boolean;
}>;
export declare const envVariableSchema: z.ZodObject<{
    name: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    value: string;
}, {
    name: string;
    value: string;
}>;
export declare const mcpServerSchema: z.ZodObject<{
    args: z.ZodArray<z.ZodString, "many">;
    command: z.ZodString;
    env: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        value: string;
    }, {
        name: string;
        value: string;
    }>, "many">;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    args: string[];
    command: string;
    env: {
        name: string;
        value: string;
    }[];
}, {
    name: string;
    args: string[];
    command: string;
    env: {
        name: string;
        value: string;
    }[];
}>;
export declare const promptCapabilitiesSchema: z.ZodObject<{
    audio: z.ZodOptional<z.ZodBoolean>;
    embeddedContext: z.ZodOptional<z.ZodBoolean>;
    image: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    audio?: boolean | undefined;
    image?: boolean | undefined;
    embeddedContext?: boolean | undefined;
}, {
    audio?: boolean | undefined;
    image?: boolean | undefined;
    embeddedContext?: boolean | undefined;
}>;
export declare const agentCapabilitiesSchema: z.ZodObject<{
    loadSession: z.ZodOptional<z.ZodBoolean>;
    promptCapabilities: z.ZodOptional<z.ZodObject<{
        audio: z.ZodOptional<z.ZodBoolean>;
        embeddedContext: z.ZodOptional<z.ZodBoolean>;
        image: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        audio?: boolean | undefined;
        image?: boolean | undefined;
        embeddedContext?: boolean | undefined;
    }, {
        audio?: boolean | undefined;
        image?: boolean | undefined;
        embeddedContext?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    loadSession?: boolean | undefined;
    promptCapabilities?: {
        audio?: boolean | undefined;
        image?: boolean | undefined;
        embeddedContext?: boolean | undefined;
    } | undefined;
}, {
    loadSession?: boolean | undefined;
    promptCapabilities?: {
        audio?: boolean | undefined;
        image?: boolean | undefined;
        embeddedContext?: boolean | undefined;
    } | undefined;
}>;
export declare const authMethodSchema: z.ZodObject<{
    description: z.ZodNullable<z.ZodString>;
    id: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    description: string | null;
}, {
    id: string;
    name: string;
    description: string | null;
}>;
export declare const clientResponseSchema: z.ZodUnion<[z.ZodNull, z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>, z.ZodObject<{
    outcome: z.ZodUnion<[z.ZodObject<{
        outcome: z.ZodLiteral<"cancelled">;
    }, "strip", z.ZodTypeAny, {
        outcome: "cancelled";
    }, {
        outcome: "cancelled";
    }>, z.ZodObject<{
        optionId: z.ZodString;
        outcome: z.ZodLiteral<"selected">;
    }, "strip", z.ZodTypeAny, {
        outcome: "selected";
        optionId: string;
    }, {
        outcome: "selected";
        optionId: string;
    }>]>;
}, "strip", z.ZodTypeAny, {
    outcome: {
        outcome: "cancelled";
    } | {
        outcome: "selected";
        optionId: string;
    };
}, {
    outcome: {
        outcome: "cancelled";
    } | {
        outcome: "selected";
        optionId: string;
    };
}>]>;
export declare const clientNotificationSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>;
export declare const embeddedResourceResourceSchema: z.ZodUnion<[z.ZodObject<{
    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    text: z.ZodString;
    uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    uri: string;
    mimeType?: string | null | undefined;
}, {
    text: string;
    uri: string;
    mimeType?: string | null | undefined;
}>, z.ZodObject<{
    blob: z.ZodString;
    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uri: string;
    blob: string;
    mimeType?: string | null | undefined;
}, {
    uri: string;
    blob: string;
    mimeType?: string | null | undefined;
}>]>;
export declare const newSessionRequestSchema: z.ZodObject<{
    cwd: z.ZodString;
    mcpServers: z.ZodArray<z.ZodObject<{
        args: z.ZodArray<z.ZodString, "many">;
        command: z.ZodString;
        env: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value: string;
        }, {
            name: string;
            value: string;
        }>, "many">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}, {
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}>;
export declare const loadSessionRequestSchema: z.ZodObject<{
    cwd: z.ZodString;
    mcpServers: z.ZodArray<z.ZodObject<{
        args: z.ZodArray<z.ZodString, "many">;
        command: z.ZodString;
        env: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value: string;
        }, {
            name: string;
            value: string;
        }>, "many">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }>, "many">;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}, {
    sessionId: string;
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}>;
export declare const initializeResponseSchema: z.ZodObject<{
    agentCapabilities: z.ZodObject<{
        loadSession: z.ZodOptional<z.ZodBoolean>;
        promptCapabilities: z.ZodOptional<z.ZodObject<{
            audio: z.ZodOptional<z.ZodBoolean>;
            embeddedContext: z.ZodOptional<z.ZodBoolean>;
            image: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        }, {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    }, {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    }>;
    authMethods: z.ZodArray<z.ZodObject<{
        description: z.ZodNullable<z.ZodString>;
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        description: string | null;
    }, {
        id: string;
        name: string;
        description: string | null;
    }>, "many">;
    protocolVersion: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    agentCapabilities: {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    };
    authMethods: {
        id: string;
        name: string;
        description: string | null;
    }[];
    protocolVersion: number;
}, {
    agentCapabilities: {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    };
    authMethods: {
        id: string;
        name: string;
        description: string | null;
    }[];
    protocolVersion: number;
}>;
export declare const contentBlockSchema: z.ZodUnion<[z.ZodObject<{
    annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
        lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }>>>;
    text: z.ZodString;
    type: z.ZodLiteral<"text">;
}, "strip", z.ZodTypeAny, {
    text: string;
    type: "text";
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}, {
    text: string;
    type: "text";
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}>, z.ZodObject<{
    annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
        lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }>>>;
    data: z.ZodString;
    mimeType: z.ZodString;
    type: z.ZodLiteral<"image">;
}, "strip", z.ZodTypeAny, {
    data: string;
    type: "image";
    mimeType: string;
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}, {
    data: string;
    type: "image";
    mimeType: string;
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}>, z.ZodObject<{
    annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
        lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }>>>;
    data: z.ZodString;
    mimeType: z.ZodString;
    type: z.ZodLiteral<"audio">;
}, "strip", z.ZodTypeAny, {
    data: string;
    type: "audio";
    mimeType: string;
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}, {
    data: string;
    type: "audio";
    mimeType: string;
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}>, z.ZodObject<{
    annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
        lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }>>>;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    name: z.ZodString;
    size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    type: z.ZodLiteral<"resource_link">;
    uri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "resource_link";
    name: string;
    uri: string;
    size?: number | null | undefined;
    description?: string | null | undefined;
    title?: string | null | undefined;
    mimeType?: string | null | undefined;
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}, {
    type: "resource_link";
    name: string;
    uri: string;
    size?: number | null | undefined;
    description?: string | null | undefined;
    title?: string | null | undefined;
    mimeType?: string | null | undefined;
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}>, z.ZodObject<{
    annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
        lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }, {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    }>>>;
    resource: z.ZodUnion<[z.ZodObject<{
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        text: z.ZodString;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        uri: string;
        mimeType?: string | null | undefined;
    }, {
        text: string;
        uri: string;
        mimeType?: string | null | undefined;
    }>, z.ZodObject<{
        blob: z.ZodString;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        uri: string;
        blob: string;
        mimeType?: string | null | undefined;
    }, {
        uri: string;
        blob: string;
        mimeType?: string | null | undefined;
    }>]>;
    type: z.ZodLiteral<"resource">;
}, "strip", z.ZodTypeAny, {
    type: "resource";
    resource: {
        text: string;
        uri: string;
        mimeType?: string | null | undefined;
    } | {
        uri: string;
        blob: string;
        mimeType?: string | null | undefined;
    };
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}, {
    type: "resource";
    resource: {
        text: string;
        uri: string;
        mimeType?: string | null | undefined;
    } | {
        uri: string;
        blob: string;
        mimeType?: string | null | undefined;
    };
    annotations?: {
        priority?: number | null | undefined;
        audience?: ("user" | "assistant")[] | null | undefined;
        lastModified?: string | null | undefined;
    } | null | undefined;
}>]>;
export declare const toolCallContentSchema: z.ZodUnion<[z.ZodObject<{
    content: z.ZodUnion<[z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        text: z.ZodString;
        type: z.ZodLiteral<"text">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"image">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"audio">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        name: z.ZodString;
        size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        type: z.ZodLiteral<"resource_link">;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        resource: z.ZodUnion<[z.ZodObject<{
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            text: z.ZodString;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }>, z.ZodObject<{
            blob: z.ZodString;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }>]>;
        type: z.ZodLiteral<"resource">;
    }, "strip", z.ZodTypeAny, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>]>;
    type: z.ZodLiteral<"content">;
}, "strip", z.ZodTypeAny, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    type: "content";
}, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    type: "content";
}>, z.ZodObject<{
    newText: z.ZodString;
    oldText: z.ZodNullable<z.ZodString>;
    path: z.ZodString;
    type: z.ZodLiteral<"diff">;
}, "strip", z.ZodTypeAny, {
    type: "diff";
    path: string;
    newText: string;
    oldText: string | null;
}, {
    type: "diff";
    path: string;
    newText: string;
    oldText: string | null;
}>]>;
export declare const toolCallSchema: z.ZodObject<{
    content: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        type: z.ZodLiteral<"content">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    }>, z.ZodObject<{
        newText: z.ZodString;
        oldText: z.ZodNullable<z.ZodString>;
        path: z.ZodString;
        type: z.ZodLiteral<"diff">;
    }, "strip", z.ZodTypeAny, {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    }, {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    }>]>, "many">>;
    kind: z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>;
    locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        line?: number | null | undefined;
    }, {
        path: string;
        line?: number | null | undefined;
    }>, "many">>;
    rawInput: z.ZodOptional<z.ZodUnknown>;
    status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>;
    title: z.ZodString;
    toolCallId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "in_progress" | "completed" | "failed";
    title: string;
    kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
    toolCallId: string;
    content?: ({
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    } | {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    })[] | undefined;
    locations?: {
        path: string;
        line?: number | null | undefined;
    }[] | undefined;
    rawInput?: unknown;
}, {
    status: "pending" | "in_progress" | "completed" | "failed";
    title: string;
    kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
    toolCallId: string;
    content?: ({
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    } | {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    })[] | undefined;
    locations?: {
        path: string;
        line?: number | null | undefined;
    }[] | undefined;
    rawInput?: unknown;
}>;
export declare const clientCapabilitiesSchema: z.ZodObject<{
    fs: z.ZodObject<{
        readTextFile: z.ZodBoolean;
        writeTextFile: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        readTextFile: boolean;
        writeTextFile: boolean;
    }, {
        readTextFile: boolean;
        writeTextFile: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    fs: {
        readTextFile: boolean;
        writeTextFile: boolean;
    };
}, {
    fs: {
        readTextFile: boolean;
        writeTextFile: boolean;
    };
}>;
export declare const promptRequestSchema: z.ZodObject<{
    prompt: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        text: z.ZodString;
        type: z.ZodLiteral<"text">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"image">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"audio">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        name: z.ZodString;
        size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        type: z.ZodLiteral<"resource_link">;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        resource: z.ZodUnion<[z.ZodObject<{
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            text: z.ZodString;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }>, z.ZodObject<{
            blob: z.ZodString;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }>]>;
        type: z.ZodLiteral<"resource">;
    }, "strip", z.ZodTypeAny, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>]>, "many">;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    prompt: ({
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    })[];
}, {
    sessionId: string;
    prompt: ({
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    })[];
}>;
export declare const sessionUpdateSchema: z.ZodUnion<[z.ZodObject<{
    content: z.ZodUnion<[z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        text: z.ZodString;
        type: z.ZodLiteral<"text">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"image">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"audio">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        name: z.ZodString;
        size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        type: z.ZodLiteral<"resource_link">;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        resource: z.ZodUnion<[z.ZodObject<{
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            text: z.ZodString;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }>, z.ZodObject<{
            blob: z.ZodString;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }>]>;
        type: z.ZodLiteral<"resource">;
    }, "strip", z.ZodTypeAny, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>]>;
    sessionUpdate: z.ZodLiteral<"user_message_chunk">;
}, "strip", z.ZodTypeAny, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    sessionUpdate: "user_message_chunk";
}, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    sessionUpdate: "user_message_chunk";
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        text: z.ZodString;
        type: z.ZodLiteral<"text">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"image">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"audio">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        name: z.ZodString;
        size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        type: z.ZodLiteral<"resource_link">;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        resource: z.ZodUnion<[z.ZodObject<{
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            text: z.ZodString;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }>, z.ZodObject<{
            blob: z.ZodString;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }>]>;
        type: z.ZodLiteral<"resource">;
    }, "strip", z.ZodTypeAny, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>]>;
    sessionUpdate: z.ZodLiteral<"agent_message_chunk">;
}, "strip", z.ZodTypeAny, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    sessionUpdate: "agent_message_chunk";
}, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    sessionUpdate: "agent_message_chunk";
}>, z.ZodObject<{
    content: z.ZodUnion<[z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        text: z.ZodString;
        type: z.ZodLiteral<"text">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"image">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"audio">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        name: z.ZodString;
        size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        type: z.ZodLiteral<"resource_link">;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        resource: z.ZodUnion<[z.ZodObject<{
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            text: z.ZodString;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }>, z.ZodObject<{
            blob: z.ZodString;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }>]>;
        type: z.ZodLiteral<"resource">;
    }, "strip", z.ZodTypeAny, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>]>;
    sessionUpdate: z.ZodLiteral<"agent_thought_chunk">;
}, "strip", z.ZodTypeAny, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    sessionUpdate: "agent_thought_chunk";
}, {
    content: {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    };
    sessionUpdate: "agent_thought_chunk";
}>, z.ZodObject<{
    content: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        type: z.ZodLiteral<"content">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    }>, z.ZodObject<{
        newText: z.ZodString;
        oldText: z.ZodNullable<z.ZodString>;
        path: z.ZodString;
        type: z.ZodLiteral<"diff">;
    }, "strip", z.ZodTypeAny, {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    }, {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    }>]>, "many">>;
    kind: z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>;
    locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        line?: number | null | undefined;
    }, {
        path: string;
        line?: number | null | undefined;
    }>, "many">>;
    rawInput: z.ZodOptional<z.ZodUnknown>;
    sessionUpdate: z.ZodLiteral<"tool_call">;
    status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>;
    title: z.ZodString;
    toolCallId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "in_progress" | "completed" | "failed";
    title: string;
    kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
    toolCallId: string;
    sessionUpdate: "tool_call";
    content?: ({
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    } | {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    })[] | undefined;
    locations?: {
        path: string;
        line?: number | null | undefined;
    }[] | undefined;
    rawInput?: unknown;
}, {
    status: "pending" | "in_progress" | "completed" | "failed";
    title: string;
    kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
    toolCallId: string;
    sessionUpdate: "tool_call";
    content?: ({
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    } | {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    })[] | undefined;
    locations?: {
        path: string;
        line?: number | null | undefined;
    }[] | undefined;
    rawInput?: unknown;
}>, z.ZodObject<{
    content: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        type: z.ZodLiteral<"content">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    }>, z.ZodObject<{
        newText: z.ZodString;
        oldText: z.ZodNullable<z.ZodString>;
        path: z.ZodString;
        type: z.ZodLiteral<"diff">;
    }, "strip", z.ZodTypeAny, {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    }, {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    }>]>, "many">>>;
    kind: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>>>;
    locations: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
        line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        line?: number | null | undefined;
    }, {
        path: string;
        line?: number | null | undefined;
    }>, "many">>>;
    rawInput: z.ZodOptional<z.ZodUnknown>;
    sessionUpdate: z.ZodLiteral<"tool_call_update">;
    status: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>>>;
    title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    toolCallId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    toolCallId: string;
    sessionUpdate: "tool_call_update";
    content?: ({
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    } | {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    })[] | null | undefined;
    status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
    title?: string | null | undefined;
    kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
    locations?: {
        path: string;
        line?: number | null | undefined;
    }[] | null | undefined;
    rawInput?: unknown;
}, {
    toolCallId: string;
    sessionUpdate: "tool_call_update";
    content?: ({
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        type: "content";
    } | {
        type: "diff";
        path: string;
        newText: string;
        oldText: string | null;
    })[] | null | undefined;
    status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
    title?: string | null | undefined;
    kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
    locations?: {
        path: string;
        line?: number | null | undefined;
    }[] | null | undefined;
    rawInput?: unknown;
}>, z.ZodObject<{
    entries: z.ZodArray<z.ZodObject<{
        content: z.ZodString;
        priority: z.ZodUnion<[z.ZodLiteral<"high">, z.ZodLiteral<"medium">, z.ZodLiteral<"low">]>;
        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">]>;
    }, "strip", z.ZodTypeAny, {
        content: string;
        status: "pending" | "in_progress" | "completed";
        priority: "medium" | "high" | "low";
    }, {
        content: string;
        status: "pending" | "in_progress" | "completed";
        priority: "medium" | "high" | "low";
    }>, "many">;
    sessionUpdate: z.ZodLiteral<"plan">;
}, "strip", z.ZodTypeAny, {
    entries: {
        content: string;
        status: "pending" | "in_progress" | "completed";
        priority: "medium" | "high" | "low";
    }[];
    sessionUpdate: "plan";
}, {
    entries: {
        content: string;
        status: "pending" | "in_progress" | "completed";
        priority: "medium" | "high" | "low";
    }[];
    sessionUpdate: "plan";
}>]>;
export declare const agentResponseSchema: z.ZodUnion<[z.ZodObject<{
    agentCapabilities: z.ZodObject<{
        loadSession: z.ZodOptional<z.ZodBoolean>;
        promptCapabilities: z.ZodOptional<z.ZodObject<{
            audio: z.ZodOptional<z.ZodBoolean>;
            embeddedContext: z.ZodOptional<z.ZodBoolean>;
            image: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        }, {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    }, {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    }>;
    authMethods: z.ZodArray<z.ZodObject<{
        description: z.ZodNullable<z.ZodString>;
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        description: string | null;
    }, {
        id: string;
        name: string;
        description: string | null;
    }>, "many">;
    protocolVersion: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    agentCapabilities: {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    };
    authMethods: {
        id: string;
        name: string;
        description: string | null;
    }[];
    protocolVersion: number;
}, {
    agentCapabilities: {
        loadSession?: boolean | undefined;
        promptCapabilities?: {
            audio?: boolean | undefined;
            image?: boolean | undefined;
            embeddedContext?: boolean | undefined;
        } | undefined;
    };
    authMethods: {
        id: string;
        name: string;
        description: string | null;
    }[];
    protocolVersion: number;
}>, z.ZodNull, z.ZodObject<{
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
}, {
    sessionId: string;
}>, z.ZodNull, z.ZodObject<{
    stopReason: z.ZodUnion<[z.ZodLiteral<"end_turn">, z.ZodLiteral<"max_tokens">, z.ZodLiteral<"refusal">, z.ZodLiteral<"cancelled">]>;
}, "strip", z.ZodTypeAny, {
    stopReason: "cancelled" | "end_turn" | "max_tokens" | "refusal";
}, {
    stopReason: "cancelled" | "end_turn" | "max_tokens" | "refusal";
}>]>;
export declare const requestPermissionRequestSchema: z.ZodObject<{
    options: z.ZodArray<z.ZodObject<{
        kind: z.ZodUnion<[z.ZodLiteral<"allow_once">, z.ZodLiteral<"allow_always">, z.ZodLiteral<"reject_once">, z.ZodLiteral<"reject_always">]>;
        name: z.ZodString;
        optionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }, {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }>, "many">;
    sessionId: z.ZodString;
    toolCall: z.ZodObject<{
        content: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            content: z.ZodUnion<[z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                text: z.ZodString;
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"image">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"audio">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                name: z.ZodString;
                size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                type: z.ZodLiteral<"resource_link">;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                resource: z.ZodUnion<[z.ZodObject<{
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    text: z.ZodString;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }>, z.ZodObject<{
                    blob: z.ZodString;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }>]>;
                type: z.ZodLiteral<"resource">;
            }, "strip", z.ZodTypeAny, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>]>;
            type: z.ZodLiteral<"content">;
        }, "strip", z.ZodTypeAny, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }>, z.ZodObject<{
            newText: z.ZodString;
            oldText: z.ZodNullable<z.ZodString>;
            path: z.ZodString;
            type: z.ZodLiteral<"diff">;
        }, "strip", z.ZodTypeAny, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }>]>, "many">>;
        kind: z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>;
        locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            line?: number | null | undefined;
        }, {
            path: string;
            line?: number | null | undefined;
        }>, "many">>;
        rawInput: z.ZodOptional<z.ZodUnknown>;
        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>;
        title: z.ZodString;
        toolCallId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    options: {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }[];
    toolCall: {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    };
}, {
    sessionId: string;
    options: {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }[];
    toolCall: {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    };
}>;
export declare const initializeRequestSchema: z.ZodObject<{
    clientCapabilities: z.ZodObject<{
        fs: z.ZodObject<{
            readTextFile: z.ZodBoolean;
            writeTextFile: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            readTextFile: boolean;
            writeTextFile: boolean;
        }, {
            readTextFile: boolean;
            writeTextFile: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    }, {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    }>;
    protocolVersion: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    protocolVersion: number;
    clientCapabilities: {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    };
}, {
    protocolVersion: number;
    clientCapabilities: {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    };
}>;
export declare const sessionNotificationSchema: z.ZodObject<{
    sessionId: z.ZodString;
    update: z.ZodUnion<[z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        sessionUpdate: z.ZodLiteral<"user_message_chunk">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        sessionUpdate: z.ZodLiteral<"agent_message_chunk">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        sessionUpdate: z.ZodLiteral<"agent_thought_chunk">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    }>, z.ZodObject<{
        content: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            content: z.ZodUnion<[z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                text: z.ZodString;
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"image">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"audio">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                name: z.ZodString;
                size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                type: z.ZodLiteral<"resource_link">;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                resource: z.ZodUnion<[z.ZodObject<{
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    text: z.ZodString;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }>, z.ZodObject<{
                    blob: z.ZodString;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }>]>;
                type: z.ZodLiteral<"resource">;
            }, "strip", z.ZodTypeAny, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>]>;
            type: z.ZodLiteral<"content">;
        }, "strip", z.ZodTypeAny, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }>, z.ZodObject<{
            newText: z.ZodString;
            oldText: z.ZodNullable<z.ZodString>;
            path: z.ZodString;
            type: z.ZodLiteral<"diff">;
        }, "strip", z.ZodTypeAny, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }>]>, "many">>;
        kind: z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>;
        locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            line?: number | null | undefined;
        }, {
            path: string;
            line?: number | null | undefined;
        }>, "many">>;
        rawInput: z.ZodOptional<z.ZodUnknown>;
        sessionUpdate: z.ZodLiteral<"tool_call">;
        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>;
        title: z.ZodString;
        toolCallId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }>, z.ZodObject<{
        content: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            content: z.ZodUnion<[z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                text: z.ZodString;
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"image">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"audio">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                name: z.ZodString;
                size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                type: z.ZodLiteral<"resource_link">;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                resource: z.ZodUnion<[z.ZodObject<{
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    text: z.ZodString;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }>, z.ZodObject<{
                    blob: z.ZodString;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }>]>;
                type: z.ZodLiteral<"resource">;
            }, "strip", z.ZodTypeAny, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>]>;
            type: z.ZodLiteral<"content">;
        }, "strip", z.ZodTypeAny, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }>, z.ZodObject<{
            newText: z.ZodString;
            oldText: z.ZodNullable<z.ZodString>;
            path: z.ZodString;
            type: z.ZodLiteral<"diff">;
        }, "strip", z.ZodTypeAny, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }>]>, "many">>>;
        kind: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>>>;
        locations: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            line?: number | null | undefined;
        }, {
            path: string;
            line?: number | null | undefined;
        }>, "many">>>;
        rawInput: z.ZodOptional<z.ZodUnknown>;
        sessionUpdate: z.ZodLiteral<"tool_call_update">;
        status: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        toolCallId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    }, {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    }>, z.ZodObject<{
        entries: z.ZodArray<z.ZodObject<{
            content: z.ZodString;
            priority: z.ZodUnion<[z.ZodLiteral<"high">, z.ZodLiteral<"medium">, z.ZodLiteral<"low">]>;
            status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">]>;
        }, "strip", z.ZodTypeAny, {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }, {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }>, "many">;
        sessionUpdate: z.ZodLiteral<"plan">;
    }, "strip", z.ZodTypeAny, {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    }, {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    }>]>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    update: {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    } | {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    } | {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    } | {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    };
}, {
    sessionId: string;
    update: {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    } | {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    } | {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    } | {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    };
}>;
export declare const clientRequestSchema: z.ZodUnion<[z.ZodObject<{
    content: z.ZodString;
    path: z.ZodString;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
    path: string;
    sessionId: string;
}, {
    content: string;
    path: string;
    sessionId: string;
}>, z.ZodObject<{
    limit: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    path: z.ZodString;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    sessionId: string;
    line?: number | null | undefined;
    limit?: number | null | undefined;
}, {
    path: string;
    sessionId: string;
    line?: number | null | undefined;
    limit?: number | null | undefined;
}>, z.ZodObject<{
    options: z.ZodArray<z.ZodObject<{
        kind: z.ZodUnion<[z.ZodLiteral<"allow_once">, z.ZodLiteral<"allow_always">, z.ZodLiteral<"reject_once">, z.ZodLiteral<"reject_always">]>;
        name: z.ZodString;
        optionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }, {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }>, "many">;
    sessionId: z.ZodString;
    toolCall: z.ZodObject<{
        content: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            content: z.ZodUnion<[z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                text: z.ZodString;
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"image">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"audio">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                name: z.ZodString;
                size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                type: z.ZodLiteral<"resource_link">;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                resource: z.ZodUnion<[z.ZodObject<{
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    text: z.ZodString;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }>, z.ZodObject<{
                    blob: z.ZodString;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }>]>;
                type: z.ZodLiteral<"resource">;
            }, "strip", z.ZodTypeAny, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>]>;
            type: z.ZodLiteral<"content">;
        }, "strip", z.ZodTypeAny, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }>, z.ZodObject<{
            newText: z.ZodString;
            oldText: z.ZodNullable<z.ZodString>;
            path: z.ZodString;
            type: z.ZodLiteral<"diff">;
        }, "strip", z.ZodTypeAny, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }>]>, "many">>;
        kind: z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>;
        locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            line?: number | null | undefined;
        }, {
            path: string;
            line?: number | null | undefined;
        }>, "many">>;
        rawInput: z.ZodOptional<z.ZodUnknown>;
        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>;
        title: z.ZodString;
        toolCallId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    options: {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }[];
    toolCall: {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    };
}, {
    sessionId: string;
    options: {
        name: string;
        kind: "allow_once" | "allow_always" | "reject_once" | "reject_always";
        optionId: string;
    }[];
    toolCall: {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    };
}>]>;
export declare const agentRequestSchema: z.ZodUnion<[z.ZodObject<{
    clientCapabilities: z.ZodObject<{
        fs: z.ZodObject<{
            readTextFile: z.ZodBoolean;
            writeTextFile: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            readTextFile: boolean;
            writeTextFile: boolean;
        }, {
            readTextFile: boolean;
            writeTextFile: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    }, {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    }>;
    protocolVersion: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    protocolVersion: number;
    clientCapabilities: {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    };
}, {
    protocolVersion: number;
    clientCapabilities: {
        fs: {
            readTextFile: boolean;
            writeTextFile: boolean;
        };
    };
}>, z.ZodObject<{
    methodId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    methodId: string;
}, {
    methodId: string;
}>, z.ZodObject<{
    cwd: z.ZodString;
    mcpServers: z.ZodArray<z.ZodObject<{
        args: z.ZodArray<z.ZodString, "many">;
        command: z.ZodString;
        env: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value: string;
        }, {
            name: string;
            value: string;
        }>, "many">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}, {
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}>, z.ZodObject<{
    cwd: z.ZodString;
    mcpServers: z.ZodArray<z.ZodObject<{
        args: z.ZodArray<z.ZodString, "many">;
        command: z.ZodString;
        env: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value: string;
        }, {
            name: string;
            value: string;
        }>, "many">;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }, {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }>, "many">;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}, {
    sessionId: string;
    mcpServers: {
        name: string;
        args: string[];
        command: string;
        env: {
            name: string;
            value: string;
        }[];
    }[];
    cwd: string;
}>, z.ZodObject<{
    prompt: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        text: z.ZodString;
        type: z.ZodLiteral<"text">;
    }, "strip", z.ZodTypeAny, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"image">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        data: z.ZodString;
        mimeType: z.ZodString;
        type: z.ZodLiteral<"audio">;
    }, "strip", z.ZodTypeAny, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        name: z.ZodString;
        size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        type: z.ZodLiteral<"resource_link">;
        uri: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>, z.ZodObject<{
        annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
            lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }, {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        }>>>;
        resource: z.ZodUnion<[z.ZodObject<{
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            text: z.ZodString;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }, {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        }>, z.ZodObject<{
            blob: z.ZodString;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }, {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        }>]>;
        type: z.ZodLiteral<"resource">;
    }, "strip", z.ZodTypeAny, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }, {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    }>]>, "many">;
    sessionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    prompt: ({
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    })[];
}, {
    sessionId: string;
    prompt: ({
        text: string;
        type: "text";
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "image";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        data: string;
        type: "audio";
        mimeType: string;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource_link";
        name: string;
        uri: string;
        size?: number | null | undefined;
        description?: string | null | undefined;
        title?: string | null | undefined;
        mimeType?: string | null | undefined;
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    } | {
        type: "resource";
        resource: {
            text: string;
            uri: string;
            mimeType?: string | null | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | null | undefined;
        };
        annotations?: {
            priority?: number | null | undefined;
            audience?: ("user" | "assistant")[] | null | undefined;
            lastModified?: string | null | undefined;
        } | null | undefined;
    })[];
}>]>;
export declare const agentNotificationSchema: z.ZodObject<{
    sessionId: z.ZodString;
    update: z.ZodUnion<[z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        sessionUpdate: z.ZodLiteral<"user_message_chunk">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        sessionUpdate: z.ZodLiteral<"agent_message_chunk">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    }>, z.ZodObject<{
        content: z.ZodUnion<[z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            text: z.ZodString;
            type: z.ZodLiteral<"text">;
        }, "strip", z.ZodTypeAny, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"image">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            data: z.ZodString;
            mimeType: z.ZodString;
            type: z.ZodLiteral<"audio">;
        }, "strip", z.ZodTypeAny, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            name: z.ZodString;
            size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            type: z.ZodLiteral<"resource_link">;
            uri: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>, z.ZodObject<{
            annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }, {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            }>>>;
            resource: z.ZodUnion<[z.ZodObject<{
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                text: z.ZodString;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }, {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            }>, z.ZodObject<{
                blob: z.ZodString;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }, {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            }>]>;
            type: z.ZodLiteral<"resource">;
        }, "strip", z.ZodTypeAny, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }, {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        }>]>;
        sessionUpdate: z.ZodLiteral<"agent_thought_chunk">;
    }, "strip", z.ZodTypeAny, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    }, {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    }>, z.ZodObject<{
        content: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            content: z.ZodUnion<[z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                text: z.ZodString;
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"image">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"audio">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                name: z.ZodString;
                size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                type: z.ZodLiteral<"resource_link">;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                resource: z.ZodUnion<[z.ZodObject<{
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    text: z.ZodString;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }>, z.ZodObject<{
                    blob: z.ZodString;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }>]>;
                type: z.ZodLiteral<"resource">;
            }, "strip", z.ZodTypeAny, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>]>;
            type: z.ZodLiteral<"content">;
        }, "strip", z.ZodTypeAny, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }>, z.ZodObject<{
            newText: z.ZodString;
            oldText: z.ZodNullable<z.ZodString>;
            path: z.ZodString;
            type: z.ZodLiteral<"diff">;
        }, "strip", z.ZodTypeAny, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }>]>, "many">>;
        kind: z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>;
        locations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            line?: number | null | undefined;
        }, {
            path: string;
            line?: number | null | undefined;
        }>, "many">>;
        rawInput: z.ZodOptional<z.ZodUnknown>;
        sessionUpdate: z.ZodLiteral<"tool_call">;
        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>;
        title: z.ZodString;
        toolCallId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }, {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    }>, z.ZodObject<{
        content: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            content: z.ZodUnion<[z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                text: z.ZodString;
                type: z.ZodLiteral<"text">;
            }, "strip", z.ZodTypeAny, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"image">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                data: z.ZodString;
                mimeType: z.ZodString;
                type: z.ZodLiteral<"audio">;
            }, "strip", z.ZodTypeAny, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                name: z.ZodString;
                size: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                type: z.ZodLiteral<"resource_link">;
                uri: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>, z.ZodObject<{
                annotations: z.ZodNullable<z.ZodOptional<z.ZodObject<{
                    audience: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"assistant">, z.ZodLiteral<"user">]>, "many">>>;
                    lastModified: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    priority: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }, {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                }>>>;
                resource: z.ZodUnion<[z.ZodObject<{
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    text: z.ZodString;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }, {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                }>, z.ZodObject<{
                    blob: z.ZodString;
                    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
                    uri: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }, {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                }>]>;
                type: z.ZodLiteral<"resource">;
            }, "strip", z.ZodTypeAny, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }, {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            }>]>;
            type: z.ZodLiteral<"content">;
        }, "strip", z.ZodTypeAny, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }, {
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        }>, z.ZodObject<{
            newText: z.ZodString;
            oldText: z.ZodNullable<z.ZodString>;
            path: z.ZodString;
            type: z.ZodLiteral<"diff">;
        }, "strip", z.ZodTypeAny, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }, {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        }>]>, "many">>>;
        kind: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"read">, z.ZodLiteral<"edit">, z.ZodLiteral<"delete">, z.ZodLiteral<"move">, z.ZodLiteral<"search">, z.ZodLiteral<"execute">, z.ZodLiteral<"think">, z.ZodLiteral<"fetch">, z.ZodLiteral<"other">]>>>;
        locations: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            line: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            line?: number | null | undefined;
        }, {
            path: string;
            line?: number | null | undefined;
        }>, "many">>>;
        rawInput: z.ZodOptional<z.ZodUnknown>;
        sessionUpdate: z.ZodLiteral<"tool_call_update">;
        status: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">, z.ZodLiteral<"failed">]>>>;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        toolCallId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    }, {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    }>, z.ZodObject<{
        entries: z.ZodArray<z.ZodObject<{
            content: z.ZodString;
            priority: z.ZodUnion<[z.ZodLiteral<"high">, z.ZodLiteral<"medium">, z.ZodLiteral<"low">]>;
            status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"in_progress">, z.ZodLiteral<"completed">]>;
        }, "strip", z.ZodTypeAny, {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }, {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }>, "many">;
        sessionUpdate: z.ZodLiteral<"plan">;
    }, "strip", z.ZodTypeAny, {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    }, {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    }>]>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    update: {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    } | {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    } | {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    } | {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    };
}, {
    sessionId: string;
    update: {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "user_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_message_chunk";
    } | {
        content: {
            text: string;
            type: "text";
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "image";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            data: string;
            type: "audio";
            mimeType: string;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource_link";
            name: string;
            uri: string;
            size?: number | null | undefined;
            description?: string | null | undefined;
            title?: string | null | undefined;
            mimeType?: string | null | undefined;
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        } | {
            type: "resource";
            resource: {
                text: string;
                uri: string;
                mimeType?: string | null | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | null | undefined;
            };
            annotations?: {
                priority?: number | null | undefined;
                audience?: ("user" | "assistant")[] | null | undefined;
                lastModified?: string | null | undefined;
            } | null | undefined;
        };
        sessionUpdate: "agent_thought_chunk";
    } | {
        status: "pending" | "in_progress" | "completed" | "failed";
        title: string;
        kind: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch";
        toolCallId: string;
        sessionUpdate: "tool_call";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | undefined;
        rawInput?: unknown;
    } | {
        toolCallId: string;
        sessionUpdate: "tool_call_update";
        content?: ({
            content: {
                text: string;
                type: "text";
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "image";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                data: string;
                type: "audio";
                mimeType: string;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource_link";
                name: string;
                uri: string;
                size?: number | null | undefined;
                description?: string | null | undefined;
                title?: string | null | undefined;
                mimeType?: string | null | undefined;
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            } | {
                type: "resource";
                resource: {
                    text: string;
                    uri: string;
                    mimeType?: string | null | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | null | undefined;
                };
                annotations?: {
                    priority?: number | null | undefined;
                    audience?: ("user" | "assistant")[] | null | undefined;
                    lastModified?: string | null | undefined;
                } | null | undefined;
            };
            type: "content";
        } | {
            type: "diff";
            path: string;
            newText: string;
            oldText: string | null;
        })[] | null | undefined;
        status?: "pending" | "in_progress" | "completed" | "failed" | null | undefined;
        title?: string | null | undefined;
        kind?: "search" | "delete" | "move" | "other" | "edit" | "read" | "execute" | "think" | "fetch" | null | undefined;
        locations?: {
            path: string;
            line?: number | null | undefined;
        }[] | null | undefined;
        rawInput?: unknown;
    } | {
        entries: {
            content: string;
            status: "pending" | "in_progress" | "completed";
            priority: "medium" | "high" | "low";
        }[];
        sessionUpdate: "plan";
    };
}>;
