import { designSystemData } from './index.js';
import { DsComponentCategory, DsComponentRef } from './interfaces.js';

const ENDPOINT_CATEGORIES: Record<string, DsComponentCategory> = {
  'ce-input-field.json': 'form',
  'ce-button.json': 'form',
  'ce-button-groups.json': 'form',
  'ce-select-field.json': 'form',
  'ce-textarea.json': 'form',
  'ce-checkbox-field.json': 'form',
  'ce-checkbox-group.json': 'form',
  'ce-date-picker.json': 'form',
  'ce-toggle.json': 'form',
  'ce-slider.json': 'form',
  'ce-file-upload.json': 'form',
  'ce-code-input.json': 'form',
  'ce-group-radio-field.json': 'form',
  'ce-autocomplete.json': 'form',
  'ce-dropdown.json': 'form',
  'ce-filter-group.json': 'form',
  'ce-svg-icon.json': 'icon',
  'ce-badge.json': 'feedback',
  'ce-banner.json': 'feedback',
  'ce-loading.json': 'feedback',
  'ce-modal.json': 'feedback',
  'ce-tooltip.json': 'feedback',
  'ce-toast.json': 'feedback',
  'ce-avatar.json': 'feedback',
  'ce-progress-indicator.json': 'feedback',
  'ce-progress-steps.json': 'feedback',
  'ce-pagination.json': 'navigation',
  'ce-tabs.json': 'navigation',
  'ce-tab-item.json': 'navigation',
  'ce-breadcrumbs.json': 'navigation',
  'ce-menu-header.json': 'navigation',
  'ce-menu-sidebar.json': 'navigation',
  'ce-card.json': 'layout',
  'ce-card-header.json': 'layout',
  'ce-card-text.json': 'layout',
  'ce-container.json': 'layout',
  'ce-row.json': 'layout',
  'ce-col.json': 'layout',
  'ce-collapse.json': 'layout',
  'ce-content-dividers.json': 'layout',
  'ce-footer.json': 'layout',
  'ce-layout.json': 'layout',
  'ce-section-footer.json': 'layout',
  'ce-truncated.json': 'layout',
  'ce-data-table.json': 'data',
  'ce-items-per-page.json': 'data',
};

const ENDPOINT_COMPONENT_NAME_OVERRIDES: Record<string, string> = {
  'ce-input-field.json': 'CeInput',
  'ce-select-field.json': 'CeSelect',
  'ce-checkbox-field.json': 'CeCheckbox',
  'ce-group-radio-field.json': 'CeGroupRadio',
};

const ENDPOINT_TAG_NAME_OVERRIDES: Record<string, string> = {
  'ce-input-field.json': 'ce-input',
  'ce-select-field.json': 'ce-select',
  'ce-checkbox-field.json': 'ce-checkbox',
  'ce-group-radio-field.json': 'ce-group-radio',
};

const endpointToTagName = (endpoint: string): string => {
  const overrideTag = ENDPOINT_TAG_NAME_OVERRIDES[endpoint];
  if (overrideTag) {
    return overrideTag;
  }

  return endpoint.replace('.json', '');
};

const endpointToComponentName = (endpoint: string): string => {
  const overrideName = ENDPOINT_COMPONENT_NAME_OVERRIDES[endpoint];
  if (overrideName) {
    return overrideName;
  }

  return endpoint
    .replace('.json', '')
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
};

const MAX_PROPS_CHARS = 600;

const buildCompactRef = (
  data: Record<string, unknown>,
  endpoint: string
): DsComponentRef | null => {
  if (!data || typeof data !== 'object') return null;

  const rawComponentName = (data.nomeComponente as string | undefined)?.trim();
  const componentName =
    ENDPOINT_COMPONENT_NAME_OVERRIDES[endpoint] ||
    rawComponentName ||
    endpointToComponentName(endpoint);
  const vueData = data.vue as { props?: string } | undefined;
  const rawProps = vueData?.props ?? '';
  const props =
    rawProps.length > MAX_PROPS_CHARS ? rawProps.slice(0, MAX_PROPS_CHARS) + '...' : rawProps;
  const category = ENDPOINT_CATEGORIES[endpoint] ?? 'layout';

  return {
    componentName,
    tagName: endpointToTagName(endpoint),
    description: `Componente ${componentName} do design system`,
    props,
    category,
    endpoint,
  };
};

const fetchDsComponents = async (
  categories: DsComponentCategory[] = ['form', 'icon']
): Promise<DsComponentRef[]> => {
  const endpointsToFetch = Object.entries(ENDPOINT_CATEGORIES)
    .filter(([, cat]) => categories.includes(cat))
    .map(([ep]) => ep);

  const results = await Promise.all(
    endpointsToFetch.map(async (endpoint) => {
      const data = await designSystemData(endpoint);
      if (!data) return null;
      return buildCompactRef(data as Record<string, unknown>, endpoint);
    })
  );

  return results.filter((ref): ref is DsComponentRef => ref !== null);
};

/**
 * Extracts the PascalCase component names used in a Vue template string.
 * Matches both <CeButton> and <ce-button> usages.
 */
const extractUsedDsComponents = (
  template: string,
  available: DsComponentRef[]
): DsComponentRef[] => {
  return available.filter((ref) => {
    const pascalPattern = new RegExp(`<${ref.componentName}[\\s/>]`, 'i');
    const kebabPattern = new RegExp(`<${ref.tagName}[\\s/>]`, 'i');
    return pascalPattern.test(template) || kebabPattern.test(template);
  });
};

/**
 * Generates the <script setup> block with the correct DS imports.
 * Icons import is included only as a placeholder when CeSvgIcon is used.
 */
const buildScriptSetup = (usedComponents: DsComponentRef[]): string => {
  if (usedComponents.length === 0) return '';

  const nonIconComponents = usedComponents
    .filter((c) => c.category !== 'icon')
    .map((c) => c.componentName);

  const hasIcon = usedComponents.some((c) => c.category === 'icon');

  const lines: string[] = ['<script setup lang="ts">'];

  if (nonIconComponents.length > 0) {
    lines.push(`import { ${nonIconComponents.join(', ')} } from '@comercti/vue-components'`);
  }

  if (hasIcon) {
    lines.push(
      `// TODO: importe os icones necessarios de '@comercti/icons-hmg'`,
      `// Exemplo: import { pen2, edit01, check, clock } from '@comercti/icons-hmg'`
    );
  }

  lines.push('</script>');

  return lines.join('\n');
};

export {
  buildScriptSetup,
  endpointToComponentName,
  endpointToTagName,
  extractUsedDsComponents,
  fetchDsComponents
};
export type { DsComponentCategory, DsComponentRef };

