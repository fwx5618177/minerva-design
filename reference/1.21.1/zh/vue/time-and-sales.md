# 逐笔成交

逐笔成交列表：最新成交位于顶部并滑入、闪烁，大额成交加粗着色，同一毫秒的扫单可合并，可按数量过滤，悬停时暂停。基于类型化数组的环形缓冲区保存 20 万笔成交，只绘制可见的行。

Package: minerva-design@1.21.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT 逐笔成交

以 {{price}} 买入 {{size}} BTC

以 {{price}} 卖出 {{size}} BTC

悬停时暂停：移开指针（或点击徽标）即可继续。

悬停可暂停列表，点击某行选中一笔成交。

大额成交阈值

≥ {{value}} BTC

最小数量

全部

合并同一毫秒的扫单

按涨跌为价格着色

保留 {{value}} 行

涨跌颜色

红涨绿跌

绿涨红跌

追加 {{value}} 笔成交

共 {{rows}} 笔成交，最近一批耗时 {{ms}} ms

滚动窗口

最近 {{value}}

VWAP

买入占比

买入量

卖出量

{{value}} BTC

每秒成交笔数

最大单笔

买入 {{size}}，价格 {{price}}

卖出 {{size}}，价格 {{price}}

买方在主动吃卖单。

卖方在主动砸买单。

买卖力量均衡。

等待成交…

时区

本地

UTC

纽约

东京

时间（{{zone}}）

≥ {{value}} BTC 的大宗成交

清空

开始以来共 {{value}} 笔大宗成交

等待大宗成交…

买入

卖出

{{time}} · {{size}} BTC，均价 {{price}}，≈ {{notional}}

{{value}} 笔

{{count}} 笔 · {{size}} BTC

买入

卖出

BTC/USDT 买入成交

BTC/USDT 卖出成交

净流量：{{value}} BTC（买入 − 卖出）

## TimeAndSales

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TimeAndSales"
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
    "name": "animate",
    "type": "boolean",
    "required": false,
    "description": "Slides the new rows in (default `true`)",
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
    "name": "aggregate",
    "type": "boolean",
    "required": false,
    "description": "Merges the consecutive trades of the same side and price (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "pauseOnHover",
    "type": "boolean",
    "required": false,
    "description": "Pauses the tape while hovered (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "milliseconds",
    "type": "boolean",
    "required": false,
    "description": "Milliseconds in the times (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "columns",
    "type": "readonly TimeAndSalesColumn[]",
    "required": false,
    "description": "Columns, in order (default `[\"time\", \"price\", \"size\"]`)",
    "typeText": "readonly TimeAndSalesColumn[]"
  },
  {
    "name": "labels",
    "type": "Partial<TimeAndSalesLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<TimeAndSalesLabels>"
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
    "name": "minSize",
    "type": "number",
    "required": false,
    "description": "Hides the trades below this size (default 0)",
    "typeText": "number"
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
    "name": "rowHeight",
    "type": "number",
    "required": false,
    "description": "Height of a row, in pixels (default 20)",
    "typeText": "number"
  },
  {
    "name": "trades",
    "type": "readonly MarketTrade[]",
    "required": false,
    "description": "Trades, oldest first; when the array grows, only the appended ones are added (other changes replace the tape)",
    "typeText": "readonly MarketTrade[]"
  },
  {
    "name": "timeZone",
    "type": "ChartTimeZone",
    "required": false,
    "description": "Clock of the default time format: the local time or UTC, the clock of most exchanges (default `local`)",
    "typeText": "ChartTimeZone"
  },
  {
    "name": "capacity",
    "type": "number",
    "required": false,
    "description": "Trades kept (default 200000)",
    "typeText": "number"
  },
  {
    "name": "largeTradeThreshold",
    "type": "number",
    "required": false,
    "description": "Highlights the trades at or above this size",
    "typeText": "number"
  },
  {
    "name": "priceColor",
    "type": "\"side\" | \"tick\"",
    "required": false,
    "description": "Price color: the side of the trade or the tick direction (default `side`)",
    "typeText": "\"side\" | \"tick\""
  },
  {
    "name": "formatTime",
    "type": "((time: number) => string)",
    "required": false,
    "description": "Formats the times",
    "typeText": "((time: number) => string)"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[row: TimeAndSalesRowEvent | null]",
    "typeText": "[row: TimeAndSalesRowEvent | null]",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pause",
    "type": "[paused: boolean]",
    "typeText": "[paused: boolean]",
    "parameters": [
      {
        "name": "paused",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "tradeClick",
    "type": "[row: TimeAndSalesRowEvent]",
    "typeText": "[row: TimeAndSalesRowEvent]",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: large-trades

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/vue/large-trades.vue

```vue
<script setup lang="ts">
// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (`aggregate`), small ones hidden (`min-size`), large ones
// highlighted; @trade-click reports the clicked row.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  TimeAndSales,
  type TimeAndSalesRowEvent,
} from "minerva-design/vue/charts";

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

const trades = Array.from({ length: 2000 }, (_, i) => trade(i));
const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const clicked = ref<TimeAndSalesRowEvent | null>(null);
</script>

<template>
  <div style="display: grid; gap: 8px">
    <TimeAndSales
      :trades="trades"
      aggregate
      :min-size="2"
      :large-trade-threshold="25"
      :columns="['time', 'side', 'price', 'size']"
      :height="300"
      @trade-click="clicked = $event"
    />
    <output aria-live="polite">
      {{
        clicked
          ? `${clicked.trade.price} × ${clicked.trade.size} ${text.size} (${clicked.count})`
          : text.hint
      }}
    </output>
  </div>
</template>

```

## Example: tape

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/vue/tape.vue

```vue
<script setup lang="ts">
// <TimeAndSales>: the newest trade on top (the handle's `addTrades`), large
// trades highlighted; hovering pauses the tape, new trades are counted.
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  TimeAndSales,
  type TimeAndSalesHandle,
} from "minerva-design/vue/charts";

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

const first = Array.from({ length: 40 }, (_, i) => trade(i));
const tape = ref<TimeAndSalesHandle>();
let tick = 40;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    tape.value?.addTrades(trade(tick));
  }, 250);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <TimeAndSales
    ref="tape"
    :trades="first"
    :large-trade-threshold="20"
    :height="320"
  />
</template>

```
