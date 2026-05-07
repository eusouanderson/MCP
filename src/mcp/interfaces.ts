import { DsComponentRef } from '../ds/resolver.js';
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
  dsComponents?: DsComponentRef[];
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
  useDesignSystem?: boolean;
  hooks?: PipelineHooks;
};

type PipelineResult = {
  outputFilePath: string;
  template: string;
  assets: FigmaAsset[];
};

interface ExtractedSections {
  templateBody: string;
  scriptBody: string;
}

export type {
  DsComponentRef,
  EnsureSddFileResult,
  ExtractedSections,
  McpContext,
  PackageJsonData,
  PipelineHooks,
  PipelineResult,
  PipelineStage,
  RunPipelineOptions,
  SddData,
  VueAssetHint,
};
