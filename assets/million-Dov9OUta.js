import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// One million points in a typed array (\`data: { y }\`: the x values are the
// indexes): decimated on the GPU at every zoom level. Ctrl / ⌘ + wheel or
// pinch to zoom down to single samples.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { LineChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { signal: "Sensor (1,000,000 samples)" },
  zh: { signal: "传感器（1,000,000 个采样点）" },
  ja: { signal: "センサー（1,000,000 サンプル）" },
  fr: { signal: "Capteur (1 000 000 d’échantillons)" },
};

// a million samples as typed-array columns: no objects, no copies
const COUNT = 1_000_000;
const y = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  y[i] =
    50 +
    30 * Math.sin(i / 20_000) +
    8 * Math.sin(i / 700) +
    3 * Math.sin(i * 1.7);
}
const SAMPLES = { y };

const { language } = useI18n();
const series = computed(() => [
  { name: (TEXT[language.value] ?? TEXT.en).signal, data: SAMPLES },
]);
<\/script>

<template>
  <LineChart
    :series="series"
    :interaction="{ zoom: 'x' }"
    crosshair
    :height="320"
  />
</template>
`})))()}n();export{t as default};