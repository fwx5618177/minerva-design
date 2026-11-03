# デプスチャート

板の累積深度：仲値を挟んだ階段状の買い・売りエリア、ホバーすると両側の数量・金額・平均価格を鏡映表示し、仲値を中心にズームでき、毎秒数百件の差分更新もなめらかに補間します。

Package: minerva-design@1.19.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の板の深度

リアルタイム配信

表示範囲

自動

±{{value}}

累積方法

数量 (BTC)

金額 (USDT)

曲線

階段

直線

Ctrl/⌘ + ホイールまたはピンチで仲値を中心にズーム、ダブルクリックで戻します。

{{value}} にズーム中

自分の買い

自分の売り

清算価格

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

{{amount}} BTC（{{total}}）を買うと {{price}} までの売り板を約定し、仲値より {{slippage}} 上、平均価格は {{average}} です。

{{amount}} BTC（{{total}}）を売ると {{price}} までの買い板を約定し、仲値より {{slippage}} 下、平均価格は {{average}} です。

曲線にホバーして成行注文のコストを見積もります。

売買

成行買い

成行売り

注文数量

{{value}} BTC

平均約定

最終約定

{{size}} BTC は {{levels}} 段で約定：平均 {{average}}、最終約定 {{worst}}、合計 {{cost}}、仲値から {{slippage}} bp。

このサイドには {{filled}} BTC しかありません（注文は {{size}} BTC）。{{levels}} 段すべてを {{worst}} まで食い尽くします。

集計範囲

{{band}} 以内：買い {{bids}} BTC、売り {{asks}} BTC、偏り {{imbalance}} · スプレッド {{spread}}（{{spreadBp}} bp）

最初の読み取りを待っています…

金額を累積（価格 × 株数）

金額（USD）

株数

ACME 株の板の深さ

統合

取引所 {{name}}

取引所

最良買い気配

最良売り気配

±0.1% 以内の BTC

{{value}}（{{share}}）

BTC/USDT の深さ、{{name}}

取引所別の最良気配と流動性

## DepthChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "DepthChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean",
    "required": false,
    "description": "Legend with the spread (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "tooltip",
    "type": "boolean",
    "required": false,
    "description": "Hover readout (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "grid",
    "type": "boolean",
    "required": false,
    "description": "Grid lines (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "zoomable",
    "type": "boolean",
    "required": false,
    "description": "Zoom around the mid with the wheel / pinch (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "animate",
    "type": "boolean",
    "required": false,
    "description": "Eased transitions between books (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "midLine",
    "type": "boolean",
    "required": false,
    "description": "Line and label at the mid price (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "axes",
    "type": "boolean",
    "required": false,
    "description": "Price and amount axes (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "mirror",
    "type": "boolean",
    "required": false,
    "description": "Mirrored readout on the other side (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<DepthChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<DepthChartLabels>"
  },
  {
    "name": "curve",
    "type": "\"linear\" | \"step\"",
    "required": false,
    "description": "Stepped or straight curves (default `step`)",
    "typeText": "\"linear\" | \"step\""
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Locale of the numbers and texts (`\"zh-CN\"`); the page language by default",
    "typeText": "string"
  },
  {
    "name": "range",
    "type": "number",
    "required": false,
    "description": "Visible range on each side of the mid price, as a fraction of the mid; fits the book by default",
    "typeText": "number"
  },
  {
    "name": "book",
    "type": "OrderBookSnapshot",
    "required": false,
    "description": "Book to draw, applied when the object changes (stream updates through the handle's `applyDeltas`)",
    "typeText": "OrderBookSnapshot"
  },
  {
    "name": "rangeLimits",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Smallest and largest `range` reachable by zooming (default `[0.0005, 0.5]`)",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "amount",
    "type": "\"base\" | \"quote\"",
    "required": false,
    "description": "Cumulative amount in the base asset or the quote notional (default `base`)",
    "typeText": "\"base\" | \"quote\""
  },
  {
    "name": "fillOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the areas, 0-1 (default 0.28)",
    "typeText": "number"
  },
  {
    "name": "priceLines",
    "type": "readonly DepthChartPriceLine[]",
    "required": false,
    "description": "Reference lines at prices (an order, a liquidation)",
    "typeText": "readonly DepthChartPriceLine[]"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of the bids / buys (any CSS color); from `colorConvention` by default",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of the asks / sells",
    "typeText": "string"
  },
  {
    "name": "colorConvention",
    "type": "OrderBookColorConvention",
    "required": false,
    "description": "`red-up` swaps the default colors (default `green-up`)",
    "typeText": "OrderBookColorConvention"
  },
  {
    "name": "pricePrecision",
    "type": "number",
    "required": false,
    "description": "Decimals of the prices; detected from the data by default",
    "typeText": "number"
  },
  {
    "name": "sizePrecision",
    "type": "number",
    "required": false,
    "description": "Decimals of the sizes; detected from the data by default",
    "typeText": "number"
  },
  {
    "name": "formatPrice",
    "type": "((price: number) => string)",
    "required": false,
    "description": "Formats the prices; overrides `pricePrecision`",
    "typeText": "((price: number) => string)"
  },
  {
    "name": "formatSize",
    "type": "((size: number) => string)",
    "required": false,
    "description": "Formats the sizes; overrides `sizePrecision`",
    "typeText": "((size: number) => string)"
  },
  {
    "name": "fontFamily",
    "type": "string",
    "required": false,
    "description": "Font family of the texts (default: the theme font)",
    "typeText": "string"
  },
  {
    "name": "fontSize",
    "type": "number",
    "required": false,
    "description": "Font size of the texts, in pixels (default 12)",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: DepthChartHoverEvent | null]",
    "typeText": "[event: DepthChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "DepthChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "click",
    "type": "[event: DepthChartHoverEvent]",
    "typeText": "[event: DepthChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "DepthChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rangeChange",
    "type": "[range: number]",
    "typeText": "[range: number]",
    "parameters": [
      {
        "name": "range",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: book

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/depth-chart/vue/book.vue

```vue
<script setup lang="ts">
// <DepthChart>: the cumulative bids and asks of a book (`book`, levels as
// `[price, size]` pairs or columns); @hover reports the hovered price and
// the cumulative amount.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  DepthChart,
  type DepthChartHoverEvent,
} from "minerva-design/vue/charts";

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

const book = { bids: side(-1, 1), asks: side(1, 2) };
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const hovered = ref<DepthChartHoverEvent | null>(null);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <DepthChart :book="book" @hover="hovered = $event" />
    <output aria-live="polite">
      {{
        hovered
          ? `${text.price} ${hovered.price} · ${text.total} ${hovered.amount}`
          : text.hint
      }}
    </output>
  </div>
</template>

```

## Example: live

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/depth-chart/vue/live.vue

```vue
<script setup lang="ts">
// Streaming updates: the handle's `applyDeltas` changes a few levels
// (drawn once per frame, eased); the book is not passed again.
import { onBeforeUnmount, onMounted, ref } from "vue";
import { DepthChart, type DepthChartHandle } from "minerva-design/vue/charts";

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

const book = { bids: side(-1, 3), asks: side(1, 4) };
const chart = ref<DepthChartHandle>();
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    chart.value?.applyDeltas(delta(tick));
  }, 400);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <DepthChart ref="chart" :book="book" :range="0.012" :height="280" />
</template>

```
