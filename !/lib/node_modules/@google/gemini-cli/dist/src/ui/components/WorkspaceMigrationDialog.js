import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Box, Text, useInput } from 'ink';
import { performWorkspaceExtensionMigration, } from '../../config/extension.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { Colors } from '../colors.js';
import { useState } from 'react';
export function WorkspaceMigrationDialog(props) {
    const { workspaceExtensions, onOpen, onClose } = props;
    const [migrationComplete, setMigrationComplete] = useState(false);
    const [failedExtensions, setFailedExtensions] = useState([]);
    onOpen();
    const onMigrate = async () => {
        const failed = await performWorkspaceExtensionMigration(workspaceExtensions);
        setFailedExtensions(failed);
        setMigrationComplete(true);
    };
    useInput((input) => {
        if (migrationComplete && input === 'q') {
            process.exit(0);
        }
    });
    if (migrationComplete) {
        return (_jsx(Box, { flexDirection: "column", borderStyle: "round", borderColor: Colors.Gray, padding: 1, children: failedExtensions.length > 0 ? (_jsxs(_Fragment, { children: [_jsxs(Text, { children: ["The following extensions failed to migrate. Please try installing them manually. To see other changes, Gemini CLI must be restarted. Press ", "'q'", " to quit."] }), _jsx(Box, { flexDirection: "column", marginTop: 1, marginLeft: 2, children: failedExtensions.map((failed) => (_jsxs(Text, { children: ["- ", failed] }, failed))) })] })) : (_jsxs(Text, { children: ["Migration complete. To see changes, Gemini CLI must be restarted. Press ", "'q'", " to quit."] })) }));
    }
    return (_jsxs(Box, { flexDirection: "column", borderStyle: "round", borderColor: Colors.Gray, padding: 1, children: [_jsxs(Text, { bold: true, children: ["Workspace-level extensions are deprecated", '\n'] }), _jsx(Text, { children: "Would you like to install them at the user level?" }), _jsx(Text, { children: "The extension definition will remain in your workspace directory." }), _jsx(Text, { children: "If you opt to skip, you can install them manually using the extensions install command." }), _jsx(Box, { flexDirection: "column", marginTop: 1, marginLeft: 2, children: workspaceExtensions.map((extension) => (_jsxs(Text, { children: ["- ", extension.config.name] }, extension.config.name))) }), _jsx(Box, { marginTop: 1, children: _jsx(RadioButtonSelect, { items: [
                        { label: 'Install all', value: 'migrate' },
                        { label: 'Skip', value: 'skip' },
                    ], onSelect: (value) => {
                        if (value === 'migrate') {
                            onMigrate();
                        }
                        else {
                            onClose();
                        }
                    } }) })] }));
}
//# sourceMappingURL=WorkspaceMigrationDialog.js.map