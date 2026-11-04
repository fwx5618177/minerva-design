# 歩み値

歩み値：最新の約定が上から滑り込んで点滅し、大口約定は太字と色で強調、同一ミリ秒のスイープはまとめられ、数量でのフィルターやホバー中の一時停止に対応します。型付き配列のリングバッファに 20 万件を保持し、見えている行だけを描画します。

Package: minerva-design@1.20.4

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の歩み値

{{price}} で {{size}} BTC の買い

{{price}} で {{size}} BTC の売り

ホバー中は一時停止：ポインターを外す（またはバッジをクリック）と再開します。

ホバーで一時停止、行をクリックで約定を選択します。

大口約定のしきい値

≥ {{value}} BTC

最小数量

すべて

同一ミリ秒のスイープをまとめる

ティックで価格を色分け

保持中の行：{{value}}

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

約定を {{value}} 件追加

{{rows}} 件、直近のバッチは {{ms}} ms

ローリング期間

直近 {{value}}

VWAP

買いの比率

買い

売り

{{value}} BTC

約定数 / 秒

最大の約定

買い {{size}}（{{price}}）

売り {{size}}（{{price}}）

買い手が売り気配を買い上がっています。

売り手が買い気配に売り込んでいます。

買いと売りの流れは均衡しています。

約定を待っています…

タイムゾーン

ローカル

UTC

ニューヨーク

東京

時刻（{{zone}}）

{{value}} BTC 以上の大口約定

クリア

開始から {{value}} 件の大口約定

大口約定を待っています…

買い

売り

{{time}} · {{size}} BTC、平均 {{price}}、≈ {{notional}}

{{value}} 件

{{count}} 件 · {{size}} BTC

買い

売り

BTC/USDT の買い約定

BTC/USDT の売り約定

ネットフロー：{{value}} BTC（買い − 売り）

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
