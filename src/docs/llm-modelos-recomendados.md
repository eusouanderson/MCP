# Modelos de LLM Recomendados para Este Projeto

## Contexto do projeto
Este projeto gera somente `<template>` Vue com foco em fidelidade ao Figma/SVG.

O pipeline prioriza:
- obediencia estrita a regras do prompt
- baixa alucinacao (nao inventar componentes/secoes)
- capacidade de lidar com contexto grande (SVG + metadados)
- saida limpa, sem texto fora do codigo

## Recomendacao principal
1. GPT-5.3-Codex (`gpt-5.3-codex`) - recomendado como padrao

Motivos:
- excelente aderencia a instrucoes longas e restritivas
- boa consistencia em tarefas de codegen com temperatura baixa
- boa performance em reconstruir estrutura visual sem inventar UX nova

## Ranking sugerido (qualidade primeiro)
1. GPT-5.3-Codex (`gpt-5.3-codex`) - melhor equilibrio geral
2. GPT-5.4 (`gpt-5.4`) - qualidade muito alta, custo/latencia maiores
3. GPT-5.2-Codex (`gpt-5.2-codex`) - alternativa forte quando 5.3 nao estiver disponivel
4. Claude Sonnet 4.6 (`claude-sonnet-4.6`) - bom fallback cross-vendor
5. Gemini 3.1 Pro (`gemini-3.1-pro-preview`) - bom fallback, exige validacao de aderencia

## Modelos para usar com cautela
- Claude Haiku 4.5 (`claude-haiku-4.5`)
- Gemini 3 Flash (`gemini-3-flash-preview`)
- Grok Code Fast 1 (`grok-code-fast-1`)

Observacao: costumam priorizar velocidade e podem aumentar variacao de output em cenarios de fidelidade visual estrita.

## Configuracao recomendada
Definir o modelo padrao para:
- `COPILOT_MODEL=gpt-5.3-codex`

No projeto, a chamada da LLM ja usa `temperature: 0`, o que ajuda na consistencia.

## Protocolo rapido de validacao de modelo
Antes de trocar o modelo padrao, executar um teste com 5 a 10 SVGs reais e medir:

1. Fidelidade visual
- preservou hierarquia e proporcoes do SVG
- nao inventou blocos/controles

2. Aderencia ao contrato
- retornou somente `<template>`
- nao inseriu markdown ou texto extra

3. Qualidade de Tailwind
- usou `tailwindHints` e tokens quando disponiveis
- nao criou classes aleatorias sem necessidade

4. Estabilidade
- repetiu comportamento consistente em multiplas execucoes

5. Custo e latencia
- comparar tempo medio por geracao
- comparar custo por lote de templates

## Decisao operacional
- Padrao de producao: `gpt-5.3-codex`
- Fallback de alta qualidade: `gpt-5.4`
- Fallback de disponibilidade/custo: `gpt-5.2-codex` ou `claude-sonnet-4.6`

## Quando reconsiderar esse ranking
Reavaliar se houver mudanca significativa em:
- tamanho medio dos SVGs/contexto
- formato do prompt
- metas de custo e throughput
- atualizacoes de modelos na API do Copilot
