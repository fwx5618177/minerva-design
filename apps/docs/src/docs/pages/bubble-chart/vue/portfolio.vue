<script setup lang="ts">
// A portfolio: risk against return, bubbles sized by the share of each
// asset; @point-click reports the clicked asset.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { BubbleChart, type ChartHoverEvent } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    risk: "Risk (volatility %)",
    return: "Expected return %",
    hint: "Click a bubble",
    assets: [
      "Bonds",
      "Index fund",
      "Real estate",
      "Tech stocks",
      "Gold",
      "Start-ups",
    ],
  },
  zh: {
    risk: "风险（波动率 %）",
    return: "预期收益 %",
    hint: "点击一个气泡",
    assets: ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"],
  },
  ja: {
    risk: "リスク（ボラティリティ %）",
    return: "期待リターン %",
    hint: "バブルをクリックします",
    assets: [
      "債券",
      "インデックスファンド",
      "不動産",
      "ハイテク株",
      "金",
      "スタートアップ",
    ],
  },
  fr: {
    risk: "Risque (volatilité %)",
    return: "Rendement attendu %",
    hint: "Cliquez sur une bulle",
    assets: [
      "Obligations",
      "Fonds indiciel",
      "Immobilier",
      "Actions tech",
      "Or",
      "Start-up",
    ],
  },
};

// risk, return, share of the portfolio (%)
const ASSETS = [
  [4, 3, 30],
  [15, 7, 25],
  [12, 6, 20],
  [28, 12, 15],
  [16, 4, 5],
  [45, 18, 5],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() =>
  text.value.assets.map((name, i) => ({
    name,
    data: [{ x: ASSETS[i][0], y: ASSETS[i][1], value: ASSETS[i][2] }],
  })),
);
const selected = ref("");
const onClick = (event: ChartHoverEvent) => {
  const item = event.items[0];
  if (item) selected.value = `${item.seriesName}: ${item.value} %`;
};
</script>

<template>
  <div style="display: grid; gap: 8px">
    <BubbleChart
      :series="series"
      :x-axis="{ title: text.risk }"
      :y-axis="{ title: text.return }"
      :height="300"
      @point-click="onClick"
    />
    <output aria-live="polite">{{ selected || text.hint }}</output>
  </div>
</template>
