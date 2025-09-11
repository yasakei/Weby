import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { useKeypress } from '../hooks/useKeypress.js';
import * as process from 'node:process';
import * as path from 'node:path';
export var FolderTrustChoice;
(function (FolderTrustChoice) {
    FolderTrustChoice["TRUST_FOLDER"] = "trust_folder";
    FolderTrustChoice["TRUST_PARENT"] = "trust_parent";
    FolderTrustChoice["DO_NOT_TRUST"] = "do_not_trust";
})(FolderTrustChoice || (FolderTrustChoice = {}));
export const FolderTrustDialog = ({ onSelect, isRestarting, }) => {
    useKeypress((key) => {
        if (key.name === 'escape') {
            onSelect(FolderTrustChoice.DO_NOT_TRUST);
        }
    }, { isActive: !isRestarting });
    useKeypress((key) => {
        if (key.name === 'r') {
            process.exit(0);
        }
    }, { isActive: !!isRestarting });
    const parentFolder = path.basename(path.dirname(process.cwd()));
    const options = [
        {
            label: 'Trust folder',
            value: FolderTrustChoice.TRUST_FOLDER,
        },
        {
            label: `Trust parent folder (${parentFolder})`,
            value: FolderTrustChoice.TRUST_PARENT,
        },
        {
            label: "Don't trust (esc)",
            value: FolderTrustChoice.DO_NOT_TRUST,
        },
    ];
    return (_jsxs(Box, { flexDirection: "column", children: [_jsxs(Box, { flexDirection: "column", borderStyle: "round", borderColor: Colors.AccentYellow, padding: 1, width: "100%", marginLeft: 1, children: [_jsxs(Box, { flexDirection: "column", marginBottom: 1, children: [_jsx(Text, { bold: true, children: "Do you trust this folder?" }), _jsx(Text, { children: "Trusting a folder allows Gemini to execute commands it suggests. This is a security feature to prevent accidental execution in untrusted directories." })] }), _jsx(RadioButtonSelect, { items: options, onSelect: onSelect, isFocused: !isRestarting })] }), isRestarting && (_jsx(Box, { marginLeft: 1, marginTop: 1, children: _jsx(Text, { color: Colors.AccentYellow, children: "To see changes, Gemini CLI must be restarted. Press r to exit and apply changes now." }) }))] }));
};
//# sourceMappingURL=FolderTrustDialog.js.map