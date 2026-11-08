# Order book heatmap

Bookmap-style liquidity heatmap: resting size by time and price drawn by the GPU, best bid and ask lines, trades as bubbles sized by volume, a profile of the current book, zoom, pan and a crosshair readout. Streams append one column per interval in a sliding window.

Package: minerva-design@1.23.1

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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
    "name": "bars",
    "typeText": "TradingBarsInput | undefined",
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
    "name": "minerva-view-change",
    "typeText": "CustomEvent",
    "description": "Available history or viewport changed"
  },
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

## Example: Supplied candles and history navigation

Filter simulated liquidity and navigate history alongside 30 supplied OHLC candles aggregated from simulated executions.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/wc/candles-navigation.html

```html
<div style="display: grid; gap: 12px; width: 100%">
  <p id="source"></p>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <minerva-button id="latest" size="small" variant="outline"
      >Latest 10s</minerva-button
    >
    <minerva-button id="full" size="small" variant="outline"
      >Full 30s</minerva-button
    >
    <minerva-button id="follow" size="small"></minerva-button>
  </div>
  <minerva-slider
    id="intensity"
    aria-label=""
    min="0"
    max="90"
    step="5"
    value="0"
    show-value
    style="max-width: 320px"
  ></minerva-slider>
  <minerva-order-book-heatmap
    id="heatmap"
    height="400"
  ></minerva-order-book-heatmap>
  <output id="view" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/order-book-heatmap/wc/candles-navigation.ts

```tsx
import "minerva-design/web-components/button";
import "minerva-design/web-components/slider";
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";
import type { OrderBookHeatmapViewData } from "minerva-design/charts/core";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

export function setup(root: HTMLElement) {
  const heatmap = root.querySelector<MinervaOrderBookHeatmap>("#heatmap")!;
  const output = root.querySelector<HTMLOutputElement>("#view")!;
  const source = root.querySelector<HTMLElement>("#source")!;
  const latest = root.querySelector<HTMLElement>("#latest")!;
  const full = root.querySelector<HTMLElement>("#full")!;
  const follow = root.querySelector<HTMLElement>("#follow")!;
  const intensity = root.querySelector<HTMLElement>("#intensity")!;
  let current: OrderBookHeatmapViewData | null = null;
  let minimum = 0;
  const renderLabels = () => {
    // minerva-config writes lang on its scope; the closest ancestor wins.
    const languageScope = heatmap.closest("[lang]") || document.documentElement;
    const text = getFrameworkLabels(
      languageScope.getAttribute("lang") || document.documentElement.lang,
    );
    source.textContent = text.source;
    latest.textContent = text.latest;
    full.textContent = text.full;
    follow.textContent = text.follow;
    intensity.setAttribute("aria-label", text.minimum);
    const view = current?.view;
    const seconds = view
      ? Math.round((view.time[1] - view.time[0]) / 1000)
      : 30;
    output.value = `${view?.follow ? text.following : text.manual} · ${text.minimum} ${minimum}% · ${seconds} ${text.visible}`;
  };
  renderLabels();
  const languageChanges = new MutationObserver(renderLabels);
  languageChanges.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
    subtree: true,
  });
  const history = createFrameworkHistory();
  const options = {
    interval: 250,
    window: 30000,
    history: 60000,
    maxBars: 30,
    maxColumns: 240,
  };
  heatmap.options = options;
  const show = (seconds: number) =>
    heatmap.setView({
      time: [history.end - seconds * 1000, history.end],
      price: [98, 102],
    });
  const listeners: Array<() => void> = [];
  const listen = (
    element: HTMLElement,
    type: string,
    handler: EventListener,
  ) => {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener(type, handler));
  };
  listen(latest, "click", () => show(10));
  listen(full, "click", () => show(30));
  listen(follow, "click", () => heatmap.resetView());
  listen(intensity, "minerva-change", (event) => {
    minimum = (event as CustomEvent<{ value: number }>).detail.value;
    heatmap.options = { ...options, intensityRange: [minimum / 100, 1] };
    renderLabels();
  });
  listen(heatmap, "minerva-view-change", (event) => {
    current = (event as CustomEvent<OrderBookHeatmapViewData>).detail;
    renderLabels();
  });
  let disposed = false;
  // Apply interval/retention before closing historical book columns.
  void heatmap.updateComplete.then(() => {
    if (disposed) return;
    for (const book of history.books) heatmap.setBook(book);
    heatmap.addTrades(history.trades);
    // Property only: object rows and typed columns are never serialized as attributes.
    heatmap.bars = history.bars;
    show(30);
  });
  return () => {
    disposed = true;
    languageChanges.disconnect();
    listeners.forEach((dispose) => dispose());
  };
}

```

### apps/docs/src/docs/pages/order-book-heatmap/framework-history.ts

```tsx
import type {
  MarketTrade,
  OrderBookSnapshot,
  TradingBar,
} from "minerva-design/charts/core";

/** Finite simulated books and executions; candles are explicitly supplied from executions. */
export function createFrameworkHistory(now = Date.now()) {
  const end = Math.floor(now / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(
      100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12,
    );
    const size = 1 + ((i * 7) % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) =>
      Array.from(
        { length: 36 },
        (_, level) =>
          [
            round(price + sign * (level + 1) * 0.05),
            2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0),
          ] as [number, number],
      );
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0)
      bars.push({
        time: start + bucket * 1000,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: size,
      });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price);
      bar.low = Math.min(bar.low, price);
      bar.close = price;
      bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
}

/** UI copy shared by the native framework examples, keyed by configured language. */
export const frameworkHeatmapLabels = {
  en: {
    source:
      "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    latest: "Latest 10s",
    full: "Full 30s",
    follow: "Follow market",
    following: "Following market",
    manual: "Manual view",
    minimum: "Minimum liquidity intensity (%)",
    visible: "s visible",
  },
  zh: {
    source: "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    latest: "最近 10 秒",
    full: "完整 30 秒",
    follow: "跟随行情",
    following: "正在跟随行情",
    manual: "手动视图",
    minimum: "最低流动性强度（%）",
    visible: "秒可见",
  },
  ja: {
    source:
      "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    latest: "直近 10 秒",
    full: "全 30 秒",
    follow: "相場に追従",
    following: "相場に追従中",
    manual: "手動表示",
    minimum: "流動性強度の下限（%）",
    visible: "秒を表示",
  },
  fr: {
    source:
      "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    latest: "10 dernières s",
    full: "30 s complètes",
    follow: "Suivre le marché",
    following: "Suivi du marché",
    manual: "Vue manuelle",
    minimum: "Intensité minimale de liquidité (%)",
    visible: "s visibles",
  },
};

export function getFrameworkLabels(locale: string) {
  const language = locale
    .toLowerCase()
    .split(/[-_]/)[0] as keyof typeof frameworkHeatmapLabels;
  return frameworkHeatmapLabels[language] ?? frameworkHeatmapLabels.en;
}

```

## Example: Live liquidity heatmap

A new book every 200 ms closes a column of resting size; trades are bubbles sized by volume.

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

## Example: Red-up colors, square-root scale

The mainland China convention (buys in red), a square-root color scale and no size profile.

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
