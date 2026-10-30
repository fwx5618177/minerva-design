<script setup lang="ts">
// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by `range-labels` in the tooltip).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BulletChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() =>
  KPIS.map(([value, target, ranges], i) => ({
    name: text.value.kpis[i],
    value,
    target,
    ranges,
  })),
);
</script>

<template>
  <BulletChart :data="data" :range-labels="text.ranges" />
</template>
