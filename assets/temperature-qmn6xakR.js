import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- RangeAreaChartTemperature.vue -->

<script setup lang="ts">
// Daily minimum and maximum temperatures as a band, the average as a line;
// \`curve="linear"\` keeps the measured values at the corners.

import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { range: "Min – max", mean: "Average" },
  zh: { range: "最低 – 最高", mean: "平均" },
  ja: { range: "最低 – 最高", mean: "平均" },
  fr: { range: "Min – max", mean: "Moyenne" },
};
const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
};

const LOW = [8, 9, 7, 11, 13, 12, 10];
const HIGH = [16, 18, 15, 21, 24, 22, 19];

const lang = document.documentElement.lang as keyof typeof TEXT;
const text = TEXT[lang] ?? TEXT.en;
const days = DAYS[lang] ?? DAYS.en;
const chartSeries = [
  {
    name: text.range,
    data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
  },
  {
    name: text.mean,
    type: "line",
    data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
  },
];
const chartOptions = {
  xAxis: { type: "category" },
  yAxis: { format: (value) => \`\${value} °C\` },
};
<\/script>

<template>
  <minerva-range-area-chart
    id="temperature"
    curve="linear"
    height="280"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-range-area-chart>
</template>
`,angular:`// range-area-chart-temperature.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Daily minimum and maximum temperatures as a band, the average as a line;
// \`curve="linear"\` keeps the measured values at the corners.
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { range: "Min – max", mean: "Average" },
  zh: { range: "最低 – 最高", mean: "平均" },
  ja: { range: "最低 – 最高", mean: "平均" },
  fr: { range: "Min – max", mean: "Moyenne" },
};
const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
};

const LOW = [8, 9, 7, 11, 13, 12, 10];
const HIGH = [16, 18, 15, 21, 24, 22, 19];

@Component({
  selector: "app-range-area-chart-temperature",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-range-area-chart
      id="temperature"
      curve="linear"
      height="280"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-range-area-chart>
  \`,
})
export class RangeAreaChartTemperatureComponent {
  lang = document.documentElement.lang as keyof typeof TEXT;
  text = TEXT[this.lang] ?? TEXT.en;
  days = DAYS[this.lang] ?? DAYS.en;
  chartSeries = [
    {
      name: this.text.range,
      data: this.days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: this.text.mean,
      type: "line",
      data: this.days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
  chartOptions = {
    xAxis: { type: "category" },
    yAxis: { format: (value) => \`\${value} °C\` },
  };
}
`,svelte:`<!-- RangeAreaChartTemperature.svelte -->

<script lang="ts">
  // Daily minimum and maximum temperatures as a band, the average as a line;
  // \`curve="linear"\` keeps the measured values at the corners.

  import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { range: "Min – max", mean: "Average" },
    zh: { range: "最低 – 最高", mean: "平均" },
    ja: { range: "最低 – 最高", mean: "平均" },
    fr: { range: "Min – max", mean: "Moyenne" },
  };
  const DAYS = {
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    ja: ["月", "火", "水", "木", "金", "土", "日"],
    fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  };

  const LOW = [8, 9, 7, 11, 13, 12, 10];
  const HIGH = [16, 18, 15, 21, 24, 22, 19];

  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const days = DAYS[lang] ?? DAYS.en;
  const chartSeries = [
    {
      name: text.range,
      data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: text.mean,
      type: "line",
      data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis: { format: (value) => \`\${value} °C\` },
  };
<\/script>

<minerva-range-area-chart
  id="temperature"
  curve="linear"
  height="280"
  series={chartSeries}
  options={chartOptions}
></minerva-range-area-chart>
`,solid:`// RangeAreaChartTemperature.tsx

// Daily minimum and maximum temperatures as a band, the average as a line;
// \`curve="linear"\` keeps the measured values at the corners.
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { range: "Min – max", mean: "Average" },
  zh: { range: "最低 – 最高", mean: "平均" },
  ja: { range: "最低 – 最高", mean: "平均" },
  fr: { range: "Min – max", mean: "Moyenne" },
};
const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
};

const LOW = [8, 9, 7, 11, 13, 12, 10];
const HIGH = [16, 18, 15, 21, 24, 22, 19];

export default function RangeAreaChartTemperature() {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const days = DAYS[lang] ?? DAYS.en;
  const chartSeries = [
    {
      name: text.range,
      data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: text.mean,
      type: "line",
      data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis: { format: (value) => \`\${value} °C\` },
  };

  return (
    <minerva-range-area-chart
      id="temperature"
      curve="linear"
      height="280"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-range-area-chart>
  );
}
`,html:`<minerva-range-area-chart
  id="temperature"
  curve="linear"
  height="280"
></minerva-range-area-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Daily minimum and maximum temperatures as a band, the average as a line;
  // \`curve="linear"\` keeps the measured values at the corners.
  const TEXT = {
    en: { range: "Min – max", mean: "Average" },
    zh: { range: "最低 – 最高", mean: "平均" },
    ja: { range: "最低 – 最高", mean: "平均" },
    fr: { range: "Min – max", mean: "Moyenne" },
  };
  const DAYS = {
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    ja: ["月", "火", "水", "木", "金", "土", "日"],
    fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  };

  const LOW = [8, 9, 7, 11, 13, 12, 10];
  const HIGH = [16, 18, 15, 21, 24, 22, 19];

  const lang = document.documentElement.lang;
  const text = TEXT[lang] ?? TEXT.en;
  const days = DAYS[lang] ?? DAYS.en;
  const chart = document.querySelector("#temperature");
  chart.series = [
    {
      name: text.range,
      data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: text.mean,
      type: "line",
      data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis: { format: (value) => \`\${value} °C\` },
  };
<\/script>
`}})))()}n();export{t as default};