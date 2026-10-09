<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, ConfigProvider } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <ConfigProvider :locale="{ language: 'zh' }"
    ><MonthCalendar v-model="day" v-model:month="month" locale="zh-CN"
  /></ConfigProvider>
</template>
