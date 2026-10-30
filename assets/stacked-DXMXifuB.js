import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BarChartStacked.vue -->

<script setup lang="ts">
// \`stacked\` piles the bars of each category (a series can still set its
// own \`type\`, e.g. a line).

import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
  { name: text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
  { name: text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
];
const chartOptions = { xAxis: { type: "category", categories: text.days } };
<\/script>

<template>
  <minerva-bar-chart
    id="devices"
    stacked
    height="280"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-bar-chart>
</template>
`,angular:`// bar-chart-stacked.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`stacked\` piles the bars of each category (a series can still set its
// own \`type\`, e.g. a line).
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

@Component({
  selector: "app-bar-chart-stacked",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-bar-chart
      id="devices"
      stacked
      height="280"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-bar-chart>
  \`,
})
export class BarChartStackedComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
    { name: this.text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
    { name: this.text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
  ];
  chartOptions = { xAxis: { type: "category", categories: this.text.days } };
}
`,svelte:`<!-- BarChartStacked.svelte -->

<script lang="ts">
  // \`stacked\` piles the bars of each category (a series can still set its
  // own \`type\`, e.g. a line).

  import type { MinervaBarChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      desktop: "Desktop",
      mobile: "Mobile",
      tablet: "Tablet",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    zh: {
      desktop: "桌面端",
      mobile: "移动端",
      tablet: "平板",
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    ja: {
      desktop: "デスクトップ",
      mobile: "モバイル",
      tablet: "タブレット",
      days: ["月", "火", "水", "木", "金", "土", "日"],
    },
    fr: {
      desktop: "Ordinateur",
      mobile: "Mobile",
      tablet: "Tablette",
      days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
    { name: text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
    { name: text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.days } };
<\/script>

<minerva-bar-chart
  id="devices"
  stacked
  height="280"
  series={chartSeries}
  options={chartOptions}
></minerva-bar-chart>
`,solid:`// BarChartStacked.tsx

// \`stacked\` piles the bars of each category (a series can still set its
// own \`type\`, e.g. a line).
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

export default function BarChartStacked() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
    { name: text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
    { name: text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
  ];
  const chartOptions = { xAxis: { type: "category", categories: text.days } };

  return (
    <minerva-bar-chart
      id="devices"
      stacked
      height="280"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-bar-chart>
  );
}
`,html:`<minerva-bar-chart id="devices" stacked height="280"></minerva-bar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`stacked\` piles the bars of each category (a series can still set its
  // own \`type\`, e.g. a line).
  const TEXT = {
    en: {
      desktop: "Desktop",
      mobile: "Mobile",
      tablet: "Tablet",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    zh: {
      desktop: "桌面端",
      mobile: "移动端",
      tablet: "平板",
      days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    ja: {
      desktop: "デスクトップ",
      mobile: "モバイル",
      tablet: "タブレット",
      days: ["月", "火", "水", "木", "金", "土", "日"],
    },
    fr: {
      desktop: "Ordinateur",
      mobile: "Mobile",
      tablet: "Tablette",
      days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#devices");
  chart.series = [
    { name: text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
    { name: text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
    { name: text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.days } };
<\/script>
`}})))()}n();export{t as default};