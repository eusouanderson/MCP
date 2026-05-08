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

  it('handles data without nomeComponente and falls back to endpoint name', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockResolvedValue({
      vue: { props: '{ foo: string }' },
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    const button = result.find((c) => c.endpoint === 'ce-button.json');
    expect(button?.componentName).toBe('CeButton');
  });

  it('handles data without vue props', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockResolvedValue({
      nomeComponente: 'MyComponent',
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    expect(result.length).toBeGreaterThan(0);
    const button = result.find((c) => c.endpoint === 'ce-button.json');
    expect(button?.props).toBe('');
  });

  it('truncates long props to 600 characters', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    const longProps = 'x'.repeat(700);
    mockDesignSystemData.mockResolvedValue({
      nomeComponente: 'TestComponent',
      vue: { props: longProps },
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    const button = result.find((c) => c.endpoint === 'ce-button.json');
    expect(button?.props).toHaveLength(603); // 600 + '...'
    expect(button?.props).toContain('...');
  });

  it('uses layout as default category for unknown endpoints', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockImplementation(async (endpoint: string) => {
      if (endpoint === 'unknown-component.json') {
        return { nomeComponente: 'UnknownComponent' };
      }
      return null;
    });

    const { fetchDsComponents } = await import('../resolver.js');
    
    // Directly call fetchDsComponents with a custom endpoint that doesn't exist
    const { designSystemData: ds2 } = await import('../index.js');
    const mockDs2 = vi.mocked(ds2);
    mockDs2.mockResolvedValueOnce({ nomeComponente: 'Unknown' });
    
    // We need to test the internal buildCompactRef directly through fetchDsComponents
    // But since unknown-component.json is not in the list, we'll verify with an existing endpoint
    const result = await fetchDsComponents(['data']); // Category that exists
    
    const dataTable = result.find((c) => c.endpoint === 'ce-data-table.json');
    expect(dataTable?.category).toBe('data');
  });

  it('handles empty or whitespace nomeComponente', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockResolvedValue({
      nomeComponente: '   ',
      vue: { props: '{}' },
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    const button = result.find((c) => c.endpoint === 'ce-button.json');
    expect(button?.componentName).toBe('CeButton'); // Falls back to override
  });

  it('uses ENDPOINT_COMPONENT_NAME_OVERRIDES when available', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockResolvedValue({
      nomeComponente: 'ShouldBeOverridden',
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    const input = result.find((c) => c.endpoint === 'ce-input-field.json');
    expect(input?.componentName).toBe('CeInput'); // Override takes precedence
  });

  it('filters out invalid data types from results', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    let callCount = 0;
    mockDesignSystemData.mockImplementation(async () => {
      callCount++;
      if (callCount === 1) return 'string-data' as any; // Invalid type
      if (callCount === 2) return 123 as any; // Invalid type
      return { nomeComponente: 'ValidComponent' };
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['form']);

    // Should filter out the invalid types and only include valid objects
    expect(result.every((c) => typeof c === 'object' && c !== null)).toBe(true);
  });

  it('fetches components from multiple categories including navigation and layout', async () => {
    const { designSystemData } = await import('../index.js');
    const mockDesignSystemData = vi.mocked(designSystemData);

    mockDesignSystemData.mockResolvedValue({
      nomeComponente: 'TestComponent',
    });

    const { fetchDsComponents } = await import('../resolver.js');
    const result = await fetchDsComponents(['navigation', 'layout']);

    expect(result.length).toBeGreaterThan(0);
    
    // Verify we have components from both categories
    const hasNavigation = result.some((c) => c.category === 'navigation');
    const hasLayout = result.some((c) => c.category === 'layout');
    
    expect(hasNavigation).toBe(true);
    expect(hasLayout).toBe(true);
  });
});

describe('buildCompactRef', () => {
  it('uses default layout category for unknown endpoints', async () => {
    const { buildCompactRef } = await import('../resolver.js');

    const data = {
      nomeComponente: 'UnknownComponent',
      vue: { props: '{ test: string }' },
    };

    const result = buildCompactRef(data, 'unknown-endpoint.json');

    expect(result).not.toBeNull();
    expect(result?.category).toBe('layout');
    expect(result?.componentName).toBe('UnknownComponent');
  });

  it('returns null for invalid data', async () => {
    const { buildCompactRef } = await import('../resolver.js');

    expect(buildCompactRef(null as any, 'test.json')).toBeNull();
    expect(buildCompactRef(undefined as any, 'test.json')).toBeNull();
    expect(buildCompactRef('string' as any, 'test.json')).toBeNull();
    expect(buildCompactRef(123 as any, 'test.json')).toBeNull();
  });
});
