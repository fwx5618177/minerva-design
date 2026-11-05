# Order book

A canvas price ladder: asks above the spread row, bids below, with depth bars, price grouping, flashes on changed levels, large order highlight and a cumulative hover summary. Hundreds of updates a second cost one draw per frame.

Package: minerva-design@1.21.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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
