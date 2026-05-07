import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { FigmaAsset } from './interfaces.js';

type PersistedFigmaAssetMetadata = Pick<FigmaAsset, 'designInfo' | 'designTokens'>;

const getFigmaMetadataPath = (svgFilePath: string): string => {
  const parsed = path.parse(svgFilePath);
  return path.join(parsed.dir, `${parsed.name}.figma.json`);
};

const loadFigmaAssetMetadata = async (
  svgFilePath: string
): Promise<PersistedFigmaAssetMetadata | undefined> => {
  try {
    const raw = await readFile(getFigmaMetadataPath(svgFilePath), 'utf8');
    const parsed = JSON.parse(raw) as PersistedFigmaAssetMetadata;
    return {
      designInfo: parsed.designInfo,
      designTokens: parsed.designTokens,
    };
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return undefined;
    }

    return undefined;
  }
};

const saveFigmaAssetMetadata = async (
  svgFilePath: string,
  asset: PersistedFigmaAssetMetadata
): Promise<void> => {
  await writeFile(getFigmaMetadataPath(svgFilePath), `${JSON.stringify(asset, null, 2)}\n`, 'utf8');
};

export { getFigmaMetadataPath, loadFigmaAssetMetadata, saveFigmaAssetMetadata };
export type { PersistedFigmaAssetMetadata };
