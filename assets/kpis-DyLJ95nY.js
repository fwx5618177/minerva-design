import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BulletChartKpis.vue -->

<script setup lang="ts">
// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by \`rangeLabels\` in the tooltip).

import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = KPIS.map(([value, target, ranges], i) => ({
  name: text.kpis[i],
  value,
  target,
  ranges,
}));
const chartRangeLabels = text.ranges;
<\/script>

<template>
  <minerva-bullet-chart
    id="kpis"
    :data.prop="chartData"
    :rangeLabels.prop="chartRangeLabels"
  ></minerva-bullet-chart>
</template>
`,angular:`// bullet-chart-kpis.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by \`rangeLabels\` in the tooltip).
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

@Component({
  selector: "app-bullet-chart-kpis",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-bullet-chart
      id="kpis"
      [data]="chartData"
      [rangeLabels]="chartRangeLabels"
    ></minerva-bullet-chart>
  \`,
})
export class BulletChartKpisComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = KPIS.map(([value, target, ranges], i) => ({
    name: this.text.kpis[i],
    value,
    target,
    ranges,
  }));
  chartRangeLabels = this.text.ranges;
}
`,svelte:`<!-- BulletChartKpis.svelte -->

<script lang="ts">
  // One row per KPI: the bar is the value, the marker the target, the gray
  // bands qualitative ranges (named by \`rangeLabels\` in the tooltip).

  import type { MinervaBulletChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
      ranges: ["Poor", "Fair", "Good"],
    },
    zh: {
      kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
      ranges: ["差", "一般", "良好"],
    },
    ja: {
      kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
      ranges: ["不良", "普通", "良好"],
    },
    fr: {
      kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
      ranges: ["Faible", "Correct", "Bon"],
    },
  };

  // value, target, upper bounds of the ranges
  const KPIS = [
    [270, 250, [150, 225, 300]],
    [22.5, 26, [20, 25, 30]],
    [1650, 2100, [1000, 2000, 2500]],
    [4.4, 4.5, [3.5, 4.25, 5]],
  ] as const;

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = KPIS.map(([value, target, ranges], i) => ({
    name: text.kpis[i],
    value,
    target,
    ranges,
  }));
  const chartRangeLabels = text.ranges;
<\/script>

<minerva-bullet-chart id="kpis" data={chartData} rangeLabels={chartRangeLabels}></minerva-bullet-chart>
`,solid:`// BulletChartKpis.tsx

// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by \`rangeLabels\` in the tooltip).
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

export default function BulletChartKpis() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = KPIS.map(([value, target, ranges], i) => ({
    name: text.kpis[i],
    value,
    target,
    ranges,
  }));
  const chartRangeLabels = text.ranges;

  return (
    <minerva-bullet-chart
      id="kpis"
      prop:data={chartData}
      prop:rangeLabels={chartRangeLabels}
    ></minerva-bullet-chart>
  );
}
`,html:`<minerva-bullet-chart id="kpis"></minerva-bullet-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // One row per KPI: the bar is the value, the marker the target, the gray
  // bands qualitative ranges (named by \`rangeLabels\` in the tooltip).
  const TEXT = {
    en: {
      kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
      ranges: ["Poor", "Fair", "Good"],
    },
    zh: {
      kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
      ranges: ["差", "一般", "良好"],
    },
    ja: {
      kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
      ranges: ["不良", "普通", "良好"],
    },
    fr: {
      kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
      ranges: ["Faible", "Correct", "Bon"],
    },
  };

  // value, target, upper bounds of the ranges
  const KPIS = [
    [270, 250, [150, 225, 300]],
    [22.5, 26, [20, 25, 30]],
    [1650, 2100, [1000, 2000, 2500]],
    [4.4, 4.5, [3.5, 4.25, 5]],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#kpis");
  chart.data = KPIS.map(([value, target, ranges], i) => ({
    name: text.kpis[i],
    value,
    target,
    ranges,
  }));
  chart.rangeLabels = text.ranges;
<\/script>
`}})))()}n();export{t as default};