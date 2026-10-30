import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- AreaChartPercent.vue -->

<script setup lang="ts">
// \`percent\` scales every stack to 100%: the share of each source over time.

import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    solar: "Solar",
    wind: "Wind",
    hydro: "Hydro",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    solar: "太阳能",
    wind: "风能",
    hydro: "水电",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    solar: "太陽光",
    wind: "風力",
    hydro: "水力",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    solar: "Solaire",
    wind: "Éolien",
    hydro: "Hydraulique",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.solar, data: [0, 5, 40, 62, 35, 2] },
  { name: text.wind, data: [48, 52, 30, 22, 38, 55] },
  { name: text.hydro, data: [30, 30, 28, 26, 28, 30] },
];
const chartOptions = { xAxis: { type: "category", categories: text.hours } };
<\/script>

<template>
  <minerva-area-chart
    id="mix"
    percent
    curve="linear"
    height="280"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-area-chart>
</template>
`,angular:`// area-chart-percent.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`percent\` scales every stack to 100%: the share of each source over time.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    solar: "Solar",
    wind: "Wind",
    hydro: "Hydro",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    solar: "太阳能",
    wind: "风能",
    hydro: "水电",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    solar: "太陽光",
    wind: "風力",
    hydro: "水力",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    solar: "Solaire",
    wind: "Éolien",
    hydro: "Hydraulique",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

@Component({
  selector: "app-area-chart-percent",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-area-chart
      id="mix"
      percent
      curve="linear"
      height="280"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-area-chart>
  \`,
})
export class AreaChartPercentComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.solar, data: [0, 5, 40, 62, 35, 2] },
    { name: this.text.wind, data: [48, 52, 30, 22, 38, 55] },
    { name: this.text.hydro, data: [30, 30, 28, 26, 28, 30] },
  ];
  chartOptions = { xAxis: { type: "category", categories: this.text.hours } };
}
`,svelte:`<!-- AreaChartPercent.svelte -->

<script lang="ts">
  // \`percent\` scales every stack to 100%: the share of each source over time.

  import type { MinervaAreaChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      solar: "Solar",
      wind: "Wind",
      hydro: "Hydro",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    zh: {
      solar: "太阳能",
      wind: "风能",
      hydro: "水电",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    ja: {
      solar: "太陽光",
      wind: "風力",
      hydro: "水力",
      hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
    },
    fr: {
      solar: "Solaire",
      wind: "Éolien",
      hydro: "Hydraulique",
      hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.solar, data: [0, 5, 40, 62, 35, 2] },
    { name: text.wind, data: [48, 52, 30, 22, 38, 55] },
    { name: text.hydro, data: [30, 30, 28, 26, 28, 30] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.hours } };
<\/script>

<minerva-area-chart
  id="mix"
  percent
  curve="linear"
  height="280"
  series={chartSeries}
  options={chartOptions}
></minerva-area-chart>
`,solid:`// AreaChartPercent.tsx

// \`percent\` scales every stack to 100%: the share of each source over time.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    solar: "Solar",
    wind: "Wind",
    hydro: "Hydro",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    solar: "太阳能",
    wind: "风能",
    hydro: "水电",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    solar: "太陽光",
    wind: "風力",
    hydro: "水力",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    solar: "Solaire",
    wind: "Éolien",
    hydro: "Hydraulique",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

export default function AreaChartPercent() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.solar, data: [0, 5, 40, 62, 35, 2] },
    { name: text.wind, data: [48, 52, 30, 22, 38, 55] },
    { name: text.hydro, data: [30, 30, 28, 26, 28, 30] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.hours } };

  return (
    <minerva-area-chart
      id="mix"
      percent
      curve="linear"
      height="280"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-area-chart>
  );
}
`,html:`<minerva-area-chart
  id="mix"
  percent
  curve="linear"
  height="280"
></minerva-area-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`percent\` scales every stack to 100%: the share of each source over time.
  const TEXT = {
    en: {
      solar: "Solar",
      wind: "Wind",
      hydro: "Hydro",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    zh: {
      solar: "太阳能",
      wind: "风能",
      hydro: "水电",
      hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    },
    ja: {
      solar: "太陽光",
      wind: "風力",
      hydro: "水力",
      hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
    },
    fr: {
      solar: "Solaire",
      wind: "Éolien",
      hydro: "Hydraulique",
      hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#mix");
  chart.series = [
    { name: text.solar, data: [0, 5, 40, 62, 35, 2] },
    { name: text.wind, data: [48, 52, 30, 22, 38, 55] },
    { name: text.hydro, data: [30, 30, 28, 26, 28, 30] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.hours } };
<\/script>
`}})))()}n();export{t as default};