# Order book

A canvas price ladder: asks above the spread row, bids below, with depth bars, price grouping, flashes on changed levels, large order highlight and a cumulative hover summary. Hundreds of updates a second cost one draw per frame.

Package: minerva-design@1.22.0

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT order book

### Order book

BTC/USDT

Price (USDT)

Size (BTC)

Total (BTC)

Update rate

{{value}} / s

{{updates}} messages/s · {{levels}} level changes/s

Price step

Depth bars

Cumulative

Per level

Large order threshold

≥ {{value}} BTC

Bid {{price}}: {{size}} BTC, {{sum}} BTC down to here

Ask {{price}}: {{size}} BTC, {{sum}} BTC up to here

Click a level to pick its price.

Sides

Both

Bids

Asks

Color convention

Red up, green down

Green up, red down

{{value}} since open

Limit price: {{price}}

Limit

Depth

BTC/USDT depth

Trades

BTC/USDT trades

Market

Crypto · BTC/USDT

Price (USDT)

Size (BTC)

Total (BTC)

BTC/USDT order book

Equity · AAPL

Price (USD)

Shares

Total

AAPL order book

FX · EUR/USD

Rate

Size (EUR)

Total (EUR)

EUR/USD order book

Futures · ES

Price (pts)

Contracts

Total

E-mini S&P 500 futures order book

{{value}} pips

{{value}} ¢

{{value}} ticks

{{value}} USDT

Tick size {{tick}} · spread {{spread}} · highlighted from {{large}}

Walls

New

Pulled

Filled

Walls ≥ {{size}} BTC: {{resting}} resting, {{filled}} filled, {{pulled}} pulled ({{ratio}} pulled)

Watching the book for walls…

Bid wall {{price}}: {{size}} BTC

Ask wall {{price}}: {{size}} BTC

after {{value}}

Limit order

Side

Buy

Sell

Limit price (USDT)

Quantity (BTC)

Enter a price and a quantity, or click a level.

Fills {{filled}} BTC at once, average {{average}}.

Fills {{filled}} BTC at once (average {{average}}), {{rest}} BTC rests at {{price}}.

Rests at {{price}} behind {{ahead}} BTC.

{{side}}

{{side}} {{size}} BTC at {{price}} placed.

Order at {{price}} cancelled.

{{side}} {{size}} @ {{price}}

No open orders.

Cancel order

## OrderBook

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
