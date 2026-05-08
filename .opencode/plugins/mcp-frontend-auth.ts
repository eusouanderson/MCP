/**
 * Plugin de Autenticação Compartilhada
 * 
 * Garante que tokens e credenciais do OpenCode sejam disponibilizados
 * para o MCP_Frontend sem precisar de login separado.
 */

import { type Plugin } from "@opencode-ai/plugin";

export const McpFrontendAuthPlugin: Plugin = async (ctx) => {
  const { client } = ctx;
  
  await client.app.log({
    body: {
      service: "mcp-frontend-auth",
      level: "info",
      message: "Plugin de autenticação compartilhada inicializado",
    },
  });
  
  return {
    /**
     * Injeta variáveis de ambiente do OpenCode para o MCP_Frontend
     */
    "shell.env": async (input, output) => {
      // Tentar injetar token do GitHub Copilot se disponível
      if (process.env.GITHUB_TOKEN && !output.env.COPILOT_TOKEN) {
        output.env.COPILOT_TOKEN = process.env.GITHUB_TOKEN;
        
        await client.app.log({
          body: {
            service: "mcp-frontend-auth",
            level: "debug",
            message: "Token do GitHub injetado como COPILOT_TOKEN",
          },
        });
      }
      
      // Preservar tokens já existentes no ambiente
      if (process.env.FIGMA_TOKEN && !output.env.FIGMA_TOKEN) {
        output.env.FIGMA_TOKEN = process.env.FIGMA_TOKEN;
      }
      
      if (process.env.COPILOT_MODEL && !output.env.COPILOT_MODEL) {
        output.env.COPILOT_MODEL = process.env.COPILOT_MODEL;
      }
      
      if (process.env.URL_DS && !output.env.URL_DS) {
        output.env.URL_DS = process.env.URL_DS;
      }
    },
    
    /**
     * Protege arquivos sensíveis de serem lidos acidentalmente
     */
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read") {
        const filePath = output.args.filePath as string;
        
        // Avisar sobre leitura de arquivos sensíveis
        if (filePath.includes(".copilot/auth.json")) {
          await client.app.log({
            body: {
              service: "mcp-frontend-auth",
              level: "warn",
              message: "Leitura de arquivo de autenticação sensível detectada",
              extra: { filePath },
            },
          });
        }
        
        // Bloquear leitura de secrets do home
        if (filePath.includes(".mcp-frontend/secrets.json")) {
          throw new Error(
            "Leitura de secrets do MCP_Frontend não é permitida. " +
            "Use variáveis de ambiente em vez disso."
          );
        }
      }
    },
  };
};
