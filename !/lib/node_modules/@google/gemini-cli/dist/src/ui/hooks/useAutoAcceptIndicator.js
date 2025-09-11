/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { ApprovalMode } from '@google/gemini-cli-core';
import { useKeypress } from './useKeypress.js';
import { MessageType } from '../types.js';
export function useAutoAcceptIndicator({ config, addItem, }) {
    const currentConfigValue = config.getApprovalMode();
    const [showAutoAcceptIndicator, setShowAutoAcceptIndicator] = useState(currentConfigValue);
    useEffect(() => {
        setShowAutoAcceptIndicator(currentConfigValue);
    }, [currentConfigValue]);
    useKeypress((key) => {
        let nextApprovalMode;
        if (key.ctrl && key.name === 'y') {
            nextApprovalMode =
                config.getApprovalMode() === ApprovalMode.YOLO
                    ? ApprovalMode.DEFAULT
                    : ApprovalMode.YOLO;
        }
        else if (key.shift && key.name === 'tab') {
            nextApprovalMode =
                config.getApprovalMode() === ApprovalMode.AUTO_EDIT
                    ? ApprovalMode.DEFAULT
                    : ApprovalMode.AUTO_EDIT;
        }
        if (nextApprovalMode) {
            try {
                config.setApprovalMode(nextApprovalMode);
                // Update local state immediately for responsiveness
                setShowAutoAcceptIndicator(nextApprovalMode);
            }
            catch (e) {
                addItem({
                    type: MessageType.INFO,
                    text: e.message,
                }, Date.now());
            }
        }
    }, { isActive: true });
    return showAutoAcceptIndicator;
}
//# sourceMappingURL=useAutoAcceptIndicator.js.map