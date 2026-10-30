<script setup lang="ts">
// The engine events are emits: hover (null when the pointer leaves),
// point-click, plot-click, zoom, renderer-change.
import { computed, ref } from "vue";
import { Chart, useI18n, type ChartHoverEvent } from "minerva-design/vue";

const TEXT = {
  en: {
    latency: "Latency (ms)",
    hint: "Hover or click a point",
    clicked: "Clicked",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    latency: "延迟（毫秒）",
    hint: "悬停或点击一个数据点",
    clicked: "已点击",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    latency: "レイテンシ（ms）",
    hint: "ポイントにカーソルを合わせるかクリックします",
    clicked: "クリック",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    latency: "Latence (ms)",
    hint: "Survolez ou cliquez sur un point",
    clicked: "Cliqué",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.latency, data: [42, 38, 65, 120, 96, 54] },
]);
const readout = ref("");
const describe = (event: ChartHoverEvent) =>
  `${event.xLabel} · ${event.items[0]?.seriesName}: ${event.items[0]?.y}`;
const onHover = (event: ChartHoverEvent | null) => {
  readout.value = event ? describe(event) : "";
};
const onPointClick = (event: ChartHoverEvent) => {
  readout.value = `${text.value.clicked} — ${describe(event)}`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <Chart
      :series="series"
      :x-axis="{ type: 'category', categories: text.hours }"
      crosshair
      :height="260"
      @hover="onHover"
      @point-click="onPointClick"
    />
    <output aria-live="polite">{{ readout || text.hint }}</output>
  </div>
</template>
