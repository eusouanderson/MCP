import { describe, expect, it } from 'vitest';

const DEFAULT_CLIENT_ID = 'Ov23li8tweQw6odWQebz';

describe('copilot auth', () => {
  it('uses the default client ID when COPILOT_CLIENT_ID is not set', () => {
    const clientId = process.env.COPILOT_CLIENT_ID || DEFAULT_CLIENT_ID;
    expect(clientId).toBe(DEFAULT_CLIENT_ID);
  });

  it('uses COPILOT_CLIENT_ID env variable when defined', () => {
    const original = process.env.COPILOT_CLIENT_ID;
    process.env.COPILOT_CLIENT_ID = 'custom-client-id';
    const clientId = process.env.COPILOT_CLIENT_ID || DEFAULT_CLIENT_ID;
    expect(clientId).toBe('custom-client-id');
    process.env.COPILOT_CLIENT_ID = original;
  });
});
