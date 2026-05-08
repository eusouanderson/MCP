# MCP_Frontend

Gerador automático de templates Vue 3 de alta fidelidade a partir de designs do Figma.

## 🚀 Uso Rápido

### Com OpenCode (Recomendado)

Este projeto funciona como um **plugin nativo do OpenCode**:

```bash
# Via conversa natural
"Gere um componente Vue deste design: https://figma.com/file/abc"

# Via comandos
/figma-to-vue https://figma.com/file/abc MyComponent
/svg-to-vue src/svg/design.svg MyComponent
```

**Tools disponíveis:**
- `mcp-generate-from-figma` - Gera do Figma
- `mcp-generate-from-svg` - Gera de SVG local

Veja [PLUGIN-OPENCODE.md](./PLUGIN-OPENCODE.md) para documentação completa.

### CLI Standalone

```bash
# Instalar dependências
pnpm install

# Build
pnpm build

# Executar
node dist/mcp-frontend.cjs
```

## 📋 Requisitos

- Node.js 18+
- Token do Figma (para uso com Figma)
- Token do GitHub Copilot (ou OpenCode configurado)

## ⚙️ Configuração

Crie `.env` no projeto:

```bash
FIGMA_TOKEN=figd_...
COPILOT_MODEL=gpt-5.3-codex
URL_DS=https://hmg-ds.dmcview...
```

## 🎯 Funcionalidades

- ✅ Geração de componentes Vue 3 a partir do Figma
- ✅ Extração automática de cores e design tokens
- ✅ Mapeamento para TailwindCSS
- ✅ Suporte a Design System (@comercti/vue-components)
- ✅ Alta fidelidade ao design original
- ✅ Integração nativa com OpenCode

## 📚 Documentação

- [PLUGIN-OPENCODE.md](./PLUGIN-OPENCODE.md) - Guia completo do plugin
- [AGENTS.md](./AGENTS.md) - Guia para agentes de IA
- [INTEGRACAO-COMPLETA.md](./INTEGRACAO-COMPLETA.md) - Documentação técnica

## 🛠️ Desenvolvimento

```bash
# Testes
pnpm test
pnpm test:watch
pnpm test:coverage

# Build
pnpm build

# Packaging
pnpm pkg:linux
```

## 🔧 Stack

- TypeScript 6.x
- Vue 3
- TailwindCSS
- GitHub Copilot API
- Figma API
- esbuild

## 📄 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja [AGENTS.md](./AGENTS.md) para detalhes.
