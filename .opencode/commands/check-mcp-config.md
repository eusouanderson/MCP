---
description: Verifica configuração do MCP_Frontend
---

Verificando a configuração do MCP_Frontend:

## Status do Build
!`test -f dist/mcp-frontend.cjs && echo "✓ Build encontrado em dist/mcp-frontend.cjs" || echo "✗ Build não encontrado. Execute: pnpm build"`

## Variáveis de Ambiente
!`test -f .env && echo "✓ Arquivo .env encontrado" || echo "✗ Arquivo .env não encontrado"`

Verificando tokens configurados:
!`grep -E "FIGMA_TOKEN|COPILOT_MODEL|URL_DS" .env 2>/dev/null || echo "Nenhum token configurado"`

## Dependências
!`test -f package.json && echo "✓ package.json encontrado" || echo "✗ package.json não encontrado"`

!`test -d node_modules && echo "✓ node_modules instalado" || echo "✗ node_modules não instalado. Execute: pnpm install"`

## Diretórios de Output
!`test -d output && echo "✓ Diretório output/ existe" || echo "ℹ Diretório output/ será criado automaticamente"`

!`test -d src/svg && echo "✓ Diretório src/svg/ existe" || echo "⚠ Diretório src/svg/ não existe"`

## Autenticação Copilot
!`test -f .copilot/auth.json && echo "✓ Credenciais OAuth do Copilot encontradas" || echo "ℹ OAuth do Copilot será iniciado na primeira execução"`

---

**Próximos passos**:
- Se algum item estiver faltando, corrija antes de usar o CLI
- Para gerar templates Vue, use: `/mcp-frontend`
- Para gerar a partir de URL específica, use: `/figma-to-vue URL_AQUI`
