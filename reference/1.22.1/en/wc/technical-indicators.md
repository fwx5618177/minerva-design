# Technical indicators

Moving averages, Bollinger bands, VWAP, MACD, RSI, KDJ, ATR and Heikin-Ashi: declared in one line on a TradingChart, or computed with pure functions on plain arrays and Float64Array columns.

Package: minerva-design@1.22.1

Renderer: wc

Locale: en

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

#### Declarative indicators

The indicators option lists the indicators in order: moving averages, Bollinger, Keltner and Donchian channels, VWAP, parabolic SAR, Ichimoku and SuperTrend are drawn over the price; volume (unless overlay), MACD, RSI, KDJ, ATR, OBV, CCI, stochastic RSI, DMI, Williams %R and MFI each get a pane below it. Every legend shows the values at the crosshair, and clicking an indicator name hides it.

An indicator is identified by its type and parameters ("ma:7", "macd:12:26:9") unless it sets an id: indicatorToggle and setIndicatorVisible use it. Changing the list keeps the computed values of the indicators that did not change.

#### Pure functions

The same computations are exported by minerva-design/charts/core: they take plain arrays or typed arrays and return Float64Array columns, NaN until the window is full. Use them for signals, screeners, back-tests or a server, with the exact values the chart draws.

#### Conventions

MA is the simple average, WMA weighs the newest bar the most, EMA uses 2 / (period + 1) and starts from the simple average of the first window, like TradingView.

RSI and ATR use Wilder's smoothing (1 / period); Bollinger bands use the population standard deviation.

KDJ starts K and D at 50 and smooths them over 3 bars by default; J = 3K − 2D can leave the 0-100 range.

VWAP restarts every day (or week, month, never) in the time zone of timeZone or utcOffset.

On every tick, the chart recomputes only the values of the last bar: a stream of updates costs the same with a hundred or a million bars.

Zoomed out, indicators keep being computed on every bar and are drawn with the lowest and highest value of each pixel column, so spikes stay visible on a million bars.

Ichimoku draws the leading spans displacement − 1 bars ahead (into the empty space after the last bar) and the lagging span as many bars back; the pure ichimoku function returns them unshifted.

Period

{{period}} bars

MSFT

Daily chart with simple, exponential and weighted moving averages

Width of the bands

{{value}} σ

ETH/USDT

Hourly chart with Bollinger bands

NVDA

Five-minute chart over five sessions with the VWAP and the volume

BTC/USDT

Daily chart with the MACD pane

Overbought / oversold

70 / 30

80 / 20

SOL/USDT

Four-hour chart with a 14-bar and a 6-bar RSI

CATL 300750

Daily chart with the KDJ pane

Long stop · 2 ATR

Short stop · 2 ATR

XAU/USD

Hourly chart of gold with the ATR and volatility stops

Chart style

Heikin-Ashi

Candles

ADA/USDT

Four-hour chart in Heikin-Ashi bars

Rising trend for {{count}} bar

Rising trend for {{count}} bars

Falling trend for {{count}} bar

Falling trend for {{count}} bars

Buy

Sell

Hourly chart with EMA cross signals and RSI

{{trades}} closed trades · {{wins}} winners · {{result}} in total

XOM

Daily chart drawn with createTradingChart

Not enough bars yet for the 50-day average

The close is {{value}} above its 50-day average

The close is {{value}} below its 50-day average

Cloud

Nikkei 225

Nikkei 225 daily chart with the Ichimoku cloud

Band distance

{{value}} ATR

Parabolic SAR

SOL/USDT four-hour chart with the SuperTrend and its flips

Channel

Keltner

Donchian

Bollinger

EUR/USD

EUR/USD hourly chart with a price channel

Oscillators

Stoch RSI

CCI

Williams %R

MFI

BTC/USDT four-hour chart with oscillator panes

ADX {{adx}}: a strong trend, {{direction}}

ADX {{adx}}: no strong trend, {{direction}} for now

rising (+DI above −DI)

falling (−DI above +DI)

MSFT daily chart with the DMI pane

AAPL

AAPL daily chart with the volume and the OBV

Trend changes: {{count}}

Divergences

All

Bullish

Bearish

SOL/USDT four-hour chart with RSI divergences drawn

{{bullish}} bullish and {{bearish}} bearish divergences.

Latest: {{kind}}, {{date}}.

EMA {{period}} · {{frame}}

ETH/USDT hourly chart with the 20-bar EMA of the hourly, 4-hour and daily bars

{{time}} · close {{close}}

{{frame}}: above {{value}}

{{frame}}: below {{value}}

{{frame}}: not enough bars

All timeframes up

All timeframes down

Timeframes disagree

Indicator screener

Symbol

Close

1 day

RSI 14

MACD hist.

ATR %

vs SMA 50

Signal

Overbought

Oversold

Uptrend

Downtrend

Neutral

{{name}}: {{signal}}, {{distance}} from its 50-day average.

{{name}} daily chart with the 50-day average, RSI and MACD

```tsx
<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>
```

```tsx
import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Bollinger bands from the pure functions

bollinger() and ema() of minerva-design/charts/core compute the series, drawn by a range area chart.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/wc/bollinger.html

```html
<minerva-range-area-chart
  id="bands"
  curve="linear"
  height="320"
></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/technical-indicators/wc/bollinger.ts

```tsx
// The indicator functions of minerva-design/charts/core are pure: any
// chart can draw them. Bollinger bands as a range area, the moving
// averages and the close as lines.
import { bollinger, ema } from "minerva-design/charts/core";
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    close: "Close",
    band: "Bollinger (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  zh: {
    close: "收盘价",
    band: "布林带 (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  ja: {
    close: "終値",
    band: "ボリンジャーバンド (20, 2)",
    middle: "SMA 20",
    slow: "EMA 50",
  },
  fr: {
    close: "Clôture",
    band: "Bollinger (20, 2)",
    middle: "MMS 20",
    slow: "MME 50",
  },
};

// 200 daily closes, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let price = 100;
const TIMES: number[] = [];
const CLOSES = Array.from({ length: 200 }, (_, i) => {
  TIMES.push(Date.UTC(2025, 2, 3) + i * 86_400_000);
  price = round(
    price * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25),
  );
  return price;
});

const BANDS = bollinger(CLOSES, 20, 2);
const SLOW = ema(CLOSES, 50);
// the first values of an indicator are NaN (not enough data yet): no point
const points = (values: ArrayLike<number>) =>
  TIMES.map((x, i) => ({
    x,
    y: Number.isNaN(values[i]) ? null : round(values[i]),
  }));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#bands")!;
  chart.series = [
    {
      name: text.band,
      opacity: 0.18,
      data: TIMES.map((x, i) =>
        Number.isNaN(BANDS.upper[i])
          ? { x, y: null }
          : { x, y0: round(BANDS.lower[i]), y: round(BANDS.upper[i]) },
      ),
    },
    { name: text.close, type: "line", data: points(CLOSES) },
    {
      name: text.middle,
      type: "line",
      lineWidth: 1,
      data: points(BANDS.middle),
    },
    { name: text.slow, type: "line", lineWidth: 1, data: points(SLOW) },
  ];
  chart.options = { xAxis: { type: "time" }, crosshair: true };
}

```

## Example: Indicator panes

The trading chart computes Bollinger bands, MACD and RSI itself; macd() gives the last values outside of it.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/technical-indicators/wc/panes.html

```html
<div style="display: grid; gap: 8px">
  <minerva-trading-chart
    id="panes"
    symbol="ACME"
    height="440"
  ></minerva-trading-chart>
  <output id="last" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/technical-indicators/wc/panes.ts

```tsx
// The same indicators computed by the trading chart itself (`indicators`):
// Bollinger bands over the price, MACD and RSI in panes; `macd()` of
// minerva-design/charts/core gives the last values outside of the chart.
import { macd } from "minerva-design/charts/core";
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { macd: "MACD (12, 26, 9)" },
  zh: { macd: "MACD 指标 (12, 26, 9)" },
  ja: { macd: "MACD (12, 26, 9)" },
  fr: { macd: "MACD (12, 26, 9)" },
};

// 240 daily bars: a random walk, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 240 }, (_, i) => {
  const open = close;
  close = round(
    open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25),
  );
  const spread = (open * fraction(Math.sin(i * 78.233) * 43758.5453)) / 60;
  return {
    time: Date.UTC(2025, 2, 3) + i * 86_400_000,
    open,
    high: round(Math.max(open, close) + spread),
    low: round(Math.min(open, close) - spread),
    close,
    volume: Math.round(1000 + fraction(Math.sin(i * 3.7) * 9999) * 4000),
  };
});

const MACD = macd(BARS.map((bar) => bar.close));
const LAST = BARS.length - 1;

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTradingChart>("#panes")!;
  const last = root.querySelector<HTMLOutputElement>("#last")!;
  chart.bars = BARS;
  chart.indicators = [
    { type: "boll", period: 20, multiplier: 2 },
    { type: "macd" },
    { type: "rsi", period: 14 },
  ];
  last.textContent = `${text.macd}: ${MACD.macd[LAST].toFixed(2)} / ${MACD.signal[LAST].toFixed(2)}`;
}

```
