/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { vi } from 'vitest';
import { BaseDeclarativeTool, BaseToolInvocation, Kind, } from '../tools/tools.js';
class MockToolInvocation extends BaseToolInvocation {
    tool;
    constructor(tool, params) {
        super(params);
        this.tool = tool;
    }
    async execute(_abortSignal) {
        const result = this.tool.executeFn(this.params);
        return (result ?? {
            llmContent: `Tool ${this.tool.name} executed successfully.`,
            returnDisplay: `Tool ${this.tool.name} executed successfully.`,
        });
    }
    async shouldConfirmExecute(_abortSignal) {
        if (this.tool.shouldConfirm) {
            return {
                type: 'exec',
                title: `Confirm ${this.tool.displayName}`,
                command: this.tool.name,
                rootCommand: this.tool.name,
                onConfirm: async () => { },
            };
        }
        return false;
    }
    getDescription() {
        return `A mock tool invocation for ${this.tool.name}`;
    }
}
/**
 * A highly configurable mock tool for testing purposes.
 */
export class MockTool extends BaseDeclarativeTool {
    executeFn = vi.fn();
    shouldConfirm = false;
    constructor(name = 'mock-tool', displayName, description = 'A mock tool for testing.', params = {
        type: 'object',
        properties: { param: { type: 'string' } },
    }) {
        super(name, displayName ?? name, description, Kind.Other, params);
    }
    createInvocation(params) {
        return new MockToolInvocation(this, params);
    }
}
export class MockModifiableToolInvocation extends BaseToolInvocation {
    tool;
    constructor(tool, params) {
        super(params);
        this.tool = tool;
    }
    async execute(_abortSignal) {
        const result = this.tool.executeFn(this.params);
        return (result ?? {
            llmContent: `Tool ${this.tool.name} executed successfully.`,
            returnDisplay: `Tool ${this.tool.name} executed successfully.`,
        });
    }
    async shouldConfirmExecute(_abortSignal) {
        if (this.tool.shouldConfirm) {
            return {
                type: 'edit',
                title: 'Confirm Mock Tool',
                fileName: 'test.txt',
                filePath: 'test.txt',
                fileDiff: 'diff',
                originalContent: 'originalContent',
                newContent: 'newContent',
                onConfirm: async () => { },
            };
        }
        return false;
    }
    getDescription() {
        return `A mock modifiable tool invocation for ${this.tool.name}`;
    }
}
/**
 * Configurable mock modifiable tool for testing.
 */
export class MockModifiableTool extends MockTool {
    constructor(name = 'mockModifiableTool') {
        super(name);
        this.shouldConfirm = true;
    }
    getModifyContext(_abortSignal) {
        return {
            getFilePath: () => 'test.txt',
            getCurrentContent: async () => 'old content',
            getProposedContent: async () => 'new content',
            createUpdatedParams: (_oldContent, modifiedProposedContent, _originalParams) => ({ newContent: modifiedProposedContent }),
        };
    }
    createInvocation(params) {
        return new MockModifiableToolInvocation(this, params);
    }
}
//# sourceMappingURL=tools.js.map