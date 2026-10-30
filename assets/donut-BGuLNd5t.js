import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// <DonutChart>: a pie with a hole and center texts; @click reports the
// clicked slice.
import { computed, ref } from "vue";
import { DonutChart, useI18n, type ShapeHoverEvent } from "minerva-design/vue";

const TEXT = {
  en: {
    total: "monthly revenue",
    hint: "Click a slice",
    plans: ["Free", "Starter", "Pro", "Enterprise"],
  },
  zh: {
    total: "月收入",
    hint: "点击一个扇区",
    plans: ["免费版", "入门版", "专业版", "企业版"],
  },
  ja: {
    total: "月間売上",
    hint: "スライスをクリックします",
    plans: ["無料", "スターター", "プロ", "エンタープライズ"],
  },
  fr: {
    total: "revenu mensuel",
    hint: "Cliquez sur une part",
    plans: ["Gratuit", "Starter", "Pro", "Entreprise"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() =>
  [2, 18, 46, 34].map((value, i) => ({ name: text.value.plans[i], value })),
);
const selected = ref("");
const onClick = (slice: ShapeHoverEvent) => {
  selected.value = \`\${slice.name}: €\${slice.value}k\`;
};
const format = (value: number) => \`€\${value}k\`;
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <DonutChart
      :data="data"
      center-value="€100k"
      :center-label="text.total"
      :format="format"
      :height="300"
      @click="onClick"
    />
    <output aria-live="polite">{{ selected || text.hint }}</output>
  </div>
</template>
`})))()}n();export{t as default};