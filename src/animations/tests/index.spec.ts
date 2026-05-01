import { afterEach, describe, expect, it, vi } from 'vitest';

const mockOraStop = vi.hoisted(() => vi.fn());
const mockOraStart = vi.hoisted(() => vi.fn().mockReturnThis());

vi.mock('ora', () => ({
  default: vi.fn(() => ({ start: mockOraStart, stop: mockOraStop })),
}));

vi.mock('chalk', () => ({
  default: {
    green: (s: string) => s,
    red: (s: string) => s,
    blue: (s: string) => s,
    gray: (s: string) => s,
  },
}));

vi.mock('log-symbols', () => ({
  default: { success: '✔', error: '✖', info: 'ℹ' },
}));

import { divider, error, loading, message, success } from '../index.js';

describe('animations', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('loading()', () => {
    it('returns a handle with a stop method', () => {
      const handle = loading('Carregando...');
      expect(handle).toHaveProperty('stop');
      expect(typeof handle.stop).toBe('function');
    });

    it('stop() calls the ora spinner stop', () => {
      const handle = loading('Carregando...');
      handle.stop();
      expect(mockOraStop).toHaveBeenCalledOnce();
    });
  });

  describe('success()', () => {
    it('calls console.log with the message', async () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await success('Tudo certo!');
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Tudo certo!'));
    });
  });

  describe('message()', () => {
    it('calls console.log with the message', async () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await message('Informação!');
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Informação!'));
    });
  });

  describe('divider()', () => {
    it('prints a plain divider when no label is provided', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      divider();
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('─'));
    });

    it('prints a labeled divider when label is provided', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      divider('resultado');
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('RESULTADO'));
    });
  });

  describe('error()', () => {
    it('calls console.error with the message', async () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      await error('Algo deu errado!');
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Algo deu errado!'));
    });
  });
});
