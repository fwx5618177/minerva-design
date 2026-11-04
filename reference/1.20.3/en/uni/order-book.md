# Order book

A canvas price ladder: asks above the spread row, bids below, with depth bars, price grouping, flashes on changed levels, large order highlight and a cumulative hover summary. Hundreds of updates a second cost one draw per frame.

Package: minerva-design@1.20.3

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
