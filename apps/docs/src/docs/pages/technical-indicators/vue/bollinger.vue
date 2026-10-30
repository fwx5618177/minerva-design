<script setup lang="ts">
// The indicator functions of minerva-design/charts/core are pure: any
// chart can draw them. Bollinger bands as a range area, the moving
// averages and the close as lines.
import { computed } from "vue";
import { bollinger, ema } from "minerva-design/charts/core";
import { RangeAreaChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: {
    close: "Close",
    band: "Bollinger (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  zh: {
    close: "收盘价",
    band: "布林带 (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  ja: {
    close: "終値",
    band: "ボリンジャーバンド (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  fr: {
    close: "Clôture",
    band: "Bollinger (20, 2)",
    middle: "MMS 20",
    slow: "MME 50",
  },
};

// 200 daily closes, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let price = 100;
const TIMES: number[] = [];
const CLOSES = Array.from({ length: 200 }, (_, i) => {
  TIMES.push(Date.UTC(2025, 2, 3) + i * 86_400_000);
  price = round(
    price * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25),
  );
  return price;
});

const BANDS = bollinger(CLOSES, 20, 2);
const SLOW = ema(CLOSES, 50);
// the first values of an indicator are NaN (not enough data yet): no point
const points = (values: ArrayLike<number>) =>
  TIMES.map((x, i) => ({
    x,
    y: Number.isNaN(values[i]) ? null : round(values[i]),
  }));

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  return [
    {
      name: text.band,
      opacity: 0.18,
      data: TIMES.map((x, i) =>
        Number.isNaN(BANDS.upper[i])
          ? { x, y: null }
          : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
      ),
    },
    { name: text.close, type: "line" as const, data: points(CLOSES) },
    {
      name: text.middle,
      type: "line" as const,
      lineWidth: 1,
      data: points(BANDS.middle),
    },
    {
      name: text.slow,
      type: "line" as const,
      lineWidth: 1,
      data: points(SLOW),
    },
  ];
});
</script>

<template>
  <RangeAreaChart
    :series="series"
    curve="linear"
    :x-axis="{ type: 'time' }"
    crosshair
    :height="320"
  />
</template>
