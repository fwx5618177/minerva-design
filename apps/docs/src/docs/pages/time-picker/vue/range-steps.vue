<script setup lang="ts">
import { ref } from "vue";
import { TimePicker } from "minerva-design/vue";
const min = new Date(2026, 0, 1, 9);
const max = new Date(2026, 0, 1, 17);
const time = ref<Date | null>(new Date(2026, 0, 1, 10, 30));
</script>
<template>
  <TimePicker
    v-model="time"
    label="Office hours"
    :min-time="min"
    :max-time="max"
    :minute-step="15"
    :show-second="false"
    format="HH:mm"
  />
</template>
