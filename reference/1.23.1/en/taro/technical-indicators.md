# Technical indicators

Moving averages, Bollinger bands, VWAP, MACD, RSI, KDJ, ATR and Heikin-Ashi: declared in one line on a TradingChart, or computed with pure functions on plain arrays and Float64Array columns.

Package: minerva-design@1.23.1

Renderer: taro

Locale: en

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
