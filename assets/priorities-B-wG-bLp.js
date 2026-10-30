import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Points, quadrant titles and axis titles; dots are placed without
// overlapping labels.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { QuadrantChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const points = computed(() =>
  SCORES.map(([x, y], i) => ({ x, y, label: text.value.features[i] })),
);
const quadrants = computed(() => ({
  topLeft: { label: text.value.quickWins },
  topRight: { label: text.value.bigBets },
  bottomLeft: { label: text.value.fillIns },
  bottomRight: { label: text.value.timeSinks },
}));
<\/script>

<template>
  <QuadrantChart
    :points="points"
    :quadrants="quadrants"
    :x-label="text.effort"
    :y-label="text.impact"
    :height="340"
  />
</template>
`})))()}n();export{t as default};