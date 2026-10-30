import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- HistogramChartLatency.vue -->

<script setup lang="ts">
// <minerva-histogram-chart> bins raw samples itself (\`bins="auto"\`:
// Freedman-Diaconis); a long tail of slow requests shows at a glance.

import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartValues = LATENCY;
const chartValueName = text.requests;
const chartOptions = { xAxis: { title: text.ms } };
<\/script>

<template>
  <minerva-histogram-chart
    id="latency"
    height="300"
    :values.prop="chartValues"
    :valueName.prop="chartValueName"
    :options.prop="chartOptions"
  ></minerva-histogram-chart>
</template>
`,angular:`// histogram-chart-latency.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// <minerva-histogram-chart> bins raw samples itself (\`bins="auto"\`:
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

@Component({
  selector: "app-histogram-chart-latency",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-histogram-chart
      id="latency"
      height="300"
      [values]="chartValues"
      [valueName]="chartValueName"
      [options]="chartOptions"
    ></minerva-histogram-chart>
  \`,
})
export class HistogramChartLatencyComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartValues = LATENCY;
  chartValueName = this.text.requests;
  chartOptions = { xAxis: { title: this.text.ms } };
}
`,svelte:`<!-- HistogramChartLatency.svelte -->

<script lang="ts">
  // <minerva-histogram-chart> bins raw samples itself (\`bins="auto"\`:
  // Freedman-Diaconis); a long tail of slow requests shows at a glance.

  import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { requests: "Requests", ms: "Response time (ms)" },
    zh: { requests: "请求数", ms: "响应时间（毫秒）" },
    ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
    fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
  };

  // 5,000 response times (ms): log-normal around 120 ms, generated
  // deterministically (the same picture on every load)
  const fraction = (value: number) => value - Math.floor(value);
  const LATENCY = Array.from({ length: 5000 }, (_, i) => {
    const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
    const v = fraction(Math.sin(i * 78.233) * 43758.5453);
    const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return Math.round(Math.exp(4.8 + 0.35 * normal));
  });

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartValues = LATENCY;
  const chartValueName = text.requests;
  const chartOptions = { xAxis: { title: text.ms } };
<\/script>

<minerva-histogram-chart
  id="latency"
  height="300"
  values={chartValues}
  valueName={chartValueName}
  options={chartOptions}
></minerva-histogram-chart>
`,solid:`// HistogramChartLatency.tsx

// <minerva-histogram-chart> bins raw samples itself (\`bins="auto"\`:
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

export default function HistogramChartLatency() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartValues = LATENCY;
  const chartValueName = text.requests;
  const chartOptions = { xAxis: { title: text.ms } };

  return (
    <minerva-histogram-chart
      id="latency"
      height="300"
      prop:values={chartValues}
      prop:valueName={chartValueName}
      prop:options={chartOptions}
    ></minerva-histogram-chart>
  );
}
`,html:`<minerva-histogram-chart id="latency" height="300"></minerva-histogram-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // <minerva-histogram-chart> bins raw samples itself (\`bins="auto"\`:
  // Freedman-Diaconis); a long tail of slow requests shows at a glance.
  const TEXT = {
    en: { requests: "Requests", ms: "Response time (ms)" },
    zh: { requests: "请求数", ms: "响应时间（毫秒）" },
    ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
    fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
  };

  // 5,000 response times (ms): log-normal around 120 ms, generated
  // deterministically (the same picture on every load)
  const fraction = (value) => value - Math.floor(value);
  const LATENCY = Array.from({ length: 5000 }, (_, i) => {
    const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
    const v = fraction(Math.sin(i * 78.233) * 43758.5453);
    const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return Math.round(Math.exp(4.8 + 0.35 * normal));
  });

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#latency");
  chart.values = LATENCY;
  chart.valueName = text.requests;
  chart.options = { xAxis: { title: text.ms } };
<\/script>
`}})))()}n();export{t as default};