<script setup lang="ts">
import { ref, onUnmounted, onMounted, watch } from 'vue';

// will be props
let pomodoro = ref({
  workDuration: 25,
  breakDuration: 5,
  repeatTimes: 2
});

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
  const timeToDuplicate = [{min: pomodoro.value.workDuration, sec: 0}, {min: pomodoro.value.breakDuration, sec: 0}];
  for (let i = 0; i < pomodoro.value.repeatTimes; i++) {
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

  const interval = setInterval(() => {
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

//setInterval
//onUnmounted(() => clearInterval(interval));
</script>

<template>
  {{ timer.minutesDisplay }} : {{ timer.secondsDisplay }}
</template>