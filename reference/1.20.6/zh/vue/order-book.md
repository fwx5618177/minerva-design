# 订单簿

Canvas 绘制的价格阶梯：卖单在价差行上方、买单在下方，带深度条、价格合并、变动档位闪烁、大单高亮与悬停累计汇总。每秒数百次更新也只需每帧绘制一次。

Package: minerva-design@1.20.6

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT 订单簿

### 订单簿

BTC/USDT

价格 (USDT)

数量 (BTC)

累计 (BTC)

更新频率

{{value}} 次/秒

{{updates}} 条消息/秒 · {{levels}} 次档位变动/秒

价格步长

深度条

累计

单档

大单阈值

≥ {{value}} BTC

买单 {{price}}：{{size}} BTC，到此累计 {{sum}} BTC

卖单 {{price}}：{{size}} BTC，到此累计 {{sum}} BTC

点击某一档选取其价格。

显示

双侧

买盘

卖盘

涨跌颜色

红涨绿跌

绿涨红跌

开盘以来 {{value}}

限价：{{price}}

限价

深度

BTC/USDT 深度

最新成交

BTC/USDT 逐笔成交

市场

加密货币 · BTC/USDT

价格 (USDT)

数量 (BTC)

累计 (BTC)

BTC/USDT 订单簿

股票 · AAPL

价格 (USD)

股数

累计

AAPL 订单簿

外汇 · EUR/USD

汇率

数量 (EUR)

累计 (EUR)

EUR/USD 订单簿

期货 · ES

价格（点）

合约

累计

E-mini 标普 500 期货订单簿

{{value}} 点

{{value}} 美分

{{value}} 跳

{{value}} USDT

最小变动价位 {{tick}} · 价差 {{spread}} · 达到 {{large}} 高亮

大单墙

新增

撤单

成交

≥ {{size}} BTC 的大单墙：{{resting}} 挂单中，{{filled}} 成交，{{pulled}} 撤单（撤单率 {{ratio}}）

正在监控盘口中的大单墙…

买盘墙 {{price}}：{{size}} BTC

卖盘墙 {{price}}：{{size}} BTC

持续 {{value}}

限价单

方向

买入

卖出

限价 (USDT)

数量 (BTC)

输入价格和数量，或点击一个档位。

立即成交 {{filled}} BTC，均价 {{average}}。

立即成交 {{filled}} BTC（均价 {{average}}），剩余 {{rest}} BTC 挂在 {{price}}。

挂在 {{price}}，前面排队 {{ahead}} BTC。

{{side}}

已下单：{{side}} {{size}} BTC，价格 {{price}}。

已撤销 {{price}} 的订单。

{{side}} {{size}} @ {{price}}

暂无挂单。

撤销订单

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
