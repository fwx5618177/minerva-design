import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- TimeAndSalesLargeTrades.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (\`aggregate\`), small ones hidden (\`minSize\`), large ones
// highlighted; minerva-trade-click reports the clicked row.

import type {
  MinervaTimeAndSales,
  TimeAndSalesRowEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { hint: "Click a trade", size: "lots" },
  zh: { hint: "点击一笔成交", size: "手" },
  ja: { hint: "約定をクリックします", size: "ロット" },
  fr: { hint: "Cliquez sur une transaction", size: "lots" },
};

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

const outputText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const tapeTrades = Array.from({ length: 2000 }, (_, i) => trade(i));
const tapeOptions = {
  aggregate: true,
  minSize: 2,
  largeTradeThreshold: 25,
  columns: ["time", "side", "price", "size"],
};
const onClick = (event: Event) => {
  const row = (event as CustomEvent<TimeAndSalesRowEvent>).detail;
  outputText.value = \`\${row.trade.price} × \${row.trade.size} \${text.size} (\${row.count})\`;
};

onMounted(() => {
  outputText.value = text.hint;
});
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-time-and-sales
      id="trades"
      height="300"
      :trades.prop="tapeTrades"
      :options.prop="tapeOptions"
      @minerva-trade-click="onClick"
    ></minerva-time-and-sales>
    <output id="trade" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// time-and-sales-large-trades.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (\`aggregate\`), small ones hidden (\`minSize\`), large ones
// highlighted; minerva-trade-click reports the clicked row.
import type {
  MinervaTimeAndSales,
  TimeAndSalesRowEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { hint: "Click a trade", size: "lots" },
  zh: { hint: "点击一笔成交", size: "手" },
  ja: { hint: "約定をクリックします", size: "ロット" },
  fr: { hint: "Cliquez sur une transaction", size: "lots" },
};

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
  selector: "app-time-and-sales-large-trades",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-time-and-sales
        id="trades"
        height="300"
        [trades]="tapeTrades"
        [options]="tapeOptions"
        (minerva-trade-click)="onClick($event)"
      ></minerva-time-and-sales>
      <output id="trade" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class TimeAndSalesLargeTradesComponent implements AfterViewInit {
  outputText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  tapeTrades = Array.from({ length: 2000 }, (_, i) => trade(i));
  tapeOptions = {
    aggregate: true,
    minSize: 2,
    largeTradeThreshold: 25,
    columns: ["time", "side", "price", "size"],
  };
  onClick = (event: Event) => {
    const row = (event as CustomEvent<TimeAndSalesRowEvent>).detail;
    this.outputText = \`\${row.trade.price} × \${row.trade.size} \${this.text.size} (\${row.count})\`;
  };

  ngAfterViewInit(): void {
    this.outputText = this.text.hint;
  }
}
`,svelte:`<!-- TimeAndSalesLargeTrades.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // 2,000 trades, virtualized: consecutive trades of the same side and price
  // are merged (\`aggregate\`), small ones hidden (\`minSize\`), large ones
  // highlighted; minerva-trade-click reports the clicked row.

  import type {
    MinervaTimeAndSales,
    TimeAndSalesRowEvent,
  } from "minerva-design/web-components/order-book";

  const TEXT = {
    en: { hint: "Click a trade", size: "lots" },
    zh: { hint: "点击一笔成交", size: "手" },
    ja: { hint: "約定をクリックします", size: "ロット" },
    fr: { hint: "Cliquez sur une transaction", size: "lots" },
  };

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

  let outputText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const tapeTrades = Array.from({ length: 2000 }, (_, i) => trade(i));
  const tapeOptions = {
    aggregate: true,
    minSize: 2,
    largeTradeThreshold: 25,
    columns: ["time", "side", "price", "size"],
  };
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<TimeAndSalesRowEvent>).detail;
    outputText = \`\${row.trade.price} × \${row.trade.size} \${text.size} (\${row.count})\`;
  };

  onMount(() => {
    outputText = text.hint;
  });
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-time-and-sales
    id="trades"
    height="300"
    trades={tapeTrades}
    options={tapeOptions}
    onminerva-trade-click={onClick}
  ></minerva-time-and-sales>
  <output id="trade" aria-live="polite">{outputText}</output>
</div>
`,solid:`// TimeAndSalesLargeTrades.tsx

import { createSignal, onMount } from "solid-js";

// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (\`aggregate\`), small ones hidden (\`minSize\`), large ones
// highlighted; minerva-trade-click reports the clicked row.
import type {
  MinervaTimeAndSales,
  TimeAndSalesRowEvent,
} from "minerva-design/web-components/order-book";

const TEXT = {
  en: { hint: "Click a trade", size: "lots" },
  zh: { hint: "点击一笔成交", size: "手" },
  ja: { hint: "約定をクリックします", size: "ロット" },
  fr: { hint: "Cliquez sur une transaction", size: "lots" },
};

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

export default function TimeAndSalesLargeTrades() {
  const [outputText, setOutputText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const tapeTrades = Array.from({ length: 2000 }, (_, i) => trade(i));
  const tapeOptions = {
    aggregate: true,
    minSize: 2,
    largeTradeThreshold: 25,
    columns: ["time", "side", "price", "size"],
  };
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<TimeAndSalesRowEvent>).detail;
    setOutputText(
      \`\${row.trade.price} × \${row.trade.size} \${text.size} (\${row.count})\`,
    );
  };

  onMount(() => {
    setOutputText(text.hint);
  });

  return (
    <div style="display: grid; gap: 8px">
      <minerva-time-and-sales
        id="trades"
        height="300"
        prop:trades={tapeTrades}
        prop:options={tapeOptions}
        on:minerva-trade-click={onClick}
      ></minerva-time-and-sales>
      <output id="trade" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-time-and-sales id="trades" height="300"></minerva-time-and-sales>
  <output id="trade" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/order-book";

  // 2,000 trades, virtualized: consecutive trades of the same side and price
  // are merged (\`aggregate\`), small ones hidden (\`minSize\`), large ones
  // highlighted; minerva-trade-click reports the clicked row.
  const TEXT = {
    en: { hint: "Click a trade", size: "lots" },
    zh: { hint: "点击一笔成交", size: "手" },
    ja: { hint: "約定をクリックします", size: "ロット" },
    fr: { hint: "Cliquez sur une transaction", size: "lots" },
  };

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

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const tape = document.querySelector("#trades");
  const output = document.querySelector("#trade");
  tape.trades = Array.from({ length: 2000 }, (_, i) => trade(i));
  tape.options = {
    aggregate: true,
    minSize: 2,
    largeTradeThreshold: 25,
    columns: ["time", "side", "price", "size"],
  };
  output.textContent = text.hint;
  const onClick = (event) => {
    const row = event.detail;
    output.textContent = \`\${row.trade.price} × \${row.trade.size} \${text.size} (\${row.count})\`;
  };
  tape.addEventListener("minerva-trade-click", onClick);
<\/script>
`}})))()}n();export{t as default};