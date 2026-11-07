# Candlestick chart

Open, high, low and close prices per period, for stocks, crypto or any OHLC data. Rising and falling candles get their own colors, line series can be added (moving averages) and long histories stay smooth to zoom and pan on the GPU.

Package: minerva-design@1.22.1

Renderer: weapp

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

Open

High

Low

Close

Change

Candle colors

Green up, red down

Red up, green down

ACME daily prices over 60 trading days

MA {{days}}

NOVA daily prices over 120 trading days with 5 and 20 day moving averages

50,000 one-minute candles

{{candles}} candles · drawn with {{renderer}} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset

Volume

ORBT daily prices over 90 trading days

ORBT daily traded volume

VWAP

Guidance cut

ORBT 5-minute candles over one session with the VWAP

Daily OHLC bars

Daily candles

Daily hollow candles

OHLC bars

Candles

Hollow candles

ticks for the open and the close

filled body from open to close

empty body when the close is higher

ETH/USDT

ETH/USDT four-hour chart with eight exponential averages

Volume

Own pane

Under the price

BTC/USDT

BTC/USDT hourly chart with volume colored by candle

CATL 300750

CATL daily chart, rising candles in red

E

D

S

G↓

Earnings

Dividend

Stock split

Guidance cut

ORBT

ORBT daily chart with earnings, dividends and a split

Pause

Resume

Live: ten trades a second

Paused

ADA/USDT

5s

ADA/USDT five-second candles updated live

NASDAQ 100

NASDAQ 100 30-minute hollow candles on a night theme

Pattern

All

Doji

Hammer

Shooting star

Engulfing

D

H

SS

E↑

E↓

Doji

Hammer

Shooting star

Bullish engulfing

Bearish engulfing

open and close almost equal, indecision

long lower shadow after a decline, buyers stepping in

long upper shadow after a rise, sellers stepping in

a rising body covers the previous falling one

a falling body covers the previous rising one

{{name}}: {{value}}

{{name}} on {{date}}: {{meaning}}.

Hover a marked candle to name its pattern.

ORBT daily chart with candlestick patterns marked

BTC/USD

AAPL

EUR/USD

Gold (XAU/USD)

48 hours

30 days

{{name}} candles, {{change}} over the period

R1

P

S1

EUR/USD

EUR/USD hourly candles with daily pivot levels

{{time}} · range {{range}} pips · body {{body}} pips · change {{change}} pips · crosshair {{distance}} pips from the last price

Pivots for Friday: P {{pivot}}, R1 {{r1}}, S1 {{s1}}. Hover a candle to measure it in pips.

## CandlestickChart

Support: beta

Chart whose untyped series are OHLC candles (`open`, `high`, `low`, `y`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/candlestick-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
