import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`orientation="vertical"\`: columns sharing the ranges of the component
// (\`ranges\`), the targets in the danger color.
import { computed } from "vue";
import { BulletChart, useI18n } from "minerva-design/vue";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

const { language } = useI18n();
const data = computed(() =>
  (QUARTERS[language.value] ?? QUARTERS.en).map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  })),
);
<\/script>

<template>
  <BulletChart
    :data="data"
    orientation="vertical"
    :ranges="[60, 90, 120]"
    target-color="var(--danger-color, #dc2626)"
  />
</template>
`})))()}n();export{t as default};