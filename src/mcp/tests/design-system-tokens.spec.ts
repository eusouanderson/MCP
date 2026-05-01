import { describe, expect, it } from 'vitest';
import type { FigmaDesignTokens } from '../../integrations/interfaces.js';
import {
  enrichClassesWithTokens,
  resolveTokenToClass,
  valueToTailwindClass,
} from '../design-system-tokens.js';

describe('design-system-tokens', () => {
  describe('resolveTokenToClass', () => {
    it('returns undefined when tokenMap is undefined', () => {
      const result = resolveTokenToClass('some-token', undefined);
      expect(result).toBeUndefined();
    });

    it('returns undefined when tokenId is empty', () => {
      const tokenMap = { primary: 'bg-blue-500' };
      const result = resolveTokenToClass('', tokenMap);
      expect(result).toBeUndefined();
    });

    it('returns the mapped class when token exists', () => {
      const tokenMap = { 'primary-color': 'bg-[#004415]' };
      const result = resolveTokenToClass('primary-color', tokenMap);
      expect(result).toBe('bg-[#004415]');
    });

    it('returns undefined when token does not exist in map', () => {
      const tokenMap = { primary: 'bg-blue-500' };
      const result = resolveTokenToClass('secondary', tokenMap);
      expect(result).toBeUndefined();
    });
  });

  describe('valueToTailwindClass', () => {
    describe('color tokens', () => {
      it('converts color token with hex value', () => {
        const result = valueToTailwindClass('primary-color', '#FF0000');
        expect(result).toBe('bg-[#FF0000]');
      });

      it('returns undefined for color token without hex prefix', () => {
        const result = valueToTailwindClass('bg-primary', 'red');
        expect(result).toBeUndefined();
      });

      it('recognizes color in token name (Color variant)', () => {
        const result = valueToTailwindClass('ButtonColor', '#00FF00');
        expect(result).toBe('bg-[#00FF00]');
      });

      it('recognizes background in token name', () => {
        const result = valueToTailwindClass('background-color', '#0000FF');
        expect(result).toBe('bg-[#0000FF]');
      });
    });

    describe('spacing tokens', () => {
      it('converts spacing token with numeric value', () => {
        const result = valueToTailwindClass('spacing-md', 16);
        expect(result).toBe('p-4');
      });

      it('converts padding token', () => {
        const result = valueToTailwindClass('padding-large', '32');
        expect(result).toBe('p-8');
      });

      it('converts margin token', () => {
        const result = valueToTailwindClass('margin-small', 8);
        expect(result).toBe('p-2');
      });

      it('converts gap token', () => {
        const result = valueToTailwindClass('gap-base', '12');
        expect(result).toBe('p-3');
      });

      it('returns undefined for spacing token with non-numeric value', () => {
        const result = valueToTailwindClass('spacing-default', 'auto');
        expect(result).toBeUndefined();
      });
    });

    describe('radius tokens', () => {
      it('converts radius-none to rounded-none', () => {
        const result = valueToTailwindClass('border-radius', 'none');
        expect(result).toBe('rounded-none');
      });

      it('converts radius value 0 to rounded-none', () => {
        const result = valueToTailwindClass('corner-radius', '0');
        expect(result).toBe('rounded-none');
      });

      it('converts radius-sm to rounded-sm', () => {
        const result = valueToTailwindClass('rounded-size', 'small');
        expect(result).toBe('rounded-sm');
      });

      it('converts radius-md to rounded-md', () => {
        const result = valueToTailwindClass('radius-medium', 'medium');
        expect(result).toBe('rounded-md');
      });

      it('converts radius-lg to rounded-lg', () => {
        const result = valueToTailwindClass('corner-radius', 'large');
        expect(result).toBe('rounded-lg');
      });

      it('converts numeric radius values appropriately', () => {
        expect(valueToTailwindClass('radius', 2)).toBe('rounded-sm');
        expect(valueToTailwindClass('radius', 6)).toBe('rounded-md');
        expect(valueToTailwindClass('radius', 12)).toBe('rounded-lg');
        expect(valueToTailwindClass('radius', 24)).toBe('rounded-full');
      });
    });

    describe('typography/size tokens', () => {
      it('converts font size 10 to text-xs', () => {
        const result = valueToTailwindClass('font-size-small', 10);
        expect(result).toBe('text-xs');
      });

      it('converts font size 14 to text-sm', () => {
        const result = valueToTailwindClass('fontSize-base', 14);
        expect(result).toBe('text-sm');
      });

      it('converts font size 16 to text-base', () => {
        const result = valueToTailwindClass('size-default', 16);
        expect(result).toBe('text-base');
      });

      it('converts font size 18 to text-lg', () => {
        const result = valueToTailwindClass('font-size-lg', 18);
        expect(result).toBe('text-lg');
      });

      it('converts font size 20 to text-xl', () => {
        const result = valueToTailwindClass('heading-size', 20);
        expect(result).toBe('text-xl');
      });

      it('converts font size 24 to text-2xl', () => {
        const result = valueToTailwindClass('title-size', 24);
        expect(result).toBe('text-2xl');
      });

      it('converts font size 32 to text-3xl', () => {
        const result = valueToTailwindClass('display-size', 32);
        expect(result).toBe('text-3xl');
      });

      it('converts font size 40+ to text-4xl', () => {
        const result = valueToTailwindClass('huge-size', 48);
        expect(result).toBe('text-4xl');
      });
    });

    it('returns undefined for unrecognized token type', () => {
      const result = valueToTailwindClass('unknown-token', 'value');
      expect(result).toBeUndefined();
    });
  });

  describe('enrichClassesWithTokens', () => {
    it('returns base classes when designTokens is undefined', () => {
      const baseClasses = ['flex', 'gap-4'];
      const result = enrichClassesWithTokens(baseClasses, undefined);
      expect(result).toEqual(baseClasses);
    });

    it('returns base classes when tokenToClassMap is undefined', () => {
      const baseClasses = ['flex', 'gap-4'];
      const tokens: FigmaDesignTokens = {
        variables: [],
        styles: [],
        tokenToClassMap: undefined as any,
      };
      const result = enrichClassesWithTokens(baseClasses, tokens);
      expect(result).toEqual(baseClasses);
    });

    it('returns base classes when tokenToClassMap is empty', () => {
      const baseClasses = ['flex', 'gap-4'];
      const tokens: FigmaDesignTokens = { variables: [], styles: [], tokenToClassMap: {} };
      const result = enrichClassesWithTokens(baseClasses, tokens);
      expect(result).toEqual(baseClasses);
    });

    it('adds token classes to base classes without duplicates', () => {
      const baseClasses = ['flex', 'gap-4'];
      const tokens: FigmaDesignTokens = {
        variables: [],
        styles: [],
        tokenToClassMap: { primary: 'bg-[#004415]', secondary: 'text-white' },
      };
      const result = enrichClassesWithTokens(baseClasses, tokens);
      expect(result).toContain('flex');
      expect(result).toContain('gap-4');
      expect(result).toContain('bg-[#004415]');
      expect(result).toContain('text-white');
      expect(result.length).toBe(4);
    });

    it('avoids adding duplicate classes', () => {
      const baseClasses = ['flex', 'bg-[#004415]'];
      const tokens: FigmaDesignTokens = {
        variables: [],
        styles: [],
        tokenToClassMap: { primary: 'bg-[#004415]' },
      };
      const result = enrichClassesWithTokens(baseClasses, tokens);
      expect(result).toEqual(['flex', 'bg-[#004415]']);
    });

    it('limits result to maximum 12 classes', () => {
      const baseClasses = ['flex', 'gap-4', 'p-4', 'rounded-md'];
      const tokens: FigmaDesignTokens = {
        variables: [],
        styles: [],
        tokenToClassMap: {
          token1: 'class1',
          token2: 'class2',
          token3: 'class3',
          token4: 'class4',
          token5: 'class5',
          token6: 'class6',
          token7: 'class7',
          token8: 'class8',
          token9: 'class9',
          token10: 'class10',
        },
      };
      const result = enrichClassesWithTokens(baseClasses, tokens);
      expect(result.length).toBeLessThanOrEqual(12);
    });

    it('filters out falsy token class values', () => {
      const baseClasses = ['flex'];
      const tokens: FigmaDesignTokens = {
        variables: [],
        styles: [],
        tokenToClassMap: { valid: 'bg-blue', empty: '', null: null as any },
      };
      const result = enrichClassesWithTokens(baseClasses, tokens);
      expect(result).toContain('bg-blue');
      expect(result).not.toContain('');
      expect(result).not.toContain(null);
    });
  });
});

it('returns undefined for typography token with invalid string value', () => {
  const result = valueToTailwindClass('font-weight', 'bold');
  expect(result).toBeUndefined();
});

it('returns undefined for radius token with invalid string value', () => {
  const result = valueToTailwindClass('border-radius', 'invalid');
  expect(result).toBeUndefined();
});

it('returns undefined for numeric value in unrecognized token type', () => {
  const result = valueToTailwindClass('unknown-token-type', 999);
  expect(result).toBeUndefined();
});

it('converts font size 22 to text-2xl (between 20 and 24)', () => {
  const result = valueToTailwindClass('font-size-22', 22);
  expect(result).toBe('text-2xl');
});
