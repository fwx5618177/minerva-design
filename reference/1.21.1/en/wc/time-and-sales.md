# Time and sales

A trade tape: newest trades on top, sliding in and flashing, large trades bold and tinted, same-millisecond sweeps merged, size filters and a pause while hovered. Typed-array rings keep 200,000 trades; only the visible rows are drawn.

Package: minerva-design@1.21.1

Renderer: wc

Locale: en

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

BTC/USDT trades

Bought {{size}} BTC at {{price}}

Sold {{size}} BTC at {{price}}

Paused while hovered: move away (or click the badge) to resume.

Hover the tape to pause it, click a row to pick a trade.

Large trade threshold

≥ {{value}} BTC

Minimum size

All

Merge same-millisecond sweeps

Color prices by tick

{{value}} rows kept

Color convention

Red up, green down

Green up, red down

Add {{value}} trades

{{rows}} trades, last batch in {{ms}} ms

Rolling window

Last {{value}}

VWAP

Bought share

Bought

Sold

{{value}} BTC

Trades / s

Largest print

Buy {{size}} at {{price}}

Sell {{size}} at {{price}}

Buyers are lifting the offer.

Sellers are hitting the bid.

Buy and sell flow are balanced.

Waiting for trades…

Time zone

Local

UTC

New York

Tokyo

Time ({{zone}})

Blocks ≥ {{value}} BTC

Clear

{{value}} blocks since the start

Waiting for a block trade…

Buy

Sell

{{time}} · {{size}} BTC at {{price}} ≈ {{notional}}

{{value}} prints

{{count}} trades · {{size}} BTC

Buys

Sells

BTC/USDT buy trades

BTC/USDT sell trades

Net flow: {{value}} BTC (bought − sold)

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

## Example: Aggregated tape, large trades

2,000 trades, consecutive ones of the same side and price merged, small ones hidden; click a row.

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

## Example: Live tape

A trade every 250 ms on top of the tape, large trades highlighted; hovering pauses it and counts the new trades.

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
