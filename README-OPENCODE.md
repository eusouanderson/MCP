# Integração MCP_Frontend + OpenCode

Este documento explica como usar o MCP_Frontend integrado ao OpenCode.

## 🎯 O que foi implementado

A integração permite que o OpenCode use o MCP_Frontend CLI para gerar templates Vue 3 a partir de designs do Figma. A implementação foi feita via **comando personalizado**, que é a forma mais simples e direta de integração.

## 📁 Arquivos Criados

1. **`opencode.jsonc`** - Configuração do OpenCode com o comando `/mcp-frontend`
2. **`AGENTS.md`** - Instruções para o agente do OpenCode sobre quando e como usar a ferramenta

## 🚀 Como Usar

### Opção 1: Comando Manual

No OpenCode, você pode executar o comando manualmente:

```
/mcp-frontend
```

Isso irá iniciar o CLI interativo do MCP_Frontend, onde você poderá:
1. Escolher entre SVG local ou Figma
2. Configurar opções de geração
3. Gerar o template Vue

### Opção 2: Uso Automático pelo OpenCode

O OpenCode foi configurado para reconhecer automaticamente quando você precisa gerar templates Vue a partir do Figma. Exemplos de prompts que acionam a sugestão:

```
Preciso criar um componente Vue a partir deste design do Figma:
https://www.figma.com/file/abc123/Design
```

```
Gere um template Vue que siga exatamente este layout do Figma
```

```
Converta este SVG em um componente Vue usando @comercti/vue-components
```

O OpenCode irá sugerir o uso do comando `/mcp-frontend` quando detectar estas situações.

## 🛠️ Configuração Inicial

### 1. Build do MCP_Frontend

Certifique-se de que o projeto está buildado:

```bash
pnpm build
```

Isso criará o executável em `dist/mcp-frontend.cjs`.

### 2. Variáveis de Ambiente

Configure o arquivo `.env` com seus tokens:

```bash
FIGMA_TOKEN=figd_...              # Token de acesso do Figma
COPILOT_MODEL=gpt-5.3-codex       # Modelo LLM padrão
COPILOT_TOKEN=ghu_...             # Token estático do Copilot (opcional)
URL_DS=https://hmg-ds.dmcview...  # URL do Design System
```

Para obter o token do Figma:
1. Acesse https://www.figma.com/developers
2. Vá em "Personal access tokens"
3. Gere um novo token com permissões de leitura

### 3. Inicialize o OpenCode no Projeto

No diretório do projeto, execute:

```bash
opencode
```

Depois, inicialize o projeto:

```
/init
```

Isso fará com que o OpenCode leia o arquivo `AGENTS.md` e configure a integração.

## 📋 Workflow Completo

### Exemplo: Gerar Template Vue do Figma

1. **Inicie o OpenCode**:
   ```bash
   cd /path/to/MCP_Frontend
   opencode
   ```

2. **Execute o comando**:
   ```
   /mcp-frontend
   ```

3. **No CLI interativo**:
   - Escolha "Gerar template Vue"
   - Selecione fonte: "Baixar de um link do Figma"
   - Cole a URL do Figma
   - Escolha se deseja usar Design System
   - Aguarde a geração

4. **Resultado**:
   - Template Vue gerado em `output/`
   - SVGs processados em `src/svg/`
   - Metadados salvos em `src/svg/*.figma.json`

### Exemplo: Converter SVG Local

1. **Adicione seu SVG**:
   - Coloque o arquivo SVG em `src/svg/`

2. **Execute o comando no OpenCode**:
   ```
   /mcp-frontend
   ```

3. **No CLI**:
   - Escolha "Gerar template Vue"
   - Selecione fonte: "Usar SVG local da pasta src/svg"
   - Selecione o arquivo SVG
   - Configure opções de geração

## 🔧 Troubleshooting

### Comando não encontrado

Se o OpenCode não reconhecer o comando `/mcp-frontend`:

1. Verifique se o arquivo `opencode.jsonc` existe no diretório do projeto
2. Reinicie o OpenCode
3. Execute `/init` novamente

### Token do Figma inválido

Se receber erro 403 do Figma:

1. O CLI oferecerá opção de informar novo token
2. Token será persistido automaticamente

### Autenticação Copilot

Se não houver token estático do Copilot:

1. CLI iniciará OAuth Device Flow automaticamente
2. Abrirá navegador para autorização
3. Tokens serão salvos em `.copilot/auth.json`

### Erros de Build

Se o executável não funcionar:

```bash
# Limpe e rebuilde
pnpm clean
pnpm build

# Teste diretamente
node dist/mcp-frontend.cjs
```

## 🎨 Casos de Uso

### 1. Design System

Gere componentes usando `@comercti/vue-components`:

```
/mcp-frontend
```

No CLI, escolha "Sim" quando perguntado sobre usar Design System.

**Resultado**: Template com imports como:
```vue
<script setup lang="ts">
import { Button, Input, Icon } from '@comercti/vue-components';
</script>
```

### 2. Template-only

Gere apenas HTML + Tailwind:

```
/mcp-frontend
```

No CLI, escolha "Não" para Design System.

**Resultado**: Template puro com classes Tailwind:
```vue
<template>
  <div class="flex items-center justify-between p-4">
    <!-- HTML estruturado -->
  </div>
</template>
```

### 3. Batch Processing

Para processar múltiplos designs, você pode usar o comando várias vezes:

```
/mcp-frontend
```

Cada execução gerará um novo arquivo em `output/`.

## 🚧 Limitações Atuais

1. **Interatividade**: O comando executa o CLI completo (interativo)
   - **Solução futura**: Adicionar flags CLI para modo não-interativo

2. **Sem integração MCP nativa**: Não usa protocolo MCP padrão
   - **Solução futura**: Implementar como MCP server local

3. **Executa fora do contexto do OpenCode**: O CLI usa seu próprio provider LLM
   - **Solução futura**: Permitir que use o provider do OpenCode

## 🔮 Próximas Melhorias

### Curto Prazo

1. **Flags CLI não-interativas**:
   ```bash
   mcp-frontend --figma-url="..." --output="..." --design-system
   ```

2. **Comando com parâmetros no OpenCode**:
   ```
   /mcp-frontend --figma-url https://figma.com/file/...
   ```

### Médio Prazo

3. **MCP Server Local**:
   - Implementar protocolo MCP padrão
   - Expor ferramentas via stdio
   - Integração nativa no OpenCode

4. **Skill Automático**:
   - Skill que detecta URLs do Figma automaticamente
   - Gera templates sem comando manual

### Longo Prazo

5. **MCP Server Remoto**:
   - Servidor HTTP com protocolo MCP
   - Autenticação OAuth
   - Múltiplos usuários

6. **Integração Bidirecional**:
   - MCP_Frontend usa OpenCode como provider
   - Compartilha contexto e histórico

## 📚 Recursos Adicionais

- **Documentação Figma API**: https://www.figma.com/developers/api
- **Documentação OpenCode**: https://opencode.ai/docs
- **Documentação MCP**: https://modelcontextprotocol.io
- **Design System**: https://hmg-ds.dmcview.com.br/components/

## 🤝 Contribuindo

Para melhorar a integração:

1. Adicione novos comandos em `opencode.jsonc`
2. Atualize `AGENTS.md` com novas instruções
3. Documente casos de uso neste README
4. Teste e reporte issues

## 📝 Notas

- O comando `/mcp-frontend` é um atalho para executar o CLI buildado
- Todos os arquivos gerados ficam em `output/`
- SVGs processados ficam em `src/svg/`
- Metadados do Figma são salvos em `src/svg/*.figma.json`
- O OpenCode pode sugerir o uso do comando automaticamente quando detectar contexto apropriado

---

**Status**: ✅ Integração funcional via comando personalizado

**Última atualização**: 08/05/2026
