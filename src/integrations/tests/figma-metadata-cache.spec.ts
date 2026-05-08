import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockReadFile = vi.hoisted(() => vi.fn());
const mockWriteFile = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('node:fs/promises', () => ({
  readFile: mockReadFile,
  writeFile: mockWriteFile,
}));

import {
  getFigmaMetadataPath,
  loadFigmaAssetMetadata,
  saveFigmaAssetMetadata,
} from '../figma-metadata-cache.js';

describe('figma-metadata-cache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('builds sidecar path from svg path', () => {
    expect(getFigmaMetadataPath('/tmp/assets/icon.svg')).toBe('/tmp/assets/icon.figma.json');
  });

  it('loads persisted metadata when sidecar exists', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        designInfo: { texts: ['Title'] },
        designTokens: { tokenToClassMap: { primary: 'bg-blue-500' } },
        nodeDetails: { id: 'V:1' },
      })
    );

    const result = await loadFigmaAssetMetadata('/tmp/assets/icon.svg');

    expect(result).toEqual({
      designInfo: { texts: ['Title'] },
      designTokens: { tokenToClassMap: { primary: 'bg-blue-500' } },
      nodeDetails: { id: 'V:1' },
    });
  });

  it('returns undefined when sidecar file does not exist (ENOENT)', async () => {
    mockReadFile.mockRejectedValueOnce(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));

    const result = await loadFigmaAssetMetadata('/tmp/assets/missing.svg');

    expect(result).toBeUndefined();
  });

  it('returns undefined for other read/parse failures', async () => {
    mockReadFile.mockResolvedValueOnce('{invalid-json');

    const result = await loadFigmaAssetMetadata('/tmp/assets/invalid.svg');

    expect(result).toBeUndefined();
  });

  it('persists sidecar metadata with pretty JSON', async () => {
    await saveFigmaAssetMetadata('/tmp/assets/icon.svg', {
      designInfo: { texts: ['Ok'] } as any,
      designTokens: { tokenToClassMap: {} } as any,
      nodeDetails: { foo: 'bar' },
    });

    expect(mockWriteFile).toHaveBeenCalledWith(
      '/tmp/assets/icon.figma.json',
      expect.stringContaining('"designInfo"'),
      'utf8'
    );
  });
});
