<template>
<div class="flex items-center justify-center gap-3">
    <input
      v-for="(digit, index) in codeDigits"
      :key="index"
      v-model="codeDigits[index]"
      type="text"
      inputmode="numeric"
      maxlength="1"
      class="w-12 h-12 text-center text-lg font-semibold border-2 border-[#D6D6D6] rounded-lg focus:border-[#424242] focus:outline-none transition-colors bg-white text-[#424242]"
      :aria-label="`Dígito ${index + 1} do código de verificação`"
      @input="handleInput(index, $event)"
      @keydown="handleKeydown(index, $event)"
      @paste="handlePaste"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const codeDigits = ref(['', '', '', '', '', ''])

const fullCode = computed(() => codeDigits.value.join(''))

const handleInput = (index, event) => {
  const value = event.target.value
  
  if (!/^\d*$/.test(value)) {
    codeDigits.value[index] = ''
    return
  }
  
  if (value.length > 1) {
    codeDigits.value[index] = value.slice(-1)
  }
  
  if (value && index < codeDigits.value.length - 1) {
    setTimeout(() => {
      const nextInput = document.querySelectorAll('input')[index + 1]
      if (nextInput) nextInput.focus()
    }, 0)
  }
}

const handleKeydown = (index, event) => {
  if (event.key === 'Backspace') {
    if (!codeDigits.value[index] && index > 0) {
      codeDigits.value[index - 1] = ''
      setTimeout(() => {
        const prevInput = document.querySelectorAll('input')[index - 1]
        if (prevInput) prevInput.focus()
      }, 0)
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    document.querySelectorAll('input')[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < codeDigits.value.length - 1) {
    event.preventDefault()
    document.querySelectorAll('input')[index + 1]?.focus()
  }
}

const handlePaste = (event) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text') || ''
  const digits = pastedData.replace(/\D/g, '').slice(0, codeDigits.value.length).split('')
  
  digits.forEach((digit, index) => {
    codeDigits.value[index] = digit
  })
  
  if (digits.length > 0) {
    const focusIndex = Math.min(digits.length, codeDigits.value.length - 1)
    setTimeout(() => {
      document.querySelectorAll('input')[focusIndex]?.focus()
    }, 0)
  }
}

const resetCode = () => {
  codeDigits.value = ['', '', '', '', '', '']
  document.querySelectorAll('input')[0]?.focus()
}

const isComplete = computed(() => codeDigits.value.every(digit => digit !== ''))

defineExpose({
  fullCode,
  codeDigits,
  resetCode,
  isComplete
})
</script>
