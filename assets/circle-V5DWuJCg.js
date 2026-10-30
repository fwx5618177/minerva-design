import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`shape="circle"\` draws round grid rings, \`levels\` sets how many.
import { computed } from "vue";
import { RadarChart, useI18n } from "minerva-design/vue";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const indicators = computed(() =>
  text.value.skills.map((name) => ({ name, max: 10 })),
);
const series = computed(() => [
  { name: text.value.profile, values: [9, 6, 7, 8, 5, 6] },
]);
<\/script>

<template>
  <RadarChart
    :indicators="indicators"
    :series="series"
    shape="circle"
    :levels="5"
    :height="320"
  />
</template>
`})))()}n();export{t as default};