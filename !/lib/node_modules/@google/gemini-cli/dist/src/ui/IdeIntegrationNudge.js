import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getIdeInfo } from '@google/gemini-cli-core';
import { Box, Text } from 'ink';
import { RadioButtonSelect } from './components/shared/RadioButtonSelect.js';
import { useKeypress } from './hooks/useKeypress.js';
export function IdeIntegrationNudge({ ide, onComplete, }) {
    useKeypress((key) => {
        if (key.name === 'escape') {
            onComplete({
                userSelection: 'no',
                isExtensionPreInstalled: false,
            });
        }
    }, { isActive: true });
    const { displayName: ideName } = getIdeInfo(ide);
    // Assume extension is already installed if the env variables are set.
    const isExtensionPreInstalled = !!process.env['GEMINI_CLI_IDE_SERVER_PORT'] &&
        !!process.env['GEMINI_CLI_IDE_WORKSPACE_PATH'];
    const OPTIONS = [
        {
            label: 'Yes',
            value: {
                userSelection: 'yes',
                isExtensionPreInstalled,
            },
        },
        {
            label: 'No (esc)',
            value: {
                userSelection: 'no',
                isExtensionPreInstalled,
            },
        },
        {
            label: "No, don't ask again",
            value: {
                userSelection: 'dismiss',
                isExtensionPreInstalled,
            },
        },
    ];
    const installText = isExtensionPreInstalled
        ? `If you select Yes, the CLI will have access to your open files and display diffs directly in ${ideName ?? 'your editor'}.`
        : `If you select Yes, we'll install an extension that allows the CLI to access your open files and display diffs directly in ${ideName ?? 'your editor'}.`;
    return (_jsxs(Box, { flexDirection: "column", borderStyle: "round", borderColor: "yellow", padding: 1, width: "100%", marginLeft: 1, children: [_jsxs(Box, { marginBottom: 1, flexDirection: "column", children: [_jsxs(Text, { children: [_jsx(Text, { color: "yellow", children: '> ' }), `Do you want to connect ${ideName ?? 'your editor'} to Gemini CLI?`] }), _jsx(Text, { dimColor: true, children: installText })] }), _jsx(RadioButtonSelect, { items: OPTIONS, onSelect: onComplete })] }));
}
//# sourceMappingURL=IdeIntegrationNudge.js.map