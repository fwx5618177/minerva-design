import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// <Chart> mixes series types (here bars and a line) on shared axes.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { Chart, type ChartSeries } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    revenue: "Revenue",
    target: "Target",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    revenue: "收入",
    target: "目标",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    revenue: "売上",
    target: "目標",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    revenue: "Chiffre d'affaires",
    target: "Objectif",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed<ChartSeries[]>(() => [
  { name: text.value.revenue, type: "bar", data: [42, 51, 48, 63, 72, 80] },
  {
    name: text.value.target,
    type: "line",
    curve: "smooth",
    data: [45, 50, 55, 60, 65, 70],
  },
]);
const formatK = (value: number) => \`\${value}k\`;
<\/script>

<template>
  <Chart
    :series="series"
    :x-axis="{ type: 'category', categories: text.months }"
    :y-axis="{ format: formatK }"
    :height="300"
  />
</template>
`})))()}n();export{t as default};