import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
// <TradingChart>: candles on a gap-free time axis with moving averages over
// the price, volume and RSI panes below; the texts, numbers and dates
// follow the page language.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TradingChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { watermark: "ACME · 1D" },
  zh: { watermark: "ACME · 日线" },
  ja: { watermark: "ACME · 日足" },
  fr: { watermark: "ACME · 1 J" },
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

const indicators = [
  { type: "ma", period: 20 },
  { type: "ma", period: 50 },
  { type: "volume" },
  { type: "rsi", period: 14 },
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
<\/script>

<template>
  <TradingChart
    :bars="BARS"
    symbol="ACME"
    timeframe="1D"
    :indicators="indicators"
    :watermark="text.watermark"
  />
</template>
`})))()}n();export{t as default};