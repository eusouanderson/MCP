# MCP_Frontend - Guia para Agentes de IA

## ⚡ Plugin OpenCode

**IMPORTANTE**: Este projeto agora funciona como um **plugin nativo do OpenCode**!

### Uso Direto pelo OpenCode

O OpenCode pode usar o MCP_Frontend de duas formas:

1. **Via Custom Tools (Recomendado)**:
   - `mcp-generate-from-figma` - Gera componente Vue do Figma
   - `mcp-generate-from-svg` - Gera componente Vue de SVG local

2. **Via Comandos Customizados**:
   - `/mcp-frontend` - Menu de ajuda
   - `/figma-to-vue <url> [nome]` - Atalho para Figma
   - `/svg-to-vue <path> [nome]` - Atalho para SVG

### Quando Usar

O OpenCode deve invocar estas tools quando o usuário:
- Mencionar "Figma" + "componente Vue"
- Solicitar conversão de design para código
- Querer gerar template Vue com alta fidelidade
- Pedir para usar o Design System @comercti/vue-components

### Exemplo de Uso

```
Usuário: "Gere um componente Vue deste design do Figma: https://figma.com/file/abc"

OpenCode: [Invoca mcp-generate-from-figma com a URL]
→ Componente gerado automaticamente
→ Sem necessidade de login separado
→ Usa tokens já configurados no ambiente
```

**Documentação completa**: Ver `PLUGIN-OPENCODE.md`

---

## Visão Geral do Projeto

Este é um projeto CLI chamado **MCP_Frontend** que gera templates Vue 3 de alta fidelidade a partir de designs do Figma. O projeto implementa um protocolo de contexto customizado para geração de código usando LLMs.

## Arquitetura

```
┌─────────────────────────────────────────┐
│  CLI Interativo (src/index.ts)          │
│  - Menus interativos                    │
│  - Configuração de modelo/tokens        │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  Integrações                             │
│  - API do Figma                         │
│  - Processamento de SVG                 │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  Pipeline MCP (src/mcp/)                │
│  - Context Builder                      │
│  - Prompt Builder                       │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  Geração LLM                            │
│  - GitHub Copilot API                   │
│  - Modelos: gpt-5.x, claude-sonnet      │
└─────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────┐
│  Output                                  │
│  - Templates Vue 3 (.vue)               │
│  - HTML + TailwindCSS                   │
│  - Componentes do Design System         │
└─────────────────────────────────────────┘
```

## Estrutura do Projeto

- `src/index.ts` - CLI principal com menus interativos
- `src/mcp/` - Pipeline de geração de contexto e prompts
  - `context-builder.ts` - Constrói contexto rico a partir de SDD, Figma, design tokens
  - `prompt-builder.ts` - Gera prompts estruturados para LLMs
  - `pipeline.ts` - Orquestra 7 estágios de geração
  - `sdd-generator.ts` - Gera Software Design Document automaticamente
- `src/copilot/` - Integração com GitHub Copilot API
  - `auth.ts` - OAuth Device Flow para autenticação
  - `provider.ts` - Interface unificada para API do Copilot
  - `models.ts` - Descoberta e cache de modelos disponíveis
- `src/integrations/` - Integrações externas
  - `figma.ts` - API do Figma para download de designs e extração de metadados
  - `svg-upload.ts` - Processamento e upload de arquivos SVG
- `src/ds/` - Integração com Design System (@comercti/vue-components)
- `src/llm/` - Cliente LLM wrapper

## Stack Tecnológica

- **Runtime**: Node.js (target: node18)
- **Linguagem**: TypeScript 6.x
- **Build**: esbuild (bundle único para dist/mcp-frontend.cjs)
- **Testing**: Vitest com coverage
- **CLI**: enquirer (menus), ora (loading), boxen (UI), chalk (cores)
- **Packaging**: @yao-pkg/pkg para executáveis standalone

## Comandos Disponíveis

### Uso no OpenCode

O OpenCode possui um comando customizado para usar este CLI:

```bash
/mcp-frontend
```

Este comando inicia o CLI interativo do MCP_Frontend. Use-o quando precisar:
- Gerar componentes Vue a partir de designs do Figma
- Converter SVGs locais em templates Vue
- Criar templates com componentes do Design System

### Comandos NPM/PNPM

```bash
# Desenvolvimento
pnpm dev                 # Roda com tsx (hot reload)
pnpm build              # Builda para dist/mcp-frontend.cjs
pnpm start              # Executa o build

# Testing
pnpm test               # Roda testes com Vitest
pnpm test:watch         # Modo watch
pnpm test:coverage      # Coverage report

# Packaging
pnpm pkg:linux          # Cria executável standalone para Linux
```

### CLI Executável

Após o build, você pode executar diretamente:

```bash
# Usando o executável
./dist/mcp-frontend

# Ou via npm bin
mcp-frontend
mcp_frontend
```

## Como Funciona

### 1. Entrada de Dados

**Opção A: SVG Local**
- Usuário seleciona um arquivo SVG da pasta `src/svg/`
- SVG é processado diretamente

**Opção B: Figma**
- Usuário fornece URL do Figma
- CLI baixa SVGs e metadados via API do Figma
- Extrai: cores, tipografia, design tokens, variáveis
- Salva metadados em `src/svg/*.figma.json`

### 2. Software Design Document (SDD)

O CLI verifica/cria automaticamente um arquivo `src/docs/sdd.json` contendo:
- Estrutura do projeto detectada
- Stack tecnológica (Vue 3, TypeScript, Vite, Tailwind)
- Propósito dos componentes
- Regras de geração

### 3. Pipeline de Geração (7 Estágios)

1. **read-sdd**: Carrega o SDD
2. **process-svg**: Processa conteúdo SVG
3. **upload-svg**: Copia SVG para estrutura do projeto
4. **build-context**: Constrói contexto MCP rico
5. **build-prompt**: Gera prompt estruturado
6. **call-llm**: Executa geração via LLM
7. **save-file**: Salva arquivo Vue gerado

### 4. Contexto MCP

O `McpContext` inclui:
- **SDD**: Documento de design do software
- **Design Tokens**: Cores, tipografia, espaçamento (Figma → Tailwind)
- **SVG Metadata**: Layout, texto, componentes
- **Design System**: Documentação de componentes (@comercti/vue-components)
- **Tailwind Hints**: Classes CSS geradas deterministicamente

### 5. Geração LLM

**Modelos Recomendados**:
- `gpt-5.3-codex` (principal)
- `gpt-5.4` (alta qualidade)
- `gpt-5.2-codex` (alternativa)
- `claude-sonnet-4.6` (alternativa)

**Configuração**:
- Temperature: 0 (saída determinística)
- Endpoint: GitHub Copilot API
  - GPT-5 (exceto mini): `/responses` endpoint
  - Outros: `/chat/completions` endpoint

**Modos de Geração**:
- **Template-only**: Apenas `<template>` com HTML + TailwindCSS
- **Design System**: `<script setup>` + `<template>` usando componentes do DS

### 6. Output

Arquivo Vue gerado em `output/`:
```vue
<script setup lang="ts">
// (Apenas se Design System estiver habilitado)
import { Button, Input } from '@comercti/vue-components';
</script>

<template>
  <!-- HTML com alta fidelidade ao design original -->
  <!-- Classes Tailwind CSS mapeadas de design tokens -->
</template>
```

## Variáveis de Ambiente

### .env (Desenvolvimento)

```bash
FIGMA_TOKEN=figd_...              # Token de acesso do Figma
COPILOT_MODEL=gpt-5.3-codex       # Modelo LLM padrão
COPILOT_TOKEN=ghu_...             # Token estático do Copilot (opcional)
URL_DS=https://hmg-ds.dmcview...  # URL do Design System
```

### ~/.mcp-frontend/secrets.json (Produção)

```json
{
  "FIGMA_TOKEN": "...",
  "COPILOT_TOKEN": "..."
}
```

### .copilot/auth.json (OAuth)

Credenciais OAuth geradas automaticamente pelo Device Flow.

## Integração com OpenCode

### Uso Manual

Execute o comando no OpenCode:

```
/mcp-frontend
```

O CLI irá guiá-lo através do processo interativo.

### Quando o OpenCode Deve Usar

O OpenCode pode sugerir usar o MCP_Frontend quando:

1. **Usuário menciona Figma**: "Gere um componente a partir deste design do Figma"
2. **Conversão de design para código**: "Transforme este SVG em um componente Vue"
3. **Templates Vue com design específico**: "Crie um template Vue que siga exatamente este layout"
4. **Uso de Design System**: "Gere um componente usando @comercti/vue-components"

### Exemplo de Prompt

```
Usuário: Preciso criar um componente Vue a partir deste design do Figma: 
https://www.figma.com/file/abc123/Design

OpenCode: Vou usar o MCP_Frontend CLI para gerar o template Vue com alta 
fidelidade ao design. Executando: /mcp-frontend
```

## Regras de Geração

### Fidelidade ao Figma

O prompt builder inclui regras estritas para prevenir alucinação:

1. **Não reimaginar designs**: Usar apenas informações do SVG fornecido
2. **Não adicionar funcionalidades**: Apenas estrutura visual
3. **Mapear cores exatas**: Usar design tokens do Figma
4. **Respeitar hierarquia**: Seguir estrutura de layers do Figma
5. **Espaçamentos precisos**: Usar valores de spacing extraídos

### Design Tokens → Tailwind

Mapeamento automático:
- Cores: `bg-[#hex]`, `text-[#hex]`
- Tipografia: `text-[size]`, `font-[weight]`
- Espaçamento: `p-[size]`, `m-[size]`, `gap-[size]`
- Layout: `flex`, `grid`, `relative`, `absolute`

### Two-Pass Generation

Se o primeiro pass não usar componentes do DS quando habilitado:
1. Detecta ausência de imports do @comercti/vue-components
2. Reforça prompt com instruções mais explícitas
3. Tenta novamente

## Troubleshooting

### Token do Figma Inválido

Se API retornar 403:
- CLI oferece opção de informar novo token
- Token é persistido em .env ou secrets.json

### Autenticação Copilot

Se não houver token estático:
- CLI inicia OAuth Device Flow automaticamente
- Abre navegador para autorização
- Tokens salvos em .copilot/auth.json

### Nenhum SVG Baixado do Figma

Verifique:
- URL do Figma está correta
- Arquivo contém frames/componentes exportáveis
- Token tem permissões de leitura

### Modelo LLM Não Encontrado

- CLI busca modelos disponíveis dinamicamente
- Se modelo configurado não existe, mostra lista de disponíveis
- Fallback: `gpt-5-mini`

## Padrões de Código

### Naming Conventions

- **Arquivos**: kebab-case (`context-builder.ts`)
- **Tipos/Interfaces**: PascalCase (`McpContext`, `PipelineStage`)
- **Funções**: camelCase (`askMainMenuChoice`, `runPipeline`)
- **Constantes**: SCREAMING_SNAKE_CASE (`BACK_SENTINEL`, `DEFAULT_RUNTIME_SECRETS_PATH`)

### Error Handling

```typescript
try {
  await operation();
  await success('Operação concluída');
} catch (exception) {
  const msg = exception instanceof Error ? exception.message : String(exception);
  await error(`Falha: ${msg}`);
  process.exitCode = 1;
}
```

### Loading States

```typescript
const spinner = loading('Processando...');
try {
  await longOperation();
  spinner.stop();
  await success('Concluído');
} catch (e) {
  spinner.stop();
  throw e;
}
```

## Extensibilidade

### Adicionar Novo Provider de LLM

1. Criar módulo em `src/llm/`
2. Implementar interface compatível com `LlmClient`
3. Adicionar configuração em `.env`
4. Atualizar `configureLlmModel()` no `index.ts`

### Adicionar Nova Integração de Design

1. Criar módulo em `src/integrations/`
2. Implementar interface de download e extração de metadados
3. Atualizar `askSourceType()` com nova opção
4. Adicionar handling no main loop

### Customizar Prompt Builder

Editar `src/mcp/prompt-builder.ts`:
- Adicionar novas regras de geração
- Modificar estrutura do prompt
- Incluir novos tipos de contexto

## Próximos Passos

Para melhorar a integração com OpenCode, considere:

1. **Converter para MCP Server**: Implementar protocolo MCP padrão para integração nativa
2. **Adicionar comandos não-interativos**: Flags CLI para uso programático
3. **Criar webhook/API**: Permitir chamadas HTTP para geração
4. **Skill do OpenCode**: Criar skill especializado para geração Vue/Figma
5. **Cache inteligente**: Reusar gerações anteriores para designs similares

## Contribuindo

Para contribuir com este projeto:

1. Adicione testes em `*.spec.ts` usando Vitest
2. Mantenha coverage > 80%
3. Use TypeScript strict mode
4. Documente novas features neste AGENTS.md
5. Execute `pnpm test` antes de commitar

## Suporte

- **Repositório**: (adicionar URL do repo)
- **Issues**: (adicionar URL de issues)
- **Documentação Figma API**: https://www.figma.com/developers/api
- **Documentação Copilot**: https://docs.github.com/en/copilot
- **Documentação OpenCode**: https://opencode.ai/docs
