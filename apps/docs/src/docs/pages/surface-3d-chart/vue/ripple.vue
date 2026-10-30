<script setup lang="ts">
// <Surface3DChart>: z = f(x, y) over a regular grid (`rows`, `cols`, `z`
// row by row), lit and colored by height, with contour lines projected on
// the floor.
import { computed } from "vue";
import { Surface3DChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { name: "Ripple", height: "Height" },
  zh: { name: "波纹", height: "高度" },
  ja: { name: "波紋", height: "高さ" },
  fr: { name: "Onde", height: "Hauteur" },
};

// z = sin(r) / r over a 60 × 60 grid from -10 to 10
const N = 60;
const WAVE = {
  rows: N,
  cols: N,
  x: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
  y: Array.from({ length: N }, (_, i) => -10 + (20 * i) / (N - 1)),
  z: Array.from({ length: N * N }, (_, k) => {
    const x = -10 + (20 * (k % N)) / (N - 1);
    const y = -10 + (20 * Math.floor(k / N)) / (N - 1);
    const r = Math.hypot(x, y) || 1e-6;
    return Math.sin(r) / r;
  }),
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [{ name: text.value.name, data: WAVE }]);
</script>

<template>
  <Surface3DChart
    :series="series"
    :contours="{ count: 10, floor: true }"
    color-scale="viridis"
    :z-axis="{ title: text.height }"
    :height="420"
  />
</template>
