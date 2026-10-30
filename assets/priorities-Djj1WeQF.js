import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- QuadrantChartPriorities.vue -->

<script setup lang="ts">
// Points, quadrant titles and axis titles are properties; dots are placed
// without overlapping labels.

import type { MinervaQuadrantChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Quick wins",
    bigBets: "Big bets",
    fillIns: "Fill-ins",
    timeSinks: "Time sinks",
    features: ["Dark mode", "SSO", "Search", "Export", "Onboarding", "Billing"],
  },
  zh: {
    effort: "投入",
    impact: "影响",
    quickWins: "速赢",
    bigBets: "重点投入",
    fillIns: "补充项",
    timeSinks: "低效项",
    features: ["深色模式", "单点登录", "搜索", "导出", "新手引导", "计费"],
  },
  ja: {
    effort: "工数",
    impact: "効果",
    quickWins: "クイックウィン",
    bigBets: "大型施策",
    fillIns: "穴埋め",
    timeSinks: "時間の浪費",
    features: [
      "ダークモード",
      "SSO",
      "検索",
      "エクスポート",
      "オンボーディング",
      "課金",
    ],
  },
  fr: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Gains rapides",
    bigBets: "Paris majeurs",
    fillIns: "Bouche-trous",
    timeSinks: "Pertes de temps",
    features: [
      "Mode sombre",
      "SSO",
      "Recherche",
      "Export",
      "Accueil",
      "Facturation",
    ],
  },
};

const SCORES: [number, number][] = [
  [2, 7.5],
  [7.5, 8.5],
  [6, 6.5],
  [3, 3],
  [4, 8],
  [8.5, 3.5],
];

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartPoints = SCORES.map(([x, y], i) => ({
  x,
  y,
  label: text.features[i],
}));
const chartQuadrants = {
  topLeft: { label: text.quickWins },
  topRight: { label: text.bigBets },
  bottomLeft: { label: text.fillIns },
  bottomRight: { label: text.timeSinks },
};
const chartXLabel = text.effort;
const chartYLabel = text.impact;
<\/script>

<template>
  <minerva-quadrant-chart
    id="matrix"
    height="340"
    :points.prop="chartPoints"
    :quadrants.prop="chartQuadrants"
    :xLabel.prop="chartXLabel"
    :yLabel.prop="chartYLabel"
  ></minerva-quadrant-chart>
</template>
`,angular:`// quadrant-chart-priorities.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Points, quadrant titles and axis titles are properties; dots are placed
// without overlapping labels.
import type { MinervaQuadrantChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Quick wins",
    bigBets: "Big bets",
    fillIns: "Fill-ins",
    timeSinks: "Time sinks",
    features: ["Dark mode", "SSO", "Search", "Export", "Onboarding", "Billing"],
  },
  zh: {
    effort: "投入",
    impact: "影响",
    quickWins: "速赢",
    bigBets: "重点投入",
    fillIns: "补充项",
    timeSinks: "低效项",
    features: ["深色模式", "单点登录", "搜索", "导出", "新手引导", "计费"],
  },
  ja: {
    effort: "工数",
    impact: "効果",
    quickWins: "クイックウィン",
    bigBets: "大型施策",
    fillIns: "穴埋め",
    timeSinks: "時間の浪費",
    features: [
      "ダークモード",
      "SSO",
      "検索",
      "エクスポート",
      "オンボーディング",
      "課金",
    ],
  },
  fr: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Gains rapides",
    bigBets: "Paris majeurs",
    fillIns: "Bouche-trous",
    timeSinks: "Pertes de temps",
    features: [
      "Mode sombre",
      "SSO",
      "Recherche",
      "Export",
      "Accueil",
      "Facturation",
    ],
  },
};

const SCORES: [number, number][] = [
  [2, 7.5],
  [7.5, 8.5],
  [6, 6.5],
  [3, 3],
  [4, 8],
  [8.5, 3.5],
];

@Component({
  selector: "app-quadrant-chart-priorities",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-quadrant-chart
      id="matrix"
      height="340"
      [points]="chartPoints"
      [quadrants]="chartQuadrants"
      [xLabel]="chartXLabel"
      [yLabel]="chartYLabel"
    ></minerva-quadrant-chart>
  \`,
})
export class QuadrantChartPrioritiesComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartPoints = SCORES.map(([x, y], i) => ({
    x,
    y,
    label: this.text.features[i],
  }));
  chartQuadrants = {
    topLeft: { label: this.text.quickWins },
    topRight: { label: this.text.bigBets },
    bottomLeft: { label: this.text.fillIns },
    bottomRight: { label: this.text.timeSinks },
  };
  chartXLabel = this.text.effort;
  chartYLabel = this.text.impact;
}
`,svelte:`<!-- QuadrantChartPriorities.svelte -->

<script lang="ts">
  // Points, quadrant titles and axis titles are properties; dots are placed
  // without overlapping labels.

  import type { MinervaQuadrantChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: {
      effort: "Effort",
      impact: "Impact",
      quickWins: "Quick wins",
      bigBets: "Big bets",
      fillIns: "Fill-ins",
      timeSinks: "Time sinks",
      features: ["Dark mode", "SSO", "Search", "Export", "Onboarding", "Billing"],
    },
    zh: {
      effort: "投入",
      impact: "影响",
      quickWins: "速赢",
      bigBets: "重点投入",
      fillIns: "补充项",
      timeSinks: "低效项",
      features: ["深色模式", "单点登录", "搜索", "导出", "新手引导", "计费"],
    },
    ja: {
      effort: "工数",
      impact: "効果",
      quickWins: "クイックウィン",
      bigBets: "大型施策",
      fillIns: "穴埋め",
      timeSinks: "時間の浪費",
      features: [
        "ダークモード",
        "SSO",
        "検索",
        "エクスポート",
        "オンボーディング",
        "課金",
      ],
    },
    fr: {
      effort: "Effort",
      impact: "Impact",
      quickWins: "Gains rapides",
      bigBets: "Paris majeurs",
      fillIns: "Bouche-trous",
      timeSinks: "Pertes de temps",
      features: [
        "Mode sombre",
        "SSO",
        "Recherche",
        "Export",
        "Accueil",
        "Facturation",
      ],
    },
  };

  const SCORES: [number, number][] = [
    [2, 7.5],
    [7.5, 8.5],
    [6, 6.5],
    [3, 3],
    [4, 8],
    [8.5, 3.5],
  ];

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartPoints = SCORES.map(([x, y], i) => ({
    x,
    y,
    label: text.features[i],
  }));
  const chartQuadrants = {
    topLeft: { label: text.quickWins },
    topRight: { label: text.bigBets },
    bottomLeft: { label: text.fillIns },
    bottomRight: { label: text.timeSinks },
  };
  const chartXLabel = text.effort;
  const chartYLabel = text.impact;
<\/script>

<minerva-quadrant-chart
  id="matrix"
  height="340"
  points={chartPoints}
  quadrants={chartQuadrants}
  xLabel={chartXLabel}
  yLabel={chartYLabel}
></minerva-quadrant-chart>
`,solid:`// QuadrantChartPriorities.tsx

// Points, quadrant titles and axis titles are properties; dots are placed
// without overlapping labels.
import type { MinervaQuadrantChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Quick wins",
    bigBets: "Big bets",
    fillIns: "Fill-ins",
    timeSinks: "Time sinks",
    features: ["Dark mode", "SSO", "Search", "Export", "Onboarding", "Billing"],
  },
  zh: {
    effort: "投入",
    impact: "影响",
    quickWins: "速赢",
    bigBets: "重点投入",
    fillIns: "补充项",
    timeSinks: "低效项",
    features: ["深色模式", "单点登录", "搜索", "导出", "新手引导", "计费"],
  },
  ja: {
    effort: "工数",
    impact: "効果",
    quickWins: "クイックウィン",
    bigBets: "大型施策",
    fillIns: "穴埋め",
    timeSinks: "時間の浪費",
    features: [
      "ダークモード",
      "SSO",
      "検索",
      "エクスポート",
      "オンボーディング",
      "課金",
    ],
  },
  fr: {
    effort: "Effort",
    impact: "Impact",
    quickWins: "Gains rapides",
    bigBets: "Paris majeurs",
    fillIns: "Bouche-trous",
    timeSinks: "Pertes de temps",
    features: [
      "Mode sombre",
      "SSO",
      "Recherche",
      "Export",
      "Accueil",
      "Facturation",
    ],
  },
};

const SCORES: [number, number][] = [
  [2, 7.5],
  [7.5, 8.5],
  [6, 6.5],
  [3, 3],
  [4, 8],
  [8.5, 3.5],
];

export default function QuadrantChartPriorities() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartPoints = SCORES.map(([x, y], i) => ({
    x,
    y,
    label: text.features[i],
  }));
  const chartQuadrants = {
    topLeft: { label: text.quickWins },
    topRight: { label: text.bigBets },
    bottomLeft: { label: text.fillIns },
    bottomRight: { label: text.timeSinks },
  };
  const chartXLabel = text.effort;
  const chartYLabel = text.impact;

  return (
    <minerva-quadrant-chart
      id="matrix"
      height="340"
      prop:points={chartPoints}
      prop:quadrants={chartQuadrants}
      prop:xLabel={chartXLabel}
      prop:yLabel={chartYLabel}
    ></minerva-quadrant-chart>
  );
}
`,html:`<minerva-quadrant-chart id="matrix" height="340"></minerva-quadrant-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Points, quadrant titles and axis titles are properties; dots are placed
  // without overlapping labels.
  const TEXT = {
    en: {
      effort: "Effort",
      impact: "Impact",
      quickWins: "Quick wins",
      bigBets: "Big bets",
      fillIns: "Fill-ins",
      timeSinks: "Time sinks",
      features: ["Dark mode", "SSO", "Search", "Export", "Onboarding", "Billing"],
    },
    zh: {
      effort: "投入",
      impact: "影响",
      quickWins: "速赢",
      bigBets: "重点投入",
      fillIns: "补充项",
      timeSinks: "低效项",
      features: ["深色模式", "单点登录", "搜索", "导出", "新手引导", "计费"],
    },
    ja: {
      effort: "工数",
      impact: "効果",
      quickWins: "クイックウィン",
      bigBets: "大型施策",
      fillIns: "穴埋め",
      timeSinks: "時間の浪費",
      features: [
        "ダークモード",
        "SSO",
        "検索",
        "エクスポート",
        "オンボーディング",
        "課金",
      ],
    },
    fr: {
      effort: "Effort",
      impact: "Impact",
      quickWins: "Gains rapides",
      bigBets: "Paris majeurs",
      fillIns: "Bouche-trous",
      timeSinks: "Pertes de temps",
      features: [
        "Mode sombre",
        "SSO",
        "Recherche",
        "Export",
        "Accueil",
        "Facturation",
      ],
    },
  };

  const SCORES = [
    [2, 7.5],
    [7.5, 8.5],
    [6, 6.5],
    [3, 3],
    [4, 8],
    [8.5, 3.5],
  ];

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#matrix");
  chart.points = SCORES.map(([x, y], i) => ({ x, y, label: text.features[i] }));
  chart.quadrants = {
    topLeft: { label: text.quickWins },
    topRight: { label: text.bigBets },
    bottomLeft: { label: text.fillIns },
    bottomRight: { label: text.timeSinks },
  };
  chart.xLabel = text.effort;
  chart.yLabel = text.impact;
<\/script>
`}})))()}n();export{t as default};