import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`percent\` scales every stack to 100%: the share of each source over time.
import { computed } from "vue";
import { AreaChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    solar: "Solar",
    wind: "Wind",
    hydro: "Hydro",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  zh: {
    solar: "太阳能",
    wind: "风能",
    hydro: "水电",
    hours: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  },
  ja: {
    solar: "太陽光",
    wind: "風力",
    hydro: "水力",
    hours: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"],
  },
  fr: {
    solar: "Solaire",
    wind: "Éolien",
    hydro: "Hydraulique",
    hours: ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.solar, data: [0, 5, 40, 62, 35, 2] },
  { name: text.value.wind, data: [48, 52, 30, 22, 38, 55] },
  { name: text.value.hydro, data: [30, 30, 28, 26, 28, 30] },
]);
<\/script>

<template>
  <AreaChart
    :series="series"
    percent
    curve="linear"
    :x-axis="{ type: 'category', categories: text.hours }"
    :height="280"
  />
</template>
`})))()}n();export{t as default};