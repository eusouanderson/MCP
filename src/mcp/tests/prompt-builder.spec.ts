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

  it('serializes SDD data as formatted JSON', () => {
    const context = buildContext({ title: 'My Design', description: 'A test' }, []);
    const prompt = buildPrompt(context);
    expect(prompt).toContain('"title": "My Design"');
    expect(prompt).toContain('"description": "A test"');
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
