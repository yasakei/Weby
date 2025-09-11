/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { expect, describe, it } from 'vitest';
import { doesToolInvocationMatch } from './tool-utils.js';
import { ReadFileTool } from '../tools/read-file.js';
describe('doesToolInvocationMatch', () => {
    it('should not match a partial command prefix', () => {
        const invocation = {
            params: { command: 'git commitsomething' },
        };
        const patterns = ['ShellTool(git commit)'];
        const result = doesToolInvocationMatch('run_shell_command', invocation, patterns);
        expect(result).toBe(false);
    });
    it('should match an exact command', () => {
        const invocation = {
            params: { command: 'git status' },
        };
        const patterns = ['ShellTool(git status)'];
        const result = doesToolInvocationMatch('run_shell_command', invocation, patterns);
        expect(result).toBe(true);
    });
    it('should match a command that is a prefix', () => {
        const invocation = {
            params: { command: 'git status -v' },
        };
        const patterns = ['ShellTool(git status)'];
        const result = doesToolInvocationMatch('run_shell_command', invocation, patterns);
        expect(result).toBe(true);
    });
    describe('for non-shell tools', () => {
        const readFileTool = new ReadFileTool({});
        const invocation = {
            params: { file: 'test.txt' },
        };
        it('should match by tool name', () => {
            const patterns = ['read_file'];
            const result = doesToolInvocationMatch(readFileTool, invocation, patterns);
            expect(result).toBe(true);
        });
        it('should match by tool class name', () => {
            const patterns = ['ReadFileTool'];
            const result = doesToolInvocationMatch(readFileTool, invocation, patterns);
            expect(result).toBe(true);
        });
        it('should not match if neither name is in the patterns', () => {
            const patterns = ['some_other_tool', 'AnotherToolClass'];
            const result = doesToolInvocationMatch(readFileTool, invocation, patterns);
            expect(result).toBe(false);
        });
        it('should match by tool name when passed as a string', () => {
            const patterns = ['read_file'];
            const result = doesToolInvocationMatch('read_file', invocation, patterns);
            expect(result).toBe(true);
        });
    });
});
//# sourceMappingURL=tool-utils.test.js.map