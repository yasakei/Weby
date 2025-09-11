/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BaseDeclarativeTool, BaseToolInvocation, Kind, } from '../tools/tools.js';
class MockToolInvocation extends BaseToolInvocation {
    tool;
    constructor(tool, params) {
        super(params);
        this.tool = tool;
    }
    execute(signal, updateOutput) {
        return this.tool.execute(this.params, signal, updateOutput);
    }
    shouldConfirmExecute(abortSignal) {
        return this.tool.shouldConfirmExecute(this.params, abortSignal);
    }
    getDescription() {
        return `A mock tool invocation for ${this.tool.name}`;
    }
}
/**
 * A highly configurable mock tool for testing purposes.
 */
export class MockTool extends BaseDeclarativeTool {
    shouldConfirmExecute;
    execute;
    constructor(options) {
        super(options.name, options.displayName ?? options.name, options.description ?? options.name, Kind.Other, options.params, options.isOutputMarkdown ?? false, options.canUpdateOutput ?? false);
        if (options.shouldConfirmExecute) {
            this.shouldConfirmExecute = options.shouldConfirmExecute;
        }
        else {
            this.shouldConfirmExecute = () => Promise.resolve(false);
        }
        if (options.execute) {
            this.execute = options.execute;
        }
        else {
            this.execute = () => Promise.resolve({
                llmContent: `Tool ${this.name} executed successfully.`,
                returnDisplay: `Tool ${this.name} executed successfully.`,
            });
        }
    }
    createInvocation(params) {
        return new MockToolInvocation(this, params);
    }
}
//# sourceMappingURL=mock-tool.js.map