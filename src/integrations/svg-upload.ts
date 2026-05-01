import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { FigmaAsset } from './interfaces.js';

type UploadSvgOptions = {
  svgFilePath: string;
  assetsDir?: string;
  onProgress?: (message: string) => void;
};

const SVG_DIR_NAME = 'svg';

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

const isValidSvgPath = (svgFilePath: string): boolean => {
  const normalized = svgFilePath.trim().toLowerCase();
  return normalized.endsWith('.svg') && normalized.length > 4;
};

const listSvgFilesInDirectory = async (directoryPath: string): Promise<string[]> => {
  const absoluteDirectory = path.resolve(directoryPath);
  await mkdir(absoluteDirectory, { recursive: true });
  const entries = await readdir(absoluteDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.svg'))
    .map((entry) => path.join(absoluteDirectory, entry.name))
    .sort((a, b) => a.localeCompare(b));
};

const uploadSvgFromFile = async (options: UploadSvgOptions): Promise<FigmaAsset[]> => {
  const sourcePath = path.resolve(options.svgFilePath.trim());
  if (!isValidSvgPath(sourcePath)) {
    throw new Error('Arquivo invalido. Informe um caminho para arquivo .svg.');
  }

  options.onProgress?.('Lendo arquivo SVG informado...');
  const svgContent = await readFile(sourcePath, 'utf8');
  if (!svgContent.includes('<svg')) {
    throw new Error('Arquivo SVG invalido: tag <svg> nao encontrada.');
  }

  const rootAssetsDir = options.assetsDir ?? path.resolve(process.cwd(), 'src');
  const svgDir = path.join(rootAssetsDir, SVG_DIR_NAME);
  await mkdir(svgDir, { recursive: true });

  const originalName = path.parse(sourcePath).name;
  const normalizedName = normalizeFileName(originalName);
  const destinationPath = path.join(svgDir, `${normalizedName}.svg`);

  let shouldWrite = true;
  try {
    const existingContent = await readFile(destinationPath, 'utf8');
    if (existingContent === svgContent) {
      shouldWrite = false;
      options.onProgress?.('Cache de SVG utilizado, sem novo download.');
    }
  } catch {
    // Sem cache anterior.
  }

  if (shouldWrite) {
    options.onProgress?.('Copiando SVG para src/svg/...');
    await writeFile(destinationPath, svgContent, 'utf8');
  }

  const relativePath = path.relative(process.cwd(), destinationPath).split(path.sep).join('/');
  return [
    {
      name: normalizedName,
      path: relativePath,
      content: svgContent,
    },
  ];
};

export { isValidSvgPath, listSvgFilesInDirectory, uploadSvgFromFile };
export type { UploadSvgOptions };
