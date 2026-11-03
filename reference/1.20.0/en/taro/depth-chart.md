# Depth chart

Cumulative depth of an order book: stepped bid and ask areas around the mid price, a mirrored hover readout of amount, cost and average price, zoom around the mid and eased updates at hundreds of deltas per second.

Package: minerva-design@1.20.0

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT order book depth

Live stream

Visible range

Fit

±{{value}}

Cumulate

Size (BTC)

Notional (USDT)

Curve

Steps

Linear

Ctrl/⌘ + wheel or pinch to zoom around the mid, double click to reset.

Zoomed to {{value}}

My bid

My ask

Liquidation

Color convention

Red up, green down

Green up, red down

Buying {{amount}} BTC ({{total}}) sweeps the asks up to {{price}}, {{slippage}} above the mid: average price {{average}}.

Selling {{amount}} BTC ({{total}}) sweeps the bids down to {{price}}, {{slippage}} below the mid: average price {{average}}.

Hover the curves to price a market order.

Side

Market buy

Market sell

Order size

{{value}} BTC

Avg. fill

Last fill

{{size}} BTC fill across {{levels}} levels: average {{average}}, last fill {{worst}}, {{cost}} in total, {{slippage}} bp from the mid.

Only {{filled}} of {{size}} BTC rest on this side: the order would empty all {{levels}} levels, out to {{worst}}.

Measured band

Within {{band}}: {{bids}} BTC bid, {{asks}} BTC offered, imbalance {{imbalance}} · spread {{spread}} ({{spreadBp}} bp)

Waiting for the first reading…

Cumulate dollars (price × shares)

Notional (USD)

Shares

ACME stock order book depth

Consolidated

Venue {{name}}

Venue

Best bid

Best ask

BTC within ±0.1%

{{value}} ({{share}})

BTC/USDT depth, {{name}}

Best prices and liquidity by venue

## DepthChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
