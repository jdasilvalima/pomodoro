<script setup lang="ts">
import { ref } from 'vue';
import PomodoroTimer from '@/components/PomodoroTimer.vue';

const blue = 'rgb(209, 252, 252)';
const green = 'rgb(209, 252, 235)';
let modernBackgroundColor = ref<string>(green);

function updateBackgroundColorWithTimer() {
  modernBackgroundColor.value = modernBackgroundColor.value === green ? blue : green;
}

</script>

<template>
  <div class="modern-timer" :style="'background-color:' + modernBackgroundColor">
    <div class="timer-display">
      <PomodoroTimer @updatedIndexTimer="updateBackgroundColorWithTimer"/>
    </div>
  </div>
</template>

<style>

.modern-timer {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timer-display {
  font-size: 10rem;
  font-family: monospace, sans-serif;
}
</style>