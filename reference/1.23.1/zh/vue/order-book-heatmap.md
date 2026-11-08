# 订单簿热力图

Bookmap 风格的流动性热力图：按时间与价格绘制挂单量（GPU 渲染），叠加最优买卖价线、按成交量缩放的成交气泡与当前订单簿剖面，支持缩放、平移与十字准线读数。实时数据按间隔追加列并保持滑动窗口。

Package: minerva-design@1.23.1

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 如何阅读

热力图是订单簿随时间的录像：每一列是某一时刻的订单簿快照，从左到右依次排开，最右侧是现在。

横轴是时间（最新在右），纵轴是价格。悬停在任意位置，十字准线会读出该时刻、该价格的挂单量。

格子的颜色是该时刻、该价格上挂着的委托数量：暗色表示几乎没有挂单，越亮（蓝 → 青 → 黄 → 白）挂单越多。左上角的色标给出颜色对应的数量范围与单位。

水平的亮线是一直挂在订单簿里的大单（单墙）。亮线在某处结束，说明这笔挂单被撤掉或被成交：如果价格线正好走到亮线的终点，就是被吃掉了。

贴着价格走的红线和绿线是最优卖价与最优买价，两线之间是买卖价差。价格轴上实心的红、绿标签是当前最优卖价与买价，描边标签是最新成交价。

圆点是成交：绿色为主动买入（吃掉卖单），红色为主动卖出（打掉买单），面积随该列的成交量增大，大气泡就是大额成交。colorConvention="red-up" 会交换这两种颜色。

右侧的横条是当前订单簿：上方红色为卖单，下方绿色为买单，条越长挂单越多，下方刻度是数量。

#### 常见形态

支撑与阻力：价格多次碰到一条亮线后折返，说明这笔大单在承接或压制价格。

撤单（虚假挂单）：价格接近时亮线突然消失，但那里没有成交气泡，说明委托是被撤掉的，而不是被成交。

扫单：一串大气泡快速穿过多个价位，价格线跳动，沿途的挂单变暗。

流动性稀薄：价格附近大片暗色区域表示挂单很少，价格可以很快穿过。

K 线：由调用方提供真实 OHLC 数据，与热力格共用毫秒时间轴及价格坐标；缺失时段保持空缺，不从挂单快照编造 K 线。最新价线使用新成交或更新的蜡烛收盘价。

历史导航：缩放和平移会停止跟随；导航条选择已保留的时间范围，恢复跟随会回到最新行情。getView / setView 与 viewChange 使用同一视图数据。

强度筛选：intensityRange 是颜色映射之后的 0–1 显示区间；它不改变原始挂单量、提示框数值或自动颜色标尺。

数据与语义

本组件展示挂单流动性及调用方提供的成交 K 线。示例数据来自可复现的模拟撮合；真实清算热力图需要独立的清算数据，不能把挂单量直接当成清算量。

BTC/USDT 流动性热力图

渲染后端：{{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

正在跟随行情

自由视图（已缩放或平移）

跟随行情

颜色映射

对数

平方根

线性

对比度

×{{value}}

涨跌颜色

红涨绿跌

绿涨红跌

悬停列：买入 {{buys}} BTC，卖出 {{sells}} BTC

悬停在某列上查看其成交量。

行高

价格范围

{{value}} USDT

自动

适配盘口

{{time}} · {{price}} · {{size}} BTC {{side}} · 买入 {{buys}} BTC，卖出 {{sells}} BTC

{{low}} – {{high}}

（买盘）

（卖盘）

（价差内）

悬停在单元格上查看详情。

时间窗口

实时行情

清空历史

已于 {{time}} 暂停。

已于 {{time}} 恢复。

已于 {{time}} 清空历史。

显示 {{window}}，共保留 {{history}}。

BTC/USDT

最新价 {{value}}

价差 {{value}}

逐笔成交 {{value}} 笔

BTC/USDT 订单簿

BTC/USDT 逐笔成交

BTC-USD 永续合约

1 张 = {{value}} BTC

资金费率 {{rate}}

资金费率 {{rate}}，结算时间 {{time}}，剩余 {{countdown}}

张

挂单

主动买入

主动卖出

BTC-USD 永续合约流动性热力图

{{price}}：挂单 {{contracts}} 张（≈ {{notional}}）

悬停在热力图上查看挂单张数及其价值。

模拟市场

成交 K 线

每根 2 秒 K 线汇总此固定种子撮合引擎的实际成交。无成交的时间段不补线，挂单不会转换为 K 线。

可见强度范围

筛选挂单流动性的归一化颜色强度，只改变可见性，不改变盘口数量或成交量。

保留的成交历史

拖动范围滑块查看保留历史。跟随市场会恢复最新时间和自动价格居中。

流动性终端

最新成交价

买盘深度

卖盘深度

盘口失衡

最大买单墙

最大卖单墙

配色

海洋

余烬

重置视图

当前订单簿

固定种子模拟，并非外部交易所行情。六项指标、成交 K 线与盘口均来自同一撮合引擎。指标每秒刷新，盘口更新独立推送。

模拟流动性与成交 K 线

带强度筛选的模拟流动性

可导航的模拟流动性历史

模拟 BTC USDT 流动性终端

当前模拟 BTC USDT 订单簿

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
