import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CandlestickChartOhlc.vue -->

<script setup lang="ts">
// Each point carries open, high, low and y (the close); rising candles use
// the success color, falling ones the danger color.

import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", day: "Day" },
  zh: { price: "价格", day: "天" },
  ja: { price: "価格", day: "日" },
  fr: { price: "Cours", day: "Jour" },
};

// 40 deterministic sessions
const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 100 + 12 * Math.sin(i / 5) + 4 * Math.sin(i * 1.3);
  const close = open + 5 * Math.sin(i * 2.1);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high:
      Math.round((Math.max(open, close) + 2 + Math.abs(Math.sin(i))) * 100) /
      100,
    low:
      Math.round((Math.min(open, close) - 2 - Math.abs(Math.cos(i))) * 100) /
      100,
  };
});

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [{ name: text.price, data: candles }];
const chartOptions = { xAxis: { title: text.day }, yAxis: { zero: false } };
<\/script>

<template>
  <minerva-candlestick-chart
    id="prices"
    height="300"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-candlestick-chart>
</template>
`,angular:`// candlestick-chart-ohlc.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// Each point carries open, high, low and y (the close); rising candles use
// the success color, falling ones the danger color.
import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", day: "Day" },
  zh: { price: "价格", day: "天" },
  ja: { price: "価格", day: "日" },
  fr: { price: "Cours", day: "Jour" },
};

// 40 deterministic sessions
const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 100 + 12 * Math.sin(i / 5) + 4 * Math.sin(i * 1.3);
  const close = open + 5 * Math.sin(i * 2.1);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high:
      Math.round((Math.max(open, close) + 2 + Math.abs(Math.sin(i))) * 100) /
      100,
    low:
      Math.round((Math.min(open, close) - 2 - Math.abs(Math.cos(i))) * 100) /
      100,
  };
});

@Component({
  selector: "app-candlestick-chart-ohlc",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-candlestick-chart
      id="prices"
      height="300"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-candlestick-chart>
  \`,
})
export class CandlestickChartOhlcComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [{ name: this.text.price, data: candles }];
  chartOptions = { xAxis: { title: this.text.day }, yAxis: { zero: false } };
}
`,svelte:`<!-- CandlestickChartOhlc.svelte -->

<script lang="ts">
  // Each point carries open, high, low and y (the close); rising candles use
  // the success color, falling ones the danger color.

  import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { price: "Price", day: "Day" },
    zh: { price: "价格", day: "天" },
    ja: { price: "価格", day: "日" },
    fr: { price: "Cours", day: "Jour" },
  };

  // 40 deterministic sessions
  const candles = Array.from({ length: 40 }, (_, i) => {
    const open = 100 + 12 * Math.sin(i / 5) + 4 * Math.sin(i * 1.3);
    const close = open + 5 * Math.sin(i * 2.1);
    return {
      x: i + 1,
      open: Math.round(open * 100) / 100,
      y: Math.round(close * 100) / 100,
      high:
        Math.round((Math.max(open, close) + 2 + Math.abs(Math.sin(i))) * 100) /
        100,
      low:
        Math.round((Math.min(open, close) - 2 - Math.abs(Math.cos(i))) * 100) /
        100,
    };
  });

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.price, data: candles }];
  const chartOptions = { xAxis: { title: text.day }, yAxis: { zero: false } };
<\/script>

<minerva-candlestick-chart
  id="prices"
  height="300"
  series={chartSeries}
  options={chartOptions}
></minerva-candlestick-chart>
`,solid:`// CandlestickChartOhlc.tsx

// Each point carries open, high, low and y (the close); rising candles use
// the success color, falling ones the danger color.
import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", day: "Day" },
  zh: { price: "价格", day: "天" },
  ja: { price: "価格", day: "日" },
  fr: { price: "Cours", day: "Jour" },
};

// 40 deterministic sessions
const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 100 + 12 * Math.sin(i / 5) + 4 * Math.sin(i * 1.3);
  const close = open + 5 * Math.sin(i * 2.1);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high:
      Math.round((Math.max(open, close) + 2 + Math.abs(Math.sin(i))) * 100) /
      100,
    low:
      Math.round((Math.min(open, close) - 2 - Math.abs(Math.cos(i))) * 100) /
      100,
  };
});

export default function CandlestickChartOhlc() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [{ name: text.price, data: candles }];
  const chartOptions = { xAxis: { title: text.day }, yAxis: { zero: false } };

  return (
    <minerva-candlestick-chart
      id="prices"
      height="300"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-candlestick-chart>
  );
}
`,html:`<minerva-candlestick-chart id="prices" height="300"></minerva-candlestick-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Each point carries open, high, low and y (the close); rising candles use
  // the success color, falling ones the danger color.
  const TEXT = {
    en: { price: "Price", day: "Day" },
    zh: { price: "价格", day: "天" },
    ja: { price: "価格", day: "日" },
    fr: { price: "Cours", day: "Jour" },
  };

  // 40 deterministic sessions
  const candles = Array.from({ length: 40 }, (_, i) => {
    const open = 100 + 12 * Math.sin(i / 5) + 4 * Math.sin(i * 1.3);
    const close = open + 5 * Math.sin(i * 2.1);
    return {
      x: i + 1,
      open: Math.round(open * 100) / 100,
      y: Math.round(close * 100) / 100,
      high:
        Math.round((Math.max(open, close) + 2 + Math.abs(Math.sin(i))) * 100) /
        100,
      low:
        Math.round((Math.min(open, close) - 2 - Math.abs(Math.cos(i))) * 100) /
        100,
    };
  });

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#prices");
  chart.series = [{ name: text.price, data: candles }];
  chart.options = { xAxis: { title: text.day }, yAxis: { zero: false } };
<\/script>
`}})))()}n();export{t as default};