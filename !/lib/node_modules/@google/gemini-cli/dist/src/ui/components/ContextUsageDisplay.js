import { jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Text } from 'ink';
import { Colors } from '../colors.js';
import { tokenLimit } from '@google/gemini-cli-core';
export const ContextUsageDisplay = ({ promptTokenCount, model, }) => {
    const percentage = promptTokenCount / tokenLimit(model);
    return (_jsxs(Text, { color: Colors.Gray, children: ["(", ((1 - percentage) * 100).toFixed(0), "% context left)"] }));
};
//# sourceMappingURL=ContextUsageDisplay.js.map