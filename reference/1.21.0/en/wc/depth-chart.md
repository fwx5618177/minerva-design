# Depth chart

Cumulative depth of an order book: stepped bid and ask areas around the mid price, a mirrored hover readout of amount, cost and average price, zoom around the mid and eased updates at hundreds of deltas per second.

Package: minerva-design@1.21.0

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT order book depth

Live stream

Visible range

Fit

±{{value}}

Cumulate

Size (BTC)

Notional (USDT)

Curve

Steps

Linear

Ctrl/⌘ + wheel or pinch to zoom around the mid, double click to reset.

Zoomed to {{value}}

My bid

My ask

Liquidation

Color convention

Red up, green down

Green up, red down

Buying {{amount}} BTC ({{total}}) sweeps the asks up to {{price}}, {{slippage}} above the mid: average price {{average}}.

Selling {{amount}} BTC ({{total}}) sweeps the bids down to {{price}}, {{slippage}} below the mid: average price {{average}}.

Hover the curves to price a market order.

Side

Market buy

Market sell

Order size

{{value}} BTC

Avg. fill

Last fill

{{size}} BTC fill across {{levels}} levels: average {{average}}, last fill {{worst}}, {{cost}} in total, {{slippage}} bp from the mid.

Only {{filled}} of {{size}} BTC rest on this side: the order would empty all {{levels}} levels, out to {{worst}}.

Measured band

Within {{band}}: {{bids}} BTC bid, {{asks}} BTC offered, imbalance {{imbalance}} · spread {{spread}} ({{spreadBp}} bp)

Waiting for the first reading…

Cumulate dollars (price × shares)

Notional (USD)

Shares

ACME stock order book depth

Consolidated

Venue {{name}}

Venue

Best bid

Best ask

BTC within ±0.1%

{{value}} ({{share}})

BTC/USDT depth, {{name}}

Best prices and liquidity by venue

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

## Example: Cumulative depth

Bids and asks accumulated around the mid price; hovering reports the price and the cumulative amount.

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

## Example: Live book

Updates of a few levels at a time (applyDeltas), drawn once per frame with eased transitions.

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
