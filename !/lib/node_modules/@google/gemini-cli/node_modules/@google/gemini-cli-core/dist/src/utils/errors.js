/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export function isNodeError(error) {
    return error instanceof Error && 'code' in error;
}
export function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    try {
        return String(error);
    }
    catch {
        return 'Failed to get error details';
    }
}
export class FatalError extends Error {
    exitCode;
    constructor(message, exitCode) {
        super(message);
        this.exitCode = exitCode;
    }
}
export class FatalAuthenticationError extends FatalError {
    constructor(message) {
        super(message, 41);
    }
}
export class FatalInputError extends FatalError {
    constructor(message) {
        super(message, 42);
    }
}
export class FatalSandboxError extends FatalError {
    constructor(message) {
        super(message, 44);
    }
}
export class FatalConfigError extends FatalError {
    constructor(message) {
        super(message, 52);
    }
}
export class FatalTurnLimitedError extends FatalError {
    constructor(message) {
        super(message, 53);
    }
}
export class ForbiddenError extends Error {
}
export class UnauthorizedError extends Error {
}
export class BadRequestError extends Error {
}
export function toFriendlyError(error) {
    if (error && typeof error === 'object' && 'response' in error) {
        const gaxiosError = error;
        const data = parseResponseData(gaxiosError);
        if (data.error && data.error.message && data.error.code) {
            switch (data.error.code) {
                case 400:
                    return new BadRequestError(data.error.message);
                case 401:
                    return new UnauthorizedError(data.error.message);
                case 403:
                    // It's import to pass the message here since it might
                    // explain the cause like "the cloud project you're
                    // using doesn't have code assist enabled".
                    return new ForbiddenError(data.error.message);
                default:
            }
        }
    }
    return error;
}
function parseResponseData(error) {
    // Inexplicably, Gaxios sometimes doesn't JSONify the response data.
    if (typeof error.response?.data === 'string') {
        return JSON.parse(error.response?.data);
    }
    return error.response?.data;
}
//# sourceMappingURL=errors.js.map