import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- OrderBookHeatmapRedUp.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// \`colorConvention: "red-up"\` (mainland China): buys in red, sells in
// green; a square-root color scale shows more of the small orders, without
// the size profile on the right.

import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

const heatmap = ref<MinervaOrderBookHeatmap>();

const heatmapOptions = {
  colorConvention: "red-up",
  colorScale: "sqrt",
  profile: false,
};
let tick = 0;
let timer = 0;

onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.value!.setBook(book);
    heatmap.value!.addTrades(trade);
  }, 200);
});

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
<\/script>

<template>
  <minerva-order-book-heatmap
    id="heatmap"
    ref="heatmap"
    :options.prop="heatmapOptions"
  ></minerva-order-book-heatmap>
</template>
`,angular:`// order-book-heatmap-red-up.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// \`colorConvention: "red-up"\` (mainland China): buys in red, sells in
// green; a square-root color scale shows more of the small orders, without
// the size profile on the right.
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

@Component({
  selector: "app-order-book-heatmap-red-up",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-order-book-heatmap
      id="heatmap"
      #heatmap
      [options]="heatmapOptions"
    ></minerva-order-book-heatmap>
  \`,
})
export class OrderBookHeatmapRedUpComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild("heatmap") heatmap!: ElementRef<MinervaOrderBookHeatmap>;

  heatmapOptions = {
    colorConvention: "red-up",
    colorScale: "sqrt",
    profile: false,
  };
  tick = 0;
  timer = 0;

  ngAfterViewInit(): void {
    this.timer = window.setInterval(() => {
      this.tick += 1;
      const { book, trade } = snapshot(this.tick);
      this.heatmap.nativeElement.setBook(book);
      this.heatmap.nativeElement.addTrades(trade);
    }, 200);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }
}
`,svelte:`<!-- OrderBookHeatmapRedUp.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // \`colorConvention: "red-up"\` (mainland China): buys in red, sells in
  // green; a square-root color scale shows more of the small orders, without
  // the size profile on the right.

  import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) =>
      round(mid + sign * 0.05 * (i + 1)),
    ),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(
        2 +
          fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
          (i % 13 === 12 ? 80 : 0),
      ),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: {
        bids: side(mid, -1, tick % 7),
        asks: side(mid, 1, (tick + 3) % 7),
        time: Date.now(),
      },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };

  let heatmap: MinervaOrderBookHeatmap;

  const heatmapOptions = {
    colorConvention: "red-up",
    colorScale: "sqrt",
    profile: false,
  };
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      const { book, trade } = snapshot(tick);
      heatmap.setBook(book);
      heatmap.addTrades(trade);
    }, 200);
    return () => {
      window.clearInterval(timer);
    };
  });
<\/script>

<minerva-order-book-heatmap
  id="heatmap"
  bind:this={heatmap}
  options={heatmapOptions}
></minerva-order-book-heatmap>
`,solid:`// OrderBookHeatmapRedUp.tsx

import { onCleanup, onMount } from "solid-js";

// \`colorConvention: "red-up"\` (mainland China): buys in red, sells in
// green; a square-root color scale shows more of the small orders, without
// the size profile on the right.
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

export default function OrderBookHeatmapRedUp() {
  let heatmap!: MinervaOrderBookHeatmap;

  const heatmapOptions = {
    colorConvention: "red-up",
    colorScale: "sqrt",
    profile: false,
  };
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      const { book, trade } = snapshot(tick);
      heatmap.setBook(book);
      heatmap.addTrades(trade);
    }, 200);
  });

  onCleanup(() => {
    window.clearInterval(timer);
  });

  return (
    <minerva-order-book-heatmap
      id="heatmap"
      ref={heatmap}
      prop:options={heatmapOptions}
    ></minerva-order-book-heatmap>
  );
}
`,html:`<minerva-order-book-heatmap id="heatmap"></minerva-order-book-heatmap>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/order-book";

  // \`colorConvention: "red-up"\` (mainland China): buys in red, sells in
  // green; a square-root color scale shows more of the small orders, without
  // the size profile on the right.
  const fraction = (value) => value - Math.floor(value);
  const round = (value) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid, sign, seed) => ({
    price: Array.from({ length: 60 }, (_, i) =>
      round(mid + sign * 0.05 * (i + 1)),
    ),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(
        2 +
          fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
          (i % 13 === 12 ? 80 : 0),
      ),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: {
        bids: side(mid, -1, tick % 7),
        asks: side(mid, 1, (tick + 3) % 7),
        time: Date.now(),
      },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? "buy" : "sell",
      },
    };
  };

  const heatmap = document.querySelector("#heatmap");
  heatmap.options = {
    colorConvention: "red-up",
    colorScale: "sqrt",
    profile: false,
  };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.setBook(book);
    heatmap.addTrades(trade);
  }, 200);
<\/script>
`}})))()}n();export{t as default};