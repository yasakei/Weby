/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import AjvPkg from 'ajv';
import * as addFormats from 'ajv-formats';
// Ajv's ESM/CJS interop: use 'any' for compatibility as recommended by Ajv docs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AjvClass = AjvPkg.default || AjvPkg;
const ajValidator = new AjvClass();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addFormatsFunc = addFormats.default || addFormats;
addFormatsFunc(ajValidator);
/**
 * Simple utility to validate objects against JSON Schemas
 */
export class SchemaValidator {
    /**
     * Returns null if the data confroms to the schema described by schema (or if schema
     *  is null). Otherwise, returns a string describing the error.
     */
    static validate(schema, data) {
        if (!schema) {
            return null;
        }
        if (typeof data !== 'object' || data === null) {
            return 'Value of params must be an object';
        }
        const validate = ajValidator.compile(schema);
        const valid = validate(data);
        if (!valid && validate.errors) {
            return ajValidator.errorsText(validate.errors, { dataVar: 'params' });
        }
        return null;
    }
}
//# sourceMappingURL=schemaValidator.js.map