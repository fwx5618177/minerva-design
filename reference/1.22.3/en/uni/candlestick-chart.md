# Candlestick chart

Open, high, low and close prices per period, for stocks, crypto or any OHLC data. Rising and falling candles get their own colors, line series can be added (moving averages) and long histories stay smooth to zoom and pan on the GPU.

Package: minerva-design@1.22.3

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "CandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
