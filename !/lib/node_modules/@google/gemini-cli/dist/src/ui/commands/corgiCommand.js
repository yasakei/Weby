/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommandKind } from './types.js';
export const corgiCommand = {
    name: 'corgi',
    description: 'Toggles corgi mode.',
    kind: CommandKind.BUILT_IN,
    action: (context, _args) => {
        context.ui.toggleCorgiMode();
    },
};
//# sourceMappingURL=corgiCommand.js.map