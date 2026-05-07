import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { EnsureSddFileResult, PackageJsonData, SddData } from './interfaces.js';

const safeReadFile = async (filePath: string): Promise<string | undefined> => {
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }
};

const safeReadDir = async (dirPath: string): Promise<string[]> => {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    return entries
      .map((entry) => `${entry.name}${entry.isDirectory() ? '/' : ''}`)
      .sort((left, right) => left.localeCompare(right));
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const detectStack = (packageJson: PackageJsonData | undefined): string[] => {
  const allDependencies = {
    ...(packageJson?.dependencies ?? {}),
    ...(packageJson?.devDependencies ?? {}),
  };

  const checks: Array<[string, string]> = [
    ['vue', 'Vue 3'],
    ['typescript', 'TypeScript'],
    ['vite', 'Vite'],
    ['vitest', 'Vitest'],
    ['pinia', 'Pinia'],
    ['axios', 'Axios'],
    ['tailwindcss', 'TailwindCSS'],
    ['vue-router', 'Vue Router'],
    ['vite-plugin-pages', 'vite-plugin-pages'],
    ['vite-plugin-vue-layouts', 'vite-plugin-vue-layouts'],
    ['vite-plugin-pwa', 'vite-plugin-pwa'],
  ];

  return checks.filter(([pkg]) => pkg in allDependencies).map(([, label]) => label);
};

const buildInitialSdd = async (workspaceDir: string): Promise<SddData> => {
  const packageJsonPath = path.resolve(workspaceDir, 'package.json');
  const packageJsonRaw = await safeReadFile(packageJsonPath);
  const packageJson = packageJsonRaw ? (JSON.parse(packageJsonRaw) as PackageJsonData) : undefined;

  const rootEntries = await safeReadDir(workspaceDir);
  const srcEntries = await safeReadDir(path.resolve(workspaceDir, 'src'));

  return {
    document: {
      name: 'SDD - Template Generation',
      version: '1.0.0',
      createdAt: new Date().toISOString().slice(0, 10),
      language: 'pt-BR',
      target: 'LLM code generation',
    },
    goal: 'Gerar somente o template Vue com base no SVG e no contexto visual do componente.',
    componentContext: {
      type: 'component-template',
      purpose: `Representar um componente derivado do workspace ${packageJson?.name || path.basename(workspaceDir)}.`,
      targetUsers: 'Usuarios finais da interface gerada.',
    },
    generation: {
      additionalLlmInstructions: [],
    },
    workspaceContext: {
      projectName: packageJson?.name || path.basename(workspaceDir),
      projectVersion: packageJson?.version || '0.0.0',
      packageManager: packageJson?.packageManager || 'unknown',
      detectedStack: detectStack(packageJson),
      rootEntries,
      srcEntries,
    },
  } satisfies SddData;
};

const ensureSddFile = async (
  workspaceDir: string,
  sddPath: string
): Promise<EnsureSddFileResult> => {
  const existingSdd = await safeReadFile(sddPath);
  if (existingSdd !== undefined) {
    return { sddPath, created: false };
  }

  const initialSdd = await buildInitialSdd(workspaceDir);
  await mkdir(path.dirname(sddPath), { recursive: true });
  await writeFile(sddPath, `${JSON.stringify(initialSdd, null, 2)}\n`, 'utf8');

  return { sddPath, created: true };
};

export { buildInitialSdd, ensureSddFile };
export type { EnsureSddFileResult };
