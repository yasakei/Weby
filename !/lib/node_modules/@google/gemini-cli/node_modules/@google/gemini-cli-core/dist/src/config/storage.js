/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as path from 'node:path';
import * as os from 'node:os';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
export const GEMINI_DIR = '.gemini';
export const GOOGLE_ACCOUNTS_FILENAME = 'google_accounts.json';
const TMP_DIR_NAME = 'tmp';
export class Storage {
    targetDir;
    constructor(targetDir) {
        this.targetDir = targetDir;
    }
    static getGlobalGeminiDir() {
        const homeDir = os.homedir();
        if (!homeDir) {
            return path.join(os.tmpdir(), '.gemini');
        }
        return path.join(homeDir, GEMINI_DIR);
    }
    static getMcpOAuthTokensPath() {
        return path.join(Storage.getGlobalGeminiDir(), 'mcp-oauth-tokens.json');
    }
    static getGlobalSettingsPath() {
        return path.join(Storage.getGlobalGeminiDir(), 'settings.json');
    }
    static getInstallationIdPath() {
        return path.join(Storage.getGlobalGeminiDir(), 'installation_id');
    }
    static getGoogleAccountsPath() {
        return path.join(Storage.getGlobalGeminiDir(), GOOGLE_ACCOUNTS_FILENAME);
    }
    static getUserCommandsDir() {
        return path.join(Storage.getGlobalGeminiDir(), 'commands');
    }
    static getGlobalMemoryFilePath() {
        return path.join(Storage.getGlobalGeminiDir(), 'memory.md');
    }
    static getGlobalTempDir() {
        return path.join(Storage.getGlobalGeminiDir(), TMP_DIR_NAME);
    }
    getGeminiDir() {
        return path.join(this.targetDir, GEMINI_DIR);
    }
    getProjectTempDir() {
        const hash = this.getFilePathHash(this.getProjectRoot());
        const tempDir = Storage.getGlobalTempDir();
        return path.join(tempDir, hash);
    }
    ensureProjectTempDirExists() {
        fs.mkdirSync(this.getProjectTempDir(), { recursive: true });
    }
    static getOAuthCredsPath() {
        return path.join(Storage.getGlobalGeminiDir(), 'oauth_creds.json');
    }
    getProjectRoot() {
        return this.targetDir;
    }
    getFilePathHash(filePath) {
        return crypto.createHash('sha256').update(filePath).digest('hex');
    }
    getHistoryDir() {
        const hash = this.getFilePathHash(this.getProjectRoot());
        const historyDir = path.join(Storage.getGlobalGeminiDir(), 'history');
        return path.join(historyDir, hash);
    }
    getWorkspaceSettingsPath() {
        return path.join(this.getGeminiDir(), 'settings.json');
    }
    getProjectCommandsDir() {
        return path.join(this.getGeminiDir(), 'commands');
    }
    getProjectTempCheckpointsDir() {
        return path.join(this.getProjectTempDir(), 'checkpoints');
    }
    getExtensionsDir() {
        return path.join(this.getGeminiDir(), 'extensions');
    }
    getExtensionsConfigPath() {
        return path.join(this.getExtensionsDir(), 'gemini-extension.json');
    }
    getHistoryFilePath() {
        return path.join(this.getProjectTempDir(), 'shell_history');
    }
}
//# sourceMappingURL=storage.js.map