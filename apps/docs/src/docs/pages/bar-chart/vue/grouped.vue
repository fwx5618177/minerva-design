<script setup lang="ts">
// Series are grouped side by side; `labels` writes the value of every bar.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.lastYear, data: [38, 52, 61, 45] },
  { name: text.value.thisYear, data: [44, 58, 72, 49] },
]);
</script>

<template>
  <BarChart
    :series="series"
    labels
    :x-axis="{ type: 'category', categories: text.regions }"
    :height="280"
  />
</template>
