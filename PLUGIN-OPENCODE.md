# Plugin OpenCode do MCP_Frontend

## Visão Geral

O MCP_Frontend agora funciona como um **plugin nativo do OpenCode**, permitindo que você gere componentes Vue 3 de alta fidelidade a partir de designs do Figma sem precisar de autenticação separada ou interface interativa.

## Arquitetura da Integração

```
┌──────────────────────────────────────┐
│         OpenCode Agent               │
│  - Gerencia contexto da conversa     │
│  - Controla execução de tools        │
│  - Compartilha tokens de autenticação│
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│    Plugins do OpenCode               │
│  1. mcp-frontend-auth.ts             │
│     - Injeta variáveis de ambiente   │
│     - Compartilha tokens             │
│     - Protege secrets                │
│                                       │
│  2. mcp-frontend.ts                  │
│     - Custom tools para geração      │
│     - Integração com API core        │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│    API Core (src/api/index.ts)      │
│  - Lógica não-interativa             │
│  - generateFromFigma()               │
│  - generateFromLocalSvg()            │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│    Pipeline MCP                      │
│  - Context Builder                   │
│  - Prompt Builder                    │
│  - LLM Generation                    │
└──────────────────────────────────────┘
```

## Recursos

### ✅ O que foi adicionado

1. **API não-interativa** (`src/api/index.ts`)
   - `generateFromFigma()` - Gera a partir de URL do Figma
   - `generateFromLocalSvg()` - Gera a partir de SVG local
   - Suporte a callbacks de progresso
   - Tratamento de erros completo

2. **Custom Tools do OpenCode**
   - `mcp-generate-from-figma` - Gera componente do Figma
   - `mcp-generate-from-svg` - Gera componente de SVG local

3. **Autenticação Compartilhada**
   - Tokens do OpenCode são automaticamente disponibilizados
   - Sem necessidade de OAuth Device Flow separado
   - Suporte a variáveis de ambiente do projeto

4. **Comandos Customizados**
   - `/mcp-frontend` - Menu principal de ajuda
   - `/figma-to-vue` - Atalho para Figma com Design System
   - `/svg-to-vue` - Atalho para SVG local

## Como Usar

### 1. Via Conversa Natural com OpenCode

```
Você: Gere um componente Vue a partir deste design do Figma:
https://www.figma.com/file/abc123/Design
Use componentes do Design System.

OpenCode: [Usa automaticamente a tool mcp-generate-from-figma]
```

### 2. Via Comandos Customizados

```bash
# Menu de ajuda
/mcp-frontend

# Gerar do Figma com Design System
/figma-to-vue https://www.figma.com/file/abc123/Design NomeDoComponente

# Gerar de SVG local
/svg-to-vue src/svg/design.svg MyComponent
```

### 3. Via Tools Diretas (Para Agentes)

O OpenCode pode invocar as tools diretamente:

```typescript
// Tool: mcp-generate-from-figma
{
  figmaUrl: "https://www.figma.com/file/abc123/Design",
  useDesignSystem: true,
  outputFileName: "LoginForm",
  llmModel: "gpt-5.3-codex"
}

// Tool: mcp-generate-from-svg
{
  svgFilePath: "src/svg/hero-section.svg",
  useDesignSystem: false,
  outputDir: "./output",
  llmModel: "claude-sonnet-4.6"
}
```

## Configuração

### Variáveis de Ambiente

Configure no `.env` do projeto:

```bash
# Token do Figma (obrigatório para uso com Figma)
FIGMA_TOKEN=figd_...

# Token do Copilot (opcional, OpenCode pode fornecer)
COPILOT_TOKEN=ghu_...

# Modelo LLM padrão (opcional)
COPILOT_MODEL=gpt-5.3-codex

# URL do Design System (opcional)
URL_DS=https://hmg-ds.dmcview...
```

### Configuração do OpenCode

O arquivo `opencode.jsonc` já está configurado com:

```json
{
  "plugin": [
    ".opencode/plugins/mcp-frontend-auth.ts",
    ".opencode/plugins/mcp-frontend.ts"
  ],
  "command": {
    "mcp-frontend": { ... },
    "figma-to-vue": { ... },
    "svg-to-vue": { ... }
  }
}
```

## Diferenças entre CLI e Plugin

### CLI Interativo (modo antigo)

```bash
node dist/mcp-frontend.cjs
# → Menu interativo
# → Solicita escolhas do usuário
# → OAuth Device Flow para autenticação
# → Não integrável programaticamente
```

### Plugin OpenCode (modo novo)

```typescript
// OpenCode chama diretamente:
await tools["mcp-generate-from-figma"]({
  figmaUrl: "...",
  useDesignSystem: true
});
// → Execução automática
// → Usa tokens do ambiente
// → Totalmente programático
// → Integrado ao contexto do OpenCode
```

## Benefícios

### Para o Usuário

- ✅ **Sem login separado**: Usa credenciais já configuradas no OpenCode
- ✅ **Mais rápido**: Sem menus interativos
- ✅ **Contexto preservado**: OpenCode entende o que foi gerado
- ✅ **Iteração fácil**: "Refine este componente" funciona naturalmente

### Para o OpenCode

- ✅ **Controle total**: Pode invocar ferramentas quando necessário
- ✅ **Visibilidade**: Vê arquivos gerados e pode editá-los
- ✅ **Composabilidade**: Pode combinar com outras tools
- ✅ **Feedback**: Recebe progresso via logs estruturados

## Segurança

### Proteções Implementadas

1. **Secrets protegidos**: 
   - Não permite leitura de `~/.mcp-frontend/secrets.json`
   - Avisa sobre leitura de `.copilot/auth.json`

2. **Tokens compartilhados com segurança**:
   - Via variáveis de ambiente
   - Via hook `shell.env`
   - Nunca exposto em logs públicos

3. **Validação de entrada**:
   - URLs do Figma são validadas
   - Caminhos de arquivo são verificados
   - Tokens são obrigatórios para operações

## Exemplos de Uso

### Exemplo 1: Gerar Login Form do Figma

```
Você: Crie um componente de login a partir deste design:
https://www.figma.com/file/xyz789/Login

Use o Design System e chame de LoginForm.

OpenCode: [Invoca mcp-generate-from-figma]
→ Baixa SVGs do Figma
→ Extrai cores e tokens
→ Gera LoginForm.vue com componentes do DS
→ Salva em output/LoginForm.vue

✅ Componente gerado em output/LoginForm.vue
```

### Exemplo 2: Iterar sobre componente gerado

```
Você: Adicione validação de email no LoginForm

OpenCode: [Edita output/LoginForm.vue diretamente]
→ Adiciona lógica de validação
→ Usa composable do Vue
→ Mantém fidelidade ao design
```

### Exemplo 3: Múltiplos componentes de uma vez

```
Você: Gere componentes para estas 3 telas do Figma:
- https://figma.com/file/abc/Home
- https://figma.com/file/abc/Profile  
- https://figma.com/file/abc/Settings

OpenCode: [Executa 3 tools em paralelo]
→ Gera Home.vue
→ Gera Profile.vue
→ Gera Settings.vue

✅ 3 componentes gerados em output/
```

## Troubleshooting

### Token do Figma não encontrado

**Erro:**
```
Token do Figma não encontrado. Configure FIGMA_TOKEN no .env
```

**Solução:**
```bash
# Adicione ao .env do projeto
echo "FIGMA_TOKEN=figd_..." >> .env
```

### Build não encontrado

**Erro:**
```
Cannot find module '.../src/api/index.js'
```

**Solução:**
```bash
# Faça o build do projeto
pnpm build
```

### Modelo LLM não disponível

**Erro:**
```
Model 'gpt-5.3-codex' not available
```

**Solução:**
```bash
# Configure modelo alternativo no .env
COPILOT_MODEL=gpt-5-mini
```

## Roadmap

### Próximas Melhorias

- [ ] Suporte a multi-page Figma (gerar múltiplos componentes)
- [ ] Cache inteligente de designs já processados
- [ ] Geração incremental (atualizar apenas o que mudou)
- [ ] Suporte a variantes do Figma
- [ ] Integração com Storybook (gerar stories automaticamente)
- [ ] Preview em tempo real do componente gerado
- [ ] Suporte a animações e transições do Figma

### Possíveis Extensões

- **Plugin para VS Code**: Gerar direto do editor
- **GitHub Action**: Gerar componentes em CI/CD
- **API HTTP**: Expor via REST para outros clientes
- **MCP Server**: Protocolo MCP padrão para integração universal

## Contribuindo

Para adicionar novas funcionalidades ao plugin:

1. Edite `src/api/index.ts` para adicionar lógica core
2. Adicione tool em `.opencode/plugins/mcp-frontend.ts`
3. Atualize schema com `tool.schema.*`
4. Adicione testes em `src/api/*.spec.ts`
5. Execute `pnpm build && pnpm test`

## Suporte

- **Issues**: [GitHub Issues]
- **Discord**: [OpenCode Discord]
- **Docs MCP_Frontend**: Ver `AGENTS.md`
- **Docs OpenCode**: https://opencode.ai/docs/plugins

---

**Versão do Plugin**: 1.0.0  
**Compatível com OpenCode**: 1.14.41+  
**Última atualização**: 2026-05-08
