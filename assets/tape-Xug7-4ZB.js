import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TimeAndSalesTape.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

// <minerva-time-and-sales>: the newest trade on top (\`addTrades\`), large
// trades highlighted; hovering pauses the tape, new trades are counted.

import type { MinervaTimeAndSales } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

const tape = ref<MinervaTimeAndSales>();

const tapeTrades = Array.from({ length: 40 }, (_, i) => trade(i));
const tapeOptions = { largeTradeThreshold: 20 };
let tick = 40;
let timer = 0;

onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    tape.value!.addTrades(trade(tick));
  }, 250);
});

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
<\/script>

<template>
  <minerva-time-and-sales
    id="tape"
    height="320"
    ref="tape"
    :trades.prop="tapeTrades"
    :options.prop="tapeOptions"
  ></minerva-time-and-sales>
</template>
`,angular:`// time-and-sales-tape.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

// <minerva-time-and-sales>: the newest trade on top (\`addTrades\`), large
// trades highlighted; hovering pauses the tape, new trades are counted.
import type { MinervaTimeAndSales } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

@Component({
  selector: "app-time-and-sales-tape",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <minerva-time-and-sales
      id="tape"
      height="320"
      #tape
      [trades]="tapeTrades"
      [options]="tapeOptions"
    ></minerva-time-and-sales>
  \`,
})
export class TimeAndSalesTapeComponent implements AfterViewInit, OnDestroy {
  @ViewChild("tape") tape!: ElementRef<MinervaTimeAndSales>;

  tapeTrades = Array.from({ length: 40 }, (_, i) => trade(i));
  tapeOptions = { largeTradeThreshold: 20 };
  tick = 40;
  timer = 0;

  ngAfterViewInit(): void {
    this.timer = window.setInterval(() => {
      this.tick += 1;
      this.tape.nativeElement.addTrades(trade(this.tick));
    }, 250);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }
}
`,svelte:`<!-- TimeAndSalesTape.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // <minerva-time-and-sales>: the newest trade on top (\`addTrades\`), large
  // trades highlighted; hovering pauses the tape, new trades are counted.

  import type { MinervaTimeAndSales } from "minerva-design/web-components/order-book";

  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick: number) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(
      100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
    ),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side:
      fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
        ? ("buy" as const)
        : ("sell" as const),
  });

  let tape: MinervaTimeAndSales;

  const tapeTrades = Array.from({ length: 40 }, (_, i) => trade(i));
  const tapeOptions = { largeTradeThreshold: 20 };
  let tick = 40;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      tape.addTrades(trade(tick));
    }, 250);
    return () => {
      window.clearInterval(timer);
    };
  });
<\/script>

<minerva-time-and-sales
  id="tape"
  height="320"
  bind:this={tape}
  trades={tapeTrades}
  options={tapeOptions}
></minerva-time-and-sales>
`,solid:`// TimeAndSalesTape.tsx

import { onCleanup, onMount } from "solid-js";

// <minerva-time-and-sales>: the newest trade on top (\`addTrades\`), large
// trades highlighted; hovering pauses the tape, new trades are counted.
import type { MinervaTimeAndSales } from "minerva-design/web-components/order-book";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// the trade of a tick: around 100, mostly small, sometimes large
const trade = (tick: number) => ({
  time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
  price: round(
    100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
  ),
  size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
  side:
    fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45
      ? ("buy" as const)
      : ("sell" as const),
});

export default function TimeAndSalesTape() {
  let tape!: MinervaTimeAndSales;

  const tapeTrades = Array.from({ length: 40 }, (_, i) => trade(i));
  const tapeOptions = { largeTradeThreshold: 20 };
  let tick = 40;
  let timer = 0;

  onMount(() => {
    timer = window.setInterval(() => {
      tick += 1;
      tape.addTrades(trade(tick));
    }, 250);
  });

  onCleanup(() => {
    window.clearInterval(timer);
  });

  return (
    <minerva-time-and-sales
      id="tape"
      height="320"
      ref={tape}
      prop:trades={tapeTrades}
      prop:options={tapeOptions}
    ></minerva-time-and-sales>
  );
}
`,html:`<minerva-time-and-sales id="tape" height="320"></minerva-time-and-sales>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/order-book";

  // <minerva-time-and-sales>: the newest trade on top (\`addTrades\`), large
  // trades highlighted; hovering pauses the tape, new trades are counted.
  const fraction = (value) => value - Math.floor(value);
  const round = (value) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(
      100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20,
    ),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side: fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45 ? "buy" : "sell",
  });

  const tape = document.querySelector("#tape");
  tape.trades = Array.from({ length: 40 }, (_, i) => trade(i));
  tape.options = { largeTradeThreshold: 20 };
  let tick = 40;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    tape.addTrades(trade(tick));
  }, 250);
<\/script>
`}})))()}n();export{t as default};