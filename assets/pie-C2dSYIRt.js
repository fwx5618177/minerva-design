import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- PieChartPie.vue -->

<script setup lang="ts">
// Slices are { name, value }; outside labels show the name and the share,
// legend clicks hide / show a slice.

import type { MinervaPieChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Search", "Direct", "Social", "Email", "Referral"],
  zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
};

const names =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [1048, 735, 580, 484, 300].map((value, i) => ({
  name: names[i],
  value,
}));
<\/script>

<template>
  <minerva-pie-chart
    id="sources"
    height="300"
    :data.prop="chartData"
  ></minerva-pie-chart>
</template>
`,angular:`// pie-chart-pie.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Slices are { name, value }; outside labels show the name and the share,
// legend clicks hide / show a slice.
import type { MinervaPieChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Search", "Direct", "Social", "Email", "Referral"],
  zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
};

@Component({
  selector: "app-pie-chart-pie",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-pie-chart
      id="sources"
      height="300"
      [data]="chartData"
    ></minerva-pie-chart>
  \`,
})
export class PieChartPieComponent {
  names = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [1048, 735, 580, 484, 300].map((value, i) => ({
    name: this.names[i],
    value,
  }));
}
`,svelte:`<!-- PieChartPie.svelte -->

<script lang="ts">
  // Slices are { name, value }; outside labels show the name and the share,
  // legend clicks hide / show a slice.

  import type { MinervaPieChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: ["Search", "Direct", "Social", "Email", "Referral"],
    zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
    ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
    fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
  };

  const names =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [1048, 735, 580, 484, 300].map((value, i) => ({
    name: names[i],
    value,
  }));
<\/script>

<minerva-pie-chart id="sources" height="300" data={chartData}></minerva-pie-chart>
`,solid:`// PieChartPie.tsx

// Slices are { name, value }; outside labels show the name and the share,
// legend clicks hide / show a slice.
import type { MinervaPieChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Search", "Direct", "Social", "Email", "Referral"],
  zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
};

export default function PieChartPie() {
  const names =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [1048, 735, 580, 484, 300].map((value, i) => ({
    name: names[i],
    value,
  }));

  return (
    <minerva-pie-chart
      id="sources"
      height="300"
      prop:data={chartData}
    ></minerva-pie-chart>
  );
}
`,html:`<minerva-pie-chart id="sources" height="300"></minerva-pie-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Slices are { name, value }; outside labels show the name and the share,
  // legend clicks hide / show a slice.
  const TEXT = {
    en: ["Search", "Direct", "Social", "Email", "Referral"],
    zh: ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
    ja: ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
    fr: ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"],
  };

  const names = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#sources");
  chart.data = [1048, 735, 580, 484, 300].map((value, i) => ({
    name: names[i],
    value,
  }));
<\/script>
`}})))()}n();export{t as default};