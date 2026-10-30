import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

const { language } = useI18n();
const data = computed(() =>
  [12000, 4800, 2100, 860].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
<\/script>

<template>
  <FunnelChart :data="data" :height="300" />
</template>
`})))()}n();export{t as default};