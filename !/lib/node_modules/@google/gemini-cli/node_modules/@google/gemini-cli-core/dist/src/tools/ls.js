/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import fs from 'node:fs';
import path from 'node:path';
import { BaseDeclarativeTool, BaseToolInvocation, Kind } from './tools.js';
import { makeRelative, shortenPath } from '../utils/paths.js';
import { DEFAULT_FILE_FILTERING_OPTIONS } from '../config/config.js';
import { ToolErrorType } from './tool-error.js';
class LSToolInvocation extends BaseToolInvocation {
    config;
    constructor(config, params) {
        super(params);
        this.config = config;
    }
    /**
     * Checks if a filename matches any of the ignore patterns
     * @param filename Filename to check
     * @param patterns Array of glob patterns to check against
     * @returns True if the filename should be ignored
     */
    shouldIgnore(filename, patterns) {
        if (!patterns || patterns.length === 0) {
            return false;
        }
        for (const pattern of patterns) {
            // Convert glob pattern to RegExp
            const regexPattern = pattern
                .replace(/[.+^${}()|[\]\\]/g, '\\$&')
                .replace(/\*/g, '.*')
                .replace(/\?/g, '.');
            const regex = new RegExp(`^${regexPattern}$`);
            if (regex.test(filename)) {
                return true;
            }
        }
        return false;
    }
    /**
     * Gets a description of the file reading operation
     * @returns A string describing the file being read
     */
    getDescription() {
        const relativePath = makeRelative(this.params.path, this.config.getTargetDir());
        return shortenPath(relativePath);
    }
    // Helper for consistent error formatting
    errorResult(llmContent, returnDisplay, type) {
        return {
            llmContent,
            // Keep returnDisplay simpler in core logic
            returnDisplay: `Error: ${returnDisplay}`,
            error: {
                message: llmContent,
                type,
            },
        };
    }
    /**
     * Executes the LS operation with the given parameters
     * @returns Result of the LS operation
     */
    async execute(_signal) {
        try {
            const stats = fs.statSync(this.params.path);
            if (!stats) {
                // fs.statSync throws on non-existence, so this check might be redundant
                // but keeping for clarity. Error message adjusted.
                return this.errorResult(`Error: Directory not found or inaccessible: ${this.params.path}`, `Directory not found or inaccessible.`, ToolErrorType.FILE_NOT_FOUND);
            }
            if (!stats.isDirectory()) {
                return this.errorResult(`Error: Path is not a directory: ${this.params.path}`, `Path is not a directory.`, ToolErrorType.PATH_IS_NOT_A_DIRECTORY);
            }
            const files = fs.readdirSync(this.params.path);
            const defaultFileIgnores = this.config.getFileFilteringOptions() ?? DEFAULT_FILE_FILTERING_OPTIONS;
            const fileFilteringOptions = {
                respectGitIgnore: this.params.file_filtering_options?.respect_git_ignore ??
                    defaultFileIgnores.respectGitIgnore,
                respectGeminiIgnore: this.params.file_filtering_options?.respect_gemini_ignore ??
                    defaultFileIgnores.respectGeminiIgnore,
            };
            // Get centralized file discovery service
            const fileDiscovery = this.config.getFileService();
            const entries = [];
            let gitIgnoredCount = 0;
            let geminiIgnoredCount = 0;
            if (files.length === 0) {
                // Changed error message to be more neutral for LLM
                return {
                    llmContent: `Directory ${this.params.path} is empty.`,
                    returnDisplay: `Directory is empty.`,
                };
            }
            for (const file of files) {
                if (this.shouldIgnore(file, this.params.ignore)) {
                    continue;
                }
                const fullPath = path.join(this.params.path, file);
                const relativePath = path.relative(this.config.getTargetDir(), fullPath);
                // Check if this file should be ignored based on git or gemini ignore rules
                if (fileFilteringOptions.respectGitIgnore &&
                    fileDiscovery.shouldGitIgnoreFile(relativePath)) {
                    gitIgnoredCount++;
                    continue;
                }
                if (fileFilteringOptions.respectGeminiIgnore &&
                    fileDiscovery.shouldGeminiIgnoreFile(relativePath)) {
                    geminiIgnoredCount++;
                    continue;
                }
                try {
                    const stats = fs.statSync(fullPath);
                    const isDir = stats.isDirectory();
                    entries.push({
                        name: file,
                        path: fullPath,
                        isDirectory: isDir,
                        size: isDir ? 0 : stats.size,
                        modifiedTime: stats.mtime,
                    });
                }
                catch (error) {
                    // Log error internally but don't fail the whole listing
                    console.error(`Error accessing ${fullPath}: ${error}`);
                }
            }
            // Sort entries (directories first, then alphabetically)
            entries.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory)
                    return -1;
                if (!a.isDirectory && b.isDirectory)
                    return 1;
                return a.name.localeCompare(b.name);
            });
            // Create formatted content for LLM
            const directoryContent = entries
                .map((entry) => `${entry.isDirectory ? '[DIR] ' : ''}${entry.name}`)
                .join('\n');
            let resultMessage = `Directory listing for ${this.params.path}:\n${directoryContent}`;
            const ignoredMessages = [];
            if (gitIgnoredCount > 0) {
                ignoredMessages.push(`${gitIgnoredCount} git-ignored`);
            }
            if (geminiIgnoredCount > 0) {
                ignoredMessages.push(`${geminiIgnoredCount} gemini-ignored`);
            }
            if (ignoredMessages.length > 0) {
                resultMessage += `\n\n(${ignoredMessages.join(', ')})`;
            }
            let displayMessage = `Listed ${entries.length} item(s).`;
            if (ignoredMessages.length > 0) {
                displayMessage += ` (${ignoredMessages.join(', ')})`;
            }
            return {
                llmContent: resultMessage,
                returnDisplay: displayMessage,
            };
        }
        catch (error) {
            const errorMsg = `Error listing directory: ${error instanceof Error ? error.message : String(error)}`;
            return this.errorResult(errorMsg, 'Failed to list directory.', ToolErrorType.LS_EXECUTION_ERROR);
        }
    }
}
/**
 * Implementation of the LS tool logic
 */
export class LSTool extends BaseDeclarativeTool {
    config;
    static Name = 'list_directory';
    constructor(config) {
        super(LSTool.Name, 'ReadFolder', 'Lists the names of files and subdirectories directly within a specified directory path. Can optionally ignore entries matching provided glob patterns.', Kind.Search, {
            properties: {
                path: {
                    description: 'The absolute path to the directory to list (must be absolute, not relative)',
                    type: 'string',
                },
                ignore: {
                    description: 'List of glob patterns to ignore',
                    items: {
                        type: 'string',
                    },
                    type: 'array',
                },
                file_filtering_options: {
                    description: 'Optional: Whether to respect ignore patterns from .gitignore or .geminiignore',
                    type: 'object',
                    properties: {
                        respect_git_ignore: {
                            description: 'Optional: Whether to respect .gitignore patterns when listing files. Only available in git repositories. Defaults to true.',
                            type: 'boolean',
                        },
                        respect_gemini_ignore: {
                            description: 'Optional: Whether to respect .geminiignore patterns when listing files. Defaults to true.',
                            type: 'boolean',
                        },
                    },
                },
            },
            required: ['path'],
            type: 'object',
        });
        this.config = config;
    }
    /**
     * Validates the parameters for the tool
     * @param params Parameters to validate
     * @returns An error message string if invalid, null otherwise
     */
    validateToolParamValues(params) {
        if (!path.isAbsolute(params.path)) {
            return `Path must be absolute: ${params.path}`;
        }
        const workspaceContext = this.config.getWorkspaceContext();
        if (!workspaceContext.isPathWithinWorkspace(params.path)) {
            const directories = workspaceContext.getDirectories();
            return `Path must be within one of the workspace directories: ${directories.join(', ')}`;
        }
        return null;
    }
    createInvocation(params) {
        return new LSToolInvocation(this.config, params);
    }
}
//# sourceMappingURL=ls.js.map