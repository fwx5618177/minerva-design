# Depth chart

Cumulative depth of an order book: stepped bid and ask areas around the mid price, a mirrored hover readout of amount, cost and average price, zoom around the mid and eased updates at hundreds of deltas per second.

Package: minerva-design@1.24.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.1",
  "sourceCommit": "0842512112df9e117f4b9efce6a8b1ba91350d24",
  "sourceDigest": "sha256:ddf24b058620a47363c171d7a5d941ded5095e4c61225ecdcd3c9a4f29932128",
  "referenceSourceDigest": "sha256:c18f38eab1217f616ad8f6be5a8e5115f531c7c7825f7faf41778d9ee752ae17"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.1/types.json) or getType() from minerva-design/contracts.

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

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
