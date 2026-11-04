# 订单簿

Canvas 绘制的价格阶梯：卖单在价差行上方、买单在下方，带深度条、价格合并、变动档位闪烁、大单高亮与悬停累计汇总。每秒数百次更新也只需每帧绘制一次。

Package: minerva-design@1.20.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/order-book",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "lastPrice",
    "typeText": "number | null | undefined",
    "attribute": "last-price",
    "required": false
  },
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
    "description": "A row is hovered; detail: { side, index, price, size, sum, notional, average }, `null` when the pointer left"
  },
  {
    "name": "minerva-level-click",
    "typeText": "CustomEvent",
    "description": "A row was clicked, tapped or activated with Enter; detail: { side, index, price, size, sum, notional, average }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 订单簿档位

卖单在价差行上方，买单在下方，并突出显示大额挂单；点击一行可查看价格和数量。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/wc/ladder.html

```html
<div style="display: grid; gap: 8px">
  <minerva-order-book
    id="ladder"
    last-price="100.02"
    height="380"
  ></minerva-order-book>
  <output id="level" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/order-book/wc/ladder.ts

```tsx
// <minerva-order-book>: asks above the spread row, bids below, depth bars
// and a large order highlight; minerva-level-click reports the clicked row
// (e.g. to fill a price in an order form).
import type {
  MinervaOrderBook,
  OrderBookLevelEvent,
} from "minerva-design/web-components/order-book";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ladder = root.querySelector<MinervaOrderBook>("#ladder")!;
  const level = root.querySelector<HTMLOutputElement>("#level")!;
  ladder.book = { bids: side(-1, 1), asks: side(1, 2) };
  ladder.options = { largeOrderThreshold: 50 };
  level.textContent = text.hint;
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<OrderBookLevelEvent>).detail;
    level.textContent = `${text.price} ${row.price} · ${text.size} ${row.size}`;
  };
  ladder.addEventListener("minerva-level-click", onClick);
  return () => ladder.removeEventListener("minerva-level-click", onClick);
}

```

## Example: 实时档位

推送的更新会闪烁变化的数量，最新价移动价差行；档位按 0.1 合并。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/wc/live.html

```html
<minerva-order-book id="live" height="380"></minerva-order-book>

```

### apps/docs/src/docs/pages/order-book/wc/live.ts

```tsx
// A live ladder: `applyDeltas` changes levels (the changed sizes flash),
// `setLastPrice` moves the spread row (colored by its last move); levels
// grouped by 0.1 (`grouping`).
import type { MinervaOrderBook } from "minerva-design/web-components/order-book";

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
  const ladder = root.querySelector<MinervaOrderBook>("#live")!;
  ladder.book = { bids: side(-1, 3), asks: side(1, 4) };
  ladder.options = { grouping: 0.1, columns: ["price", "size", "total"] };
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    ladder.applyDeltas(delta(tick));
    ladder.setLastPrice(round(100 + Math.sin(tick / 5) / 20));
  }, 400);
  return () => window.clearInterval(timer);
}

```
