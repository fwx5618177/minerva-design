import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`stacked\` piles the areas up; the curve is smooth by default.
import { computed } from "vue";
import { AreaChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    organic: "Organic",
    paid: "Paid",
    referral: "Referral",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  zh: {
    organic: "自然流量",
    paid: "付费流量",
    referral: "推荐流量",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  ja: {
    organic: "オーガニック",
    paid: "有料",
    referral: "参照元",
    months: ["1月", "2月", "3月", "4月", "5月", "6月"],
  },
  fr: {
    organic: "Naturel",
    paid: "Payant",
    referral: "Référents",
    months: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.organic, data: [320, 332, 301, 334, 390, 430] },
  { name: text.value.paid, data: [120, 132, 101, 134, 190, 230] },
  { name: text.value.referral, data: [60, 72, 71, 74, 90, 110] },
]);
<\/script>

<template>
  <AreaChart
    :series="series"
    stacked
    :x-axis="{ type: 'category', categories: text.months }"
    :height="280"
  />
</template>
`})))()}n();export{t as default};