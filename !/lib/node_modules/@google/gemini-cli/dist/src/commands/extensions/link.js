/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { installExtension, } from '../../config/extension.js';
import { getErrorMessage } from '../../utils/errors.js';
export async function handleLink(args) {
    try {
        const installMetadata = {
            source: args.path,
            type: 'link',
        };
        const extensionName = await installExtension(installMetadata);
        console.log(`Extension "${extensionName}" linked successfully and enabled.`);
    }
    catch (error) {
        console.error(getErrorMessage(error));
        process.exit(1);
    }
}
export const linkCommand = {
    command: 'link <path>',
    describe: 'Links an extension from a local path. Updates made to the local path will always be reflected.',
    builder: (yargs) => yargs
        .positional('path', {
        describe: 'The name of the extension to link.',
        type: 'string',
    })
        .check((_) => true),
    handler: async (argv) => {
        await handleLink({
            path: argv['path'],
        });
    },
};
//# sourceMappingURL=link.js.map