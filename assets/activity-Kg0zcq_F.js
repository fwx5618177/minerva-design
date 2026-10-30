import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- RadialBarChartActivity.vue -->

<script setup lang="ts">
// Activity rings: each bar has its own \`max\` (the goal), \`sweep="360"\` makes
// full rings and the center texts summarize them.

import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [
  { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
  { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
  { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
];
const chartCenterLabel = text.today;
const chartOptions = { labelContent: ["name", "percent"] };
<\/script>

<template>
  <minerva-radial-bar-chart
    id="activity"
    sweep="360"
    center-value="78 %"
    :data.prop="chartData"
    :centerLabel.prop="chartCenterLabel"
    :options.prop="chartOptions"
  ></minerva-radial-bar-chart>
</template>
`,angular:`// radial-bar-chart-activity.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Activity rings: each bar has its own \`max\` (the goal), \`sweep="360"\` makes
// full rings and the center texts summarize them.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

@Component({
  selector: "app-radial-bar-chart-activity",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-radial-bar-chart
      id="activity"
      sweep="360"
      center-value="78 %"
      [data]="chartData"
      [centerLabel]="chartCenterLabel"
      [options]="chartOptions"
    ></minerva-radial-bar-chart>
  \`,
})
export class RadialBarChartActivityComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [
    { name: this.text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: this.text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: this.text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  chartCenterLabel = this.text.today;
  chartOptions = { labelContent: ["name", "percent"] };
}
`,svelte:`<!-- RadialBarChartActivity.svelte -->

<script lang="ts">
  // Activity rings: each bar has its own \`max\` (the goal), \`sweep="360"\` makes
  // full rings and the center texts summarize them.

  import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
    zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
    ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
    fr: {
      rings: ["Bouger", "M’entraîner", "Me lever"],
      today: "des objectifs du jour",
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  const chartCenterLabel = text.today;
  const chartOptions = { labelContent: ["name", "percent"] };
<\/script>

<minerva-radial-bar-chart
  id="activity"
  sweep="360"
  center-value="78 %"
  data={chartData}
  centerLabel={chartCenterLabel}
  options={chartOptions}
></minerva-radial-bar-chart>
`,solid:`// RadialBarChartActivity.tsx

// Activity rings: each bar has its own \`max\` (the goal), \`sweep="360"\` makes
// full rings and the center texts summarize them.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

export default function RadialBarChartActivity() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  const chartCenterLabel = text.today;
  const chartOptions = { labelContent: ["name", "percent"] };

  return (
    <minerva-radial-bar-chart
      id="activity"
      sweep="360"
      center-value="78 %"
      prop:data={chartData}
      prop:centerLabel={chartCenterLabel}
      prop:options={chartOptions}
    ></minerva-radial-bar-chart>
  );
}
`,html:`<minerva-radial-bar-chart
  id="activity"
  sweep="360"
  center-value="78 %"
></minerva-radial-bar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Activity rings: each bar has its own \`max\` (the goal), \`sweep="360"\` makes
  // full rings and the center texts summarize them.
  const TEXT = {
    en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
    zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
    ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
    fr: {
      rings: ["Bouger", "M’entraîner", "Me lever"],
      today: "des objectifs du jour",
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#activity");
  chart.data = [
    { name: text.rings[0], value: 420, max: 500, color: "#ef4444" },
    { name: text.rings[1], value: 24, max: 30, color: "#22c55e" },
    { name: text.rings[2], value: 9, max: 12, color: "#06b6d4" },
  ];
  chart.centerLabel = text.today;
  chart.options = { labelContent: ["name", "percent"] };
<\/script>
`}})))()}n();export{t as default};