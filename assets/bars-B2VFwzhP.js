import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`shape="bar"\` draws centered bars, \`sort="descending"\` orders the stages
// by value.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

const { language } = useI18n();
const data = computed(() =>
  [180, 940, 42, 410, 31].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
<\/script>

<template>
  <FunnelChart :data="data" shape="bar" sort="descending" :height="300" />
</template>
`})))()}n();export{t as default};