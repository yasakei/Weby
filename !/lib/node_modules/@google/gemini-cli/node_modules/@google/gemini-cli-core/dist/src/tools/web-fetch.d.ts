/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { ToolInvocation, ToolResult } from './tools.js';
import { BaseDeclarativeTool } from './tools.js';
import type { Config } from '../config/config.js';
/**
 * Parameters for the WebFetch tool
 */
export interface WebFetchToolParams {
    /**
     * The prompt containing URL(s) (up to 20) and instructions for processing their content.
     */
    prompt: string;
}
/**
 * Implementation of the WebFetch tool logic
 */
export declare class WebFetchTool extends BaseDeclarativeTool<WebFetchToolParams, ToolResult> {
    private readonly config;
    static readonly Name: string;
    constructor(config: Config);
    protected validateToolParamValues(params: WebFetchToolParams): string | null;
    protected createInvocation(params: WebFetchToolParams): ToolInvocation<WebFetchToolParams, ToolResult>;
}
