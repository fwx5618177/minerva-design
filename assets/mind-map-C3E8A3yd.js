import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// A mind map of a product launch: the branches spread on both sides of the
// central topic, colored by branch.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TreeChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const nodes = computed(() =>
  (TOPICS[language.value] ?? TOPICS.en).map((label, i) => ({
    id: \`t\${i}\`,
    label,
    group: \`b\${branchOf(i)}\`,
  })),
);
const edges = PARENT.flatMap((parent, i) =>
  parent < 0 ? [] : [{ source: \`t\${parent}\`, target: \`t\${i}\` }],
);
<\/script>

<template>
  <TreeChart
    :nodes="nodes"
    :edges="edges"
    layout="mindmap"
    :legend="false"
    :height="420"
  />
</template>
`})))()}n();export{t as default};