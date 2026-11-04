# Order book heatmap

Bookmap-style liquidity heatmap: resting size by time and price drawn by the GPU, best bid and ask lines, trades as bubbles sized by volume, a profile of the current book, zoom, pan and a crosshair readout. Streams append one column per interval in a sliding window.

Package: minerva-design@1.20.3

Renderer: angular

Locale: en

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

### How to read it

The heatmap is a recording of the order book: every column is a snapshot of the book at one moment, laid out from left to right, with now at the right edge.

The horizontal axis is time (newest on the right), the vertical axis is price. Hover anywhere: the crosshair reads the resting size at that price and time.

The color of a cell is the size resting at that price at that time: dark means almost nothing, brighter colors (blue → cyan → yellow → white) mean more. The legend at the top left gives the size range and unit of the colors.

Bright horizontal lines are large orders that stay in the book (walls). Where a line ends, the order was pulled or filled: if the price line reaches the end of the wall, it was filled.

The red and green lines that follow the price are the best ask and the best bid, the gap between them is the spread. On the price axis the filled red and green tags are the current best ask and bid, the outlined tag is the last trade.

Dots are trades: green for aggressive buys (lifting asks), red for aggressive sells (hitting bids), their area grows with the volume traded during the column, so large bubbles are large trades. colorConvention="red-up" swaps the two colors.

The bars on the right are the current book: asks in red above, bids in green below, longer bars mean more size; the scale below them is the size.

#### What to look for

Support and resistance: the price touches a bright line several times and turns back, the large order absorbs it.

Pulled orders (spoofing): a bright line disappears as the price comes close without any trade bubble there, the order was cancelled, not filled.

Sweeps: a burst of large bubbles crosses several prices, the price line jumps and the liquidity on its way goes dark.

Thin liquidity: a large dark area near the price means few resting orders, the price can move through it quickly.

BTC/USDT liquidity heatmap

Renderer: {{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

Following the market

Free view (zoomed or panned)

Follow the market

Color scale

Logarithmic

Square root

Linear

Contrast

×{{value}}

Color convention

Red up, green down

Green up, red down

Hovered column: {{buys}} BTC bought, {{sells}} BTC sold

Hover a column to read its traded volume.

Row height

Price span

{{value}} USDT

Auto

Fit the book

{{time}} · {{price}} · {{size}} BTC {{side}} · {{buys}} BTC bought, {{sells}} BTC sold

{{low}} – {{high}}

on the bid side

on the ask side

inside the spread

Hover a cell to inspect it.

Time window

Live feed

Clear history

Paused at {{time}}.

Resumed at {{time}}.

History cleared at {{time}}.

{{window}} on screen out of {{history}} kept.

BTC/USDT

Last {{value}}

Spread {{value}}

{{value}} trades on the tape

BTC/USDT order book

BTC/USDT trades

BTC-USD perpetual

1 contract = {{value}} BTC

Funding {{rate}}

Funding {{rate}} at {{time}}, in {{countdown}}

contracts

Resting

Taker buys

Taker sells

BTC-USD perpetual liquidity heatmap

{{price}}: {{contracts}} contracts resting (≈ {{notional}})

Hover the heatmap to read the resting contracts and their value.

## OrderBookHeatmap

Support: beta

Native Angular: MnOrderBookHeatmap. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnOrderBookHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "trades",
    "typeText": "readonly MarketTrade[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "book",
    "typeText": "OrderBookSnapshot | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "options",
    "typeText": "O | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "OrderBookHeatmapHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookHeatmapHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "followChange",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Live liquidity heatmap

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```

## Example: Red up, green down

colorConvention="red-up": red buy bubbles and best bid line, green sells and best ask line.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" [options]="{ colorConvention: 'red-up', colorScale: 'sqrt', profile: false }" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```
