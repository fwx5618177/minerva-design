import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BulletChartVertical.vue -->

<script setup lang="ts">
// \`orientation="vertical"\`: columns sharing the ranges of the element
// (\`ranges\`), the targets in the danger color.

import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

const quarters =
  QUARTERS[document.documentElement.lang as keyof typeof QUARTERS] ??
  QUARTERS.en;
const chartData = quarters.map((name, i) => ({
  name,
  value: SALES[i],
  target: TARGETS[i],
}));
const chartRanges = [60, 90, 120];
<\/script>

<template>
  <minerva-bullet-chart
    id="quarters"
    orientation="vertical"
    target-color="var(--danger-color, #dc2626)"
    :data.prop="chartData"
    :ranges.prop="chartRanges"
  ></minerva-bullet-chart>
</template>
`,angular:`// bullet-chart-vertical.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`orientation="vertical"\`: columns sharing the ranges of the element
// (\`ranges\`), the targets in the danger color.
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

@Component({
  selector: "app-bullet-chart-vertical",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-bullet-chart
      id="quarters"
      orientation="vertical"
      target-color="var(--danger-color, #dc2626)"
      [data]="chartData"
      [ranges]="chartRanges"
    ></minerva-bullet-chart>
  \`,
})
export class BulletChartVerticalComponent {
  quarters =
    QUARTERS[document.documentElement.lang as keyof typeof QUARTERS] ??
    QUARTERS.en;
  chartData = this.quarters.map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  }));
  chartRanges = [60, 90, 120];
}
`,svelte:`<!-- BulletChartVertical.svelte -->

<script lang="ts">
  // \`orientation="vertical"\`: columns sharing the ranges of the element
  // (\`ranges\`), the targets in the danger color.

  import type { MinervaBulletChart } from "minerva-design/web-components/chart";

  const QUARTERS = {
    en: ["Q1", "Q2", "Q3", "Q4"],
    zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
    ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
    fr: ["T1", "T2", "T3", "T4"],
  };

  const SALES = [82, 95, 71, 104];
  const TARGETS = [90, 90, 100, 100];

  const quarters =
    QUARTERS[document.documentElement.lang as keyof typeof QUARTERS] ??
    QUARTERS.en;
  const chartData = quarters.map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  }));
  const chartRanges = [60, 90, 120];
<\/script>

<minerva-bullet-chart
  id="quarters"
  orientation="vertical"
  target-color="var(--danger-color, #dc2626)"
  data={chartData}
  ranges={chartRanges}
></minerva-bullet-chart>
`,solid:`// BulletChartVertical.tsx

// \`orientation="vertical"\`: columns sharing the ranges of the element
// (\`ranges\`), the targets in the danger color.
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

export default function BulletChartVertical() {
  const quarters =
    QUARTERS[document.documentElement.lang as keyof typeof QUARTERS] ??
    QUARTERS.en;
  const chartData = quarters.map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  }));
  const chartRanges = [60, 90, 120];

  return (
    <minerva-bullet-chart
      id="quarters"
      orientation="vertical"
      target-color="var(--danger-color, #dc2626)"
      prop:data={chartData}
      prop:ranges={chartRanges}
    ></minerva-bullet-chart>
  );
}
`,html:`<minerva-bullet-chart
  id="quarters"
  orientation="vertical"
  target-color="var(--danger-color, #dc2626)"
></minerva-bullet-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`orientation="vertical"\`: columns sharing the ranges of the element
  // (\`ranges\`), the targets in the danger color.
  const QUARTERS = {
    en: ["Q1", "Q2", "Q3", "Q4"],
    zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
    ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
    fr: ["T1", "T2", "T3", "T4"],
  };

  const SALES = [82, 95, 71, 104];
  const TARGETS = [90, 90, 100, 100];

  const quarters = QUARTERS[document.documentElement.lang] ?? QUARTERS.en;
  const chart = document.querySelector("#quarters");
  chart.data = quarters.map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  }));
  chart.ranges = [60, 90, 120];
<\/script>
`}})))()}n();export{t as default};