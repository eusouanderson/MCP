---
description: Gera template Vue do Figma com URL
---

Vou gerar um template Vue 3 a partir do design do Figma: $ARGUMENTS

Primeiro, vou verificar se o projeto está configurado:
!`test -f .env && echo "✓ .env encontrado" || echo "⚠ .env não encontrado - será necessário configurar tokens"`

!`test -f dist/mcp-frontend.cjs && echo "✓ Build encontrado" || echo "⚠ Build não encontrado - execute: pnpm build"`

Agora vou processar o design do Figma usando o MCP_Frontend CLI.

**Instruções**:
- O CLI baixará o design do Figma
- Você poderá escolher usar o Design System (@comercti/vue-components)
- O template será gerado em output/

URL do Figma: $ARGUMENTS
