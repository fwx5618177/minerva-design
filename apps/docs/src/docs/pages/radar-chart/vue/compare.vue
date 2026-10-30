<script setup lang="ts">
// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const indicators = computed(() =>
  text.value.axes.map((name) => ({ name, max: 100 })),
);
const series = computed(() => [
  { name: text.value.current, values: [72, 85, 64, 90, 58] },
  { name: text.value.next, values: [88, 80, 78, 92, 81] },
]);
</script>

<template>
  <RadarChart :indicators="indicators" :series="series" :height="320" />
</template>
