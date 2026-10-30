import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// A flat list: one rectangle per node, its area proportional to the value.
import { computed } from "vue";
import { TreemapChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

const { language } = useI18n();
const data = computed(() =>
  [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
const format = (millions: number) => \`\${millions}M\`;
<\/script>

<template>
  <TreemapChart :data="data" :gap="4" :format="format" :height="300" />
</template>
`})))()}n();export{t as default};