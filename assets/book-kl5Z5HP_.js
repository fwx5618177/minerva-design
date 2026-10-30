import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- DepthChartBook.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// <minerva-depth-chart>: the cumulative bids and asks of a book (\`book\`,
// levels as \`[price, size]\` pairs or columns); minerva-hover reports the
// hovered price and the cumulative amount.

import type {
  DepthChartHoverEvent,
  MinervaDepthChart,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", total: "Total", hint: "Hover the curves" },
  zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
  ja: { price: "価格", total: "累計", hint: "曲線にカーソルを合わせます" },
  fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
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

const readoutText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const chartBook = { bids: side(-1, 1), asks: side(1, 2) };
const onHover = (event: Event) => {
  const point = (event as CustomEvent<DepthChartHoverEvent | null>).detail;
  readoutText.value = point
    ? \`\${text.price} \${point.price} · \${text.total} \${point.amount}\`
    : text.hint;
};

onMounted(() => {
  readoutText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-depth-chart
      id="depth"
      :book.prop="chartBook"
      @minerva-hover="onHover"
    ></minerva-depth-chart>
    <output id="readout" aria-live="polite">{{ readoutText }}</output>
  </div>
</template>
`,angular:`// depth-chart-book.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// <minerva-depth-chart>: the cumulative bids and asks of a book (\`book\`,
// levels as \`[price, size]\` pairs or columns); minerva-hover reports the
// hovered price and the cumulative amount.
import type {
  DepthChartHoverEvent,
  MinervaDepthChart,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", total: "Total", hint: "Hover the curves" },
  zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
  ja: { price: "価格", total: "累計", hint: "曲線にカーソルを合わせます" },
  fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
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
  selector: "app-depth-chart-book",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-depth-chart
        id="depth"
        [book]="chartBook"
        (minerva-hover)="onHover($event)"
      ></minerva-depth-chart>
      <output id="readout" aria-live="polite">{{ readoutText }}</output>
    </div>
  \`,
})
export class DepthChartBookComponent implements AfterViewInit {
  readoutText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  chartBook = { bids: side(-1, 1), asks: side(1, 2) };
  onHover = (event: Event) => {
    const point = (event as CustomEvent<DepthChartHoverEvent | null>).detail;
    this.readoutText = point
      ? \`\${this.text.price} \${point.price} · \${this.text.total} \${point.amount}\`
      : this.text.hint;
  };

  ngAfterViewInit(): void {
    this.readoutText = this.text.hint;
  }
}
`,svelte:`<!-- DepthChartBook.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // <minerva-depth-chart>: the cumulative bids and asks of a book (\`book\`,
  // levels as \`[price, size]\` pairs or columns); minerva-hover reports the
  // hovered price and the cumulative amount.

  import type {
    DepthChartHoverEvent,
    MinervaDepthChart,
  } from "minerva-design/web-components/order-book";

  const TEXT = {
    en: { price: "Price", total: "Total", hint: "Hover the curves" },
    zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
    ja: { price: "価格", total: "累計", hint: "曲線にカーソルを合わせます" },
    fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
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

  let readoutText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBook = { bids: side(-1, 1), asks: side(1, 2) };
  const onHover = (event: Event) => {
    const point = (event as CustomEvent<DepthChartHoverEvent | null>).detail;
    readoutText = point
      ? \`\${text.price} \${point.price} · \${text.total} \${point.amount}\`
      : text.hint;
  };

  onMount(() => {
    readoutText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-depth-chart id="depth" book={chartBook} onminerva-hover={onHover}></minerva-depth-chart>
  <output id="readout" aria-live="polite">{readoutText}</output>
</div>
`,solid:`// DepthChartBook.tsx

import { createSignal, onMount } from "solid-js";

// <minerva-depth-chart>: the cumulative bids and asks of a book (\`book\`,
// levels as \`[price, size]\` pairs or columns); minerva-hover reports the
// hovered price and the cumulative amount.
import type {
  DepthChartHoverEvent,
  MinervaDepthChart,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { price: "Price", total: "Total", hint: "Hover the curves" },
  zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
  ja: { price: "価格", total: "累計", hint: "曲線にカーソルを合わせます" },
  fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
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

export default function DepthChartBook() {
  const [readoutText, setReadoutText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chartBook = { bids: side(-1, 1), asks: side(1, 2) };
  const onHover = (event: Event) => {
    const point = (event as CustomEvent<DepthChartHoverEvent | null>).detail;
    setReadoutText(
      point
        ? \`\${text.price} \${point.price} · \${text.total} \${point.amount}\`
        : text.hint,
    );
  };

  onMount(() => {
    setReadoutText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-depth-chart
        id="depth"
        prop:book={chartBook}
        on:minerva-hover={onHover}
      ></minerva-depth-chart>
      <output id="readout" aria-live="polite">
        {readoutText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-depth-chart id="depth"></minerva-depth-chart>
  <output id="readout" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/order-book";

  // <minerva-depth-chart>: the cumulative bids and asks of a book (\`book\`,
  // levels as \`[price, size]\` pairs or columns); minerva-hover reports the
  // hovered price and the cumulative amount.
  const TEXT = {
    en: { price: "Price", total: "Total", hint: "Hover the curves" },
    zh: { price: "价格", total: "累计", hint: "将指针悬停在曲线上" },
    ja: { price: "価格", total: "累計", hint: "曲線にカーソルを合わせます" },
    fr: { price: "Prix", total: "Cumul", hint: "Survolez les courbes" },
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
  const chart = document.querySelector("#depth");
  const readout = document.querySelector("#readout");
  chart.book = { bids: side(-1, 1), asks: side(1, 2) };
  readout.textContent = text.hint;
  const onHover = (event) => {
    const point = event.detail;
    readout.textContent = point
      ? \`\${text.price} \${point.price} · \${text.total} \${point.amount}\`
      : text.hint;
  };
  chart.addEventListener("minerva-hover", onHover);
<\/script>
`}})))()}n();export{t as default};