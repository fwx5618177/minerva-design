# Time and sales

A trade tape: newest trades on top, sliding in and flashing, large trades bold and tinted, same-millisecond sweeps merged, size filters and a pause while hovered. Typed-array rings keep 200,000 trades; only the visible rows are drawn.

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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
