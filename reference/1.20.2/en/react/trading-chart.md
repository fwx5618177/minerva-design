# Trading chart

A professional trading terminal chart: candles over a gap-free time axis, indicator panes, drawing tools, order lines and real-time streaming, drawn on the GPU and smooth with a million bars.

Package: minerva-design@1.20.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Overview

TradingChart takes OHLCV bars (objects, or typed-array columns for very long histories) and draws them with the GPU backends of the chart engine; axes, labels, drawings and the crosshair are drawn on a Canvas2D overlay.

The time axis is an index of bars: weekends, nights and holidays leave no holes, and the labels follow the timeframe (new days and months in bold).

Moving averages, Bollinger, Keltner and Donchian channels, VWAP, parabolic SAR, Ichimoku and SuperTrend go over the price; volume, MACD, RSI, KDJ, ATR, OBV, CCI, stochastic RSI, DMI, Williams %R and MFI get their own pane, all sharing the zoom and the crosshair. Drag a separator to resize a pane.

Last price line with the countdown to the bar close, high / low of the visible bars, buy / sell markers, a volume profile of the visible range (point of control and value area), and order, position, take-profit, stop-loss and alert lines that can be dragged, cancelled, or created from the price axis.

Trend lines, rays, arrows, horizontal and vertical lines, parallel channels, Andrews pitchforks, rectangles, Fibonacci retracements, text notes, long / short position tools and a measure tool, on the price pane or any indicator pane. A floating toolbar restyles the selected drawing; Ctrl / ⌘ + Z undoes. Drawings are plain data, saved and restored through drawings and onDrawingsChange.

#### Streaming

Call update(bar) on the ref for every tick: a bar at the time of the last one replaces it, a later one appends it. When the latest bar is in view, the chart keeps following it; when the reader scrolled back in history, it stays where it is and a button scrolls back to the latest bar.

A tick recomputes the indicators for the last bar only and uploads only the last candle to the GPU, drawing on the next animation frame: fifty updates a second cost almost nothing. Zoomed out, bars are aggregated per pixel column, so a million bars draw as fast as a thousand.

#### Controls

Wheel to zoom at the pointer (Shift or a horizontal swipe to scroll), drag to pan with inertia.

Drag the price axis to zoom it vertically and the time axis to change the bar width; double-click an axis to reset it.

Focus the chart: arrows move the crosshair bar by bar (Shift: ten bars) and announce its prices, + / − zoom, Home / End jump to the first / latest bar, Delete removes the selected drawing, Ctrl / ⌘ + Z undoes and Ctrl / ⌘ + Shift + Z redoes a drawing change, Escape cancels.

With orderEntry: B / S arm a buy / sell order at the crosshair price (or the last price), ↑ / ↓ move it by one tick (Shift: ten), Enter places it and Escape abandons it. The type follows the price: a buy below the last price or a sell above it is a limit, a buy above or a sell below is a stop; Alt+B / Alt+S switch between limit and stop. O / Shift + O pick the draggable or cancellable lines in turn to move them the same way; Delete cancels the picked order. Each step, type included, is read aloud and emits the same events as the pointer (orderCreate with its orderType, orderMove, orderCancel).

On touch screens: drag to pan, pinch to zoom.

#### Languages

The texts the chart writes (OHLC names, order and alert line titles, countdown, measure tool, accessible names) are built in for English, Chinese, Japanese and French and follow the page language (), also when it changes. Volumes use the units of the language (万 / 亿 in Chinese). Set locale to pick another language and labels to replace any text.

Colors don't follow the language by default: a Chinese page may well show US stocks. Set colorConvention="redUp" for markets showing rises in red, or colorConvention="auto" to pick it from the locale: red up for mainland China, Taiwan, Japan and Korea (zh-CN, zh-TW, ja-JP, ko-KR, or zh / ja / ko without a region), green up elsewhere (Hong Kong included).

#### Workflow

Multi-chart layouts: syncCharts shares the crosshair time and the visible time range between charts, timeframes included.

Bar replay: startReplay hides the bars after a point, then replayStep and replayPlay bring them back one by one, at the chosen speed, with the indicators recomputed as if live.

Time zones and sessions: timeZone sets the clock of the time axis, the session breaks and the VWAP periods (daylight saving included).

Images and full screen: toDataURL and toBlob compose every layer (bars, axes, drawings and legends) into one image; requestFullscreen shows the chart full screen.

Chart settings

BTC/USDT

Chart style

1m

5m

15m

1H

4H

1D

1W

Candles

Hollow candles

Heikin-Ashi

Bars

Line

Area

Baseline

MA

BOLL

VOL

MACD

RSI

KDJ

Ichimoku

SuperTrend

VPVR

Auto

%

Log

BTC/USDT trading chart with volume, MACD and RSI panes

ETH/USDT

SOL/USDT

AAPL

EUR/USD

NQ futures

Kweichow Moutai 600519

BTCUSDT Perpetual

Pause

Resume

Paused: the chart keeps the last bar until the feed resumes.

{{rate}} updates / s · last {{price}}

ETH/USDT one-minute chart updated in real time

{{trades}} trades

Every SOL/USDT trade in real time

AAPL daily bars

Drawing tools

Cursor

Trend line

Ray

Extended line

Horizontal line

Vertical line

Rectangle

Fibonacci retracement

Measure

Arrow

Parallel channel

Andrews pitchfork

Text note

Long position

Short position

Stay in drawing mode

Fit drawings in the scale

Remove all

Drawings: {{count}}

ETH/USDT four-hour chart with drawings

Long

TP

SL

Buy limit

Sell limit

Alert

Buy stop

Sell stop

B {{quantity}}

S {{quantity}}

BTC/USDT hourly chart with a position, orders and trades

Position and orders

{{name}} moved from {{from}} to {{to}}

Drag a dashed line on the chart to move the order.

Price scale

Percent

Logarithmic

Linear

BTC, ETH and SOL over a year, compared in percent

EUR/USD hourly chart loading older bars on demand

Loading older bars…

{{loaded}} of {{total}} bars loaded: scroll to the left for more

Show all

Latest

{{bars}} bars · drawn with {{renderer}}

One million one-minute bars of NQ futures

Kweichow Moutai daily chart, rising bars in red

24h change

24h high

24h low

24h volume

BTCUSDT perpetual 15-minute chart in a dark terminal

Undo

Redo

Download image

Full screen

Snapshot

Snapshot of the NVDA daily chart

Composed by toDataURL: bars, axes, legends and the watermark in one PNG.

NVDA daily chart with its 50 and 200-day averages

NVDA

Volume profile

Rows

Side

Right

Left

Point of control {{poc}} · value area {{low}} – {{high}} (70% of the volume)

BTC/USDT 15-minute chart with the volume profile of the visible bars

Sync the crosshair

Sync the time range

{{symbol}} {{timeframe}} chart

Replay controls

Start replay

New start

Play

Next bar

Speed

Exit

Start the replay, then click a bar to go back to it.

Click a bar: the following bars are hidden.

Bar {{index}} of {{total}}

ETH/USDT hourly chart for bar replay

Buy limit placed at {{price}}

Sell limit placed at {{price}}

Order moved from {{from}} to {{to}}

Order at {{price}} cancelled

BTCUSDT perpetual 5-minute chart with order entry

Hover the chart and click the + on the right to place a limit order (hold Alt for a stop), or focus the chart and press B / S; drag a line to move it, × cancels it.

Time zone

New York

London

Shanghai

Tokyo

UTC

Session breaks

AAPL 5-minute chart over ten sessions with the VWAP

Rally channel: wait for a retest

Open orders

{{count}} rows

{{count}} bars / s

Color convention

Red up

From the language

Green up

#### Keyboard

B S

Arm a buy / sell order

↑ ↓

Move the price (Shift: ×10)

Enter

Place or move the order

Esc

Abandon

O

Pick the next order

Delete

Cancel the picked order

Alt+B Alt+S

Switch between limit and stop

Buy stop placed at {{price}}

Sell stop placed at {{price}}

Click the chart to add an alert; drag one to move it, × removes it.

▲ Alert

▼ Alert

🔔

At most {{value}} alerts: remove one first.

Alert set at {{price}}.

Alert moved to {{price}}.

Alert at {{price}} removed.

{{active}} active alerts, {{fired}} triggered.

{{time}}: the price rose to {{price}}.

{{time}}: the price fell to {{price}}.

AAPL one-minute chart with price alerts

ES (E-mini S&P 500)

#{{id}}

×

Side

Long

Short

Entry

Exit

Points

P&L

{{price}} · {{time}}

Show

Show trade {{id}} on the chart

Net P&L

Win rate

{{rate}} ({{wins}} of {{total}})

Profit factor

Average win

Average loss

E-mini S&P 500 15-minute chart with the trades of the journal

Closed trades

Pick a trade in the table to show it on the chart.

Trade {{id}}: {{side}} {{contracts}} contracts, {{pnl}}.

{{value}} 24h

O {{value}}

H {{value}}

L {{value}}

C {{value}}

Vol {{value}}

Timeframe

SOL/USDT chart sized for a phone

## TradingChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "TradingChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "height",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 480,
    "required": false,
    "description": "Height (pixels or any CSS length)"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width (pixels or any CSS length)"
  },
  {
    "name": "bars",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "union",
    "typeText": "TradingBarsInput | undefined",
    "typeRef": "type:03e8bd548e3d64fe4c79",
    "required": false,
    "description": "Bars, oldest first; replaced when a new array / object is passed"
  },
  {
    "name": "timeframe",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "union",
    "typeText": "TradingTimeframe | undefined",
    "typeRef": "type:173600f163d77338cabe",
    "required": false,
    "description": "Duration of a bar; inferred from the bar times by default"
  },
  {
    "name": "symbol",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name shown in the legend and the accessible label (`\"BTC/USDT\"`)"
  },
  {
    "name": "chartStyle",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "enum",
    "values": [
      "area",
      "bars",
      "baseline",
      "candles",
      "heikinAshi",
      "hollowCandles",
      "line"
    ],
    "typeText": "TradingChartStyle | undefined",
    "typeRef": "type:d9342e57cccc22244e2d",
    "default": "candles",
    "required": false,
    "description": "How the bars are drawn"
  },
  {
    "name": "indicators",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "array",
    "typeText": "readonly TradingIndicator[] | undefined",
    "typeRef": "type:c0884998b4d2e08697ff",
    "required": false,
    "description": "Indicators, over the price or in panes below it, in this order"
  },
  {
    "name": "scaleMode",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "enum",
    "values": [
      "linear",
      "log",
      "percent"
    ],
    "typeText": "TradingScaleMode | undefined",
    "typeRef": "type:5550fed1e51f07fbb223",
    "default": "linear",
    "required": false,
    "description": "Price scale of the price pane"
  },
  {
    "name": "colorConvention",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "greenUp",
      "redUp"
    ],
    "typeText": "TradingColorConvention | undefined",
    "typeRef": "type:d430a2cca5479dfb52d4",
    "default": "greenUp",
    "required": false,
    "description": "Colors of rising / falling bars: `redUp` swaps the defaults, `auto` follows the market convention of the `locale` (red up for CN, TW, JP and KR). Not derived from the locale by default (a Chinese page may still show global markets)"
  },
  {
    "name": "upColor",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of rising bars (any CSS color, `var(--x)` included)"
  },
  {
    "name": "downColor",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of falling bars"
  },
  {
    "name": "precision",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Decimals of the prices; detected from the data by default"
  },
  {
    "name": "formatPrice",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "function",
    "typeText": "((price: number) => string) | undefined",
    "typeRef": "type:d4a3dbd61fb114e3bd14",
    "parameters": [
      {
        "name": "price",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the prices (axis, legend, labels); overrides `precision`"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts, numbers and dates (`\"zh-CN\"`): the page language (`<html lang>`, followed when it changes), else the browser's, by default"
  },
  {
    "name": "utcOffset",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Offset of the displayed times from UTC, in minutes (`480` for UTC+8); overrides `timeZone`"
  },
  {
    "name": "timeZone",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Time zone of the time axis, the session breaks and the VWAP periods (an IANA name such as `\"America/New_York\"`, or `\"UTC\"`); the local time by default"
  },
  {
    "name": "sessionBreaks",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Dashed vertical lines where a day starts (intraday bars)"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "enum",
    "values": [
      "free",
      "magnet"
    ],
    "typeText": "TradingCrosshairMode | undefined",
    "typeRef": "type:77394bd60c149b7c533b",
    "default": "magnet",
    "required": false,
    "description": "Crosshair behaviour"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Legends with the values at the crosshair (and the indicator toggles)"
  },
  {
    "name": "lastPriceLine",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Line and axis label at the last price"
  },
  {
    "name": "countdown",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Time left until the current bar closes, under the last price label"
  },
  {
    "name": "highLowMarkers",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Marks the highest and lowest prices of the visible bars"
  },
  {
    "name": "markers",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "array",
    "typeText": "readonly TradingMarker[] | undefined",
    "typeRef": "type:131f1a91c40e007054b6",
    "required": false,
    "description": "Buy / sell markers"
  },
  {
    "name": "priceLines",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "array",
    "typeText": "readonly TradingPriceLine[] | undefined",
    "typeRef": "type:7ab611b5981dd07c8409",
    "required": false,
    "description": "Order, position, take profit / stop loss and alert lines"
  },
  {
    "name": "orderEntry",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "A \"+\" button at the crosshair price, on the right of the price pane: clicking it reports a limit order (`orderCreate`) at that price, a buy below the last price and a sell above it (with Alt / Option held: the stop order of the other side). With the chart focused, `B` / `S` arm a buy / sell order at the crosshair price (or the last price), the arrows move it (Shift: ten ticks), Enter confirms and Escape cancels. The order is a limit when it waits for a better price (a buy at or below the last price, a sell at or above it), else a stop; `Alt+B` / `Alt+S` switch between limit and stop explicitly. `O` selects the draggable lines in turn to move them the same way, Delete cancels the `cancellable` ones"
  },
  {
    "name": "volumeProfile",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "union",
    "typeText": "boolean | TradingVolumeProfileOptions | undefined",
    "typeRef": "type:a6efaf0ee0215f7178bb",
    "default": false,
    "required": false,
    "description": "Volume by price of the visible bars, with its point of control and value area (`true` for the defaults)"
  },
  {
    "name": "compare",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "array",
    "typeText": "readonly TradingCompareSeries[] | undefined",
    "typeRef": "type:2a60a226a57aab3ffc32",
    "required": false,
    "description": "Comparison series (best read with `scaleMode: \"percent\"`)"
  },
  {
    "name": "drawings",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "array",
    "typeText": "readonly TradingDrawing[] | undefined",
    "typeRef": "type:f8a33dcadbf98ee70db7",
    "required": false,
    "description": "Drawings; replaced when a new array is passed (see `drawingsChange`)"
  },
  {
    "name": "drawingMode",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "enum",
    "values": [
      "arrow",
      "cursor",
      "extendedLine",
      "fibRetracement",
      "horizontalLine",
      "longPosition",
      "measure",
      "parallelChannel",
      "pitchfork",
      "ray",
      "rectangle",
      "shortPosition",
      "text",
      "trendLine",
      "verticalLine"
    ],
    "typeText": "TradingDrawingTool | undefined",
    "typeRef": "type:7fe429083989fef68d6d",
    "default": "cursor",
    "required": false,
    "description": "Active drawing tool"
  },
  {
    "name": "keepDrawingMode",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the drawing tool after a drawing is made (back to `cursor` otherwise)"
  },
  {
    "name": "drawingToolbar",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Floating toolbar over the selected drawing (color, width, style, fill, lock, delete)"
  },
  {
    "name": "autoscaleIncludesDrawings",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "The automatic price scale also fits the visible drawings of each pane (lines, channels, position tools...)"
  },
  {
    "name": "baselinePrice",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Price of the `baseline` style; the close of the first visible bar by default"
  },
  {
    "name": "rightOffset",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 8,
    "required": false,
    "description": "Empty space after the last bar, in bars"
  },
  {
    "name": "barSpacing",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 8,
    "required": false,
    "description": "Initial width of a bar, in pixels"
  },
  {
    "name": "wheel",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "enum",
    "values": [
      "modifier",
      "none",
      "zoom"
    ],
    "typeText": "\"none\" | \"zoom\" | \"modifier\" | undefined",
    "typeRef": "type:4ad8d2a7c0e623877526",
    "default": "zoom",
    "required": false,
    "description": "Mouse wheel: `zoom`, `modifier` (zoom with Ctrl / ⌘ only, so the page scrolls) or `none`"
  },
  {
    "name": "kineticScroll",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Keeps panning after a quick drag"
  },
  {
    "name": "grid",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Grid lines"
  },
  {
    "name": "watermark",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Large faint text behind the bars (`\"BTCUSDT · 1H\"`)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "object",
    "typeText": "Partial<TradingChartLabels> | undefined",
    "typeRef": "type:d3634a4b7ab970ac47d2",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the bars and lines (WebGPU, then WebGL2, WebGL, Canvas2D)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/engine/trading/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label; built from the symbol by default"
  }
]
```

### events

```json
[
  {
    "name": "onCrosshairMove",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((event: TradingCrosshairEvent | null) => void) | undefined",
    "typeRef": "type:24acac454fc5c7c5f29b",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingCrosshairEvent | null",
        "typeRef": "type:8062a33df1c742ab8643"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The crosshair moved (`null` when it left the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((event: TradingClickEvent) => void) | undefined",
    "typeRef": "type:8937ea4e36267f015153",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingClickEvent",
        "typeRef": "type:6e04889ba55151e17ae7"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "A pane was clicked"
  },
  {
    "name": "onVisibleRangeChange",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((range: TradingVisibleRange) => void) | undefined",
    "typeRef": "type:89a08176785a845a2626",
    "parameters": [
      {
        "name": "range",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingVisibleRange",
        "typeRef": "type:9a5ea7c882fd86e510e7"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The visible bars changed"
  },
  {
    "name": "onOrderMove",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((event: TradingOrderMoveEvent) => void) | undefined",
    "typeRef": "type:a039064658250f7dfbe5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingOrderMoveEvent",
        "typeRef": "type:c68171f1d9db8be312a3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "A draggable price line was dropped at a new price, or moved with the keyboard"
  },
  {
    "name": "onOrderCreate",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((event: TradingOrderCreateEvent) => void) | undefined",
    "typeRef": "type:8d6f3899c4b6679561bf",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingOrderCreateEvent",
        "typeRef": "type:89b216ef2ae82f937d99"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The \"+\" order entry button was clicked, or an order confirmed with the keyboard (see `orderEntry`)"
  },
  {
    "name": "onOrderCancel",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((event: TradingOrderCancelEvent) => void) | undefined",
    "typeRef": "type:9efb6a86d436e1000889",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingOrderCancelEvent",
        "typeRef": "type:4596266c5f863440ce0e"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The close button of a `cancellable` price line was clicked, or Delete pressed on it"
  },
  {
    "name": "onDrawingsChange",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((drawings: readonly TradingDrawing[]) => void) | undefined",
    "typeRef": "type:8fc4ffa50392b8e07453",
    "parameters": [
      {
        "name": "drawings",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "readonly TradingDrawing[]",
        "typeRef": "type:df45581c582fa73cc20d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The user added, moved or deleted drawings (pass them back as `drawings`)"
  },
  {
    "name": "onDrawingSelect",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((id: string | null) => void) | undefined",
    "typeRef": "type:e5143d78ce13bb62f66f",
    "parameters": [
      {
        "name": "id",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string | null",
        "typeRef": "type:f98d8d39432eaef9d201"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The selected drawing changed"
  },
  {
    "name": "onDrawingToolChange",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((tool: TradingDrawingTool) => void) | undefined",
    "typeRef": "type:098a6c09c8791077f1fe",
    "parameters": [
      {
        "name": "tool",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingDrawingTool",
        "typeRef": "type:9809ff845422dbedd6dd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The drawing tool changed (back to `cursor` after a drawing)"
  },
  {
    "name": "onUndoChange",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((state: TradingUndoState) => void) | undefined",
    "typeRef": "type:2ce216f59903f38997ca",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingUndoState",
        "typeRef": "type:9c72660eecf848400f16"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Undo / redo of the drawings became possible or impossible"
  },
  {
    "name": "onReplayChange",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((state: TradingReplayState) => void) | undefined",
    "typeRef": "type:1f9d5b2bdb9e7cff19dc",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingReplayState",
        "typeRef": "type:e088d06e43549c0f1415"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The bar replay started, stepped, played, paused or stopped"
  },
  {
    "name": "onFullscreenChange",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((fullscreen: boolean) => void) | undefined",
    "typeRef": "type:b15627c7d20e7998cfe0",
    "parameters": [
      {
        "name": "fullscreen",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The chart entered (`true`) or left full screen"
  },
  {
    "name": "onIndicatorToggle",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((event: TradingIndicatorToggleEvent) => void) | undefined",
    "typeRef": "type:bad2d6f4e5f1853850d3",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingIndicatorToggleEvent",
        "typeRef": "type:0a5fdf64ff0127a8de49"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "An indicator was shown or hidden from its legend"
  },
  {
    "name": "onHistoryRequest",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((event: TradingHistoryRequestEvent) => void) | undefined",
    "typeRef": "type:185421cea2f28e65009a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TradingHistoryRequestEvent",
        "typeRef": "type:10900979ed877ab259e2"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The oldest bar came into view: load older bars (`prependBars`)"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/trading.tsx",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:536c07938f2c826dfb04",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The backend in use (again after a fallback)"
  }
]
```

### bindings

```json
[
  {
    "prop": "drawings",
    "event": "onDrawingsChange",
    "syntax": "drawings={drawings} onDrawingsChange={handler}"
  },
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "TradingChartProps": {
    "source": "charts/src/react/trading.tsx",
    "description": "Props of `<TradingChart>`: the options of `createTradingChart`, the size and the events",
    "kind": "interface",
    "extends": [
      "TradingChartOptions"
    ],
    "props": [
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "default": "480",
        "description": "Height (pixels or any CSS length)"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "\"100%\"",
        "description": "Width (pixels or any CSS length)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class of the root element"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "ref",
        "type": "Ref<TradingChartHandle>",
        "required": false,
        "description": "Imperative handle (streaming, scrolling, drawings)"
      },
      {
        "name": "onCrosshairMove",
        "type": "(event: TradingCrosshairEvent | null) => void",
        "required": false,
        "description": "The crosshair moved (`null` when it left the chart)"
      },
      {
        "name": "onClick",
        "type": "(event: TradingClickEvent) => void",
        "required": false,
        "description": "A pane was clicked"
      },
      {
        "name": "onVisibleRangeChange",
        "type": "(range: TradingVisibleRange) => void",
        "required": false,
        "description": "The visible bars changed"
      },
      {
        "name": "onOrderMove",
        "type": "(event: TradingOrderMoveEvent) => void",
        "required": false,
        "description": "A draggable price line was dropped at a new price, or moved with the keyboard"
      },
      {
        "name": "onOrderCreate",
        "type": "(event: TradingOrderCreateEvent) => void",
        "required": false,
        "description": "The \"+\" order entry button was clicked, or an order confirmed with the keyboard (see `orderEntry`)"
      },
      {
        "name": "onOrderCancel",
        "type": "(event: TradingOrderCancelEvent) => void",
        "required": false,
        "description": "The close button of a `cancellable` price line was clicked, or Delete pressed on it"
      },
      {
        "name": "onDrawingsChange",
        "type": "(drawings: readonly TradingDrawing[]) => void",
        "required": false,
        "description": "The user added, moved or deleted drawings (pass them back as `drawings`)"
      },
      {
        "name": "onDrawingSelect",
        "type": "(id: string | null) => void",
        "required": false,
        "description": "The selected drawing changed"
      },
      {
        "name": "onDrawingToolChange",
        "type": "(tool: TradingDrawingTool) => void",
        "required": false,
        "description": "The drawing tool changed (back to `cursor` after a drawing)"
      },
      {
        "name": "onUndoChange",
        "type": "(state: TradingUndoState) => void",
        "required": false,
        "description": "Undo / redo of the drawings became possible or impossible"
      },
      {
        "name": "onReplayChange",
        "type": "(state: TradingReplayState) => void",
        "required": false,
        "description": "The bar replay started, stepped, played, paused or stopped"
      },
      {
        "name": "onFullscreenChange",
        "type": "(fullscreen: boolean) => void",
        "required": false,
        "description": "The chart entered (`true`) or left full screen"
      },
      {
        "name": "onIndicatorToggle",
        "type": "(event: TradingIndicatorToggleEvent) => void",
        "required": false,
        "description": "An indicator was shown or hidden from its legend"
      },
      {
        "name": "onHistoryRequest",
        "type": "(event: TradingHistoryRequestEvent) => void",
        "required": false,
        "description": "The oldest bar came into view: load older bars (`prependBars`)"
      },
      {
        "name": "onRendererChange",
        "type": "(renderer: ChartRendererKind) => void",
        "required": false,
        "description": "The backend in use (again after a fallback)"
      }
    ]
  },
  "TradingChartOptions": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Options of `createTradingChart` (and props of `<TradingChart>`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "bars",
        "type": "TradingBarsInput",
        "required": false,
        "description": "Bars, oldest first; replaced when a new array / object is passed"
      },
      {
        "name": "timeframe",
        "type": "TradingTimeframe",
        "required": false,
        "description": "Duration of a bar; inferred from the bar times by default"
      },
      {
        "name": "symbol",
        "type": "string",
        "required": false,
        "description": "Name shown in the legend and the accessible label (`\"BTC/USDT\"`)"
      },
      {
        "name": "chartStyle",
        "type": "TradingChartStyle",
        "required": false,
        "default": "\"candles\"",
        "description": "How the bars are drawn"
      },
      {
        "name": "indicators",
        "type": "readonly TradingIndicator[]",
        "required": false,
        "description": "Indicators, over the price or in panes below it, in this order"
      },
      {
        "name": "scaleMode",
        "type": "TradingScaleMode",
        "required": false,
        "default": "\"linear\"",
        "description": "Price scale of the price pane"
      },
      {
        "name": "colorConvention",
        "type": "TradingColorConvention",
        "required": false,
        "default": "\"greenUp\"",
        "description": "Colors of rising / falling bars: `redUp` swaps the defaults, `auto` follows the market convention of the `locale` (red up for CN, TW, JP and KR). Not derived from the locale by default (a Chinese page may still show global markets)"
      },
      {
        "name": "upColor",
        "type": "string",
        "required": false,
        "description": "Color of rising bars (any CSS color, `var(--x)` included)"
      },
      {
        "name": "downColor",
        "type": "string",
        "required": false,
        "description": "Color of falling bars"
      },
      {
        "name": "precision",
        "type": "number",
        "required": false,
        "description": "Decimals of the prices; detected from the data by default"
      },
      {
        "name": "formatPrice",
        "type": "(price: number) => string",
        "required": false,
        "description": "Formats the prices (axis, legend, labels); overrides `precision`"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "description": "Locale of the texts, numbers and dates (`\"zh-CN\"`): the page language (`<html lang>`, followed when it changes), else the browser's, by default"
      },
      {
        "name": "utcOffset",
        "type": "number",
        "required": false,
        "description": "Offset of the displayed times from UTC, in minutes (`480` for UTC+8); overrides `timeZone`"
      },
      {
        "name": "timeZone",
        "type": "string",
        "required": false,
        "description": "Time zone of the time axis, the session breaks and the VWAP periods (an IANA name such as `\"America/New_York\"`, or `\"UTC\"`); the local time by default"
      },
      {
        "name": "sessionBreaks",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Dashed vertical lines where a day starts (intraday bars)"
      },
      {
        "name": "crosshair",
        "type": "TradingCrosshairMode",
        "required": false,
        "default": "\"magnet\"",
        "description": "Crosshair behaviour"
      },
      {
        "name": "legend",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Legends with the values at the crosshair (and the indicator toggles)"
      },
      {
        "name": "lastPriceLine",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Line and axis label at the last price"
      },
      {
        "name": "countdown",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Time left until the current bar closes, under the last price label"
      },
      {
        "name": "highLowMarkers",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Marks the highest and lowest prices of the visible bars"
      },
      {
        "name": "markers",
        "type": "readonly TradingMarker[]",
        "required": false,
        "description": "Buy / sell markers"
      },
      {
        "name": "priceLines",
        "type": "readonly TradingPriceLine[]",
        "required": false,
        "description": "Order, position, take profit / stop loss and alert lines"
      },
      {
        "name": "orderEntry",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "A \"+\" button at the crosshair price, on the right of the price pane: clicking it reports a limit order (`orderCreate`) at that price, a buy below the last price and a sell above it (with Alt / Option held: the stop order of the other side). With the chart focused, `B` / `S` arm a buy / sell order at the crosshair price (or the last price), the arrows move it (Shift: ten ticks), Enter confirms and Escape cancels. The order is a limit when it waits for a better price (a buy at or below the last price, a sell at or above it), else a stop; `Alt+B` / `Alt+S` switch between limit and stop explicitly. `O` selects the draggable lines in turn to move them the same way, Delete cancels the `cancellable` ones"
      },
      {
        "name": "volumeProfile",
        "type": "boolean | TradingVolumeProfileOptions",
        "required": false,
        "default": "false",
        "description": "Volume by price of the visible bars, with its point of control and value area (`true` for the defaults)"
      },
      {
        "name": "compare",
        "type": "readonly TradingCompareSeries[]",
        "required": false,
        "description": "Comparison series (best read with `scaleMode: \"percent\"`)"
      },
      {
        "name": "drawings",
        "type": "readonly TradingDrawing[]",
        "required": false,
        "description": "Drawings; replaced when a new array is passed (see `drawingsChange`)"
      },
      {
        "name": "drawingMode",
        "type": "TradingDrawingTool",
        "required": false,
        "default": "\"cursor\"",
        "description": "Active drawing tool"
      },
      {
        "name": "keepDrawingMode",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps the drawing tool after a drawing is made (back to `cursor` otherwise)"
      },
      {
        "name": "drawingToolbar",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Floating toolbar over the selected drawing (color, width, style, fill, lock, delete)"
      },
      {
        "name": "autoscaleIncludesDrawings",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "The automatic price scale also fits the visible drawings of each pane (lines, channels, position tools...)"
      },
      {
        "name": "baselinePrice",
        "type": "number",
        "required": false,
        "description": "Price of the `baseline` style; the close of the first visible bar by default"
      },
      {
        "name": "rightOffset",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Empty space after the last bar, in bars"
      },
      {
        "name": "barSpacing",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Initial width of a bar, in pixels"
      },
      {
        "name": "wheel",
        "type": "\"zoom\" | \"modifier\" | \"none\"",
        "required": false,
        "default": "\"zoom\"",
        "description": "Mouse wheel: `zoom`, `modifier` (zoom with Ctrl / ⌘ only, so the page scrolls) or `none`"
      },
      {
        "name": "kineticScroll",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Keeps panning after a quick drag"
      },
      {
        "name": "grid",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Grid lines"
      },
      {
        "name": "watermark",
        "type": "string",
        "required": false,
        "description": "Large faint text behind the bars (`\"BTCUSDT · 1H\"`)"
      },
      {
        "name": "labels",
        "type": "Partial<TradingChartLabels>",
        "required": false,
        "description": "Overrides of the built-in texts of the `locale`"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend of the bars and lines (WebGPU, then WebGL2, WebGL, Canvas2D)"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label; built from the symbol by default"
      }
    ]
  },
  "TradingChartHandle": {
    "source": "charts/src/react/trading.tsx",
    "description": "Imperative handle of `<TradingChart>`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "update",
        "type": "(bar: TradingBar) => void",
        "required": true,
        "description": "Streams a bar: the time of the last bar replaces it, a later time appends it (cheap: call it on every tick)"
      },
      {
        "name": "appendBars",
        "type": "(bars: TradingBarsInput) => void",
        "required": true,
        "description": "Appends bars newer than the last one"
      },
      {
        "name": "prependBars",
        "type": "(bars: TradingBarsInput) => void",
        "required": true,
        "description": "Inserts older bars before the first one, keeping the view"
      },
      {
        "name": "setBars",
        "type": "(bars: TradingBarsInput) => void",
        "required": true,
        "description": "Replaces the bars"
      },
      {
        "name": "getBarCount",
        "type": "() => number",
        "required": true,
        "description": "Number of bars"
      },
      {
        "name": "getBar",
        "type": "(index: number) => TradingBar | null",
        "required": true,
        "description": "Bar at an index, `null` outside the data"
      },
      {
        "name": "scrollToRealtime",
        "type": "(animate?: boolean) => void",
        "required": true,
        "description": "Scrolls to the latest bar"
      },
      {
        "name": "fitContent",
        "type": "() => void",
        "required": true,
        "description": "Shows every bar"
      },
      {
        "name": "getVisibleRange",
        "type": "() => TradingVisibleRange | null",
        "required": true,
        "description": "Visible bars, `null` before mounting"
      },
      {
        "name": "setVisibleRange",
        "type": "(range: { from: number; to: number }) => void",
        "required": true,
        "description": "Shows the bars between two logical indices"
      },
      {
        "name": "getVisibleTimeRange",
        "type": "() => { from: number; to: number } | null",
        "required": true,
        "description": "Times at the edges of the plot, `null` before mounting"
      },
      {
        "name": "setVisibleTimeRange",
        "type": "(range: { from: number; to: number }) => void",
        "required": true,
        "description": "Shows the bars between two times"
      },
      {
        "name": "setCrosshair",
        "type": "(time: number | null, price?: number) => void",
        "required": true,
        "description": "Shows the crosshair at a time (and a price); `null` hides it"
      },
      {
        "name": "setScaleMode",
        "type": "(mode: TradingScaleMode) => void",
        "required": true,
        "description": "Sets the price scale of the price pane"
      },
      {
        "name": "resetPriceScales",
        "type": "() => void",
        "required": true,
        "description": "Fits every price scale to the visible bars again"
      },
      {
        "name": "setDrawingTool",
        "type": "(tool: TradingDrawingTool) => void",
        "required": true,
        "description": "Activates a drawing tool"
      },
      {
        "name": "getDrawings",
        "type": "() => readonly TradingDrawing[]",
        "required": true,
        "description": "Current drawings"
      },
      {
        "name": "removeDrawing",
        "type": "(id: string) => void",
        "required": true,
        "description": "Deletes a drawing"
      },
      {
        "name": "updateDrawing",
        "type": "(id: string, patch: TradingDrawingPatch) => void",
        "required": true,
        "description": "Changes the style or the content of a drawing (undoable)"
      },
      {
        "name": "selectDrawing",
        "type": "(id: string | null) => void",
        "required": true,
        "description": "Selects a drawing (`null` clears the selection)"
      },
      {
        "name": "undo",
        "type": "() => void",
        "required": true,
        "description": "Undoes the last change of the drawings"
      },
      {
        "name": "redo",
        "type": "() => void",
        "required": true,
        "description": "Redoes the last undone change of the drawings"
      },
      {
        "name": "getUndoState",
        "type": "() => TradingUndoState",
        "required": true,
        "description": "Whether the drawings can be undone or redone"
      },
      {
        "name": "startReplay",
        "type": "(time?: number) => void",
        "required": true,
        "description": "Starts a bar replay after `time` (the user picks the bar without it)"
      },
      {
        "name": "replayStep",
        "type": "(count?: number) => void",
        "required": true,
        "description": "Shows the next bars of the replay"
      },
      {
        "name": "replayPlay",
        "type": "(speed?: number) => void",
        "required": true,
        "description": "Plays the replay at `speed` bars per second"
      },
      {
        "name": "replayPause",
        "type": "() => void",
        "required": true,
        "description": "Pauses the replay"
      },
      {
        "name": "stopReplay",
        "type": "() => void",
        "required": true,
        "description": "Ends the replay and shows every bar"
      },
      {
        "name": "getReplayState",
        "type": "() => TradingReplayState | null",
        "required": true,
        "description": "State of the bar replay, `null` before mounting"
      },
      {
        "name": "toDataURL",
        "type": "(type?: string, quality?: number) => string",
        "required": true,
        "description": "Image of the chart as a data URL (`\"\"` before mounting)"
      },
      {
        "name": "toBlob",
        "type": "(type?: string, quality?: number) => Promise<Blob | null>",
        "required": true,
        "description": "Image of the chart as a blob"
      },
      {
        "name": "requestFullscreen",
        "type": "() => Promise<void>",
        "required": true,
        "description": "Shows the chart full screen"
      },
      {
        "name": "exitFullscreen",
        "type": "() => Promise<void>",
        "required": true,
        "description": "Leaves full screen"
      },
      {
        "name": "setIndicatorVisible",
        "type": "(id: string, visible: boolean) => void",
        "required": true,
        "description": "Shows or hides an indicator"
      },
      {
        "name": "getRenderer",
        "type": "() => ChartRendererKind | null",
        "required": true,
        "description": "Backend in use, `null` until ready"
      },
      {
        "name": "getInstance",
        "type": "() => TradingChartInstance | null",
        "required": true,
        "description": "The underlying engine instance (minerva-design/charts/core)"
      }
    ]
  },
  "TradingBar": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "One bar (candle). Times are milliseconds since the epoch (UTC).",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Opening time of the bar, in ms since the epoch"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "First traded price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "Highest traded price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Lowest traded price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Last traded price"
      },
      {
        "name": "volume",
        "type": "number",
        "required": false,
        "description": "Traded volume"
      }
    ]
  },
  "TradingBarColumns": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Bars as columns of equal length (typed arrays or plain arrays): the compact form for very large histories (no object per bar)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Opening times, in ms since the epoch, ascending"
      },
      {
        "name": "open",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Opening prices"
      },
      {
        "name": "high",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Highest prices"
      },
      {
        "name": "low",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Lowest prices"
      },
      {
        "name": "close",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Closing prices"
      },
      {
        "name": "volume",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Volumes"
      }
    ]
  },
  "TradingPriceLine": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "A horizontal line at a price: orders, positions, take profit / stop loss, alerts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Identifies the line in the `orderMove` event"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price of the line"
      },
      {
        "name": "kind",
        "type": "TradingPriceLineKind",
        "required": false,
        "default": "\"line\"",
        "description": "What the line stands for (sets its default look and label)"
      },
      {
        "name": "side",
        "type": "\"buy\" | \"sell\"",
        "required": false,
        "description": "Side of an order or position (colors it like rising / falling bars)"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Label (`\"Limit\"`, `\"TP\"`, ...); a short default per kind"
      },
      {
        "name": "quantity",
        "type": "number | string",
        "required": false,
        "description": "Quantity shown next to the label; numbers also give positions their profit"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color; derived from the kind and side by default"
      },
      {
        "name": "draggable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Can be dragged to another price (reported by `orderMove`)"
      },
      {
        "name": "cancellable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a close button on the label (reported by `orderCancel`)"
      },
      {
        "name": "lineStyle",
        "type": "TradingLineStyle",
        "required": false,
        "description": "Stroke of the line; dashed for orders, solid for positions by default"
      }
    ]
  },
  "TradingMarker": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "A buy / sell (or any) marker attached to a bar",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Time of the bar (the bar containing this time)"
      },
      {
        "name": "side",
        "type": "\"buy\" | \"sell\"",
        "required": false,
        "default": "\"buy\"",
        "description": "`buy` draws an up arrow below the bar, `sell` a down arrow above it"
      },
      {
        "name": "price",
        "type": "number",
        "required": false,
        "description": "Price of the trade: also marks it with a dot on the bar"
      },
      {
        "name": "text",
        "type": "string",
        "required": false,
        "description": "Short text next to the arrow (`\"B\"`, `\"S\"`, `\"0.5 @ 64,210\"`)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color; the up / down color by default"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Identifies the marker (React keys, tooltips of your own)"
      }
    ]
  },
  "TradingCompareSeries": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Comparison series drawn over the price (use the `percent` scale)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name shown in the legend"
      },
      {
        "name": "data",
        "type": "readonly { time: number; value: number }[]",
        "required": true,
        "description": "Values by time; matched with the bars of the chart by time"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Line color; a theme color by default"
      },
      {
        "name": "lineWidth",
        "type": "number",
        "required": false,
        "default": "1.5",
        "description": "Line width in pixels"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Identifies the series (defaults to the name)"
      }
    ]
  },
  "TradingDrawing": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "A drawing; plain data, so it can be saved and restored",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Unique id"
      },
      {
        "name": "type",
        "type": "Exclude<TradingDrawingTool, \"cursor\">",
        "required": true,
        "description": "Tool that made it"
      },
      {
        "name": "points",
        "type": "readonly TradingDrawingPoint[]",
        "required": true,
        "description": "Anchors: one for horizontal / vertical lines and texts, three for channels, pitchforks and positions (entry, target, stop), two otherwise"
      },
      {
        "name": "pane",
        "type": "string",
        "required": false,
        "default": "\"price\"",
        "description": "Pane of the drawing: `\"price\"` or the id of an indicator pane"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color; the primary color by default"
      },
      {
        "name": "lineWidth",
        "type": "number",
        "required": false,
        "default": "1.5",
        "description": "Line width in pixels"
      },
      {
        "name": "lineStyle",
        "type": "TradingLineStyle",
        "required": false,
        "default": "\"solid\"",
        "description": "Stroke of the lines"
      },
      {
        "name": "fill",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Fills the shape (rectangles, channels, pitchforks, Fibonacci levels)"
      },
      {
        "name": "text",
        "type": "string",
        "required": false,
        "description": "Text of a `text` drawing (`\\n` starts a new line)"
      },
      {
        "name": "fontSize",
        "type": "number",
        "required": false,
        "default": "13",
        "description": "Font size of a `text` drawing, in pixels"
      },
      {
        "name": "quantity",
        "type": "number",
        "required": false,
        "description": "Quantity of a position drawing: shows the profit in price units"
      },
      {
        "name": "locked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Can't be moved nor deleted by the user"
      }
    ]
  },
  "TradingDrawingPoint": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Anchor of a drawing: a time and a price",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Time (beyond the last bar, extrapolated with the bar duration)"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price (or value of the indicator pane)"
      }
    ]
  },
  "TradingChartLabels": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Texts written by the chart. Built in for English, Chinese, Japanese and French (picked from `locale`); the defaults below are the English ones.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "string",
        "required": false,
        "default": "\"O\"",
        "description": "Open in the legend"
      },
      {
        "name": "high",
        "type": "string",
        "required": false,
        "default": "\"H\"",
        "description": "High in the legend"
      },
      {
        "name": "low",
        "type": "string",
        "required": false,
        "default": "\"L\"",
        "description": "Low in the legend"
      },
      {
        "name": "close",
        "type": "string",
        "required": false,
        "default": "\"C\"",
        "description": "Close in the legend"
      },
      {
        "name": "change",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Name before the change of the bar in the legend (none in English)"
      },
      {
        "name": "volume",
        "type": "string",
        "required": false,
        "default": "\"Vol\"",
        "description": "Volume in the legend and title of the volume pane"
      },
      {
        "name": "limit",
        "type": "string",
        "required": false,
        "default": "\"Limit\"",
        "description": "Default title of `order` price lines"
      },
      {
        "name": "position",
        "type": "string",
        "required": false,
        "default": "\"Position\"",
        "description": "Default title of `position` price lines"
      },
      {
        "name": "takeProfit",
        "type": "string",
        "required": false,
        "default": "\"TP\"",
        "description": "Default title of `takeProfit` price lines"
      },
      {
        "name": "stopLoss",
        "type": "string",
        "required": false,
        "default": "\"SL\"",
        "description": "Default title of `stopLoss` price lines"
      },
      {
        "name": "alert",
        "type": "string",
        "required": false,
        "default": "\"Alert\"",
        "description": "Default title of `alert` price lines"
      },
      {
        "name": "scrollToRealtime",
        "type": "string",
        "required": false,
        "default": "\"Scroll to the latest bar\"",
        "description": "Label of the button scrolling back to the latest bar"
      },
      {
        "name": "toggleIndicator",
        "type": "string",
        "required": false,
        "default": "\"Show or hide {name}\"",
        "description": "Accessible label of the indicator toggles; `{name}` is replaced"
      },
      {
        "name": "bars",
        "type": "string",
        "required": false,
        "default": "\"{count} bars\"",
        "description": "Bar count of the measure tool; `{count}` is replaced"
      },
      {
        "name": "days",
        "type": "string",
        "required": false,
        "default": "\"{count}d\"",
        "description": "Days of the measure tool and the countdown; `{count}` is replaced"
      },
      {
        "name": "hours",
        "type": "string",
        "required": false,
        "default": "\"{count}h\"",
        "description": "Hours of the measure tool and the countdown; `{count}` is replaced"
      },
      {
        "name": "minutes",
        "type": "string",
        "required": false,
        "default": "\"{count}m\"",
        "description": "Minutes of the measure tool; `{count}` is replaced"
      },
      {
        "name": "chart",
        "type": "string",
        "required": false,
        "default": "\"{symbol} price chart\"",
        "description": "Accessible description of the chart; `{symbol}` is replaced"
      },
      {
        "name": "announcement",
        "type": "string",
        "required": false,
        "default": "\"{time}: open {open}, high {high}, low {low}, close {close}\"",
        "description": "Bar read aloud when the keyboard moves the crosshair; `{time}`, `{open}`, `{high}`, `{low}` and `{close}` are replaced"
      },
      {
        "name": "timeframe",
        "type": "string",
        "required": false,
        "description": "Timeframe shown after the symbol in the legend; the `timeframe` option when it is a string by default"
      },
      {
        "name": "ichimoku",
        "type": "string",
        "required": false,
        "default": "\"Ichimoku\"",
        "description": "Legend title of the Ichimoku cloud"
      },
      {
        "name": "supertrend",
        "type": "string",
        "required": false,
        "default": "\"SuperTrend\"",
        "description": "Legend title of the SuperTrend"
      },
      {
        "name": "text",
        "type": "string",
        "required": false,
        "default": "\"Text\"",
        "description": "Default text of a new text drawing"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "\"Color\"",
        "description": "Color button of the drawing toolbar"
      },
      {
        "name": "lineWidth",
        "type": "string",
        "required": false,
        "default": "\"Line width\"",
        "description": "Line width button of the drawing toolbar"
      },
      {
        "name": "lineStyle",
        "type": "string",
        "required": false,
        "default": "\"Line style\"",
        "description": "Line style button of the drawing toolbar"
      },
      {
        "name": "fill",
        "type": "string",
        "required": false,
        "default": "\"Fill\"",
        "description": "Fill button of the drawing toolbar"
      },
      {
        "name": "editText",
        "type": "string",
        "required": false,
        "default": "\"Edit text\"",
        "description": "Edit button of text drawings in the drawing toolbar"
      },
      {
        "name": "lock",
        "type": "string",
        "required": false,
        "default": "\"Lock\"",
        "description": "Lock button of the drawing toolbar"
      },
      {
        "name": "remove",
        "type": "string",
        "required": false,
        "default": "\"Delete\"",
        "description": "Delete button of the drawing toolbar"
      },
      {
        "name": "target",
        "type": "string",
        "required": false,
        "default": "\"Target {price} ({change})\"",
        "description": "Target of the position tools; `{price}` and `{change}` are replaced"
      },
      {
        "name": "stop",
        "type": "string",
        "required": false,
        "default": "\"Stop {price} ({change})\"",
        "description": "Stop of the position tools; `{price}` and `{change}` are replaced"
      },
      {
        "name": "riskReward",
        "type": "string",
        "required": false,
        "default": "\"R:R {ratio}\"",
        "description": "Risk / reward ratio of the position tools; `{ratio}` is replaced"
      },
      {
        "name": "profit",
        "type": "string",
        "required": false,
        "default": "\"P&L {value}\"",
        "description": "Profit of the position tools at the last price; `{value}` is replaced"
      },
      {
        "name": "long",
        "type": "string",
        "required": false,
        "default": "\"Long\"",
        "description": "Long position tool"
      },
      {
        "name": "short",
        "type": "string",
        "required": false,
        "default": "\"Short\"",
        "description": "Short position tool"
      },
      {
        "name": "replay",
        "type": "string",
        "required": false,
        "default": "\"Replay · {time}\"",
        "description": "Badge of the bar replay; `{time}` is replaced"
      },
      {
        "name": "replayHint",
        "type": "string",
        "required": false,
        "default": "\"Click a bar to start the replay\"",
        "description": "Hint while picking the first bar of a replay"
      },
      {
        "name": "buyLimit",
        "type": "string",
        "required": false,
        "default": "\"Buy limit {price}\"",
        "description": "Buy limit order (at or below the last price); `{price}` is replaced"
      },
      {
        "name": "sellLimit",
        "type": "string",
        "required": false,
        "default": "\"Sell limit {price}\"",
        "description": "Sell limit order (at or above the last price); `{price}` is replaced"
      },
      {
        "name": "buyStop",
        "type": "string",
        "required": false,
        "default": "\"Buy stop {price}\"",
        "description": "Buy stop order (above the last price); `{price}` is replaced"
      },
      {
        "name": "sellStop",
        "type": "string",
        "required": false,
        "default": "\"Sell stop {price}\"",
        "description": "Sell stop order (below the last price); `{price}` is replaced"
      },
      {
        "name": "orderHint",
        "type": "string",
        "required": false,
        "default": "\"Arrows move the price, Enter confirms, Escape cancels\"",
        "description": "Read aloud while a keyboard order is armed or a line is selected"
      },
      {
        "name": "orderTypeHint",
        "type": "string",
        "required": false,
        "default": "\"Alt+B or Alt+S switches between limit and stop\"",
        "description": "Read aloud when a keyboard order is armed"
      },
      {
        "name": "orderCancelHint",
        "type": "string",
        "required": false,
        "default": "\"Delete cancels the order\"",
        "description": "Read aloud when the line selected by the keyboard can be cancelled"
      },
      {
        "name": "orderLine",
        "type": "string",
        "required": false,
        "default": "\"{title} at {price}\"",
        "description": "Price line selected by the keyboard; `{title}` and `{price}` are replaced"
      },
      {
        "name": "orderPlaced",
        "type": "string",
        "required": false,
        "default": "\"Order placed at {price}\"",
        "description": "Read aloud when an order is created or moved; `{price}` is replaced"
      },
      {
        "name": "orderCancelled",
        "type": "string",
        "required": false,
        "default": "\"Order cancelled\"",
        "description": "Read aloud when a keyboard order is abandoned or an order cancelled"
      }
    ]
  },
  "TradingCrosshairEvent": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Crosshair position",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Index of the hovered bar (may be past the last bar)"
      },
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Time of the hovered bar"
      },
      {
        "name": "bar",
        "type": "TradingBar | null",
        "required": true,
        "description": "Hovered bar, `null` outside the data"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price (or value of the indicator pane) at the horizontal line"
      },
      {
        "name": "pane",
        "type": "string",
        "required": true,
        "description": "Hovered pane: `\"price\"` or the indicator id"
      },
      {
        "name": "x",
        "type": "number",
        "required": true,
        "description": "x of the crosshair in the chart, in pixels (the center of the bar)"
      },
      {
        "name": "y",
        "type": "number",
        "required": true,
        "description": "y of the horizontal line in the chart, in pixels"
      }
    ]
  },
  "TradingClickEvent": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Click on a pane",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Index of the clicked bar"
      },
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Time of the clicked bar"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price (or indicator value) at the pointer"
      },
      {
        "name": "pane",
        "type": "string",
        "required": true,
        "description": "Clicked pane"
      }
    ]
  },
  "TradingOrderMoveEvent": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "A draggable price line was dropped at a new price (or moved with the keyboard)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Id of the line"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "New price (rounded to the price precision)"
      },
      {
        "name": "previousPrice",
        "type": "number",
        "required": true,
        "description": "Price before the drag"
      },
      {
        "name": "line",
        "type": "TradingPriceLine",
        "required": true,
        "description": "The line"
      }
    ]
  },
  "TradingVisibleRange": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Visible bars: logical indices (fractional) and the times at the edges",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "from",
        "type": "number",
        "required": true,
        "description": "Index at the left edge"
      },
      {
        "name": "to",
        "type": "number",
        "required": true,
        "description": "Index at the right edge (beyond the last bar when there is space)"
      },
      {
        "name": "fromTime",
        "type": "number",
        "required": true,
        "description": "Time at the left edge"
      },
      {
        "name": "toTime",
        "type": "number",
        "required": true,
        "description": "Time at the right edge"
      }
    ]
  },
  "TradingIndicatorToggleEvent": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "The legend toggled an indicator",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Id of the indicator"
      },
      {
        "name": "visible",
        "type": "boolean",
        "required": true,
        "description": "Whether it is now drawn"
      }
    ]
  },
  "TradingHistoryRequestEvent": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "The user scrolled close to the oldest bar: time to load older bars",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "firstTime",
        "type": "number",
        "required": true,
        "description": "Time of the oldest bar"
      },
      {
        "name": "count",
        "type": "number",
        "required": true,
        "description": "Number of bars"
      }
    ]
  },
  "TradingVolumeProfileOptions": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Volume profile of the visible bars, drawn as a horizontal histogram on the price pane",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "rows",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Number of price rows"
      },
      {
        "name": "width",
        "type": "number",
        "required": false,
        "default": "0.28",
        "description": "Width of the longest row, as a fraction of the plot width"
      },
      {
        "name": "valueArea",
        "type": "number",
        "required": false,
        "default": "0.7",
        "description": "Share of the volume in the value area, around the point of control"
      },
      {
        "name": "side",
        "type": "\"left\" | \"right\"",
        "required": false,
        "default": "\"right\"",
        "description": "Side of the plot the rows grow from"
      },
      {
        "name": "upColor",
        "type": "string",
        "required": false,
        "description": "Color of the volume of rising bars; the up color by default"
      },
      {
        "name": "downColor",
        "type": "string",
        "required": false,
        "description": "Color of the volume of falling bars; the down color by default"
      },
      {
        "name": "pocColor",
        "type": "string",
        "required": false,
        "description": "Color of the point of control line"
      }
    ]
  },
  "TradingOrderCreateEvent": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "The \"+\" button of `orderEntry` was clicked, or an order confirmed with the keyboard",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price of the order (rounded to the price precision)"
      },
      {
        "name": "side",
        "type": "\"buy\" | \"sell\"",
        "required": true,
        "description": "`buy` below the last price, `sell` above it (`B` / `S` with the keyboard)"
      },
      {
        "name": "orderType",
        "type": "TradingOrderType",
        "required": true,
        "description": "`limit` for a buy at or below the last price or a sell at or above it, `stop` otherwise (or as switched with Alt)"
      }
    ]
  },
  "TradingOrderCancelEvent": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "The close button of a `cancellable` price line was clicked (or Delete pressed on it)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Id of the line"
      },
      {
        "name": "line",
        "type": "TradingPriceLine",
        "required": true,
        "description": "The line"
      }
    ]
  },
  "TradingReplayState": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "State of the bar replay",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "active",
        "type": "boolean",
        "required": true,
        "description": "Bars are being replayed (the later ones are hidden)"
      },
      {
        "name": "picking",
        "type": "boolean",
        "required": true,
        "description": "The user is picking the first bar"
      },
      {
        "name": "playing",
        "type": "boolean",
        "required": true,
        "description": "Bars are added automatically"
      },
      {
        "name": "speed",
        "type": "number",
        "required": true,
        "description": "Bars added per second while playing"
      },
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Number of bars shown"
      },
      {
        "name": "total",
        "type": "number",
        "required": true,
        "description": "Number of bars of the whole history"
      },
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Time of the last bar shown"
      }
    ]
  },
  "TradingUndoState": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Whether the drawings can be undone or redone",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "canUndo",
        "type": "boolean",
        "required": true,
        "description": "A change can be undone"
      },
      {
        "name": "canRedo",
        "type": "boolean",
        "required": true,
        "description": "An undone change can be redone"
      }
    ]
  },
  "TradingSyncOptions": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "What `syncCharts` keeps in step",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "crosshair",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the crosshair of the hovered chart on the others (at the same time)"
      },
      {
        "name": "timeRange",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the same time range on every chart when one scrolls or zooms"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [React trading chart with local data](/minerva-design/reference/1.20.2/recipes/trading-chart/README.md) — react; verified package 1.20.2

## Example: Chart styles

chartStyle draws the same bars as candles, hollow candles (hollow when the close is above the open, colored against the previous close), Heikin-Ashi, OHLC bars, a line, an area or a baseline split at the first visible close. The year of daily bars has no weekend gaps.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/chart-styles.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TradingChart, type TradingChartStyle } from "minerva-design/charts";
import { DAY, generateBars } from "../data";

// a year of daily bars of a stock: weekends leave no gap on the axis
const bars = generateBars({
  count: 260,
  timeframe: DAY,
  seed: 11,
  price: 182,
  volatility: 0.014,
  volume: 5e7,
  market: "stock",
});

const STYLES: TradingChartStyle[] = [
  "candles",
  "hollowCandles",
  "heikinAshi",
  "bars",
  "line",
  "area",
  "baseline",
];

export default function ChartStylesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [chartStyle, setChartStyle] =
    useState<TradingChartStyle>("hollowCandles");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("chartStyle")}
        direction="horizontal"
        value={chartStyle}
        onChange={(value) => setChartStyle(value as TradingChartStyle)}
      >
        {STYLES.map((style) => (
          <Radio key={style} value={style} label={t(`styles.${style}`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("aapl")}
        chartStyle={chartStyle}
        barSpacing={7}
        ariaLabel={t("stylesAria")}
        height={400}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Compare symbols

compare draws other symbols over the price. On the percent scale every series starts at 0% on the first visible bar, with its last change on the price axis and a dotted 0% line; the log and linear scales keep the prices.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/compare.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TradingChart,
  type TradingCompareSeries,
  type TradingScaleMode,
} from "minerva-design/charts";
import { DAY, generateBars } from "../data";

// a year of daily closes of three coins, from the same day
const daily = (seed: number, price: number, volatility: number) =>
  generateBars({
    count: 365,
    timeframe: DAY,
    seed,
    price,
    volatility,
    volume: 1e4,
  });

const btc = daily(31, 42_000, 0.026);
const eth = daily(32, 2_300, 0.032);
const sol = daily(33, 98, 0.045);

const values = (bars: typeof btc) =>
  bars.map((bar) => ({ time: bar.time, value: bar.close }));

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [scaleMode, setScaleMode] = useState<TradingScaleMode>("percent");
  const compare = useMemo(
    (): TradingCompareSeries[] => [
      { id: "eth", name: t("eth"), data: values(eth) },
      { id: "sol", name: t("sol"), data: values(sol) },
    ],
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("priceScale")}
        direction="horizontal"
        value={scaleMode}
        onChange={(value) => setScaleMode(value as TradingScaleMode)}
      >
        <Radio value="percent" label={t("scaleNames.percent")} />
        <Radio value="log" label={t("scaleNames.log")} />
        <Radio value="linear" label={t("scaleNames.linear")} />
      </RadioGroup>
      <TradingChart
        bars={btc}
        timeframe="1D"
        symbol={t("btc")}
        chartStyle="line"
        scaleMode={scaleMode}
        compare={compare}
        barSpacing={3}
        ariaLabel={t("compareAria")}
        height={400}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Dark terminal

The chart takes its colors from CSS variables: a wrapper redefines them for an exchange-style dark terminal with a ticker header, EMA 20 / 50, Bollinger bands, volume at the bottom of the price pane and RSI.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/dark-terminal.tsx

```tsx
import { useTranslation } from "react-i18next";
import { TradingChart } from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

const bars = generateBars({
  count: 900,
  timeframe: 15 * MINUTE,
  seed: 77,
  price: 66_420,
  volatility: 0.0028,
  volume: 420,
});

// 24 hours of 15-minute bars for the ticker header
const day = bars.slice(-96);
const last = day[day.length - 1].close;
const open = day[0].open;
const high = Math.max(...day.map((bar) => bar.high));
const low = Math.min(...day.map((bar) => bar.low));
const volume = day.reduce((sum, bar) => sum + (bar.volume ?? 0), 0);

// a terminal palette: the chart reads its colors from these CSS variables
const terminal = {
  "--background-color": "#0b0e11",
  "--surface-color": "#0b0e11",
  "--surface-elevated-color": "#1e2329",
  "--text-color": "#eaecef",
  "--text-secondary-color": "#848e9c",
  "--border-color": "#2b3139",
  "--success-color": "#0ecb81",
  "--danger-color": "#f6465d",
  "--warning-color": "#f0b90b",
  "--info-color": "#3d8bfd",
  "--primary-color": "#f0b90b",
  color: "#eaecef",
  background: "#0b0e11",
  borderRadius: 12,
  overflow: "hidden",
  width: "100%",
  border: "1px solid #2b3139",
} as React.CSSProperties;

export default function DarkTerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 2,
  });
  const change = (last - open) / open;
  const stats: [string, string, string?][] = [
    [
      t("change24h"),
      `${change >= 0 ? "+" : ""}${(change * 100).toFixed(2)}%`,
      change >= 0 ? "var(--success-color)" : "var(--danger-color)",
    ],
    [t("high24h"), price.format(high)],
    [t("low24h"), price.format(low)],
    [t("volume24h"), compact.format(volume)],
  ];

  return (
    <div style={terminal}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 24,
          flexWrap: "wrap",
          padding: "12px 16px",
          background: "var(--surface-subtle-color)",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{t("btcPerp")}</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              color:
                change >= 0 ? "var(--success-color)" : "var(--danger-color)",
            }}
          >
            {price.format(last)}
          </div>
        </div>
        {stats.map(([label, value, color]) => (
          <div key={label} style={{ fontSize: 12 }}>
            <div style={{ color: "var(--text-secondary-color)" }}>{label}</div>
            <div
              style={{
                fontVariantNumeric: "tabular-nums",
                fontWeight: 500,
                color,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      <TradingChart
        bars={bars}
        timeframe="15m"
        symbol={t("btcPerp")}
        indicators={[
          { type: "ema", period: 20 },
          { type: "ema", period: 50 },
          { type: "boll", fill: true },
          { type: "volume", overlay: true },
          { type: "rsi", height: 100 },
        ]}
        watermark={t("btcPerp")}
        ariaLabel={t("darkAria")}
        height={520}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Drawing tools

Fourteen tools: pick one, then drag or click the anchors (channels and pitchforks take three). Select a drawing to restyle it from its floating toolbar (color, width, dash, fill, lock, delete), drag it or its handles, double-click a note to edit it. Drawings also work on the RSI pane; undo / redo with the buttons or Ctrl / ⌘ + Z. With autoscaleIncludesDrawings, the price scale also fits the visible drawings (the position target and stop here).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/drawing-tools.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Switch } from "minerva-design";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingDrawing,
  type TradingDrawingTool,
  type TradingUndoState,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

const bars = generateBars({
  count: 420,
  timeframe: 4 * HOUR,
  seed: 23,
  price: 2_480,
  volatility: 0.009,
  volume: 900,
});

// drawings made from the data: a channel around the last rally, a long
// position on the last bar, a note and a line on the RSI pane
const recent = bars.slice(-100);
const bottom = recent.reduce((a, b) => (b.low < a.low ? b : a));
const rally = recent.slice(recent.indexOf(bottom));
const top = rally.reduce((a, b) => (b.high > a.high ? b : a));
const secondLow = rally
  .slice(Math.floor(rally.length / 2))
  .reduce((a, b) => (b.low < a.low ? b : a));
const lastBar = bars[bars.length - 1];
const entry = Math.round(lastBar.close);
const end = lastBar.time + 16 * 4 * HOUR;

const initialDrawings = (note: string): TradingDrawing[] => [
  {
    id: "channel",
    type: "parallelChannel",
    color: "#a855f7",
    points: [
      { time: bottom.time, price: bottom.low },
      { time: secondLow.time, price: secondLow.low },
      { time: top.time, price: top.high },
    ],
  },
  {
    id: "long",
    type: "longPosition",
    quantity: 2,
    points: [
      { time: lastBar.time, price: entry },
      { time: end, price: Math.round(entry * 1.035) },
      { time: end, price: Math.round(entry * 0.9825) },
    ],
  },
  {
    id: "note",
    type: "text",
    color: "#0ea5e9",
    text: note,
    points: [{ time: bottom.time, price: top.high }],
  },
  {
    id: "rsi-line",
    type: "horizontalLine",
    pane: "rsi:14",
    color: "#f59e0b",
    lineStyle: "dashed",
    points: [{ time: bottom.time, price: 50 }],
  },
];

/** 18 px icons of the tools */
const ICONS: Record<TradingDrawingTool, string> = {
  cursor: "M4 3l10 5-4.5 1.5L8 14z",
  trendLine: "M3 15L15 3",
  ray: "M3 14L16 4",
  extendedLine: "M1 16L17 2",
  arrow: "M3 15L14 4M8 4h6v6",
  horizontalLine: "M1 9h16",
  verticalLine: "M9 1v16",
  parallelChannel: "M2 11L11 3M7 16l9-8",
  pitchfork: "M2 9h5M7 9l9-6M7 9h9M7 9l9 6",
  rectangle: "M3 4h12v10H3z",
  fibRetracement: "M2 3h14M2 7h14M2 10h14M2 15h14",
  text: "M4 4h10M9 4v11",
  longPosition: "M3 10h12M9 15V4M5.5 7.5L9 4l3.5 3.5",
  shortPosition: "M3 8h12M9 3v11M5.5 10.5L9 14l3.5-3.5",
  measure: "M9 2v14M5 6l4-4 4 4M5 12l4 4 4-4",
};

const TOOLS = Object.keys(ICONS) as TradingDrawingTool[];

const Icon = ({ d }: { d: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export default function DrawingToolsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [tool, setTool] = useState<TradingDrawingTool>("cursor");
  const [keep, setKeep] = useState(false);
  const [fitDrawings, setFitDrawings] = useState(true);
  const [history, setHistory] = useState<TradingUndoState>({
    canUndo: false,
    canRedo: false,
  });
  const [drawings, setDrawings] = useState<readonly TradingDrawing[]>(() =>
    initialDrawings(t("noteText")),
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        width: "100%",
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div
        role="toolbar"
        aria-label={t("drawingTools")}
        aria-orientation="vertical"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 6,
          background: "var(--surface-subtle-color)",
        }}
      >
        {TOOLS.map((name) => (
          <Button
            key={name}
            size="small"
            variant="ghost"
            shape="square"
            active={tool === name}
            aria-pressed={tool === name}
            aria-label={t(`tools.${name}`)}
            title={t(`tools.${name}`)}
            onClick={() => setTool(name)}
          >
            <Icon d={ICONS[name]} />
          </Button>
        ))}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            padding: "6px 10px",
            fontSize: 13,
            background: "var(--surface-subtle-color)",
          }}
        >
          <Button
            size="small"
            variant="ghost"
            shape="square"
            aria-label={t("undo")}
            title={t("undo")}
            disabled={!history.canUndo}
            onClick={() => chart.current?.undo()}
          >
            <Icon d="M7 4L3 8l4 4M3 8h8a4 4 0 0 1 0 8H9" />
          </Button>
          <Button
            size="small"
            variant="ghost"
            shape="square"
            aria-label={t("redo")}
            title={t("redo")}
            disabled={!history.canRedo}
            onClick={() => chart.current?.redo()}
          >
            <Icon d="M11 4l4 4-4 4M15 8H7a4 4 0 0 0 0 8h2" />
          </Button>
          <Switch
            size="small"
            checked={keep}
            onChange={setKeep}
            label={t("keepDrawing")}
          />
          <Switch
            size="small"
            checked={fitDrawings}
            onChange={setFitDrawings}
            label={t("fitDrawings")}
          />
          <Button
            size="small"
            variant="ghost"
            color="danger"
            disabled={!drawings.length}
            onClick={() => setDrawings([])}
          >
            {t("clearDrawings")}
          </Button>
          <span
            role="status"
            style={{
              marginInlineStart: "auto",
              color: "var(--text-secondary-color)",
            }}
          >
            {t("drawingsStatus", { count: drawings.length })}
          </span>
        </div>
        <TradingChart
          ref={chart}
          bars={bars}
          timeframe="4H"
          symbol={t("eth")}
          drawings={drawings}
          onDrawingsChange={setDrawings}
          onUndoChange={setHistory}
          drawingMode={tool}
          keepDrawingMode={keep}
          // the price scale keeps the visible drawings in view
          autoscaleIncludesDrawings={fitDrawings}
          onDrawingToolChange={setTool}
          indicators={[
            { type: "ema", period: 50 },
            { type: "rsi", height: 100 },
          ]}
          rightOffset={20}
          barSpacing={5}
          ariaLabel={t("drawingAria")}
          height={560}
        />
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Image and full screen

toDataURL and toBlob compose the bars, the axes, the drawings and the legends into one PNG; requestFullscreen shows the chart full screen (Escape leaves it).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/export.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { TradingChart, type TradingChartHandle } from "minerva-design/charts";
import { DAY, generateBars } from "../data";

const bars = generateBars({
  count: 400,
  timeframe: DAY,
  seed: 2_718,
  price: 870,
  volatility: 0.021,
  volume: 3.2e7,
  market: "stock",
});

const Icon = ({ d }: { d: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export default function ExportDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [preview, setPreview] = useState("");

  const download = async () => {
    const blob = await chart.current?.toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nvda-1d.png";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Button
          size="small"
          variant="outline"
          onClick={() => setPreview(chart.current?.toDataURL() ?? "")}
          startIcon={
            <Icon d="M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
          }
        >
          {t("snapshot")}
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => void download()}
          startIcon={<Icon d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" />}
        >
          {t("downloadImage")}
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => void chart.current?.requestFullscreen()}
          startIcon={<Icon d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />}
        >
          {t("fullscreen")}
        </Button>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1D"
        symbol={t("nvda")}
        indicators={[
          { type: "ma", period: 50 },
          { type: "ma", period: 200 },
          { type: "volume", height: 80 },
        ]}
        watermark={t("nvda")}
        ariaLabel={t("exportAria")}
        height={400}
      />
      {preview && (
        <figure style={{ margin: 0, display: "grid", gap: 6 }}>
          <img
            src={preview}
            alt={t("snapshotAlt")}
            style={{
              width: "min(100%, 420px)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
            }}
          />
          <figcaption
            style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
          >
            {t("snapshotCaption")}
          </figcaption>
        </figure>
      )}
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Infinite history

The chart starts with the last 200 hourly bars. When the oldest bar comes into view, onHistoryRequest fetches the 200 before it and prependBars inserts them without moving the view.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/history.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingHistoryRequestEvent,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

// the server holds 3,000 hourly bars; the chart starts with the last 200
const all = generateBars(
  {
    count: 3_000,
    timeframe: HOUR,
    seed: 57,
    price: 1.0842,
    volatility: 0.0011,
    volume: 3_000,
  },
  5,
);
const PAGE = 200;

export default function HistoryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [initial] = useState(() => all.slice(-PAGE));
  const [loaded, setLoaded] = useState(PAGE);
  const [loading, setLoading] = useState(false);
  const busy = useRef(false);

  // the oldest bar came into view: fetch the page before it
  const onHistoryRequest = ({ count }: TradingHistoryRequestEvent) => {
    if (busy.current || count >= all.length) return;
    busy.current = true;
    setLoading(true);
    setTimeout(() => {
      const older = all.slice(
        Math.max(0, all.length - count - PAGE),
        all.length - count,
      );
      chart.current?.prependBars(older);
      busy.current = false;
      setLoading(false);
      setLoaded(count + older.length);
    }, 600);
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TradingChart
        ref={chart}
        bars={initial}
        timeframe="1H"
        symbol={t("eurusd")}
        indicators={[
          { type: "ma", period: 50 },
          { type: "atr", height: 80 },
        ]}
        onHistoryRequest={onHistoryRequest}
        ariaLabel={t("historyAria")}
        height={400}
      />
      <span
        role="status"
        style={{
          color: "var(--text-secondary-color)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {loading
          ? t("historyLoading")
          : t("historyStatus", {
              loaded: new Intl.NumberFormat(i18n.language).format(loaded),
              total: new Intl.NumberFormat(i18n.language).format(all.length),
            })}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: 1,000,000 bars

Two years of one-minute bars as Float64Array columns, with a 200-period EMA. Zoomed out, the bars are aggregated per pixel column, so showing all of them is as fast as showing a hundred.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/million-bars.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type ChartRendererKind,
  type TradingChartHandle,
} from "minerva-design/charts";
import { MINUTE, generateColumns } from "../data";

const COUNT = 1_000_000;

export default function MillionBarsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  // about two years of one-minute bars, as Float64Array columns
  const [bars] = useState(() =>
    generateColumns({
      count: COUNT,
      timeframe: MINUTE,
      seed: 99,
      price: 21_000,
      volatility: 0.0006,
      volume: 40,
      start: Date.UTC(2023, 0, 2),
    }),
  );
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => chart.current?.fitContent()}
        >
          {t("showAll")}
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => chart.current?.scrollToRealtime()}
        >
          {t("latest")}
        </Button>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {t("millionStatus", {
            bars: new Intl.NumberFormat(i18n.language).format(COUNT),
            renderer: renderer ?? "…",
          })}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1m"
        precision={2}
        symbol={t("nq")}
        indicators={[
          { type: "ema", period: 200 },
          { type: "volume", height: 80 },
        ]}
        onRendererChange={setRenderer}
        ariaLabel={t("millionAria")}
        height={440}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Mobile layout

A phone-sized chart without legend, grid or high / low markers: the header above shows the bar under the finger from onCrosshairMove (the last bar otherwise). The timeframes are aggregated from 15-minute bars with resampleBars, and wheel="modifier" lets the page scroll over the chart.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/mobile.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingTimeframe,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

const TIMEFRAMES: TradingTimeframe[] = ["15m", "1H", "4H"];

// ten days of 15-minute bars; the longer timeframes are aggregated from them
const base = generateBars({
  count: 960,
  timeframe: 15 * MINUTE,
  seed: 1_480,
  price: 148,
  volatility: 0.004,
  volume: 52_000,
});

export default function MobileDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const locale = i18n.language;
  const [timeframe, setTimeframe] = useState<TradingTimeframe>("1H");
  const [hovered, setHovered] = useState<number | null>(null);
  const bars = useMemo(
    () => (timeframe === "15m" ? base : resampleBars(base, timeframe)),
    [timeframe],
  );

  // the header replaces the legend: the hovered bar, or the last one
  const index =
    hovered !== null && hovered >= 0 && hovered < bars.length
      ? hovered
      : bars.length - 1;
  const bar = bars[index];
  const previous = bars[index - 1] ?? bar;
  const change = bar.close / previous.close - 1;
  const last = bars[bars.length - 1].close;
  const dayChange = last / base[base.length - 97].close - 1;

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });
  const compact = new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const when = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tone = (value: number) =>
    value >= 0 ? "var(--success-color)" : "var(--danger-color)";

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        width: "100%",
        maxWidth: 380,
        padding: 12,
        border: "1px solid var(--border-color)",
        borderRadius: 12,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "grid", gap: 2 }}>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
          {t("sol")}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <strong
            style={{
              fontSize: 24,
              color: tone(dayChange),
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {price.format(last)}
          </strong>
          <span style={{ fontSize: 13, color: tone(dayChange) }}>
            {t("dayChange", { value: percent.format(dayChange) })}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          justifyContent: "space-between",
          gap: "2px 8px",
          fontSize: 12,
          fontVariantNumeric: "tabular-nums",
          color: "var(--text-secondary-color)",
        }}
      >
        <span style={{ gridColumn: "1 / -1" }}>
          {when.format(bar.time)}
          {" · "}
          <span style={{ color: tone(change) }}>{percent.format(change)}</span>
        </span>
        <span>{t("ohlcOpen", { value: price.format(bar.open) })}</span>
        <span>{t("ohlcHigh", { value: price.format(bar.high) })}</span>
        <span>
          {t("ohlcVolume", { value: compact.format(bar.volume ?? 0) })}
        </span>
        <span>{t("ohlcClose", { value: price.format(bar.close) })}</span>
        <span>{t("ohlcLow", { value: price.format(bar.low) })}</span>
      </div>
      <RadioGroup
        aria-label={t("timeframe")}
        direction="horizontal"
        value={timeframe}
        onChange={(value) => {
          setTimeframe(value as TradingTimeframe);
          setHovered(null);
        }}
      >
        {TIMEFRAMES.map((value) => (
          <Radio key={value} value={value} label={t(`timeframes.${value}`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe={timeframe}
        symbol={t("sol")}
        indicators={[{ type: "volume", overlay: true }]}
        onCrosshairMove={(event) => setHovered(event?.bar ? event.index : null)}
        // a phone: no legend nor grid, and the page scrolls under the finger
        // or the wheel (zoom with a pinch, or Ctrl / ⌘ + wheel)
        legend={false}
        grid={false}
        highLowMarkers={false}
        wheel="modifier"
        rightOffset={3}
        barSpacing={6}
        ariaLabel={t("mobileAria")}
        height={300}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Synchronized layout

Four charts kept in step by syncCharts: hover one and the others show the crosshair at the same time; scroll or zoom one and the others show the same hours, the 4-hour chart included.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/multi-chart.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingChartHandle,
  type TradingChartInstance,
} from "minerva-design/charts";
import { syncCharts } from "minerva-design/charts/core";
import { HOUR, generateBars } from "../data";

const hourly = (seed: number, price: number, volatility: number) =>
  generateBars({
    count: 500,
    timeframe: HOUR,
    seed,
    price,
    volatility,
    volume: 400,
  });

const btc = hourly(61, 63_200, 0.005);

// four charts over the same hours; the last one in 4-hour bars
const PANELS = [
  { symbol: "btc", bars: btc, timeframe: "1H" },
  { symbol: "eth", bars: hourly(62, 2_480, 0.0065), timeframe: "1H" },
  { symbol: "sol", bars: hourly(63, 142, 0.009), timeframe: "1H" },
  { symbol: "btc", bars: resampleBars(btc, "4H"), timeframe: "4H" },
] as const;

export default function MultiChartDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const first = useRef<TradingChartHandle>(null);
  const second = useRef<TradingChartHandle>(null);
  const third = useRef<TradingChartHandle>(null);
  const fourth = useRef<TradingChartHandle>(null);
  const [crosshair, setCrosshair] = useState(true);
  const [timeRange, setTimeRange] = useState(true);

  useEffect(() => {
    const charts = [first, second, third, fourth]
      .map((ref) => ref.current?.getInstance())
      .filter((chart): chart is TradingChartInstance => !!chart);
    return syncCharts(charts, { crosshair, timeRange });
  }, [crosshair, timeRange]);

  const refs = [first, second, third, fourth];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        <Switch
          size="small"
          checked={crosshair}
          onChange={setCrosshair}
          label={t("syncCrosshair")}
        />
        <Switch
          size="small"
          checked={timeRange}
          onChange={setTimeRange}
          label={t("syncTime")}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 1,
          background: "var(--border-color)",
          border: "1px solid var(--border-color)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {PANELS.map((panel, i) => (
          <div key={i} style={{ background: "var(--background-color)" }}>
            <TradingChart
              ref={refs[i]}
              bars={panel.bars}
              timeframe={panel.timeframe}
              symbol={t(panel.symbol)}
              indicators={[{ type: "ema", period: 21 }]}
              highLowMarkers={false}
              barSpacing={panel.timeframe === "4H" ? 9 : 5}
              precision={panel.symbol === "sol" ? 2 : 0}
              ariaLabel={t("layoutAria", {
                symbol: t(panel.symbol),
                timeframe: panel.timeframe,
              })}
              height={260}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Order entry

With orderEntry, a + button follows the crosshair on the right of the price pane: click it to place a limit order at that price (buy below the last price, sell above), or hold Alt (Option) for the stop order of the other side. The keyboard does the same: focus the chart (Tab), press B or S, move the price with the arrows and press Enter; the order becomes a stop when it crosses the last price, and Alt+B / Alt+S switch the type. O picks an existing order to move it, Delete cancels it. Orders are draggable and cancellable price lines kept in React state through onOrderCreate (with orderType), onOrderMove and onOrderCancel; when labels meet at the same height, the axis labels stack with a leader line and the order tags step aside.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/order-entry.tsx

```tsx
import { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingOrderCreateEvent,
  type TradingOrderType,
  type TradingPriceLine,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

const bars = generateBars(
  {
    count: 360,
    timeframe: 5 * MINUTE,
    seed: 909,
    price: 63_480,
    volatility: 0.0018,
    volume: 40,
  },
  1,
);

const last = bars[bars.length - 1].close;

interface Order {
  id: string;
  side: "buy" | "sell";
  type: TradingOrderType;
  price: number;
  quantity: number;
}

// keyboard order entry: focus the chart (Tab), then these keys
const SHORTCUTS = [
  "arm",
  "type",
  "move",
  "confirm",
  "cancel",
  "select",
  "remove",
];

const LINE_TITLES = {
  buy: { limit: "lines.limitBuy", stop: "lines.stopBuy" },
  sell: { limit: "lines.limitSell", stop: "lines.stopSell" },
} as const;

const PLACED = {
  buy: { limit: "orderPlacedBuy", stop: "orderPlacedBuyStop" },
  sell: { limit: "orderPlacedSell", stop: "orderPlacedSellStop" },
} as const;

const kbd: React.CSSProperties = {
  minWidth: 20,
  padding: "0 5px",
  border: "1px solid var(--border-color)",
  borderRadius: 4,
  background: "var(--surface-subtle-color)",
  font: "inherit",
  fontSize: 11,
  lineHeight: "18px",
  textAlign: "center",
};

const INITIAL: Order[] = [
  {
    id: "o1",
    side: "buy",
    type: "limit",
    price: Math.round(last * 0.996),
    quantity: 0.25,
  },
  {
    id: "o2",
    side: "sell",
    type: "limit",
    price: Math.round(last * 1.006),
    quantity: 0.1,
  },
  {
    id: "o3",
    side: "sell",
    type: "stop",
    price: Math.round(last * 0.991),
    quantity: 0.05,
  },
];

export default function OrderEntryDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [orders, setOrders] = useState<Order[]>(INITIAL);
  const [log, setLog] = useState("");

  const usd = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  });

  const lines = useMemo(
    (): TradingPriceLine[] =>
      orders.map((order) => ({
        id: order.id,
        kind: "order",
        side: order.side,
        title: t(LINE_TITLES[order.side][order.type]),
        lineStyle: order.type === "stop" ? "dotted" : "dashed",
        price: order.price,
        quantity: order.quantity,
        draggable: true,
        cancellable: true,
      })),
    [orders, t],
  );

  const onCreate = (event: TradingOrderCreateEvent) => {
    const order = {
      id: `order-${Date.now().toString(36)}`,
      side: event.side,
      type: event.orderType,
      price: event.price,
      quantity: 0.1,
    };
    setOrders((list) => [...list, order]);
    setLog(
      t(PLACED[event.side][event.orderType], {
        price: usd.format(event.price),
      }),
    );
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: "100%" }}>
      <div style={{ flex: "1 1 520px", minWidth: 0 }}>
        <TradingChart
          bars={bars}
          timeframe="5m"
          symbol={t("btcPerp")}
          orderEntry
          priceLines={lines}
          onOrderCreate={onCreate}
          onOrderMove={(event) => {
            setOrders((list) =>
              list.map((order) =>
                order.id === event.id
                  ? { ...order, price: event.price }
                  : order,
              ),
            );
            setLog(
              t("orderModified", {
                from: usd.format(event.previousPrice),
                to: usd.format(event.price),
              }),
            );
          }}
          onOrderCancel={(event) => {
            setOrders((list) => list.filter((order) => order.id !== event.id));
            setLog(
              t("orderCancelled", { price: usd.format(event.line.price) }),
            );
          }}
          ariaLabel={t("orderEntryAria")}
          height={440}
        />
      </div>
      <div
        style={{
          flex: "1 1 220px",
          display: "grid",
          alignContent: "start",
          gap: 8,
          fontSize: 13,
        }}
      >
        <strong>{t("ordersTitle")}</strong>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order.id}
                style={{
                  background: i % 2 ? undefined : "var(--surface-subtle-color)",
                }}
              >
                <td
                  style={{
                    padding: "6px 8px",
                    color:
                      order.side === "buy"
                        ? "var(--success-color)"
                        : "var(--danger-color)",
                  }}
                >
                  {t(LINE_TITLES[order.side][order.type])}
                </td>
                <td
                  style={{
                    padding: "6px 8px",
                    textAlign: "end",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {order.quantity}
                </td>
                <td style={{ padding: "6px 8px", textAlign: "end" }}>
                  {usd.format(order.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {log || t("orderEntryHint")}
        </span>
        <strong style={{ marginTop: 8 }}>{t("keyboard.title")}</strong>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "6px 10px",
            margin: 0,
          }}
        >
          {SHORTCUTS.map((name) => (
            <Fragment key={name}>
              <dt style={{ display: "flex", gap: 4 }}>
                {t(`keyboard.${name}Keys`)
                  .split(" ")
                  .map((key) => (
                    <kbd key={key} style={kbd}>
                      {key}
                    </kbd>
                  ))}
              </dt>
              <dd style={{ margin: 0, color: "var(--text-secondary-color)" }}>
                {t(`keyboard.${name}`)}
              </dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Orders and positions

priceLines draw the open position with its unrealized profit, take profit, stop loss, two limit orders and an alert. Drag a dashed line: onOrderMove reports the new price and the table follows. The arrows are the trades of the history, from markers.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/orders.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingMarker,
  type TradingOrderMoveEvent,
  type TradingPriceLine,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

const bars = generateBars({
  count: 320,
  timeframe: HOUR,
  seed: 5,
  price: 63_200,
  volatility: 0.0045,
  volume: 260,
});

const last = bars[bars.length - 1].close;
const entryBar = bars[bars.length - 70];
const entry = Math.round(entryBar.low + (entryBar.close - entryBar.low) / 2);

/** Round trips of a trade history, as buy / sell bars */
const history: [number, "buy" | "sell", number][] = [
  [60, "buy", 0.4],
  [95, "sell", 0.4],
  [150, "buy", 1.2],
  [205, "sell", 1.2],
  [bars.length - 70, "buy", 0.75],
];

const round = (value: number) => Math.round(value / 10) * 10;

/** The lines; their prices are state (orders can be dragged) */
const LINES: (Omit<TradingPriceLine, "price" | "title"> & { label: string })[] =
  [
    {
      id: "position",
      kind: "position",
      side: "buy",
      quantity: 0.75,
      label: "position",
    },
    {
      id: "tp",
      kind: "takeProfit",
      quantity: 0.75,
      draggable: true,
      label: "takeProfit",
    },
    {
      id: "sl",
      kind: "stopLoss",
      quantity: 0.75,
      draggable: true,
      label: "stopLoss",
    },
    {
      id: "buy",
      kind: "order",
      side: "buy",
      quantity: 0.5,
      draggable: true,
      label: "limitBuy",
    },
    {
      id: "sell",
      kind: "order",
      side: "sell",
      quantity: 0.3,
      draggable: true,
      label: "limitSell",
    },
    { id: "alert", kind: "alert", label: "alert" },
  ];

const INITIAL_PRICES: Record<string, number> = {
  position: entry,
  tp: round(entry * 1.045),
  sl: round(entry * 0.975),
  buy: round(last * 0.985),
  sell: round(last * 1.02),
  alert: round(last * 1.035),
};

export default function OrdersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [prices, setPrices] = useState(INITIAL_PRICES);
  const [moved, setMoved] = useState<TradingOrderMoveEvent | null>(null);

  const lines = useMemo(
    (): TradingPriceLine[] =>
      LINES.map(({ label, ...line }) => ({
        ...line,
        price: prices[line.id],
        title: t(`lines.${label}`),
      })),
    [prices, t],
  );

  const markers = useMemo(
    (): TradingMarker[] =>
      history.map(([index, side, quantity]) => {
        const bar = bars[index];
        return {
          time: bar.time,
          side,
          price:
            side === "buy"
              ? Math.round((bar.low + bar.close) / 2)
              : Math.round((bar.high + bar.close) / 2),
          text: t(side === "buy" ? "buyMarker" : "sellMarker", { quantity }),
        };
      }),
    [t],
  );

  const usd = new Intl.NumberFormat(i18n.language, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const onOrderMove = (event: TradingOrderMoveEvent) => {
    setPrices((current) => ({ ...current, [event.id]: event.price }));
    setMoved(event);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: "100%" }}>
      <div style={{ flex: "1 1 520px", minWidth: 0 }}>
        <TradingChart
          bars={bars}
          timeframe="1H"
          symbol={t("btc")}
          priceLines={lines}
          markers={markers}
          onOrderMove={onOrderMove}
          precision={0}
          ariaLabel={t("ordersAria")}
          height={460}
        />
      </div>
      <div
        style={{
          flex: "1 1 200px",
          display: "grid",
          alignContent: "start",
          gap: 8,
          fontSize: 13,
        }}
      >
        <strong>{t("openOrders")}</strong>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <tbody>
            {lines.map((line, i) => (
              <tr
                key={line.id}
                style={{
                  background: i % 2 ? undefined : "var(--surface-subtle-color)",
                }}
              >
                <td style={{ padding: "6px 8px" }}>{line.title}</td>
                <td
                  style={{
                    padding: "6px 8px",
                    textAlign: "end",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {line.quantity ?? ""}
                </td>
                <td style={{ padding: "6px 8px", textAlign: "end" }}>
                  {usd.format(line.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span role="status" style={{ color: "var(--text-secondary-color)" }}>
          {moved
            ? t("orderMoved", {
                name:
                  lines.find((line) => line.id === moved.id)?.title ?? moved.id,
                from: usd.format(moved.previousPrice),
                to: usd.format(moved.price),
              })
            : t("dragHint")}
        </span>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Price alerts

Click the price pane to set an alert: onClick gives the price, which becomes a priceLines entry of kind "alert", draggable (onOrderMove) and cancellable (onOrderCancel). A streaming feed calls update ten times a second; an alert reached by the price is removed, marked on its bar and logged.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/price-alerts.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
  type TradingClickEvent,
  type TradingMarker,
  type TradingPriceLine,
} from "minerva-design/charts";
import { MINUTE, createTradeFeed, generateBars } from "../data";

const MAX_ALERTS = 5;

interface Alert {
  id: string;
  price: number;
  /** Fires when the price rises to it (`up`) or falls to it */
  direction: "up" | "down";
}

interface Fired {
  id: string;
  price: number;
  direction: Alert["direction"];
  time: number;
}

/** 300 one-minute bars ending at the current minute */
const history = () => {
  const now = Math.floor(Date.now() / MINUTE) * MINUTE;
  return generateBars({
    count: 300,
    timeframe: MINUTE,
    seed: 404,
    price: 152,
    volatility: 0.0011,
    volume: 900,
    start: now - 299 * MINUTE,
  });
};

const round = (price: number) => Math.round(price * 100) / 100;

export default function PriceAlertsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<TradingChartHandle>(null);
  const [bars] = useState(history);
  const [running, setRunning] = useState(true);
  // two alerts to start with, 0.15% around the last close
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const last = bars[bars.length - 1].close;
    return [
      { id: "a1", price: round(last * 1.0015), direction: "up" },
      { id: "a2", price: round(last * 0.9985), direction: "down" },
    ];
  });
  const [fired, setFired] = useState<Fired[]>([]);
  const [status, setStatus] = useState("");
  const alertsRef = useRef(alerts);
  const nextId = useRef(3);
  useEffect(() => {
    alertsRef.current = alerts;
  });

  useEffect(() => {
    if (!running) return;
    // a simulated feed: ten trades a second build the current bar
    const lastBar = chart.current?.getBar(
      (chart.current?.getBarCount() ?? 0) - 1,
    );
    let bar: TradingBar = lastBar
      ? { ...lastBar }
      : { ...bars[bars.length - 1] };
    const next = createTradeFeed(405, bar.close, 0.00005);
    const id = setInterval(() => {
      const trade = next();
      const time = Math.floor(Date.now() / MINUTE) * MINUTE;
      const price = round(trade.price);
      const before = bar.close;
      bar =
        time === bar.time
          ? {
              ...bar,
              high: Math.max(bar.high, price),
              low: Math.min(bar.low, price),
              close: price,
              volume: (bar.volume ?? 0) + trade.size,
            }
          : {
              time,
              open: before,
              high: price,
              low: price,
              close: price,
              volume: trade.size,
            };
      chart.current?.update(bar);
      // an alert fires once, when the price reaches it from its side
      const hit = alertsRef.current.filter((alert) =>
        alert.direction === "up"
          ? before < alert.price && price >= alert.price
          : before > alert.price && price <= alert.price,
      );
      if (!hit.length) return;
      alertsRef.current = alertsRef.current.filter(
        (alert) => !hit.includes(alert),
      );
      setAlerts(alertsRef.current);
      setFired((list) => [
        ...list,
        ...hit.map((alert) => ({ ...alert, time: bar.time })),
      ]);
    }, 100);
    return () => clearInterval(id);
  }, [running, bars]);

  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
  });
  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const lastClose = () =>
    chart.current?.getBar((chart.current?.getBarCount() ?? 0) - 1)?.close ??
    bars[bars.length - 1].close;

  const onClick = (event: TradingClickEvent) => {
    if (event.pane !== "price") return;
    if (alerts.length >= MAX_ALERTS) {
      setStatus(t("alertLimit", { value: MAX_ALERTS }));
      return;
    }
    const price = round(event.price);
    const direction = price >= lastClose() ? "up" : "down";
    setAlerts((list) => [
      ...list,
      { id: `a${nextId.current++}`, price, direction },
    ]);
    setStatus(t("alertAdded", { price: usd.format(price) }));
  };

  const priceLines = useMemo(
    (): TradingPriceLine[] =>
      alerts.map((alert) => ({
        id: alert.id,
        price: alert.price,
        kind: "alert",
        title: alert.direction === "up" ? t("alertUp") : t("alertDown"),
        draggable: true,
        cancellable: true,
      })),
    [alerts, t],
  );
  const markers = useMemo(
    (): TradingMarker[] =>
      fired.map((alert) => ({
        id: alert.id,
        time: alert.time,
        price: alert.price,
        side: alert.direction === "up" ? "buy" : "sell",
        color: "var(--warning-color)",
        text: t("alertMarker"),
      })),
    [fired, t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("alertHint")}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1m"
        symbol={t("aapl")}
        priceLines={priceLines}
        markers={markers}
        onClick={onClick}
        onOrderMove={(event) => {
          const direction = event.price >= lastClose() ? "up" : "down";
          setAlerts((list) =>
            list.map((alert) =>
              alert.id === event.id
                ? { ...alert, price: event.price, direction }
                : alert,
            ),
          );
          setStatus(t("alertMoved", { price: usd.format(event.price) }));
        }}
        onOrderCancel={(event) => {
          setAlerts((list) => list.filter((alert) => alert.id !== event.id));
          setStatus(t("alertRemoved", { price: usd.format(event.line.price) }));
        }}
        countdown
        barSpacing={7}
        ariaLabel={t("alertsAria")}
        height={400}
      />
      <output
        aria-live="polite"
        style={{
          display: "grid",
          gap: 4,
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <span>
          {status ||
            t("alertCount", {
              active: new Intl.NumberFormat(locale).format(alerts.length),
              fired: new Intl.NumberFormat(locale).format(fired.length),
            })}
        </span>
        {fired
          .slice(-3)
          .reverse()
          .map((alert) => (
            <span key={alert.id}>
              {t(alert.direction === "up" ? "alertFiredUp" : "alertFiredDown", {
                price: usd.format(alert.price),
                time: clock.format(alert.time),
              })}
            </span>
          ))}
      </output>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Pro terminal

Timeframes from 1 minute to 1 week aggregated with resampleBars, seven chart styles, indicator toggles (moving averages, Bollinger, Ichimoku, SuperTrend, volume profile, volume, MACD, RSI, KDJ), linear / percent / logarithmic scales, session breaks, an image download and full screen.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/pro-terminal.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select, SelectItem } from "minerva-design";
import {
  TradingChart,
  resampleBars,
  type TradingChartHandle,
  type TradingChartStyle,
  type TradingIndicator,
  type TradingScaleMode,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

// 90 days of 1-minute bars (129,600), aggregated for the longer timeframes
const minutes = generateBars(
  {
    count: 90 * 24 * 60,
    timeframe: MINUTE,
    seed: 42,
    price: 61_850,
    volatility: 0.0011,
    volume: 14,
  },
  1,
);

const TIMEFRAMES = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"] as const;
type Timeframe = (typeof TIMEFRAMES)[number];

const STYLES: TradingChartStyle[] = [
  "candles",
  "hollowCandles",
  "heikinAshi",
  "bars",
  "line",
  "area",
  "baseline",
];

const STUDIES: Record<string, TradingIndicator[]> = {
  ma: [
    { type: "ma", period: 7 },
    { type: "ma", period: 25 },
    { type: "ma", period: 99 },
  ],
  boll: [{ type: "boll" }],
  ichimoku: [{ type: "ichimoku" }],
  st: [{ type: "supertrend" }],
  vpvr: [],
  vol: [{ type: "volume", maPeriod: 20, height: 90 }],
  macd: [{ type: "macd" }],
  rsi: [{ type: "rsi" }],
  kdj: [{ type: "kdj" }],
};

const bar: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 4,
  padding: "6px 8px",
  background: "var(--surface-subtle-color)",
};

const divider: React.CSSProperties = {
  width: 1,
  height: 20,
  margin: "0 6px",
  background: "var(--border-color)",
};

const Icon = ({ d }: { d: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export default function ProTerminalDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [timeframe, setTimeframe] = useState<Timeframe>("15m");
  const [chartStyle, setChartStyle] = useState<TradingChartStyle>("candles");
  const [scaleMode, setScaleMode] = useState<TradingScaleMode>("linear");
  const [studies, setStudies] = useState(["ma", "vpvr", "vol", "macd", "rsi"]);
  const chart = useRef<TradingChartHandle>(null);

  const download = async () => {
    const blob = await chart.current?.toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `btcusdt-${timeframe}.png`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const bars = useMemo(
    () => (timeframe === "1m" ? minutes : resampleBars(minutes, timeframe)),
    [timeframe],
  );
  const indicators = useMemo(
    () =>
      Object.keys(STUDIES).flatMap((key) =>
        studies.includes(key) ? STUDIES[key] : [],
      ),
    [studies],
  );
  const toggle = (key: string) =>
    setStudies((list) =>
      list.includes(key) ? list.filter((k) => k !== key) : [...list, key],
    );

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        overflow: "hidden",
        background: "var(--surface-color)",
      }}
    >
      <div style={bar} role="toolbar" aria-label={t("toolbar")}>
        <strong style={{ padding: "0 8px 0 4px", fontSize: 14 }}>
          {t("btc")}
        </strong>
        {TIMEFRAMES.map((tf) => (
          <Button
            key={tf}
            size="small"
            variant="ghost"
            active={tf === timeframe}
            aria-pressed={tf === timeframe}
            onClick={() => setTimeframe(tf)}
          >
            {t(`timeframes.${tf}`)}
          </Button>
        ))}
        <span style={divider} />
        <Select
          size="small"
          style={{ width: 150 }}
          aria-label={t("chartStyle")}
          value={chartStyle}
          onChange={(value) => setChartStyle(value as TradingChartStyle)}
        >
          {STYLES.map((style) => (
            <SelectItem key={style} value={style}>
              {t(`styles.${style}`)}
            </SelectItem>
          ))}
        </Select>
        <span style={divider} />
        {Object.keys(STUDIES).map((key) => (
          <Button
            key={key}
            size="small"
            variant="ghost"
            active={studies.includes(key)}
            aria-pressed={studies.includes(key)}
            onClick={() => toggle(key)}
          >
            {t(`studies.${key}`)}
          </Button>
        ))}
        <span style={{ flex: 1 }} />
        {(["linear", "percent", "log"] as const).map((mode) => (
          <Button
            key={mode}
            size="small"
            variant="ghost"
            active={scaleMode === mode}
            aria-pressed={scaleMode === mode}
            onClick={() => setScaleMode(mode)}
          >
            {t(`scales.${mode}`)}
          </Button>
        ))}
        <span style={divider} />
        <Button
          size="small"
          variant="ghost"
          shape="square"
          aria-label={t("downloadImage")}
          title={t("downloadImage")}
          onClick={() => void download()}
        >
          <Icon d="M2 5h2.5L6 3h4l1.5 2H14v8H2zM8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </Button>
        <Button
          size="small"
          variant="ghost"
          shape="square"
          aria-label={t("fullscreen")}
          title={t("fullscreen")}
          onClick={() => void chart.current?.requestFullscreen()}
        >
          <Icon d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
        </Button>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe={timeframe}
        symbol={t("btc")}
        chartStyle={chartStyle}
        scaleMode={scaleMode}
        indicators={indicators}
        volumeProfile={studies.includes("vpvr")}
        sessionBreaks
        watermark={`${t("btc")} · ${t(`timeframes.${timeframe}`)}`}
        labels={{ timeframe: t(`timeframes.${timeframe}`) }}
        ariaLabel={t("terminalAria")}
        height={600}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Red up, green down

colorConvention="redUp" follows the mainland China, Taiwan, Japan and Korea conventions; "auto" picks it from the language of the page (switch the docs to Chinese or Japanese to see it turn red); utcOffset shows the times of the Shanghai exchange. MA5 / 10 / 20 / 60, volume with its MA5 and KDJ, as on a Chinese brokerage app.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/red-up.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TradingChart,
  type TradingColorConvention,
} from "minerva-design/charts";
import { DAY, generateBars } from "../data";

// daily bars of a Shanghai-listed stock (no trading on weekends)
const bars = generateBars({
  count: 300,
  timeframe: DAY,
  seed: 600_519,
  price: 1_688,
  volatility: 0.017,
  volume: 3.2e6,
  market: "stock",
  start: Date.UTC(2024, 8, 2),
});

const CONVENTIONS: TradingColorConvention[] = ["redUp", "auto", "greenUp"];

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  // "auto": red up when the page is in Chinese or Japanese
  const [convention, setConvention] = useState<TradingColorConvention>("redUp");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("colorConvention")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(value as TradingColorConvention)}
      >
        {CONVENTIONS.map((value) => (
          <Radio key={value} value={value} label={t(`conventions.${value}`)} />
        ))}
      </RadioGroup>
      <TradingChart
        bars={bars}
        timeframe="1D"
        symbol={t("moutai")}
        colorConvention={convention}
        // China Standard Time (UTC+8)
        utcOffset={480}
        indicators={[
          { type: "ma", period: 5 },
          { type: "ma", period: 10 },
          { type: "ma", period: 20 },
          { type: "ma", period: 60 },
          { type: "volume", maPeriod: 5, height: 90 },
          { type: "kdj", height: 100 },
        ]}
        barSpacing={7}
        ariaLabel={t("redUpAria")}
        height={540}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Bar replay

Practice reading the market without seeing the future: pick a bar on the chart, then step or play the following bars at the chosen speed. The averages and the volume are recomputed bar by bar; Exit shows every bar again.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/replay.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Select, SelectItem } from "minerva-design";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingReplayState,
} from "minerva-design/charts";
import { HOUR, generateBars } from "../data";

const bars = generateBars({
  count: 900,
  timeframe: HOUR,
  seed: 314,
  price: 2_480,
  volatility: 0.006,
  volume: 800,
});

const SPEEDS = [2, 5, 10, 30] as const;

const Icon = ({ d }: { d: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export default function ReplayDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [state, setState] = useState<TradingReplayState | null>(null);
  const [speed, setSpeed] = useState(5);

  const active = !!state?.active;
  const playing = !!state?.playing;

  const status = !state
    ? t("replayIdle")
    : state.picking
      ? t("replayPicking")
      : state.active
        ? t("replayProgress", { index: state.index, total: state.total })
        : t("replayIdle");

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid var(--border-color)",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div
        role="toolbar"
        aria-label={t("replayControls")}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          fontSize: 13,
          background: "var(--surface-subtle-color)",
        }}
      >
        <Button
          size="small"
          variant={active || state?.picking ? "ghost" : "solid"}
          onClick={() => chart.current?.startReplay()}
        >
          {active ? t("replayRestart") : t("replayStart")}
        </Button>
        <Button
          size="small"
          variant="ghost"
          shape="square"
          disabled={!active}
          aria-label={playing ? t("pause") : t("play")}
          title={playing ? t("pause") : t("play")}
          onClick={() =>
            playing
              ? chart.current?.replayPause()
              : chart.current?.replayPlay(speed)
          }
        >
          <Icon
            d={playing ? "M4 3h3v10H4zM9 3h3v10H9z" : "M4 2.5l9 5.5-9 5.5z"}
          />
        </Button>
        <Button
          size="small"
          variant="ghost"
          shape="square"
          disabled={!active || playing}
          aria-label={t("replayStep")}
          title={t("replayStep")}
          onClick={() => chart.current?.replayStep()}
        >
          <Icon d="M3 2.5l7 5.5-7 5.5zM11 3h2v10h-2z" />
        </Button>
        <Select
          size="small"
          style={{ width: 120 }}
          aria-label={t("replaySpeed")}
          value={String(speed)}
          onChange={(value) => {
            setSpeed(Number(value));
            if (playing) chart.current?.replayPlay(Number(value));
          }}
        >
          {SPEEDS.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {t("barsPerSecond", { count: value })}
            </SelectItem>
          ))}
        </Select>
        <Button
          size="small"
          variant="ghost"
          disabled={!active && !state?.picking}
          onClick={() => chart.current?.stopReplay()}
        >
          {t("replayExit")}
        </Button>
        <span
          role="status"
          style={{
            marginInlineStart: "auto",
            color: "var(--text-secondary-color)",
          }}
        >
          {status}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1H"
        symbol={t("eth")}
        indicators={[
          { type: "ema", period: 20 },
          { type: "ema", period: 50 },
          { type: "volume", height: 80 },
        ]}
        onReplayChange={setState}
        ariaLabel={t("replayAria")}
        height={460}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Time zones and sessions

Ten New York sessions of 5-minute bars. timeZone moves the clock of the time axis (daylight saving included) and the day boundaries of the session breaks and of the VWAP: in Shanghai, a New York session spans two days.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/sessions.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem, Switch } from "minerva-design";
import { TradingChart, type TradingBar } from "minerva-design/charts";
import { HOUR, MINUTE, generateBars } from "../data";

// ten New York sessions of 5-minute bars (9:30-16:00 EST = 14:30-21:00 UTC)
const bars: TradingBar[] = generateBars({
  count: 780,
  timeframe: 5 * MINUTE,
  seed: 1_515,
  price: 228,
  volatility: 0.0016,
  volume: 52_000,
  market: "stock",
  start: Date.UTC(2025, 0, 6),
}).map((bar) => ({ ...bar, time: bar.time + 5 * HOUR }));

const ZONES = [
  "America/New_York",
  "Europe/London",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "UTC",
] as const;

export default function SessionsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [zone, setZone] = useState<string>("America/New_York");
  const [breaks, setBreaks] = useState(true);
  const indicators = useMemo(
    () => [{ type: "vwap" as const }, { type: "volume" as const, height: 80 }],
    [],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
          fontSize: 13,
        }}
      >
        <Select
          size="small"
          style={{ width: 220 }}
          aria-label={t("timeZone")}
          value={zone}
          onChange={setZone}
        >
          {ZONES.map((name) => (
            <SelectItem key={name} value={name}>
              {t(`zones.${name.replace("/", "_")}`)}
            </SelectItem>
          ))}
        </Select>
        <Switch
          size="small"
          checked={breaks}
          onChange={setBreaks}
          label={t("sessionBreaks")}
        />
      </div>
      <TradingChart
        bars={bars}
        timeframe="5m"
        symbol={t("aapl")}
        timeZone={zone}
        sessionBreaks={breaks}
        indicators={indicators}
        barSpacing={4}
        ariaLabel={t("sessionsAria")}
        height={420}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Live streaming

A simulated WebSocket sends fifty trades a second; each one calls update() on the ref with the current one-minute bar. Only the last bar is recomputed and uploaded. The last-price label counts down to the bar close; scroll back in history and the chart stays put until you press the arrow button.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/streaming.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/charts";
import { MINUTE, createTradeFeed, generateBars } from "../data";

const TICK_MS = 20; // 50 updates a second

/** 400 one-minute bars ending at the current minute */
const history = () => {
  const now = Math.floor(Date.now() / MINUTE) * MINUTE;
  return generateBars({
    count: 400,
    timeframe: MINUTE,
    seed: 7,
    price: 3_420,
    volatility: 0.0012,
    volume: 120,
    start: now - 399 * MINUTE,
  });
};

export default function StreamingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [bars] = useState(history);
  const [running, setRunning] = useState(true);
  const [status, setStatus] = useState({ rate: 0, price: 0 });

  useEffect(() => {
    if (!running) return;
    // a simulated WebSocket: one trade every 20 ms
    const last = chart.current?.getBar((chart.current?.getBarCount() ?? 0) - 1);
    let bar: TradingBar = last ? { ...last } : { ...bars[bars.length - 1] };
    const next = createTradeFeed(Date.now() % 1000, bar.close, 0.00012);
    let count = 0;
    let started = performance.now();
    const feed = setInterval(() => {
      const trade = next();
      const time = Math.floor(Date.now() / MINUTE) * MINUTE;
      const price = Math.round(trade.price * 100) / 100;
      bar =
        time === bar.time
          ? {
              ...bar,
              high: Math.max(bar.high, price),
              low: Math.min(bar.low, price),
              close: price,
              volume: (bar.volume ?? 0) + trade.size,
            }
          : {
              time,
              open: bar.close,
              high: price,
              low: price,
              close: price,
              volume: trade.size,
            };
      chart.current?.update(bar);
      count++;
    }, TICK_MS);
    const report = setInterval(() => {
      const now = performance.now();
      setStatus({ rate: (count * 1000) / (now - started), price: bar.close });
      count = 0;
      started = now;
    }, 1000);
    return () => {
      clearInterval(feed);
      clearInterval(report);
    };
  }, [running, bars]);

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((r) => !r)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <span
          role="status"
          style={{
            fontVariantNumeric: "tabular-nums",
            color: "var(--text-secondary-color)",
          }}
        >
          {running
            ? t("streamStatus", {
                rate: Math.round(status.rate),
                price: status.price ? price.format(status.price) : "–",
              })
            : t("paused")}
        </span>
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="1m"
        symbol={t("eth")}
        indicators={[
          { type: "ema", period: 9 },
          { type: "ema", period: 21 },
          { type: "volume", height: 90 },
        ]}
        countdown
        barSpacing={9}
        ariaLabel={t("streamAria")}
        height={440}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Tick chart

Every trade is a point of an area chart, about a hundred a second, with a running VWAP and the trade sizes below, colored by the direction of the trade. The time labels switch to seconds on their own.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/tick-chart.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/charts";
import { createTradeFeed } from "../data";

/** Every trade is a bar: open = previous price, so the volume shows the direction */
const tradeBar = (
  time: number,
  previous: number,
  price: number,
  size: number,
): TradingBar => ({
  time,
  open: previous,
  high: Math.max(previous, price),
  low: Math.min(previous, price),
  close: price,
  volume: size,
});

const initialTrades = () => {
  const next = createTradeFeed(3, 172.4, 0.00018);
  const bars: TradingBar[] = [];
  let time = Date.now() - 6_000;
  let previous = 172.4;
  for (let i = 0; i < 600; i++) {
    const trade = next();
    time += 10;
    const price = Math.round(trade.price * 100) / 100;
    bars.push(tradeBar(time, previous, price, trade.size * 40));
    previous = price;
  }
  return { bars, next };
};

export default function TickChartDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const chart = useRef<TradingChartHandle>(null);
  const [{ bars, next }] = useState(initialTrades);
  const [trades, setTrades] = useState(bars.length);

  useEffect(() => {
    let last = bars[bars.length - 1];
    let total = bars.length;
    // about 100 trades a second, in bursts
    const feed = setInterval(() => {
      const burst = 1 + Math.floor(Math.random() * 2);
      for (let k = 0; k < burst; k++) {
        const trade = next();
        const time = Math.max(Date.now(), last.time + 1);
        const price = Math.round(trade.price * 100) / 100;
        last = tradeBar(time, last.close, price, trade.size * 40);
        chart.current?.update(last);
        total++;
      }
    }, 15);
    const report = setInterval(() => setTrades(total), 500);
    return () => {
      clearInterval(feed);
      clearInterval(report);
    };
  }, [bars, next]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TradingChart
        ref={chart}
        bars={bars}
        symbol={t("sol")}
        chartStyle="area"
        indicators={[
          { type: "vwap", reset: "none" },
          { type: "volume", height: 80 },
        ]}
        barSpacing={4}
        rightOffset={12}
        highLowMarkers={false}
        ariaLabel={t("tickAria")}
        height={380}
      />
      <span
        role="status"
        style={{
          color: "var(--text-secondary-color)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("tickStatus", {
          trades: new Intl.NumberFormat(i18n.language).format(trades),
        })}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Trade journal

A futures trading journal on 15-minute session bars: each round trip is an entry and an exit marker, the table lists its points and its P&L (50 dollars a point per contract) and the statistics sum them up. Show calls setVisibleTimeRange and setCrosshair to bring the trade into view.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/trade-journal.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Table, Tag, type TableColumn } from "minerva-design";
import {
  TradingChart,
  type TradingChartHandle,
  type TradingMarker,
} from "minerva-design/charts";
import { MINUTE, generateBars } from "../data";

/** Dollars per point of one E-mini S&P 500 contract */
const POINT_VALUE = 50;

// two weeks of 15-minute bars, 9:30 to 16:00 (exchange time)
const bars = generateBars({
  count: 260,
  timeframe: 15 * MINUTE,
  seed: 5_800,
  price: 5_820,
  volatility: 0.0016,
  volume: 40_000,
  market: "stock",
  start: Date.UTC(2026, 9, 19),
});

/** Quarter-point ticks */
const tick = (price: number) => Math.round(price * 4) / 4;

/** Entry bar, exit bar, side, contracts */
const JOURNAL: [number, number, "long" | "short", number][] = [
  [8, 20, "long", 2],
  [35, 44, "short", 1],
  [60, 75, "long", 3],
  [90, 97, "short", 2],
  [120, 140, "long", 1],
  [150, 158, "long", 2],
  [185, 200, "short", 3],
  [222, 240, "long", 2],
];

interface Trade {
  id: number;
  side: "long" | "short";
  contracts: number;
  entryIndex: number;
  exitIndex: number;
  entry: number;
  exit: number;
  points: number;
  pnl: number;
}

const TRADES: Trade[] = JOURNAL.map(
  ([entryIndex, exitIndex, side, contracts], i) => {
    const entry = tick(bars[entryIndex].close);
    const exit = tick(bars[exitIndex].close);
    const points = (exit - entry) * (side === "long" ? 1 : -1);
    return {
      id: i + 1,
      side,
      contracts,
      entryIndex,
      exitIndex,
      entry,
      exit,
      points,
      pnl: points * contracts * POINT_VALUE,
    };
  },
);

export default function TradeJournalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const locale = i18n.language;
  const chart = useRef<TradingChartHandle>(null);
  const [shown, setShown] = useState<Trade | null>(null);

  const markers = useMemo(
    (): TradingMarker[] =>
      TRADES.flatMap((trade) => [
        {
          id: `in-${trade.id}`,
          time: bars[trade.entryIndex].time,
          price: trade.entry,
          side: trade.side === "long" ? "buy" : "sell",
          text: t("entryMarker", { id: trade.id }),
        },
        {
          id: `out-${trade.id}`,
          time: bars[trade.exitIndex].time,
          price: trade.exit,
          side: trade.side === "long" ? "sell" : "buy",
          color: "var(--text-secondary-color)",
          text: t("exitMarker"),
        },
      ]),
    [t],
  );

  const points = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });
  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const usd = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  });
  const date = new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const integer = new Intl.NumberFormat(locale);

  const show = (trade: Trade) => {
    // a little context on each side of the trade
    chart.current?.setVisibleTimeRange({
      from: bars[Math.max(0, trade.entryIndex - 12)].time,
      to: bars[Math.min(bars.length - 1, trade.exitIndex + 12)].time,
    });
    chart.current?.setCrosshair(bars[trade.entryIndex].time, trade.entry);
    setShown(trade);
  };

  const wins = TRADES.filter((trade) => trade.pnl > 0);
  const losses = TRADES.filter((trade) => trade.pnl <= 0);
  const gross = (list: Trade[]) =>
    list.reduce((sum, trade) => sum + trade.pnl, 0);
  const net = gross(TRADES);
  const profitFactor = losses.length
    ? gross(wins) / Math.abs(gross(losses))
    : Infinity;
  const tone = (value: number) =>
    value > 0
      ? "var(--success-color)"
      : value < 0
        ? "var(--danger-color)"
        : undefined;

  const columns: TableColumn<Trade>[] = [
    { key: "id", header: "#", render: (trade) => trade.id },
    {
      key: "side",
      header: t("journalSide"),
      render: (trade) => (
        <Tag color={trade.side === "long" ? "success" : "danger"} size="small">
          {trade.side === "long" ? t("long") : t("short")}
        </Tag>
      ),
    },
    {
      key: "entry",
      header: t("journalEntry"),
      render: (trade) =>
        t("atTime", {
          price: price.format(trade.entry),
          time: date.format(bars[trade.entryIndex].time),
        }),
    },
    {
      key: "exit",
      header: t("journalExit"),
      render: (trade) => price.format(trade.exit),
      align: "right",
    },
    {
      key: "points",
      header: t("journalPoints"),
      align: "right",
      render: (trade) => (
        <span style={{ color: tone(trade.points) }}>
          {points.format(trade.points)}
        </span>
      ),
    },
    {
      key: "pnl",
      header: t("journalPnl"),
      align: "right",
      render: (trade) => (
        <span style={{ color: tone(trade.pnl) }}>{usd.format(trade.pnl)}</span>
      ),
    },
    {
      key: "show",
      header: "",
      align: "right",
      render: (trade) => (
        <Button
          size="small"
          variant="ghost"
          aria-label={t("showTradeLabel", { id: trade.id })}
          onClick={() => show(trade)}
        >
          {t("showTrade")}
        </Button>
      ),
    },
  ];

  const stat = (label: string, value: string, color?: string) => (
    <div style={{ display: "grid", gap: 2 }}>
      <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
        {label}
      </span>
      <strong style={{ color, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </strong>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
        }}
      >
        {stat(t("netPnl"), usd.format(net), tone(net))}
        {stat(
          t("winRate"),
          t("winRateValue", {
            rate: percent.format(wins.length / TRADES.length),
            wins: integer.format(wins.length),
            total: integer.format(TRADES.length),
          }),
        )}
        {stat(
          t("profitFactor"),
          Number.isFinite(profitFactor) ? decimal.format(profitFactor) : "∞",
        )}
        {stat(
          t("averageWin"),
          wins.length ? usd.format(gross(wins) / wins.length) : "–",
        )}
        {stat(
          t("averageLoss"),
          losses.length ? usd.format(gross(losses) / losses.length) : "–",
        )}
      </div>
      <TradingChart
        ref={chart}
        bars={bars}
        timeframe="15m"
        symbol={t("es")}
        precision={2}
        timeZone="UTC"
        sessionBreaks
        markers={markers}
        ariaLabel={t("journalAria")}
        height={380}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {shown
          ? t("showingTrade", {
              id: shown.id,
              side: shown.side === "long" ? t("long") : t("short"),
              contracts: integer.format(shown.contracts),
              pnl: usd.format(shown.pnl),
            })
          : t("journalHint")}
      </output>
      <Table
        aria-label={t("journalTable")}
        columns={columns}
        data={TRADES}
        rowKey={(trade) => trade.id}
        size="small"
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```

## Example: Volume profile

volumeProfile draws the volume traded at each price over the visible bars (rising bars, then falling bars), with the point of control and the value area holding 70% of the volume. It follows scrolling and zooming; the line below is computed with the pure volumeProfile function.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/demos/volume-profile.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import {
  TradingChart,
  type TradingVisibleRange,
  type TradingVolumeProfileOptions,
} from "minerva-design/charts";
import { volumeProfile } from "minerva-design/charts/core";
import { MINUTE, generateColumns } from "../data";

// two weeks of 15-minute bars
const bars = generateColumns({
  count: 1_344,
  timeframe: 15 * MINUTE,
  seed: 77,
  price: 63_400,
  volatility: 0.0028,
  volume: 120,
});

const ROWS = [24, 48, 96] as const;

export default function VolumeProfileDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.trading-chart.data",
  });
  const [enabled, setEnabled] = useState(true);
  const [rows, setRows] = useState<number>(48);
  const [side, setSide] = useState<"right" | "left">("right");
  const [range, setRange] = useState<{ from: number; to: number } | null>(null);

  const profileOptions = useMemo(
    (): TradingVolumeProfileOptions => ({ rows, side }),
    [rows, side],
  );

  // the same numbers as the chart, from the pure function
  const summary = useMemo(() => {
    if (!range) return null;
    const profile = volumeProfile(bars, { ...range, rows });
    if (profile.poc < 0) return null;
    const price = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    const at = (row: number) => profile.low + row * profile.step;
    return t("profileStatus", {
      poc: price.format(at(profile.poc + 0.5)),
      low: price.format(at(profile.valueAreaFrom)),
      high: price.format(at(profile.valueAreaTo + 1)),
    });
  }, [range, rows, t, i18n.language]);

  const onRange = (visible: TradingVisibleRange) => {
    const from = Math.max(0, Math.ceil(visible.from));
    const to = Math.min(bars.close.length - 1, Math.floor(visible.to));
    setRange((current) =>
      current && current.from === from && current.to === to
        ? current
        : { from, to },
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 20,
          fontSize: 13,
        }}
      >
        <Switch
          size="small"
          checked={enabled}
          onChange={setEnabled}
          label={t("volumeProfile")}
        />
        <RadioGroup
          aria-label={t("profileRows")}
          direction="horizontal"
          value={String(rows)}
          onChange={(value) => setRows(Number(value))}
        >
          {ROWS.map((count) => (
            <Radio
              key={count}
              value={String(count)}
              label={t("rowCount", { count })}
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("profileSide")}
          direction="horizontal"
          value={side}
          onChange={(value) => setSide(value as "right" | "left")}
        >
          <Radio value="right" label={t("sides.right")} />
          <Radio value="left" label={t("sides.left")} />
        </RadioGroup>
      </div>
      <TradingChart
        bars={bars}
        timeframe="15m"
        symbol={t("btc")}
        volumeProfile={enabled ? profileOptions : false}
        indicators={[{ type: "volume", overlay: true }]}
        onVisibleRangeChange={onRange}
        barSpacing={5}
        precision={0}
        ariaLabel={t("profileAria")}
        height={460}
      />
      <span
        role="status"
        style={{ fontSize: 13, color: "var(--text-secondary-color)" }}
      >
        {summary}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/trading-chart/data.ts

```tsx
// Market data of the trading chart demos: a seeded random walk with
// volatility clusters, trends, sessions (weekends, exchange hours) and
// volumes that grow with the moves, plus a simulated trade feed.
import type { TradingBar, TradingBarColumns } from "minerva-design/charts";

export const MINUTE = 60_000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal numbers (Box-Muller) */
const gaussian = (random: () => number) => () => {
  const u = Math.max(1e-12, random());
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
};

export interface MarketOptions {
  /** Number of bars */
  count: number;
  /** Bar duration in ms */
  timeframe: number;
  seed?: number;
  /** First price */
  price?: number;
  /** Typical move of a bar (fraction of the price) */
  volatility?: number;
  /** Typical volume of a bar */
  volume?: number;
  /** `crypto` trades 24/7, `stock` on weekdays (9:30-16:00 for intraday bars) */
  market?: "crypto" | "stock";
  /** Time of the first bar */
  start?: number;
}

const inSession = (
  time: number,
  timeframe: number,
  market: "crypto" | "stock",
) => {
  if (market === "crypto") return true;
  const date = new Date(time);
  const weekday = date.getUTCDay();
  if (weekday === 0 || weekday === 6) return false;
  if (timeframe >= DAY) return true;
  const minutes = date.getUTCHours() * 60 + date.getUTCMinutes();
  // 9:30 to 16:00 (the times are written in exchange time)
  return minutes >= 570 && minutes < 960;
};

/** Bars as typed-array columns: fast for very long histories */
export function generateColumns(
  options: MarketOptions,
): Required<TradingBarColumns> {
  const {
    count,
    timeframe,
    seed = 1,
    price = 100,
    volatility = 0.004,
    volume = 1000,
    market = "crypto",
    start = Date.UTC(2025, 0, 6),
  } = options;
  const random = mulberry32(seed);
  const normal = gaussian(random);
  const columns = {
    time: new Float64Array(count),
    open: new Float64Array(count),
    high: new Float64Array(count),
    low: new Float64Array(count),
    close: new Float64Array(count),
    volume: new Float64Array(count),
  };
  let last = price;
  let variance = volatility * volatility;
  let drift = 0;
  let time = start;
  for (let i = 0; i < count; i++) {
    while (!inSession(time, timeframe, market)) time += timeframe;
    // trends that last a while, and volatility clusters (GARCH-like); the
    // price is slowly pulled back to its start so long histories stay in range
    if (random() < 0.01) drift = normal() * volatility * 0.06;
    const pull = -Math.log(last / price) * volatility * 0.02;
    const sigma = Math.sqrt(variance);
    const open = last * (1 + normal() * sigma * 0.05);
    let p = open;
    let high = open;
    let low = open;
    for (let step = 0; step < 4; step++) {
      p *= Math.exp((drift + pull) / 4 + (normal() * sigma) / 2);
      if (p > high) high = p;
      if (p < low) low = p;
    }
    const close = p;
    high *= 1 + Math.abs(normal()) * sigma * 0.25;
    low *= 1 - Math.abs(normal()) * sigma * 0.25;
    const move = Math.log(close / last);
    variance =
      volatility * volatility * 0.05 + 0.12 * move * move + 0.83 * variance;
    columns.time[i] = time;
    columns.open[i] = open;
    columns.high[i] = high;
    columns.low[i] = low;
    columns.close[i] = close;
    columns.volume[i] =
      volume *
      (0.4 + random() * 0.8) *
      (1 + (Math.abs(move) / volatility) * 0.8);
    last = close;
    time += timeframe;
  }
  return columns;
}

/** Bars as objects, prices rounded to `decimals` */
export function generateBars(
  options: MarketOptions,
  decimals = 2,
): TradingBar[] {
  const c = generateColumns(options);
  const k = 10 ** decimals;
  const round = (v: number) => Math.round(v * k) / k;
  return Array.from(c.time, (time, i) => ({
    time,
    open: round(c.open[i]),
    high: round(c.high[i]),
    low: round(c.low[i]),
    close: round(c.close[i]),
    volume: Math.round(c.volume[i]),
  }));
}

/** A simulated trade feed: each call returns the next trade */
export function createTradeFeed(
  seed: number,
  price: number,
  volatility = 0.00025,
) {
  const random = mulberry32(seed);
  const normal = gaussian(random);
  let last = price;
  let drift = 0;
  return () => {
    if (random() < 0.02) drift = normal() * volatility * 0.2;
    last *= Math.exp(drift + normal() * volatility);
    const size = Math.round((0.002 + random() ** 3 * 2) * 1e4) / 1e4;
    return {
      price: last,
      size,
      side: random() < 0.5 ? ("buy" as const) : ("sell" as const),
    };
  };
}

```
