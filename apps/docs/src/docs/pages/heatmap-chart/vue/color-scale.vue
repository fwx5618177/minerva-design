<script setup lang="ts">
// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HeatmapChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const cells = computed(() =>
  MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.value.metrics[c],
      y: text.value.metrics[r],
      value,
    })),
  ),
);
const format = (value: number) => value.toFixed(2);
</script>

<template>
  <HeatmapChart
    :data="cells"
    :color-scale="['#2563eb', '#f8fafc', '#dc2626']"
    :value-range="[-1, 1]"
    :name="text.correlation"
    :format="format"
    :radius="4"
    :height="320"
  />
</template>
