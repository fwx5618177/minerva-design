import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- AreaChartStacked.vue -->

<script setup lang="ts">
// \`stacked\` piles the areas up; the curve is smooth by default.

import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    organic: "Organic",
    paid: "Paid",
    referral: "Referral",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    organic: "自然流量",
    paid: "付费流量",
    referral: "推荐流量",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    organic: "オーガニック",
    paid: "有料",
    referral: "参照元",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    organic: "Naturel",
    paid: "Payant",
    referral: "Référents",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.organic, data: [320, 332, 301, 334, 390, 430] },
  { name: text.paid, data: [120, 132, 101, 134, 190, 230] },
  { name: text.referral, data: [60, 72, 71, 74, 90, 110] },
];
const chartOptions = { xAxis: { type: "category", categories: text.months } };
<\/script>

<template>
  <minerva-area-chart
    id="traffic"
    stacked
    height="280"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-area-chart>
</template>
`,angular:`// area-chart-stacked.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`stacked\` piles the areas up; the curve is smooth by default.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    organic: "Organic",
    paid: "Paid",
    referral: "Referral",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    organic: "自然流量",
    paid: "付费流量",
    referral: "推荐流量",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    organic: "オーガニック",
    paid: "有料",
    referral: "参照元",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    organic: "Naturel",
    paid: "Payant",
    referral: "Référents",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

@Component({
  selector: "app-area-chart-stacked",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-area-chart
      id="traffic"
      stacked
      height="280"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-area-chart>
  \`,
})
export class AreaChartStackedComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.organic, data: [320, 332, 301, 334, 390, 430] },
    { name: this.text.paid, data: [120, 132, 101, 134, 190, 230] },
    { name: this.text.referral, data: [60, 72, 71, 74, 90, 110] },
  ];
  chartOptions = { xAxis: { type: "category", categories: this.text.months } };
}
`,svelte:`<!-- AreaChartStacked.svelte -->

<script lang="ts">
  // \`stacked\` piles the areas up; the curve is smooth by default.

  import type { MinervaAreaChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      organic: "Organic",
      paid: "Paid",
      referral: "Referral",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    zh: {
      organic: "自然流量",
      paid: "付费流量",
      referral: "推荐流量",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    ja: {
      organic: "オーガニック",
      paid: "有料",
      referral: "参照元",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    fr: {
      organic: "Naturel",
      paid: "Payant",
      referral: "Référents",
      months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.organic, data: [320, 332, 301, 334, 390, 430] },
    { name: text.paid, data: [120, 132, 101, 134, 190, 230] },
    { name: text.referral, data: [60, 72, 71, 74, 90, 110] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.months } };
<\/script>

<minerva-area-chart
  id="traffic"
  stacked
  height="280"
  series={chartSeries}
  options={chartOptions}
></minerva-area-chart>
`,solid:`// AreaChartStacked.tsx

// \`stacked\` piles the areas up; the curve is smooth by default.
import type { MinervaAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    organic: "Organic",
    paid: "Paid",
    referral: "Referral",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    organic: "自然流量",
    paid: "付费流量",
    referral: "推荐流量",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    organic: "オーガニック",
    paid: "有料",
    referral: "参照元",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    organic: "Naturel",
    paid: "Payant",
    referral: "Référents",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

export default function AreaChartStacked() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.organic, data: [320, 332, 301, 334, 390, 430] },
    { name: text.paid, data: [120, 132, 101, 134, 190, 230] },
    { name: text.referral, data: [60, 72, 71, 74, 90, 110] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.months } };

  return (
    <minerva-area-chart
      id="traffic"
      stacked
      height="280"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-area-chart>
  );
}
`,html:`<minerva-area-chart id="traffic" stacked height="280"></minerva-area-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`stacked\` piles the areas up; the curve is smooth by default.
  const TEXT = {
    en: {
      organic: "Organic",
      paid: "Paid",
      referral: "Referral",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    zh: {
      organic: "自然流量",
      paid: "付费流量",
      referral: "推荐流量",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    ja: {
      organic: "オーガニック",
      paid: "有料",
      referral: "参照元",
      months: ["1月", "2月", "3月", "4月", "5月", "6月"],
    },
    fr: {
      organic: "Naturel",
      paid: "Payant",
      referral: "Référents",
      months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#traffic");
  chart.series = [
    { name: text.organic, data: [320, 332, 301, 334, 390, 430] },
    { name: text.paid, data: [120, 132, 101, 134, 190, 230] },
    { name: text.referral, data: [60, 72, 71, 74, 90, 110] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.months } };
<\/script>
`}})))()}n();export{t as default};