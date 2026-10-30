import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// <HistogramChart> bins raw samples itself (\`bins\` "auto":
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HistogramChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
<\/script>

<template>
  <HistogramChart
    :values="LATENCY"
    :name="text.requests"
    :x-axis="{ title: text.ms }"
    :height="300"
  />
</template>
`})))()}n();export{t as default};