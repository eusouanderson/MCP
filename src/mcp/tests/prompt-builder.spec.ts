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
});
