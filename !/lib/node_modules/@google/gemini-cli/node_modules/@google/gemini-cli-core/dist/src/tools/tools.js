/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ToolErrorType } from './tool-error.js';
import { SchemaValidator } from '../utils/schemaValidator.js';
/**
 * A convenience base class for ToolInvocation.
 */
export class BaseToolInvocation {
    params;
    constructor(params) {
        this.params = params;
    }
    toolLocations() {
        return [];
    }
    shouldConfirmExecute(_abortSignal) {
        return Promise.resolve(false);
    }
}
/**
 * New base class for tools that separates validation from execution.
 * New tools should extend this class.
 */
export class DeclarativeTool {
    name;
    displayName;
    description;
    kind;
    parameterSchema;
    isOutputMarkdown;
    canUpdateOutput;
    constructor(name, displayName, description, kind, parameterSchema, isOutputMarkdown = true, canUpdateOutput = false) {
        this.name = name;
        this.displayName = displayName;
        this.description = description;
        this.kind = kind;
        this.parameterSchema = parameterSchema;
        this.isOutputMarkdown = isOutputMarkdown;
        this.canUpdateOutput = canUpdateOutput;
    }
    get schema() {
        return {
            name: this.name,
            description: this.description,
            parametersJsonSchema: this.parameterSchema,
        };
    }
    /**
     * Validates the raw tool parameters.
     * Subclasses should override this to add custom validation logic
     * beyond the JSON schema check.
     * @param params The raw parameters from the model.
     * @returns An error message string if invalid, null otherwise.
     */
    validateToolParams(_params) {
        // Base implementation can be extended by subclasses.
        return null;
    }
    /**
     * A convenience method that builds and executes the tool in one step.
     * Throws an error if validation fails.
     * @param params The raw, untrusted parameters from the model.
     * @param signal AbortSignal for tool cancellation.
     * @param updateOutput Optional callback to stream output.
     * @returns The result of the tool execution.
     */
    async buildAndExecute(params, signal, updateOutput) {
        const invocation = this.build(params);
        return invocation.execute(signal, updateOutput);
    }
    /**
     * Similar to `build` but never throws.
     * @param params The raw, untrusted parameters from the model.
     * @returns A `ToolInvocation` instance.
     */
    silentBuild(params) {
        try {
            return this.build(params);
        }
        catch (e) {
            if (e instanceof Error) {
                return e;
            }
            return new Error(String(e));
        }
    }
    /**
     * A convenience method that builds and executes the tool in one step.
     * Never throws.
     * @param params The raw, untrusted parameters from the model.
     * @params abortSignal a signal to abort.
     * @returns The result of the tool execution.
     */
    async validateBuildAndExecute(params, abortSignal) {
        const invocationOrError = this.silentBuild(params);
        if (invocationOrError instanceof Error) {
            const errorMessage = invocationOrError.message;
            return {
                llmContent: `Error: Invalid parameters provided. Reason: ${errorMessage}`,
                returnDisplay: errorMessage,
                error: {
                    message: errorMessage,
                    type: ToolErrorType.INVALID_TOOL_PARAMS,
                },
            };
        }
        try {
            return await invocationOrError.execute(abortSignal);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                llmContent: `Error: Tool call execution failed. Reason: ${errorMessage}`,
                returnDisplay: errorMessage,
                error: {
                    message: errorMessage,
                    type: ToolErrorType.EXECUTION_FAILED,
                },
            };
        }
    }
}
/**
 * New base class for declarative tools that separates validation from execution.
 * New tools should extend this class, which provides a `build` method that
 * validates parameters before deferring to a `createInvocation` method for
 * the final `ToolInvocation` object instantiation.
 */
export class BaseDeclarativeTool extends DeclarativeTool {
    build(params) {
        const validationError = this.validateToolParams(params);
        if (validationError) {
            throw new Error(validationError);
        }
        return this.createInvocation(params);
    }
    validateToolParams(params) {
        const errors = SchemaValidator.validate(this.schema.parametersJsonSchema, params);
        if (errors) {
            return errors;
        }
        return this.validateToolParamValues(params);
    }
    validateToolParamValues(_params) {
        // Base implementation can be extended by subclasses.
        return null;
    }
}
/**
 * Type guard to check if an object is a Tool.
 * @param obj The object to check.
 * @returns True if the object is a Tool, false otherwise.
 */
export function isTool(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        'name' in obj &&
        'build' in obj &&
        typeof obj.build === 'function');
}
/**
 * Detects cycles in a JSON schemas due to `$ref`s.
 * @param schema The root of the JSON schema.
 * @returns `true` if a cycle is detected, `false` otherwise.
 */
export function hasCycleInSchema(schema) {
    function resolveRef(ref) {
        if (!ref.startsWith('#/')) {
            return null;
        }
        const path = ref.substring(2).split('/');
        let current = schema;
        for (const segment of path) {
            if (typeof current !== 'object' ||
                current === null ||
                !Object.prototype.hasOwnProperty.call(current, segment)) {
                return null;
            }
            current = current[segment];
        }
        return current;
    }
    function traverse(node, visitedRefs, pathRefs) {
        if (typeof node !== 'object' || node === null) {
            return false;
        }
        if (Array.isArray(node)) {
            for (const item of node) {
                if (traverse(item, visitedRefs, pathRefs)) {
                    return true;
                }
            }
            return false;
        }
        if ('$ref' in node && typeof node.$ref === 'string') {
            const ref = node.$ref;
            if (ref === '#/' || pathRefs.has(ref)) {
                // A ref to just '#/' is always a cycle.
                return true; // Cycle detected!
            }
            if (visitedRefs.has(ref)) {
                return false; // Bail early, we have checked this ref before.
            }
            const resolvedNode = resolveRef(ref);
            if (resolvedNode) {
                // Add it to both visited and the current path
                visitedRefs.add(ref);
                pathRefs.add(ref);
                const hasCycle = traverse(resolvedNode, visitedRefs, pathRefs);
                pathRefs.delete(ref); // Backtrack, leaving it in visited
                return hasCycle;
            }
        }
        // Crawl all the properties of node
        for (const key in node) {
            if (Object.prototype.hasOwnProperty.call(node, key)) {
                if (traverse(node[key], visitedRefs, pathRefs)) {
                    return true;
                }
            }
        }
        return false;
    }
    return traverse(schema, new Set(), new Set());
}
export var ToolConfirmationOutcome;
(function (ToolConfirmationOutcome) {
    ToolConfirmationOutcome["ProceedOnce"] = "proceed_once";
    ToolConfirmationOutcome["ProceedAlways"] = "proceed_always";
    ToolConfirmationOutcome["ProceedAlwaysServer"] = "proceed_always_server";
    ToolConfirmationOutcome["ProceedAlwaysTool"] = "proceed_always_tool";
    ToolConfirmationOutcome["ModifyWithEditor"] = "modify_with_editor";
    ToolConfirmationOutcome["Cancel"] = "cancel";
})(ToolConfirmationOutcome || (ToolConfirmationOutcome = {}));
export var Kind;
(function (Kind) {
    Kind["Read"] = "read";
    Kind["Edit"] = "edit";
    Kind["Delete"] = "delete";
    Kind["Move"] = "move";
    Kind["Search"] = "search";
    Kind["Execute"] = "execute";
    Kind["Think"] = "think";
    Kind["Fetch"] = "fetch";
    Kind["Other"] = "other";
})(Kind || (Kind = {}));
//# sourceMappingURL=tools.js.map