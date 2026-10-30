import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ChartPerformanceMillion.vue -->

<script setup lang="ts">
// One million points in a typed array (\`data: { y }\`: the x values are the
// indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
// pinch to zoom down to single samples.

import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { signal: "Sensor (1,000,000 samples)" },
  zh: { signal: "传感器（1,000,000 个采样点）" },
  ja: { signal: "センサー（1,000,000 サンプル）" },
  fr: { signal: "Capteur (1 000 000 d’échantillons)" },
};

// a million samples as typed-array columns: no objects, no copies
const COUNT = 1_000_000;
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  y[i] =
    50 +
    30 * Math.sin(i / 20_000) +
    8 * Math.sin(i / 700) +
    3 * Math.sin(i * 1.7);
}
const SAMPLES = { y };

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [{ name: text.signal, data: SAMPLES }];
const chartOptions = { interaction: { zoom: "x" }, crosshair: true };
<\/script>

<template>
  <minerva-line-chart
    id="million"
    height="320"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-line-chart>
</template>
`,angular:`// chart-performance-million.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// One million points in a typed array (\`data: { y }\`: the x values are the
// indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
// pinch to zoom down to single samples.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { signal: "Sensor (1,000,000 samples)" },
  zh: { signal: "传感器（1,000,000 个采样点）" },
  ja: { signal: "センサー（1,000,000 サンプル）" },
  fr: { signal: "Capteur (1 000 000 d’échantillons)" },
};

// a million samples as typed-array columns: no objects, no copies
const COUNT = 1_000_000;
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  y[i] =
    50 +
    30 * Math.sin(i / 20_000) +
    8 * Math.sin(i / 700) +
    3 * Math.sin(i * 1.7);
}
const SAMPLES = { y };

@Component({
  selector: "app-chart-performance-million",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-line-chart
      id="million"
      height="320"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-line-chart>
  \`,
})
export class ChartPerformanceMillionComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [{ name: this.text.signal, data: SAMPLES }];
  chartOptions = { interaction: { zoom: "x" }, crosshair: true };
}
`,svelte:`<!-- ChartPerformanceMillion.svelte -->

<script lang="ts">
  // One million points in a typed array (\`data: { y }\`: the x values are the
  // indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
  // pinch to zoom down to single samples.

  import type { MinervaLineChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { signal: "Sensor (1,000,000 samples)" },
    zh: { signal: "传感器（1,000,000 个采样点）" },
    ja: { signal: "センサー（1,000,000 サンプル）" },
    fr: { signal: "Capteur (1 000 000 d’échantillons)" },
  };

  // a million samples as typed-array columns: no objects, no copies
  const COUNT = 1_000_000;
  const y = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    y[i] =
      50 +
      30 * Math.sin(i / 20_000) +
      8 * Math.sin(i / 700) +
      3 * Math.sin(i * 1.7);
  }
  const SAMPLES = { y };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.signal, data: SAMPLES }];
  const chartOptions = { interaction: { zoom: "x" }, crosshair: true };
<\/script>

<minerva-line-chart
  id="million"
  height="320"
  series={chartSeries}
  options={chartOptions}
></minerva-line-chart>
`,solid:`// ChartPerformanceMillion.tsx

// One million points in a typed array (\`data: { y }\`: the x values are the
// indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
// pinch to zoom down to single samples.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { signal: "Sensor (1,000,000 samples)" },
  zh: { signal: "传感器（1,000,000 个采样点）" },
  ja: { signal: "センサー（1,000,000 サンプル）" },
  fr: { signal: "Capteur (1 000 000 d’échantillons)" },
};

// a million samples as typed-array columns: no objects, no copies
const COUNT = 1_000_000;
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  y[i] =
    50 +
    30 * Math.sin(i / 20_000) +
    8 * Math.sin(i / 700) +
    3 * Math.sin(i * 1.7);
}
const SAMPLES = { y };

export default function ChartPerformanceMillion() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.signal, data: SAMPLES }];
  const chartOptions = { interaction: { zoom: "x" }, crosshair: true };

  return (
    <minerva-line-chart
      id="million"
      height="320"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-line-chart>
  );
}
`,html:`<minerva-line-chart id="million" height="320"></minerva-line-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // One million points in a typed array (\`data: { y }\`: the x values are the
  // indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
  // pinch to zoom down to single samples.
  const TEXT = {
    en: { signal: "Sensor (1,000,000 samples)" },
    zh: { signal: "传感器（1,000,000 个采样点）" },
    ja: { signal: "センサー（1,000,000 サンプル）" },
    fr: { signal: "Capteur (1 000 000 d’échantillons)" },
  };

  // a million samples as typed-array columns: no objects, no copies
  const COUNT = 1_000_000;
  const y = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    y[i] =
      50 +
      30 * Math.sin(i / 20_000) +
      8 * Math.sin(i / 700) +
      3 * Math.sin(i * 1.7);
  }
  const SAMPLES = { y };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#million");
  chart.series = [{ name: text.signal, data: SAMPLES }];
  chart.options = { interaction: { zoom: "x" }, crosshair: true };
<\/script>
`}})))()}n();export{t as default};