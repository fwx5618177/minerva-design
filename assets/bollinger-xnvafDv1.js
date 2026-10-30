import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TechnicalIndicatorsBollinger.vue -->

<script setup lang="ts">
// The indicator functions of minerva-design/charts/core are pure: any
// chart can draw them. Bollinger bands as a range area, the moving
// averages and the close as lines.

import { bollinger, ema } from "minerva-design/charts/core";
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

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

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartSeries = [
  {
    name: text.band,
    opacity: 0.18,
    data: TIMES.map((x, i) =>
      Number.isNaN(BANDS.upper[i])
        ? { x, y: null }
        : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
    ),
  },
  { name: text.close, type: "line", data: points(CLOSES) },
  {
    name: text.middle,
    type: "line",
    lineWidth: 1,
    data: points(BANDS.middle),
  },
  { name: text.slow, type: "line", lineWidth: 1, data: points(SLOW) },
];
const chartOptions = { xAxis: { type: "time" }, crosshair: true };
<\/script>

<template>
  <minerva-range-area-chart
    id="bands"
    curve="linear"
    height="320"
    :series.prop="chartSeries"
    :options.prop="chartOptions"
  ></minerva-range-area-chart>
</template>
`,angular:`// technical-indicators-bollinger.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// The indicator functions of minerva-design/charts/core are pure: any
// chart can draw them. Bollinger bands as a range area, the moving
// averages and the close as lines.
import { bollinger, ema } from "minerva-design/charts/core";
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

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

@Component({
  selector: "app-technical-indicators-bollinger",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-range-area-chart
      id="bands"
      curve="linear"
      height="320"
      [series]="chartSeries"
      [options]="chartOptions"
    ></minerva-range-area-chart>
  \`,
})
export class TechnicalIndicatorsBollingerComponent {
  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartSeries = [
    {
      name: this.text.band,
      opacity: 0.18,
      data: TIMES.map((x, i) =>
        Number.isNaN(BANDS.upper[i])
          ? { x, y: null }
          : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
      ),
    },
    { name: this.text.close, type: "line", data: points(CLOSES) },
    {
      name: this.text.middle,
      type: "line",
      lineWidth: 1,
      data: points(BANDS.middle),
    },
    { name: this.text.slow, type: "line", lineWidth: 1, data: points(SLOW) },
  ];
  chartOptions = { xAxis: { type: "time" }, crosshair: true };
}
`,svelte:`<!-- TechnicalIndicatorsBollinger.svelte -->

<script lang="ts">
  // The indicator functions of minerva-design/charts/core are pure: any
  // chart can draw them. Bollinger bands as a range area, the moving
  // averages and the close as lines.

  import { bollinger, ema } from "minerva-design/charts/core";
  import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

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

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.band,
      opacity: 0.18,
      data: TIMES.map((x, i) =>
        Number.isNaN(BANDS.upper[i])
          ? { x, y: null }
          : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
      ),
    },
    { name: text.close, type: "line", data: points(CLOSES) },
    {
      name: text.middle,
      type: "line",
      lineWidth: 1,
      data: points(BANDS.middle),
    },
    { name: text.slow, type: "line", lineWidth: 1, data: points(SLOW) },
  ];
  const chartOptions = { xAxis: { type: "time" }, crosshair: true };
<\/script>

<minerva-range-area-chart
  id="bands"
  curve="linear"
  height="320"
  series={chartSeries}
  options={chartOptions}
></minerva-range-area-chart>
`,solid:`// TechnicalIndicatorsBollinger.tsx

// The indicator functions of minerva-design/charts/core are pure: any
// chart can draw them. Bollinger bands as a range area, the moving
// averages and the close as lines.
import { bollinger, ema } from "minerva-design/charts/core";
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

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

export default function TechnicalIndicatorsBollinger() {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartSeries = [
    {
      name: text.band,
      opacity: 0.18,
      data: TIMES.map((x, i) =>
        Number.isNaN(BANDS.upper[i])
          ? { x, y: null }
          : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
      ),
    },
    { name: text.close, type: "line", data: points(CLOSES) },
    {
      name: text.middle,
      type: "line",
      lineWidth: 1,
      data: points(BANDS.middle),
    },
    { name: text.slow, type: "line", lineWidth: 1, data: points(SLOW) },
  ];
  const chartOptions = { xAxis: { type: "time" }, crosshair: true };

  return (
    <minerva-range-area-chart
      id="bands"
      curve="linear"
      height="320"
      prop:series={chartSeries}
      prop:options={chartOptions}
    ></minerva-range-area-chart>
  );
}
`,html:`<minerva-range-area-chart
  id="bands"
  curve="linear"
  height="320"
></minerva-range-area-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // The indicator functions of minerva-design/charts/core are pure: any
  // chart can draw them. Bollinger bands as a range area, the moving
  // averages and the close as lines.
  // The indicator functions of minerva-design/charts/core are pure: any
  // chart can draw them. Bollinger bands as a range area, the moving
  // averages and the close as lines.
  import { bollinger, ema } from "minerva-design/charts/core";

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
  const fraction = (value) => value - Math.floor(value);
  const round = (value) => Math.round(value * 100) / 100;
  let price = 100;
  const TIMES = [];
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
  const points = (values) =>
    TIMES.map((x, i) => ({
      x,
      y: Number.isNaN(values[i]) ? null : round(values[i]),
    }));

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#bands");
  chart.series = [
    {
      name: text.band,
      opacity: 0.18,
      data: TIMES.map((x, i) =>
        Number.isNaN(BANDS.upper[i])
          ? { x, y: null }
          : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
      ),
    },
    { name: text.close, type: "line", data: points(CLOSES) },
    {
      name: text.middle,
      type: "line",
      lineWidth: 1,
      data: points(BANDS.middle),
    },
    { name: text.slow, type: "line", lineWidth: 1, data: points(SLOW) },
  ];
  chart.options = { xAxis: { type: "time" }, crosshair: true };
<\/script>
`}})))()}n();export{t as default};