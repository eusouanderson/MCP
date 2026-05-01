# Documentação do MCP CLI

## Visão Geral

O MCP CLI (Interface de Linha de Comando do Protocolo de Contexto do Modelo) é uma ferramenta que gera templates Vue personalizados a partir de definições de design (SDD) e arquivos SVG. Ele integra inteligência artificial para criar componentes de interface de usuário automaticamente.

---

## Menu Principal

Ao executar o MCP CLI, você verá um menu interativo com as seguintes opções:

### 1. Gerar Template Vue
**Função Principal:** Fluxo completo para gerar templates Vue

Este é o comando mais usado. Permite que você:
- Escolha a fonte do SVG (local ou Figma)
- Configure a IA (se necessário)
- Gere um template Vue personalizado com componentes automáticos

### 2. Configurar IA
**Função:** Ajustar o modelo de IA padrão

Selecione o modelo de inteligência artificial que será usado para gerar seus templates. O modelo padrão é `gpt-5-mini`.

**Modelos disponíveis com capacidades:**
- Modelos com reasoning (raciocínio avançado)
- Modelos com vision (análise de imagens)

### 3. Configurar Tokens e Segredos
**Função:** Gerenciar credenciais de autenticação

Configure os tokens necessários para acessar serviços externos:
- **FIGMA_TOKEN:** Token para baixar SVGs diretamente do Figma

### 4. Configurar Tudo
**Função:** Configuração completa em uma passagem

Executa toda a configuração necessária:
1. Seleciona o modelo de IA
2. Configura os tokens de autenticação

### 5. Sair
**Função:** Encerra o CLI

---

## Como Usar

### Instalação

```bash
# Instalar dependências
pnpm install

# Gerar executável para Linux
pnpm run pkg:linux
```

### Executar o CLI

```bash
# Modo interativo
node dist/mcp-frontend.cjs

# Ou com npm/pnpm
pnpm run dev
```

### Argumentos da Linha de Comando

Você pode especificar o diretório de saída sem usar o menu interativo:

```bash
# Usando --output com =
pnpm run dev --output=/caminho/para/saida

# Usando -o
pnpm run dev -o /caminho/para/saida

# Usando como argumento posicional
pnpm run dev /caminho/para/saida
```

Se não especificar um caminho, o padrão é `output/` no diretório atual.

---

## Fluxo de Geração (Passo a Passo)

Quando você escolhe "Gerar Template Vue", o CLI executa estes passos:

1. **Autenticação Copilot:** Valida e estabelece conexão com o Copilot
2. **Seleção de Origem:** Escolha entre SVG local ou Figma
3. **Seleção do Arquivo:** Escolha qual SVG usar
4. **Confirmação:** Revise as configurações:
   - Diretório de saída
   - Modelo de IA
   - Fonte do SVG
   - Arquivo SVG selecionado
5. **Processamento:**
   - Leitura do SDD (System Design Definition)
   - Processamento do arquivo SVG
   - Construção do contexto do design
   - Geração do prompt para IA
   - Chamada ao modelo de IA
   - Salvamento do template Vue resultante

---

## Fontes de SVG

### SVG Local
Coloque arquivos SVG na pasta `src/svg/` do projeto e o CLI listará automaticamente:

```
projeto/
├── src/
│   └── svg/
│       ├── botoes.svg
│       ├── cards.svg
│       └── formulario.svg
```

### SVG do Figma
Cole um link do Figma e o CLI fará o download automaticamente dos arquivos necessários.

---

## Autenticação

### Copilot (Automático)
A autenticação do Copilot é feita automaticamente na primeira execução usando **OAuth Device Code Flow**:

1. O CLI exibe um código de dispositivo
2. Você autoriza o acesso em seu navegador
3. O token é salvo automaticamente

Não há necessidade de gerenciar tokens manualmente.

### Figma (Manual)
Se usar SVGs do Figma, você precisa configurar manualmente:

**Como obter o FIGMA_TOKEN:**
1. Acesse: https://www.figma.com/developers/api#auth-token
2. Gere um novo token pessoal
3. Configure no menu: "Configurar tokens e segredos"

### Onde os Dados São Salvos

- **Copilot:** `~/.copilot/auth.json` (token + refresh token automáticos)
- **Figma:** `.env` em desenvolvimento ou `~/.mcp-frontend/secrets.json` em produção

---

## Exemplos de Uso

### Exemplo 1: Gerar com SVG Local

```
1. Execute: pnpm run dev
2. Menu → "Gerar template Vue"
3. Escolha: "Usar SVG local"
4. Selecione: seu arquivo SVG da pasta src/svg
5. Confirme as configurações
6. Arquivo Vue gerado em: output/generated-template.vue
```

### Exemplo 2: Gerar com Figma

```
1. Execute: pnpm run dev
2. Menu → "Gerar template Vue"
3. Escolha: "Baixar de um link do Figma"
4. Cole: seu link compartilhado do Figma
5. Selecione: qual SVG usar
6. Confirme as configurações
7. Arquivo Vue gerado em: output/generated-template.vue
```

### Exemplo 3: Usar Argumento de Saída

```bash
pnpm run dev --output=./meus-templates
# Template será salvo em: ./meus-templates/generated-template.vue
```

---

## Solução de Problemas

### "Token do Figma não encontrado"
**Solução:** Configure o token usando a opção "Configurar tokens e segredos" no menu.

### "Nenhum arquivo .svg encontrado"
**Solução:** Adicione arquivos SVG na pasta `src/svg/` e execute novamente.

### "Copilot não autenticado"
**Solução:** O CLI pedirá autenticação automaticamente na primeira execução. Siga as instruções na tela.

### "Falha ao gerar template"
**Solução:**
- Verifique se o arquivo SDD existe em `src/docs/sdd.json`
- Confirme que seu SVG é válido
- Tente usar um modelo de IA diferente

### Erro de Permissão
**Solução:** Certifique-se de ter permissão de escrita no diretório de saída.

---

## Configuração Recomendada

Para primeira execução:

1. Execute: `pnpm run dev`
2. Escolha: "Configurar tudo antes de gerar"
3. Selecione seu modelo de IA preferido
4. Configure seus tokens
5. Comece a gerar!

---

## Dicas e Boas Práticas

- ✅ Configure todos os tokens antecipadamente usando "Configurar tudo"
- ✅ Mantenha seus arquivos SDD atualizados
- ✅ Use SVGs bem estruturados para melhores resultados
- ✅ Revise o template gerado antes de usar em produção
- ❌ Não compartilhe seus tokens em repositórios públicos
- ❌ Não modifique o arquivo de segredos manualmente

---

## Saída Esperada

O CLI gera um arquivo Vue estruturado em:
```
output/
└── generated-template.vue
```

Este arquivo contém:
- Componentes baseados em seu design
- Estrutura Vue 3 completa
- Estilos automáticos
- Props e eventos configurados

---

## Suporte Adicional

Para mais informações sobre o projeto, consulte:
- README.md
- Documentação do Design System
- Repositório do Figma API
