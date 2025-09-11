/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { type CommandModule } from 'yargs';
import { SettingScope } from '../../config/settings.js';
interface EnableArgs {
    name: string;
    scope?: SettingScope;
}
export declare function handleEnable(args: EnableArgs): Promise<void>;
export declare const enableCommand: CommandModule;
export {};
