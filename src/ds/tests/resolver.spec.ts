import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../index.js', () => ({
  designSystemData: vi.fn(),
}));

describe('endpointToComponentName', () => {
  it('converts kebab-case endpoint to PascalCase component name', async () => {
    const { endpointToComponentName } = await import('../resolver.js');
    expect(endpointToComponentName('ce-input-field.json')).toBe('CeInput');
    expect(endpointToComponentName('ce-button.json')).toBe('CeButton');
    expect(endpointToComponentName('ce-svg-icon.json')).toBe('CeSvgIcon');
    expect(endpointToComponentName('ce-date-picker.json')).toBe('CeDatePicker');
  });
});

describe('endpointToTagName', () => {
  it('removes .json extension from endpoint', async () => {
    const { endpointToTagName } = await import('../resolver.js');
    expect(endpointToTagName('ce-button.json')).toBe('ce-button');
    expect(endpointToTagName('ce-input-field.json')).toBe('ce-input');
  });
});

describe('extractUsedDsComponents', () => {
  it('detects PascalCase component usage in template', async () => {
    const { extractUsedDsComponents } = await import('../resolver.js');

    const available = [
      {
        componentName: 'CeButton',
        tagName: 'ce-button',
        description: 'Botao',
        props: '',
        category: 'form' as const,
        endpoint: 'ce-button.json',
      },
      {
        componentName: 'CeInput',
        tagName: 'ce-input',
        description: 'Input',
        props: '',
        category: 'form' as const,
        endpoint: 'ce-input-field.json',
      },
    ];

    const template = '<div><CeButton label="Salvar" /><p>Texto</p></div>';
    const used = extractUsedDsComponents(template, available);

    expect(used).toHaveLength(1);
    expect(used[0].componentName).toBe('CeButton');
  });

  it('detects kebab-case component usage in template', async () => {
    const { extractUsedDsComponents } = await import('../resolver.js');

    const available = [
      {
        componentName: 'CeInput',
        tagName: 'ce-input',
        description: 'Input',
        props: '',
        category: 'form' as const,
        endpoint: 'ce-input-field.json',
      },
    ];

    const template = '<form><ce-input label="Nome" /></form>';
    const used = extractUsedDsComponents(template, available);

    expect(used).toHaveLength(1);
    expect(used[0].tagName).toBe('ce-input');
  });

  it('returns empty array when no DS components are used', async () => {
    const { extractUsedDsComponents } = await import('../resolver.js');

    const available = [
      {
        componentName: 'CeButton',
        tagName: 'ce-button',
        description: 'Botao',
        props: '',
        category: 'form' as const,
        endpoint: 'ce-button.json',
      },
    ];

    const template = '<div><button>Click</button></div>';
    const used = extractUsedDsComponents(template, available);

    expect(used).toHaveLength(0);
  });
});

describe('buildScriptSetup', () => {
  it('generates script setup with vue-components import', async () => {
    const { buildScriptSetup } = await import('../resolver.js');

    const components = [
      {
        componentName: 'CeButton',
        tagName: 'ce-button',
        description: 'Botao',
        props: '',
        category: 'form' as const,
        endpoint: 'ce-button.json',
      },
      {
        componentName: 'CeInput',
        tagName: 'ce-input',
        description: 'Input',
        props: '',
        category: 'form' as const,
        endpoint: 'ce-input-field.json',
      },
    ];

    const script = buildScriptSetup(components);

    expect(script).toContain('<script setup lang="ts">');
    expect(script).toContain('@comercti/vue-components');
    expect(script).toContain('CeButton');
    expect(script).toContain('CeInput');
    expect(script).toContain('</script>');
  });

  it('includes icon import comment when CeSvgIcon is used', async () => {
    const { buildScriptSetup } = await import('../resolver.js');

    const components = [
      {
        componentName: 'CeSvgIcon',
        tagName: 'ce-svg-icon',
        description: 'Icone',
        props: '',
        category: 'icon' as const,
        endpoint: 'ce-svg-icon.json',
      },
    ];

    const script = buildScriptSetup(components);

    expect(script).toContain('@comercti/icons-hmg');
    expect(script).not.toContain('import { CeSvgIcon }');
  });

  it('returns empty string when no components are given', async () => {
    const { buildScriptSetup } = await import('../resolver.js');
    expect(buildScriptSetup([])).toBe('');
  });
});

describe('fetchDsComponents', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('fetches and maps DS component data', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockResolvedValue({
      nomeComponente: 'CeButton',
      vue: { props: '{ label?: string }' },
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    expect(result.length).toBeGreaterThan(0);
    const button = result.find((c) => c.endpoint === 'ce-button.json');
    expect(button).toBeDefined();
    expect(button?.componentName).toBe('CeButton');
    expect(button?.category).toBe('form');
  });

  it('filters out null results when fetch fails', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockResolvedValue(null);

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    expect(result).toHaveLength(0);
  });
});
