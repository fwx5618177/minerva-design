<script setup lang="ts">
// The labels follow the language of the closest ConfigProvider.
import { computed } from "vue";
import { LineChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
  { name: text.value.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
]);
</script>

<template>
  <LineChart
    :series="series"
    curve="smooth"
    :x-axis="{ type: 'category', categories: text.days }"
    :height="280"
  />
</template>
