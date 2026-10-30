import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- ChartsMixedSeries.vue -->

<script setup lang="ts">
// <minerva-chart> takes the engine options as its \`options\` property: any
// mix of series types (here bars and a line) on shared axes.

import type { MinervaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    revenue: "Revenue",
    target: "Target",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    revenue: "收入",
    target: "目标",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    revenue: "売上",
    target: "目標",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    revenue: "Chiffre d'affaires",
    target: "Objectif",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartOptions = {
  series: [
    { name: text.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
    {
      name: text.target,
      type: "line",
      curve: "smooth",
      data: [45, 50, 55, 60, 65, 70],
    },
  ],
  xAxis: { type: "category", categories: text.months },
  yAxis: { format: (value) => \`\${value}k\` },
};
<\/script>

<template>
  <minerva-chart
    id="mixed"
    height="300"
    :options.prop="chartOptions"
  ></minerva-chart>
</template>
`,angular:`// charts-mixed-series.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// <minerva-chart> takes the engine options as its \`options\` property: any
// mix of series types (here bars and a line) on shared axes.
import type { MinervaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    revenue: "Revenue",
    target: "Target",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    revenue: "收入",
    target: "目标",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    revenue: "売上",
    target: "目標",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    revenue: "Chiffre d'affaires",
    target: "Objectif",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

@Component({
  selector: "app-charts-mixed-series",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-chart
      id="mixed"
      height="300"
      [options]="chartOptions"
    ></minerva-chart>
  \`,
})
export class ChartsMixedSeriesComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartOptions = {
    series: [
      { name: this.text.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
      {
        name: this.text.target,
        type: "line",
        curve: "smooth",
        data: [45, 50, 55, 60, 65, 70],
      },
    ],
    xAxis: { type: "category", categories: this.text.months },
    yAxis: { format: (value) => \`\${value}k\` },
  };
}
`,svelte:`<!-- ChartsMixedSeries.svelte -->

<script lang="ts">
  // <minerva-chart> takes the engine options as its \`options\` property: any
  // mix of series types (here bars and a line) on shared axes.

  import type { MinervaChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      revenue: "Revenue",
      target: "Target",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    zh: {
      revenue: "收入",
      target: "目标",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    ja: {
      revenue: "売上",
      target: "目標",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    fr: {
      revenue: "Chiffre d'affaires",
      target: "Objectif",
      months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartOptions = {
    series: [
      { name: text.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
      {
        name: text.target,
        type: "line",
        curve: "smooth",
        data: [45, 50, 55, 60, 65, 70],
      },
    ],
    xAxis: { type: "category", categories: text.months },
    yAxis: { format: (value) => \`\${value}k\` },
  };
<\/script>

<minerva-chart id="mixed" height="300" options={chartOptions}></minerva-chart>
`,solid:`// ChartsMixedSeries.tsx

// <minerva-chart> takes the engine options as its \`options\` property: any
// mix of series types (here bars and a line) on shared axes.
import type { MinervaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    revenue: "Revenue",
    target: "Target",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    revenue: "收入",
    target: "目标",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    revenue: "売上",
    target: "目標",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    revenue: "Chiffre d'affaires",
    target: "Objectif",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

export default function ChartsMixedSeries() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartOptions = {
    series: [
      { name: text.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
      {
        name: text.target,
        type: "line",
        curve: "smooth",
        data: [45, 50, 55, 60, 65, 70],
      },
    ],
    xAxis: { type: "category", categories: text.months },
    yAxis: { format: (value) => \`\${value}k\` },
  };

  return (
    <minerva-chart
      id="mixed"
      height="300"
      prop:options={chartOptions}
    ></minerva-chart>
  );
}
`,html:`<minerva-chart id="mixed" height="300"></minerva-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // <minerva-chart> takes the engine options as its \`options\` property: any
  // mix of series types (here bars and a line) on shared axes.
  const TEXT = {
    en: {
      revenue: "Revenue",
      target: "Target",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    zh: {
      revenue: "收入",
      target: "目标",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    ja: {
      revenue: "売上",
      target: "目標",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    fr: {
      revenue: "Chiffre d'affaires",
      target: "Objectif",
      months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#mixed");
  chart.options = {
    series: [
      { name: text.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
      {
        name: text.target,
        type: "line",
        curve: "smooth",
        data: [45, 50, 55, 60, 65, 70],
      },
    ],
    xAxis: { type: "category", categories: text.months },
    yAxis: { format: (value) => \`\${value}k\` },
  };
<\/script>
`}})))()}n();export{t as default};