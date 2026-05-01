#!/bin/bash
# Teste do loop - pressiona enter (linha vazia) para simular o fluxo
# Escolhe "Sair" para sair do loop

timeout 8 bash << 'STDIN' 2>&1 | head -50
printf '\n4\n' | ./dist/mcp-frontend
STDIN
