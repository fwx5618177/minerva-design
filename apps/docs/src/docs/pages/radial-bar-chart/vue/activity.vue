<script setup lang="ts">
// Activity rings: each bar has its own `max` (the goal), `sweep` 360 makes
// full rings and the center texts summarize them.
import { computed } from "vue";
import { RadialBarChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() => [
  { name: text.value.rings[0], value: 420, max: 500, color: "#ef4444" },
  { name: text.value.rings[1], value: 24, max: 30, color: "#22c55e" },
  { name: text.value.rings[2], value: 9, max: 12, color: "#06b6d4" },
]);
</script>

<template>
  <RadialBarChart
    :data="data"
    :sweep="360"
    :label-content="['name', 'percent']"
    center-value="78 %"
    :center-label="text.today"
  />
</template>
