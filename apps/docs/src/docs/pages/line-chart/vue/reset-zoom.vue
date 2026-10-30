<script setup lang="ts">
// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the template ref exposes
// resetZoom, getView, setView and the engine instance.
import { computed, ref } from "vue";
import {
  Button,
  LineChart,
  useI18n,
  type ChartHandle,
} from "minerva-design/vue";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = Array.from({ length: 2000 }, (_, i) =>
  Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
);
const series = computed(() => [{ name: text.value.sensor, data }]);
const chart = ref<ChartHandle>();
</script>

<template>
  <div style="display: grid; gap: 8px; justify-items: start">
    <LineChart
      ref="chart"
      :series="series"
      crosshair
      :interaction="{ zoom: 'x' }"
      :height="260"
    />
    <Button variant="outline" size="small" @click="chart?.resetZoom()">{{
      text.reset
    }}</Button>
  </div>
</template>
