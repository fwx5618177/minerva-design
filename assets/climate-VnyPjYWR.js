import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import { computed } from "vue";
import { MixedChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
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

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    {
      name: text.rain,
      type: "bar" as const,
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line" as const,
      curve: "smooth" as const,
      yAxis: "right" as const,
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
});
<\/script>

<template>
  <MixedChart
    :series="series"
    :x-axis="{ type: 'category' }"
    crosshair
    :height="300"
  />
</template>
`})))()}n();export{t as default};