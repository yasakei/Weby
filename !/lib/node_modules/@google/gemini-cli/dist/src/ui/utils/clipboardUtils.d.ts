/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Checks if the system clipboard contains an image (macOS only for now)
 * @returns true if clipboard contains an image
 */
export declare function clipboardHasImage(): Promise<boolean>;
/**
 * Saves the image from clipboard to a temporary file (macOS only for now)
 * @param targetDir The target directory to create temp files within
 * @returns The path to the saved image file, or null if no image or error
 */
export declare function saveClipboardImage(targetDir?: string): Promise<string | null>;
/**
 * Cleans up old temporary clipboard image files
 * Removes files older than 1 hour
 * @param targetDir The target directory where temp files are stored
 */
export declare function cleanupOldClipboardImages(targetDir?: string): Promise<void>;
