<script setup lang="ts">
import { CeBadge } from '@comercti/vue-components';
</script>

<template>
  <section class="w-full max-w-[880px] rounded-xl bg-[#60AB56] px-3 py-3">
    <div class="flex flex-row items-center gap-4">
      <div class="flex h-[82px] w-[82px] items-center justify-center rounded-xl bg-[#074D31]">
        <span class="text-[40px] font-bold leading-none text-[#F3F8E7]">2</span>
      </div>

      <div class="flex flex-1 flex-col justify-center">
        <p class="text-sm font-semibold text-[#1F321D]">Passo de adesão</p>
        <h2 class="text-2xl font-bold text-[#F3F8E7]">Resumo de condições</h2>
      </div>

      <div class="h-[52px] w-px bg-[#004415]/40"></div>

      <div class="flex flex-col items-start gap-2">
        <ce-badge variant="solid" color="success" size="md">Etapa ativa</ce-badge>
        <p class="text-sm font-semibold text-[#1F321D]">Preencha para continuar</p>
      </div>
    </div>
  </section>
</template>
