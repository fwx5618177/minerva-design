import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TradingChartCandles.vue -->

<script setup lang="ts">
// <minerva-trading-chart>: candles on a gap-free time axis with moving
// averages over the price, volume and RSI panes below; the texts, numbers
// and dates follow the page language.

import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartBars = BARS;
const chartIndicators = [
  { type: "ma", period: 20 },
  { type: "ma", period: 50 },
  { type: "volume" },
  { type: "rsi", period: 14 },
];
const chartOptions = { watermark: text.watermark };
<\/script>

<template>
  <minerva-trading-chart
    id="candles"
    symbol="ACME"
    timeframe="1D"
    :bars.prop="chartBars"
    :indicators.prop="chartIndicators"
    :options.prop="chartOptions"
  ></minerva-trading-chart>
</template>
`,angular:`// trading-chart-candles.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// <minerva-trading-chart>: candles on a gap-free time axis with moving
// averages over the price, volume and RSI panes below; the texts, numbers
// and dates follow the page language.
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

@Component({
  selector: "app-trading-chart-candles",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-trading-chart
      id="candles"
      symbol="ACME"
      timeframe="1D"
      [bars]="chartBars"
      [indicators]="chartIndicators"
      [options]="chartOptions"
    ></minerva-trading-chart>
  \`,
})
export class TradingChartCandlesComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartBars = BARS;
  chartIndicators = [
    { type: "ma", period: 20 },
    { type: "ma", period: 50 },
    { type: "volume" },
    { type: "rsi", period: 14 },
  ];
  chartOptions = { watermark: this.text.watermark };
}
`,svelte:`<!-- TradingChartCandles.svelte -->

<script lang="ts">
  // <minerva-trading-chart>: candles on a gap-free time axis with moving
  // averages over the price, volume and RSI panes below; the texts, numbers
  // and dates follow the page language.

  import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBars = BARS;
  const chartIndicators = [
    { type: "ma", period: 20 },
    { type: "ma", period: 50 },
    { type: "volume" },
    { type: "rsi", period: 14 },
  ];
  const chartOptions = { watermark: text.watermark };
<\/script>

<minerva-trading-chart
  id="candles"
  symbol="ACME"
  timeframe="1D"
  bars={chartBars}
  indicators={chartIndicators}
  options={chartOptions}
></minerva-trading-chart>
`,solid:`// TradingChartCandles.tsx

// <minerva-trading-chart>: candles on a gap-free time axis with moving
// averages over the price, volume and RSI panes below; the texts, numbers
// and dates follow the page language.
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

export default function TradingChartCandles() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBars = BARS;
  const chartIndicators = [
    { type: "ma", period: 20 },
    { type: "ma", period: 50 },
    { type: "volume" },
    { type: "rsi", period: 14 },
  ];
  const chartOptions = { watermark: text.watermark };

  return (
    <minerva-trading-chart
      id="candles"
      symbol="ACME"
      timeframe="1D"
      prop:bars={chartBars}
      prop:indicators={chartIndicators}
      prop:options={chartOptions}
    ></minerva-trading-chart>
  );
}
`,html:`<minerva-trading-chart
  id="candles"
  symbol="ACME"
  timeframe="1D"
></minerva-trading-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/trading-chart";

  // <minerva-trading-chart>: candles on a gap-free time axis with moving
  // averages over the price, volume and RSI panes below; the texts, numbers
  // and dates follow the page language.
  const TEXT = {
    en: { watermark: "ACME · 1D" },
    zh: { watermark: "ACME · 日线" },
    ja: { watermark: "ACME · 日足" },
    fr: { watermark: "ACME · 1 J" },
  };

  // 240 daily bars: a random walk, generated deterministically
  const fraction = (value) => value - Math.floor(value);
  const round = (value) => Math.round(value * 100) / 100;
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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#candles");
  chart.bars = BARS;
  chart.indicators = [
    { type: "ma", period: 20 },
    { type: "ma", period: 50 },
    { type: "volume" },
    { type: "rsi", period: 14 },
  ];
  chart.options = { watermark: text.watermark };
<\/script>
`}})))()}n();export{t as default};