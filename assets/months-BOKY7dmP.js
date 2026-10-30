import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`layout="months"\`: a small calendar per month; \`levels\` sets the number
// of color steps above the empty days, \`thresholds\` their bounds.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { CalendarHeatmap } from "minerva-design/vue/charts";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

const { language } = useI18n();
const locale = computed(() => (TEXT[language.value] ?? TEXT.en).locale);
<\/script>

<template>
  <CalendarHeatmap
    :data="STEPS"
    :range="['2026-01-01', '2026-06-30']"
    layout="months"
    :levels="5"
    :thresholds="[4000, 6000, 8000, 10000]"
    color="var(--success-color, #16a34a)"
    :locale="locale"
    :height="420"
  />
</template>
`})))()}n();export{t as default};