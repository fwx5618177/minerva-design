# 逐笔成交

逐笔成交列表：最新成交位于顶部并滑入、闪烁，大额成交加粗着色，同一毫秒的扫单可合并，可按数量过滤，悬停时暂停。基于类型化数组的环形缓冲区保存 20 万笔成交，只绘制可见的行。

Package: minerva-design@1.22.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/time-and-sales",
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
    "typeText": "TimeAndSalesOptions | undefined",
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
    "description": "A row is hovered; detail: { trade, count, index }, `null` when the pointer left"
  },
  {
    "name": "minerva-trade-click",
    "typeText": "CustomEvent",
    "description": "A row was clicked, tapped or activated with Enter; detail: { trade, count, index }"
  },
  {
    "name": "minerva-pause",
    "typeText": "CustomEvent",
    "description": "The tape paused (pointer over it, scrolled down) or resumed; detail: { paused }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 合并成交、大单

2,000 笔成交，同方向同价格的连续成交被合并，小额成交被隐藏；可点击某一行。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/wc/large-trades.html

```html
<div style="display: grid; gap: 8px">
  <minerva-time-and-sales id="trades" height="300"></minerva-time-and-sales>
  <output id="trade" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/time-and-sales/wc/large-trades.ts

```tsx
// 2,000 trades, virtualized: consecutive trades of the same side and price
// are merged (`aggregate`), small ones hidden (`minSize`), large ones
// highlighted; minerva-trade-click reports the clicked row.
import type {
  MinervaTimeAndSales,
  TimeAndSalesRowEvent,
} from "minerva-design/web-components/order-book";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const tape = root.querySelector<MinervaTimeAndSales>("#trades")!;
  const output = root.querySelector<HTMLOutputElement>("#trade")!;
  tape.trades = Array.from({ length: 2000 }, (_, i) => trade(i));
  tape.options = {
    aggregate: true,
    minSize: 2,
    largeTradeThreshold: 25,
    columns: ["time", "side", "price", "size"],
  };
  output.textContent = text.hint;
  const onClick = (event: Event) => {
    const row = (event as CustomEvent<TimeAndSalesRowEvent>).detail;
    output.textContent = `${row.trade.price} × ${row.trade.size} ${text.size} (${row.count})`;
  };
  tape.addEventListener("minerva-trade-click", onClick);
  return () => tape.removeEventListener("minerva-trade-click", onClick);
}

```

## Example: 实时成交明细

每 250 毫秒一笔成交出现在顶部，大单突出显示；悬停时暂停并统计新成交数。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/wc/tape.html

```html
<minerva-time-and-sales id="tape" height="320"></minerva-time-and-sales>

```

### apps/docs/src/docs/pages/time-and-sales/wc/tape.ts

```tsx
// <minerva-time-and-sales>: the newest trade on top (`addTrades`), large
// trades highlighted; hovering pauses the tape, new trades are counted.
import type { MinervaTimeAndSales } from "minerva-design/web-components/order-book";

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

export function setup(root: HTMLElement) {
  const tape = root.querySelector<MinervaTimeAndSales>("#tape")!;
  tape.trades = Array.from({ length: 40 }, (_, i) => trade(i));
  tape.options = { largeTradeThreshold: 20 };
  let tick = 40;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    tape.addTrades(trade(tick));
  }, 250);
  return () => window.clearInterval(timer);
}

```
