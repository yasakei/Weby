/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import path from 'node:path';
import { makeRelative, shortenPath } from '../utils/paths.js';
import { BaseDeclarativeTool, BaseToolInvocation, Kind } from './tools.js';
import { processSingleFileContent, getSpecificMimeType, } from '../utils/fileUtils.js';
import { FileOperation } from '../telemetry/metrics.js';
import { getProgrammingLanguage } from '../telemetry/telemetry-utils.js';
import { logFileOperation } from '../telemetry/loggers.js';
import { FileOperationEvent } from '../telemetry/types.js';
class ReadFileToolInvocation extends BaseToolInvocation {
    config;
    constructor(config, params) {
        super(params);
        this.config = config;
    }
    getDescription() {
        const relativePath = makeRelative(this.params.absolute_path, this.config.getTargetDir());
        return shortenPath(relativePath);
    }
    toolLocations() {
        return [{ path: this.params.absolute_path, line: this.params.offset }];
    }
    async execute() {
        const result = await processSingleFileContent(this.params.absolute_path, this.config.getTargetDir(), this.config.getFileSystemService(), this.params.offset, this.params.limit);
        if (result.error) {
            return {
                llmContent: result.llmContent,
                returnDisplay: result.returnDisplay || 'Error reading file',
                error: {
                    message: result.error,
                    type: result.errorType,
                },
            };
        }
        let llmContent;
        if (result.isTruncated) {
            const [start, end] = result.linesShown;
            const total = result.originalLineCount;
            const nextOffset = this.params.offset
                ? this.params.offset + end - start + 1
                : end;
            llmContent = `
IMPORTANT: The file content has been truncated.
Status: Showing lines ${start}-${end} of ${total} total lines.
Action: To read more of the file, you can use the 'offset' and 'limit' parameters in a subsequent 'read_file' call. For example, to read the next section of the file, use offset: ${nextOffset}.

--- FILE CONTENT (truncated) ---
${result.llmContent}`;
        }
        else {
            llmContent = result.llmContent || '';
        }
        const lines = typeof result.llmContent === 'string'
            ? result.llmContent.split('\n').length
            : undefined;
        const mimetype = getSpecificMimeType(this.params.absolute_path);
        const programming_language = getProgrammingLanguage({
            absolute_path: this.params.absolute_path,
        });
        logFileOperation(this.config, new FileOperationEvent(ReadFileTool.Name, FileOperation.READ, lines, mimetype, path.extname(this.params.absolute_path), programming_language));
        return {
            llmContent,
            returnDisplay: result.returnDisplay || '',
        };
    }
}
/**
 * Implementation of the ReadFile tool logic
 */
export class ReadFileTool extends BaseDeclarativeTool {
    config;
    static Name = 'read_file';
    constructor(config) {
        super(ReadFileTool.Name, 'ReadFile', `Reads and returns the content of a specified file. If the file is large, the content will be truncated. The tool's response will clearly indicate if truncation has occurred and will provide details on how to read more of the file using the 'offset' and 'limit' parameters. Handles text, images (PNG, JPG, GIF, WEBP, SVG, BMP), and PDF files. For text files, it can read specific line ranges.`, Kind.Read, {
            properties: {
                absolute_path: {
                    description: "The absolute path to the file to read (e.g., '/home/user/project/file.txt'). Relative paths are not supported. You must provide an absolute path.",
                    type: 'string',
                },
                offset: {
                    description: "Optional: For text files, the 0-based line number to start reading from. Requires 'limit' to be set. Use for paginating through large files.",
                    type: 'number',
                },
                limit: {
                    description: "Optional: For text files, maximum number of lines to read. Use with 'offset' to paginate through large files. If omitted, reads the entire file (if feasible, up to a default limit).",
                    type: 'number',
                },
            },
            required: ['absolute_path'],
            type: 'object',
        });
        this.config = config;
    }
    validateToolParamValues(params) {
        const filePath = params.absolute_path;
        if (params.absolute_path.trim() === '') {
            return "The 'absolute_path' parameter must be non-empty.";
        }
        if (!path.isAbsolute(filePath)) {
            return `File path must be absolute, but was relative: ${filePath}. You must provide an absolute path.`;
        }
        const workspaceContext = this.config.getWorkspaceContext();
        if (!workspaceContext.isPathWithinWorkspace(filePath)) {
            const directories = workspaceContext.getDirectories();
            return `File path must be within one of the workspace directories: ${directories.join(', ')}`;
        }
        if (params.offset !== undefined && params.offset < 0) {
            return 'Offset must be a non-negative number';
        }
        if (params.limit !== undefined && params.limit <= 0) {
            return 'Limit must be a positive number';
        }
        const fileService = this.config.getFileService();
        if (fileService.shouldGeminiIgnoreFile(params.absolute_path)) {
            return `File path '${filePath}' is ignored by .geminiignore pattern(s).`;
        }
        return null;
    }
    createInvocation(params) {
        return new ReadFileToolInvocation(this.config, params);
    }
}
//# sourceMappingURL=read-file.js.map