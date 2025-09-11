/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type { Config } from '../config/config.js';
/**
 * An identifier for the shell type.
 */
export type ShellType = 'cmd' | 'powershell' | 'bash';
/**
 * Defines the configuration required to execute a command string within a specific shell.
 */
export interface ShellConfiguration {
    /** The path or name of the shell executable (e.g., 'bash', 'cmd.exe'). */
    executable: string;
    /**
     * The arguments required by the shell to execute a subsequent string argument.
     */
    argsPrefix: string[];
    /** An identifier for the shell type. */
    shell: ShellType;
}
/**
 * Determines the appropriate shell configuration for the current platform.
 *
 * This ensures we can execute command strings predictably and securely across platforms
 * using the `spawn(executable, [...argsPrefix, commandString], { shell: false })` pattern.
 *
 * @returns The ShellConfiguration for the current environment.
 */
export declare function getShellConfiguration(): ShellConfiguration;
/**
 * Export the platform detection constant for use in process management (e.g., killing processes).
 */
export declare const isWindows: () => boolean;
/**
 * Escapes a string so that it can be safely used as a single argument
 * in a shell command, preventing command injection.
 *
 * @param arg The argument string to escape.
 * @param shell The type of shell the argument is for.
 * @returns The shell-escaped string.
 */
export declare function escapeShellArg(arg: string, shell: ShellType): string;
/**
 * Splits a shell command into a list of individual commands, respecting quotes.
 * This is used to separate chained commands (e.g., using &&, ||, ;).
 * @param command The shell command string to parse
 * @returns An array of individual command strings
 */
export declare function splitCommands(command: string): string[];
/**
 * Extracts the root command from a given shell command string.
 * This is used to identify the base command for permission checks.
 * @param command The shell command string to parse
 * @returns The root command name, or undefined if it cannot be determined
 * @example getCommandRoot("ls -la /tmp") returns "ls"
 * @example getCommandRoot("git status && npm test") returns "git"
 */
export declare function getCommandRoot(command: string): string | undefined;
export declare function getCommandRoots(command: string): string[];
export declare function stripShellWrapper(command: string): string;
/**
 * Detects command substitution patterns in a shell command, following bash quoting rules:
 * - Single quotes ('): Everything literal, no substitution possible
 * - Double quotes ("): Command substitution with $() and backticks unless escaped with \
 * - No quotes: Command substitution with $(), <(), and backticks
 * @param command The shell command string to check
 * @returns true if command substitution would be executed by bash
 */
export declare function detectCommandSubstitution(command: string): boolean;
/**
 * Checks a shell command against security policies and allowlists.
 *
 * This function operates in one of two modes depending on the presence of
 * the `sessionAllowlist` parameter:
 *
 * 1.  **"Default Deny" Mode (sessionAllowlist is provided):** This is the
 *     strictest mode, used for user-defined scripts like custom commands.
 *     A command is only permitted if it is found on the global `coreTools`
 *     allowlist OR the provided `sessionAllowlist`. It must not be on the
 *     global `excludeTools` blocklist.
 *
 * 2.  **"Default Allow" Mode (sessionAllowlist is NOT provided):** This mode
 *     is used for direct tool invocations (e.g., by the model). If a strict
 *     global `coreTools` allowlist exists, commands must be on it. Otherwise,
 *     any command is permitted as long as it is not on the `excludeTools`
 *     blocklist.
 *
 * @param command The shell command string to validate.
 * @param config The application configuration.
 * @param sessionAllowlist A session-level list of approved commands. Its
 *   presence activates "Default Deny" mode.
 * @returns An object detailing which commands are not allowed.
 */
export declare function checkCommandPermissions(command: string, config: Config, sessionAllowlist?: Set<string>): {
    allAllowed: boolean;
    disallowedCommands: string[];
    blockReason?: string;
    isHardDenial?: boolean;
};
/**
 * Determines whether a given shell command is allowed to execute based on
 * the tool's configuration including allowlists and blocklists.
 *
 * This function operates in "default allow" mode. It is a wrapper around
 * `checkCommandPermissions`.
 *
 * @param command The shell command string to validate.
 * @param config The application configuration.
 * @returns An object with 'allowed' boolean and optional 'reason' string if not allowed.
 */
export declare function isCommandAllowed(command: string, config: Config): {
    allowed: boolean;
    reason?: string;
};
