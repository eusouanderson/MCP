import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('node:fs/promises', () => ({
  mkdir: vi.fn().mockResolvedValue(undefined),
  readdir: vi.fn().mockResolvedValue([]),
  readFile: vi.fn(),
  writeFile: vi.fn().mockResolvedValue(undefined),
}));

import * as fs from 'node:fs/promises';
import { isValidSvgPath, listSvgFilesInDirectory, uploadSvgFromFile } from '../svg-upload.js';

afterEach(() => {
  vi.clearAllMocks();
});

describe('isValidSvgPath', () => {
  it('returns true for valid .svg paths', () => {
    expect(isValidSvgPath('icon.svg')).toBe(true);
    expect(isValidSvgPath('/absolute/path/icon.SVG')).toBe(true);
    expect(isValidSvgPath('  icon.svg  ')).toBe(true);
  });

  it('returns false for non-svg files', () => {
    expect(isValidSvgPath('icon.png')).toBe(false);
    expect(isValidSvgPath('icon.svg.png')).toBe(false);
    expect(isValidSvgPath('')).toBe(false);
  });

  it('returns false for ".svg" alone (length not > 4)', () => {
    expect(isValidSvgPath('.svg')).toBe(false);
  });
});

describe('listSvgFilesInDirectory', () => {
  it('returns empty array when directory has no SVG files', async () => {
    vi.mocked(fs.readdir).mockResolvedValueOnce([] as any);
    const files = await listSvgFilesInDirectory('/some/dir');
    expect(files).toEqual([]);
  });

  it('returns only .svg files, sorted alphabetically', async () => {
    vi.mocked(fs.readdir).mockResolvedValueOnce([
      { name: 'b.svg', isFile: () => true },
      { name: 'a.svg', isFile: () => true },
      { name: 'readme.md', isFile: () => true },
      { name: 'image.PNG', isFile: () => true },
    ] as any);

    const files = await listSvgFilesInDirectory('/some/dir');
    expect(files).toHaveLength(2);
    expect(files[0]).toContain('a.svg');
    expect(files[1]).toContain('b.svg');
  });

  it('creates the directory if it does not exist', async () => {
    vi.mocked(fs.readdir).mockResolvedValueOnce([] as any);
    await listSvgFilesInDirectory('/new/dir');
    expect(vi.mocked(fs.mkdir)).toHaveBeenCalledWith(expect.stringContaining('new'), {
      recursive: true,
    });
  });
});

describe('uploadSvgFromFile', () => {
  it('throws when path is not a .svg file', async () => {
    await expect(uploadSvgFromFile({ svgFilePath: 'icon.png' })).rejects.toThrow(
      'Arquivo invalido'
    );
  });

  it('throws when SVG content does not contain <svg> tag', async () => {
    vi.mocked(fs.readFile).mockResolvedValueOnce('<html><body>Not SVG</body></html>' as any);

    await expect(uploadSvgFromFile({ svgFilePath: 'icon.svg' })).rejects.toThrow(
      'Arquivo SVG invalido'
    );
  });

  it('copies SVG to destination and returns FigmaAsset', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><path/></svg>';
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(svgContent as any) // source file
      .mockRejectedValueOnce(Object.assign(new Error('ENOENT'), { code: 'ENOENT' })); // cache miss

    const result = await uploadSvgFromFile({ svgFilePath: '/tmp/my-icon.svg', assetsDir: '/tmp' });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('my-icon');
    expect(result[0].path).toContain('my-icon.svg');
    expect(vi.mocked(fs.writeFile)).toHaveBeenCalled();
  });

  it('skips writing when cached content matches', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><path/></svg>';
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(svgContent as any) // source file
      .mockResolvedValueOnce(svgContent as any); // cache hit — same content

    const result = await uploadSvgFromFile({ svgFilePath: '/tmp/my-icon.svg', assetsDir: '/tmp' });

    expect(result).toHaveLength(1);
    expect(vi.mocked(fs.writeFile)).not.toHaveBeenCalled();
  });

  it('calls onProgress during copy', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><path/></svg>';
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(svgContent as any)
      .mockRejectedValueOnce(new Error('ENOENT'));

    const messages: string[] = [];
    await uploadSvgFromFile({
      svgFilePath: '/tmp/icon.svg',
      assetsDir: '/tmp',
      onProgress: (msg) => messages.push(msg),
    });

    expect(messages.length).toBeGreaterThan(0);
  });

  it('calls onProgress with cache message when existingContent === svgContent', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><path/></svg>';
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(svgContent as any) // source file
      .mockResolvedValueOnce(svgContent as any); // cache hit — same content

    const messages: string[] = [];
    await uploadSvgFromFile({
      svgFilePath: '/tmp/my-icon.svg',
      assetsDir: '/tmp',
      onProgress: (msg) => messages.push(msg),
    });

    expect(vi.mocked(fs.writeFile)).not.toHaveBeenCalled();
    expect(messages.some((m) => m.toLowerCase().includes('cache'))).toBe(true);
  });

  it('normalizeFileName returns "asset" when filename normalizes to empty string (line 22)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><path/></svg>';
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(svgContent as any)
      .mockRejectedValueOnce(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));

    // '@#$%' has only special chars removed by [^\w\s-] → normalized = '' → 'asset'
    const result = await uploadSvgFromFile({
      svgFilePath: '/tmp/@#$%.svg',
      assetsDir: '/tmp',
    });

    expect(result[0].path).toContain('asset.svg');
  });

  it('uses process.cwd() as default assetsDir when not provided (line 53 branch)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><path/></svg>';
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(svgContent as any)
      .mockRejectedValueOnce(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));

    const result = await uploadSvgFromFile({ svgFilePath: '/tmp/icon.svg' }); // no assetsDir

    expect(result).toHaveLength(1);
    expect(vi.mocked(fs.writeFile)).toHaveBeenCalled();
  });

  it('overwrites cache when existing content differs from new SVG (line 64 false branch)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><path d="new"/></svg>';
    const oldContent = '<svg xmlns="http://www.w3.org/2000/svg"><path d="old"/></svg>';
    vi.mocked(fs.readFile)
      .mockResolvedValueOnce(svgContent as any) // source file
      .mockResolvedValueOnce(oldContent as any); // cache — different content

    const result = await uploadSvgFromFile({ svgFilePath: '/tmp/icon.svg', assetsDir: '/tmp' });

    expect(result).toHaveLength(1);
    expect(vi.mocked(fs.writeFile)).toHaveBeenCalled(); // shouldWrite stays true
  });
});
