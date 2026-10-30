import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`orientation="horizontal"\` lays the boxes out in rows; \`whisker="minmax"\`
// extends the whiskers to the extremes (no outliers).
import { computed } from "vue";
import { BoxPlotChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const groups = computed(() =>
  text.value.classes.map((x, i) => ({ x, values: SCORES[i] })),
);
<\/script>

<template>
  <BoxPlotChart
    :groups="groups"
    :name="text.score"
    orientation="horizontal"
    whisker="minmax"
    :x-axis="{ type: 'category' }"
    :y-axis="{ min: 0, max: 100 }"
    :height="240"
  />
</template>
`})))()}n();export{t as default};