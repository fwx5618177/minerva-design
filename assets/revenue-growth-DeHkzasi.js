import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- MixedChartRevenueGrowth.vue -->

<script setup lang="ts">
// Bars and a line on two value axes: the series with \`yAxis: "right"\` use
// \`options.yAxis2\` (its ticks are aligned on the left grid).

import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

const lang = document.documentElement.lang as keyof typeof TEXT;
const text = TEXT[lang] ?? TEXT.en;
const months = MONTHS[lang] ?? MONTHS.en;
const chartSeries = [
  {
    name: text.revenue,
    type: "bar",
    data: REVENUE.map((y, i) => ({ x: months[i], y })),
  },
  {
    name: text.growth,
    type: "line",
    curve: "smooth",
    yAxis: "right",
    data: GROWTH.map((y, i) => ({ x: months[i], y })),
  },
];
const chartOptions = {
  xAxis: { type: "category" },
  yAxis2: { format: (value) => \`\${value} %\` },
};
<\/script>

<template>
  <minerva-mixed-chart
    id="revenue"
    height="300"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-mixed-chart>
</template>
`,angular:`// mixed-chart-revenue-growth.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Bars and a line on two value axes: the series with \`yAxis: "right"\` use
// \`options.yAxis2\` (its ticks are aligned on the left grid).
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

@Component({
  selector: "app-mixed-chart-revenue-growth",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-mixed-chart
      id="revenue"
      height="300"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-mixed-chart>
  \`,
})
export class MixedChartRevenueGrowthComponent {
  lang = document.documentElement.lang as keyof typeof TEXT;
  text = TEXT[this.lang] ?? TEXT.en;
  months = MONTHS[this.lang] ?? MONTHS.en;
  chartSeries = [
    {
      name: this.text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: this.months[i], y })),
    },
    {
      name: this.text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: this.months[i], y })),
    },
  ];
  chartOptions = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => \`\${value} %\` },
  };
}
`,svelte:`<!-- MixedChartRevenueGrowth.svelte -->

<script lang="ts">
  // Bars and a line on two value axes: the series with \`yAxis: "right"\` use
  // \`options.yAxis2\` (its ticks are aligned on the left grid).

  import type { MinervaMixedChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { revenue: "Revenue (k€)", growth: "Growth" },
    zh: { revenue: "收入（千欧元）", growth: "增长率" },
    ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
    fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
  };
  const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
    ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
    fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  };

  const REVENUE = [182, 196, 214, 205, 238, 261];
  // month-over-month growth, %
  const GROWTH = REVENUE.map((y, i) =>
    i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
  );

  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSeries = [
    {
      name: text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => \`\${value} %\` },
  };
<\/script>

<minerva-mixed-chart
  id="revenue"
  height="300"
  series={chartSeries}
  options={chartOptions}
></minerva-mixed-chart>
`,solid:`// MixedChartRevenueGrowth.tsx

// Bars and a line on two value axes: the series with \`yAxis: "right"\` use
// \`options.yAxis2\` (its ticks are aligned on the left grid).
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

export default function MixedChartRevenueGrowth() {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chartSeries = [
    {
      name: text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => \`\${value} %\` },
  };

  return (
    <minerva-mixed-chart
      id="revenue"
      height="300"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-mixed-chart>
  );
}
`,html:`<minerva-mixed-chart id="revenue" height="300"></minerva-mixed-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Bars and a line on two value axes: the series with \`yAxis: "right"\` use
  // \`options.yAxis2\` (its ticks are aligned on the left grid).
  const TEXT = {
    en: { revenue: "Revenue (k€)", growth: "Growth" },
    zh: { revenue: "收入（千欧元）", growth: "增长率" },
    ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
    fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
  };
  const MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
    ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
    fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  };

  const REVENUE = [182, 196, 214, 205, 238, 261];
  // month-over-month growth, %
  const GROWTH = REVENUE.map((y, i) =>
    i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
  );

  const lang = document.documentElement.lang;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = document.querySelector("#revenue");
  chart.series = [
    {
      name: text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => \`\${value} %\` },
  };
<\/script>
`}})))()}n();export{t as default};