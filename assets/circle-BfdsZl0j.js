import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- RadarChartCircle.vue -->

<script setup lang="ts">
// \`shape="circle"\` draws round grid rings, \`levels\` sets how many.

import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    profile: "Profile",
    skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
  },
  zh: {
    profile: "能力画像",
    skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
  },
  ja: {
    profile: "プロフィール",
    skills: [
      "フロントエンド",
      "バックエンド",
      "デザイン",
      "テスト",
      "DevOps",
      "データ",
    ],
  },
  fr: {
    profile: "Profil",
    skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
  },
};

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartIndicators = text.skills.map((name) => ({ name, max: 10 }));
const chartSeries = [{ name: text.profile, values: [9, 6, 7, 8, 5, 6] }];
<\/script>

<template>
  <minerva-radar-chart
    id="skills"
    shape="circle"
    levels="5"
    height="320"
    :indicators.prop="chartIndicators"
    :series.prop="chartSeries"
  ></minerva-radar-chart>
</template>
`,angular:`// radar-chart-circle.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`shape="circle"\` draws round grid rings, \`levels\` sets how many.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    profile: "Profile",
    skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
  },
  zh: {
    profile: "能力画像",
    skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
  },
  ja: {
    profile: "プロフィール",
    skills: [
      "フロントエンド",
      "バックエンド",
      "デザイン",
      "テスト",
      "DevOps",
      "データ",
    ],
  },
  fr: {
    profile: "Profil",
    skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
  },
};

@Component({
  selector: "app-radar-chart-circle",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-radar-chart
      id="skills"
      shape="circle"
      levels="5"
      height="320"
      [indicators]="chartIndicators"
      [series]="chartSeries"
    ></minerva-radar-chart>
  \`,
})
export class RadarChartCircleComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartIndicators = this.text.skills.map((name) => ({ name, max: 10 }));
  chartSeries = [{ name: this.text.profile, values: [9, 6, 7, 8, 5, 6] }];
}
`,svelte:`<!-- RadarChartCircle.svelte -->

<script lang="ts">
  // \`shape="circle"\` draws round grid rings, \`levels\` sets how many.

  import type { MinervaRadarChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      profile: "Profile",
      skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
    },
    zh: {
      profile: "能力画像",
      skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
    },
    ja: {
      profile: "プロフィール",
      skills: [
        "フロントエンド",
        "バックエンド",
        "デザイン",
        "テスト",
        "DevOps",
        "データ",
      ],
    },
    fr: {
      profile: "Profil",
      skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
    },
  };

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartIndicators = text.skills.map((name) => ({ name, max: 10 }));
  const chartSeries = [{ name: text.profile, values: [9, 6, 7, 8, 5, 6] }];
<\/script>

<minerva-radar-chart
  id="skills"
  shape="circle"
  levels="5"
  height="320"
  indicators={chartIndicators}
  series={chartSeries}
></minerva-radar-chart>
`,solid:`// RadarChartCircle.tsx

// \`shape="circle"\` draws round grid rings, \`levels\` sets how many.
import type { MinervaRadarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    profile: "Profile",
    skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
  },
  zh: {
    profile: "能力画像",
    skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
  },
  ja: {
    profile: "プロフィール",
    skills: [
      "フロントエンド",
      "バックエンド",
      "デザイン",
      "テスト",
      "DevOps",
      "データ",
    ],
  },
  fr: {
    profile: "Profil",
    skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
  },
};

export default function RadarChartCircle() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartIndicators = text.skills.map((name) => ({ name, max: 10 }));
  const chartSeries = [{ name: text.profile, values: [9, 6, 7, 8, 5, 6] }];

  return (
    <minerva-radar-chart
      id="skills"
      shape="circle"
      levels="5"
      height="320"
      prop:indicators={chartIndicators}
      prop:series={chartSeries}
    ></minerva-radar-chart>
  );
}
`,html:`<minerva-radar-chart
  id="skills"
  shape="circle"
  levels="5"
  height="320"
></minerva-radar-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // \`shape="circle"\` draws round grid rings, \`levels\` sets how many.
  const TEXT = {
    en: {
      profile: "Profile",
      skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
    },
    zh: {
      profile: "能力画像",
      skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
    },
    ja: {
      profile: "プロフィール",
      skills: [
        "フロントエンド",
        "バックエンド",
        "デザイン",
        "テスト",
        "DevOps",
        "データ",
      ],
    },
    fr: {
      profile: "Profil",
      skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#skills");
  chart.indicators = text.skills.map((name) => ({ name, max: 10 }));
  chart.series = [{ name: text.profile, values: [9, 6, 7, 8, 5, 6] }];
<\/script>
`}})))()}n();export{t as default};