type FigmaColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

type FigmaFill = {
  type?: string;
  imageRef?: string;
  color?: FigmaColor;
};

type FigmaTypeStyle = {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeightPx?: number;
  textAlignHorizontal?: string;
};

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  characters?: string;
  style?: FigmaTypeStyle;
  fills?: FigmaFill[];
  strokes?: FigmaFill[];
  layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE';
  primaryAxisAlignItems?: string;
  counterAxisAlignItems?: string;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  itemSpacing?: number;
  cornerRadius?: number;
  absoluteBoundingBox?: { width: number; height: number; x: number; y: number };
  styles?: Record<string, string>;
  children?: FigmaNode[];
};

type FigmaFileResponse = {
  document?: FigmaNode;
};

type FigmaImagesResponse = {
  images?: Record<string, string | null>;
};

type FigmaDesignInfo = {
  texts: string[];
  colors: string[];
  styleRefs: Record<string, string[]>;
  layout: {
    mode?: string;
    padding?: { top: number; bottom: number; left: number; right: number };
    gap?: number;
    width?: number;
    height?: number;
    cornerRadius?: number;
    primaryAxisAlign?: string;
    counterAxisAlign?: string;
  };
  typography: Array<{
    text: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
  }>;
};

type FigmaTailwindHints = {
  containerClasses: string[];
  typographyClasses: string[];
  colorClasses: string[];
  notes: string[];
};

type FigmaVariable = {
  id: string;
  name: string;
  valuesByMode: Record<string, string | number>;
  resolvedType: string;
};

type FigmaStyle = {
  id: string;
  name: string;
  styleType: string;
  description?: string;
};

type FigmaDesignTokens = {
  variables: FigmaVariable[];
  styles: FigmaStyle[];
  tokenToClassMap: Record<string, string>;
};

type FigmaAsset = {
  name: string;
  path: string;
  content?: string;
  designInfo?: FigmaDesignInfo;
  svgSummary?: string;
  svgContentForLlm?: string;
  tailwindHints?: FigmaTailwindHints;
  designTokens?: FigmaDesignTokens;
};

type DownloadFigmaSvgsOptions = {
  figmaUrl: string;
  assetsDir?: string;
  onProgress?: (message: string) => void;
};

export type {
  DownloadFigmaSvgsOptions,
  FigmaAsset,
  FigmaColor,
  FigmaDesignInfo,
  FigmaDesignTokens,
  FigmaFileResponse,
  FigmaFill,
  FigmaImagesResponse,
  FigmaNode,
  FigmaStyle,
  FigmaTailwindHints,
  FigmaTypeStyle,
  FigmaVariable,
};
