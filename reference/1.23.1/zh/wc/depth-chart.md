# 深度图

订单簿的累计深度：围绕中间价的阶梯状买卖面积，悬停时镜像显示两侧的数量、成交额与均价，可围绕中间价缩放，每秒数百次增量更新也能平滑过渡。

Package: minerva-design@1.23.1

Renderer: wc

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

BTC/USDT 订单簿深度

实时推送

可见范围

自适应

±{{value}}

累计方式

数量 (BTC)

金额 (USDT)

曲线

阶梯

直线

Ctrl/⌘ + 滚轮或双指捏合围绕中间价缩放，双击复位。

已缩放至 {{value}}

我的买单

我的卖单

强平价

涨跌颜色

红涨绿跌

绿涨红跌

买入 {{amount}} BTC（{{total}}）将吃掉直到 {{price}} 的卖单，高于中间价 {{slippage}}，成交均价 {{average}}。

卖出 {{amount}} BTC（{{total}}）将吃掉直到 {{price}} 的买单，低于中间价 {{slippage}}，成交均价 {{average}}。

悬停在曲线上，估算一笔市价单的成本。

方向

市价买入

市价卖出

下单数量

{{value}} BTC

成交均价

最后成交

{{size}} BTC 将吃掉 {{levels}} 档：均价 {{average}}，最后一档 {{worst}}，合计 {{cost}}，偏离中间价 {{slippage}} 个基点。

这一侧只有 {{filled}} BTC（需要 {{size}} BTC）：订单会吃光全部 {{levels}} 档，直到 {{worst}}。

统计区间

{{band}} 内：买盘 {{bids}} BTC，卖盘 {{asks}} BTC，失衡 {{imbalance}} · 价差 {{spread}}（{{spreadBp}} 个基点）

等待第一次读数…

累计美元金额（价格 × 股数）

金额（美元）

股数

ACME 股票订单簿深度

合并

交易所 {{name}}

交易所

最优买价

最优卖价

±0.1% 内 BTC

{{value}}（{{share}}）

BTC/USDT 深度，{{name}}

各交易所最优价与流动性

## DepthChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/depth-chart",
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
    "description": "The pointer moved over the curves; detail: { side, price, amount, total, average, distance, mirror }, `null` when it left"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "The curves were clicked or tapped; detail: { side, price, amount, total, average, distance, mirror }"
  },
  {
    "name": "minerva-range-change",
    "typeText": "CustomEvent",
    "description": "The visible range changed by zooming; detail: { range } (fraction of the mid)"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 累计深度

买单和卖单围绕中间价累计；悬停时显示价格和累计数量。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/depth-chart/wc/book.html

```html
<div style="display: grid; gap: 8px">
  <minerva-depth-chart id="depth"></minerva-depth-chart>
  <output id="readout" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/depth-chart/wc/book.ts

```tsx
// <minerva-depth-chart>: the cumulative bids and asks of a book (`book`,
// levels as `[price, size]` pairs or columns); minerva-hover reports the
// hovered price and the cumulative amount.
import type {
  DepthChartHoverEvent,
  MinervaDepthChart,
} from "minerva-design/web-components/order-book";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaDepthChart>("#depth")!;
  const readout = root.querySelector<HTMLOutputElement>("#readout")!;
  chart.book = { bids: side(-1, 1), asks: side(1, 2) };
  readout.textContent = text.hint;
  const onHover = (event: Event) => {
    const point = (event as CustomEvent<DepthChartHoverEvent | null>).detail;
    readout.textContent = point
      ? `${text.price} ${point.price} · ${text.total} ${point.amount}`
      : text.hint;
  };
  chart.addEventListener("minerva-hover", onHover);
  return () => chart.removeEventListener("minerva-hover", onHover);
}

```

## Example: 实时订单簿

每次更新少数几个档位（applyDeltas），每帧绘制一次并带平滑过渡。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/depth-chart/wc/live.html

```html
<minerva-depth-chart id="live" height="280"></minerva-depth-chart>

```

### apps/docs/src/docs/pages/depth-chart/wc/live.ts

```tsx
// Streaming updates: `applyDeltas` changes a few levels (drawn once per
// frame, eased); the book is not passed again.
import type { MinervaDepthChart } from "minerva-design/web-components/order-book";

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

export function setup(root: HTMLElement) {
  const chart = root.querySelector<MinervaDepthChart>("#live")!;
  chart.book = { bids: side(-1, 3), asks: side(1, 4) };
  chart.options = { range: 0.012 };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    chart.applyDeltas(delta(tick));
  }, 400);
  return () => window.clearInterval(timer);
}

```
