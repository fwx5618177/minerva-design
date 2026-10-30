import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BarChartGrouped.vue -->

<script setup lang="ts">
// Series are grouped side by side; \`labels\` writes the value of every bar.

import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.lastYear, data: [38, 52, 61, 45] },
  { name: text.thisYear, data: [44, 58, 72, 49] },
];
const chartOptions = { xAxis: { type: "category", categories: text.regions } };
<\/script>

<template>
  <minerva-bar-chart
    id="sales"
    labels
    height="280"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-bar-chart>
</template>
`,angular:`// bar-chart-grouped.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Series are grouped side by side; \`labels\` writes the value of every bar.
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

@Component({
  selector: "app-bar-chart-grouped",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-bar-chart
      id="sales"
      labels
      height="280"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-bar-chart>
  \`,
})
export class BarChartGroupedComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.lastYear, data: [38, 52, 61, 45] },
    { name: this.text.thisYear, data: [44, 58, 72, 49] },
  ];
  chartOptions = { xAxis: { type: "category", categories: this.text.regions } };
}
`,svelte:`<!-- BarChartGrouped.svelte -->

<script lang="ts">
  // Series are grouped side by side; \`labels\` writes the value of every bar.

  import type { MinervaBarChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      lastYear: "2024",
      thisYear: "2025",
      regions: ["North", "South", "East", "West"],
    },
    zh: {
      lastYear: "2024 年",
      thisYear: "2025 年",
      regions: ["华北", "华南", "华东", "西部"],
    },
    ja: {
      lastYear: "2024年",
      thisYear: "2025年",
      regions: ["北部", "南部", "東部", "西部"],
    },
    fr: {
      lastYear: "2024",
      thisYear: "2025",
      regions: ["Nord", "Sud", "Est", "Ouest"],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.lastYear, data: [38, 52, 61, 45] },
    { name: text.thisYear, data: [44, 58, 72, 49] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.regions } };
<\/script>

<minerva-bar-chart
  id="sales"
  labels
  height="280"
  series={chartSeries}
  options={chartOptions}
></minerva-bar-chart>
`,solid:`// BarChartGrouped.tsx

// Series are grouped side by side; \`labels\` writes the value of every bar.
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

export default function BarChartGrouped() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.lastYear, data: [38, 52, 61, 45] },
    { name: text.thisYear, data: [44, 58, 72, 49] },
  ];
  const chartOptions = {
    xAxis: { type: "category", categories: text.regions },
  };

  return (
    <minerva-bar-chart
      id="sales"
      labels
      height="280"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-bar-chart>
  );
}
`,html:`<minerva-bar-chart id="sales" labels height="280"></minerva-bar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Series are grouped side by side; \`labels\` writes the value of every bar.
  const TEXT = {
    en: {
      lastYear: "2024",
      thisYear: "2025",
      regions: ["North", "South", "East", "West"],
    },
    zh: {
      lastYear: "2024 年",
      thisYear: "2025 年",
      regions: ["华北", "华南", "华东", "西部"],
    },
    ja: {
      lastYear: "2024年",
      thisYear: "2025年",
      regions: ["北部", "南部", "東部", "西部"],
    },
    fr: {
      lastYear: "2024",
      thisYear: "2025",
      regions: ["Nord", "Sud", "Est", "Ouest"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#sales");
  chart.series = [
    { name: text.lastYear, data: [38, 52, 61, 45] },
    { name: text.thisYear, data: [44, 58, 72, 49] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.regions } };
<\/script>
`}})))()}n();export{t as default};