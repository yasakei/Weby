/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommandKind, } from './types.js';
import { MessageType } from '../types.js';
export const extensionsCommand = {
    name: 'extensions',
    description: 'list active extensions',
    kind: CommandKind.BUILT_IN,
    action: async (context) => {
        const activeExtensions = context.services.config
            ?.getExtensions()
            .filter((ext) => ext.isActive);
        if (!activeExtensions || activeExtensions.length === 0) {
            context.ui.addItem({
                type: MessageType.INFO,
                text: 'No active extensions.',
            }, Date.now());
            return;
        }
        const extensionLines = activeExtensions.map((ext) => `  - \u001b[36m${ext.name} (v${ext.version})\u001b[0m`);
        const message = `Active extensions:\n\n${extensionLines.join('\n')}\n`;
        context.ui.addItem({
            type: MessageType.INFO,
            text: message,
        }, Date.now());
    },
};
//# sourceMappingURL=extensionsCommand.js.map