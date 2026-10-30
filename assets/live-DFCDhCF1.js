import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- OrderBookLive.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// A live ladder: \`applyDeltas\` changes levels (the changed sizes flash),
// \`setLastPrice\` moves the spread row (colored by its last move); levels
// grouped by 0.1 (\`grouping\`).

import type { MinervaOrderBook } from "minerva-design/web-components/order-book";

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

const ladder = ref<MinervaOrderBook>();

const ladderBook = { bids: side(-1, 3), asks: side(1, 4) };
const ladderOptions = { grouping: 0.1, columns: ["price", "size", "total"] };
let tick = 0;
let timer = 0;

onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    ladder.value!.applyDeltas(delta(tick));
    ladder.value!.setLastPrice(round(100 + Math.sin(tick / 5) / 20));
  }, 400);
});

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
<\/script>

<template>
  <minerva-order-book
    id="live"
    height="380"
    ref="ladder"
    :book.prop="ladderBook"
    :options.prop="ladderOptions"
  ></minerva-order-book>
</template>
`,angular:`// order-book-live.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// A live ladder: \`applyDeltas\` changes levels (the changed sizes flash),
// \`setLastPrice\` moves the spread row (colored by its last move); levels
// grouped by 0.1 (\`grouping\`).
import type { MinervaOrderBook } from "minerva-design/web-components/order-book";

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
  selector: "app-order-book-live",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-order-book
      id="live"
      height="380"
      #ladder
      [book]="ladderBook"
      [options]="ladderOptions"
    ></minerva-order-book>
  \`,
})
export class OrderBookLiveComponent implements AfterViewInit, OnDestroy {
  @ViewChild("ladder") ladder!: ElementRef<MinervaOrderBook>;

  ladderBook = { bids: side(-1, 3), asks: side(1, 4) };
  ladderOptions = { grouping: 0.1, columns: ["price", "size", "total"] };
  tick = 0;
  timer = 0;

  ngAfterViewInit(): void {
    this.timer = window.setInterval(() => {
      this.tick += 1;
      this.ladder.nativeElement.applyDeltas(delta(this.tick));
      this.ladder.nativeElement.setLastPrice(
        round(100 + Math.sin(this.tick / 5) / 20),
      );
    }, 400);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }
}
`,svelte:`<!-- OrderBookLive.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // A live ladder: \`applyDeltas\` changes levels (the changed sizes flash),
  // \`setLastPrice\` moves the spread row (colored by its last move); levels
  // grouped by 0.1 (\`grouping\`).

  import type { MinervaOrderBook } from "minerva-design/web-components/order-book";

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

  let ladder: MinervaOrderBook;

  const ladderBook = { bids: side(-1, 3), asks: side(1, 4) };
  const ladderOptions = { grouping: 0.1, columns: ["price", "size", "total"] };
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      ladder.applyDeltas(delta(tick));
      ladder.setLastPrice(round(100 + Math.sin(tick / 5) / 20));
    }, 400);
    return () => {
      window.clearInterval(timer);
    };
  });
<\/script>

<minerva-order-book
  id="live"
  height="380"
  bind:this={ladder}
  book={ladderBook}
  options={ladderOptions}
></minerva-order-book>
`,solid:`// OrderBookLive.tsx

import { onCleanup, onMount } from "solid-js";

// A live ladder: \`applyDeltas\` changes levels (the changed sizes flash),
// \`setLastPrice\` moves the spread row (colored by its last move); levels
// grouped by 0.1 (\`grouping\`).
import type { MinervaOrderBook } from "minerva-design/web-components/order-book";

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

export default function OrderBookLive() {
  let ladder!: MinervaOrderBook;

  const ladderBook = { bids: side(-1, 3), asks: side(1, 4) };
  const ladderOptions = { grouping: 0.1, columns: ["price", "size", "total"] };
  let tick = 0;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      ladder.applyDeltas(delta(tick));
      ladder.setLastPrice(round(100 + Math.sin(tick / 5) / 20));
    }, 400);
  });

  onCleanup(() => {
    window.clearInterval(timer);
  });

  return (
    <minerva-order-book
      id="live"
      height="380"
      ref={ladder}
      prop:book={ladderBook}
      prop:options={ladderOptions}
    ></minerva-order-book>
  );
}
`,html:`<minerva-order-book id="live" height="380"></minerva-order-book>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/order-book";

  // A live ladder: \`applyDeltas\` changes levels (the changed sizes flash),
  // \`setLastPrice\` moves the spread row (colored by its last move); levels
  // grouped by 0.1 (\`grouping\`).
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

  const ladder = document.querySelector("#live");
  ladder.book = { bids: side(-1, 3), asks: side(1, 4) };
  ladder.options = { grouping: 0.1, columns: ["price", "size", "total"] };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    ladder.applyDeltas(delta(tick));
    ladder.setLastPrice(round(100 + Math.sin(tick / 5) / 20));
  }, 400);
<\/script>
`}})))()}n();export{t as default};