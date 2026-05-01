import type { FigmaDesignTokens } from '../integrations/interfaces.js';

/**
 * Resolve um token Figma para uma classe Tailwind ou CSS variable
 * com "modo precisão máxima" - usando mapeamento determinístico
 */
const resolveTokenToClass = (
  tokenId: string,
  tokenMap: Record<string, string> | undefined
): string | undefined => {
  if (!tokenMap || !tokenId) {
    return undefined;
  }

  return tokenMap[tokenId];
};

/**
 * Converte valor de token para classe Tailwind aplicável
 * Tenta converter valores numéricos/hex para escala Tailwind
 */
const valueToTailwindClass = (tokenName: string, value: string | number): string | undefined => {
  const strValue = String(value).toLowerCase();

  // Color tokens
  if (
    tokenName.includes('color') ||
    tokenName.includes('Color') ||
    tokenName.includes('bg') ||
    tokenName.includes('background')
  ) {
    if (typeof value === 'string' && value.startsWith('#')) {
      return `bg-[${value}]`;
    }
    return undefined;
  }

  // Spacing tokens
  if (
    tokenName.includes('spacing') ||
    tokenName.includes('Spacing') ||
    tokenName.includes('margin') ||
    tokenName.includes('padding') ||
    tokenName.includes('gap')
  ) {
    const numValue = parseFloat(String(value));
    if (!isNaN(numValue)) {
      return `p-${Math.round(numValue / 4)}`; // TailwindCSS usa rem, ~4px per unit
    }
    return undefined;
  }

  // Border radius
  if (
    tokenName.includes('radius') ||
    tokenName.includes('Radius') ||
    tokenName.includes('rounded')
  ) {
    if (strValue.includes('none') || strValue === '0') {
      return 'rounded-none';
    }
    if (strValue.includes('small') || strValue.includes('sm')) {
      return 'rounded-sm';
    }
    if (strValue.includes('medium') || strValue.includes('md')) {
      return 'rounded-md';
    }
    if (strValue.includes('large') || strValue.includes('lg')) {
      return 'rounded-lg';
    }
    const numValue = parseFloat(String(value));
    if (!isNaN(numValue)) {
      if (numValue <= 2) return 'rounded-sm';
      if (numValue <= 6) return 'rounded-md';
      if (numValue <= 12) return 'rounded-lg';
      return 'rounded-full';
    }
    return undefined;
  }

  // Typography/Font size
  if (tokenName.includes('size') || tokenName.includes('Size') || tokenName.includes('font')) {
    const numValue = parseFloat(String(value));
    if (!isNaN(numValue)) {
      if (numValue <= 12) return 'text-xs';
      if (numValue <= 14) return 'text-sm';
      if (numValue <= 16) return 'text-base';
      if (numValue <= 18) return 'text-lg';
      if (numValue <= 20) return 'text-xl';
      if (numValue <= 24) return 'text-2xl';
      if (numValue <= 32) return 'text-3xl';
      return 'text-4xl';
    }
    return undefined;
  }

  return undefined;
};

/**
 * Enriquece a lista de classes Tailwind com mapeamentos de token
 * para "modo precisão máxima"
 */
const enrichClassesWithTokens = (
  baseClasses: string[],
  designTokens: FigmaDesignTokens | undefined
): string[] => {
  if (!designTokens || !designTokens.tokenToClassMap) {
    return baseClasses;
  }

  const enriched = [...baseClasses];
  const tokenClasses = Object.values(designTokens.tokenToClassMap).filter(Boolean);

  // Adiciona classes de tokens sem duplicar
  for (const tokenClass of tokenClasses) {
    if (!enriched.includes(tokenClass)) {
      enriched.push(tokenClass);
    }
  }

  return enriched.slice(0, 12); // Limita para não sobrecarregar
};

export { enrichClassesWithTokens, resolveTokenToClass, valueToTailwindClass };
