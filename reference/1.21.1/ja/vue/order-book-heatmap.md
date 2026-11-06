# 板ヒートマップ

Bookmap 風の流動性ヒートマップ：時間と価格ごとの指値量を GPU で描画し、最良気配ライン、出来高に応じた約定バブル、現在の板のプロファイルを重ねます。ズーム・パン・十字カーソルでの読み取りに対応。ストリームは間隔ごとに列を追加し、スライドするウィンドウで表示します。

Package: minerva-design@1.21.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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

ローソク足：実際の OHLC データを、同じミリ秒時刻軸と価格軸に渡します。欠損区間は空白を保ち、注文板から架空の約定を生成しません。最新価格線は新しい約定または新しい足の終値を使います。

履歴ナビゲーション：ズーム・パンで追従を停止します。保持された時間範囲をナビゲーターで選び、リセットで最新市場に戻ります。getView / setView と viewChange は同じビューポートを共有します。

強度フィルター：intensityRange は色変換後の 0–1 表示区間です。元の指値量、ツールチップの値、自動色基準は変わりません。

データの意味

このコンポーネントは指値流動性と提供された約定 OHLC を表示します。例は再現可能な模擬マッチングです。清算ヒートマップには独立した清算データが必要で、指値量を清算量とはみなしません。

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

シミュレーション市場

約定ローソク足

2秒足は固定シードのマッチングエンジンの約定を集計します。約定のない期間は補完せず、指値注文を足に変換しません。

表示する強度範囲

板の流動性の正規化された色強度を絞り込みます。表示だけが変わり、注文数量や約定量は変わりません。

保持した約定履歴

範囲ハンドルで保持した履歴を確認できます。市場に追従すると最新時刻と価格の自動中央表示に戻ります。

流動性ターミナル

最新約定価格

買い板の厚さ

売り板の厚さ

板の偏り

最大買い注文

最大売り注文

パレット

オーシャン

エンバー

表示をリセット

現在の注文板

固定シードのシミュレーションであり、外部取引所の配信ではありません。6つの指標、約定足、板は同じマッチングエンジンを使用します。指標は毎秒更新し、板は独立して更新します。

約定足付きの模擬流動性

強度フィルター付きの模擬流動性

操作可能な模擬流動性履歴

模擬 BTC USDT 流動性ターミナル

現在の模擬 BTC USDT 注文板

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
    "name": "candles",
    "type": "boolean",
    "required": false,
    "description": "Candle overlay (default true when bars are supplied)",
    "typeText": "boolean"
  },
  {
    "name": "lastPriceLine",
    "type": "boolean",
    "required": false,
    "description": "Last close price line (default true)",
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
    "name": "bars",
    "type": "TradingBarsInput",
    "required": false,
    "description": "Candle history; property only, applied through setBars",
    "typeText": "TradingBarsInput"
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
    "name": "intensityRange",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Normalized liquidity intensity bounds, 0..1",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "maxColumns",
    "type": "number",
    "required": false,
    "description": "Maximum retained columns (default 6000)",
    "typeText": "number"
  },
  {
    "name": "maxBars",
    "type": "number",
    "required": false,
    "description": "Maximum retained candles (default 20000)",
    "typeText": "number"
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
  },
  {
    "name": "viewChange",
    "type": "[data: OrderBookHeatmapViewData]",
    "typeText": "[data: OrderBookHeatmapViewData]",
    "parameters": [
      {
        "name": "data",
        "position": 0,
        "typeText": "OrderBookHeatmapViewData",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: candles-navigation

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/vue/candles-navigation.vue

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Button, Slider, useI18n, type SliderValue } from "minerva-design/vue";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapViewData,
} from "minerva-design/vue/charts";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

const { language } = useI18n();
const text = computed(() => getFrameworkLabels(language.value));
const history = createFrameworkHistory();
const heatmap = ref<OrderBookHeatmapHandle>();
const minimum = ref<SliderValue>(0);
const intensity = computed<readonly [number, number]>(() => [
  Number(minimum.value) / 100,
  1,
]);
const view = ref<OrderBookHeatmapViewData | null>(null);
function show(seconds: number) {
  heatmap.value?.setView({
    time: [history.end - seconds * 1000, history.end],
    price: [98, 102],
  });
}
onMounted(() => {
  for (const book of history.books) heatmap.value?.setBook(book);
  heatmap.value?.addTrades(history.trades);
  heatmap.value?.setBars(history.bars);
  show(30);
});
</script>

<template>
  <div style="display: grid; gap: 12px; width: 100%">
    <p>{{ text.source }}</p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Button size="small" variant="outline" @click="show(10)">{{
        text.latest
      }}</Button>
      <Button size="small" variant="outline" @click="show(30)">{{
        text.full
      }}</Button>
      <Button size="small" @click="heatmap?.resetView()">{{
        text.follow
      }}</Button>
    </div>
    <Slider
      v-model="minimum"
      :aria-label="text.minimum"
      :min="0"
      :max="90"
      :step="5"
      show-value
      style="max-width: 320px"
    />
    <OrderBookHeatmap
      ref="heatmap"
      :height="400"
      :interval="250"
      :window="30000"
      :history="60000"
      :intensity-range="intensity"
      :max-bars="30"
      :max-columns="240"
      @view-change="view = $event"
    />
    <output aria-live="polite"
      >{{ view?.view.follow ? text.following : text.manual }} ·
      {{ text.minimum }} {{ minimum }}% ·
      {{
        view ? Math.round((view.view.time[1] - view.view.time[0]) / 1000) : 30
      }}
      {{ text.visible }}</output
    >
  </div>
</template>

```

### apps/docs/src/docs/pages/order-book-heatmap/framework-history.ts

```tsx
import type {
  MarketTrade,
  OrderBookSnapshot,
  TradingBar,
} from "minerva-design/charts/core";

/** Finite simulated books and executions; candles are explicitly supplied from executions. */
export function createFrameworkHistory(now = Date.now()) {
  const end = Math.floor(now / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(
      100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12,
    );
    const size = 1 + ((i * 7) % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) =>
      Array.from(
        { length: 36 },
        (_, level) =>
          [
            round(price + sign * (level + 1) * 0.05),
            2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0),
          ] as [number, number],
      );
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0)
      bars.push({
        time: start + bucket * 1000,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: size,
      });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price);
      bar.low = Math.min(bar.low, price);
      bar.close = price;
      bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
}

/** UI copy shared by the native framework examples, keyed by configured language. */
export const frameworkHeatmapLabels = {
  en: {
    source:
      "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    latest: "Latest 10s",
    full: "Full 30s",
    follow: "Follow market",
    following: "Following market",
    manual: "Manual view",
    minimum: "Minimum liquidity intensity (%)",
    visible: "s visible",
  },
  zh: {
    source: "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    latest: "最近 10 秒",
    full: "完整 30 秒",
    follow: "跟随行情",
    following: "正在跟随行情",
    manual: "手动视图",
    minimum: "最低流动性强度（%）",
    visible: "秒可见",
  },
  ja: {
    source:
      "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    latest: "直近 10 秒",
    full: "全 30 秒",
    follow: "相場に追従",
    following: "相場に追従中",
    manual: "手動表示",
    minimum: "流動性強度の下限（%）",
    visible: "秒を表示",
  },
  fr: {
    source:
      "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    latest: "10 dernières s",
    full: "30 s complètes",
    follow: "Suivre le marché",
    following: "Suivi du marché",
    manual: "Vue manuelle",
    minimum: "Intensité minimale de liquidité (%)",
    visible: "s visibles",
  },
};

export function getFrameworkLabels(locale: string) {
  const language = locale
    .toLowerCase()
    .split(/[-_]/)[0] as keyof typeof frameworkHeatmapLabels;
  return frameworkHeatmapLabels[language] ?? frameworkHeatmapLabels.en;
}

```

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
