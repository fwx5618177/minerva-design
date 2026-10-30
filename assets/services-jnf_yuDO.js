import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Raw samples per service (\`groups\`): the component computes the
// quartiles, Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BoxPlotChart } from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const groups = computed(() =>
  text.value.services.map((x, i) => ({ x, values: SAMPLES[i] })),
);
<\/script>

<template>
  <BoxPlotChart
    :groups="groups"
    :name="text.time"
    :x-axis="{ type: 'category' }"
    :y-axis="{ title: text.time }"
    :height="300"
  />
</template>
`})))()}n();export{t as default};