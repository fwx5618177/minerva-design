import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BoxplotChartHorizontal.vue -->

<script setup lang="ts">
// \`orientation="horizontal"\` lays the boxes out in rows; \`whisker="minmax"\`
// extends the whiskers to the extremes (no outliers).

import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartGroups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
const chartValueName = text.score;
const chartOptions = {
  xAxis: { type: "category" },
  yAxis: { min: 0, max: 100 },
};
<\/script>

<template>
  <minerva-box-plot-chart
    id="scores"
    orientation="horizontal"
    whisker="minmax"
    height="240"
    :groups.prop="chartGroups"
    :valueName.prop="chartValueName"
    :options.prop="chartOptions"
  ></minerva-box-plot-chart>
</template>
`,angular:`// boxplot-chart-horizontal.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`orientation="horizontal"\` lays the boxes out in rows; \`whisker="minmax"\`
// extends the whiskers to the extremes (no outliers).
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

@Component({
  selector: "app-boxplot-chart-horizontal",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-box-plot-chart
      id="scores"
      orientation="horizontal"
      whisker="minmax"
      height="240"
      [groups]="chartGroups"
      [valueName]="chartValueName"
      [options]="chartOptions"
    ></minerva-box-plot-chart>
  \`,
})
export class BoxplotChartHorizontalComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartGroups = this.text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  chartValueName = this.text.score;
  chartOptions = { xAxis: { type: "category" }, yAxis: { min: 0, max: 100 } };
}
`,svelte:`<!-- BoxplotChartHorizontal.svelte -->

<script lang="ts">
  // \`orientation="horizontal"\` lays the boxes out in rows; \`whisker="minmax"\`
  // extends the whiskers to the extremes (no outliers).

  import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
    zh: { score: "分数", classes: ["一班", "二班", "三班"] },
    ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
    fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
  };

  const SCORES = [
    [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
    [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
    [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartGroups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  const chartValueName = text.score;
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis: { min: 0, max: 100 },
  };
<\/script>

<minerva-box-plot-chart
  id="scores"
  orientation="horizontal"
  whisker="minmax"
  height="240"
  groups={chartGroups}
  valueName={chartValueName}
  options={chartOptions}
></minerva-box-plot-chart>
`,solid:`// BoxplotChartHorizontal.tsx

// \`orientation="horizontal"\` lays the boxes out in rows; \`whisker="minmax"\`
// extends the whiskers to the extremes (no outliers).
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

export default function BoxplotChartHorizontal() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartGroups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  const chartValueName = text.score;
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis: { min: 0, max: 100 },
  };

  return (
    <minerva-box-plot-chart
      id="scores"
      orientation="horizontal"
      whisker="minmax"
      height="240"
      prop:groups={chartGroups}
      prop:valueName={chartValueName}
      prop:options={chartOptions}
    ></minerva-box-plot-chart>
  );
}
`,html:`<minerva-box-plot-chart
  id="scores"
  orientation="horizontal"
  whisker="minmax"
  height="240"
></minerva-box-plot-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`orientation="horizontal"\` lays the boxes out in rows; \`whisker="minmax"\`
  // extends the whiskers to the extremes (no outliers).
  const TEXT = {
    en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
    zh: { score: "分数", classes: ["一班", "二班", "三班"] },
    ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
    fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
  };

  const SCORES = [
    [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
    [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
    [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#scores");
  chart.groups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  chart.valueName = text.score;
  chart.options = { xAxis: { type: "category" }, yAxis: { min: 0, max: 100 } };
<\/script>
`}})))()}n();export{t as default};