# Time and sales

A trade tape: newest trades on top, sliding in and flashing, large trades bold and tinted, same-millisecond sweeps merged, size filters and a pause while hovered. Typed-array rings keep 200,000 trades; only the visible rows are drawn.

Package: minerva-design@1.20.4

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT trades

Bought {{size}} BTC at {{price}}

Sold {{size}} BTC at {{price}}

Paused while hovered: move away (or click the badge) to resume.

Hover the tape to pause it, click a row to pick a trade.

Large trade threshold

≥ {{value}} BTC

Minimum size

All

Merge same-millisecond sweeps

Color prices by tick

{{value}} rows kept

Color convention

Red up, green down

Green up, red down

Add {{value}} trades

{{rows}} trades, last batch in {{ms}} ms

Rolling window

Last {{value}}

VWAP

Bought share

Bought

Sold

{{value}} BTC

Trades / s

Largest print

Buy {{size}} at {{price}}

Sell {{size}} at {{price}}

Buyers are lifting the offer.

Sellers are hitting the bid.

Buy and sell flow are balanced.

Waiting for trades…

Time zone

Local

UTC

New York

Tokyo

Time ({{zone}})

Blocks ≥ {{value}} BTC

Clear

{{value}} blocks since the start

Waiting for a block trade…

Buy

Sell

{{time}} · {{size}} BTC at {{price}} ≈ {{notional}}

{{value}} prints

{{count}} trades · {{size}} BTC

Buys

Sells

BTC/USDT buy trades

BTC/USDT sell trades

Net flow: {{value}} BTC (bought − sold)

## TimeAndSales

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
