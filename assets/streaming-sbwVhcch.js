import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TradingChartStreaming.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// Real-time streaming: \`updateBar(bar)\` replaces the last bar (same time)
// or appends one (a later time) on every tick, without passing the whole
// data set again; the countdown shows when the current bar closes.

import type {
  MinervaTradingChart,
  TradingBar,
} from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { watermark: "ACME · 1m · live" },
  zh: { watermark: "ACME · 1 分钟 · 实时" },
  ja: { watermark: "ACME · 1 分足 · ライブ" },
  fr: { watermark: "ACME · 1 min · direct" },
};

// 120 one-minute bars, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 120 }, (_, i) => {
  const open = close;
  close = round(
    open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
  );
  return {
    time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
    open,
    high: round(Math.max(open, close) + 0.1),
    low: round(Math.min(open, close) - 0.1),
    close,
    volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
  };
});

// the next state of the last bar: a tick moves its close, every 10th
// tick opens a new bar (a later time is appended by \`update\`)
const nextBar = (last: TradingBar, tick: number): TradingBar => {
  const close = round(
    last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
  );
  return tick % 10 === 0
    ? {
        time: last.time + 60_000,
        open: last.close,
        high: Math.max(last.close, close),
        low: Math.min(last.close, close),
        close,
        volume: 40,
      }
    : {
        ...last,
        high: Math.max(last.high, close),
        low: Math.min(last.low, close),
        close,
        volume: (last.volume ?? 0) + 25,
      };
};

const chart = ref<MinervaTradingChart>();

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartBars = BARS;
const chartIndicators = [{ type: "ema", period: 9 }, { type: "volume" }];
const chartOptions = { countdown: true, watermark: text.watermark };
let last: TradingBar = BARS[BARS.length - 1];
let tick = 0;
let timer = 0;

onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    last = nextBar(last, tick);
    chart.value!.updateBar(last);
  }, 500);
});

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
<\/script>

<template>
  <minerva-trading-chart
    id="live"
    symbol="ACME"
    timeframe="1m"
    height="400"
    ref="chart"
    :bars.prop="chartBars"
    :indicators.prop="chartIndicators"
    :options.prop="chartOptions"
  ></minerva-trading-chart>
</template>
`,angular:`// trading-chart-streaming.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// Real-time streaming: \`updateBar(bar)\` replaces the last bar (same time)
// or appends one (a later time) on every tick, without passing the whole
// data set again; the countdown shows when the current bar closes.
import type {
  MinervaTradingChart,
  TradingBar,
} from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { watermark: "ACME · 1m · live" },
  zh: { watermark: "ACME · 1 分钟 · 实时" },
  ja: { watermark: "ACME · 1 分足 · ライブ" },
  fr: { watermark: "ACME · 1 min · direct" },
};

// 120 one-minute bars, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 120 }, (_, i) => {
  const open = close;
  close = round(
    open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
  );
  return {
    time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
    open,
    high: round(Math.max(open, close) + 0.1),
    low: round(Math.min(open, close) - 0.1),
    close,
    volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
  };
});

// the next state of the last bar: a tick moves its close, every 10th
// tick opens a new bar (a later time is appended by \`update\`)
const nextBar = (last: TradingBar, tick: number): TradingBar => {
  const close = round(
    last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
  );
  return tick % 10 === 0
    ? {
        time: last.time + 60_000,
        open: last.close,
        high: Math.max(last.close, close),
        low: Math.min(last.close, close),
        close,
        volume: 40,
      }
    : {
        ...last,
        high: Math.max(last.high, close),
        low: Math.min(last.low, close),
        close,
        volume: (last.volume ?? 0) + 25,
      };
};

@Component({
  selector: "app-trading-chart-streaming",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-trading-chart
      id="live"
      symbol="ACME"
      timeframe="1m"
      height="400"
      #chart
      [bars]="chartBars"
      [indicators]="chartIndicators"
      [options]="chartOptions"
    ></minerva-trading-chart>
  \`,
})
export class TradingChartStreamingComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild("chart") chart!: ElementRef<MinervaTradingChart>;

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartBars = BARS;
  chartIndicators = [{ type: "ema", period: 9 }, { type: "volume" }];
  chartOptions = { countdown: true, watermark: this.text.watermark };
  last: TradingBar = BARS[BARS.length - 1];
  tick = 0;
  timer = 0;

  ngAfterViewInit(): void {
    this.timer = window.setInterval(() => {
      this.tick += 1;
      this.last = nextBar(this.last, this.tick);
      this.chart.nativeElement.updateBar(this.last);
    }, 500);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }
}
`,svelte:`<!-- TradingChartStreaming.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Real-time streaming: \`updateBar(bar)\` replaces the last bar (same time)
  // or appends one (a later time) on every tick, without passing the whole
  // data set again; the countdown shows when the current bar closes.

  import type {
    MinervaTradingChart,
    TradingBar,
  } from "minerva-design/web-components/trading-chart";

  const TEXT = {
    en: { watermark: "ACME · 1m · live" },
    zh: { watermark: "ACME · 1 分钟 · 实时" },
    ja: { watermark: "ACME · 1 分足 · ライブ" },
    fr: { watermark: "ACME · 1 min · direct" },
  };

  // 120 one-minute bars, generated deterministically
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  let close = 100;
  const BARS = Array.from({ length: 120 }, (_, i) => {
    const open = close;
    close = round(
      open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
    );
    return {
      time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
      open,
      high: round(Math.max(open, close) + 0.1),
      low: round(Math.min(open, close) - 0.1),
      close,
      volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
    };
  });

  // the next state of the last bar: a tick moves its close, every 10th
  // tick opens a new bar (a later time is appended by \`update\`)
  const nextBar = (last: TradingBar, tick: number): TradingBar => {
    const close = round(
      last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
    );
    return tick % 10 === 0
      ? {
          time: last.time + 60_000,
          open: last.close,
          high: Math.max(last.close, close),
          low: Math.min(last.close, close),
          close,
          volume: 40,
        }
      : {
          ...last,
          high: Math.max(last.high, close),
          low: Math.min(last.low, close),
          close,
          volume: (last.volume ?? 0) + 25,
        };
  };

  let chart: MinervaTradingChart;

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBars = BARS;
  const chartIndicators = [{ type: "ema", period: 9 }, { type: "volume" }];
  const chartOptions = { countdown: true, watermark: text.watermark };
  let last: TradingBar = BARS[BARS.length - 1];
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      last = nextBar(last, tick);
      chart.updateBar(last);
    }, 500);
    return () => {
      window.clearInterval(timer);
    };
  });
<\/script>

<minerva-trading-chart
  id="live"
  symbol="ACME"
  timeframe="1m"
  height="400"
  bind:this={chart}
  bars={chartBars}
  indicators={chartIndicators}
  options={chartOptions}
></minerva-trading-chart>
`,solid:`// TradingChartStreaming.tsx

import { onCleanup, onMount } from "solid-js";

// Real-time streaming: \`updateBar(bar)\` replaces the last bar (same time)
// or appends one (a later time) on every tick, without passing the whole
// data set again; the countdown shows when the current bar closes.
import type {
  MinervaTradingChart,
  TradingBar,
} from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { watermark: "ACME · 1m · live" },
  zh: { watermark: "ACME · 1 分钟 · 实时" },
  ja: { watermark: "ACME · 1 分足 · ライブ" },
  fr: { watermark: "ACME · 1 min · direct" },
};

// 120 one-minute bars, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 120 }, (_, i) => {
  const open = close;
  close = round(
    open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
  );
  return {
    time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
    open,
    high: round(Math.max(open, close) + 0.1),
    low: round(Math.min(open, close) - 0.1),
    close,
    volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
  };
});

// the next state of the last bar: a tick moves its close, every 10th
// tick opens a new bar (a later time is appended by \`update\`)
const nextBar = (last: TradingBar, tick: number): TradingBar => {
  const close = round(
    last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
  );
  return tick % 10 === 0
    ? {
        time: last.time + 60_000,
        open: last.close,
        high: Math.max(last.close, close),
        low: Math.min(last.close, close),
        close,
        volume: 40,
      }
    : {
        ...last,
        high: Math.max(last.high, close),
        low: Math.min(last.low, close),
        close,
        volume: (last.volume ?? 0) + 25,
      };
};

export default function TradingChartStreaming() {
  let chart!: MinervaTradingChart;

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBars = BARS;
  const chartIndicators = [{ type: "ema", period: 9 }, { type: "volume" }];
  const chartOptions = { countdown: true, watermark: text.watermark };
  let last: TradingBar = BARS[BARS.length - 1];
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      last = nextBar(last, tick);
      chart.updateBar(last);
    }, 500);
  });

  onCleanup(() => {
    window.clearInterval(timer);
  });

  return (
    <minerva-trading-chart
      id="live"
      symbol="ACME"
      timeframe="1m"
      height="400"
      ref={chart}
      prop:bars={chartBars}
      prop:indicators={chartIndicators}
      prop:options={chartOptions}
    ></minerva-trading-chart>
  );
}
`,html:`<minerva-trading-chart
  id="live"
  symbol="ACME"
  timeframe="1m"
  height="400"
></minerva-trading-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/trading-chart";

  // Real-time streaming: \`updateBar(bar)\` replaces the last bar (same time)
  // or appends one (a later time) on every tick, without passing the whole
  // data set again; the countdown shows when the current bar closes.
  const TEXT = {
    en: { watermark: "ACME · 1m · live" },
    zh: { watermark: "ACME · 1 分钟 · 实时" },
    ja: { watermark: "ACME · 1 分足 · ライブ" },
    fr: { watermark: "ACME · 1 min · direct" },
  };

  // 120 one-minute bars, generated deterministically
  const fraction = (value) => value - Math.floor(value);
  const round = (value) => Math.round(value * 100) / 100;
  let close = 100;
  const BARS = Array.from({ length: 120 }, (_, i) => {
    const open = close;
    close = round(
      open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
    );
    return {
      time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
      open,
      high: round(Math.max(open, close) + 0.1),
      low: round(Math.min(open, close) - 0.1),
      close,
      volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
    };
  });

  // the next state of the last bar: a tick moves its close, every 10th
  // tick opens a new bar (a later time is appended by \`update\`)
  const nextBar = (last, tick) => {
    const close = round(
      last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
    );
    return tick % 10 === 0
      ? {
          time: last.time + 60_000,
          open: last.close,
          high: Math.max(last.close, close),
          low: Math.min(last.close, close),
          close,
          volume: 40,
        }
      : {
          ...last,
          high: Math.max(last.high, close),
          low: Math.min(last.low, close),
          close,
          volume: (last.volume ?? 0) + 25,
        };
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const chart = document.querySelector("#live");
  chart.bars = BARS;
  chart.indicators = [{ type: "ema", period: 9 }, { type: "volume" }];
  chart.options = { countdown: true, watermark: text.watermark };
  let last = BARS[BARS.length - 1];
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    last = nextBar(last, tick);
    chart.updateBar(last);
  }, 500);
<\/script>
`}})))()}n();export{t as default};