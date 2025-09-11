/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createContentGenerator, AuthType, createContentGeneratorConfig, } from './contentGenerator.js';
import { createCodeAssistContentGenerator } from '../code_assist/codeAssist.js';
import { GoogleGenAI } from '@google/genai';
import { LoggingContentGenerator } from './loggingContentGenerator.js';
vi.mock('../code_assist/codeAssist.js');
vi.mock('@google/genai');
const mockConfig = {};
describe('createContentGenerator', () => {
    it('should create a CodeAssistContentGenerator', async () => {
        const mockGenerator = {};
        vi.mocked(createCodeAssistContentGenerator).mockResolvedValue(mockGenerator);
        const generator = await createContentGenerator({
            model: 'test-model',
            authType: AuthType.LOGIN_WITH_GOOGLE,
        }, mockConfig);
        expect(createCodeAssistContentGenerator).toHaveBeenCalled();
        expect(generator).toEqual(new LoggingContentGenerator(mockGenerator, mockConfig));
    });
    it('should create a GoogleGenAI content generator', async () => {
        const mockConfig = {
            getUsageStatisticsEnabled: () => true,
        };
        const mockGenerator = {
            models: {},
        };
        vi.mocked(GoogleGenAI).mockImplementation(() => mockGenerator);
        const generator = await createContentGenerator({
            model: 'test-model',
            apiKey: 'test-api-key',
            authType: AuthType.USE_GEMINI,
        }, mockConfig);
        expect(GoogleGenAI).toHaveBeenCalledWith({
            apiKey: 'test-api-key',
            vertexai: undefined,
            httpOptions: {
                headers: {
                    'User-Agent': expect.any(String),
                    'x-gemini-api-privileged-user-id': expect.any(String),
                },
            },
        });
        expect(generator).toEqual(new LoggingContentGenerator(mockGenerator.models, mockConfig));
    });
    it('should create a GoogleGenAI content generator with client install id logging disabled', async () => {
        const mockConfig = {
            getUsageStatisticsEnabled: () => false,
        };
        const mockGenerator = {
            models: {},
        };
        vi.mocked(GoogleGenAI).mockImplementation(() => mockGenerator);
        const generator = await createContentGenerator({
            model: 'test-model',
            apiKey: 'test-api-key',
            authType: AuthType.USE_GEMINI,
        }, mockConfig);
        expect(GoogleGenAI).toHaveBeenCalledWith({
            apiKey: 'test-api-key',
            vertexai: undefined,
            httpOptions: {
                headers: {
                    'User-Agent': expect.any(String),
                },
            },
        });
        expect(generator).toEqual(new LoggingContentGenerator(mockGenerator.models, mockConfig));
    });
});
describe('createContentGeneratorConfig', () => {
    const mockConfig = {
        getModel: vi.fn().mockReturnValue('gemini-pro'),
        setModel: vi.fn(),
        flashFallbackHandler: vi.fn(),
        getProxy: vi.fn(),
    };
    beforeEach(() => {
        // Reset modules to re-evaluate imports and environment variables
        vi.resetModules();
        vi.clearAllMocks();
    });
    afterEach(() => {
        vi.unstubAllEnvs();
    });
    it('should configure for Gemini using GEMINI_API_KEY when set', async () => {
        vi.stubEnv('GEMINI_API_KEY', 'env-gemini-key');
        const config = await createContentGeneratorConfig(mockConfig, AuthType.USE_GEMINI);
        expect(config.apiKey).toBe('env-gemini-key');
        expect(config.vertexai).toBe(false);
    });
    it('should not configure for Gemini if GEMINI_API_KEY is empty', async () => {
        vi.stubEnv('GEMINI_API_KEY', '');
        const config = await createContentGeneratorConfig(mockConfig, AuthType.USE_GEMINI);
        expect(config.apiKey).toBeUndefined();
        expect(config.vertexai).toBeUndefined();
    });
    it('should configure for Vertex AI using GOOGLE_API_KEY when set', async () => {
        vi.stubEnv('GOOGLE_API_KEY', 'env-google-key');
        const config = await createContentGeneratorConfig(mockConfig, AuthType.USE_VERTEX_AI);
        expect(config.apiKey).toBe('env-google-key');
        expect(config.vertexai).toBe(true);
    });
    it('should configure for Vertex AI using GCP project and location when set', async () => {
        vi.stubEnv('GOOGLE_CLOUD_PROJECT', 'env-gcp-project');
        vi.stubEnv('GOOGLE_CLOUD_LOCATION', 'env-gcp-location');
        const config = await createContentGeneratorConfig(mockConfig, AuthType.USE_VERTEX_AI);
        expect(config.vertexai).toBe(true);
        expect(config.apiKey).toBeUndefined();
    });
    it('should not configure for Vertex AI if required env vars are empty', async () => {
        vi.stubEnv('GOOGLE_API_KEY', '');
        vi.stubEnv('GOOGLE_CLOUD_PROJECT', '');
        vi.stubEnv('GOOGLE_CLOUD_LOCATION', '');
        const config = await createContentGeneratorConfig(mockConfig, AuthType.USE_VERTEX_AI);
        expect(config.apiKey).toBeUndefined();
        expect(config.vertexai).toBeUndefined();
    });
});
//# sourceMappingURL=contentGenerator.test.js.map