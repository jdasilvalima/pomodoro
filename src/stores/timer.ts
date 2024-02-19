import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  const pomodoro = ref({
    workDuration: 25,
    breakDuration: 5,
    repeatTimes: 2
  });

  return { pomodoro }
})
