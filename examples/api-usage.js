/**
 * Exemplo de uso programático da API do MCP_Frontend
 * 
 * Este arquivo demonstra como usar a API não-interativa
 * que o plugin do OpenCode utiliza internamente.
 */

import { generateFromFigma, generateFromLocalSvg } from './src/api/index.js';

async function exemploFigma() {
  console.log('=== Exemplo: Gerar do Figma ===\n');
  
  const result = await generateFromFigma({
    figmaUrl: 'https://www.figma.com/file/exemplo/Design',
    figmaToken: process.env.FIGMA_TOKEN || '',
    outputDir: './output',
    outputFileName: 'ExemploComponente',
    useDesignSystem: true,
    llmModel: 'gpt-5.3-codex',
    onProgress: (msg) => console.log(`[Progress] ${msg}`)
  });
  
  if (result.success) {
    console.log('\n✅ Sucesso!');
    console.log(`Arquivo gerado: ${result.outputFilePath}`);
  } else {
    console.error('\n❌ Erro:', result.error);
  }
}

async function exemploSvgLocal() {
  console.log('=== Exemplo: Gerar de SVG local ===\n');
  
  const result = await generateFromLocalSvg({
    svgFilePath: './src/svg/example.svg',
    outputDir: './output',
    outputFileName: 'ExemploSvg',
    useDesignSystem: false,
    onProgress: (msg) => console.log(`[Progress] ${msg}`)
  });
  
  if (result.success) {
    console.log('\n✅ Sucesso!');
    console.log(`Arquivo gerado: ${result.outputFilePath}`);
  } else {
    console.error('\n❌ Erro:', result.error);
  }
}

// Executar exemplos
async function main() {
  const modo = process.argv[2] || 'svg';
  
  try {
    if (modo === 'figma') {
      await exemploFigma();
    } else if (modo === 'svg') {
      await exemploSvgLocal();
    } else {
      console.log('Uso: node examples/api-usage.js [figma|svg]');
    }
  } catch (error) {
    console.error('Erro fatal:', error);
    process.exit(1);
  }
}

main();
