# 订单簿热力图

Bookmap 风格的流动性热力图：按时间与价格绘制挂单量（GPU 渲染），叠加最优买卖价线、按成交量缩放的成交气泡与当前订单簿剖面，支持缩放、平移与十字准线读数。实时数据按间隔追加列并保持滑动窗口。

Package: minerva-design@1.20.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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
