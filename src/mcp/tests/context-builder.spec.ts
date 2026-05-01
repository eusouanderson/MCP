import { describe, expect, it } from 'vitest';
import { buildContext } from '../context-builder.js';

describe('buildContext', () => {
  it('builds context with sdd, assets and vueAssetHints', () => {
    const sdd = { title: 'My App', version: '1.0.0' };
    const assets = [{ name: 'home', path: 'src/svg/home.svg' }];

    const context = buildContext(sdd, assets);

    expect(context.sdd).toEqual(sdd);
    expect(context.assets).toHaveLength(1);
    expect(context.assets[0].name).toBe('home');
    expect(context.assets[0].path).toBe('src/svg/home.svg');
    expect(context.vueAssetHints).toHaveLength(1);
    expect(context.vueAssetHints[0].assetName).toBe('home');
    expect(context.vueAssetHints[0].filePath).toBe('src/svg/home.svg');
    expect(context.vueAssetHints[0].suggestedComponent).toBe('HomeIcon');
  });

  it('converts hyphenated asset names to PascalCase component', () => {
    const context = buildContext({}, [{ name: 'arrow-left', path: 'src/svg/arrow-left.svg' }]);
    expect(context.vueAssetHints[0].suggestedComponent).toBe('ArrowLeftIcon');
  });

  it('sets correct assetsCount in metadata', () => {
    const context = buildContext({}, [
      { name: 'a', path: 'src/svg/a.svg' },
      { name: 'b', path: 'src/svg/b.svg' },
    ]);
    expect(context.metadata.assetsCount).toBe(2);
  });

  it('sets generatedAt as a valid ISO date string', () => {
    const context = buildContext({}, []);
    expect(context.metadata.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(() => new Date(context.metadata.generatedAt)).not.toThrow();
  });

  it('returns empty vueAssetHints when there are no assets', () => {
    const context = buildContext({ title: 'Empty' }, []);
    expect(context.vueAssetHints).toHaveLength(0);
    expect(context.metadata.assetsCount).toBe(0);
  });

  it('includes svgSummary in assets for LLM context', () => {
    const assets = [{ name: 'test', path: 'test.svg', content: '<svg>test</svg>' }];
    const context = buildContext({}, assets);
    expect(context.assets[0]).toHaveProperty('svgSummary');
  });

  it('includes tailwindHints in assets when designInfo is present', () => {
    const assets = [
      {
        name: 'badge',
        path: 'badge.svg',
        designInfo: {
          texts: ['Hello', 'World'],
          colors: ['#FF0000', '#00FF00', '#0000FF', '#111111', '#222222', '#333333', '#444444'],
          layout: {
            mode: 'HORIZONTAL',
            gap: 11,
            cornerRadius: 5,
            padding: { left: 10, right: 10, top: 9, bottom: 9 },
          },
          styleRefs: { fill: 'S:1', text: 'S:2' },
          typography: [
            { text: 'A', fontSize: 13, fontWeight: 750 },
            { text: 'B', fontSize: 18, fontWeight: 620 },
            { text: 'C', fontSize: 30, fontWeight: 550 },
            { text: 'D', fontSize: 36, fontWeight: 450 },
            { text: 'E', fontSize: 37, fontWeight: 300 },
          ],
        },
        designTokens: {
          variables: [],
          styles: [],
          tokenToClassMap: {
            primary: 'bg-[#123456]',
            duplicateGap: 'gap-2.5',
          },
        },
      },
    ];

    const context = buildContext({}, assets);
    const hints = context.assets[0].tailwindHints;

    expect(hints).toBeDefined();
    expect(hints?.containerClasses).toContain('flex flex-row');
    expect(hints?.containerClasses).toContain('px-2.5');
    expect(hints?.containerClasses).toContain('py-2');
    expect(hints?.containerClasses).toContain('gap-2.5');
    expect(hints?.containerClasses).toContain('rounded');
    expect(hints?.containerClasses).toContain('bg-[#123456]');
    expect(hints?.typographyClasses).toContain('text-xs');
    expect(hints?.typographyClasses).toContain('text-lg');
    expect(hints?.typographyClasses).toContain('text-3xl');
    expect(hints?.typographyClasses).toContain('text-4xl');
    expect(hints?.typographyClasses).toContain('font-bold');
    expect(hints?.typographyClasses).toContain('font-semibold');
    expect(hints?.typographyClasses).toContain('font-medium');
    expect(hints?.typographyClasses).toContain('font-normal');
    expect(hints?.typographyClasses).toContain('font-light');
    expect(hints?.notes).toContain('styleRefs figma detectados: fill, text');
    expect(hints?.notes).toContain('design-tokens mapeados: 2 tokens encontrados');
    expect(hints?.colorClasses.length).toBe(10);
  });

  it('includes designTokens in assets when present', () => {
    const assets = [
      {
        name: 'test',
        path: 'test.svg',
        designTokens: {
          variables: [],
          styles: [],
          tokenToClassMap: { primary: 'bg-blue-500' },
        },
      },
    ];
    const context = buildContext({}, assets);
    expect(context.assets[0]).toHaveProperty('designTokens');
  });

  it('returns undefined tailwindHints when designInfo is missing', () => {
    const context = buildContext({}, [{ name: 'plain', path: 'plain.svg' }]);
    expect(context.assets[0].tailwindHints).toBeUndefined();
  });

  it('handles vertical layout and undefined helper values', () => {
    const context = buildContext({}, [
      {
        name: 'stack',
        path: 'stack.svg',
        designInfo: {
          texts: ['Only'],
          colors: ['#ABABAB'],
          layout: { mode: 'VERTICAL', gap: undefined, cornerRadius: undefined },
          styleRefs: {},
          typography: [{ text: 'Only', fontSize: 0, fontWeight: 0 }],
        },
      },
    ]);

    const hints = context.assets[0].tailwindHints;
    expect(hints).toBeDefined();
    expect(hints?.containerClasses).toEqual(['flex flex-col']);
    expect(hints?.typographyClasses).toEqual([]);
    expect(hints?.notes).toEqual([]);
  });

  it('ignores invalid numeric values for spacing and radius', () => {
    const context = buildContext({}, [
      {
        name: 'invalid-layout',
        path: 'invalid-layout.svg',
        designInfo: {
          texts: ['Only'],
          colors: ['#ABABAB'],
          layout: {
            mode: 'HORIZONTAL',
            gap: Number.NaN,
            cornerRadius: Number.NaN,
            padding: {
              left: Number.NaN,
              right: Number.NaN,
              top: Number.NaN,
              bottom: Number.NaN,
            },
          },
          styleRefs: {},
          typography: [{ text: 'Only', fontSize: Number.NaN, fontWeight: Number.NaN }],
        },
      },
    ]);

    const hints = context.assets[0].tailwindHints;
    expect(hints).toBeDefined();
    expect(hints?.containerClasses).toEqual(['flex flex-row']);
    expect(hints?.typographyClasses).toEqual([]);
  });

  it('summarizes SVG dimensions, viewBox, colors and element counts', () => {
    const svg =
      '<svg width="24" height="16" viewBox="0 0 24 16">' +
      '<g><rect width="24" height="16" fill="#123456"/>' +
      '<path d="M0 0" stroke="#abcdef"/>' +
      '<circle cx="8" cy="8" r="2" fill="none"/>' +
      '<text fill="rgb(255,0,0)">Hi</text></g></svg>';

    const context = buildContext({}, [{ name: 'icon', path: 'icon.svg', content: svg }]);
    const summary = context.assets[0].svgSummary;

    expect(summary).toContain('dimensoes: 24 x 16');
    expect(summary).toContain('viewBox: 0 0 24 16');
    expect(summary).toContain('cores: #123456, #abcdef, rgb(255,0,0)');
    expect(summary).toContain('elementos: 1 paths, 1 rects, 1 circles, 1 texts, 1 grupos');
  });

  it('omits dimensions and ignores none in SVG color summary', () => {
    const svg =
      '<svg viewBox="0 0 10 10">' +
      '<path d="M0 0" fill="none" stroke="none"/>' +
      '<path d="M1 1" fill="#ABCDEF"/>' +
      '</svg>';

    const context = buildContext({}, [{ name: 'minimal', path: 'minimal.svg', content: svg }]);
    const summary = context.assets[0].svgSummary;

    expect(summary).not.toContain('dimensoes:');
    expect(summary).toContain('viewBox: 0 0 10 10');
    expect(summary).toContain('cores: #ABCDEF');
    expect(summary).not.toContain('none');
  });

  it('uses fallback dimension marker when only one SVG dimension exists', () => {
    const svg = '<svg height="10"><path d="M0 0" fill="#123123"/></svg>';
    const context = buildContext({}, [
      { name: 'height-only', path: 'height-only.svg', content: svg },
    ]);
    const summary = context.assets[0].svgSummary;

    expect(summary).toContain('dimensoes: ? x 10');
  });

  it('uses fallback marker for missing height when only width exists', () => {
    const svg = '<svg width="10"><path d="M0 0" fill="#123123"/></svg>';
    const context = buildContext({}, [
      { name: 'width-only', path: 'width-only.svg', content: svg },
    ]);
    const summary = context.assets[0].svgSummary;

    expect(summary).toContain('dimensoes: 10 x ?');
  });

  it('omits svgContentForLlm when minified SVG is above max size', () => {
    const hugePath = 'M0 0 '.repeat(2500);
    const hugeSvg = `<svg><path d="${hugePath}"/></svg>`;
    const context = buildContext({}, [{ name: 'huge', path: 'huge.svg', content: hugeSvg }]);

    expect(context.assets[0].svgSummary).toBeDefined();
    expect(context.assets[0].svgContentForLlm).toBeUndefined();
  });
});
