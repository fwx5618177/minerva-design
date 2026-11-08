# Order book heatmap

Bookmap-style liquidity heatmap: resting size by time and price drawn by the GPU, best bid and ask lines, trades as bubbles sized by volume, a profile of the current book, zoom, pan and a crosshair readout. Streams append one column per interval in a sliding window.

Package: minerva-design@1.23.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Candles: supply actual OHLC bars on the same millisecond time and price axes. Missing periods remain empty; book snapshots are never used to invent executions. The last-price line uses the newest supplied trade or newer candle close.

History navigation: zooming and panning stop following. Select a retained time range in the navigator; reset restores the current market. getView / setView and viewChange share one viewport model.

Intensity filtering: intensityRange selects a 0–1 interval after color mapping. It does not change raw resting sizes, tooltip values or the automatic reference scale.

Data semantics

This component displays resting liquidity and supplied execution candles. Examples use reproducible simulated matching. A liquidation heatmap requires its own liquidation data; resting order size is not liquidation size.

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

SIMULATED MARKET

Execution candles

Each 2-second candle aggregates actual executions from this seeded matching engine. Empty buckets are omitted; resting orders never become candles.

Visible intensity range

Filter the normalized color intensity of resting liquidity. This changes visibility, not book sizes or executed volume.

Retained execution history

Move the range handles to inspect retained history. Follow the market restores the latest time and automatic price centering.

LIQUIDITY TERMINAL

Latest execution

Bid depth

Ask depth

Book imbalance

Largest bid wall

Largest ask wall

Palette

Ocean

Ember

Reset view

CURRENT ORDER BOOK

Seeded simulation, not an external exchange feed. All six metrics, execution candles and the ladder use the same matching engine. Summary metrics refresh once per second; book updates stream independently.

Simulated liquidity with execution candles

Simulated liquidity with intensity filter

Navigable simulated liquidity history

Simulated BTC USDT liquidity terminal

Current simulated BTC USDT order book

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
    "name": "bars",
    "typeText": "TradingBarsInput | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
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
  },
  {
    "name": "viewChange",
    "typeText": "OrderBookHeatmapViewData",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Candles and history navigation

Actual executions become OHLC candles over resting liquidity. Select retained history, then restore market following.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, viewChild, effect, untracked } from '@angular/core';
import { MnOrderBookHeatmap, MnButton, MnSlider, injectMinerva } from 'minerva-design/angular';
import { MarketTrade, OrderBookSnapshot, TradingBar } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap, MnButton, MnSlider],
  template: `
@let t = labels[language()];
<div style="display:grid;gap:12px;width:100%">
<p>{{t.source}}</p>
<div style="display:flex;gap:8px;flex-wrap:wrap">
<button mnButton size="small" variant="outline" (click)="show(10)">{{t.latest}}</button>
<button mnButton size="small" variant="outline" (click)="show(30)">{{t.full}}</button>
<button mnButton size="small" (click)="heatmap.resetView()">{{t.follow}}</button>
</div>
<mn-slider [attr.aria-label]="t.minimum" [value]="minimum" (valueChange)="filter($event)" [min]="0" [max]="90" [step]="5" showValue style="max-width:320px"/>
<mn-order-book-heatmap #heatmap [height]="400" [options]="{ interval:250, window:30000, history:60000, maxBars:30, maxColumns:240, intensityRange:[minimum / 100, 1] }" (viewChange)="viewState = $event"/>
<output aria-live="polite">{{viewState?.view?.follow ? t.following : t.manual}} · {{t.minimum}} {{minimum}}% · {{viewState ? ((viewState.view.time[1] - viewState.view.time[0]) / 1000).toFixed(0) : 30}} {{t.visible}}</output>
</div>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  minimum = 0;
  labels = {
  "en": {
    "source": "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    "latest": "Latest 10s",
    "full": "Full 30s",
    "follow": "Follow market",
    "following": "Following market",
    "manual": "Manual view",
    "minimum": "Minimum liquidity intensity (%)",
    "visible": "s visible"
  },
  "zh": {
    "source": "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    "latest": "最近 10 秒",
    "full": "完整 30 秒",
    "follow": "跟随行情",
    "following": "正在跟随行情",
    "manual": "手动视图",
    "minimum": "最低流动性强度（%）",
    "visible": "秒可见"
  },
  "ja": {
    "source": "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    "latest": "直近 10 秒",
    "full": "全 30 秒",
    "follow": "相場に追従",
    "following": "相場に追従中",
    "manual": "手動表示",
    "minimum": "流動性強度の下限（%）",
    "visible": "秒を表示"
  },
  "fr": {
    "source": "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    "latest": "10 dernières s",
    "full": "30 s complètes",
    "follow": "Suivre le marché",
    "following": "Suivi du marché",
    "manual": "Vue manuelle",
    "minimum": "Intensité minimale de liquidité (%)",
    "visible": "s visibles"
  }
};
  viewState = null as import("minerva-design/charts/core").OrderBookHeatmapViewData | null;
  filter = (value: number | [number, number]) => { this.minimum = typeof value === 'number' ? value : value[0]; };
  chart = viewChild<import('minerva-design/angular').MnOrderBookHeatmap>('heatmap');
  history = (() => {
  const end = Math.floor(Date.now() / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12);
    const size = 1 + (i * 7 % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) => Array.from({ length: 36 }, (_, level) =>
      [round(price + sign * (level + 1) * 0.05), 2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0)] as [number, number]);
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0) bars.push({ time: start + bucket * 1000, open: price, high: price, low: price, close: price, volume: size });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price); bar.low = Math.min(bar.low, price);
      bar.close = price; bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
})();
  show = (seconds: number) => this.chart()?.setView({ time: [this.history.end - seconds * 1000, this.history.end], price: [98, 102] });
  initialize = effect(() => {
  const heatmap = this.chart();
  if (!heatmap?.instance()) return;
  // instance is a public readiness signal; the engine is created after render.
  untracked(() => {
    for (const book of this.history.books) heatmap.setBook(book);
    heatmap.addTrades(this.history.trades);
    heatmap.setBars(this.history.bars);
    this.show(30);
  });
});
}

```

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
