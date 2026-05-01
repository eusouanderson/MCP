# MCP Frontend CLI

> Gere templates Vue profissionais automaticamente a partir de designs e especificações.

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

---

## 🎯 O que é MCP CLI?

O **MCP Frontend CLI** é uma ferramenta que automatiza a geração de componentes Vue 3 profissionais a partir de:

- 📋 **Especificações de Design System** (SDD - System Design Definition)
- 🎨 **Arquivos SVG** (locais ou do Figma)
- 🤖 **Inteligência Artificial** (Copilot integrado)

Com um simples comando, você obtém um template Vue completo, estruturado e pronto para desenvolvimento.

---

## ✨ Principais Características

- ✅ **Menu Interativo** - Interface amigável para usuários finais
- ✅ **Integração Figma** - Baixe SVGs diretamente do Figma
- ✅ **Autenticação Automática** - OAuth com Copilot (sem tokens para gerenciar)
- ✅ **Geração Inteligente** - Usa IA para criar componentes estruturados
- ✅ **TypeScript Completo** - Tipagem forte em todo o projeto
- ✅ **Arquitetura Modular** - Componentes bem organizados por domínio

---

##  Uso Rápido

### Executar o CLI
```bash
pnpm run dev
```

O menu interativo apresentará as opções:

```
Menu principal
❯ Gerar template Vue          (Fluxo principal)
  Configurar IA               (Escolher modelo)
  Configurar tokens           (FIGMA_TOKEN)
  Configurar tudo             (Setup completo)
  Sair
```

### Exemplo: Gerar um Template

1. **Execute:** `pnpm run dev`
2. **Escolha:** "Gerar template Vue"
3. **Selecione origem:** "Usar SVG local" ou "Baixar de Figma"
4. **Escolha o arquivo:** Selecione seu SVG
5. **Confirme:** Revise as configurações
6. **Pronto!** Seu template Vue está em `output/generated-template.vue`

---

## 📋 Documentação Completa

Para guias detalhados sobre todos os comandos e funcionalidades, consulte:

📖 **[MCP_CLI_Documentation.md](./MCP_CLI_Documentation.md)**

Lá você encontrará:
- ✅ Todos os comandos disponíveis
- ✅ Como usar SVGs locais ou do Figma
- ✅ Fluxo de geração passo a passo
- ✅ Configuração de autenticação
- ✅ Exemplos práticos
- ✅ Solução de problemas

---

## 🔧 Estrutura do Projeto

```
MCP/
├── src/
│   ├── index.ts                 # Entrada principal da CLI
│   ├── animations/              # Efeitos visuais no terminal
│   ├── copilot/                 # Integração com Copilot (OAuth)
│   ├── integrations/            # Figma e SVG upload
│   ├── llm/                     # Cliente de IA
│   ├── mcp/                     # Pipeline de geração
│   ├── ds/                      # Design System
│   └── docs/
│       └── sdd.json             # Especificação de design
├── dist/                        # Output compilado
├── output/                      # Templates gerados
├── scripts/
│   └── sea-build.mjs            # Build executável
└── MCP_CLI_Documentation.md     # Documentação detalhada
```

---

## 📊 Como Funciona o Pipeline

```
┌─────────────────┐
│  Usuário inicia │
└────────┬────────┘
         │
    ┌────▼────┐
    │ OAuth   │ Autenticação automática com Copilot
    │ Copilot │
    └────┬────┘
         │
    ┌────▼────────┐
    │ Escolher    │ SVG local ou Figma
    │ SVG         │
    └────┬────────┘
         │
    ┌────▼──────────────┐
    │ Ler SDD + SVG     │ Especificação de design
    │ + Processar       │
    └────┬──────────────┘
         │
    ┌────▼──────────────┐
    │ Gerar Prompt      │ Contexto completo
    │ para IA           │
    └────┬──────────────┘
         │
    ┌────▼──────────────┐
    │ Chamar LLM        │ Copilot gera template
    │ (Copilot)         │
    └────┬──────────────┘
         │
    ┌────▼──────────────┐
    │ Salvar Vue        │ Template pronto
    │ Template          │
    └────┬──────────────┘
         │
    ┌────▼──────────────┐
    │ ✅ Sucesso!       │ output/generated-template.vue
    └───────────────────┘
```

---

## 🔐 Autenticação

### Copilot (Automático)
- ✅ Primeira execução: Você é redirecionado para autorizar a aplicação
- ✅ Token salvo em: `~/.copilot/auth.json`
- ✅ Renovação automática quando expirar
- **Nenhuma configuração manual necessária!**

### Figma (Se usar)
- Obtenha token em: https://www.figma.com/developers/api#auth-token
- Configure via menu: "Configurar tokens e segredos"

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run dev              # Executar CLI interativo

# Build
pnpm run build            # Compilar para CJS
pnpm run pkg:linux        # Gerar executável para Linux

# Testes
pnpm run test             # Executar testes uma vez
pnpm run test:watch       # Modo watch para testes
pnpm run test:coverage    # Relatório de cobertura

# Limpeza
pnpm run clean            # Remover pasta dist/
```

---

## 📋 Requisitos

### Sistema
- Node.js 18+ 
- npm, pnpm ou yarn
- Linux, macOS ou Windows com WSL

### Opcional
- Conta GitHub para autenticação Copilot (automática)
- Token Figma (apenas se usar integração Figma)

---

## 🎓 Exemplos de Uso

### Exemplo 1: Geração Simples
```bash
# 1. Iniciar
pnpm run dev

# 2. Escolher "Gerar template Vue"
# 3. SVG local → src/svg/
# 4. Confirmar
# ✅ Template gerado em output/
```

### Exemplo 2: Com Diretório Customizado
```bash
pnpm run dev --output=./meus-componentes
# Template salvo em: ./meus-componentes/generated-template.vue
```

### Exemplo 3: Do Figma
```bash
pnpm run dev
# → "Gerar template Vue"
# → "Baixar de Figma"
# → Cole link compartilhado do Figma
# → Selecione qual arquivo usar
# ✅ Pronto!
```

---

## 🐛 Solução de Problemas

### "Copilot não autenticado"
→ Primeira execução requer autorização. Siga as instruções na tela.

### "Nenhum SVG encontrado"
→ Adicione arquivos SVG em `src/svg/` e execute novamente.

### "Erro ao gerar template"
→ Verifique se o arquivo `src/docs/sdd.json` existe e é válido.

### Mais ajuda
Consulte [MCP_CLI_Documentation.md](./MCP_CLI_Documentation.md) para soluções detalhadas.

---

## 🏗️ Stack Tecnológico

| Tecnologia | Uso |
|-----------|-----|
| **Vue 3** | Templates gerados |
| **TypeScript** | Tipagem forte |
| **Vite** | Build do frontend |
| **Pinia** | Estado global |
| **TailwindCSS** | Estilos |
| **Copilot** | IA para geração |
| **Figma API** | Integração com Figma |

---

## 📝 Especificação de Design (SDD)

O projeto usa uma **SDD (System Design Definition)** em `src/docs/sdd.json` que define:

- 📐 Arquitetura do frontend
- 🎨 Padrões de componentes
- 📦 Estrutura de pastas
- 🔄 Fluxo de dados
- 📋 Regras de projeto

Esta especificação é usada pela IA para gerar templates estruturados e consistentes.

---

## 🤝 Contribuindo

Embora este seja um projeto de geração automática, contribuições são bem-vindas!

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a Licença ISC - veja [LICENSE](LICENSE) para detalhes.

---

## 💡 Perguntas Frequentes

**P: Preciso de tokens para começar?**
> Não! Copilot autentica automaticamente. Figma é opcional.

**P: Posso usar meus próprios SVGs?**
> Sim! Coloque em `src/svg/` e o CLI listará automaticamente.

**P: O que é feito na primeira execução?**
> Você autoriza a aplicação no GitHub. Tudo automático!

**P: Os templates podem ser customizados?**
> Sim! O template gerado é um arquivo Vue 3 normal, totalmente editável.

---

## 📞 Suporte

Para dúvidas ou problemas:

1. 📖 Consulte [MCP_CLI_Documentation.md](./MCP_CLI_Documentation.md)
2. 🐛 Abra uma issue com detalhes do problema
3. 💬 Procure documentação na pasta `src/docs/`

---

**Feito com ❤️ para facilitar a geração de frontends profissionais.**
