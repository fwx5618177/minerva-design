import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SunburstChartDrillDown.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// minerva-drill reports the path from the root to the focused node:
// a breadcrumb outside of the chart.

import type {
  MinervaSunburstChart,
  ShapeDrillEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

const pathText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartData = [
  {
    name: text.teams[0],
    children: [
      { name: text.groups[0], value: 18 },
      { name: text.groups[1], value: 11 },
      { name: text.groups[2], value: 14 },
    ],
  },
  {
    name: text.teams[1],
    children: [
      { name: text.groups[3], value: 16 },
      { name: text.groups[4], value: 12 },
    ],
  },
  {
    name: text.teams[2],
    children: [
      { name: text.groups[5], value: 20 },
      { name: text.groups[6], value: 8 },
    ],
  },
];
const onDrill = (event: Event) => {
  const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
  pathText.value = [text.root, ...names].join(" › ");
};

onMounted(() => {
  pathText.value = \`\${text.root} · \${text.hint}\`;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-sunburst-chart
      id="org"
      inner-radius="0.32"
      :data.prop="chartData"
      @minerva-drill="onDrill"
    ></minerva-sunburst-chart>
    <output id="path" aria-live="polite">{{ pathText }}</output>
  </div>
</template>
`,angular:`// sunburst-chart-drill-down.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// minerva-drill reports the path from the root to the focused node:
// a breadcrumb outside of the chart.
import type {
  MinervaSunburstChart,
  ShapeDrillEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

@Component({
  selector: "app-sunburst-chart-drill-down",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-sunburst-chart
        id="org"
        inner-radius="0.32"
        [data]="chartData"
        (minerva-drill)="onDrill($event)"
      ></minerva-sunburst-chart>
      <output id="path" aria-live="polite">{{ pathText }}</output>
    </div>
  \`,
})
export class SunburstChartDrillDownComponent implements AfterViewInit {
  pathText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartData = [
    {
      name: this.text.teams[0],
      children: [
        { name: this.text.groups[0], value: 18 },
        { name: this.text.groups[1], value: 11 },
        { name: this.text.groups[2], value: 14 },
      ],
    },
    {
      name: this.text.teams[1],
      children: [
        { name: this.text.groups[3], value: 16 },
        { name: this.text.groups[4], value: 12 },
      ],
    },
    {
      name: this.text.teams[2],
      children: [
        { name: this.text.groups[5], value: 20 },
        { name: this.text.groups[6], value: 8 },
      ],
    },
  ];
  onDrill = (event: Event) => {
    const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
    this.pathText = [this.text.root, ...names].join(" › ");
  };

  ngAfterViewInit(): void {
    this.pathText = \`\${this.text.root} · \${this.text.hint}\`;
  }
}
`,svelte:`<!-- SunburstChartDrillDown.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // minerva-drill reports the path from the root to the focused node:
  // a breadcrumb outside of the chart.

  import type {
    MinervaSunburstChart,
    ShapeDrillEvent,
  } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      root: "Company",
      teams: ["Engineering", "Sales", "Support"],
      groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
      hint: "Click a team",
    },
    zh: {
      root: "公司",
      teams: ["研发", "销售", "客服"],
      groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
      hint: "点击一个团队",
    },
    ja: {
      root: "会社",
      teams: ["エンジニアリング", "営業", "サポート"],
      groups: [
        "Web",
        "モバイル",
        "プラットフォーム",
        "ヨーロッパ",
        "アジア",
        "一次対応",
        "二次対応",
      ],
      hint: "チームをクリックします",
    },
    fr: {
      root: "Entreprise",
      teams: ["Ingénierie", "Ventes", "Support"],
      groups: [
        "Web",
        "Mobile",
        "Plateforme",
        "Europe",
        "Asie",
        "Niveau 1",
        "Niveau 2",
      ],
      hint: "Cliquez sur une équipe",
    },
  };

  let pathText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
  const onDrill = (event: Event) => {
    const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
    pathText = [text.root, ...names].join(" › ");
  };

  onMount(() => {
    pathText = \`\${text.root} · \${text.hint}\`;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-sunburst-chart
    id="org"
    inner-radius="0.32"
    data={chartData}
    onminerva-drill={onDrill}
  ></minerva-sunburst-chart>
  <output id="path" aria-live="polite">{pathText}</output>
</div>
`,solid:`// SunburstChartDrillDown.tsx

import { createSignal, onMount } from "solid-js";

// minerva-drill reports the path from the root to the focused node:
// a breadcrumb outside of the chart.
import type {
  MinervaSunburstChart,
  ShapeDrillEvent,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    root: "Company",
    teams: ["Engineering", "Sales", "Support"],
    groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    hint: "Click a team",
  },
  zh: {
    root: "公司",
    teams: ["研发", "销售", "客服"],
    groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    hint: "点击一个团队",
  },
  ja: {
    root: "会社",
    teams: ["エンジニアリング", "営業", "サポート"],
    groups: [
      "Web",
      "モバイル",
      "プラットフォーム",
      "ヨーロッパ",
      "アジア",
      "一次対応",
      "二次対応",
    ],
    hint: "チームをクリックします",
  },
  fr: {
    root: "Entreprise",
    teams: ["Ingénierie", "Ventes", "Support"],
    groups: [
      "Web",
      "Mobile",
      "Plateforme",
      "Europe",
      "Asie",
      "Niveau 1",
      "Niveau 2",
    ],
    hint: "Cliquez sur une équipe",
  },
};

export default function SunburstChartDrillDown() {
  const [pathText, setPathText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartData = [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
  const onDrill = (event: Event) => {
    const { path: names } = (event as CustomEvent<ShapeDrillEvent>).detail;
    setPathText([text.root, ...names].join(" › "));
  };

  onMount(() => {
    setPathText(\`\${text.root} · \${text.hint}\`);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-sunburst-chart
        id="org"
        inner-radius="0.32"
        prop:data={chartData}
        on:minerva-drill={onDrill}
      ></minerva-sunburst-chart>
      <output id="path" aria-live="polite">
        {pathText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-sunburst-chart id="org" inner-radius="0.32"></minerva-sunburst-chart>
  <output id="path" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // minerva-drill reports the path from the root to the focused node:
  // a breadcrumb outside of the chart.
  const TEXT = {
    en: {
      root: "Company",
      teams: ["Engineering", "Sales", "Support"],
      groups: ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
      hint: "Click a team",
    },
    zh: {
      root: "公司",
      teams: ["研发", "销售", "客服"],
      groups: ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
      hint: "点击一个团队",
    },
    ja: {
      root: "会社",
      teams: ["エンジニアリング", "営業", "サポート"],
      groups: [
        "Web",
        "モバイル",
        "プラットフォーム",
        "ヨーロッパ",
        "アジア",
        "一次対応",
        "二次対応",
      ],
      hint: "チームをクリックします",
    },
    fr: {
      root: "Entreprise",
      teams: ["Ingénierie", "Ventes", "Support"],
      groups: [
        "Web",
        "Mobile",
        "Plateforme",
        "Europe",
        "Asie",
        "Niveau 1",
        "Niveau 2",
      ],
      hint: "Cliquez sur une équipe",
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#org");
  const path = document.querySelector("#path");
  chart.data = [
    {
      name: text.teams[0],
      children: [
        { name: text.groups[0], value: 18 },
        { name: text.groups[1], value: 11 },
        { name: text.groups[2], value: 14 },
      ],
    },
    {
      name: text.teams[1],
      children: [
        { name: text.groups[3], value: 16 },
        { name: text.groups[4], value: 12 },
      ],
    },
    {
      name: text.teams[2],
      children: [
        { name: text.groups[5], value: 20 },
        { name: text.groups[6], value: 8 },
      ],
    },
  ];
  path.textContent = \`\${text.root} · \${text.hint}\`;
  const onDrill = (event) => {
    const { path: names } = event.detail;
    path.textContent = [text.root, ...names].join(" › ");
  };
  chart.addEventListener("minerva-drill", onDrill);
<\/script>
`}})))()}n();export{t as default};