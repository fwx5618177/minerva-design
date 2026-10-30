import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TreeChartMindMap.vue -->

<script setup lang="ts">
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.

import type { MinervaTreeChart } from "minerva-design/web-components/graph";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

const topics =
  TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
const chartNodes = topics.map((label, i) => ({
  id: \`t\${i}\`,
  label,
  group: \`b\${branchOf(i)}\`,
}));
const chartEdges = PARENT.flatMap((parent, i) =>
  parent < 0 ? [] : [{ source: \`t\${parent}\`, target: \`t\${i}\` }],
);
const chartOptions = { legend: false };
<\/script>

<template>
  <minerva-tree-chart
    id="launch"
    layout="mindmap"
    height="420"
    :nodes.prop="chartNodes"
    :edges.prop="chartEdges"
    :options.prop="chartOptions"
  ></minerva-tree-chart>
</template>
`,angular:`// tree-chart-mind-map.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import type { MinervaTreeChart } from "minerva-design/web-components/graph";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

@Component({
  selector: "app-tree-chart-mind-map",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-tree-chart
      id="launch"
      layout="mindmap"
      height="420"
      [nodes]="chartNodes"
      [edges]="chartEdges"
      [options]="chartOptions"
    ></minerva-tree-chart>
  \`,
})
export class TreeChartMindMapComponent {
  topics =
    TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
  chartNodes = this.topics.map((label, i) => ({
    id: \`t\${i}\`,
    label,
    group: \`b\${branchOf(i)}\`,
  }));
  chartEdges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: \`t\${parent}\`, target: \`t\${i}\` }],
  );
  chartOptions = { legend: false };
}
`,svelte:`<!-- TreeChartMindMap.svelte -->

<script lang="ts">
  // A mind map of a product launch: the branches spread on both sides of the
  // central topic, colored by branch.

  import type { MinervaTreeChart } from "minerva-design/web-components/graph";

  const TOPICS = {
    en: [
      "Product launch",
      "Research",
      "User interviews",
      "Market analysis",
      "Design",
      "Prototype",
      "Usability tests",
      "Development",
      "Web app",
      "Mobile app",
      "Marketing",
      "Ad campaign",
      "Press release",
    ],
    zh: [
      "产品发布",
      "调研",
      "用户访谈",
      "市场分析",
      "设计",
      "原型",
      "可用性测试",
      "开发",
      "网页应用",
      "移动应用",
      "市场营销",
      "广告投放",
      "新闻稿",
    ],
    ja: [
      "製品ローンチ",
      "リサーチ",
      "ユーザーインタビュー",
      "市場分析",
      "デザイン",
      "プロトタイプ",
      "ユーザビリティテスト",
      "開発",
      "Web アプリ",
      "モバイルアプリ",
      "マーケティング",
      "広告キャンペーン",
      "プレスリリース",
    ],
    fr: [
      "Lancement produit",
      "Recherche",
      "Entretiens utilisateurs",
      "Analyse du marché",
      "Conception",
      "Prototype",
      "Tests d'utilisabilité",
      "Développement",
      "Application web",
      "Application mobile",
      "Marketing",
      "Campagne publicitaire",
      "Communiqué de presse",
    ],
  };
  // parent of each topic of TOPICS (-1: the central topic)
  const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
  // branch of a topic: its ancestor just below the central topic
  const branchOf = (i: number): number =>
    PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

  const topics =
    TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
  const chartNodes = topics.map((label, i) => ({
    id: \`t\${i}\`,
    label,
    group: \`b\${branchOf(i)}\`,
  }));
  const chartEdges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: \`t\${parent}\`, target: \`t\${i}\` }],
  );
  const chartOptions = { legend: false };
<\/script>

<minerva-tree-chart
  id="launch"
  layout="mindmap"
  height="420"
  nodes={chartNodes}
  edges={chartEdges}
  options={chartOptions}
></minerva-tree-chart>
`,solid:`// TreeChartMindMap.tsx

// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import type { MinervaTreeChart } from "minerva-design/web-components/graph";

const TOPICS = {
  en: [
    "Product launch",
    "Research",
    "User interviews",
    "Market analysis",
    "Design",
    "Prototype",
    "Usability tests",
    "Development",
    "Web app",
    "Mobile app",
    "Marketing",
    "Ad campaign",
    "Press release",
  ],
  zh: [
    "产品发布",
    "调研",
    "用户访谈",
    "市场分析",
    "设计",
    "原型",
    "可用性测试",
    "开发",
    "网页应用",
    "移动应用",
    "市场营销",
    "广告投放",
    "新闻稿",
  ],
  ja: [
    "製品ローンチ",
    "リサーチ",
    "ユーザーインタビュー",
    "市場分析",
    "デザイン",
    "プロトタイプ",
    "ユーザビリティテスト",
    "開発",
    "Web アプリ",
    "モバイルアプリ",
    "マーケティング",
    "広告キャンペーン",
    "プレスリリース",
  ],
  fr: [
    "Lancement produit",
    "Recherche",
    "Entretiens utilisateurs",
    "Analyse du marché",
    "Conception",
    "Prototype",
    "Tests d'utilisabilité",
    "Développement",
    "Application web",
    "Application mobile",
    "Marketing",
    "Campagne publicitaire",
    "Communiqué de presse",
  ],
};
// parent of each topic of TOPICS (-1: the central topic)
const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
// branch of a topic: its ancestor just below the central topic
const branchOf = (i: number): number =>
  PARENT[i] <= 0 ? i : branchOf(PARENT[i]);

export default function TreeChartMindMap() {
  const topics =
    TOPICS[document.documentElement.lang as keyof typeof TOPICS] ?? TOPICS.en;
  const chartNodes = topics.map((label, i) => ({
    id: \`t\${i}\`,
    label,
    group: \`b\${branchOf(i)}\`,
  }));
  const chartEdges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: \`t\${parent}\`, target: \`t\${i}\` }],
  );
  const chartOptions = { legend: false };

  return (
    <minerva-tree-chart
      id="launch"
      layout="mindmap"
      height="420"
      prop:nodes={chartNodes}
      prop:edges={chartEdges}
      prop:options={chartOptions}
    ></minerva-tree-chart>
  );
}
`,html:`<minerva-tree-chart
  id="launch"
  layout="mindmap"
  height="420"
></minerva-tree-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/graph";

  // A mind map of a product launch: the branches spread on both sides of the
  // central topic, colored by branch.
  const TOPICS = {
    en: [
      "Product launch",
      "Research",
      "User interviews",
      "Market analysis",
      "Design",
      "Prototype",
      "Usability tests",
      "Development",
      "Web app",
      "Mobile app",
      "Marketing",
      "Ad campaign",
      "Press release",
    ],
    zh: [
      "产品发布",
      "调研",
      "用户访谈",
      "市场分析",
      "设计",
      "原型",
      "可用性测试",
      "开发",
      "网页应用",
      "移动应用",
      "市场营销",
      "广告投放",
      "新闻稿",
    ],
    ja: [
      "製品ローンチ",
      "リサーチ",
      "ユーザーインタビュー",
      "市場分析",
      "デザイン",
      "プロトタイプ",
      "ユーザビリティテスト",
      "開発",
      "Web アプリ",
      "モバイルアプリ",
      "マーケティング",
      "広告キャンペーン",
      "プレスリリース",
    ],
    fr: [
      "Lancement produit",
      "Recherche",
      "Entretiens utilisateurs",
      "Analyse du marché",
      "Conception",
      "Prototype",
      "Tests d'utilisabilité",
      "Développement",
      "Application web",
      "Application mobile",
      "Marketing",
      "Campagne publicitaire",
      "Communiqué de presse",
    ],
  };
  // parent of each topic of TOPICS (-1: the central topic)
  const PARENT = [-1, 0, 1, 1, 0, 4, 4, 0, 7, 7, 0, 10, 10];
  // branch of a topic: its ancestor just below the central topic
  const branchOf = (i) => (PARENT[i] <= 0 ? i : branchOf(PARENT[i]));

  const topics = TOPICS[document.documentElement.lang] ?? TOPICS.en;
  const chart = document.querySelector("#launch");
  chart.nodes = topics.map((label, i) => ({
    id: \`t\${i}\`,
    label,
    group: \`b\${branchOf(i)}\`,
  }));
  chart.edges = PARENT.flatMap((parent, i) =>
    parent < 0 ? [] : [{ source: \`t\${parent}\`, target: \`t\${i}\` }],
  );
  chart.options = { legend: false };
<\/script>
`}})))()}n();export{t as default};