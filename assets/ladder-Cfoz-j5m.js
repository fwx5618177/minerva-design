import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- OrderBookLadder.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// <minerva-order-book>: asks above the spread row, bids below, depth bars
// and a large order highlight; minerva-level-click reports the clicked row
// (e.g. to fill a price in an order form).

import type {
  MinervaOrderBook,
  OrderBookLevelEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", size: "Size", hint: "Click a row" },
  zh: { price: "价格", size: "数量", hint: "点击一行" },
  ja: { price: "価格", size: "数量", hint: "行をクリックします" },
  fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
};

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

const levelText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const ladderBook = { bids: side(-1, 1), asks: side(1, 2) };
const ladderOptions = { largeOrderThreshold: 50 };
const onClick = (event: Event) => {
  const row = (event as CustomEvent<OrderBookLevelEvent>).detail;
  levelText.value = \`\${text.price} \${row.price} · \${text.size} \${row.size}\`;
};

onMounted(() => {
  levelText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-order-book
      id="ladder"
      last-price="100.02"
      height="380"
      :book.prop="ladderBook"
      :options.prop="ladderOptions"
      @minerva-level-click="onClick"
    ></minerva-order-book>
    <output id="level" aria-live="polite">{{ levelText }}</output>
  </div>
</template>
`,angular:`// order-book-ladder.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// <minerva-order-book>: asks above the spread row, bids below, depth bars
// and a large order highlight; minerva-level-click reports the clicked row
// (e.g. to fill a price in an order form).
import type {
  MinervaOrderBook,
  OrderBookLevelEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", size: "Size", hint: "Click a row" },
  zh: { price: "价格", size: "数量", hint: "点击一行" },
  ja: { price: "価格", size: "数量", hint: "行をクリックします" },
  fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
};

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

@Component({
  selector: "app-order-book-ladder",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-order-book
        id="ladder"
        last-price="100.02"
        height="380"
        [book]="ladderBook"
        [options]="ladderOptions"
        (minerva-level-click)="onClick($event)"
      ></minerva-order-book>
      <output id="level" aria-live="polite">{{ levelText }}</output>
    </div>
  \`,
})
export class OrderBookLadderComponent implements AfterViewInit {
  levelText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  ladderBook = { bids: side(-1, 1), asks: side(1, 2) };
  ladderOptions = { largeOrderThreshold: 50 };
  onClick = (event: Event) => {
    const row = (event as CustomEvent<OrderBookLevelEvent>).detail;
    this.levelText = \`\${this.text.price} \${row.price} · \${this.text.size} \${row.size}\`;
  };

  ngAfterViewInit(): void {
    this.levelText = this.text.hint;
  }
}
`,svelte:`<!-- OrderBookLadder.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // <minerva-order-book>: asks above the spread row, bids below, depth bars
  // and a large order highlight; minerva-level-click reports the clicked row
  // (e.g. to fill a price in an order form).

  import type {
    MinervaOrderBook,
    OrderBookLevelEvent,
  } from "minerva-design/web-components/order-book";

  const TEXT = {
    en: { price: "Price", size: "Size", hint: "Click a row" },
    zh: { price: "价格", size: "数量", hint: "点击一行" },
    ja: { price: "価格", size: "数量", hint: "行をクリックします" },
    fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
  };

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

  let levelText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ladderBook = { bids: side(-1, 1), asks: side(1, 2) };
  const ladderOptions = { largeOrderThreshold: 50 };
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<OrderBookLevelEvent>).detail;
    levelText = \`\${text.price} \${row.price} · \${text.size} \${row.size}\`;
  };

  onMount(() => {
    levelText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-order-book
    id="ladder"
    last-price="100.02"
    height="380"
    book={ladderBook}
    options={ladderOptions}
    onminerva-level-click={onClick}
  ></minerva-order-book>
  <output id="level" aria-live="polite">{levelText}</output>
</div>
`,solid:`// OrderBookLadder.tsx

import { createSignal, onMount } from "solid-js";

// <minerva-order-book>: asks above the spread row, bids below, depth bars
// and a large order highlight; minerva-level-click reports the clicked row
// (e.g. to fill a price in an order form).
import type {
  MinervaOrderBook,
  OrderBookLevelEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", size: "Size", hint: "Click a row" },
  zh: { price: "价格", size: "数量", hint: "点击一行" },
  ja: { price: "価格", size: "数量", hint: "行をクリックします" },
  fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
};

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

export default function OrderBookLadder() {
  const [levelText, setLevelText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ladderBook = { bids: side(-1, 1), asks: side(1, 2) };
  const ladderOptions = { largeOrderThreshold: 50 };
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<OrderBookLevelEvent>).detail;
    setLevelText(\`\${text.price} \${row.price} · \${text.size} \${row.size}\`);
  };

  onMount(() => {
    setLevelText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-order-book
        id="ladder"
        last-price="100.02"
        height="380"
        prop:book={ladderBook}
        prop:options={ladderOptions}
        on:minerva-level-click={onClick}
      ></minerva-order-book>
      <output id="level" aria-live="polite">
        {levelText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-order-book
    id="ladder"
    last-price="100.02"
    height="380"
  ></minerva-order-book>
  <output id="level" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/order-book";

  // <minerva-order-book>: asks above the spread row, bids below, depth bars
  // and a large order highlight; minerva-level-click reports the clicked row
  // (e.g. to fill a price in an order form).
  const TEXT = {
    en: { price: "Price", size: "Size", hint: "Click a row" },
    zh: { price: "价格", size: "数量", hint: "点击一行" },
    ja: { price: "価格", size: "数量", hint: "行をクリックします" },
    fr: { price: "Prix", size: "Quantité", hint: "Cliquez sur une ligne" },
  };

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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const ladder = document.querySelector("#ladder");
  const level = document.querySelector("#level");
  ladder.book = { bids: side(-1, 1), asks: side(1, 2) };
  ladder.options = { largeOrderThreshold: 50 };
  level.textContent = text.hint;
  const onClick = (event) => {
    const row = event.detail;
    level.textContent = \`\${text.price} \${row.price} · \${text.size} \${row.size}\`;
  };
  ladder.addEventListener("minerva-level-click", onClick);
<\/script>
`}})))()}n();export{t as default};