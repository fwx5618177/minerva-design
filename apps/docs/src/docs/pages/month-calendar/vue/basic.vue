<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, VStack } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><MonthCalendar v-model="day" v-model:month="month" /><output
      >Selected: {{ day }}</output
    ></VStack
  >
</template>
