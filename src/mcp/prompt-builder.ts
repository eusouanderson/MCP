import { McpContext } from './context-builder.js';

const buildPrompt = (context: McpContext): string => {
  return `
Voce e um especialista em Vue 3 e geracao de componentes para frontend.

Sua tarefa e gerar um componente Vue 3 completo e funcional, usando o SVG como REFERENCIA DE DESIGN.

O SVG fornecido e um wireframe ou componente visual. Voce deve interpretar o que ele representa
(botao, card, banner, formulario, lista, stepper, etc.) e gerar o componente Vue equivalente
com HTML semantico e TailwindCSS.

Regras obrigatorias:
1. Retorne APENAS o codigo Vue puro, sem markdown, sem blocos de codigo (sem \`\`\`), sem texto explicativo.
2. O componente deve conter obrigatoriamente as duas secoes: <template> e <script setup>.
3. Declare no <script setup> TODAS as variaveis, refs, computed e funcoes referenciadas no template.
4. Use HTML semantico (button, input, section, header, nav, article, ul, li, form, etc.).
5. Use diretivas Vue quando fizer sentido (v-if, v-for, :class, @click, v-model).
6. Use EXCLUSIVAMENTE TailwindCSS para estilizacao. PROIBIDO: style inline, CSS customizado, bloco <style>.
7. PROIBIDO: <img> apontando para o SVG, import do arquivo SVG.
8. Prioridade: fidelidade visual alta em relacao ao SVG do Figma.

Como interpretar os dados do asset para gerar o componente:
- "tailwindHints": conjunto de classes geradas deterministicamente a partir dos dados reais do Figma. PRIORIZE estas classes no output.
- "designTokens": (modo precisão máxima) mapeamento de tokens globais do projeto Figma para classes Tailwind. Quando presente, use essas classes como primeira opcao antes de gerar classes ad-hoc.
  - "tokenToClassMap": registro de token -> classe. Ex: {'primary-color': 'bg-[#004415]', 'spacing-md': 'p-4'}. Use diretamente.
  - Se um elemento pertencer a um token conhecido (ex: um header com fill = color do token "primary-color"), aplique a classe mapeada.
- "designInfo.styleRefs": IDs reais de estilos do Figma (fill, text, effect). Use esses IDs como referencia para manter consistencia visual entre elementos semelhantes.
- "svgContentForLlm": quando presente, este e o SVG minificado real. Use esse conteudo para reproduzir visualmente o componente com alta fidelidade.
  - Nesse caso, preferencialmente mantenha o <svg> inline dentro do <template> (sem <img>) e envolva com estrutura semantica + classes Tailwind.
  - Se houver textos/interacoes fora do SVG, complemente com HTML semantico.
- "svgSummary": fallback quando nao houver "svgContentForLlm".
- "designInfo.texts": textos reais extraidos do SVG — use-os como conteudo literal dos elementos HTML.
- "designInfo.layout": HORIZONTAL = flex flex-row | VERTICAL = flex flex-col.
- "designInfo.typography": mapeie fontSize/fontWeight para classes Tailwind (text-sm, text-lg, font-bold, etc.).
- Interprete o tipo de componente pelo contexto visual: retangulo largo + textos = banner/header; campos + labels = form; itens repetidos = lista/stepper; icone + numero = stat card.
- Nao gerar placeholders genericos. Se faltar informacao, use os dados presentes no contexto (cores, textos, dimensoes) antes de inferir.
- Nao invente classes aleatorias se "tailwindHints" fornecer classes candidatas.

Exemplos de mapeamento SVG -> componente:
- SVG com banner verde largo + textos brancos -> <section> com background Tailwind + <h1> + <p>
- SVG com steps numerados -> stepper com <ol> e v-for
- SVG com campos de entrada -> <form> com <input> e <label>
- SVG com icone + valor monetario -> stat card com <div> estruturado

Formato de saida esperado (exatamente assim, sem nada antes ou depois):
<template>
  ...
</template>

<script setup>
  ...
</script>

Contexto SDD + Assets:
${JSON.stringify(context, null, 2)}
`;
};

export { buildPrompt };
