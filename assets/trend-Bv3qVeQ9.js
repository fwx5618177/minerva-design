import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- LineChartTrend.vue -->

<script setup lang="ts">
// \`series\` and \`options\` are JS properties; the labels follow the page language.

import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
  { name: text.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
];
const chartOptions = { xAxis: { type: "category", categories: text.days } };
<\/script>

<template>
  <minerva-line-chart
    id="trend"
    curve="smooth"
    height="280"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-line-chart>
</template>
`,angular:`// line-chart-trend.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`series\` and \`options\` are JS properties; the labels follow the page language.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

@Component({
  selector: "app-line-chart-trend",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-line-chart
      id="trend"
      curve="smooth"
      height="280"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-line-chart>
  \`,
})
export class LineChartTrendComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
    { name: this.text.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
  ];
  chartOptions = { xAxis: { type: "category", categories: this.text.days } };
}
`,svelte:`<!-- LineChartTrend.svelte -->

<script lang="ts">
  // \`series\` and \`options\` are JS properties; the labels follow the page language.

  import type { MinervaLineChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      thisWeek: "This week",
      lastWeek: "Last week",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    zh: {
      thisWeek: "本周",
      lastWeek: "上周",
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    ja: {
      thisWeek: "今週",
      lastWeek: "先週",
      days: ["月", "火", "水", "木", "金", "土", "日"],
    },
    fr: {
      thisWeek: "Cette semaine",
      lastWeek: "Semaine dernière",
      days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
    { name: text.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.days } };
<\/script>

<minerva-line-chart
  id="trend"
  curve="smooth"
  height="280"
  series={chartSeries}
  options={chartOptions}
></minerva-line-chart>
`,solid:`// LineChartTrend.tsx

// \`series\` and \`options\` are JS properties; the labels follow the page language.
import type { MinervaLineChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

export default function LineChartTrend() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
    { name: text.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.days } };

  return (
    <minerva-line-chart
      id="trend"
      curve="smooth"
      height="280"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-line-chart>
  );
}
`,html:`<minerva-line-chart id="trend" curve="smooth" height="280"></minerva-line-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`series\` and \`options\` are JS properties; the labels follow the page language.
  const TEXT = {
    en: {
      thisWeek: "This week",
      lastWeek: "Last week",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    zh: {
      thisWeek: "本周",
      lastWeek: "上周",
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    ja: {
      thisWeek: "今週",
      lastWeek: "先週",
      days: ["月", "火", "水", "木", "金", "土", "日"],
    },
    fr: {
      thisWeek: "Cette semaine",
      lastWeek: "Semaine dernière",
      days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#trend");
  chart.series = [
    { name: text.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
    { name: text.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.days } };
<\/script>
`}})))()}n();export{t as default};