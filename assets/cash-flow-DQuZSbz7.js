import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Monthly cash flows from an opening balance: rows instead of
// columns (\`orientation="horizontal"\`), values in the tooltip only.
import { computed } from "vue";
import { WaterfallChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

const { language } = useI18n();
const steps = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" as const },
  ];
});
<\/script>

<template>
  <WaterfallChart
    :steps="steps"
    :labels="false"
    orientation="horizontal"
    :height="360"
  />
</template>
`})))()}n();export{t as default};