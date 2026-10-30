import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`needle\` adds a pointer to the arc; \`min\` / \`max\` set the scale, \`sweep\`
// and \`thickness\` the shape of the arc.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GaugeChart } from "minerva-design/vue/charts";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

const { language } = useI18n();
const label = computed(() => TEXT[language.value] ?? TEXT.en);
<\/script>

<template>
  <GaugeChart
    :value="128"
    :max="200"
    :label="label"
    needle
    :sweep="270"
    :thickness="0.1"
    :height="260"
  />
</template>
`})))()}n();export{t as default};