# Trading chart

A professional trading terminal chart: candles over a gap-free time axis, indicator panes, drawing tools, order lines and real-time streaming, drawn on the GPU and smooth with a million bars.

Package: minerva-design@1.20.6

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
