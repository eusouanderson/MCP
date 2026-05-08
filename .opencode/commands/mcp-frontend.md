---
description: Gera templates Vue 3 a partir de designs do Figma
---

Vou executar o MCP_Frontend CLI para gerar um template Vue a partir de um design do Figma.

O CLI é interativo e irá guiá-lo através do processo:
1. Escolher fonte (SVG local ou Figma URL)
2. Configurar opções de geração
3. Decidir sobre uso do Design System

Executando o CLI:
!`node dist/mcp-frontend.cjs`

Após a conclusão, os arquivos gerados estarão em:
- Templates Vue: output/
- SVGs processados: src/svg/
- Metadados Figma: src/svg/*.figma.json
