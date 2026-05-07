import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockMkdir = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));
const mockReadFile = vi.hoisted(() => vi.fn());
const mockReaddir = vi.hoisted(() => vi.fn());
const mockWriteFile = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('node:fs/promises', () => ({
  mkdir: mockMkdir,
  readFile: mockReadFile,
  readdir: mockReaddir,
  writeFile: mockWriteFile,
}));

import { buildInitialSdd, ensureSddFile } from '../sdd-generator.js';

describe('sdd-generator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('builds a minimal template-focused SDD by inspecting the workspace', async () => {
    mockReadFile.mockResolvedValueOnce(
      JSON.stringify({
        name: 'mcp-frontend',
        version: '1.2.3',
        packageManager: 'pnpm@10.0.0',
        dependencies: { vue: '^3.5.0', pinia: '^3.0.0', axios: '^1.0.0' },
        devDependencies: { vite: '^6.0.0', vitest: '^4.0.0', typescript: '^5.0.0' },
      })
    );
    mockReaddir
      .mockResolvedValueOnce([
        { name: 'package.json', isDirectory: () => false },
        { name: 'src', isDirectory: () => true },
      ])
      .mockResolvedValueOnce([
        { name: 'components', isDirectory: () => true },
        { name: 'pages', isDirectory: () => true },
      ]);

    const sdd = await buildInitialSdd('/tmp/project');

    expect(sdd.goal).toContain('Gerar somente o template Vue');
    expect(sdd.componentContext).toEqual(
      expect.objectContaining({
        type: 'component-template',
        targetUsers: 'Usuarios finais da interface gerada.',
      })
    );
    expect(sdd.generation).toEqual({ additionalLlmInstructions: [] });
    expect(sdd.workspaceContext).toEqual(
      expect.objectContaining({
        detectedStack: expect.arrayContaining(['Vue 3', 'Vite', 'Vitest', 'TypeScript']),
        rootEntries: expect.arrayContaining(['package.json', 'src/']),
        srcEntries: expect.arrayContaining(['components/', 'pages/']),
      })
    );
  });

  it('creates src/docs/sdd.json when the file does not exist yet', async () => {
    mockReadFile
      .mockRejectedValueOnce(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }))
      .mockResolvedValueOnce(JSON.stringify({ name: 'workspace' }));
    mockReaddir.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    const result = await ensureSddFile('/tmp/project', '/tmp/project/src/docs/sdd.json');

    expect(result).toEqual({
      sddPath: '/tmp/project/src/docs/sdd.json',
      created: true,
    });
    expect(mockMkdir).toHaveBeenCalledWith('/tmp/project/src/docs', { recursive: true });
    expect(mockWriteFile).toHaveBeenCalledWith(
      '/tmp/project/src/docs/sdd.json',
      expect.stringContaining('"additionalLlmInstructions": []'),
      'utf8'
    );
  });

  it('rethrows non-ENOENT readFile errors while checking existing SDD', async () => {
    mockReadFile.mockRejectedValueOnce(Object.assign(new Error('EACCES'), { code: 'EACCES' }));

    await expect(ensureSddFile('/tmp/project', '/tmp/project/src/docs/sdd.json')).rejects.toThrow(
      'EACCES'
    );
  });

  it('rethrows non-ENOENT readdir errors while building workspace assessment', async () => {
    mockReadFile.mockResolvedValueOnce(JSON.stringify({ name: 'workspace' }));
    mockReaddir.mockRejectedValueOnce(Object.assign(new Error('EACCES'), { code: 'EACCES' }));

    await expect(buildInitialSdd('/tmp/project')).rejects.toThrow('EACCES');
  });

  it('returns created=false when sdd file already exists', async () => {
    mockReadFile.mockResolvedValueOnce('{"document": {"name": "existing"}}');

    const result = await ensureSddFile('/tmp/project', '/tmp/project/src/docs/sdd.json');

    expect(result).toEqual({
      sddPath: '/tmp/project/src/docs/sdd.json',
      created: false,
    });
    expect(mockMkdir).not.toHaveBeenCalled();
    expect(mockWriteFile).not.toHaveBeenCalled();
  });
});
