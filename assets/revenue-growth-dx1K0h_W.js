import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Bars and a line on two value axes: the series with \`yAxis: "right"\` use
// \`yAxis2\` (its ticks are aligned on the left grid).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { MixedChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    {
      name: text.revenue,
      type: "bar" as const,
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line" as const,
      curve: "smooth" as const,
      yAxis: "right" as const,
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
});
const yAxis2 = { format: (value: number) => \`\${value} %\` };
<\/script>

<template>
  <MixedChart
    :series="series"
    :x-axis="{ type: 'category' }"
    :y-axis2="yAxis2"
    :height="300"
  />
</template>
`})))()}n();export{t as default};