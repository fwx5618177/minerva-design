<script setup lang="ts">
// Key results completion on one scale (`max` 100): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadialBarChart } from "minerva-design/vue/charts";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

const { language } = useI18n();
const data = computed(() =>
  (OKR[language.value] ?? OKR.en).map((name, i) => ({ name, value: DONE[i] })),
);
const format = (value: number) => `${value} %`;
</script>

<template>
  <RadialBarChart
    :data="data"
    :max="100"
    :inner-radius="0.2"
    :format="format"
  />
</template>
