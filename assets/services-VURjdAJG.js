import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- BoxplotChartServices.vue -->

<script setup lang="ts">
// Raw samples per service (\`groups\`): the element computes the quartiles,
// Tukey whiskers (1.5 IQR) and draws the outliers as dots.

import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartGroups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
const chartValueName = text.time;
const chartOptions = {
  xAxis: { type: "category" },
  yAxis: { title: text.time },
};
<\/script>

<template>
  <minerva-box-plot-chart
    id="services"
    height="300"
    :groups.prop="chartGroups"
    :valueName.prop="chartValueName"
    :options.prop="chartOptions"
  ></minerva-box-plot-chart>
</template>
`,angular:`// boxplot-chart-services.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Raw samples per service (\`groups\`): the element computes the quartiles,
// Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

@Component({
  selector: "app-boxplot-chart-services",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-box-plot-chart
      id="services"
      height="300"
      [groups]="chartGroups"
      [valueName]="chartValueName"
      [options]="chartOptions"
    ></minerva-box-plot-chart>
  \`,
})
export class BoxplotChartServicesComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartGroups = this.text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  chartValueName = this.text.time;
  chartOptions = {
    xAxis: { type: "category" },
    yAxis: { title: this.text.time },
  };
}
`,svelte:`<!-- BoxplotChartServices.svelte -->

<script lang="ts">
  // Raw samples per service (\`groups\`): the element computes the quartiles,
  // Tukey whiskers (1.5 IQR) and draws the outliers as dots.

  import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      time: "Response time (ms)",
      services: ["Search", "Checkout", "Profile", "Images"],
    },
    zh: {
      time: "响应时间（毫秒）",
      services: ["搜索", "结账", "个人资料", "图片"],
    },
    ja: {
      time: "応答時間（ms）",
      services: ["検索", "決済", "プロフィール", "画像"],
    },
    fr: {
      time: "Temps de réponse (ms)",
      services: ["Recherche", "Paiement", "Profil", "Images"],
    },
  };

  // response times (ms) sampled per service
  const SAMPLES = [
    [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
    [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
    [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
    [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartGroups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  const chartValueName = text.time;
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis: { title: text.time },
  };
<\/script>

<minerva-box-plot-chart
  id="services"
  height="300"
  groups={chartGroups}
  valueName={chartValueName}
  options={chartOptions}
></minerva-box-plot-chart>
`,solid:`// BoxplotChartServices.tsx

// Raw samples per service (\`groups\`): the element computes the quartiles,
// Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

export default function BoxplotChartServices() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartGroups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  const chartValueName = text.time;
  const chartOptions = {
    xAxis: { type: "category" },
    yAxis: { title: text.time },
  };

  return (
    <minerva-box-plot-chart
      id="services"
      height="300"
      prop:groups={chartGroups}
      prop:valueName={chartValueName}
      prop:options={chartOptions}
    ></minerva-box-plot-chart>
  );
}
`,html:`<minerva-box-plot-chart id="services" height="300"></minerva-box-plot-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Raw samples per service (\`groups\`): the element computes the quartiles,
  // Tukey whiskers (1.5 IQR) and draws the outliers as dots.
  const TEXT = {
    en: {
      time: "Response time (ms)",
      services: ["Search", "Checkout", "Profile", "Images"],
    },
    zh: {
      time: "响应时间（毫秒）",
      services: ["搜索", "结账", "个人资料", "图片"],
    },
    ja: {
      time: "応答時間（ms）",
      services: ["検索", "決済", "プロフィール", "画像"],
    },
    fr: {
      time: "Temps de réponse (ms)",
      services: ["Recherche", "Paiement", "Profil", "Images"],
    },
  };

  // response times (ms) sampled per service
  const SAMPLES = [
    [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
    [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
    [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
    [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#services");
  chart.groups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  chart.valueName = text.time;
  chart.options = { xAxis: { type: "category" }, yAxis: { title: text.time } };
<\/script>
`}})))()}n();export{t as default};