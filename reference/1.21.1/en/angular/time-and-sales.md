# Time and sales

A trade tape: newest trades on top, sliding in and flashing, large trades bold and tinted, same-millisecond sweeps merged, size filters and a pause while hovered. Typed-array rings keep 200,000 trades; only the visible rows are drawn.

Package: minerva-design@1.21.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
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

Support: beta

Native Angular: MnTimeAndSales. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTimeAndSales"
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
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "options",
    "typeText": "TimeAndSalesOptions | undefined",
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
    "typeText": "TimeAndSalesRowEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "tradeClick",
    "typeText": "TimeAndSalesRowEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TimeAndSalesRowEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pause",
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

## Example: Live tape

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnTimeAndSales } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimeAndSales],
  template: `
<mn-time-and-sales [trades]="trades()" [options]="{ largeTradeThreshold: 20 }" [height]="320" />
  `,
})
export class Example {
  trades = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick: number) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side: fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45 ? ("buy" as const) : ("sell" as const),
  });
  const trades = signal(Array.from({ length: 40 }, (_, i) => trade(i)));
  const timer = setInterval(() => {
    trades.update((list) => [...list, trade(list.length)]);
  }, 250);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return trades;
})();
}

```

## Example: Large trades

Trades reaching largeTradeThreshold are bold and tinted, more strongly up to 8 times the threshold. aggregate merges one aggressive order sweeping several levels (same side, same millisecond) into one row: sizes summed, the last price and the count of prints.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTimeAndSales, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTimeAndSales],
  template: `
@let t = labels[language()];
<mn-time-and-sales
  [trades]="trades"
  [options]="{ aggregate: true, minSize: 2, largeTradeThreshold: 25, columns: ['time', 'side', 'price', 'size'] }"
  [height]="300"
  (tradeClick)="clicked = $event.trade.price + ' × ' + $event.trade.size + ' ' + t.size + ' (' + $event.count + ')'"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  clicked = "";
  trades = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // the trade of a tick: around 100, mostly small, sometimes large
  const trade = (tick: number) => ({
    time: Date.UTC(2026, 9, 30, 9, 30) + tick * 250,
    price: round(100 + Math.sin(tick / 30) / 4 + fraction(Math.sin(tick * 3.3) * 999) / 20),
    size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) ** 4 * 40),
    side: fraction(Math.sin(tick * 4.7) * 43758.5453) > 0.45 ? ("buy" as const) : ("sell" as const),
  });
  return Array.from({ length: 2000 }, (_, i) => trade(i));
})();
  labels = {
  "en": {
    "hint": "Click a trade",
    "size": "lots"
  },
  "zh": {
    "hint": "点击一笔成交",
    "size": "手"
  },
  "ja": {
    "hint": "約定をクリックします",
    "size": "ロット"
  },
  "fr": {
    "hint": "Cliquez sur une transaction",
    "size": "lots"
  }
};
}

```
