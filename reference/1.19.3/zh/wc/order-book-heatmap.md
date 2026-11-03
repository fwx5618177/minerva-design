# 订单簿热力图

Bookmap 风格的流动性热力图：按时间与价格绘制挂单量（GPU 渲染），叠加最优买卖价线、按成交量缩放的成交气泡与当前订单簿剖面，支持缩放、平移与十字准线读数。实时数据按间隔追加列并保持滑动窗口。

Package: minerva-design@1.19.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/order-book-heatmap",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "trades",
    "typeText": "Trades | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "O | undefined",
    "required": false
  },
  {
    "name": "book",
    "typeText": "OrderBookSnapshot | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "A cell is hovered; detail: { time, price, size, side, buyVolume, sellVolume }, `null` when the pointer left"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  },
  {
    "name": "minerva-follow-change",
    "typeText": "CustomEvent",
    "description": "The view follows the market (`true`) or not after a zoom / pan (`false`); detail: { follow }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 实时流动性热力图

每 200 毫秒一个新的订单簿，生成一列挂单量；成交以按成交量缩放的气泡显示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/wc/liquidity.html

```html
<minerva-order-book-heatmap id="heatmap"></minerva-order-book-heatmap>

```

### apps/docs/src/docs/pages/order-book-heatmap/wc/liquidity.ts

```tsx
// <minerva-order-book-heatmap>: resting size over time and price, drawn by
// the GPU; the book (`setBook`, with its time) closes a column, trades
// (`addTrades`) are bubbles sized by volume. Zoom or pan to stop following.
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

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

export function setup(root: HTMLElement) {
  const heatmap = root.querySelector<MinervaOrderBookHeatmap>("#heatmap")!;
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.setBook(book);
    heatmap.addTrades(trade);
  }, 200);
  return () => window.clearInterval(timer);
}

```

## Example: 红涨绿跌配色、平方根刻度

中国大陆的配色习惯（买入为红色），平方根颜色刻度，并隐藏右侧的挂单分布。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/wc/red-up.html

```html
<minerva-order-book-heatmap id="heatmap"></minerva-order-book-heatmap>

```

### apps/docs/src/docs/pages/order-book-heatmap/wc/red-up.ts

```tsx
// `colorConvention: "red-up"` (mainland China): buys in red, sells in
// green; a square-root color scale shows more of the small orders, without
// the size profile on the right.
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";

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

export function setup(root: HTMLElement) {
  const heatmap = root.querySelector<MinervaOrderBookHeatmap>("#heatmap")!;
  heatmap.options = {
    colorConvention: "red-up",
    colorScale: "sqrt",
    profile: false,
  };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    heatmap.setBook(book);
    heatmap.addTrades(trade);
  }, 200);
  return () => window.clearInterval(timer);
}

```
