# 板ヒートマップ

Bookmap 風の流動性ヒートマップ：時間と価格ごとの指値量を GPU で描画し、最良気配ライン、出来高に応じた約定バブル、現在の板のプロファイルを重ねます。ズーム・パン・十字カーソルでの読み取りに対応。ストリームは間隔ごとに列を追加し、スライドするウィンドウで表示します。

Package: minerva-design@1.20.5

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### 読み方

ヒートマップは板の録画です。各列はある瞬間の板のスナップショットで、左から右へ並び、右端が現在です。

横軸は時刻（右が最新）、縦軸は価格です。任意の位置にホバーすると、クロスヘアがその時刻・価格の注文量を表示します。

セルの色はその時刻・価格に置かれている注文量です。暗いほどほとんど注文がなく、明るいほど（青 → シアン → 黄 → 白）注文が多くなります。左上の凡例が色に対応する数量の範囲と単位を示します。

明るい水平線は板に残り続ける大口注文（壁）です。線が途切れた所で注文は取り消されたか約定しました。価格線が壁の終点に届いていれば約定です。

価格に沿う赤と緑の線は最良売り気配と最良買い気配で、その間がスプレッドです。価格軸の塗りつぶした赤・緑のタグは現在の最良売り・買い気配、枠線のタグは直近の約定価格です。

点は約定です。緑は成行買い（売り注文を取る）、赤は成行売り（買い注文に当てる）で、面積はその列の出来高に比例し、大きなバブルは大口約定です。colorConvention="red-up" で 2 色が入れ替わります。

右側のバーは現在の板です。上の赤が売り注文、下の緑が買い注文で、長いほど数量が多く、下の目盛りが数量です。

#### 注目するパターン

支持と抵抗：価格が明るい線に何度も触れて反転するなら、大口注文が価格を受け止めています。

取り消し（見せ板）：価格が近づくと明るい線が消え、そこに約定バブルがない場合、注文は約定ではなく取り消されています。

スイープ：大きなバブルが連続して複数の価格を横切り、価格線が跳ね、通り道の流動性が暗くなります。

薄い流動性：価格の近くの広い暗い領域は注文が少ないことを示し、価格はそこを素早く通過できます。

BTC/USDT の流動性ヒートマップ

レンダラー：{{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

相場に追従中

自由表示（ズーム・パン済み）

相場に追従

カラースケール

対数

平方根

線形

コントラスト

×{{value}}

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

ホバー中の列：買い {{buys}} BTC、売り {{sells}} BTC

列にホバーすると出来高を表示します。

行の高さ

価格範囲

{{value}} USDT

自動

板に合わせる

{{time}} · {{price}} · {{size}} BTC {{side}} · 買い {{buys}} BTC、売り {{sells}} BTC

{{low}} – {{high}}

（買い側）

（売り側）

（スプレッド内）

セルにカーソルを合わせると詳細を表示します。

時間窓

ライブフィード

履歴をクリア

{{time}} に一時停止しました。

{{time}} に再開しました。

{{time}} に履歴をクリアしました。

保持している {{history}} のうち {{window}} を表示中。

BTC/USDT

現在値 {{value}}

スプレッド {{value}}

歩み値 {{value}} 件

BTC/USDT の板

BTC/USDT の歩み値

BTC-USD 無期限先物

1枚 = {{value}} BTC

資金調達率 {{rate}}

資金調達率 {{rate}}、{{time}} まで残り {{countdown}}

枚

板

テイカー買い

テイカー売り

BTC-USD 無期限先物の流動性ヒートマップ

{{price}}：板 {{contracts}} 枚（≈ {{notional}}）

ヒートマップにカーソルを合わせると板の枚数と金額を表示します。

## OrderBookHeatmap

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "OrderBookHeatmap"
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
    "description": "Color legend with its size range at the top left (default `true`)",
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
    "name": "interactive",
    "type": "boolean",
    "required": false,
    "description": "Zoom and pan (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "bubbles",
    "type": "boolean",
    "required": false,
    "description": "Trades as bubbles (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "bestLines",
    "type": "boolean",
    "required": false,
    "description": "Best bid / ask lines (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "profile",
    "type": "boolean",
    "required": false,
    "description": "Size profile of the current book at the right (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<OrderBookHeatmapLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<OrderBookHeatmapLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
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
    "name": "colorScale",
    "type": "OrderBookHeatmapScale",
    "required": false,
    "description": "Scale of the sizes to the colors (default `log`)",
    "typeText": "OrderBookHeatmapScale"
  },
  {
    "name": "maxSize",
    "type": "number",
    "required": false,
    "description": "Size drawn with the last color; follows the data by default",
    "typeText": "number"
  },
  {
    "name": "colors",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors from no liquidity to `maxSize` (any CSS colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "book",
    "type": "OrderBookSnapshot",
    "required": false,
    "description": "Book, applied when the object changes (stream updates through the handle's `applyDeltas`)",
    "typeText": "OrderBookSnapshot"
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
    "name": "trades",
    "type": "readonly MarketTrade[]",
    "required": false,
    "description": "Trades; when the array grows, only the appended ones are added",
    "typeText": "readonly MarketTrade[]"
  },
  {
    "name": "tickSize",
    "type": "number",
    "required": false,
    "description": "Price step of the rows; detected from the book by default",
    "typeText": "number"
  },
  {
    "name": "interval",
    "type": "number",
    "required": false,
    "description": "Duration of a column, in ms (default 100)",
    "typeText": "number"
  },
  {
    "name": "window",
    "type": "number",
    "required": false,
    "description": "Time shown, in ms (default 60000)",
    "typeText": "number"
  },
  {
    "name": "history",
    "type": "number",
    "required": false,
    "description": "Time kept for panning back, in ms (default 300000)",
    "typeText": "number"
  },
  {
    "name": "depth",
    "type": "number",
    "required": false,
    "description": "Price levels kept on each side (default 160)",
    "typeText": "number"
  },
  {
    "name": "priceSpan",
    "type": "number",
    "required": false,
    "description": "Price range shown around the mid; from `depth` by default",
    "typeText": "number"
  },
  {
    "name": "contrast",
    "type": "number",
    "required": false,
    "description": "Contrast of the colors (default 1)",
    "typeText": "number"
  },
  {
    "name": "sizeUnit",
    "type": "string",
    "required": false,
    "description": "Unit after the sizes of the legend and tooltip, e.g. \"BTC\"",
    "typeText": "string"
  },
  {
    "name": "bubbleSize",
    "type": "number",
    "required": false,
    "description": "Diameter of the largest bubble, in pixels (default 28)",
    "typeText": "number"
  },
  {
    "name": "bubbleVolume",
    "type": "number",
    "required": false,
    "description": "Trade volume of the largest bubble; follows the data by default",
    "typeText": "number"
  },
  {
    "name": "timeZone",
    "type": "ChartTimeZone",
    "required": false,
    "description": "Clock of the time axis and the tooltip: the local time or UTC, the clock of most exchanges (default `local`)",
    "typeText": "ChartTimeZone"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: OrderBookHeatmapHoverEvent | null]",
    "typeText": "[event: OrderBookHeatmapHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "OrderBookHeatmapHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "followChange",
    "type": "[follow: boolean]",
    "typeText": "[follow: boolean]",
    "parameters": [
      {
        "name": "follow",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: liquidity

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/vue/liquidity.vue

```vue
<script setup lang="ts">
// <OrderBookHeatmap>: resting size over time and price, drawn by the GPU;
// the book (handle's `setBook`, with its time) closes a column, trades
// (`addTrades`) are bubbles sized by volume. Zoom or pan to stop following.
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

const heatmap = ref<OrderBookHeatmapHandle>();
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.value?.setBook(book);
    heatmap.value?.addTrades(trade);
  }, 200);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <OrderBookHeatmap ref="heatmap" />
</template>

```

## Example: red-up

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/vue/red-up.vue

```vue
<script setup lang="ts">
// `color-convention="red-up"` (mainland China): buys in red, sells in
// green; a square-root color scale shows more of the small orders, without
// the size profile on the right.
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/vue/charts";

const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
// a side of the book around a moving mid price, generated deterministically
const side = (mid: number, sign: number, seed: number) => ({
  price: Array.from({ length: 60 }, (_, i) =>
    round(mid + sign * 0.05 * (i + 1)),
  ),
  size: Array.from({ length: 60 }, (_, i) =>
    Math.round(
      2 +
        fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 +
        (i % 13 === 12 ? 80 : 0),
    ),
  ),
});
// the book and a trade at a tick (a new tick every 200 ms)
const snapshot = (tick: number) => {
  const mid = round(100 + Math.sin(tick / 40) * 0.6);
  return {
    book: {
      bids: side(mid, -1, tick % 7),
      asks: side(mid, 1, (tick + 3) % 7),
      time: Date.now(),
    },
    trade: {
      time: Date.now(),
      price: mid,
      size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
      side: tick % 3 ? ("buy" as const) : ("sell" as const),
    },
  };
};

const heatmap = ref<OrderBookHeatmapHandle>();
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.value?.setBook(book);
    heatmap.value?.addTrades(trade);
  }, 200);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <OrderBookHeatmap
    ref="heatmap"
    color-convention="red-up"
    color-scale="sqrt"
    :profile="false"
  />
</template>

```
