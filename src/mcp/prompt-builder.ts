import { McpContext } from './context-builder.js';

const FIXED_OUTPUT_RULES = [
  '1. Retorne APENAS o codigo Vue puro, sem markdown, sem blocos de codigo (sem ```), sem texto explicativo.',
  '2. O componente deve conter SOMENTE a secao <template>. Nao gere <script setup>, <script> ou <style>.',
  '3. Todo comportamento deve ser representado apenas na estrutura do template. Evite referencias a estado, funcoes ou bindings que exigiriam script.',
  '4. Use HTML semantico (button, input, section, header, nav, article, ul, li, form, etc.).',
  '5. Use diretivas Vue quando fizer sentido (v-if, v-for, :class, @click, v-model).',
  '6. Use EXCLUSIVAMENTE TailwindCSS para estilizacao. PROIBIDO: style inline, CSS customizado, bloco <style>.',
  '7. PROIBIDO: <img> apontando para o SVG, import do arquivo SVG.',
];

const FIGMA_FIDELITY_RULES = [
  '1. O SVG do Figma e a fonte de verdade da geracao.',
  '2. Nao reimagine o layout, nao invente secoes novas e nao transforme o componente em outro tipo de interface.',
  '3. Prioridade maxima para fidelidade visual ao SVG do Figma.',
  '4. PROIBIDO: criar elementos, labels, botoes, formularios ou secoes que nao estejam presentes no SVG/contexto.',
  '5. Se faltar dado no contexto, preserve a estrutura minima e nao invente conteudo.',
];

const ASSET_INTERPRETATION_RULES = [
  '1. "tailwindHints": conjunto de classes geradas deterministicamente a partir dos dados reais do Figma. PRIORIZE estas classes no output.',
  '2. "designTokens": mapeamento de tokens globais do projeto Figma para classes Tailwind. Quando presente, use essas classes como primeira opcao antes de gerar classes ad-hoc.',
  '3. "designInfo.styleRefs": IDs reais de estilos do Figma (fill, text, effect). Use esses IDs como referencia para manter consistencia visual entre elementos semelhantes.',
  '4. "svgContentForLlm": quando presente, este e o SVG minificado real. PRIORIDADE MAXIMA.',
  '5. Preserve ao maximo a estrutura visual do SVG.',
  '6. Mantenha o <svg> inline dentro do <template> (sem <img>) e use wrappers minimos.',
  '7. Nao substitua o SVG por uma UI reinterpretada.',
  '8. "svgSummary": fallback quando nao houver "svgContentForLlm". Nesse caso, gere uma estrutura minima e conservadora, sem inventar blocos complexos.',
  '9. "designInfo.texts": textos reais extraidos do SVG. Use-os como conteudo literal dos elementos HTML.',
  '10. "designInfo.layout": HORIZONTAL = flex flex-row | VERTICAL = flex flex-col.',
  '11. "designInfo.typography": mapeie fontSize/fontWeight para classes Tailwind (text-sm, text-lg, font-bold, etc.).',
  '12. Nao gerar placeholders genericos. Se faltar informacao, use os dados presentes no contexto (cores, textos, dimensoes) antes de inferir.',
  '13. Nao invente classes aleatorias se "tailwindHints" fornecer classes candidatas.',
];

const getGoal = (context: McpContext): string | undefined => {
  const goal = context.sdd?.goal;
  return typeof goal === 'string' && goal.trim().length > 0 ? goal.trim() : undefined;
};

const getSerializableSection = (
  context: McpContext,
  key: 'componentContext' | 'workspaceContext'
): Record<string, unknown> | undefined => {
  const value = context.sdd?.[key];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
};

const formatNumberedList = (items: string[]): string => {
  return items.join('\n');
};

const formatJsonSection = (title: string, value?: Record<string, unknown>): string => {
  if (!value) {
    return '';
  }

  return `\n${title}:\n${JSON.stringify(value, null, 2)}\n`;
};

const buildAssetsContext = (context: McpContext): Record<string, unknown> => ({
  assets: context.assets,
  vueAssetHints: context.vueAssetHints,
  metadata: context.metadata,
});

const getAdditionalLlmInstructions = (context: McpContext): string[] => {
  const raw = (context.sdd?.generation as { additionalLlmInstructions?: unknown } | undefined)
    ?.additionalLlmInstructions;

  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
};

const buildPrompt = (context: McpContext): string => {
  const goal = getGoal(context);
  const componentContext = getSerializableSection(context, 'componentContext');
  const workspaceContext = getSerializableSection(context, 'workspaceContext');
  const additionalInstructions = getAdditionalLlmInstructions(context);
  const assetsContext = buildAssetsContext(context);
  const additionalInstructionsSection =
    additionalInstructions.length > 0
      ? `\nInstrucoes adicionais do projeto para esta geracao:\n${additionalInstructions
          .map((instruction, index) => `- ${index + 1}. ${instruction}`)
          .join('\n')}\n`
      : '';

  return `
Voce e um especialista em Vue 3 e geracao de componentes para frontend.

Sua tarefa e gerar um template Vue fiel ao Figma, usando o SVG como FONTE DE VERDADE.

Objetivo da geracao:
${goal ?? 'Gerar somente o template Vue com base no SVG e no contexto visual do componente.'}

Regras obrigatorias:
${formatNumberedList(FIXED_OUTPUT_RULES)}

Regras de fidelidade ao Figma:
${formatNumberedList(FIGMA_FIDELITY_RULES)}

Como interpretar os dados do asset para gerar o componente:
${formatNumberedList(ASSET_INTERPRETATION_RULES)}

Formato de saida esperado (exatamente assim, sem nada antes ou depois):
<template>
  ...
</template>
${additionalInstructionsSection}
${formatJsonSection('Contexto do componente', componentContext)}${formatJsonSection('Contexto do workspace', workspaceContext)}
Contexto de assets e metadados:
${JSON.stringify(assetsContext, null, 2)}
`;
};

export { buildPrompt };
