import { mkdir, readFile, writeFile } from 'node:fs/promises';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

import path from 'node:path';
import {
    DownloadFigmaSvgsOptions,
    FigmaAsset,
    FigmaDesignInfo,
    FigmaDesignTokens,
    FigmaFileResponse,
    FigmaImagesResponse,
    FigmaNode,
} from './interfaces.js';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const SVG_DIR_NAME = 'svg';
const RUNTIME_SECRETS_PATH = path.resolve(
  process.env.HOME || process.cwd(),
  '.mcp-frontend',
  'secrets.json'
);

const FIGMA_URL_REGEX = /figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/;

type FigmaNodeDetailsResponse = {
  nodes?: Record<
    string,
    {
      document?: FigmaNode;
    }
  >;
};

const normalizeNodeId = (value: string): string => {
  return decodeURIComponent(value).replace(/-/g, ':').trim();
};

const parseFigmaUrl = (figmaUrl: string): { fileKey: string; nodeId?: string } => {
  const trimmedUrl = figmaUrl.trim();

  try {
    const parsedUrl = new URL(trimmedUrl);
    const fileKeyMatch = parsedUrl.pathname.match(/\/(?:file|design)\/([a-zA-Z0-9]+)/);
    const fileKey = fileKeyMatch?.[1];

    if (!fileKey) {
      throw new Error('FILE_KEY nao encontrado no link do Figma.');
    }

    const rawNodeId = parsedUrl.searchParams.get('node-id') ?? undefined;
    const nodeId = rawNodeId ? normalizeNodeId(rawNodeId) : undefined;

    return { fileKey, nodeId };
  } catch {
    const fallbackMatch = trimmedUrl.match(FIGMA_URL_REGEX);
    if (!fallbackMatch) {
      throw new Error(
        'URL do Figma invalida. Use um link no formato https://figma.com/design/FILE_KEY?node-id=...'
      );
    }

    return { fileKey: fallbackMatch[1] };
  }
};

const normalizeFileName = (value: string): string => {
  const normalized = value
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();

  return normalized || 'asset';
};

const rgbaToHex = (r: number, g: number, b: number, a: number): string => {
  const toHex = (v: number) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
};

const extractDesignInfo = (node: FigmaNode): FigmaDesignInfo => {
  const texts: string[] = [];
  const colorsSet = new Set<string>();
  const typography: FigmaDesignInfo['typography'] = [];
  const styleRefsMap = new Map<string, Set<string>>();

  const walk = (n: FigmaNode) => {
    if (n.type === 'TEXT' && n.characters) {
      const text = n.characters.trim();
      if (text) {
        texts.push(text);
        if (n.style) {
          typography.push({
            text,
            fontFamily: n.style.fontFamily,
            fontSize: n.style.fontSize,
            fontWeight: n.style.fontWeight,
          });
        }
      }
    }

    for (const fill of n.fills ?? []) {
      if (fill.color && fill.type === 'SOLID') {
        colorsSet.add(rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a));
      }
    }

    if (n.styles) {
      for (const [styleType, styleId] of Object.entries(n.styles)) {
        if (!styleRefsMap.has(styleType)) {
          styleRefsMap.set(styleType, new Set<string>());
        }
        styleRefsMap.get(styleType)?.add(styleId);
      }
    }

    for (const child of n.children ?? []) {
      walk(child);
    }
  };

  walk(node);

  const box = node.absoluteBoundingBox;
  const styleRefs: Record<string, string[]> = {};
  for (const [key, set] of styleRefsMap.entries()) {
    styleRefs[key] = Array.from(set);
  }

  return {
    texts,
    colors: Array.from(colorsSet),
    styleRefs,
    typography,
    layout: {
      mode: node.layoutMode !== 'NONE' ? node.layoutMode : undefined,
      padding:
        node.paddingTop !== undefined
          ? {
              top: node.paddingTop ?? 0,
              bottom: node.paddingBottom ?? 0,
              left: node.paddingLeft ?? 0,
              right: node.paddingRight ?? 0,
            }
          : undefined,
      gap: node.itemSpacing,
      width: box?.width,
      height: box?.height,
      cornerRadius: node.cornerRadius,
      primaryAxisAlign: node.primaryAxisAlignItems,
      counterAxisAlign: node.counterAxisAlignItems,
    },
  };
};

const toVueComponentName = (rawName: string): string => {
  return rawName
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1).toLowerCase())
    .join('');
};

const shouldExportAsSvg = (node: FigmaNode): boolean => {
  const vectorNodeTypes = new Set([
    'VECTOR',
    'BOOLEAN_OPERATION',
    'STAR',
    'ELLIPSE',
    'POLYGON',
    'LINE',
    'RECTANGLE',
    'COMPONENT',
    'INSTANCE',
  ]);

  if (vectorNodeTypes.has(node.type)) {
    return true;
  }

  const hasImageFill = (node.fills ?? []).some((fill) => fill.type === 'IMAGE' && !!fill.imageRef);
  return hasImageFill;
};

// Coleta IDs de nodes que podem ser exportados como SVG
const collectExportableNodeIds = (
  node: FigmaNode,
  output: Array<{ id: string; name: string }> = [],
  maxNodes = 20,
  visited = new Set<string>(),
  depth = 0
): Array<{ id: string; name: string }> => {
  // Evita duplicatas e loop infinito
  if (visited.has(node.id)) {
    return output;
  }
  visited.add(node.id);

  if (output.length >= maxNodes) {
    return output;
  }

  // Tenta exportar este node se passar nos critérios
  if (shouldExportAsSvg(node)) {
    output.push({ id: node.id, name: node.name });
  }

  if (output.length >= maxNodes) {
    return output;
  }

  // Se não encontrou nada ainda e temos filhos, percorre mais profundamente
  if (node.children && Array.isArray(node.children)) {
    for (let i = 0; i < Math.min(node.children.length, 15); i++) {
      if (output.length >= maxNodes) {
        break;
      }
      const child = node.children[i];
      if (child) {
        collectExportableNodeIds(child, output, maxNodes, visited, depth + 1);
      }
    }
  }

  return output;
};

// Se a coleta normal não encontrou nada, coleta qualquer node visível
const collectAllExportableIds = (
  node: FigmaNode,
  output: Array<{ id: string; name: string }> = [],
  maxNodes = 20,
  visited = new Set<string>()
): Array<{ id: string; name: string }> => {
  if (visited.has(node.id)) {
    return output;
  }
  visited.add(node.id);

  if (output.length >= maxNodes) {
    return output;
  }

  // Coleta qualquer node que não seja a raiz do documento
  if (node.type !== 'DOCUMENT' && node.type !== 'CANVAS') {
    output.push({ id: node.id, name: node.name });
  }

  if (output.length >= maxNodes) {
    return output;
  }

  if (node.children && Array.isArray(node.children)) {
    for (let i = 0; i < Math.min(node.children.length, 15); i++) {
      if (output.length >= maxNodes) {
        break;
      }
      const child = node.children[i];
      if (child) {
        collectAllExportableIds(child, output, maxNodes, visited);
      }
    }
  }

  return output;
};

const chunks = <T>(items: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
};

const fetchJson = async <T>(url: string, figmaToken: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': figmaToken,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha na API do Figma (${response.status}): ${body.slice(0, 200)}`);
  }

  return (await response.json()) as T;
};

const downloadSvg = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao baixar SVG (${response.status})`);
  }
  return response.text();
};

const fetchDesignTokens = async (
  fileKey: string,
  figmaToken: string
): Promise<FigmaDesignTokens> => {
  try {
    // Tenta buscar variables do arquivo
    const variablesUrl = `${FIGMA_API_BASE}/files/${fileKey}/variables/local`;
    const variablesResponse = await fetch(variablesUrl, {
      headers: { 'X-Figma-Token': figmaToken },
    });

    let variables: unknown[] = [];
    if (variablesResponse.ok) {
      const data = (await variablesResponse.json()) as { variables: Record<string, unknown>[] };
      variables = data.variables ? Object.values(data.variables).slice(0, 50) : [];
    }

    // Mapeador de tokens para classes Tailwind
    const tokenToClassMap: Record<string, string> = {};

    for (const variable of variables.slice(0, 30)) {
      const varName = (variable as Record<string, string>).name || '';
      const valuesByMode = (variable as Record<string, unknown>).valuesByMode as
        | Record<string, string | number>
        | undefined;

      if (!valuesByMode || Object.keys(valuesByMode).length === 0) {
        continue;
      }

      const firstModeKey = Object.keys(valuesByMode)[0];
      const rawValue = valuesByMode[firstModeKey];
      const varValue = rawValue === undefined || rawValue === null ? '' : String(rawValue).trim();

      if (varValue.length === 0) {
        continue;
      }

      // Mapeia nomes comuns de tokens para classes
      if (varName.includes('color') || varName.includes('Color')) {
        tokenToClassMap[varName] = `text-[${varValue}]`;
      } else if (varName.includes('spacing') || varName.includes('Spacing')) {
        tokenToClassMap[varName] = `p-${varValue}`;
      } else if (varName.includes('radius') || varName.includes('Radius')) {
        tokenToClassMap[varName] = `rounded-${varValue}`;
      } else if (varName.includes('size') || varName.includes('Size')) {
        tokenToClassMap[varName] = `w-${varValue}`;
      }
    }

    return {
      variables: variables as any[],
      styles: [],
      tokenToClassMap,
    };
  } catch {
    // Se houver erro, retorna estrutura vazia
    return {
      variables: [],
      styles: [],
      tokenToClassMap: {},
    };
  }
};

const ensureSvgFile = async (
  svgContent: string,
  fileName: string,
  outputDir: string
): Promise<string> => {
  const svgDir = path.join(outputDir, SVG_DIR_NAME);
  await mkdir(svgDir, { recursive: true });

  const normalizedName = normalizeFileName(fileName);
  const filePath = path.join(svgDir, `${normalizedName}.svg`);

  let shouldWrite = true;
  try {
    const existingContent = await readFile(filePath, 'utf8');
    if (existingContent === svgContent) {
      shouldWrite = false;
    }
  } catch {
    // Sem cache anterior.
  }

  if (shouldWrite) {
    await writeFile(filePath, svgContent, 'utf8');
  }

  return filePath;
};

const saveFigmaTokenInEnv = async (figmaToken: string): Promise<void> => {
  const envPath = path.resolve(process.cwd(), '.env');
  let envContent = '';

  try {
    envContent = await readFile(envPath, 'utf8');
  } catch (error) {
    if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT')) {
      throw error;
    }
  }

  const tokenLine = `FIGMA_TOKEN=${figmaToken}`;
  const hasTrailingNewline = envContent.endsWith('\n');

  if (/^FIGMA_TOKEN=.*$/m.test(envContent)) {
    envContent = envContent.replace(/^FIGMA_TOKEN=.*$/m, tokenLine);
  } else {
    envContent =
      envContent.length === 0
        ? tokenLine
        : `${envContent}${hasTrailingNewline ? '' : '\n'}${tokenLine}`;
  }

  await writeFile(envPath, `${envContent}${envContent.endsWith('\n') ? '' : '\n'}`, 'utf8');
};

const isProduction = (): boolean => process.env.NODE_ENV === 'production';

const loadRuntimeSecrets = async (): Promise<Record<string, string>> => {
  const raw = await readFile(RUNTIME_SECRETS_PATH, 'utf8').catch(() => undefined);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
};

const saveFigmaTokenInRuntimeSecrets = async (figmaToken: string): Promise<void> => {
  const current = await loadRuntimeSecrets();
  const next = { ...current, FIGMA_TOKEN: figmaToken };
  await mkdir(path.dirname(RUNTIME_SECRETS_PATH), { recursive: true });
  await writeFile(RUNTIME_SECRETS_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
};

const resolveFigmaToken = async (): Promise<string | undefined> => {
  const fromEnv = process.env.FIGMA_TOKEN?.trim();
  if (fromEnv) return fromEnv;

  if (!isProduction()) return undefined;

  const secrets = await loadRuntimeSecrets();
  const fromSecrets = secrets.FIGMA_TOKEN?.trim();
  if (fromSecrets) {
    process.env.FIGMA_TOKEN = fromSecrets;
  }

  return fromSecrets;
};

const promptForFigmaToken = async (): Promise<string> => {
  const rl = readline.createInterface({ input, output });

  try {
    const token = (await rl.question('Cole aqui o token do Figma: ')).trim();
    if (!token) {
      throw new Error('FIGMA_TOKEN nao informada.');
    }

    if (isProduction()) {
      await saveFigmaTokenInRuntimeSecrets(token);
    } else {
      await saveFigmaTokenInEnv(token);
    }
    process.env.FIGMA_TOKEN = token;

    return token;
  } finally {
    rl.close();
  }
};

const downloadFigmaSvgs = async (options: DownloadFigmaSvgsOptions): Promise<FigmaAsset[]> => {
  let figmaToken = await resolveFigmaToken();
  if (!figmaToken) {
    options.onProgress?.('FIGMA_TOKEN nao encontrada. Solicitar token no terminal...');
    figmaToken = await promptForFigmaToken();
    options.onProgress?.(
      isProduction()
        ? 'FIGMA_TOKEN salva em armazenamento seguro local (producao).'
        : 'FIGMA_TOKEN salva em .env com sucesso.'
    );
  }

  const { fileKey, nodeId } = parseFigmaUrl(options.figmaUrl);

  // Busca tokens do arquivo (modo precisão máxima)
  let fileTokens: undefined | Awaited<ReturnType<typeof fetchDesignTokens>>;
  try {
    options.onProgress?.('Buscando tokens de design do Figma...');
    fileTokens = await fetchDesignTokens(fileKey, figmaToken);
    if (Object.keys(fileTokens.tokenToClassMap).length > 0) {
      options.onProgress?.(
        `Encontrados ${Object.keys(fileTokens.tokenToClassMap).length} tokens de design`
      );
    }
  } catch {
    options.onProgress?.('Aviso: nao foi possivel carregar tokens de design');
  }

  if (nodeId) {
    options.onProgress?.('Buscando componente especifico do Figma...');

    const imagesResponse = await fetchJson<FigmaImagesResponse>(
      `${FIGMA_API_BASE}/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=svg`,
      figmaToken
    );

    const renderUrl = imagesResponse.images?.[nodeId];
    if (!renderUrl) {
      throw new Error(`Nao foi possivel renderizar o node-id ${nodeId}.`);
    }

    let nodeName = `figma-node-${nodeId.replace(/:/g, '-')}`;
    let designInfo: FigmaDesignInfo | undefined;

    try {
      const nodeDetails = await fetchJson<FigmaNodeDetailsResponse>(
        `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}&depth=4`,
        figmaToken
      );
      const docNode = nodeDetails.nodes?.[nodeId]?.document;
      if (docNode) {
        if (docNode.name && docNode.name.trim().length > 0) {
          nodeName = docNode.name;
        }
        designInfo = extractDesignInfo(docNode);
      }
    } catch {
      // Se não conseguir ler detalhes, continua com nome padrão.
    }

    options.onProgress?.('Baixando SVG do componente selecionado...');
    const svgContent = await downloadSvg(renderUrl);
    const assetsDir = options.assetsDir ?? process.cwd();
    const filePath = await ensureSvgFile(svgContent, nodeName, assetsDir);
    const relativePath = path.relative(process.cwd(), filePath).split(path.sep).join('/');

    return [
      {
        name: toVueComponentName(nodeName),
        path: relativePath,
        content: svgContent,
        designInfo,
        designTokens: fileTokens,
      },
    ];
  }

  options.onProgress?.('Buscando documento do Figma...');

  try {
    // Usa depth=2 para ter mais profundidade mas manter resposta razoável
    const fileResponse = await fetchJson<FigmaFileResponse>(
      `${FIGMA_API_BASE}/files/${fileKey}?depth=2`,
      figmaToken
    );

    if (!fileResponse.document) {
      throw new Error('Documento nao encontrado no Figma.');
    }

    let exportableNodeInfo = collectExportableNodeIds(fileResponse.document);

    // Se não encontrou nodes exportáveis, tenta coleta mais agressiva
    if (exportableNodeInfo.length === 0) {
      options.onProgress?.('Tentando coleta alternativa de elementos...');
      exportableNodeInfo = collectAllExportableIds(fileResponse.document);
    }

    if (exportableNodeInfo.length === 0) {
      throw new Error('Nenhum node exportavel encontrado no documento.');
    }

    if (exportableNodeInfo.length >= 20) {
      options.onProgress?.(`Encontrados muitos assets. Usando apenas os primeiros 20...`);
    } else {
      options.onProgress?.(
        `Encontrados ${exportableNodeInfo.length} assets. Gerando IDs de renderizacao...`
      );
    }

    const nodeIds = exportableNodeInfo.map((node) => node.id);
    const nodeNames = new Map(exportableNodeInfo.map((node) => [node.id, node.name]));
    const nodeChunks = chunks(nodeIds, 100);

    const renderUrls: Record<string, string> = {};

    for (const nodeChunk of nodeChunks) {
      const nodeChunkParams = nodeChunk.map((id) => `ids=${encodeURIComponent(id)}`).join('&');
      const imagesResponse = await fetchJson<FigmaImagesResponse>(
        `${FIGMA_API_BASE}/images/${fileKey}?${nodeChunkParams}&format=svg`,
        figmaToken
      );

      if (!imagesResponse.images) {
        throw new Error('Nao foi possivel obter URLs de renderizacao.');
      }

      Object.assign(renderUrls, imagesResponse.images);
    }

    options.onProgress?.('Baixando SVGs...');

    const assets: FigmaAsset[] = [];
    const assetsDir = options.assetsDir ?? process.cwd();

    for (const nodeId of nodeIds) {
      const renderUrl = renderUrls[nodeId];
      const nodeName = nodeNames.get(nodeId);

      if (!nodeName) {
        continue;
      }

      if (!renderUrl) {
        options.onProgress?.(`Pulando ${nodeName} (sem URL de renderizacao)`);
        continue;
      }

      try {
        const svgContent = await downloadSvg(renderUrl);
        const filePath = await ensureSvgFile(svgContent, nodeName, assetsDir);
        const relativePath = path.relative(process.cwd(), filePath).split(path.sep).join('/');

        // Tenta obter designInfo para cada node
        let nodeDesignInfo: FigmaDesignInfo | undefined;
        try {
          const nodeDetails = await fetchJson<FigmaNodeDetailsResponse>(
            `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}&depth=4`,
            figmaToken
          );
          const docNode = nodeDetails.nodes?.[nodeId]?.document;
          if (docNode) {
            nodeDesignInfo = extractDesignInfo(docNode);
          }
        } catch {
          // Continua sem designInfo
        }

        const componentName = toVueComponentName(nodeName);
        assets.push({
          name: componentName,
          path: relativePath,
          content: svgContent,
          designInfo: nodeDesignInfo,
          designTokens: fileTokens,
        });

        options.onProgress?.(`Downloaded: ${nodeName}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        options.onProgress?.(`Erro ao baixar ${nodeName}: ${message}`);
      }
    }

    return assets;
  } catch (error) {
    if (error instanceof Error && error.message.includes('string longer than')) {
      throw new Error(
        'Documento do Figma muito grande. Tente com um arquivo menor ou use SVG local.'
      );
    }
    throw error;
  }
};

const __figmaTestUtils = {
  collectExportableNodeIds,
  collectAllExportableIds,
};

export { __figmaTestUtils, downloadFigmaSvgs };
export type { DownloadFigmaSvgsOptions };

