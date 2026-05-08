/**
 * Plugin OpenCode para MCP_Frontend
 * 
 * Permite ao OpenCode gerar componentes Vue 3 a partir de designs do Figma
 * sem necessidade de autenticação interativa.
 */

import { type Plugin, tool } from "@opencode-ai/plugin";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Tipos para a API do MCP_Frontend
interface GenerateFromFigmaOptions {
  figmaUrl: string;
  figmaToken: string;
  outputDir?: string;
  outputFileName?: string;
  useDesignSystem?: boolean;
  llmModel?: string;
  onProgress?: (message: string) => void;
}

interface GenerateFromLocalSvgOptions {
  svgFilePath: string;
  outputDir?: string;
  outputFileName?: string;
  useDesignSystem?: boolean;
  llmModel?: string;
  onProgress?: (message: string) => void;
}

interface McpFrontendApiResult {
  success: boolean;
  outputFilePath?: string;
  template?: string;
  error?: string;
}

// Função para carregar secrets do projeto
async function loadProjectSecrets(projectRoot: string): Promise<Record<string, string>> {
  try {
    const envPath = path.join(projectRoot, '.env');
    const envContent = await readFile(envPath, 'utf-8');
    
    const secrets: Record<string, string> = {};
    for (const line of envContent.split('\n')) {
      const match = line.match(/^([A-Z_]+)=(.+)$/);
      if (match) {
        secrets[match[1]] = match[2].replace(/^["']|["']$/g, '');
      }
    }
    
    return secrets;
  } catch {
    return {};
  }
}

// Função para garantir tokens configurados
async function ensureTokens(
  projectRoot: string,
  providedFigmaToken?: string,
  providedCopilotToken?: string
): Promise<{ figmaToken: string; copilotToken?: string }> {
  // Tentar carregar do .env do projeto
  const secrets = await loadProjectSecrets(projectRoot);
  
  const figmaToken = providedFigmaToken || 
                     secrets.FIGMA_TOKEN || 
                     process.env.FIGMA_TOKEN;
  
  const copilotToken = providedCopilotToken || 
                      secrets.COPILOT_TOKEN || 
                      process.env.COPILOT_TOKEN;
  
  if (!figmaToken) {
    throw new Error(
      'Token do Figma não encontrado. Configure FIGMA_TOKEN no .env do projeto ou passe como argumento.'
    );
  }
  
  // Se tokens foram fornecidos via argumento, atualizar .env
  if (providedFigmaToken || providedCopilotToken) {
    const envPath = path.join(projectRoot, '.env');
    let envContent = '';
    
    try {
      envContent = await readFile(envPath, 'utf-8');
    } catch {
      envContent = '';
    }
    
    const lines = envContent.split('\n');
    const updates: Record<string, string> = {};
    
    if (providedFigmaToken) updates.FIGMA_TOKEN = providedFigmaToken;
    if (providedCopilotToken) updates.COPILOT_TOKEN = providedCopilotToken;
    
    for (const [key, value] of Object.entries(updates)) {
      const lineIndex = lines.findIndex(l => l.startsWith(`${key}=`));
      if (lineIndex >= 0) {
        lines[lineIndex] = `${key}=${value}`;
      } else {
        lines.push(`${key}=${value}`);
      }
    }
    
    await writeFile(envPath, lines.join('\n'));
  }
  
  return { figmaToken, copilotToken };
}

export const McpFrontendPlugin: Plugin = async (ctx) => {
  const { project, client, directory, worktree } = ctx;
  
  await client.app.log({
    body: {
      service: "mcp-frontend-plugin",
      level: "info",
      message: "Plugin MCP_Frontend inicializado",
      extra: { directory, worktree },
    },
  });
  
  return {
    tool: {
      /**
       * Gera componente Vue 3 a partir de URL do Figma
       */
      "mcp-generate-from-figma": tool({
        description: "Gera um componente Vue 3 de alta fidelidade a partir de um design do Figma. Extrai cores, tipografia e design tokens automaticamente e mapeia para TailwindCSS.",
        args: {
          figmaUrl: tool.schema.string().describe("URL completa do arquivo Figma (ex: https://www.figma.com/file/abc123/Design)"),
          figmaToken: tool.schema.string().optional().describe("Token de acesso do Figma (opcional se já configurado no .env)"),
          outputDir: tool.schema.string().optional().default("./output").describe("Diretório de saída para o componente Vue"),
          outputFileName: tool.schema.string().optional().describe("Nome do arquivo Vue de saída (sem extensão)"),
          useDesignSystem: tool.schema.boolean().optional().default(false).describe("Usar componentes do @comercti/vue-components"),
          llmModel: tool.schema.string().optional().describe("Modelo LLM para geração (ex: gpt-5.3-codex, claude-sonnet-4.6)"),
        },
        async execute(args, context) {
          const { directory } = context;
          
          try {
            // Log de início
            await client.app.log({
              body: {
                service: "mcp-frontend-plugin",
                level: "info",
                message: "Iniciando geração a partir do Figma",
                extra: args,
              },
            });
            
            // Garantir tokens
            const { figmaToken } = await ensureTokens(
              directory,
              args.figmaToken,
            );
            
            // Importar API dinamicamente (para evitar problemas com ESM)
            const apiModule = await import(`${directory}/src/api/index.js`);
            const { generateFromFigma } = apiModule;
            
            // Preparar opções
            const options: GenerateFromFigmaOptions = {
              figmaUrl: args.figmaUrl,
              figmaToken,
              outputDir: args.outputDir || "./output",
              outputFileName: args.outputFileName,
              useDesignSystem: args.useDesignSystem || false,
              llmModel: args.llmModel,
              onProgress: (msg: string) => {
                client.app.log({
                  body: {
                    service: "mcp-frontend-plugin",
                    level: "info",
                    message: msg,
                  },
                });
              },
            };
            
            // Executar geração
            const result: McpFrontendApiResult = await generateFromFigma(options);
            
            if (!result.success) {
              throw new Error(result.error || "Falha ao gerar componente");
            }
            
            await client.app.log({
              body: {
                service: "mcp-frontend-plugin",
                level: "info",
                message: "Componente gerado com sucesso",
                extra: { outputFilePath: result.outputFilePath },
              },
            });
            
            return `✅ Componente Vue gerado com sucesso!

**Arquivo:** ${result.outputFilePath}

O componente foi gerado com alta fidelidade ao design do Figma, incluindo:
- Cores e design tokens extraídos do Figma
- Tipografia mapeada para TailwindCSS
- Estrutura HTML semântica
${args.useDesignSystem ? '- Componentes do @comercti/vue-components' : ''}

Você pode visualizar o arquivo em: ${result.outputFilePath}`;
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            
            await client.app.log({
              body: {
                service: "mcp-frontend-plugin",
                level: "error",
                message: "Erro ao gerar componente",
                extra: { error: errorMsg },
              },
            });
            
            throw new Error(`Falha ao gerar componente do Figma: ${errorMsg}`);
          }
        },
      }),
      
      /**
       * Gera componente Vue 3 a partir de SVG local
       */
      "mcp-generate-from-svg": tool({
        description: "Gera um componente Vue 3 a partir de um arquivo SVG local. Ideal para designs já baixados ou criados manualmente.",
        args: {
          svgFilePath: tool.schema.string().describe("Caminho para o arquivo SVG (ex: src/svg/design.svg)"),
          outputDir: tool.schema.string().optional().default("./output").describe("Diretório de saída para o componente Vue"),
          outputFileName: tool.schema.string().optional().describe("Nome do arquivo Vue de saída (sem extensão)"),
          useDesignSystem: tool.schema.boolean().optional().default(false).describe("Usar componentes do @comercti/vue-components"),
          llmModel: tool.schema.string().optional().describe("Modelo LLM para geração (ex: gpt-5.3-codex, claude-sonnet-4.6)"),
        },
        async execute(args, context) {
          const { directory } = context;
          
          try {
            await client.app.log({
              body: {
                service: "mcp-frontend-plugin",
                level: "info",
                message: "Iniciando geração a partir de SVG local",
                extra: args,
              },
            });
            
            // Importar API dinamicamente
            const apiModule = await import(`${directory}/src/api/index.js`);
            const { generateFromLocalSvg } = apiModule;
            
            // Preparar opções
            const options: GenerateFromLocalSvgOptions = {
              svgFilePath: args.svgFilePath,
              outputDir: args.outputDir || "./output",
              outputFileName: args.outputFileName,
              useDesignSystem: args.useDesignSystem || false,
              llmModel: args.llmModel,
              onProgress: (msg: string) => {
                client.app.log({
                  body: {
                    service: "mcp-frontend-plugin",
                    level: "info",
                    message: msg,
                  },
                });
              },
            };
            
            // Executar geração
            const result: McpFrontendApiResult = await generateFromLocalSvg(options);
            
            if (!result.success) {
              throw new Error(result.error || "Falha ao gerar componente");
            }
            
            await client.app.log({
              body: {
                service: "mcp-frontend-plugin",
                level: "info",
                message: "Componente gerado com sucesso",
                extra: { outputFilePath: result.outputFilePath },
              },
            });
            
            return `✅ Componente Vue gerado com sucesso!

**Arquivo:** ${result.outputFilePath}

O componente foi gerado a partir do SVG local, incluindo:
- Estrutura HTML semântica
- Classes TailwindCSS apropriadas
${args.useDesignSystem ? '- Componentes do @comercti/vue-components' : ''}

Você pode visualizar o arquivo em: ${result.outputFilePath}`;
          } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            
            await client.app.log({
              body: {
                service: "mcp-frontend-plugin",
                level: "error",
                message: "Erro ao gerar componente",
                extra: { error: errorMsg },
              },
            });
            
            throw new Error(`Falha ao gerar componente do SVG: ${errorMsg}`);
          }
        },
      }),
    },
  };
};
