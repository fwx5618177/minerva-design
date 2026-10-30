import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- FunnelChartConversion.vue -->

<script setup lang="ts">
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.

import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

const stages =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [12000, 4800, 2100, 860].map((value, i) => ({
  name: stages[i],
  value,
}));
<\/script>

<template>
  <minerva-funnel-chart
    id="signup"
    height="300"
    :data.prop="chartData"
  ></minerva-funnel-chart>
</template>
`,angular:`// funnel-chart-conversion.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

@Component({
  selector: "app-funnel-chart-conversion",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-funnel-chart
      id="signup"
      height="300"
      [data]="chartData"
    ></minerva-funnel-chart>
  \`,
})
export class FunnelChartConversionComponent {
  stages = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [12000, 4800, 2100, 860].map((value, i) => ({
    name: this.stages[i],
    value,
  }));
}
`,svelte:`<!-- FunnelChartConversion.svelte -->

<script lang="ts">
  // Stages narrow to the next one; the labels show the conversion rate from
  // the previous stage.

  import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: ["Visits", "Sign-ups", "Trials", "Purchases"],
    zh: ["访问", "注册", "试用", "购买"],
    ja: ["訪問", "登録", "トライアル", "購入"],
    fr: ["Visites", "Inscriptions", "Essais", "Achats"],
  };

  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));
<\/script>

<minerva-funnel-chart id="signup" height="300" data={chartData}></minerva-funnel-chart>
`,solid:`// FunnelChartConversion.tsx

// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

export default function FunnelChartConversion() {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));

  return (
    <minerva-funnel-chart
      id="signup"
      height="300"
      prop:data={chartData}
    ></minerva-funnel-chart>
  );
}
`,html:`<minerva-funnel-chart id="signup" height="300"></minerva-funnel-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Stages narrow to the next one; the labels show the conversion rate from
  // the previous stage.
  const TEXT = {
    en: ["Visits", "Sign-ups", "Trials", "Purchases"],
    zh: ["访问", "注册", "试用", "购买"],
    ja: ["訪問", "登録", "トライアル", "購入"],
    fr: ["Visites", "Inscriptions", "Essais", "Achats"],
  };

  const stages = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#signup");
  chart.data = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));
<\/script>
`}})))()}n();export{t as default};