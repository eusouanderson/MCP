# Guia de Instalação do Plugin OpenCode

## Passo 1: Pré-requisitos

Certifique-se de que você tem:

```bash
# OpenCode instalado
opencode --version

# Node.js 18+
node --version

# pnpm instalado
pnpm --version
```

## Passo 2: Instalar Dependências

```bash
cd /home/eusouanderson/treino/MCP_Frontend
pnpm install
```

## Passo 3: Build do Projeto

```bash
pnpm build
```

Isso gerará:
- `dist/mcp-frontend.cjs` - Bundle do CLI
- `src/api/index.js` - API compilada (usado pelo plugin)

## Passo 4: Configurar Tokens

Crie ou edite o arquivo `.env`:

```bash
# Token do Figma (obrigatório para uso com Figma)
FIGMA_TOKEN=figd_...

# Token do Copilot (opcional, OpenCode pode fornecer)
COPILOT_TOKEN=ghu_...

# Modelo LLM padrão
COPILOT_MODEL=gpt-5.3-codex

# URL do Design System
URL_DS=https://hmg-ds.dmcview...
```

Para obter o token do Figma:
1. Acesse https://www.figma.com/
2. Vá em Settings → Personal Access Tokens
3. Gere um novo token
4. Copie e cole no `.env`

## Passo 5: Instalar Dependências do Plugin

```bash
cd .opencode
bun install
# ou
npm install
```

Isso instalará `@opencode-ai/plugin` necessário para os plugins funcionarem.

## Passo 6: Verificar Instalação

Abra o OpenCode no projeto:

```bash
cd /home/eusouanderson/treino/MCP_Frontend
opencode
```

Verifique se os plugins foram carregados:

```
/help
```

Você deve ver:
- `/mcp-frontend` - Menu de ajuda
- `/figma-to-vue` - Atalho para Figma
- `/svg-to-vue` - Atalho para SVG

## Passo 7: Testar o Plugin

### Teste 1: Via Comando

```
/mcp-frontend
```

Isso deve exibir o menu de ajuda com instruções sobre as tools disponíveis.

### Teste 2: Via Conversa Natural

```
Gere um componente Vue de teste a partir do SVG em src/svg/
```

O OpenCode deve automaticamente invocar a tool `mcp-generate-from-svg`.

### Teste 3: Via Tool Direta (para debugging)

No OpenCode, você pode pedir explicitamente:

```
Use a tool mcp-generate-from-svg com:
- svgFilePath: src/svg/example.svg
- useDesignSystem: false
- outputFileName: TestComponent
```

## Troubleshooting

### Erro: "Cannot find module 'src/api/index.js'"

**Causa**: O projeto não foi buildado.

**Solução**:
```bash
pnpm build
```

### Erro: "Plugin not loaded"

**Causa**: Dependências do plugin não foram instaladas.

**Solução**:
```bash
cd .opencode
bun install
```

### Erro: "Token do Figma não encontrado"

**Causa**: Token não configurado no `.env`.

**Solução**:
```bash
echo "FIGMA_TOKEN=figd_..." >> .env
```

### Plugin carrega mas tools não aparecem

**Causa**: Erro no código do plugin.

**Solução**: Verifique os logs do OpenCode:
```bash
# OpenCode exibe erros de plugin no console
# Procure por linhas com "mcp-frontend-plugin" ou "mcp-frontend-auth"
```

### Erro de TypeScript no plugin

**Causa**: O OpenCode compila TypeScript automaticamente.

**Solução**: Verifique sintaxe em:
- `.opencode/plugins/mcp-frontend.ts`
- `.opencode/plugins/mcp-frontend-auth.ts`

## Testando Sem OpenCode

Você também pode testar a API diretamente:

```bash
# Executar exemplo programático
node examples/api-usage.js svg

# Ou com Figma (se token estiver configurado)
node examples/api-usage.js figma
```

## Próximos Passos

Depois de verificar que tudo funciona:

1. Leia [PLUGIN-OPENCODE.md](../PLUGIN-OPENCODE.md) para casos de uso avançados
2. Experimente gerar componentes reais do seu Figma
3. Itere sobre componentes gerados com o OpenCode
4. Contribua com melhorias!

## Configuração Avançada

### Usar Modelo LLM Diferente

No `.env`:
```bash
COPILOT_MODEL=claude-sonnet-4.6
```

Ou passar na tool:
```
Use mcp-generate-from-figma com:
- figmaUrl: ...
- llmModel: "claude-sonnet-4.6"
```

### Desabilitar Design System

Por padrão, `useDesignSystem` é `false`. Para sempre usar:

Edite `opencode.jsonc`:
```json
{
  "command": {
    "figma-to-vue": {
      "template": "... useDesignSystem: true ..."
    }
  }
}
```

### Debug Verboso

Adicione ao `.env`:
```bash
DEBUG=mcp:*
```

E os logs do plugin aparecerão no OpenCode.

## Verificação Final

Checklist de instalação completa:

- [ ] `pnpm install` executado
- [ ] `pnpm build` executado com sucesso
- [ ] `.env` configurado com FIGMA_TOKEN
- [ ] `.opencode/node_modules/@opencode-ai/plugin` existe
- [ ] `opencode` inicia sem erros
- [ ] `/mcp-frontend` exibe menu de ajuda
- [ ] Tool `mcp-generate-from-svg` funciona

Se todos os itens estão ✅, você está pronto!

---

**Dúvidas?** Veja a documentação completa em [PLUGIN-OPENCODE.md](../PLUGIN-OPENCODE.md)
