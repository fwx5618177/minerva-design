import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// A forecast with its uncertainty: the band (\`y0\` - \`y\`) widens with the
// horizon; the actual values and the forecast are lines (\`type: "line"\`).
import { computed } from "vue";
import { RangeAreaChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
  zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
  ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
  fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const ACTUAL = [120, 132, 128, 141, 150, 158];
const FORECAST = [158, 163, 169, 172, 178, 185, 190];

const { language } = useI18n();
const months = computed(() => MONTHS[language.value] ?? MONTHS.en);
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months.value[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line" as const,
      data: ACTUAL.map((y, i) => ({ x: months.value[i], y })),
    },
    {
      name: text.forecast,
      type: "line" as const,
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months.value[5 + i], y })),
    },
  ];
});
<\/script>

<template>
  <RangeAreaChart
    :series="series"
    :x-axis="{ type: 'category', categories: months }"
    :height="300"
  />
</template>
`})))()}n();export{t as default};