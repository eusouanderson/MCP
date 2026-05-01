<template>
<div class="inline-flex flex-col bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-[222px]">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <button
        @click="previousMonth"
        class="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors"
        aria-label="Mês anterior"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 1L1.5 6L6.5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <span class="text-sm font-medium text-gray-900">{{ currentMonthYear }}</span>
      
      <button
        @click="nextMonth"
        class="w-6 h-6 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors"
        aria-label="Próximo mês"
      >
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 11L6.5 6L1.5 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Weekday Headers -->
    <div class="grid grid-cols-7 gap-0 px-2 py-2 bg-gray-50 border-b border-gray-200">
      <div
        v-for="day in weekDays"
        :key="day"
        class="text-xs font-medium text-gray-600 text-center py-1"
      >
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-0 p-2">
      <button
        v-for="(day, index) in calendarDays"
        :key="index"
        @click="selectDate(day)"
        :disabled="!day.currentMonth"
        :class="[
          'h-8 w-8 flex items-center justify-center text-sm rounded-full transition-all',
          day.isToday && !day.isSelected ? 'bg-gray-100 text-gray-900 font-medium' : '',
          day.isSelected ? 'bg-green-600 text-white font-medium hover:bg-green-700' : '',
          !day.isSelected && day.currentMonth ? 'text-gray-900 hover:bg-gray-100' : '',
          !day.currentMonth ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'
        ]"
      >
        {{ day.date }}
      </button>
    </div>

    <!-- Footer Actions -->
    <div class="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
      <button
        @click="clearSelection"
        class="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
      >
        Limpar
      </button>
      <button
        @click="confirmSelection"
        class="px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition-colors"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const currentDate = ref(new Date())
const selectedDate = ref(new Date())

const currentMonthYear = computed(() => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  return `${months[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const prevLastDay = new Date(year, month, 0)
  
  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Previous month days
  const firstDayOfWeek = firstDay.getDay()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevLastDay.getDate() - i
    days.push({
      date,
      currentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const currentDay = new Date(year, month, i)
    currentDay.setHours(0, 0, 0, 0)
    
    const isToday = currentDay.getTime() === today.getTime()
    const isSelected = selectedDate.value && 
      currentDay.getTime() === new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), selectedDate.value.getDate()).getTime()
    
    days.push({
      date: i,
      currentMonth: true,
      isToday,
      isSelected
    })
  }
  
  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
      isToday: false,
      isSelected: false
    })
  }
  
  return days
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (day) => {
  if (!day.currentMonth) return
  
  selectedDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    day.date
  )
}

const clearSelection = () => {
  selectedDate.value = null
}

const confirmSelection = () => {
  // Emitir evento ou callback com a data selecionada
  console.log('Data selecionada:', selectedDate.value)
}
</script>
