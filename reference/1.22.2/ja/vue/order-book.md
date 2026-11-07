# 板情報

Canvas で描く価格ラダー：スプレッド行の上に売り、下に買い。深度バー、価格のまとめ表示、変化した気配の点滅、大口注文の強調、ホバー時の累計サマリーを備えます。毎秒数百件の更新もフレームごとに 1 回の描画で済みます。

Package: minerva-design@1.22.2

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の板

### 板情報

BTC/USDT

価格 (USDT)

数量 (BTC)

累計 (BTC)

更新頻度

{{value}} 回/秒

{{updates}} メッセージ/秒 · 気配の変化 {{levels}} 件/秒

価格の刻み

深度バー

累計

気配ごと

大口注文のしきい値

≥ {{value}} BTC

買い {{price}}：{{size}} BTC、ここまでの累計 {{sum}} BTC

売り {{price}}：{{size}} BTC、ここまでの累計 {{sum}} BTC

気配をクリックして価格を選びます。

表示

両方

買い

売り

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

始値から {{value}}

指値：{{price}}

指値

デプス

BTC/USDT の深度

歩み値

BTC/USDT の歩み値

市場

暗号資産 · BTC/USDT

価格 (USDT)

数量 (BTC)

累計 (BTC)

BTC/USDT の板

株式 · AAPL

価格 (USD)

株数

累計

AAPL の板

FX · EUR/USD

レート

数量 (EUR)

累計 (EUR)

EUR/USD の板

先物 · ES

価格（ポイント）

枚数

累計

E-mini S&P 500 先物の板

{{value}} pips

{{value}} セント

{{value}} ティック

{{value}} USDT

呼値 {{tick}} · スプレッド {{spread}} · {{large}} 以上を強調

大口の壁

新規

取消

約定

{{size}} BTC 以上の壁：待機 {{resting}}、約定 {{filled}}、取消 {{pulled}}（取消率 {{ratio}}）

板の大口の壁を監視中…

買いの壁 {{price}}：{{size}} BTC

売りの壁 {{price}}：{{size}} BTC

{{value}} 後

指値注文

売買

買い

売り

指値 (USDT)

数量 (BTC)

価格と数量を入力するか、気配をクリックしてください。

{{filled}} BTC が即座に約定、平均 {{average}}。

{{filled}} BTC が即座に約定（平均 {{average}}）、残り {{rest}} BTC は {{price}} で待機。

{{price}} で待機、前に {{ahead}} BTC。

{{side}}

{{side}} {{size}} BTC（{{price}}）を発注しました。

{{price}} の注文を取り消しました。

{{side}} {{size}} @ {{price}}

未約定の注文はありません。

注文を取り消す

## OrderBook

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "OrderBook"
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
    "name": "tooltip",
    "type": "boolean",
    "required": false,
    "description": "Hover summary of the cumulative levels (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "header",
    "type": "boolean",
    "required": false,
    "description": "Column headers (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "lastPrice",
    "type": "number | null",
    "required": false,
    "description": "Price of the spread row, colored by its last move; the mid price when omitted",
    "typeText": "number | null"
  },
  {
    "name": "flash",
    "type": "boolean",
    "required": false,
    "description": "Flashes the changed sizes (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "spreadRow",
    "type": "boolean",
    "required": false,
    "description": "Spread row between the sides (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "imbalance",
    "type": "boolean",
    "required": false,
    "description": "Bid / ask imbalance bar (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "columns",
    "type": "readonly (\"size\" | \"price\" | \"total\")[]",
    "required": false,
    "description": "Columns, in order (default `[\"price\", \"size\", \"total\"]`)",
    "typeText": "readonly (\"size\" | \"price\" | \"total\")[]"
  },
  {
    "name": "labels",
    "type": "Partial<OrderBookLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<OrderBookLabels>"
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
    "name": "mode",
    "type": "OrderBookMode",
    "required": false,
    "description": "Sides shown (default `both`)",
    "typeText": "OrderBookMode"
  },
  {
    "name": "book",
    "type": "OrderBookSnapshot",
    "required": false,
    "description": "Book to draw, applied when the object changes (stream updates through the handle's `applyDeltas`)",
    "typeText": "OrderBookSnapshot"
  },
  {
    "name": "total",
    "type": "\"base\" | \"quote\"",
    "required": false,
    "description": "Total column in the base asset or the quote notional (default `base`)",
    "typeText": "\"base\" | \"quote\""
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
  },
  {
    "name": "rows",
    "type": "number",
    "required": false,
    "description": "Rows per side; fills the height by default",
    "typeText": "number"
  },
  {
    "name": "grouping",
    "type": "number",
    "required": false,
    "description": "Price step the levels are grouped by (default 0: none)",
    "typeText": "number"
  },
  {
    "name": "rowHeight",
    "type": "number",
    "required": false,
    "description": "Height of a row, in pixels (default 20)",
    "typeText": "number"
  },
  {
    "name": "depthBars",
    "type": "\"none\" | \"cumulative\" | \"level\"",
    "required": false,
    "description": "Depth bars behind the rows (default `cumulative`)",
    "typeText": "\"none\" | \"cumulative\" | \"level\""
  },
  {
    "name": "flashDuration",
    "type": "number",
    "required": false,
    "description": "Duration of a flash, in ms (default 450)",
    "typeText": "number"
  },
  {
    "name": "largeOrderThreshold",
    "type": "number",
    "required": false,
    "description": "Highlights the levels at or above this size",
    "typeText": "number"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[level: OrderBookLevelEvent | null]",
    "typeText": "[level: OrderBookLevelEvent | null]",
    "parameters": [
      {
        "name": "level",
        "position": 0,
        "typeText": "OrderBookLevelEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "levelClick",
    "type": "[level: OrderBookLevelEvent]",
    "typeText": "[level: OrderBookLevelEvent]",
    "parameters": [
      {
        "name": "level",
        "position": 0,
        "typeText": "OrderBookLevelEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ladder

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/vue/ladder.vue

```vue
<script setup lang="ts">
// <OrderBook>: asks above the spread row, bids below, depth bars and a
// large order highlight; @level-click reports the clicked row (e.g. to fill
// a price in an order form).
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { OrderBook, type OrderBookLevelEvent } from "minerva-design/vue/charts";

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

const book = { bids: side(-1, 1), asks: side(1, 2) };
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const clicked = ref<OrderBookLevelEvent | null>(null);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <OrderBook
      :book="book"
      :last-price="100.02"
      :large-order-threshold="50"
      :height="380"
      @level-click="clicked = $event"
    />
    <output aria-live="polite">
      {{
        clicked
          ? `${text.price} ${clicked.price} · ${text.size} ${clicked.size}`
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

### apps/docs/src/docs/pages/order-book/vue/live.vue

```vue
<script setup lang="ts">
// A live ladder: the handle's `applyDeltas` changes levels (the changed
// sizes flash), `last-price` moves the spread row (colored by its last
// move); levels grouped by 0.1 (`grouping`).
import { onBeforeUnmount, onMounted, ref } from "vue";
import { OrderBook, type OrderBookHandle } from "minerva-design/vue/charts";

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
const ladder = ref<OrderBookHandle>();
const lastPrice = ref(100);
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    ladder.value?.applyDeltas(delta(tick));
    lastPrice.value = round(100 + Math.sin(tick / 5) / 20);
  }, 400);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <OrderBook
    ref="ladder"
    :book="book"
    :last-price="lastPrice"
    :grouping="0.1"
    :height="380"
  />
</template>

```
