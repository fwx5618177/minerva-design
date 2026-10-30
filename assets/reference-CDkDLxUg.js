import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// \`reference\` draws a dashed target line; @hover reports the value under the
// pointer (null when it leaves).
import { computed, ref } from "vue";
import { Sparkline, useI18n, type ChartHoverEvent } from "minerva-design/vue";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

const data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const hovered = ref<number | null>(null);
const onHover = (event: ChartHoverEvent | null) => {
  hovered.value = event?.items[0]?.y ?? null;
};
const format = (ms: number) => \`\${ms} ms\`;
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <Sparkline
      :data="data"
      :reference="200"
      :name="text.latency"
      :format="format"
      :height="64"
      @hover="onHover"
    />
    <output aria-live="polite">{{
      hovered === null
        ? text.hint
        : \`\${text.latency}: \${hovered} ms (\${text.target})\`
    }}</output>
  </div>
</template>
`})))()}n();export{t as default};