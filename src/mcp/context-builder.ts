import { FigmaAsset } from '../integrations/interfaces.js';
import { enrichClassesWithTokens } from './design-system-tokens.js';
import { McpContext, SddData, VueAssetHint } from './interfaces.js';

const toPascalCase = (value: string): string => {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join('');
};

const SVG_LLM_MAX_CHARS = 10000;

const minifySvgForLlm = (svgContent: string): string => {
  return svgContent
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

const getSvgContentForLlm = (svgContent: string): string | undefined => {
  const minified = minifySvgForLlm(svgContent);
  return minified.length <= SVG_LLM_MAX_CHARS ? minified : undefined;
};

const nearest = (value: number, candidates: number[]): number => {
  return candidates.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};

const spacingClass = (prefix: string, value?: number): string | undefined => {
  if (value === undefined || !Number.isFinite(value)) return undefined;
  const scale: Record<number, string> = {
    0: '0',
    2: '0.5',
    4: '1',
    6: '1.5',
    8: '2',
    10: '2.5',
    12: '3',
    14: '3.5',
    16: '4',
    20: '5',
    24: '6',
    28: '7',
    32: '8',
    40: '10',
    48: '12',
    56: '14',
    64: '16',
  };
  const px = nearest(value, Object.keys(scale).map(Number));
  return `${prefix}-${scale[px]}`;
};

const textSizeClass = (fontSize?: number): string | undefined => {
  if (!fontSize || !Number.isFinite(fontSize)) return undefined;
  const map: Record<number, string> = {
    12: 'text-xs',
    14: 'text-sm',
    16: 'text-base',
    18: 'text-lg',
    20: 'text-xl',
    24: 'text-2xl',
    30: 'text-3xl',
    36: 'text-4xl',
  };
  const px = nearest(fontSize, Object.keys(map).map(Number));
  return map[px];
};

const fontWeightClass = (weight?: number): string | undefined => {
  if (!weight || !Number.isFinite(weight)) return undefined;
  if (weight >= 700) return 'font-bold';
  if (weight >= 600) return 'font-semibold';
  if (weight >= 500) return 'font-medium';
  if (weight >= 400) return 'font-normal';
  return 'font-light';
};

const radiusClass = (radius?: number): string | undefined => {
  if (radius === undefined || !Number.isFinite(radius)) return undefined;
  const map: Record<number, string> = {
    0: 'rounded-none',
    2: 'rounded-sm',
    4: 'rounded',
    6: 'rounded-md',
    8: 'rounded-lg',
    12: 'rounded-xl',
    16: 'rounded-2xl',
    24: 'rounded-3xl',
  };
  const px = nearest(radius, Object.keys(map).map(Number));
  return map[px];
};

const toTailwindHints = (asset: FigmaAsset) => {
  const design = asset.designInfo;
  if (!design) return undefined;

  const containerClasses = new Set<string>();
  const typographyClasses = new Set<string>();
  const colorClasses = new Set<string>();
  const notes: string[] = [];

  if (design.layout.mode === 'HORIZONTAL') containerClasses.add('flex flex-row');
  if (design.layout.mode === 'VERTICAL') containerClasses.add('flex flex-col');

  const pad = design.layout.padding;
  if (pad) {
    const px = spacingClass('px', (pad.left + pad.right) / 2);
    const py = spacingClass('py', (pad.top + pad.bottom) / 2);
    if (px) containerClasses.add(px);
    if (py) containerClasses.add(py);
  }

  const gap = spacingClass('gap', design.layout.gap);
  if (gap) containerClasses.add(gap);

  const radius = radiusClass(design.layout.cornerRadius);
  if (radius) containerClasses.add(radius);

  for (const color of design.colors.slice(0, 6)) {
    colorClasses.add(`bg-[${color}]`);
    colorClasses.add(`text-[${color}]`);
    colorClasses.add(`border-[${color}]`);
  }

  for (const typo of design.typography.slice(0, 8)) {
    const size = textSizeClass(typo.fontSize);
    const weight = fontWeightClass(typo.fontWeight);
    if (size) typographyClasses.add(size);
    if (weight) typographyClasses.add(weight);
  }

  const styleRefKeys = Object.keys(design.styleRefs);
  if (styleRefKeys.length > 0) {
    notes.push(`styleRefs figma detectados: ${styleRefKeys.join(', ')}`);
  }

  // Modo precisão máxima: enriquece com tokens de design mapeados
  const containerArray = enrichClassesWithTokens(Array.from(containerClasses), asset.designTokens);
  const colorArray = enrichClassesWithTokens(Array.from(colorClasses), asset.designTokens);

  if (
    asset.designTokens?.tokenToClassMap &&
    Object.keys(asset.designTokens.tokenToClassMap).length > 0
  ) {
    notes.push(
      `design-tokens mapeados: ${Object.keys(asset.designTokens.tokenToClassMap).length} tokens encontrados`
    );
  }

  return {
    containerClasses: containerArray.slice(0, 10),
    typographyClasses: Array.from(typographyClasses),
    colorClasses: colorArray.slice(0, 10),
    notes,
  };
};

/**
 * Extrai um resumo do SVG sem passar os dados brutos de path para a LLM.
 * Mantém: viewBox, dimensoes, fills/strokes, quantidade de elementos.
 * Remove: coordenadas de path (d="..."), dados de texto complexo.
 */
const summarizeSvgContent = (svgContent: string): string => {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const widthMatch = svgContent.match(/\bwidth="([^"]+)"/);
  const heightMatch = svgContent.match(/\bheight="([^"]+)"/);

  const colors = new Set<string>();
  const colorRegex = /(?:fill|stroke)="(none|#[0-9a-fA-F]{3,8}|rgb[^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = colorRegex.exec(svgContent)) !== null) {
    if (m[1] !== 'none') colors.add(m[1]);
  }

  const pathCount = (svgContent.match(/<path/g) ?? []).length;
  const rectCount = (svgContent.match(/<rect/g) ?? []).length;
  const textCount = (svgContent.match(/<text/g) ?? []).length;
  const circleCount = (svgContent.match(/<circle/g) ?? []).length;
  const groupCount = (svgContent.match(/<g[\s>]/g) ?? []).length;

  const parts: string[] = ['[SVG RESUMIDO - use o campo path para referenciar o arquivo]'];
  if (widthMatch?.[1] || heightMatch?.[1])
    parts.push(`dimensoes: ${widthMatch?.[1] ?? '?'} x ${heightMatch?.[1] ?? '?'}`);
  if (viewBoxMatch?.[1]) parts.push(`viewBox: ${viewBoxMatch[1]}`);
  if (colors.size) parts.push(`cores: ${Array.from(colors).join(', ')}`);
  parts.push(
    `elementos: ${pathCount} paths, ${rectCount} rects, ${circleCount} circles, ${textCount} texts, ${groupCount} grupos`
  );

  return parts.join(' | ');
};

const buildContext = (sdd: SddData, assets: FigmaAsset[]): McpContext => {
  const vueAssetHints: VueAssetHint[] = assets.map((asset) => ({
    assetName: asset.name,
    filePath: asset.path,
    suggestedComponent: `${toPascalCase(asset.name)}Icon`,
  }));

  // Equilibra fidelidade e performance: resumo sempre, SVG inline apenas quando couber no limite.
  const assetsForLlm = assets.map((asset) => ({
    name: asset.name,
    path: asset.path,
    designInfo: asset.designInfo,
    svgSummary: asset.content ? summarizeSvgContent(asset.content) : undefined,
    svgContentForLlm: asset.content ? getSvgContentForLlm(asset.content) : undefined,
    tailwindHints: toTailwindHints(asset),
    designTokens: asset.designTokens,
  }));

  return {
    sdd,
    assets: assetsForLlm,
    vueAssetHints,
    metadata: {
      generatedAt: new Date().toISOString(),
      assetsCount: assets.length,
    },
  };
};

export { buildContext };
export type { McpContext, SddData };
