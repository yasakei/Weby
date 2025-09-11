/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { loadUserExtensions, toOutputString } from '../../config/extension.js';
import { getErrorMessage } from '../../utils/errors.js';
export async function handleList() {
    try {
        const extensions = loadUserExtensions();
        if (extensions.length === 0) {
            console.log('No extensions installed.');
            return;
        }
        console.log(extensions
            .map((extension, _) => toOutputString(extension))
            .join('\n\n'));
    }
    catch (error) {
        console.error(getErrorMessage(error));
        process.exit(1);
    }
}
export const listCommand = {
    command: 'list',
    describe: 'Lists installed extensions.',
    builder: (yargs) => yargs,
    handler: async () => {
        await handleList();
    },
};
//# sourceMappingURL=list.js.map