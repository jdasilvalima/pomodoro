<script setup lang="ts">
import { ref, computed, onUnmounted, onMounted } from 'vue';

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

onMounted (() => {
  getAllTimer();
  // start countdown
})

function getAllTimer() {
  duplicatePomodoroTimer();
  addIntroAndEndPomodoro();
}

function duplicatePomodoroTimer() {
  const timeToAdd = [{min: pomodoro.value.workDuration, sec: 0}, {min: pomodoro.value.breakDuration, sec: 0}];
  for (let i = 0; i < pomodoro.value.repeatTimes; i++) {
    referenceTime.value.push(...timeToAdd);
  }
}

function addIntroAndEndPomodoro() {
  const introductionEndingTime = {min: 0, sec: 5};
  referenceTime.value.unshift(introductionEndingTime);
  referenceTime.value.push(introductionEndingTime);
}

// foreach element in referenceTime.value
// modify timer.value
// countdown of the element 


//setInterval
//onUnmounted(() => clearInterval(interval));
</script>

<template>
  {{ timer.minutesDisplay }} : {{ timer.secondsDisplay }}
</template>