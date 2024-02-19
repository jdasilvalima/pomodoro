<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTimerStore } from '@/stores/timer';

const router = useRouter();
const timerStore = useTimerStore();

const template = ref<string>("/modern");

function handlePomodoro() {
  router.push(template.value);
};
</script>

<template>
  <div class="dashboard">
    <h2>POMODORO DASHBOARD</h2>
  
    <form @submit.prevent="handlePomodoro">
      <div class="input-container">
        <label for="workDuration">Template:</label>
        <select id="workDuration" v-model="template">
          <option value="/modern">Modern</option>
        </select>
      </div>

      <div class="input-container">
        <label for="workDuration">Work Duration:</label>
        <select id="workDuration" v-model="timerStore.pomodoro.workDuration">
          <option value="25">25 minutes</option>
          <option value="45">45 minutes</option>
          <option value="50">50 minutes</option>
        </select>
      </div>
    
      <div class="input-container">
        <label for="breakDuration">Break Duration:</label>
        <select id="breakDuration" v-model="timerStore.pomodoro.breakDuration">
          <option value="5">5 minutes</option>
          <option value="10">10 minutes</option>
          <option value="15">15 minutes</option>
        </select>
      </div>
    
      <div class="input-container">
        <label for="repeatTimes">Repeat Times:</label>
        <input type="number" id="repeatTimes" v-model="timerStore.pomodoro.repeatTimes" min="1" max="10">
      </div>

      <button type="submit">Submit</button>
    </form>

  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.input-container {
  margin-bottom: 1.3rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select, input[type="number"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
  font-size: 16px;
}

select {
  width: 215px;
}

input[type="number"] {
  width: 50px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>