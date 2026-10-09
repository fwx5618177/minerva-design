<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <MonthCalendar
    v-model="day"
    v-model:month="month"
    range-start="2026-10-05"
    range-end="2026-10-12"
  />
</template>
