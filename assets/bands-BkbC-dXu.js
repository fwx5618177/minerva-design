import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Colored bands split the track; the value arc takes the color of its band.
import { computed } from "vue";
import { GaugeChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

const bands = [
  { to: 60, color: "var(--success-color, #16a34a)" },
  { to: 85, color: "var(--warning-color, #f59e0b)" },
  { to: 100, color: "var(--danger-color, #dc2626)" },
];
const { language } = useI18n();
const label = computed(() => TEXT[language.value] ?? TEXT.en);
const format = (value: number) => \`\${value}%\`;
<\/script>

<template>
  <GaugeChart :value="72" :label="label" :bands="bands" :format="format" />
</template>
`})))()}n();export{t as default};