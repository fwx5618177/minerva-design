import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- RadialBarChartOkr.vue -->

<script setup lang="ts">
// Key results completion on one scale (\`max="100"\`): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.

import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

const names = OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
const chartData = names.map((name, i) => ({ name, value: DONE[i] }));
const chartOptions = { format: (value) => \`\${value} %\` };
<\/script>

<template>
  <minerva-radial-bar-chart
    id="okr"
    max="100"
    inner-radius="0.2"
    :data.prop="chartData"
    :options.prop="chartOptions"
  ></minerva-radial-bar-chart>
</template>
`,angular:`// radial-bar-chart-okr.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Key results completion on one scale (\`max="100"\`): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

@Component({
  selector: "app-radial-bar-chart-okr",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-radial-bar-chart
      id="okr"
      max="100"
      inner-radius="0.2"
      [data]="chartData"
      [options]="chartOptions"
    ></minerva-radial-bar-chart>
  \`,
})
export class RadialBarChartOkrComponent {
  names = OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
  chartData = this.names.map((name, i) => ({ name, value: DONE[i] }));
  chartOptions = { format: (value) => \`\${value} %\` };
}
`,svelte:`<!-- RadialBarChartOkr.svelte -->

<script lang="ts">
  // Key results completion on one scale (\`max="100"\`): the labels sit before
  // the start of the bars, in the empty quarter left by the 270° sweep.

  import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

  const OKR = {
    en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
    zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
    ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
    fr: [
      "Chiffre d’affaires",
      "Nouveaux clients",
      "Rétention",
      "NPS",
      "Recrutement",
    ],
  };

  const DONE = [92, 74, 61, 48, 35];

  const names = OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
  const chartData = names.map((name, i) => ({ name, value: DONE[i] }));
  const chartOptions = { format: (value) => \`\${value} %\` };
<\/script>

<minerva-radial-bar-chart
  id="okr"
  max="100"
  inner-radius="0.2"
  data={chartData}
  options={chartOptions}
></minerva-radial-bar-chart>
`,solid:`// RadialBarChartOkr.tsx

// Key results completion on one scale (\`max="100"\`): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import type { MinervaRadialBarChart } from "minerva-design/web-components/chart";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

export default function RadialBarChartOkr() {
  const names =
    OKR[document.documentElement.lang as keyof typeof OKR] ?? OKR.en;
  const chartData = names.map((name, i) => ({ name, value: DONE[i] }));
  const chartOptions = { format: (value) => \`\${value} %\` };

  return (
    <minerva-radial-bar-chart
      id="okr"
      max="100"
      inner-radius="0.2"
      prop:data={chartData}
      prop:options={chartOptions}
    ></minerva-radial-bar-chart>
  );
}
`,html:`<minerva-radial-bar-chart
  id="okr"
  max="100"
  inner-radius="0.2"
></minerva-radial-bar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Key results completion on one scale (\`max="100"\`): the labels sit before
  // the start of the bars, in the empty quarter left by the 270° sweep.
  const OKR = {
    en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
    zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
    ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
    fr: [
      "Chiffre d’affaires",
      "Nouveaux clients",
      "Rétention",
      "NPS",
      "Recrutement",
    ],
  };

  const DONE = [92, 74, 61, 48, 35];

  const names = OKR[document.documentElement.lang] ?? OKR.en;
  const chart = document.querySelector("#okr");
  chart.data = names.map((name, i) => ({ name, value: DONE[i] }));
  chart.options = { format: (value) => \`\${value} %\` };
<\/script>
`}})))()}n();export{t as default};