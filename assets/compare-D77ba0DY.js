import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- RadarChartCompare.vue -->

<script setup lang="ts">
// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.

import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartIndicators = text.axes.map((name) => ({ name, max: 100 }));
const chartSeries = [
  { name: text.current, values: [72, 85, 64, 90, 58] },
  { name: text.next, values: [88, 80, 78, 92, 81] },
];
<\/script>

<template>
  <minerva-radar-chart
    id="products"
    height="320"
    :indicators.prop="chartIndicators"
    :series.prop="chartSeries"
  ></minerva-radar-chart>
</template>
`,angular:`// radar-chart-compare.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

@Component({
  selector: "app-radar-chart-compare",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-radar-chart
      id="products"
      height="320"
      [indicators]="chartIndicators"
      [series]="chartSeries"
    ></minerva-radar-chart>
  \`,
})
export class RadarChartCompareComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartIndicators = this.text.axes.map((name) => ({ name, max: 100 }));
  chartSeries = [
    { name: this.text.current, values: [72, 85, 64, 90, 58] },
    { name: this.text.next, values: [88, 80, 78, 92, 81] },
  ];
}
`,svelte:`<!-- RadarChartCompare.svelte -->

<script lang="ts">
  // One polygon per series, one value per indicator (axes clockwise from 12
  // o'clock); the legend hides / shows a series.

  import type { MinervaRadarChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      current: "Current model",
      next: "Next model",
      axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
    },
    zh: {
      current: "当前型号",
      next: "新型号",
      axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
    },
    ja: {
      current: "現行モデル",
      next: "次期モデル",
      axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
    },
    fr: {
      current: "Modèle actuel",
      next: "Nouveau modèle",
      axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartIndicators = text.axes.map((name) => ({ name, max: 100 }));
  const chartSeries = [
    { name: text.current, values: [72, 85, 64, 90, 58] },
    { name: text.next, values: [88, 80, 78, 92, 81] },
  ];
<\/script>

<minerva-radar-chart
  id="products"
  height="320"
  indicators={chartIndicators}
  series={chartSeries}
></minerva-radar-chart>
`,solid:`// RadarChartCompare.tsx

// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

export default function RadarChartCompare() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartIndicators = text.axes.map((name) => ({ name, max: 100 }));
  const chartSeries = [
    { name: text.current, values: [72, 85, 64, 90, 58] },
    { name: text.next, values: [88, 80, 78, 92, 81] },
  ];

  return (
    <minerva-radar-chart
      id="products"
      height="320"
      prop:indicators={chartIndicators}
      prop:series={chartSeries}
    ></minerva-radar-chart>
  );
}
`,html:`<minerva-radar-chart id="products" height="320"></minerva-radar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // One polygon per series, one value per indicator (axes clockwise from 12
  // o'clock); the legend hides / shows a series.
  const TEXT = {
    en: {
      current: "Current model",
      next: "Next model",
      axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
    },
    zh: {
      current: "当前型号",
      next: "新型号",
      axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
    },
    ja: {
      current: "現行モデル",
      next: "次期モデル",
      axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
    },
    fr: {
      current: "Modèle actuel",
      next: "Nouveau modèle",
      axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#products");
  chart.indicators = text.axes.map((name) => ({ name, max: 100 }));
  chart.series = [
    { name: text.current, values: [72, 85, 64, 90, 58] },
    { name: text.next, values: [88, 80, 78, 92, 81] },
  ];
<\/script>
`}})))()}n();export{t as default};