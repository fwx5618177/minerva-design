import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ChartPerformanceScatter.vue -->

<script setup lang="ts">
// 200,000 dots from typed arrays (\`data: { x, y }\`): drawn by the GPU,
// hovered through a spatial index; zoom on both axes.

import type { MinervaScatterChart } from "minerva-design/web-components/chart";

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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.points, data: POINTS, pointSize: 2, opacity: 0.4 },
];
<\/script>

<template>
  <minerva-scatter-chart
    id="cloud"
    height="360"
    :series.prop="chartSeries"
  ></minerva-scatter-chart>
</template>
`,angular:`// chart-performance-scatter.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// 200,000 dots from typed arrays (\`data: { x, y }\`): drawn by the GPU,
// hovered through a spatial index; zoom on both axes.
import type { MinervaScatterChart } from "minerva-design/web-components/chart";

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

@Component({
  selector: "app-chart-performance-scatter",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-scatter-chart
      id="cloud"
      height="360"
      [series]="chartSeries"
    ></minerva-scatter-chart>
  \`,
})
export class ChartPerformanceScatterComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.points, data: POINTS, pointSize: 2, opacity: 0.4 },
  ];
}
`,svelte:`<!-- ChartPerformanceScatter.svelte -->

<script lang="ts">
  // 200,000 dots from typed arrays (\`data: { x, y }\`): drawn by the GPU,
  // hovered through a spatial index; zoom on both axes.

  import type { MinervaScatterChart } from "minerva-design/web-components/chart";

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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.points, data: POINTS, pointSize: 2, opacity: 0.4 },
  ];
<\/script>

<minerva-scatter-chart id="cloud" height="360" series={chartSeries}></minerva-scatter-chart>
`,solid:`// ChartPerformanceScatter.tsx

// 200,000 dots from typed arrays (\`data: { x, y }\`): drawn by the GPU,
// hovered through a spatial index; zoom on both axes.
import type { MinervaScatterChart } from "minerva-design/web-components/chart";

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

export default function ChartPerformanceScatter() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.points, data: POINTS, pointSize: 2, opacity: 0.4 },
  ];

  return (
    <minerva-scatter-chart
      id="cloud"
      height="360"
      prop:series={chartSeries}
    ></minerva-scatter-chart>
  );
}
`,html:`<minerva-scatter-chart id="cloud" height="360"></minerva-scatter-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // 200,000 dots from typed arrays (\`data: { x, y }\`): drawn by the GPU,
  // hovered through a spatial index; zoom on both axes.
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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#cloud");
  chart.series = [
    { name: text.points, data: POINTS, pointSize: 2, opacity: 0.4 },
  ];
<\/script>
`}})))()}n();export{t as default};