import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// The same samples in fewer or more bins: \`bins\` takes a count or a rule
// (\`sturges\`, \`freedman-diaconis\`, \`auto\`); two groups appear with enough bins.
import { computed, ref } from "vue";
import { HistogramChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const bins = ref<number | "sturges">("sturges");
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <div style="display: flex; gap: 8px; align-items: center">
      <span>{{ text.bins }}</span>
      <button type="button" @click="bins = 'sturges'">Sturges</button>
      <button type="button" @click="bins = 10">10</button>
      <button type="button" @click="bins = 40">40</button>
    </div>
    <HistogramChart
      :values="AGES"
      :bins="bins"
      :name="text.count"
      :x-axis="{ title: text.age }"
      :height="280"
    />
  </div>
</template>
`})))()}n();export{t as default};