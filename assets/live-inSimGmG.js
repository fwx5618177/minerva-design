import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- DepthChartLive.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// Streaming updates: \`applyDeltas\` changes a few levels (drawn once per
// frame, eased); the book is not passed again.

import type { MinervaDepthChart } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

// every 400 ms, new sizes for a level of each side (size 0 would remove it)
const delta = (tick: number) => ({
  bids: {
    price: [round(100 - 0.05 * (1 + (tick % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
  },
  asks: {
    price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
  },
});

const chart = ref<MinervaDepthChart>();

const chartBook = { bids: side(-1, 3), asks: side(1, 4) };
const chartOptions = { range: 0.012 };
let tick = 0;
let timer = 0;

onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    chart.value!.applyDeltas(delta(tick));
  }, 400);
});

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
<\/script>

<template>
  <minerva-depth-chart
    id="live"
    height="280"
    ref="chart"
    :book.prop="chartBook"
    :options.prop="chartOptions"
  ></minerva-depth-chart>
</template>
`,angular:`// depth-chart-live.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// Streaming updates: \`applyDeltas\` changes a few levels (drawn once per
// frame, eased); the book is not passed again.
import type { MinervaDepthChart } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

// every 400 ms, new sizes for a level of each side (size 0 would remove it)
const delta = (tick: number) => ({
  bids: {
    price: [round(100 - 0.05 * (1 + (tick % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
  },
  asks: {
    price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
  },
});

@Component({
  selector: "app-depth-chart-live",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-depth-chart
      id="live"
      height="280"
      #chart
      [book]="chartBook"
      [options]="chartOptions"
    ></minerva-depth-chart>
  \`,
})
export class DepthChartLiveComponent implements AfterViewInit, OnDestroy {
  @ViewChild("chart") chart!: ElementRef<MinervaDepthChart>;

  chartBook = { bids: side(-1, 3), asks: side(1, 4) };
  chartOptions = { range: 0.012 };
  tick = 0;
  timer = 0;

  ngAfterViewInit(): void {
    this.timer = window.setInterval(() => {
      this.tick += 1;
      this.chart.nativeElement.applyDeltas(delta(this.tick));
    }, 400);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }
}
`,svelte:`<!-- DepthChartLive.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Streaming updates: \`applyDeltas\` changes a few levels (drawn once per
  // frame, eased); the book is not passed again.

  import type { MinervaDepthChart } from "minerva-design/web-components/order-book";

  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) =>
      round(100 + sign * 0.05 * (i + 1)),
    ),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(
        2 +
          fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
          (i % 9 === 8 ? 60 : 0),
      ),
    ),
  });

  // every 400 ms, new sizes for a level of each side (size 0 would remove it)
  const delta = (tick: number) => ({
    bids: {
      price: [round(100 - 0.05 * (1 + (tick % 20)))],
      size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
    },
    asks: {
      price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
      size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
    },
  });

  let chart: MinervaDepthChart;

  const chartBook = { bids: side(-1, 3), asks: side(1, 4) };
  const chartOptions = { range: 0.012 };
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      chart.applyDeltas(delta(tick));
    }, 400);
    return () => {
      window.clearInterval(timer);
    };
  });
<\/script>

<minerva-depth-chart
  id="live"
  height="280"
  bind:this={chart}
  book={chartBook}
  options={chartOptions}
></minerva-depth-chart>
`,solid:`// DepthChartLive.tsx

import { onCleanup, onMount } from "solid-js";

// Streaming updates: \`applyDeltas\` changes a few levels (drawn once per
// frame, eased); the book is not passed again.
import type { MinervaDepthChart } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of a book around 100, generated deterministically: columns of
// prices and sizes, a large order every 9 levels
const side = (sign: number, seed: number) => ({
  price: Array.from({ length: 40 }, (_, i) =>
    round(100 + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 40 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 9 === 8 ? 60 : 0),
    ),
  ),
});

// every 400 ms, new sizes for a level of each side (size 0 would remove it)
const delta = (tick: number) => ({
  bids: {
    price: [round(100 - 0.05 * (1 + (tick % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
  },
  asks: {
    price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
    size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
  },
});

export default function DepthChartLive() {
  let chart!: MinervaDepthChart;

  const chartBook = { bids: side(-1, 3), asks: side(1, 4) };
  const chartOptions = { range: 0.012 };
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      chart.applyDeltas(delta(tick));
    }, 400);
  });

  onCleanup(() => {
    window.clearInterval(timer);
  });

  return (
    <minerva-depth-chart
      id="live"
      height="280"
      ref={chart}
      prop:book={chartBook}
      prop:options={chartOptions}
    ></minerva-depth-chart>
  );
}
`,html:`<minerva-depth-chart id="live" height="280"></minerva-depth-chart>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/order-book";

  // Streaming updates: \`applyDeltas\` changes a few levels (drawn once per
  // frame, eased); the book is not passed again.
  const fraction = (value) => value - Math.floor(value);
  const round = (value) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign, seed) => ({
    price: Array.from({ length: 40 }, (_, i) =>
      round(100 + sign * 0.05 * (i + 1)),
    ),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(
        2 +
          fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
          (i % 9 === 8 ? 60 : 0),
      ),
    ),
  });

  // every 400 ms, new sizes for a level of each side (size 0 would remove it)
  const delta = (tick) => ({
    bids: {
      price: [round(100 - 0.05 * (1 + (tick % 20)))],
      size: [Math.round(2 + fraction(Math.sin(tick * 3.1) * 43758.5453) * 30)],
    },
    asks: {
      price: [round(100 + 0.05 * (1 + ((tick * 7) % 20)))],
      size: [Math.round(2 + fraction(Math.sin(tick * 5.7) * 43758.5453) * 30)],
    },
  });

  const chart = document.querySelector("#live");
  chart.book = { bids: side(-1, 3), asks: side(1, 4) };
  chart.options = { range: 0.012 };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    chart.applyDeltas(delta(tick));
  }, 400);
<\/script>
`}})))()}n();export{t as default};