import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- CandlestickChartMovingAverage.vue -->

<script setup lang="ts">
// A series with \`type: "line"\` is drawn over the candles: a 5-day moving
// average of the closes.

import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", average: "5-day average" },
  zh: { price: "价格", average: "5 日均线" },
  ja: { price: "価格", average: "5日移動平均" },
  fr: { price: "Cours", average: "Moyenne 5 jours" },
};

const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
  const close = open + 4 * Math.sin(i * 1.7);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
    low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
  };
});
const average = candles.map((candle, i) => {
  const window = candles.slice(Math.max(0, i - 4), i + 1);
  const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
  return [candle.x, Math.round(mean * 100) / 100] as [number, number];
});

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  { name: text.price, data: candles },
  { name: text.average, type: "line", curve: "smooth", data: average },
];
const chartOptions = { yAxis: { zero: false } };
<\/script>

<template>
  <minerva-candlestick-chart
    id="trend"
    height="300"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-candlestick-chart>
</template>
`,angular:`// candlestick-chart-moving-average.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// A series with \`type: "line"\` is drawn over the candles: a 5-day moving
// average of the closes.
import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", average: "5-day average" },
  zh: { price: "价格", average: "5 日均线" },
  ja: { price: "価格", average: "5日移動平均" },
  fr: { price: "Cours", average: "Moyenne 5 jours" },
};

const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
  const close = open + 4 * Math.sin(i * 1.7);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
    low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
  };
});
const average = candles.map((candle, i) => {
  const window = candles.slice(Math.max(0, i - 4), i + 1);
  const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
  return [candle.x, Math.round(mean * 100) / 100] as [number, number];
});

@Component({
  selector: "app-candlestick-chart-moving-average",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-candlestick-chart
      id="trend"
      height="300"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-candlestick-chart>
  \`,
})
export class CandlestickChartMovingAverageComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    { name: this.text.price, data: candles },
    { name: this.text.average, type: "line", curve: "smooth", data: average },
  ];
  chartOptions = { yAxis: { zero: false } };
}
`,svelte:`<!-- CandlestickChartMovingAverage.svelte -->

<script lang="ts">
  // A series with \`type: "line"\` is drawn over the candles: a 5-day moving
  // average of the closes.

  import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { price: "Price", average: "5-day average" },
    zh: { price: "价格", average: "5 日均线" },
    ja: { price: "価格", average: "5日移動平均" },
    fr: { price: "Cours", average: "Moyenne 5 jours" },
  };

  const candles = Array.from({ length: 40 }, (_, i) => {
    const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
    const close = open + 4 * Math.sin(i * 1.7);
    return {
      x: i + 1,
      open: Math.round(open * 100) / 100,
      y: Math.round(close * 100) / 100,
      high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
      low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
    };
  });
  const average = candles.map((candle, i) => {
    const window = candles.slice(Math.max(0, i - 4), i + 1);
    const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
    return [candle.x, Math.round(mean * 100) / 100] as [number, number];
  });

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.price, data: candles },
    { name: text.average, type: "line", curve: "smooth", data: average },
  ];
  const chartOptions = { yAxis: { zero: false } };
<\/script>

<minerva-candlestick-chart
  id="trend"
  height="300"
  series={chartSeries}
  options={chartOptions}
></minerva-candlestick-chart>
`,solid:`// CandlestickChartMovingAverage.tsx

// A series with \`type: "line"\` is drawn over the candles: a 5-day moving
// average of the closes.
import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", average: "5-day average" },
  zh: { price: "价格", average: "5 日均线" },
  ja: { price: "価格", average: "5日移動平均" },
  fr: { price: "Cours", average: "Moyenne 5 jours" },
};

const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
  const close = open + 4 * Math.sin(i * 1.7);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
    low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
  };
});
const average = candles.map((candle, i) => {
  const window = candles.slice(Math.max(0, i - 4), i + 1);
  const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
  return [candle.x, Math.round(mean * 100) / 100] as [number, number];
});

export default function CandlestickChartMovingAverage() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    { name: text.price, data: candles },
    { name: text.average, type: "line", curve: "smooth", data: average },
  ];
  const chartOptions = { yAxis: { zero: false } };

  return (
    <minerva-candlestick-chart
      id="trend"
      height="300"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-candlestick-chart>
  );
}
`,html:`<minerva-candlestick-chart id="trend" height="300"></minerva-candlestick-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // A series with \`type: "line"\` is drawn over the candles: a 5-day moving
  // average of the closes.
  const TEXT = {
    en: { price: "Price", average: "5-day average" },
    zh: { price: "价格", average: "5 日均线" },
    ja: { price: "価格", average: "5日移動平均" },
    fr: { price: "Cours", average: "Moyenne 5 jours" },
  };

  const candles = Array.from({ length: 40 }, (_, i) => {
    const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
    const close = open + 4 * Math.sin(i * 1.7);
    return {
      x: i + 1,
      open: Math.round(open * 100) / 100,
      y: Math.round(close * 100) / 100,
      high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
      low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
    };
  });
  const average = candles.map((candle, i) => {
    const window = candles.slice(Math.max(0, i - 4), i + 1);
    const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
    return [candle.x, Math.round(mean * 100) / 100];
  });

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#trend");
  chart.series = [
    { name: text.price, data: candles },
    { name: text.average, type: "line", curve: "smooth", data: average },
  ];
  chart.options = { yAxis: { zero: false } };
<\/script>
`}})))()}n();export{t as default};