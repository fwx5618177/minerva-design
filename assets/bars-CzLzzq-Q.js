import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- FunnelChartBars.vue -->

<script setup lang="ts">
// \`shape="bar"\` draws centered bars, \`sort="descending"\` orders the stages
// by value.

import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

const stages =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [180, 940, 42, 410, 31].map((value, i) => ({
  name: stages[i],
  value,
}));
<\/script>

<template>
  <minerva-funnel-chart
    id="hiring"
    shape="bar"
    sort="descending"
    height="300"
    :data.prop="chartData"
  ></minerva-funnel-chart>
</template>
`,angular:`// funnel-chart-bars.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`shape="bar"\` draws centered bars, \`sort="descending"\` orders the stages
// by value.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

@Component({
  selector: "app-funnel-chart-bars",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-funnel-chart
      id="hiring"
      shape="bar"
      sort="descending"
      height="300"
      [data]="chartData"
    ></minerva-funnel-chart>
  \`,
})
export class FunnelChartBarsComponent {
  stages = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [180, 940, 42, 410, 31].map((value, i) => ({
    name: this.stages[i],
    value,
  }));
}
`,svelte:`<!-- FunnelChartBars.svelte -->

<script lang="ts">
  // \`shape="bar"\` draws centered bars, \`sort="descending"\` orders the stages
  // by value.

  import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
    zh: ["面试", "申请", "录用通知", "筛选", "入职"],
    ja: ["面接", "応募", "内定", "書類選考", "採用"],
    fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
  };

  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));
<\/script>

<minerva-funnel-chart
  id="hiring"
  shape="bar"
  sort="descending"
  height="300"
  data={chartData}
></minerva-funnel-chart>
`,solid:`// FunnelChartBars.tsx

// \`shape="bar"\` draws centered bars, \`sort="descending"\` orders the stages
// by value.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

export default function FunnelChartBars() {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));

  return (
    <minerva-funnel-chart
      id="hiring"
      shape="bar"
      sort="descending"
      height="300"
      prop:data={chartData}
    ></minerva-funnel-chart>
  );
}
`,html:`<minerva-funnel-chart
  id="hiring"
  shape="bar"
  sort="descending"
  height="300"
></minerva-funnel-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`shape="bar"\` draws centered bars, \`sort="descending"\` orders the stages
  // by value.
  const TEXT = {
    en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
    zh: ["面试", "申请", "录用通知", "筛选", "入职"],
    ja: ["面接", "応募", "内定", "書類選考", "採用"],
    fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
  };

  const stages = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#hiring");
  chart.data = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));
<\/script>
`}})))()}n();export{t as default};