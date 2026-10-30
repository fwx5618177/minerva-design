<script setup lang="ts">
// 200,000 dots from typed arrays (`data: { x, y }`): drawn by the GPU,
// hovered through a spatial index; zoom on both axes.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { ScatterChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { points: "Measurements (200,000 points)" },
  zh: { points: "测量值（200,000 个点）" },
  ja: { points: "測定値（200,000 点）" },
  fr: { points: "Mesures (200 000 points)" },
};

// 200,000 points in two typed-array columns, generated deterministically
const COUNT = 200_000;
const x = new Float32Array(COUNT);
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const angle = (i * 2.399963) % (2 * Math.PI);
  const radius = Math.sqrt(i / COUNT) * 40;
  x[i] = 50 + radius * Math.cos(angle) + 6 * Math.sin(i * 0.37);
  y[i] = 50 + radius * Math.sin(angle) * 0.6 + 6 * Math.cos(i * 0.53);
}
const POINTS = { x, y };

const { language } = useI18n();
const series = computed(() => [
  {
    name: (TEXT[language.value] ?? TEXT.en).points,
    data: POINTS,
    pointSize: 2,
    opacity: 0.4,
  },
]);
</script>

<template>
  <ScatterChart :series="series" :height="360" />
</template>
