import { describe, expect, it } from 'vitest';
import { buildContext } from '../context-builder.js';
import { buildPrompt } from '../prompt-builder.js';

describe('buildPrompt', () => {
  it('includes Vue 3 instruction', () => {
    const context = buildContext({ title: 'Test' }, []);
    expect(buildPrompt(context)).toContain('Vue 3');
  });

  it('includes <template> return rule', () => {
    const context = buildContext({}, []);
    expect(buildPrompt(context)).toContain('<template>');
  });

  it('always enforces template-only generation', () => {
    const context = buildContext({}, []);
    const prompt = buildPrompt(context);

    expect(prompt).toContain('SOMENTE a secao <template>');
    expect(prompt).not.toContain('obrigatoriamente as duas secoes');
  });

  it('includes additional LLM instructions from SDD', () => {
    const context = buildContext(
      {
        generation: {
          additionalLlmInstructions: ['Usar nomes de componentes do dominio de adesao'],
        },
      },
      []
    );
    const prompt = buildPrompt(context);

    expect(prompt).toContain('Instrucoes adicionais do projeto para esta geracao');
    expect(prompt).toContain('Usar nomes de componentes do dominio de adesao');
  });

  it('includes component context from SDD in a dedicated section', () => {
    const context = buildContext(
      {
        componentContext: {
          type: 'banner',
          purpose: 'Exibir mensagem institucional',
        },
      },
      []
    );

    const prompt = buildPrompt(context);

    expect(prompt).toContain('Contexto do componente');
    expect(prompt).toContain('"type": "banner"');
    expect(prompt).toContain('"purpose": "Exibir mensagem institucional"');
  });

  it('includes workspace context from SDD in a dedicated section', () => {
    const context = buildContext(
      {
        workspaceContext: {
          projectName: 'mcp-frontend',
          detectedStack: ['Vue 3'],
        },
      },
      []
    );

    const prompt = buildPrompt(context);

    expect(prompt).toContain('Contexto do workspace');
    expect(prompt).toContain('"projectName": "mcp-frontend"');
    expect(prompt).toContain('"detectedStack"');
  });

  it('serializes SDD data as formatted JSON', () => {
    const context = buildContext({ title: 'My Design', description: 'A test' }, []);
    const prompt = buildPrompt(context);
    expect(prompt).toContain('Objetivo da geracao');
    expect(prompt).toContain(
      'Gerar somente o template Vue com base no SVG e no contexto visual do componente.'
    );
  });

  it('includes asset paths in the prompt', () => {
    const context = buildContext({}, [{ name: 'SearchIcon', path: 'src/svg/search.svg' }]);
    const prompt = buildPrompt(context);
    expect(prompt).toContain('src/svg/search.svg');
  });

  it('includes assetsCount in the serialized metadata', () => {
    const context = buildContext({}, [
      { name: 'a', path: 'src/svg/a.svg' },
      { name: 'b', path: 'src/svg/b.svg' },
    ]);
    const prompt = buildPrompt(context);
    expect(prompt).toContain('"assetsCount": 2');
  });

  it('includes DS-specific sections when DS components are available', () => {
    const context = buildContext(
      {
        goal: ' ',
      },
      [],
      [
        {
          componentName: 'CeInput',
          tagName: 'ce-input',
          description: 'Campo de texto',
          props: 'label: string\nmodelValue: string',
          category: 'form',
          endpoint: 'ce-input-field.json',
        },
      ]
    );

    const prompt = buildPrompt(context);

    expect(prompt).toContain('Regras para uso do design system');
    expect(prompt).toContain('Design System disponivel (@comercti/vue-components)');
    expect(prompt).toContain('- tag: <ce-input> | import: CeInput');
    expect(prompt).toContain('Props: label: string modelValue: string');
    expect(prompt).toContain('<script setup lang="ts">');
    expect(prompt).toContain(
      'Gerar somente o template Vue com base no SVG e no contexto visual do componente.'
    );
  });

  it('ignores invalid additional instructions values', () => {
    const context = buildContext(
      {
        generation: {
          additionalLlmInstructions: [null, 123, '', '  ', 'Manter labels originais'],
        },
      } as any,
      []
    );

    const prompt = buildPrompt(context);

    expect(prompt).toContain('Manter labels originais');
    expect(prompt).not.toContain('- 2.');
  });

  it('uses trimmed goal when SDD provides a non-empty value', () => {
    const context = buildContext(
      {
        goal: '  Renderizar card de resumo com fidelidade  ',
      },
      []
    );

    const prompt = buildPrompt(context);

    expect(prompt).toContain('Renderizar card de resumo com fidelidade');
  });

  it('keeps DS section empty when DS array becomes empty during section build', () => {
    const volatileDs = new Proxy([] as any[], {
      get(target, prop, receiver) {
        if (prop === 'length') {
          volatileDs.__reads = (volatileDs.__reads ?? 0) + 1;
          return volatileDs.__reads === 1 ? 1 : 0;
        }
        return Reflect.get(target, prop, receiver);
      },
    }) as any;

    const context = {
      ...buildContext({}, []),
      dsComponents: volatileDs,
    } as any;

    const prompt = buildPrompt(context);

    expect(prompt).toContain('Regras para uso do design system');
    expect(prompt).not.toContain('Design System disponivel (@comercti/vue-components)');
  });
});
