/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import type React from 'react';
interface ProQuotaDialogProps {
    currentModel: string;
    fallbackModel: string;
    onChoice: (choice: 'auth' | 'continue') => void;
}
export declare function ProQuotaDialog({ currentModel, fallbackModel, onChoice, }: ProQuotaDialogProps): React.JSX.Element;
export {};
