/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { AnyDeclarativeTool } from '../tools/tools.js';
import type { Config } from '../config/config.js';
import type { Content, FunctionDeclaration } from '@google/genai';
/**
 * @fileoverview Defines the configuration interfaces for a subagent.
 *
 * These interfaces specify the structure for defining the subagent's prompt,
 * the model parameters, and the execution settings.
 */
/**
 * Describes the possible termination modes for a subagent.
 * This enum provides a clear indication of why a subagent's execution might have ended.
 */
export declare enum SubagentTerminateMode {
    /**
     * Indicates that the subagent's execution terminated due to an unrecoverable error.
     */
    ERROR = "ERROR",
    /**
     * Indicates that the subagent's execution terminated because it exceeded the maximum allowed working time.
     */
    TIMEOUT = "TIMEOUT",
    /**
     * Indicates that the subagent's execution successfully completed all its defined goals.
     */
    GOAL = "GOAL",
    /**
     * Indicates that the subagent's execution terminated because it exceeded the maximum number of turns.
     */
    MAX_TURNS = "MAX_TURNS"
}
/**
 * Represents the output structure of a subagent's execution.
 * This interface defines the data that a subagent will return upon completion,
 * including any emitted variables and the reason for its termination.
 */
export interface OutputObject {
    /**
     * A record of key-value pairs representing variables emitted by the subagent
     * during its execution. These variables can be used by the calling agent.
     */
    emitted_vars: Record<string, string>;
    /**
     * The reason for the subagent's termination, indicating whether it completed
     * successfully, timed out, or encountered an error.
     */
    terminate_reason: SubagentTerminateMode;
}
/**
 * Configures the initial prompt for the subagent.
 */
export interface PromptConfig {
    /**
     * A single system prompt string that defines the subagent's persona and instructions.
     * Note: You should use either `systemPrompt` or `initialMessages`, but not both.
     */
    systemPrompt?: string;
    /**
     * An array of user/model content pairs to seed the chat history for few-shot prompting.
     * Note: You should use either `systemPrompt` or `initialMessages`, but not both.
     */
    initialMessages?: Content[];
}
/**
 * Configures the tools available to the subagent during its execution.
 */
export interface ToolConfig {
    /**
     * A list of tool names (from the tool registry), full function declarations,
     * or BaseTool instances that the subagent is permitted to use.
     */
    tools: Array<string | FunctionDeclaration | AnyDeclarativeTool>;
}
/**
 * Configures the expected outputs for the subagent.
 */
export interface OutputConfig {
    /**
     * A record describing the variables the subagent is expected to emit.
     * The subagent will be prompted to generate these values before terminating.
     */
    outputs: Record<string, string>;
}
/**
 * Configures the generative model parameters for the subagent.
 * This interface specifies the model to be used and its associated generation settings,
 * such as temperature and top-p values, which influence the creativity and diversity of the model's output.
 */
export interface ModelConfig {
    /**
     * The name or identifier of the model to be used (e.g., 'gemini-2.5-pro').
     *
     * TODO: In the future, this needs to support 'auto' or some other string to support routing use cases.
     */
    model: string;
    /**
     * The temperature for the model's sampling process.
     */
    temp: number;
    /**
     * The top-p value for nucleus sampling.
     */
    top_p: number;
}
/**
 * Configures the execution environment and constraints for the subagent.
 * This interface defines parameters that control the subagent's runtime behavior,
 * such as maximum execution time, to prevent infinite loops or excessive resource consumption.
 *
 * TODO: Consider adding max_tokens as a form of budgeting.
 */
export interface RunConfig {
    /** The maximum execution time for the subagent in minutes. */
    max_time_minutes: number;
    /**
     * The maximum number of conversational turns (a user message + model response)
     * before the execution is terminated. Helps prevent infinite loops.
     */
    max_turns?: number;
}
export interface SubAgentOptions {
    toolConfig?: ToolConfig;
    outputConfig?: OutputConfig;
    onMessage?: (message: string) => void;
}
/**
 * Manages the runtime context state for the subagent.
 * This class provides a mechanism to store and retrieve key-value pairs
 * that represent the dynamic state and variables accessible to the subagent
 * during its execution.
 */
export declare class ContextState {
    private state;
    /**
     * Retrieves a value from the context state.
     *
     * @param key - The key of the value to retrieve.
     * @returns The value associated with the key, or undefined if the key is not found.
     */
    get(key: string): unknown;
    /**
     * Sets a value in the context state.
     *
     * @param key - The key to set the value under.
     * @param value - The value to set.
     */
    set(key: string, value: unknown): void;
    /**
     * Retrieves all keys in the context state.
     *
     * @returns An array of all keys in the context state.
     */
    get_keys(): string[];
}
/**
 * Represents the scope and execution environment for a subagent.
 * This class orchestrates the subagent's lifecycle, managing its chat interactions,
 * runtime context, and the collection of its outputs.
 */
export declare class SubAgentScope {
    readonly name: string;
    readonly runtimeContext: Config;
    private readonly promptConfig;
    private readonly modelConfig;
    private readonly runConfig;
    output: OutputObject;
    private readonly subagentId;
    private readonly toolConfig?;
    private readonly outputConfig?;
    private readonly onMessage?;
    private readonly toolRegistry;
    /**
     * Constructs a new SubAgentScope instance.
     * @param name - The name for the subagent, used for logging and identification.
     * @param runtimeContext - The shared runtime configuration and services.
     * @param promptConfig - Configuration for the subagent's prompt and behavior.
     * @param modelConfig - Configuration for the generative model parameters.
     * @param runConfig - Configuration for the subagent's execution environment.
     * @param options - Optional configurations for the subagent.
     */
    private constructor();
    /**
     * Creates and validates a new SubAgentScope instance.
     * This factory method ensures that all tools provided in the prompt configuration
     * are valid for non-interactive use before creating the subagent instance.
     * @param name - The name of the subagent.
     * @param runtimeContext - The shared runtime configuration and services.
     * @param promptConfig - Configuration for the subagent's prompt and behavior.
     * @param modelConfig - Configuration for the generative model parameters.
     * @param runConfig - Configuration for the subagent's execution environment.
     * @param options - Optional configurations for the subagent.
     * @returns A promise that resolves to a valid SubAgentScope instance.
     * @throws {Error} If any tool requires user confirmation.
     */
    static create(name: string, runtimeContext: Config, promptConfig: PromptConfig, modelConfig: ModelConfig, runConfig: RunConfig, options?: SubAgentOptions): Promise<SubAgentScope>;
    /**
     * Runs the subagent in a non-interactive mode.
     * This method orchestrates the subagent's execution loop, including prompt templating,
     * tool execution, and termination conditions.
     * @param {ContextState} context - The current context state containing variables for prompt templating.
     * @returns {Promise<void>} A promise that resolves when the subagent has completed its execution.
     */
    runNonInteractive(context: ContextState): Promise<void>;
    /**
     * Processes a list of function calls, executing each one and collecting their responses.
     * This method iterates through the provided function calls, executes them using the
     * `executeToolCall` function (or handles `self.emitvalue` internally), and aggregates
     * their results. It also manages error reporting for failed tool executions.
     * @param {FunctionCall[]} functionCalls - An array of `FunctionCall` objects to process.
     * @param {ToolRegistry} toolRegistry - The tool registry to look up and execute tools.
     * @param {AbortController} abortController - An `AbortController` to signal cancellation of tool executions.
     * @returns {Promise<Content[]>} A promise that resolves to an array of `Content` parts representing the tool responses,
     *          which are then used to update the chat history.
     */
    private processFunctionCalls;
    private createChatObject;
    /**
     * Returns an array of FunctionDeclaration objects for tools that are local to the subagent's scope.
     * Currently, this includes the `self.emitvalue` tool for emitting variables.
     * @returns An array of `FunctionDeclaration` objects.
     */
    private getScopeLocalFuncDefs;
    /**
     * Builds the system prompt for the chat based on the provided configurations.
     * It templates the base system prompt and appends instructions for emitting
     * variables if an `OutputConfig` is provided.
     * @param {ContextState} context - The context for templating.
     * @returns {string} The complete system prompt.
     */
    private buildChatSystemPrompt;
}
