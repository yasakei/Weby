import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserMessage } from './messages/UserMessage.js';
import { UserShellMessage } from './messages/UserShellMessage.js';
import { GeminiMessage } from './messages/GeminiMessage.js';
import { InfoMessage } from './messages/InfoMessage.js';
import { ErrorMessage } from './messages/ErrorMessage.js';
import { ToolGroupMessage } from './messages/ToolGroupMessage.js';
import { GeminiMessageContent } from './messages/GeminiMessageContent.js';
import { CompressionMessage } from './messages/CompressionMessage.js';
import { Box } from 'ink';
import { AboutBox } from './AboutBox.js';
import { StatsDisplay } from './StatsDisplay.js';
import { ModelStatsDisplay } from './ModelStatsDisplay.js';
import { ToolStatsDisplay } from './ToolStatsDisplay.js';
import { SessionSummaryDisplay } from './SessionSummaryDisplay.js';
import { Help } from './Help.js';
export const HistoryItemDisplay = ({ item, availableTerminalHeight, terminalWidth, isPending, config, commands, isFocused = true, }) => (_jsxs(Box, { flexDirection: "column", children: [item.type === 'user' && _jsx(UserMessage, { text: item.text }), item.type === 'user_shell' && _jsx(UserShellMessage, { text: item.text }), item.type === 'gemini' && (_jsx(GeminiMessage, { text: item.text, isPending: isPending, availableTerminalHeight: availableTerminalHeight, terminalWidth: terminalWidth })), item.type === 'gemini_content' && (_jsx(GeminiMessageContent, { text: item.text, isPending: isPending, availableTerminalHeight: availableTerminalHeight, terminalWidth: terminalWidth })), item.type === 'info' && _jsx(InfoMessage, { text: item.text }), item.type === 'error' && _jsx(ErrorMessage, { text: item.text }), item.type === 'about' && (_jsx(AboutBox, { cliVersion: item.cliVersion, osVersion: item.osVersion, sandboxEnv: item.sandboxEnv, modelVersion: item.modelVersion, selectedAuthType: item.selectedAuthType, gcpProject: item.gcpProject, ideClient: item.ideClient })), item.type === 'help' && commands && _jsx(Help, { commands: commands }), item.type === 'stats' && _jsx(StatsDisplay, { duration: item.duration }), item.type === 'model_stats' && _jsx(ModelStatsDisplay, {}), item.type === 'tool_stats' && _jsx(ToolStatsDisplay, {}), item.type === 'quit' && _jsx(SessionSummaryDisplay, { duration: item.duration }), item.type === 'tool_group' && (_jsx(ToolGroupMessage, { toolCalls: item.tools, groupId: item.id, availableTerminalHeight: availableTerminalHeight, terminalWidth: terminalWidth, config: config, isFocused: isFocused })), item.type === 'compression' && (_jsx(CompressionMessage, { compression: item.compression }))] }, item.id));
//# sourceMappingURL=HistoryItemDisplay.js.map