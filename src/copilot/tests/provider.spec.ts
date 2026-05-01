import { describe, expect, it, vi } from 'vitest';

const mockProviderChat = vi.hoisted(() => vi.fn().mockResolvedValue('chat-result'));
const mockProviderResponses = vi.hoisted(() => vi.fn().mockResolvedValue('responses-result'));
const mockFetchModels = vi.hoisted(() => vi.fn().mockResolvedValue([{ id: 'gpt-5-mini' }]));
const mockAuthGetToken = vi.hoisted(() => vi.fn().mockResolvedValue('token'));
const mockAuthRefresh = vi.hoisted(() => vi.fn().mockResolvedValue('refreshed-token'));

vi.mock('../auth.js', () => ({
  normalizeDomain: (value: string) => value.replace(/^https?:\/\//, '').replace(/\/$/, ''),
  createCopilotAuthManager: vi.fn(() => ({
    getValidAccessToken: mockAuthGetToken,
    refreshAccessToken: mockAuthRefresh,
  })),
}));

vi.mock('../fetch.js', () => ({
  createCopilotFetch: vi.fn(() => vi.fn()),
}));

vi.mock('../copilot-provider.js', () => ({
  CopilotProvider: class {
    chat = mockProviderChat;
    responses = mockProviderResponses;
  },
}));

vi.mock('../models.js', () => ({
  fetchModels: mockFetchModels,
}));

import { createRuntimeCopilotProvider, resolveBaseURL, resolveMode } from '../provider.js';

describe('resolveBaseURL', () => {
  it('returns public Copilot API when enterprise URL is undefined', () => {
    expect(resolveBaseURL()).toBe('https://api.githubcopilot.com');
  });

  it('returns enterprise Copilot API URL', () => {
    expect(resolveBaseURL('https://ghe.example.com')).toBe('https://copilot-api.ghe.example.com');
  });
});

describe('resolveMode', () => {
  it('returns responses for gpt-5 family except gpt-5-mini', () => {
    expect(resolveMode('gpt-5')).toBe('responses');
    expect(resolveMode('gpt-5-pro')).toBe('responses');
    expect(resolveMode('gpt-5-mini')).toBe('chat');
  });

  it('returns chat for non gpt-5 models', () => {
    expect(resolveMode('gpt-4o')).toBe('chat');
  });
});

describe('createRuntimeCopilotProvider', () => {
  it('runModel routes to responses for gpt-5', async () => {
    const runtime = createRuntimeCopilotProvider();

    const output = await runtime.runModel(
      { messages: [{ role: 'user', content: 'Hello' }] },
      'gpt-5'
    );

    expect(output).toBe('responses-result');
    expect(mockProviderResponses).toHaveBeenCalled();
  });

  it('runModel routes to chat for gpt-5-mini', async () => {
    const runtime = createRuntimeCopilotProvider();

    const output = await runtime.runModel(
      { messages: [{ role: 'user', content: 'Hello' }] },
      'gpt-5-mini'
    );

    expect(output).toBe('chat-result');
    expect(mockProviderChat).toHaveBeenCalled();
  });

  it('fetchModels delegates to models.fetchModels with runtime baseURL', async () => {
    const runtime = createRuntimeCopilotProvider();

    const models = await runtime.fetchModels();

    expect(models).toHaveLength(1);
    expect(mockFetchModels).toHaveBeenCalled();
    expect(mockFetchModels.mock.calls[0][0]).toContain('api.githubcopilot.com');
  });

  it('runtime.chat() delegates to provider.chat (line 55)', async () => {
    const runtime = createRuntimeCopilotProvider();
    const result = await runtime.chat('gpt-5-mini', {
      messages: [{ role: 'user', content: 'test' }],
    });
    expect(result).toBe('chat-result');
    expect(mockProviderChat).toHaveBeenCalled();
  });

  it('runtime.responses() delegates to provider.responses (lines 56-57)', async () => {
    const runtime = createRuntimeCopilotProvider();
    const result = await runtime.responses('gpt-5', {
      messages: [{ role: 'user', content: 'test' }],
    });
    expect(result).toBe('responses-result');
    expect(mockProviderResponses).toHaveBeenCalled();
  });
});
