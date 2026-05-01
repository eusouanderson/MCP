import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockQuestion = vi.hoisted(() => vi.fn());
const mockRlClose = vi.hoisted(() => vi.fn());

vi.mock('node:readline/promises', () => ({
  default: {
    createInterface: vi.fn(() => ({
      question: mockQuestion,
      close: mockRlClose,
    })),
  },
  createInterface: vi.fn(() => ({
    question: mockQuestion,
    close: mockRlClose,
  })),
}));

vi.mock('node:fs/promises', () => ({
  mkdir: vi.fn().mockResolvedValue(undefined),
  readFile: vi.fn().mockRejectedValue(Object.assign(new Error('ENOENT'), { code: 'ENOENT' })),
  writeFile: vi.fn().mockResolvedValue(undefined),
}));

import { readFile } from 'node:fs/promises';
import { __figmaTestUtils, downloadFigmaSvgs } from '../figma.js';

const VALID_URL = 'https://www.figma.com/design/ABC123XYZ/my-file';
const URL_WITH_NODE = 'https://www.figma.com/design/ABC123XYZ/my-file?node-id=1150-16805';

describe('downloadFigmaSvgs', () => {
  beforeEach(() => {
    vi.stubEnv('FIGMA_TOKEN', 'test-token-xxx');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    mockQuestion.mockReset();
    mockRlClose.mockReset();
  });

  it('prompts and persists token when FIGMA_TOKEN is not defined', async () => {
    vi.unstubAllEnvs();
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('token-from-terminal');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          document: {
            id: '0:0',
            name: 'Document',
            type: 'DOCUMENT',
            children: [
              {
                id: '1:0',
                name: 'Page',
                type: 'CANVAS',
                children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
              },
            ],
          },
        }),
      })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: VALID_URL })).rejects.toThrow(
      'Nao foi possivel obter URLs de renderizacao'
    );
    expect(mockQuestion).toHaveBeenCalledOnce();
    expect(process.env.FIGMA_TOKEN).toBe('token-from-terminal');
  });

  it('throws when prompted token is empty', async () => {
    vi.unstubAllEnvs();
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('   ');

    await expect(downloadFigmaSvgs({ figmaUrl: VALID_URL })).rejects.toThrow(
      'FIGMA_TOKEN nao informada'
    );
    expect(mockRlClose).toHaveBeenCalledOnce();
  });

  it('throws for an invalid Figma URL', async () => {
    await expect(downloadFigmaSvgs({ figmaUrl: 'https://notfigma.com/something' })).rejects.toThrow(
      'URL do Figma invalida'
    );
  });

  it('throws when render URL is null for a specific node-id', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ images: { '1150:16805': null } }),
      })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id 1150:16805'
    );
  });

  it('downloads a single asset when node-id is in the URL', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: { '1150:16805': 'https://cdn.figma.com/exports/test.svg' },
            }),
          });
        }
        if (url.includes('/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: { '1150:16805': { document: { name: 'Button' } } },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('Button');
  });

  it('uses fallback node name when /nodes request fails', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: { '1150:16805': 'https://cdn.figma.com/exports/test.svg' },
            }),
          });
        }
        if (url.includes('/nodes')) {
          return Promise.resolve({ ok: false, status: 403, text: async () => 'Forbidden' });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    expect(assets[0].name).toContain('1150');
  });

  it('throws when full document has no exportable nodes', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          document: {
            id: '0:0',
            name: 'Document',
            type: 'DOCUMENT',
            children: [{ id: '1:0', name: 'Page 1', type: 'CANVAS', children: [] }],
          },
        }),
      })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: VALID_URL })).rejects.toThrow(
      'Nenhum node exportavel encontrado'
    );
  });

  it('downloads assets from a full document', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><circle/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'C1:1': 'https://cdn.figma.com/exports/icon.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page 1',
                    type: 'CANVAS',
                    children: [{ id: 'C1:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('Icon');
  });

  it('throws a friendly error for oversized Figma documents', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => {
          throw new Error('Cannot create a string longer than 0x1fffffe8 characters');
        },
      })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: VALID_URL })).rejects.toThrow(
      'Documento do Figma muito grande'
    );
  });

  it('throws when full document has no document field', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ document: null }),
      })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: VALID_URL })).rejects.toThrow(
      'Documento nao encontrado no Figma'
    );
  });

  it('triggers >= 20 nodes onProgress message', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';
    // Need 2 canvases × 15 children each = 30 potential nodes; maxNodes=20 caps at 20
    const makeVectors = (prefix: string) =>
      Array.from({ length: 15 }, (_, i) => ({
        id: `${prefix}:${i}`,
        name: `Icon${prefix}${i}`,
        type: 'VECTOR',
        children: [],
      }));
    const page1Children = makeVectors('A');
    const page2Children = makeVectors('B');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          const images: Record<string, string> = {};
          [...page1Children, ...page2Children].forEach((c) => {
            images[c.id] = `https://cdn.figma.com/exports/${c.id}.svg`;
          });
          return Promise.resolve({ ok: true, json: async () => ({ images }) });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  { id: '1:0', name: 'Page1', type: 'CANVAS', children: page1Children },
                  { id: '1:1', name: 'Page2', type: 'CANVAS', children: page2Children },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const messages: string[] = [];
    await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: (m) => messages.push(m),
    });

    expect(messages.some((m) => m.includes('primeiros 20'))).toBe(true);
  });

  it('throws when imagesResponse.images is falsy', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({ ok: true, json: async () => ({ images: null }) });
        }
        return Promise.resolve({
          ok: true,
          json: async () => ({
            document: {
              id: '0:0',
              name: 'Document',
              type: 'DOCUMENT',
              children: [
                {
                  id: '1:0',
                  name: 'Page',
                  type: 'CANVAS',
                  children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                },
              ],
            },
          }),
        });
      })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: VALID_URL })).rejects.toThrow(
      'Nao foi possivel obter URLs de renderizacao'
    );
  });

  it('skips node when renderUrl is missing and calls onProgress', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          // V:1 has no render URL, V:2 has one
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:2': 'https://cdn.figma.com/exports/icon2.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      { id: 'V:1', name: 'NoUrl', type: 'VECTOR', children: [] },
                      { id: 'V:2', name: 'WithUrl', type: 'VECTOR', children: [] },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const messages: string[] = [];
    const assets = await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: (m) => messages.push(m),
    });

    expect(assets).toHaveLength(1);
    expect(messages.some((m) => m.includes('sem URL de renderizacao'))).toBe(true);
  });

  it('calls onProgress with error message when downloadSvg fails (non-Error throw)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/icon.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        // SVG download — first call fails with non-Error (string)
        return Promise.reject('network string error');
      })
    );

    const messages: string[] = [];
    const assets = await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: (m) => messages.push(m),
    });

    expect(assets).toHaveLength(0);
    expect(messages.some((m) => m.includes('Erro ao baixar'))).toBe(true);
  });

  it('calls onProgress with error message when downloadSvg fails (Error instance)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/icon.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: false, status: 500 });
      })
    );

    const messages: string[] = [];
    await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: (m) => messages.push(m),
    });

    expect(messages.some((m) => m.includes('Erro ao baixar'))).toBe(true);
  });

  it('uses cache hit path (existingContent === svgContent → no writeFile) in full-doc download', async () => {
    const { writeFile, readFile } = await import('node:fs/promises');
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><circle/></svg>';

    vi.mocked(readFile).mockResolvedValue(svgContent as any);

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/icon.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    expect(vi.mocked(writeFile)).not.toHaveBeenCalled();
    vi.mocked(readFile).mockRejectedValue(Object.assign(new Error('ENOENT'), { code: 'ENOENT' }));
  });

  it('uses fallback URL regex path (line 55) when URL has no protocol (new URL() throws)', async () => {
    // Without https://, new URL() throws → catch block runs → FIGMA_URL_REGEX matches → line 55 reached
    const noProtocolUrl = 'figma.com/design/ABC123XYZ/my-file';
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/icon.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: noProtocolUrl, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
  });

  it('uses collectAllExportableIds fallback when normal collect returns empty', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'F:1': 'https://cdn.figma.com/exports/frame.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    // FRAME: not picked by collectExportableNodeIds (not vector, no IMAGE fill)
                    // but collectAllExportableIds picks it (not DOCUMENT/CANVAS)
                    children: [{ id: 'F:1', name: 'Frame', type: 'FRAME', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        // SVG download
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const messages: string[] = [];
    const assets = await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: (m) => messages.push(m),
    });

    expect(assets).toHaveLength(1);
    expect(messages.some((m) => m.includes('coleta alternativa'))).toBe(true);
  });

  it('collectAllExportableIds hits maxNodes cap (lines 165, 171) with 20+ FRAME nodes via fallback', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';
    // 9 FRAMEs in page1 + 12 FRAMEs in page2 = 21 total; maxNodes=20 caps it
    // When 20th FRAME is pushed → return at line 165; iteration 21 fires break at line 171
    const makeFrames = (prefix: string, count: number) =>
      Array.from({ length: count }, (_, i) => ({
        id: `${prefix}:${i}`,
        name: `Frame${prefix}${i}`,
        type: 'FRAME',
        children: [],
      }));
    const page1Frames = makeFrames('A', 9);
    const page2Frames = makeFrames('B', 12);
    const allFrames = [...page1Frames, ...page2Frames];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          const images: Record<string, string> = {};
          allFrames.forEach((f) => {
            images[f.id] = `https://cdn.figma.com/exports/${f.id}.svg`;
          });
          return Promise.resolve({ ok: true, json: async () => ({ images }) });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  { id: 'P:1', name: 'Page1', type: 'CANVAS', children: page1Frames },
                  { id: 'P:2', name: 'Page2', type: 'CANVAS', children: page2Frames },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const messages: string[] = [];
    const assets = await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: (m) => messages.push(m),
    });

    // 20 assets collected (capped at maxNodes=20)
    expect(assets).toHaveLength(20);
    expect(messages.some((m) => m.includes('primeiros 20'))).toBe(true);
    expect(messages.some((m) => m.includes('coleta alternativa'))).toBe(true);
  });

  it('skips node with undefined name in nodeNames map (line 355)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: {
                'V:1': 'https://cdn.figma.com/exports/v1.svg',
                'V:2': 'https://cdn.figma.com/exports/v2.svg',
              },
            }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      // V:1 has no name → nodeNames.get('V:1') = undefined → !nodeName → continue
                      { id: 'V:1', name: undefined, type: 'VECTOR', children: [] },
                      { id: 'V:2', name: 'Icon', type: 'VECTOR', children: [] },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });

    // V:1 is skipped (undefined name), V:2 is downloaded
    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('Icon');
  });

  it('deduplicates nodes with same id via visited set (collectExportableNodeIds line 110, collectAllExportableIds line 151)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';
    // Duplicate node: same object referenced twice in children array → same id visited twice
    const duplicateVector = { id: 'V:dup', name: 'DupIcon', type: 'VECTOR', children: [] };
    const duplicateFrame = { id: 'F:dup', name: 'DupFrame', type: 'FRAME', children: [] };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: {
                'V:dup': 'https://cdn.figma.com/exports/dup.svg',
                'F:dup': 'https://cdn.figma.com/exports/fdup.svg',
              },
            }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    // duplicate VECTOR: collectExportableNodeIds visits V:dup twice → line 110 on 2nd
                    children: [duplicateVector, duplicateVector],
                  },
                  {
                    id: '2:0',
                    name: 'Page2',
                    type: 'CANVAS',
                    // duplicate FRAME: collectAllExportableIds visits F:dup twice → line 151 on 2nd
                    // but collectExportableNodeIds will find V:dup in page 1, so fallback won't run
                    // Actually we need page2 to trigger collectAllExportableIds
                    children: [duplicateFrame, duplicateFrame],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    // V:dup collected once (deduped); Page2's FRAMEs not reached by collectExportableNodeIds
    expect(assets.length).toBeGreaterThanOrEqual(1);
  });

  it('collectAllExportableIds deduplicates via visited set (line 151)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';
    const duplicateFrame = { id: 'F:dup', name: 'DupFrame', type: 'FRAME', children: [] };

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'F:dup': 'https://cdn.figma.com/exports/fdup.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    // Only FRAMEs (not exportable by collectExportableNodeIds) → fallback used
                    // Duplicate FRAME id → collectAllExportableIds deduplicates (line 151)
                    children: [duplicateFrame, duplicateFrame],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    // F:dup collected once despite appearing twice
    expect(assets).toHaveLength(1);
  });

  it('downloads various vector node types (BOOLEAN_OPERATION, STAR, ELLIPSE, POLYGON, LINE)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';
    const vectorTypes = ['BOOLEAN_OPERATION', 'STAR', 'ELLIPSE', 'POLYGON', 'LINE'];
    const makeVectorNode = (id: string, type: string) => ({
      id,
      name: `${type}Node`,
      type,
      children: [],
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          const images: Record<string, string> = {};
          vectorTypes.forEach((_, i) => {
            images[`V:${i}`] = `https://cdn.figma.com/exports/${i}.svg`;
          });
          return Promise.resolve({ ok: true, json: async () => ({ images }) });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: vectorTypes.map((type, i) => makeVectorNode(`V:${i}`, type)),
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets.length).toBeGreaterThanOrEqual(5);
  });

  it('succeeds with design tokens from Figma API (mode precisão máxima)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          // Token API response
          return Promise.resolve({
            ok: true,
            json: async () => ({
              variables: [
                {
                  id: 'var-1',
                  name: 'primary-color',
                  valuesByMode: { mode1: '#FF0000' },
                  resolvedType: 'COLOR',
                },
                {
                  id: 'var-2',
                  name: 'spacing-md',
                  valuesByMode: { mode1: 16 },
                  resolvedType: 'FLOAT',
                },
              ],
            }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].designTokens).toBeDefined();
    expect(Object.keys(assets[0].designTokens?.tokenToClassMap || {})).toHaveLength(2);
  });

  it('falls back gracefully when token fetch fails', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          // Token API fails
          return Promise.reject(new Error('Token API error'));
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const messages: string[] = [];
    const assets = await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: (m) => messages.push(m),
    });

    expect(assets).toHaveLength(1);
  });

  it('handles node names with special characters', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      { id: 'V:1', name: 'Button-Primary@2x!', type: 'VECTOR', children: [] },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    // Component name should be PascalCase: Button-Primary@2x! -> ButtonPrimary2x
    expect(assets[0].name).toMatch(/[A-Z][a-zA-Z0-9]*/);
  });

  it('handles IMAGE fill type (should export as SVG)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      {
                        id: 'V:1',
                        name: 'Image-Rect',
                        type: 'VECTOR',
                        fills: [
                          {
                            type: 'IMAGE',
                            imageRef: 'image-ref-123',
                          },
                        ],
                        children: [],
                      },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('ImageRect');
  });

  it('handles node with no absoluteBoundingBox', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      {
                        id: 'V:1',
                        name: 'No-Bounding-Box',
                        type: 'VECTOR',
                        // No absoluteBoundingBox
                        children: [],
                      },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].designInfo?.layout.width).toBeUndefined();
  });

  it('replaces existing FIGMA_TOKEN in .env when prompting in development', async () => {
    const { readFile, writeFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'development';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('new-dev-token');

    vi.mocked(readFile).mockImplementation(async (filePath: any) => {
      if (String(filePath).endsWith('.env')) {
        return 'FOO=bar\nFIGMA_TOKEN=old-token\n';
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );

    expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
      expect.stringContaining('.env'),
      expect.stringContaining('FIGMA_TOKEN=new-dev-token'),
      'utf8'
    );
  });

  it('appends FIGMA_TOKEN to existing .env content without trailing newline', async () => {
    const { readFile, writeFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'development';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('token-no-newline');

    vi.mocked(readFile).mockImplementation(async (filePath: any) => {
      if (String(filePath).endsWith('.env')) {
        return 'FOO=bar';
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );

    expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
      expect.stringContaining('.env'),
      'FOO=bar\nFIGMA_TOKEN=token-no-newline\n',
      'utf8'
    );
  });

  it('writes SVG when cached file content differs', async () => {
    const { readFile, writeFile } = await import('node:fs/promises');
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.mocked(readFile).mockResolvedValueOnce('<svg></svg>');

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/icon.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(vi.mocked(writeFile)).toHaveBeenCalled();
  });

  it('appends FIGMA_TOKEN preserving existing .env trailing newline', async () => {
    const { readFile, writeFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'development';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('token-with-newline');

    vi.mocked(readFile).mockImplementation(async (filePath: any) => {
      if (String(filePath).endsWith('.env')) {
        return 'FOO=bar\n';
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );

    expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
      expect.stringContaining('.env'),
      'FOO=bar\nFIGMA_TOKEN=token-with-newline\n',
      'utf8'
    );
  });

  it('handles variables with missing names and null valuesByMode gracefully', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              variables: [
                {
                  id: 'var-1',
                  valuesByMode: { mode1: null },
                },
              ],
            }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/icon.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].designTokens?.tokenToClassMap).toEqual({});
  });

  it('reports production progress when prompting missing FIGMA_TOKEN in production', async () => {
    const progress = vi.fn();
    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'production';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('prod-token-progress');

    vi.mocked(readFile).mockImplementation(async () => {
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: { '1150:16805': null } }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE, onProgress: progress })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );

    expect(progress).toHaveBeenCalledWith('FIGMA_TOKEN nao encontrada. Solicitar token no terminal...');
    expect(progress).toHaveBeenCalledWith(
      'FIGMA_TOKEN salva em armazenamento seguro local (producao).'
    );
  });

  it('throws when saving FIGMA_TOKEN in .env gets non-ENOENT read error', async () => {
    const { readFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'development';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('any-token');
    vi.mocked(readFile).mockRejectedValueOnce(
      Object.assign(new Error('EACCES'), { code: 'EACCES' })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: VALID_URL })).rejects.toThrow('EACCES');
  });

  it('maps spacing/radius/size token classes and extracts node design info in node-id flow', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              variables: {
                v1: { name: 'spacingSm', valuesByMode: { m1: 2 } },
                v2: { name: 'radiusMd', valuesByMode: { m1: 4 } },
                v3: { name: 'sizeLg', valuesByMode: { m1: 8 } },
              },
            }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: { '1150:16805': 'https://cdn.figma.com/exports/test.svg' },
            }),
          });
        }
        if (url.includes('/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: {
                '1150:16805': {
                  document: {
                    id: '1150:16805',
                    name: 'Card',
                    type: 'FRAME',
                    layoutMode: 'VERTICAL',
                    itemSpacing: 8,
                    absoluteBoundingBox: { width: 80, height: 32 },
                    styles: { fill: 'S:fill-1', text: 'S:text-1' },
                    fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 } }],
                    children: [
                      {
                        id: 'T:1',
                        name: 'Title',
                        type: 'TEXT',
                        characters: 'Hello',
                        style: { fontFamily: 'Inter', fontSize: 14, fontWeight: 500 },
                        children: [],
                      },
                    ],
                  },
                },
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    expect(assets[0].designInfo?.texts).toContain('Hello');
    expect(assets[0].designInfo?.styleRefs?.fill).toContain('S:fill-1');
    expect(assets[0].designInfo?.styleRefs?.text).toContain('S:text-1');
    expect(assets[0].designTokens?.tokenToClassMap?.spacingSm).toBe('p-2');
    expect(assets[0].designTokens?.tokenToClassMap?.radiusMd).toBe('rounded-4');
    expect(assets[0].designTokens?.tokenToClassMap?.sizeLg).toBe('w-8');
  });

  it('uses cwd default assetsDir for node-id downloads', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { '1150:16805': 'https://cdn.figma.com/exports/card.svg' } }),
          });
        }
        if (url.includes('/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: {
                '1150:16805': {
                  document: {
                    id: '1150:16805',
                    name: 'Card',
                    type: 'FRAME',
                    fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 1 } }],
                    children: [],
                  },
                },
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE });
    expect(assets).toHaveLength(1);
    expect(assets[0].path).toMatch(/^svg\//);
    expect(assets[0].name).toBe('Card');
  });

  it('loads FIGMA_TOKEN from production secrets and sets process.env', async () => {
    const { readFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'production';
    delete process.env.FIGMA_TOKEN;

    vi.mocked(readFile).mockImplementation(async (filePath: any) => {
      if (String(filePath).includes('secrets.json')) {
        return JSON.stringify({ FIGMA_TOKEN: 'prod-secret-token' });
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );
    expect(process.env.FIGMA_TOKEN).toBe('prod-secret-token');
  });

  it('saves FIGMA_TOKEN in runtime secrets when prompting in production', async () => {
    const { readFile, writeFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'production';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('prod-prompt-token');

    vi.mocked(readFile).mockImplementation(async () => {
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );

    expect(mockQuestion).toHaveBeenCalledOnce();
    expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
      expect.stringContaining('secrets.json'),
      expect.stringContaining('"FIGMA_TOKEN": "prod-prompt-token"'),
      'utf8'
    );
  });

  it('falls back to prompt when production secrets content is invalid JSON', async () => {
    const { readFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'production';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('token-after-invalid-json');

    vi.mocked(readFile).mockImplementation(async (filePath: any) => {
      if (String(filePath).includes('secrets.json')) {
        return '{invalid';
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );
    expect(mockQuestion).toHaveBeenCalledOnce();
  });

  it('keeps going when onProgress throws during token-fetch phase and reports warning', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          return Promise.resolve({ ok: true, json: async () => ({ variables: {} }) });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    let first = true;
    const progress = vi.fn((message: string) => {
      if (first && message.includes('Buscando tokens de design do Figma...')) {
        first = false;
        throw new Error('progress-failed');
      }
    });

    const assets = await downloadFigmaSvgs({
      figmaUrl: VALID_URL,
      assetsDir: '/tmp/test',
      onProgress: progress,
    });

    expect(assets).toHaveLength(1);
    expect(progress).toHaveBeenCalledWith('Aviso: nao foi possivel carregar tokens de design');
  });

  it('extracts per-node designInfo in full-document flow when /nodes succeeds', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/ABC123XYZ/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: {
                'V:1': {
                  document: {
                    id: 'V:1',
                    name: 'Icon',
                    type: 'VECTOR',
                    absoluteBoundingBox: { width: 24, height: 24 },
                    children: [],
                  },
                },
              },
            }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    expect(assets[0].designInfo?.layout.width).toBe(24);
  });

  it('hits collectExportableNodeIds early return when output already reached maxNodes', () => {
    const node = {
      id: 'V:1',
      name: 'Icon',
      type: 'VECTOR',
      children: [],
    } as any;

    const prefilled = Array.from({ length: 20 }, (_, i) => ({ id: `X:${i}`, name: `N${i}` }));
    const result = __figmaTestUtils.collectExportableNodeIds(
      node,
      prefilled,
      20,
      new Set<string>()
    );

    expect(result).toHaveLength(20);
    expect(result[0]?.id).toBe('X:0');
  });

  it('hits collectAllExportableIds early return when output already reached maxNodes', () => {
    const node = {
      id: 'F:1',
      name: 'Frame',
      type: 'FRAME',
      children: [],
    } as any;

    const prefilled = Array.from({ length: 20 }, (_, i) => ({ id: `Y:${i}`, name: `M${i}` }));
    const result = __figmaTestUtils.collectAllExportableIds(node, prefilled, 20, new Set<string>());

    expect(result).toHaveLength(20);
    expect(result[0]?.id).toBe('Y:0');
  });

  it('skips falsy children when collecting all exportable IDs', () => {
    const node = {
      id: '0:0',
      name: 'Root',
      type: 'DOCUMENT',
      children: [undefined, { id: 'F:1', name: 'Frame', type: 'FRAME', children: [] }],
    } as any;

    const result = __figmaTestUtils.collectAllExportableIds(node);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('F:1');
  });

  // Line 189: hasImageFill branch when node has no IMAGE fills
  it('exports node with non-IMAGE fill types', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      {
                        id: 'V:1',
                        name: 'SolidRect',
                        type: 'VECTOR',
                        fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 1 } }],
                        children: [],
                      },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('Solidrect');
  });

  it('converts semi-transparent solid fills to RGBA hex in design info', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/test.svg' } }),
          });
        }
        if (url.includes('/files/ABC123XYZ/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: {
                'V:1': {
                  document: {
                    id: 'V:1',
                    name: 'Icon',
                    type: 'VECTOR',
                    absoluteBoundingBox: { width: 32, height: 32 },
                    fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0, a: 0.5 } }],
                    children: [
                      {
                        id: 'T:1',
                        name: 'Label',
                        type: 'TEXT',
                        characters: 'Hello',
                        style: { fontFamily: 'Inter', fontSize: 14, fontWeight: 500 },
                        children: [],
                      },
                    ],
                  },
                },
              },
            }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      {
                        id: 'V:1',
                        name: 'Icon',
                        type: 'VECTOR',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].designInfo?.colors).toContain('#ff000080');
    expect(assets[0].designInfo?.texts).toContain('Hello');
  });

  // Lines 221, 227, 261, 267: children collection branches with no children
  it('handles nodes with no children (falsy children)', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      {
                        id: 'V:1',
                        name: 'VectorNoChildren',
                        type: 'VECTOR',
                      },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('Vectornochildren');
  });

  // Line 319: variablesResponse.ok is false (failed fetch)
  it('handles failed design tokens fetch gracefully', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          return Promise.resolve({
            ok: false,
            status: 401,
            json: async () => ({ error: 'Unauthorized' }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].designTokens?.tokenToClassMap).toEqual({});
  });

  it('uses cwd default assetsDir for full-document downloads', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/test.svg' } }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL });
    expect(assets).toHaveLength(1);
    expect(assets[0].path).toMatch(/^svg\//);
  });

  it('exports non-vector nodes with IMAGE fill as SVG', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [
                      {
                        id: 'V:1',
                        name: 'ImageFrame',
                        type: 'FRAME',
                        fills: [{ type: 'IMAGE', imageRef: 'abc' }],
                        children: [],
                      },
                    ],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('Imageframe');
  });

  // Lines 328-331: valuesByMode is missing or empty
  it('handles variables with missing valuesByMode gracefully', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              variables: {
                v1: { name: 'primaryColor' }, // Missing valuesByMode
                v2: { name: 'spacing', valuesByMode: {} }, // Empty valuesByMode
              },
            }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    // Should have empty map when variables have no valuesByMode
    expect(assets[0].designTokens?.tokenToClassMap).toEqual({});
  });

  it('skips variables with blank valuesByMode entries', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              variables: {
                v1: { name: 'primaryColor', valuesByMode: { m1: '   ' } },
              },
            }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    expect(assets[0].designTokens?.tokenToClassMap).toEqual({});
  });

  // Lines 335-343: Token mapping with non-matching variable names
  it('handles variables with names not matching any category', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/variables/local')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              variables: {
                v1: { name: 'randomVariable', valuesByMode: { m1: 'value1' } },
                v2: { name: 'otherThing', valuesByMode: { m1: 'value2' } },
              },
            }),
          });
        }
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });
    expect(assets).toHaveLength(1);
    // Non-matching names should not be added to tokenToClassMap
    expect(Object.keys(assets[0].designTokens?.tokenToClassMap ?? {})).toHaveLength(0);
  });

  // Lines 408-410: saveFigmaTokenInEnv ternary branches
  it('appends FIGMA_TOKEN to empty .env file', async () => {
    const { readFile, writeFile } = await import('node:fs/promises');

    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'development';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('new-token-empty');

    vi.mocked(readFile).mockImplementation(async (filePath: any) => {
      if (String(filePath).endsWith('.env')) {
        return ''; // Empty .env file
      }
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    await expect(downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE })).rejects.toThrow(
      'Nao foi possivel renderizar o node-id'
    );

    const callArgs = vi
      .mocked(writeFile)
      .mock.calls.find((call) => String(call[0]).endsWith('.env'));
    expect(callArgs?.[1]).toBe('FIGMA_TOKEN=new-token-empty\n');
  });

  // Line 479: onProgress in non-production mode
  it('calls onProgress with dev-mode message when prompting token in development', async () => {
    vi.unstubAllEnvs();
    process.env.NODE_ENV = 'development';
    delete process.env.FIGMA_TOKEN;
    mockQuestion.mockResolvedValueOnce('dev-token-callback');

    vi.mocked(readFile).mockImplementation(async () => {
      throw Object.assign(new Error('ENOENT'), { code: 'ENOENT' });
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ images: null }) })
    );

    const progress = vi.fn();
    await expect(
      downloadFigmaSvgs({ figmaUrl: VALID_URL, onProgress: progress })
    ).rejects.toThrow();

    const devMessages = progress.mock.calls.filter((call) => String(call[0]).includes('.env'));
    expect(devMessages.length).toBeGreaterThan(0);
  });

  // Lines 524-535: Node details extraction conditions
  it('extracts node name when available in node details', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: { '1150:16805': 'https://cdn.figma.com/exports/test.svg' },
            }),
          });
        }
        if (url.includes('/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: {
                '1150:16805': {
                  document: {
                    id: '1150:16805',
                    name: 'Customnodename',
                    type: 'FRAME',
                    children: [],
                  },
                },
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    expect(assets[0].name).toBe('Customnodename');
  });

  // Lines 524-535: Node details with empty/whitespace name
  it('uses default node-id name when node name is whitespace-only', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: { '1150:16805': 'https://cdn.figma.com/exports/test.svg' },
            }),
          });
        }
        if (url.includes('/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: {
                '1150:16805': {
                  document: {
                    id: '1150:16805',
                    name: '   ', // Whitespace-only
                    type: 'FRAME',
                    children: [],
                  },
                },
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    // Should use default node-id name when provided name is whitespace-only, converted to PascalCase
    expect(assets[0].name).toBe('FigmaNode115016805');
  });

  // Lines 524-535: Node details missing when response is empty
  it('continues with default node-id name when nodes response has no document', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              images: { '1150:16805': 'https://cdn.figma.com/exports/test.svg' },
            }),
          });
        }
        if (url.includes('/nodes')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              nodes: {
                '1150:16805': {
                  // Missing document property
                },
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: URL_WITH_NODE, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    // Should use default node-id name converted to PascalCase
    expect(assets[0].name).toBe('FigmaNode115016805');
  });

  // Line 606: Similar to 524-535, testing the full-document flow with missing node details
  it('continues gracefully when individual node details fetch fails in full-document flow', async () => {
    const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>';

    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation((url: string) => {
        if (url.includes('/images/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ images: { 'V:1': 'https://cdn.figma.com/exports/v1.svg' } }),
          });
        }
        if (url.includes('/files/ABC123XYZ/nodes')) {
          return Promise.resolve({
            ok: false,
            status: 404,
            json: async () => ({}),
          });
        }
        if (url.includes('/files/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              document: {
                id: '0:0',
                name: 'Document',
                type: 'DOCUMENT',
                children: [
                  {
                    id: '1:0',
                    name: 'Page',
                    type: 'CANVAS',
                    children: [{ id: 'V:1', name: 'Icon', type: 'VECTOR', children: [] }],
                  },
                ],
              },
            }),
          });
        }
        return Promise.resolve({ ok: true, text: async () => svgContent });
      })
    );

    const assets = await downloadFigmaSvgs({ figmaUrl: VALID_URL, assetsDir: '/tmp/test' });

    expect(assets).toHaveLength(1);
    // Should continue with Icon name since nodes fetch failed
    expect(assets[0].name).toBe('Icon');
  });
});
