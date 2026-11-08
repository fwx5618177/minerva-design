# Trading chart

A professional trading terminal chart: candles over a gap-free time axis, indicator panes, drawing tools, order lines and real-time streaming, drawn on the GPU and smooth with a million bars.

Package: minerva-design@1.23.2

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean",
    "required": false,
    "description": "Legends with the values at the crosshair and the indicator toggles (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "grid",
    "type": "boolean",
    "required": false,
    "description": "Grid lines (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "lastPriceLine",
    "type": "boolean",
    "required": false,
    "description": "Line and axis label at the last price (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "sessionBreaks",
    "type": "boolean",
    "required": false,
    "description": "Dashed vertical lines where a day starts (intraday bars; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "countdown",
    "type": "boolean",
    "required": false,
    "description": "Time left until the current bar closes, under the last price label (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "highLowMarkers",
    "type": "boolean",
    "required": false,
    "description": "Marks the highest and lowest prices of the visible bars (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "orderEntry",
    "type": "boolean",
    "required": false,
    "description": "A \"+\" button at the crosshair price reporting a limit order (`orderCreate`); with the chart focused, `B` / `S` arm a keyboard order (arrows move it, Enter confirms, Escape cancels; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "volumeProfile",
    "type": "boolean | TradingVolumeProfileOptions",
    "required": false,
    "description": "Volume by price of the visible bars, with its point of control and value area (`true` for the defaults; default `false`)",
    "typeText": "boolean | TradingVolumeProfileOptions"
  },
  {
    "name": "keepDrawingMode",
    "type": "boolean",
    "required": false,
    "description": "Keeps the drawing tool after a drawing is made (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "drawingToolbar",
    "type": "boolean",
    "required": false,
    "description": "Floating toolbar over the selected drawing: color, width, style, fill, lock, delete (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "autoscaleIncludesDrawings",
    "type": "boolean",
    "required": false,
    "description": "The automatic price scale also fits the visible drawings of each pane (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "kineticScroll",
    "type": "boolean",
    "required": false,
    "description": "Keeps panning after a quick drag (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "symbol",
    "type": "string",
    "required": false,
    "description": "Name shown in the legend and the accessible label (`\"BTC/USDT\"`)",
    "typeText": "string"
  },
  {
    "name": "labels",
    "type": "Partial<TradingChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<TradingChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the bars and lines: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "crosshair",
    "type": "TradingCrosshairMode",
    "required": false,
    "description": "Crosshair behaviour (default `magnet`)",
    "typeText": "TradingCrosshairMode"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label; built from the symbol by default",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Locale of the texts, numbers and dates (`\"zh-CN\"`); the page language by default",
    "typeText": "string"
  },
  {
    "name": "bars",
    "type": "TradingBarsInput",
    "required": false,
    "description": "Bars, oldest first; replaced when a new array / object is passed (stream with the handle's `update`)",
    "typeText": "TradingBarsInput"
  },
  {
    "name": "priceLines",
    "type": "readonly TradingPriceLine[]",
    "required": false,
    "description": "Order, position, take profit / stop loss and alert lines",
    "typeText": "readonly TradingPriceLine[]"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of rising bars (any CSS color, `var(--x)` included)",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of falling bars",
    "typeText": "string"
  },
  {
    "name": "colorConvention",
    "type": "TradingColorConvention",
    "required": false,
    "description": "Colors of rising / falling bars: `redUp` swaps the defaults, `auto` follows the market convention of the `locale` (red up for CN, TW, JP, KR; default `greenUp`)",
    "typeText": "TradingColorConvention"
  },
  {
    "name": "formatPrice",
    "type": "((price: number) => string)",
    "required": false,
    "description": "Formats the prices (axis, legend, labels); overrides `precision`",
    "typeText": "((price: number) => string)"
  },
  {
    "name": "precision",
    "type": "number",
    "required": false,
    "description": "Decimals of the prices; detected from the data by default",
    "typeText": "number"
  },
  {
    "name": "timeZone",
    "type": "string",
    "required": false,
    "description": "Time zone of the time axis, the session breaks and the VWAP periods (IANA name such as `\"America/New_York\"`, or `\"UTC\"`); local time by default",
    "typeText": "string"
  },
  {
    "name": "indicators",
    "type": "readonly TradingIndicator[]",
    "required": false,
    "description": "Indicators, over the price or in panes below it, in this order",
    "typeText": "readonly TradingIndicator[]"
  },
  {
    "name": "timeframe",
    "type": "TradingTimeframe",
    "required": false,
    "description": "Duration of a bar; inferred from the bar times by default",
    "typeText": "TradingTimeframe"
  },
  {
    "name": "chartStyle",
    "type": "TradingChartStyle",
    "required": false,
    "description": "How the bars are drawn (default `candles`)",
    "typeText": "TradingChartStyle"
  },
  {
    "name": "scaleMode",
    "type": "TradingScaleMode",
    "required": false,
    "description": "Price scale of the price pane (default `linear`)",
    "typeText": "TradingScaleMode"
  },
  {
    "name": "utcOffset",
    "type": "number",
    "required": false,
    "description": "Offset of the displayed times from UTC, in minutes (`480` for UTC+8); overrides `timeZone`",
    "typeText": "number"
  },
  {
    "name": "markers",
    "type": "readonly TradingMarker[]",
    "required": false,
    "description": "Buy / sell markers",
    "typeText": "readonly TradingMarker[]"
  },
  {
    "name": "compare",
    "type": "readonly TradingCompareSeries[]",
    "required": false,
    "description": "Comparison series (best read with `scaleMode: \"percent\"`)",
    "typeText": "readonly TradingCompareSeries[]"
  },
  {
    "name": "drawings",
    "type": "readonly TradingDrawing[]",
    "required": false,
    "description": "Drawings; replaced when a new array is passed (see the `drawingsChange` event)",
    "typeText": "readonly TradingDrawing[]"
  },
  {
    "name": "drawingMode",
    "type": "TradingDrawingTool",
    "required": false,
    "description": "Active drawing tool (default `cursor`)",
    "typeText": "TradingDrawingTool"
  },
  {
    "name": "baselinePrice",
    "type": "number",
    "required": false,
    "description": "Price of the `baseline` style; the close of the first visible bar by default",
    "typeText": "number"
  },
  {
    "name": "rightOffset",
    "type": "number",
    "required": false,
    "description": "Empty space after the last bar, in bars (default 8)",
    "typeText": "number"
  },
  {
    "name": "barSpacing",
    "type": "number",
    "required": false,
    "description": "Initial width of a bar, in pixels (default 8)",
    "typeText": "number"
  },
  {
    "name": "wheel",
    "type": "\"zoom\" | \"none\" | \"modifier\"",
    "required": false,
    "description": "Mouse wheel: `zoom`, `modifier` (zoom with Ctrl / ⌘ only) or `none` (default `zoom`)",
    "typeText": "\"zoom\" | \"none\" | \"modifier\""
  },
  {
    "name": "watermark",
    "type": "string",
    "required": false,
    "description": "Large faint text behind the bars (`\"BTCUSDT · 1H\"`)",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "click",
    "type": "[event: TradingClickEvent]",
    "typeText": "[event: TradingClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "crosshairMove",
    "type": "[event: TradingCrosshairEvent | null]",
    "typeText": "[event: TradingCrosshairEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingCrosshairEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibleRangeChange",
    "type": "[range: TradingVisibleRange]",
    "typeText": "[range: TradingVisibleRange]",
    "parameters": [
      {
        "name": "range",
        "position": 0,
        "typeText": "TradingVisibleRange",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderMove",
    "type": "[event: TradingOrderMoveEvent]",
    "typeText": "[event: TradingOrderMoveEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderMoveEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCreate",
    "type": "[event: TradingOrderCreateEvent]",
    "typeText": "[event: TradingOrderCreateEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderCreateEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCancel",
    "type": "[event: TradingOrderCancelEvent]",
    "typeText": "[event: TradingOrderCancelEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderCancelEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingsChange",
    "type": "[drawings: readonly TradingDrawing[]]",
    "typeText": "[drawings: readonly TradingDrawing[]]",
    "parameters": [
      {
        "name": "drawings",
        "position": 0,
        "typeText": "readonly TradingDrawing[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingSelect",
    "type": "[id: string | null]",
    "typeText": "[id: string | null]",
    "parameters": [
      {
        "name": "id",
        "position": 0,
        "typeText": "string | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingToolChange",
    "type": "[tool: TradingDrawingTool]",
    "typeText": "[tool: TradingDrawingTool]",
    "parameters": [
      {
        "name": "tool",
        "position": 0,
        "typeText": "TradingDrawingTool",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "undoChange",
    "type": "[state: TradingUndoState]",
    "typeText": "[state: TradingUndoState]",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "typeText": "TradingUndoState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "replayChange",
    "type": "[state: TradingReplayState]",
    "typeText": "[state: TradingReplayState]",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "typeText": "TradingReplayState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "fullscreenChange",
    "type": "[fullscreen: boolean]",
    "typeText": "[fullscreen: boolean]",
    "parameters": [
      {
        "name": "fullscreen",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "indicatorToggle",
    "type": "[event: TradingIndicatorToggleEvent]",
    "typeText": "[event: TradingIndicatorToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingIndicatorToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "historyRequest",
    "type": "[event: TradingHistoryRequestEvent]",
    "typeText": "[event: TradingHistoryRequestEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingHistoryRequestEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: candles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/vue/candles.vue

```vue
<script setup lang="ts">
// <TradingChart>: candles on a gap-free time axis with moving averages over
// the price, volume and RSI panes below; the texts, numbers and dates
// follow the page language.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TradingChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { watermark: "ACME · 1D" },
  zh: { watermark: "ACME · 日线" },
  ja: { watermark: "ACME · 日足" },
  fr: { watermark: "ACME · 1 J" },
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

const indicators = [
  { type: "ma", period: 20 },
  { type: "ma", period: 50 },
  { type: "volume" },
  { type: "rsi", period: 14 },
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <TradingChart
    :bars="BARS"
    symbol="ACME"
    timeframe="1D"
    :indicators="indicators"
    :watermark="text.watermark"
  />
</template>

```

## Example: streaming

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/vue/streaming.vue

```vue
<script setup lang="ts">
// Real-time streaming: the handle's `update(bar)` replaces the last bar
// (same time) or appends one (a later time) on every tick, without passing
// the whole data set again; the countdown shows when the bar closes.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/vue/charts";

const TEXT = {
  en: { watermark: "ACME · 1m · live" },
  zh: { watermark: "ACME · 1 分钟 · 实时" },
  ja: { watermark: "ACME · 1 分足 · ライブ" },
  fr: { watermark: "ACME · 1 min · direct" },
};

// 120 one-minute bars, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 120 }, (_, i) => {
  const open = close;
  close = round(
    open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
  );
  return {
    time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
    open,
    high: round(Math.max(open, close) + 0.1),
    low: round(Math.min(open, close) - 0.1),
    close,
    volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
  };
});

// the next state of the last bar: a tick moves its close, every 10th
// tick opens a new bar (a later time is appended by `update`)
const nextBar = (last: TradingBar, tick: number): TradingBar => {
  const close = round(
    last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
  );
  return tick % 10 === 0
    ? {
        time: last.time + 60_000,
        open: last.close,
        high: Math.max(last.close, close),
        low: Math.min(last.close, close),
        close,
        volume: 40,
      }
    : {
        ...last,
        high: Math.max(last.high, close),
        low: Math.min(last.low, close),
        close,
        volume: (last.volume ?? 0) + 25,
      };
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const chart = ref<TradingChartHandle>();
let last: TradingBar = BARS[BARS.length - 1];
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    last = nextBar(last, tick);
    chart.value?.update(last);
  }, 500);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <TradingChart
    ref="chart"
    :bars="BARS"
    symbol="ACME"
    timeframe="1m"
    :indicators="[{ type: 'ema', period: 9 }, { type: 'volume' }]"
    countdown
    :watermark="text.watermark"
    :height="400"
  />
</template>

```
