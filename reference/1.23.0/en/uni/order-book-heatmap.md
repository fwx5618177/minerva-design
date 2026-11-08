# Order book heatmap

Bookmap-style liquidity heatmap: resting size by time and price drawn by the GPU, best bid and ask lines, trades as bubbles sized by volume, a profile of the current book, zoom, pan and a crosshair readout. Streams append one column per interval in a sliding window.

Package: minerva-design@1.23.0

Renderer: uni

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

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
