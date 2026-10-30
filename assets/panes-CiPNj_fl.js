import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TechnicalIndicatorsPanes.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// The same indicators computed by the trading chart itself (\`indicators\`):
// Bollinger bands over the price, MACD and RSI in panes; \`macd()\` of
// minerva-design/charts/core gives the last values outside of the chart.

import { macd } from "minerva-design/charts/core";
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

const lastText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartBars = BARS;
const chartIndicators = [
  { type: "boll", period: 20, multiplier: 2 },
  { type: "macd" },
  { type: "rsi", period: 14 },
];

onMounted(() => {
  lastText.value = \`\${text.macd}: \${MACD.macd[LAST].toFixed(2)} / \${MACD.signal[LAST].toFixed(2)}\`;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-trading-chart
      id="panes"
      symbol="ACME"
      height="440"
      :bars.prop="chartBars"
      :indicators.prop="chartIndicators"
    ></minerva-trading-chart>
    <output id="last" aria-live="polite">{{ lastText }}</output>
  </div>
</template>
`,angular:`// technical-indicators-panes.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// The same indicators computed by the trading chart itself (\`indicators\`):
// Bollinger bands over the price, MACD and RSI in panes; \`macd()\` of
// minerva-design/charts/core gives the last values outside of the chart.
import { macd } from "minerva-design/charts/core";
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

@Component({
  selector: "app-technical-indicators-panes",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-trading-chart
        id="panes"
        symbol="ACME"
        height="440"
        [bars]="chartBars"
        [indicators]="chartIndicators"
      ></minerva-trading-chart>
      <output id="last" aria-live="polite">{{ lastText }}</output>
    </div>
  \`,
})
export class TechnicalIndicatorsPanesComponent implements AfterViewInit {
  lastText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartBars = BARS;
  chartIndicators = [
    { type: "boll", period: 20, multiplier: 2 },
    { type: "macd" },
    { type: "rsi", period: 14 },
  ];

  ngAfterViewInit(): void {
    this.lastText = \`\${this.text.macd}: \${MACD.macd[LAST].toFixed(2)} / \${MACD.signal[LAST].toFixed(2)}\`;
  }
}
`,svelte:`<!-- TechnicalIndicatorsPanes.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // The same indicators computed by the trading chart itself (\`indicators\`):
  // Bollinger bands over the price, MACD and RSI in panes; \`macd()\` of
  // minerva-design/charts/core gives the last values outside of the chart.

  import { macd } from "minerva-design/charts/core";
  import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

  let lastText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBars = BARS;
  const chartIndicators = [
    { type: "boll", period: 20, multiplier: 2 },
    { type: "macd" },
    { type: "rsi", period: 14 },
  ];

  onMount(() => {
    lastText = \`\${text.macd}: \${MACD.macd[LAST].toFixed(2)} / \${MACD.signal[LAST].toFixed(2)}\`;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-trading-chart
    id="panes"
    symbol="ACME"
    height="440"
    bars={chartBars}
    indicators={chartIndicators}
  ></minerva-trading-chart>
  <output id="last" aria-live="polite">{lastText}</output>
</div>
`,solid:`// TechnicalIndicatorsPanes.tsx

import { createSignal, onMount } from "solid-js";

// The same indicators computed by the trading chart itself (\`indicators\`):
// Bollinger bands over the price, MACD and RSI in panes; \`macd()\` of
// minerva-design/charts/core gives the last values outside of the chart.
import { macd } from "minerva-design/charts/core";
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

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

export default function TechnicalIndicatorsPanes() {
  const [lastText, setLastText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBars = BARS;
  const chartIndicators = [
    { type: "boll", period: 20, multiplier: 2 },
    { type: "macd" },
    { type: "rsi", period: 14 },
  ];

  onMount(() => {
    setLastText(
      \`\${text.macd}: \${MACD.macd[LAST].toFixed(2)} / \${MACD.signal[LAST].toFixed(2)}\`,
    );
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-trading-chart
        id="panes"
        symbol="ACME"
        height="440"
        prop:bars={chartBars}
        prop:indicators={chartIndicators}
      ></minerva-trading-chart>
      <output id="last" aria-live="polite">
        {lastText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-trading-chart
    id="panes"
    symbol="ACME"
    height="440"
  ></minerva-trading-chart>
  <output id="last" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/trading-chart";

  // The same indicators computed by the trading chart itself (\`indicators\`):
  // Bollinger bands over the price, MACD and RSI in panes; \`macd()\` of
  // minerva-design/charts/core gives the last values outside of the chart.
  // The same indicators computed by the trading chart itself (\`indicators\`):
  // Bollinger bands over the price, MACD and RSI in panes; \`macd()\` of
  // minerva-design/charts/core gives the last values outside of the chart.
  import { macd } from "minerva-design/charts/core";

  const TEXT = {
    en: { macd: "MACD (12, 26, 9)" },
    zh: { macd: "MACD 指标 (12, 26, 9)" },
    ja: { macd: "MACD (12, 26, 9)" },
    fr: { macd: "MACD (12, 26, 9)" },
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

  const MACD = macd(BARS.map((bar) => bar.close));
  const LAST = BARS.length - 1;

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#panes");
  const last = document.querySelector("#last");
  chart.bars = BARS;
  chart.indicators = [
    { type: "boll", period: 20, multiplier: 2 },
    { type: "macd" },
    { type: "rsi", period: 14 },
  ];
  last.textContent = \`\${text.macd}: \${MACD.macd[LAST].toFixed(2)} / \${MACD.signal[LAST].toFixed(2)}\`;
<\/script>
`}})))()}n();export{t as default};