<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useTimerStore } from '@/stores/timer';

const timerStore = useTimerStore();

let interval: any;

let timer = ref({
  minutesDisplay: '00',
  secondsDisplay: '00',
});

let referenceTime = ref<{
    min: number;
    sec: number;
  }[]> ([]);

let indexTimer = ref<number>(0);

onMounted (() => {
  getAllTimer();
  startCountDown();
})

function getAllTimer() {
  duplicatePomodoroTimer();
  addIntroAndEndPomodoro();
}

function duplicatePomodoroTimer() {
  const timeToDuplicate = [{min: timerStore.pomodoro.workDuration, sec: 0}, {min: timerStore.pomodoro.breakDuration, sec: 0}];
  for (let i = 0; i < timerStore.pomodoro.repeatTimes; i++) {
    referenceTime.value.push(...timeToDuplicate);
  }
}

function addIntroAndEndPomodoro() {
  const introductionEndingTime = {min: 0, sec: 5};
  referenceTime.value.unshift(introductionEndingTime);
  referenceTime.value.push(introductionEndingTime);
}


function startCountDown() {
  countdown(referenceTime.value[indexTimer.value]);
}

watch(indexTimer, (newValue) => {
  if(newValue <= referenceTime.value.length)
    countdown(referenceTime.value[newValue]);
})

function countdown({ min, sec}: { min: number, sec: number }) {
  let totalSeconds = min * 60 + sec;

  interval = setInterval(() => {
    if (totalSeconds < 0) {
      clearInterval(interval);
      indexTimer.value ++;
      return;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timer.value.minutesDisplay = (minutes < 10 ? '0' + minutes : minutes).toString();
    timer.value.secondsDisplay = (seconds < 10 ? '0' + seconds : seconds).toString();

    totalSeconds--;
  }, 1000);
}

onUnmounted(() => {
  clearInterval(interval);
})
</script>

<template>
  <div class="timer-display">
    {{ timer.minutesDisplay }}:{{ timer.secondsDisplay }}
  </div>
</template>

<style scoped>
</style>