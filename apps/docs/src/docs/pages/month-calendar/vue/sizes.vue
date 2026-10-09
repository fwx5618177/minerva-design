<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, ResponsiveGrid } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, lg: 2 }" :gap="4"
    ><MonthCalendar
      :default-month="month"
      size="small"
      :show-selected-day-events="false" /><MonthCalendar
      :default-month="month"
      size="large"
      :show-selected-day-events="false"
  /></ResponsiveGrid>
</template>
