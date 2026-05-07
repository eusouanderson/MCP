import { FigmaAsset } from '../integrations/interfaces.js';

type SddData = Record<string, unknown>;

type EnsureSddFileResult = {
  sddPath: string;
  created: boolean;
};

type PackageJsonData = {
  name?: string;
  version?: string;
  packageManager?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

type VueAssetHint = {
  assetName: string;
  filePath: string;
  suggestedComponent: string;
};

type McpContext = {
  sdd: SddData;
  assets: FigmaAsset[];
  vueAssetHints: VueAssetHint[];
  metadata: {
    generatedAt: string;
    assetsCount: number;
  };
};

type PipelineStage =
  | 'read-sdd'
  | 'process-svg'
  | 'upload-svg'
  | 'build-context'
  | 'build-prompt'
  | 'call-llm'
  | 'save-file';

type PipelineHooks = {
  onStage?: (stage: PipelineStage) => void;
  onProgress?: (message: string) => void;
};

type RunPipelineOptions = {
  sddPath: string;
  svgFilePath: string;
  outputDir: string;
  assetsDir?: string;
  llmModel?: string;
  outputFileName?: string;
  hooks?: PipelineHooks;
};

type PipelineResult = {
  outputFilePath: string;
  template: string;
  assets: FigmaAsset[];
};

export type {
  EnsureSddFileResult,
  McpContext,
  PackageJsonData,
  PipelineHooks,
  PipelineResult,
  PipelineStage,
  RunPipelineOptions,
  SddData,
  VueAssetHint,
};
