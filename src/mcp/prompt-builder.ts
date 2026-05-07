import { McpContext } from './context-builder.js';
import { DsComponentRef } from './interfaces.js';

const FIXED_OUTPUT_RULES = [
  '1. Retorne APENAS o codigo Vue puro, sem markdown, sem blocos de codigo (sem ```), sem texto explicativo.',
  '2. O componente deve conter SOMENTE a secao <template>. Nao gere <script setup>, <script> ou <style>.',
  '3. Todo comportamento deve ser representado apenas na estrutura do template. Evite referencias a estado, funcoes ou bindings que exigiriam script.',
  '4. Use HTML semantico (button, input, section, header, nav, article, ul, li, form, etc.).',
  '5. Use diretivas Vue quando fizer sentido (v-if, v-for, :class, @click, v-model).',
  '6. Use EXCLUSIVAMENTE TailwindCSS para estilizacao. PROIBIDO: style inline, CSS customizado, bloco <style>.',
  '7. PROIBIDO: <img> apontando para o SVG, import do arquivo SVG.',
];

const FIXED_OUTPUT_RULES_WITH_DS = [
  '1. Retorne APENAS o codigo Vue puro, sem markdown, sem blocos de codigo (sem ```), sem texto explicativo.',
  '2. O componente deve conter a secao <template> e, quando usar componentes do design system, tambem uma secao <script setup lang="ts"> com os imports necessarios.',
  '3. Gere o <script setup lang="ts"> ANTES do <template>.',
  '4. No <script setup>, importe SOMENTE os componentes do design system que foram realmente usados no template.',
  '5. Importe componentes de formulario e visuais de "@comercti/vue-components". Importe icones de "@comercti/icons-hmg".',
  '6. Use diretivas Vue quando fizer sentido (v-if, v-for, :class, @click, v-model).',
  '7. Use TailwindCSS para estilizacao complementar. PROIBIDO: style inline, CSS customizado, bloco <style>.',
  '8. PROIBIDO: <img> apontando para o SVG, import do arquivo SVG.',
  '9. Com design system ativo, NAO retorne o SVG bruto inteiro como resultado final. Use o SVG apenas como referencia visual para montar estrutura semantica com componentes DS.',
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

const ASSET_INTERPRETATION_RULES_WITH_DS = [
  '1. "tailwindHints": conjunto de classes geradas deterministicamente a partir dos dados reais do Figma. PRIORIZE estas classes no output.',
  '2. "designTokens": mapeamento de tokens globais do projeto Figma para classes Tailwind. Quando presente, use essas classes como primeira opcao antes de gerar classes ad-hoc.',
  '3. "svgContentForLlm" e "svgSummary" sao referencia visual para extrair hierarquia, espacamentos, textos e tipos de controle.',
  '4. Nao copie o SVG bruto inteiro para o output final quando DS estiver ativo; converta para estrutura semantica com componentes DS.',
  '5. Preserve ao maximo semantica e ordem visual do Figma (cabecalho, campos, acoes, rodape) sem reinterpretar o layout.',
  '6. "designInfo.texts": textos reais extraidos do SVG. Use-os como conteudo literal dos elementos/componentes.',
  '7. "designInfo.layout": HORIZONTAL = flex flex-row | VERTICAL = flex flex-col.',
  '8. "designInfo.typography": mapeie fontSize/fontWeight para classes Tailwind (text-sm, text-lg, font-bold, etc.).',
  '9. Nao gerar placeholders genericos. Se faltar informacao, use os dados presentes no contexto (cores, textos, dimensoes) antes de inferir.',
  '10. Nao invente classes aleatorias se "tailwindHints" fornecer classes candidatas.',
];

const DS_USAGE_RULES = [
  '1. Use componentes do design system (@comercti/vue-components) em vez de elementos HTML nativos sempre que existir um componente equivalente.',
  '2. Para campos de texto/input, use <Ceinput> em vez de <input>.',
  '3. Para botoes, use <CeButton> em vez de <button>.',
  '4. Para select/dropdown, use <CeSelectField> ou <CeDropdown> em vez de <select>.',
  '5. Para textarea, use <CeTextarea> em vez de <textarea>.',
  '6. Para checkbox, use <CeCheckboxField> em vez de <input type="checkbox">.',
  '7. Para icones, use <CeSvgIcon :icon="nomeDoIcone" /> (icones de @comercti/icons-hmg).',
  '8. Passe props de forma declarativa. Ex: <Ceinput label="Nome" placeholder="Digite..." v-model="valor" />.',
  '9. Se um componente do DS nao se encaixa bem, use o elemento HTML nativo com TailwindCSS.',
  '10. NAO invente nomes de componentes: use APENAS os listados na secao "Design System disponivel".',
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

const buildDsSection = (dsComponents: DsComponentRef[]): string => {
  if (dsComponents.length === 0) return '';

  const lines = dsComponents.map(
    (c) =>
      `- <${c.componentName}> (tag: <${c.tagName}>) — ${c.description}\n  Props: ${c.props.replace(/\n/g, ' ').slice(0, 300)}`
  );

  return `\nDesign System disponivel (@comercti/vue-components):\n${lines.join('\n')}\n`;
};

const buildPrompt = (context: McpContext): string => {
  const goal = getGoal(context);
  const componentContext = getSerializableSection(context, 'componentContext');
  const workspaceContext = getSerializableSection(context, 'workspaceContext');
  const additionalInstructions = getAdditionalLlmInstructions(context);
  const assetsContext = buildAssetsContext(context);
  const hasDs = Array.isArray(context.dsComponents) && context.dsComponents.length > 0;

  const outputRules = hasDs ? FIXED_OUTPUT_RULES_WITH_DS : FIXED_OUTPUT_RULES;
  const assetRules = hasDs ? ASSET_INTERPRETATION_RULES_WITH_DS : ASSET_INTERPRETATION_RULES;

  const additionalInstructionsSection =
    additionalInstructions.length > 0
      ? `\nInstrucoes adicionais do projeto para esta geracao:\n${additionalInstructions
          .map((instruction, index) => `- ${index + 1}. ${instruction}`)
          .join('\n')}\n`
      : '';

  const dsSection = hasDs ? buildDsSection(context.dsComponents!) : '';
  const dsRulesSection = hasDs
    ? `\nRegras para uso do design system:\n${formatNumberedList(DS_USAGE_RULES)}\n`
    : '';

  const outputFormatSection = hasDs
    ? `Formato de saida esperado (exatamente assim, sem nada antes ou depois):
<script setup lang="ts">
import { CeButton, Ceinput } from '@comercti/vue-components'
// ... somente os imports dos componentes usados
</script>
<template>
  ...
</template>`
    : `Formato de saida esperado (exatamente assim, sem nada antes ou depois):
<template>
  ...
</template>`;

  return `
Voce e um especialista em Vue 3 e geracao de componentes para frontend.

Sua tarefa e gerar um template Vue fiel ao Figma, usando o SVG como FONTE DE VERDADE.

Objetivo da geracao:
${goal ?? 'Gerar somente o template Vue com base no SVG e no contexto visual do componente.'}

Regras obrigatorias:
${formatNumberedList(outputRules)}

Regras de fidelidade ao Figma:
${formatNumberedList(FIGMA_FIDELITY_RULES)}
${dsRulesSection}
Como interpretar os dados do asset para gerar o componente:
${formatNumberedList(assetRules)}
${dsSection}
${outputFormatSection}
${additionalInstructionsSection}
${formatJsonSection('Contexto do componente', componentContext)}${formatJsonSection('Contexto do workspace', workspaceContext)}
Contexto de assets e metadados:
${JSON.stringify(assetsContext, null, 2)}
`;
};

export { buildPrompt };
