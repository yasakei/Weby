/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type VariableSchema, VARIABLE_SCHEMA } from './variableSchema.js';
export type JsonObject = {
    [key: string]: JsonValue;
};
export type JsonArray = JsonValue[];
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
export type VariableContext = {
    [key in keyof typeof VARIABLE_SCHEMA]?: string;
};
export declare function validateVariables(variables: VariableContext, schema: VariableSchema): void;
export declare function hydrateString(str: string, context: VariableContext): string;
export declare function recursivelyHydrateStrings(obj: JsonValue, values: VariableContext): JsonValue;
