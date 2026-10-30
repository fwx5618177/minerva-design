<script setup lang="ts">
// The same indicators computed by the trading chart itself (`indicators`):
// Bollinger bands over the price, MACD and RSI in panes; `macd()` of
// minerva-design/charts/core gives the last values outside of the chart.
import { computed } from "vue";
import { macd } from "minerva-design/charts/core";
import { TradingChart, useI18n } from "minerva-design/vue";

const TEXT = {
  en: { macd: "MACD (12, 26, 9)" },
  zh: { macd: "MACD 指标 (12, 26, 9)" },
  ja: { macd: "MACD (12, 26, 9)" },
  fr: { macd: "MACD (12, 26, 9)" },
};

// 240 daily bars: a random walk, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 240 }, (_, i) => {
  const open = close;
  close = round(
    open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25),
  );
  const spread = (open * fraction(Math.sin(i * 78.233) * 43758.5453)) / 60;
  return {
    time: Date.UTC(2025, 2, 3) + i * 86_400_000,
    open,
    high: round(Math.max(open, close) + spread),
    low: round(Math.min(open, close) - spread),
    close,
    volume: Math.round(1000 + fraction(Math.sin(i * 3.7) * 9999) * 4000),
  };
});

const MACD = macd(BARS.map((bar) => bar.close));
const LAST = BARS.length - 1;
const indicators = [
  { type: "boll", period: 20, multiplier: 2 },
  { type: "macd" },
  { type: "rsi", period: 14 },
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <TradingChart
      :bars="BARS"
      symbol="ACME"
      :indicators="indicators"
      :height="440"
    />
    <output aria-live="polite">
      {{ text.macd }}: {{ MACD.macd[LAST].toFixed(2) }} /
      {{ MACD.signal[LAST].toFixed(2) }}
    </output>
  </div>
</template>
