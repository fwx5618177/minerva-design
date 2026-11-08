# Time and sales

A trade tape: newest trades on top, sliding in and flashing, large trades bold and tinted, same-millisecond sweeps merged, size filters and a pause while hovered. Typed-array rings keep 200,000 trades; only the visible rows are drawn.

Package: minerva-design@1.23.1

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "TimeAndSales"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "trades",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "array",
    "typeText": "readonly MarketTrade[] | undefined",
    "typeRef": "type:edf3d4fed366b73e5f82",
    "required": false,
    "description": "Trades, oldest first; when the array grows, only the appended ones are added (other changes replace the tape)"
  },
  {
    "name": "capacity",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 200000,
    "required": false,
    "description": "Trades kept (older ones are dropped)"
  },
  {
    "name": "rowHeight",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 20,
    "required": false,
    "description": "Height of a row, in pixels"
  },
  {
    "name": "columns",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "array",
    "typeText": "readonly TimeAndSalesColumn[] | undefined",
    "typeRef": "type:5b7fc37779cc21e3693a",
    "required": false,
    "description": "Columns, left to right"
  },
  {
    "name": "minSize",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Hides the trades (after aggregation) smaller than this size"
  },
  {
    "name": "largeTradeThreshold",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Trades whose size reaches this value are bold and tinted (stronger as they grow)"
  },
  {
    "name": "aggregate",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges consecutive trades of the same side and millisecond (one aggressive order sweeping several levels) into one row: sizes summed, the last price"
  },
  {
    "name": "priceColor",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "side",
      "tick"
    ],
    "typeText": "\"side\" | \"tick\" | undefined",
    "typeRef": "type:97ad1d5b72e0340395e4",
    "default": "side",
    "required": false,
    "description": "Colors the price by aggressor side, or by tick (up / down from the previous trade)"
  },
  {
    "name": "pauseOnHover",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Freezes the rows while the pointer is over the tape (new trades are counted)"
  },
  {
    "name": "animate",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "New trades slide in and flash"
  },
  {
    "name": "header",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Header row with the column names"
  },
  {
    "name": "milliseconds",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Milliseconds in the default time format"
  },
  {
    "name": "timeZone",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "local",
      "utc"
    ],
    "typeText": "ChartTimeZone | undefined",
    "typeRef": "type:a7bc616e96964723adac",
    "default": "local",
    "required": false,
    "description": "Clock of the default time format: the local time or UTC (the clock of most exchanges)"
  },
  {
    "name": "formatTime",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "function",
    "typeText": "((time: number) => string) | undefined",
    "typeRef": "type:4c22ccd733bbe4832cfb",
    "parameters": [
      {
        "name": "time",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the time of a trade (replaces the default `HH:MM:SS.mmm`)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "object",
    "typeText": "Partial<TimeAndSalesLabels> | undefined",
    "typeRef": "type:39001f3ac97ee03a62e3",
    "required": false,
    "description": "Overrides of the built-in texts, which follow `locale` (English, Chinese, Japanese and French built in)"
  },
  {
    "name": "upColor",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the bids / buys (the \"up\" side); `--success-color` by default, `--danger-color` with the red-up convention"
  },
  {
    "name": "downColor",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the asks / sells (the \"down\" side); `--danger-color` by default, `--success-color` with the red-up convention"
  },
  {
    "name": "colorConvention",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "green-up",
      "red-up"
    ],
    "typeText": "OrderBookColorConvention | undefined",
    "typeRef": "type:77394ea34b116d6bc00a",
    "default": "green-up",
    "required": false,
    "description": "`red-up` swaps the default colors (red bids and buys, green asks and sells), the convention of mainland China, Japan and Korea"
  },
  {
    "name": "pricePrecision",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Decimals of the prices; inferred from the data when omitted"
  },
  {
    "name": "sizePrecision",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Decimals of the sizes; inferred from the data when omitted"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the numbers (`Intl.NumberFormat`, compact units such as k / 万) and of the built-in texts (English, Chinese, Japanese, French); the page language (`<html lang>`) when omitted"
  },
  {
    "name": "formatPrice",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "function",
    "typeText": "((price: number) => string) | undefined",
    "typeRef": "type:0aed560c4bb2bc3d696e",
    "parameters": [
      {
        "name": "price",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats a price (replaces `pricePrecision` / `locale`)"
  },
  {
    "name": "formatSize",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "function",
    "typeText": "((size: number) => string) | undefined",
    "typeRef": "type:ff37eb6d55e323c0b451",
    "parameters": [
      {
        "name": "size",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats a size (replaces `sizePrecision` / `locale`)"
  },
  {
    "name": "fontFamily",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Font family of the texts; the theme font when omitted (a monospace font gives aligned digits)"
  },
  {
    "name": "fontSize",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Font size of the texts, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the widget; the localized `labels.name` when omitted"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the widget; numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the widget; numbers are pixels"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((row: TimeAndSalesRowEvent | null) => void) | undefined",
    "typeRef": "type:0f249726aafc95343b2b",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TimeAndSalesRowEvent | null",
        "typeRef": "type:164626f00a66e9d1df9a"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Hovered row (`null` when the pointer leaves)"
  },
  {
    "name": "onTradeClick",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((row: TimeAndSalesRowEvent) => void) | undefined",
    "typeRef": "type:80abb06a095c45fe86b6",
    "parameters": [
      {
        "name": "row",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "TimeAndSalesRowEvent",
        "typeRef": "type:60a122159f8109824ff7"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Click / tap / Enter on a row"
  },
  {
    "name": "onPause",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((paused: boolean) => void) | undefined",
    "typeRef": "type:cbe80fb58587953548d8",
    "parameters": [
      {
        "name": "paused",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "The tape paused (pointer over it, scrolled down) or resumed"
  }
]
```

## API

```json
{
  "TimeAndSalesProps": {
    "source": "charts/src/react/orderbook.tsx",
    "description": "Props of `TimeAndSales`",
    "kind": "interface",
    "extends": [
      "TimeAndSalesOptions",
      "OrderBookWidgetProps"
    ],
    "props": [
      {
        "name": "trades",
        "type": "readonly MarketTrade[]",
        "required": false,
        "description": "Trades, oldest first; when the array grows, only the appended ones are added (other changes replace the tape)"
      },
      {
        "name": "onHover",
        "type": "(row: TimeAndSalesRowEvent | null) => void",
        "required": false,
        "description": "Hovered row (`null` when the pointer leaves)"
      },
      {
        "name": "onTradeClick",
        "type": "(row: TimeAndSalesRowEvent) => void",
        "required": false,
        "description": "Click / tap / Enter on a row"
      },
      {
        "name": "onPause",
        "type": "(paused: boolean) => void",
        "required": false,
        "description": "The tape paused (pointer over it, scrolled down) or resumed"
      },
      {
        "name": "ref",
        "type": "Ref<TimeAndSalesHandle>",
        "required": false,
        "description": "Imperative handle: `addTrades`, `setTrades`, `clear`, `scrollToLatest`"
      }
    ]
  },
  "TimeAndSalesHandle": {
    "source": "charts/src/react/orderbook.tsx",
    "description": "Imperative handle of `TimeAndSales`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "addTrades",
        "type": "(trades: MarketTrade | readonly MarketTrade[]) => void",
        "required": true,
        "description": "Appends trades (oldest first)"
      },
      {
        "name": "setTrades",
        "type": "(trades: readonly MarketTrade[]) => void",
        "required": true,
        "description": "Replaces every trade"
      },
      {
        "name": "clear",
        "type": "() => void",
        "required": true,
        "description": "Removes every trade"
      },
      {
        "name": "scrollToLatest",
        "type": "() => void",
        "required": true,
        "description": "Scrolls back to the newest trade and resumes"
      },
      {
        "name": "getInstance",
        "type": "() => TimeAndSalesInstance | null",
        "required": true,
        "description": "The underlying engine instance (minerva-design/charts/core)"
      }
    ]
  },
  "TimeAndSalesOptions": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Options of the time and sales tape",
    "kind": "interface",
    "extends": [
      "OrderBookCommonOptions"
    ],
    "props": [
      {
        "name": "capacity",
        "type": "number",
        "required": false,
        "default": "200000",
        "description": "Trades kept (older ones are dropped)"
      },
      {
        "name": "rowHeight",
        "type": "number",
        "required": false,
        "default": "20",
        "description": "Height of a row, in pixels"
      },
      {
        "name": "columns",
        "type": "readonly TimeAndSalesColumn[]",
        "required": false,
        "default": "[\"time\", \"price\", \"size\"]",
        "description": "Columns, left to right"
      },
      {
        "name": "minSize",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Hides the trades (after aggregation) smaller than this size"
      },
      {
        "name": "largeTradeThreshold",
        "type": "number",
        "required": false,
        "description": "Trades whose size reaches this value are bold and tinted (stronger as they grow)"
      },
      {
        "name": "aggregate",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Merges consecutive trades of the same side and millisecond (one aggressive order sweeping several levels) into one row: sizes summed, the last price"
      },
      {
        "name": "priceColor",
        "type": "\"side\" | \"tick\"",
        "required": false,
        "default": "\"side\"",
        "description": "Colors the price by aggressor side, or by tick (up / down from the previous trade)"
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Freezes the rows while the pointer is over the tape (new trades are counted)"
      },
      {
        "name": "animate",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "New trades slide in and flash"
      },
      {
        "name": "header",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Header row with the column names"
      },
      {
        "name": "milliseconds",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Milliseconds in the default time format"
      },
      {
        "name": "timeZone",
        "type": "ChartTimeZone",
        "required": false,
        "default": "\"local\"",
        "description": "Clock of the default time format: the local time or UTC (the clock of most exchanges)"
      },
      {
        "name": "formatTime",
        "type": "(time: number) => string",
        "required": false,
        "description": "Formats the time of a trade (replaces the default `HH:MM:SS.mmm`)"
      },
      {
        "name": "labels",
        "type": "Partial<TimeAndSalesLabels>",
        "required": false,
        "description": "Overrides of the built-in texts, which follow `locale` (English, Chinese, Japanese and French built in)"
      }
    ]
  },
  "OrderBookCommonOptions": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Options shared by the depth chart, order book, heatmap and time and sales",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "upColor",
        "type": "string",
        "required": false,
        "description": "Color of the bids / buys (the \"up\" side); `--success-color` by default, `--danger-color` with the red-up convention"
      },
      {
        "name": "downColor",
        "type": "string",
        "required": false,
        "description": "Color of the asks / sells (the \"down\" side); `--danger-color` by default, `--success-color` with the red-up convention"
      },
      {
        "name": "colorConvention",
        "type": "OrderBookColorConvention",
        "required": false,
        "default": "\"green-up\"",
        "description": "`red-up` swaps the default colors (red bids and buys, green asks and sells), the convention of mainland China, Japan and Korea"
      },
      {
        "name": "pricePrecision",
        "type": "number",
        "required": false,
        "description": "Decimals of the prices; inferred from the data when omitted"
      },
      {
        "name": "sizePrecision",
        "type": "number",
        "required": false,
        "description": "Decimals of the sizes; inferred from the data when omitted"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "description": "Locale of the numbers (`Intl.NumberFormat`, compact units such as k / 万) and of the built-in texts (English, Chinese, Japanese, French); the page language (`<html lang>`) when omitted"
      },
      {
        "name": "formatPrice",
        "type": "(price: number) => string",
        "required": false,
        "description": "Formats a price (replaces `pricePrecision` / `locale`)"
      },
      {
        "name": "formatSize",
        "type": "(size: number) => string",
        "required": false,
        "description": "Formats a size (replaces `sizePrecision` / `locale`)"
      },
      {
        "name": "fontFamily",
        "type": "string",
        "required": false,
        "description": "Font family of the texts; the theme font when omitted (a monospace font gives aligned digits)"
      },
      {
        "name": "fontSize",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Font size of the texts, in pixels"
      },
      {
        "name": "ariaLabel",
        "type": "string",
        "required": false,
        "description": "Accessible name of the widget; the localized `labels.name` when omitted"
      }
    ]
  },
  "OrderBookWidgetProps": {
    "source": "charts/src/react/orderbook.tsx",
    "description": "Container props shared by the order book components",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "description": "Height of the widget; numbers are pixels"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "\"100%\"",
        "description": "Width of the widget; numbers are pixels"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class of the container"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Style of the container"
      }
    ]
  },
  "TimeAndSalesLabels": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Texts of the time and sales tape (header, badges, accessible name), English defaults",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "string",
        "required": true,
        "default": "\"Time\""
      },
      {
        "name": "price",
        "type": "string",
        "required": true,
        "default": "\"Price\""
      },
      {
        "name": "size",
        "type": "string",
        "required": true,
        "default": "\"Size\""
      },
      {
        "name": "side",
        "type": "string",
        "required": true,
        "default": "\"Side\""
      },
      {
        "name": "buy",
        "type": "string",
        "required": true,
        "default": "\"Buy\""
      },
      {
        "name": "sell",
        "type": "string",
        "required": true,
        "default": "\"Sell\""
      },
      {
        "name": "paused",
        "type": "string",
        "required": true,
        "default": "\"Paused\"",
        "description": "Badge while the tape is paused, before the count of new trades"
      },
      {
        "name": "newTrades",
        "type": "string",
        "required": true,
        "default": "\"{count} new\"",
        "description": "Badge of the new trades while scrolled down (\"{count}\" is replaced)"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "default": "\"Time and sales\"",
        "description": "Accessible name (when `ariaLabel` is not set)"
      }
    ]
  },
  "TimeAndSalesRowEvent": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "A row of the tape",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "trade",
        "type": "MarketTrade",
        "required": true,
        "description": "The trade (aggregated rows sum the sizes and keep the last price)"
      },
      {
        "name": "count",
        "type": "number",
        "required": true,
        "description": "Trades merged into the row (1 without aggregation)"
      },
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Row from the top (0 = newest)"
      }
    ]
  },
  "MarketTrade": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "One executed trade (print) of the order book widgets",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Execution time (ms since epoch)"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Execution price"
      },
      {
        "name": "size",
        "type": "number",
        "required": true,
        "description": "Executed size (base units)"
      },
      {
        "name": "side",
        "type": "TradeSide",
        "required": true,
        "description": "Aggressor side: `buy` lifted an ask, `sell` hit a bid"
      }
    ]
  },
  "TimeAndSalesInstance": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Time and sales tape created by `createTimeAndSales`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "addTrades",
        "type": "(trades: MarketTrade | readonly MarketTrade[]) => void",
        "required": true,
        "description": "Appends trades (oldest first); drawn once at the next frame"
      },
      {
        "name": "setTrades",
        "type": "(trades: readonly MarketTrade[]) => void",
        "required": true,
        "description": "Replaces every trade (oldest first)"
      },
      {
        "name": "clear",
        "type": "() => void",
        "required": true,
        "description": "Removes every trade"
      },
      {
        "name": "setOptions",
        "type": "(options: TimeAndSalesOptions) => void",
        "required": true,
        "description": "Replaces the options"
      },
      {
        "name": "scrollToLatest",
        "type": "() => void",
        "required": true,
        "description": "Scrolls back to the newest trade and resumes"
      },
      {
        "name": "getCount",
        "type": "() => number",
        "required": true,
        "description": "Rows after filtering and aggregation"
      },
      {
        "name": "on",
        "type": "(event: K, handler: (payload: TimeAndSalesEventMap[K]) => void) => () => void",
        "required": true,
        "description": "Subscribes to an event; returns the unsubscribe function"
      },
      {
        "name": "resize",
        "type": "() => void",
        "required": true,
        "description": "Measures the container again (a ResizeObserver does it automatically)"
      },
      {
        "name": "destroy",
        "type": "() => void",
        "required": true,
        "description": "Removes the tape and its listeners"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic

trades takes the trades oldest first; the tape shows the newest on top. When the array grows (same items in front) only the new ones are added, otherwise the tape is replaced. The wheel or the scrollbar go through the history.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/basic.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales } from "minerva-design/charts";
import { createHistory } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  // the trades of the last minute, oldest first
  const [trades] = useState(() =>
    createHistory({ seed: 31 }, 60_000).updates.flatMap((u) => u.trades),
  );
  return (
    <TimeAndSales
      trades={trades}
      height={360}
      columns={["time", "price", "size", "side"]}
      pricePrecision={1}
      sizePrecision={4}
      ariaLabel={t("aria")}
    />
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Block trade alerts

Trades of the same side and millisecond (one sweep, as merged by aggregate) are summed: from 2 BTC they are logged with their average price and notional, and the same size is highlighted on the tape by largeTradeThreshold. Clear empties the tape through clear().

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/block-alerts.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import {
  TimeAndSales,
  type MarketTrade,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** A sweep of at least this size is a block trade (BTC) */
const BLOCK = 2;

interface Block {
  id: number;
  time: number;
  side: MarketTrade["side"];
  size: number;
  /** Average price of the sweep */
  price: number;
  /** Prints merged into the block */
  prints: number;
}

export default function BlockAlertsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [total, setTotal] = useState(0);
  const nextId = useRef(0);

  useMarketStream(
    boxRef,
    // whales: aggressive orders of several BTC sweeping the book
    { seed: 38, whales: 0.03 },
    {
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (!trades.length) return;
        tapeRef.current?.addTrades(trades);
        // the prints of one sweep share a side and a millisecond, like the
        // rows merged by aggregate
        const found: Block[] = [];
        let open: Block | null = null;
        for (const trade of trades) {
          if (open && open.time === trade.time && open.side === trade.side) {
            open.price =
              (open.price * open.size + trade.price * trade.size) /
              (open.size + trade.size);
            open.size += trade.size;
            open.prints++;
            continue;
          }
          if (open && open.size >= BLOCK) found.push(open);
          open = { id: 0, ...trade, prints: 1 };
        }
        if (open && open.size >= BLOCK) found.push(open);
        if (!found.length) return;
        for (const block of found) block.id = nextId.current++;
        setBlocks((list) => [...found.reverse(), ...list].slice(0, 5));
        setTotal((count) => count + found.length);
      },
    },
  );

  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const notional = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  });

  return (
    <div
      ref={boxRef}
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <TimeAndSales
        ref={tapeRef}
        height={360}
        columns={["time", "price", "size", "side"]}
        aggregate
        largeTradeThreshold={BLOCK}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <strong>{t("blocksTitle", { value: btc.format(BLOCK) })}</strong>
          <Button
            size="small"
            variant="outline"
            onClick={() => {
              tapeRef.current?.clear();
              setBlocks([]);
              setTotal(0);
            }}
          >
            {t("clearTape")}
          </Button>
        </div>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("blocksSeen", {
            value: new Intl.NumberFormat(locale).format(total),
          })}
        </span>
        <output
          aria-live="polite"
          style={{
            display: "grid",
            gap: 6,
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {blocks.length === 0 && (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("blocksWaiting")}
            </span>
          )}
          {blocks.map((block) => (
            <span
              key={block.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Tag color={block.side === "buy" ? "success" : "danger"}>
                {block.side === "buy" ? t("blockBuy") : t("blockSell")}
              </Tag>
              {t("blockLine", {
                time: clock.format(block.time),
                size: btc.format(block.size),
                price: usd.format(block.price),
                notional: notional.format(block.size * block.price),
              })}
              <span style={{ color: "var(--text-secondary-color)" }}>
                {t("blockPrints", {
                  value: new Intl.NumberFormat(locale).format(block.prints),
                })}
              </span>
            </span>
          ))}
        </output>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Time zones and custom formats

formatTime replaces the built-in clock (local or UTC) with any Intl.DateTimeFormat, here in another time zone with milliseconds; formatPrice shows dollars and labels.time names the zone in the header.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/clock.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TimeAndSales } from "minerva-design/charts";
import { createHistory } from "../../order-book/feed";

type Zone = "local" | "utc" | "newYork" | "tokyo";

const ZONES: { id: Zone; timeZone?: string }[] = [
  { id: "local" },
  { id: "utc", timeZone: "UTC" },
  { id: "newYork", timeZone: "America/New_York" },
  { id: "tokyo", timeZone: "Asia/Tokyo" },
];

export default function ClockDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const [zone, setZone] = useState<Zone>("utc");
  // the trades of the last minute, oldest first
  const [trades] = useState(() =>
    createHistory({ seed: 36 }, 60_000).updates.flatMap((u) => u.trades),
  );

  // the tape's own clock is local or UTC; formatTime shows any time zone,
  // in the page language, still with milliseconds
  const timeZone = ZONES.find((item) => item.id === zone)?.timeZone;
  const formatTime = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
      hourCycle: "h23",
      timeZone,
    });
    return (time: number) => format.format(time);
  }, [locale, timeZone]);
  const formatPrice = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => usd.format(value);
  }, [locale]);
  const zoneName = useMemo(() => {
    const parts = new Intl.DateTimeFormat(locale, {
      timeZone,
      timeZoneName: "short",
    }).formatToParts(trades.at(-1)?.time ?? 0);
    return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
  }, [locale, timeZone, trades]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("timeZone")}
        direction="horizontal"
        value={zone}
        onChange={(value) => setZone(value as Zone)}
      >
        {ZONES.map((item) => (
          <Radio key={item.id} value={item.id} label={t(`zones.${item.id}`)} />
        ))}
      </RadioGroup>
      <TimeAndSales
        trades={trades}
        height={340}
        columns={["time", "price", "size", "side"]}
        formatTime={formatTime}
        formatPrice={formatPrice}
        sizePrecision={4}
        // the header says which clock the times are in
        labels={{ time: t("timeIn", { zone: zoneName }) }}
        ariaLabel={t("aria")}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Compact (mobile)

A phone panel: 17 px rows, seconds only (milliseconds={false}) and merged sweeps. Below 240 px wide the texts shrink and the side column is dropped.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/compact.tsx

```tsx
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useMarketStream(
    boxRef,
    { seed: 36 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

  // phone-sized: seconds only, short rows; drag the scrollbar or swipe back
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <TimeAndSales
        ref={tapeRef}
        height={260}
        rowHeight={17}
        fontSize={11}
        milliseconds={false}
        aggregate
        pricePrecision={1}
        sizePrecision={3}
        ariaLabel={t("aria")}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Dark terminal

A terminal palette on the CSS variables of the container, a monospace font and tick coloring (green on an uptick, red on a downtick).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/dark.tsx

```tsx
import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

const TERMINAL = {
  "--background-color": "#0b0e11",
  "--surface-color": "#0b0e11",
  "--surface-elevated-color": "#1b2028",
  "--text-color": "#eaecef",
  "--text-secondary-color": "#848e9c",
  "--border-color": "#2b3139",
  "--success-color": "#0ecb81",
  "--danger-color": "#f6465d",
  "--primary-color": "#f0b90b",
  background: "#0b0e11",
  color: "#eaecef",
  borderRadius: 12,
  padding: "8px 4px 4px",
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useMarketStream(
    boxRef,
    { seed: 35, activity: 180 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <TimeAndSales
        ref={tapeRef}
        height={380}
        rowHeight={19}
        largeTradeThreshold={1}
        // tick coloring: green on an uptick, red on a downtick
        priceColor="tick"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Filters

minSize hides the rows smaller than a size (after aggregation); priceColor="tick" colors the price by its move from the previous trade. The kept history is filtered again on every change.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/filters.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Switch } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

const MIN_SIZES = [0, 0.01, 0.1, 1];

export default function FiltersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [minSize, setMinSize] = useState(0);
  const [aggregate, setAggregate] = useState(true);
  const [tick, setTick] = useState(false);
  const [count, setCount] = useState(0);
  const countedAt = useRef(0);
  useMarketStream(
    boxRef,
    { seed: 34, activity: 200 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (!trades.length) return;
        const tape = tapeRef.current;
        tape?.addTrades(trades);
        // the row count, four times a second
        const now = performance.now();
        if (now - countedAt.current < 250) return;
        countedAt.current = now;
        setCount(tape?.getInstance()?.getCount() ?? 0);
      },
    },
  );

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("minSize")}
        direction="horizontal"
        value={minSize}
        onChange={(value) => setMinSize(Number(value))}
      >
        {MIN_SIZES.map((value) => (
          <Radio
            key={value}
            value={value}
            label={
              value ? t("atLeast", { value: number.format(value) }) : t("all")
            }
          />
        ))}
      </RadioGroup>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <Switch
          checked={aggregate}
          onChange={(checked) => setAggregate(checked)}
          label={t("aggregate")}
        />
        <Switch
          checked={tick}
          onChange={(checked) => setTick(checked)}
          label={t("tickColors")}
        />
      </div>
      <TimeAndSales
        ref={tapeRef}
        height={340}
        // filters apply to the kept history too (up to `capacity` trades)
        minSize={minSize}
        aggregate={aggregate}
        priceColor={tick ? "tick" : "side"}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {t("rows", { value: number.format(count) })}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: 100,000 trades

The framework-free engine (createTimeAndSales from minerva-design/charts/core) stores the trades in typed-array rings: 100,000 load in milliseconds and every click adds 100,000 more, up to capacity. Only the visible rows are drawn.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/large-data.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  createTimeAndSales,
  type TimeAndSalesInstance,
  type MarketTrade,
} from "minerva-design/charts/core";
import { mulberry32 } from "../../order-book/feed";

/** `count` trades ending now: a random walk, sweeps sharing their millisecond */
function generate(
  count: number,
  seed: number,
  end = Date.now(),
): MarketTrade[] {
  const random = mulberry32(seed);
  const trades: MarketTrade[] = new Array(count);
  let price = 64000;
  let time = end - count * 12;
  for (let i = 0; i < count; i++) {
    if (random() > 0.3) time += Math.floor(random() * 24);
    price = Math.max(1, price + Math.round((random() - 0.5) * 3) / 10);
    const whale = random() < 0.004;
    trades[i] = {
      time,
      price: Math.round(price * 10) / 10,
      size:
        Math.round(
          (whale ? 2 + random() * 20 : 0.0005 + random() ** 4 * 1.5) * 1e4,
        ) / 1e4,
      side: random() < 0.5 ? "buy" : "sell",
    };
  }
  return trades;
}

export default function LargeDataDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const tapeRef = useRef<TimeAndSalesInstance | null>(null);
  const [stats, setStats] = useState({ count: 0, ms: 0 });
  const options = {
    capacity: 500_000,
    columns: ["time", "price", "size", "side"] as const,
    largeTradeThreshold: 2,
    pricePrecision: 1,
    sizePrecision: 4,
    ariaLabel: t("aria"),
  };
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  // the framework-free engine (minerva-design/charts/core): typed-array
  // rings, only the visible rows are drawn
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const tape = createTimeAndSales(container, optionsRef.current);
    tapeRef.current = tape;
    const trades = generate(100_000, 38);
    const start = performance.now();
    tape.setTrades(trades);
    setStats({ count: tape.getCount(), ms: performance.now() - start });
    return () => {
      tape.destroy();
      tapeRef.current = null;
    };
  }, []);

  // the built-in texts and number formats follow the page language
  // (<html lang>): apply the options again after a language switch
  useEffect(() => {
    tapeRef.current?.setOptions(optionsRef.current);
  }, [i18n.language]);

  const add = () => {
    const tape = tapeRef.current;
    if (!tape) return;
    const trades = generate(100_000, stats.count + 1);
    const start = performance.now();
    tape.addTrades(trades);
    setStats({ count: tape.getCount(), ms: performance.now() - start });
  };

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          fontSize: 13,
          color: "var(--text-secondary-color)",
        }}
      >
        <Button size="small" variant="outline" onClick={add}>
          {t("add", { value: number.format(100_000) })}
        </Button>
        <span>
          {t("loaded", {
            rows: number.format(stats.count),
            ms: number.format(Math.round(stats.ms)),
          })}
        </span>
      </div>
      <div ref={containerRef} style={{ height: 380, width: "100%" }} />
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Large trades

Trades reaching largeTradeThreshold are bold and tinted, more strongly up to 8 times the threshold. aggregate merges one aggressive order sweeping several levels (same side, same millisecond) into one row: sizes summed, the last price and the count of prints.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/large-trades.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

const THRESHOLDS = [0.5, 1, 5];

export default function LargeTradesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(1);

  useMarketStream(
    boxRef,
    { seed: 33, whales: 0.03, activity: 160 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

  const size = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("threshold")}
        direction="horizontal"
        value={threshold}
        onChange={(value) => setThreshold(Number(value))}
      >
        {THRESHOLDS.map((value) => (
          <Radio
            key={value}
            value={value}
            label={t("atLeast", { value: size.format(value) })}
          />
        ))}
      </RadioGroup>
      <TimeAndSales
        ref={tapeRef}
        height={360}
        // bold and tinted from the threshold, stronger up to 8x
        largeTradeThreshold={threshold}
        // one sweep of several levels = one row
        aggregate
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Live tape

Trades go through the ref (addTrades): new rows slide in and flash, one draw per frame. Hover to pause: the rows freeze and the badge counts the new trades; click it (or press Home) to jump back. onTradeClick gives the clicked trade.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/live.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TimeAndSales,
  type TimeAndSalesHandle,
  type TimeAndSalesRowEvent,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [picked, setPicked] = useState<TimeAndSalesRowEvent | null>(null);

  // trades go to the tape through the ref: React does not re-render
  useMarketStream(
    boxRef,
    { seed: 32, activity: 220 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 4,
  });
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <TimeAndSales
        ref={tapeRef}
        height={380}
        columns={["time", "price", "size", "side"]}
        // freezes while hovered: new trades are counted in the badge
        pauseOnHover
        onPause={setPaused}
        onTradeClick={setPicked}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {picked
          ? t(picked.trade.side === "buy" ? "pickedBuy" : "pickedSell", {
              size: size.format(picked.trade.size),
              price: price.format(picked.trade.price),
            })
          : paused
            ? t("pausedHint")
            : t("liveHint")}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Buy / sell pressure

The trades sent to addTrades are also kept for a minute to compute rolling tape statistics twice a second: VWAP, volume bought and sold by aggressors, trades per second and the largest print. The tape itself merges sweeps (aggregate) and tints trades from 1 BTC (largeTradeThreshold).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/pressure.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TimeAndSales,
  type MarketTrade,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

/** Rolling windows, in ms */
const WINDOWS = [10_000, 30_000, 60_000];

interface Stats {
  vwap: number;
  bought: number;
  sold: number;
  count: number;
  largest: MarketTrade | null;
}

/** Tape statistics of the trades within `span` ms of the latest one */
function measure(trades: MarketTrade[], span: number): Stats {
  const stats: Stats = {
    vwap: NaN,
    bought: 0,
    sold: 0,
    count: 0,
    largest: null,
  };
  const end = trades.at(-1)?.time ?? 0;
  let notional = 0;
  for (let i = trades.length - 1; i >= 0; i--) {
    const trade = trades[i];
    if (trade.time < end - span) break;
    stats.count++;
    notional += trade.price * trade.size;
    if (trade.side === "buy") stats.bought += trade.size;
    else stats.sold += trade.size;
    if (!stats.largest || trade.size > stats.largest.size)
      stats.largest = trade;
  }
  const volume = stats.bought + stats.sold;
  if (volume) stats.vwap = notional / volume;
  return stats;
}

export default function PressureDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(30_000);
  const [stats, setStats] = useState<Stats | null>(null);
  // the last minute of trades, for the statistics (the tape keeps its own)
  const recent = useRef<MarketTrade[]>([]);
  const measuredAt = useRef(0);
  const spanRef = useRef(span);

  useMarketStream(
    boxRef,
    { seed: 37, activity: 200 },
    {
      load: () => {
        tapeRef.current?.clear();
        recent.current = [];
      },
      update: ({ trades }) => {
        if (trades.length) {
          tapeRef.current?.addTrades(trades);
          const list = recent.current;
          list.push(...trades);
          const from = list.findIndex(
            (trade) => trade.time >= trades[0].time - 60_000,
          );
          if (from > 0) list.splice(0, from);
        }
        // twice a second is plenty for a human
        const now = performance.now();
        if (now - measuredAt.current < 500) return;
        measuredAt.current = now;
        setStats(measure(recent.current, spanRef.current));
      },
    },
  );

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const rate = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const seconds = (ms: number) =>
    new Intl.NumberFormat(locale, { style: "unit", unit: "second" }).format(
      ms / 1000,
    );
  const volume = stats ? stats.bought + stats.sold : 0;
  const share = volume ? (stats?.bought ?? 0) / volume : 0.5;
  const cell = (label: string, value: string) => (
    <div style={{ display: "grid", gap: 2 }}>
      <span style={{ color: "var(--text-secondary-color)", fontSize: 12 }}>
        {label}
      </span>
      <strong style={{ fontVariantNumeric: "tabular-nums" }}>{value}</strong>
    </div>
  );

  return (
    <div
      ref={boxRef}
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <TimeAndSales
        ref={tapeRef}
        height={360}
        aggregate
        largeTradeThreshold={1}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
        <RadioGroup
          aria-label={t("rollingWindow")}
          direction="horizontal"
          value={span}
          onChange={(value) => {
            setSpan(Number(value));
            spanRef.current = Number(value);
            setStats(measure(recent.current, Number(value)));
          }}
        >
          {WINDOWS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t("lastWindow", { value: seconds(value) })}
            />
          ))}
        </RadioGroup>
        {/* share of the volume bought by aggressive buyers */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            height: 8,
            borderRadius: 4,
            overflow: "hidden",
            background: "var(--border-color)",
          }}
        >
          <div
            style={{
              width: `${share * 100}%`,
              background: "var(--success-color)",
              transition: "width 0.4s",
            }}
          />
          <div style={{ flex: 1, background: "var(--danger-color)" }} />
        </div>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          }}
        >
          {cell(t("vwap"), stats && volume ? usd.format(stats.vwap) : "…")}
          {cell(t("buyShare"), stats && volume ? percent.format(share) : "…")}
          {cell(
            t("bought"),
            stats ? t("btcValue", { value: btc.format(stats.bought) }) : "…",
          )}
          {cell(
            t("sold"),
            stats ? t("btcValue", { value: btc.format(stats.sold) }) : "…",
          )}
          {cell(
            t("tradesPerSecond"),
            stats ? rate.format(stats.count / (span / 1000)) : "…",
          )}
          {cell(
            t("largest"),
            stats?.largest
              ? t(stats.largest.side === "buy" ? "largestBuy" : "largestSell", {
                  size: btc.format(stats.largest.size),
                  price: usd.format(stats.largest.price),
                })
              : "…",
          )}
        </div>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
        >
          {stats && volume
            ? t(
                share >= 0.6
                  ? "pressureBuy"
                  : share <= 0.4
                    ? "pressureSell"
                    : "pressureBalanced",
              )
            : t("pressureWaiting")}
        </output>
      </div>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Red up, green down

colorConvention="red-up": red buys, green sells (mainland China, Japan, Korea).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/red-up.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  TimeAndSales,
  type OrderBookColorConvention,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");

  useMarketStream(
    boxRef,
    { seed: 37 },
    {
      // a fresh market on every mount: the tape starts empty
      load: () => tapeRef.current?.clear(),
      update: ({ trades }) => {
        if (trades.length) tapeRef.current?.addTrades(trades);
      },
    },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("colors")}
        direction="horizontal"
        value={convention}
        onChange={(value) => setConvention(value as OrderBookColorConvention)}
      >
        <Radio value="red-up" label={t("redUp")} />
        <Radio value="green-up" label={t("greenUp")} />
      </RadioGroup>
      <TimeAndSales
        ref={tapeRef}
        // red buys, green sells
        colorConvention={convention}
        height={340}
        columns={["time", "price", "size", "side"]}
        largeTradeThreshold={1}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```

## Example: Buys and sells side by side

One feed, two tapes: the trades are split by aggressor side before addTrades, each tape with its own ariaLabel. The headers count the prints and the volume of each side, and the net flow sums them.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/time-and-sales/demos/split.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TimeAndSales, type TimeAndSalesHandle } from "minerva-design/charts";
import { useMarketStream } from "../../order-book/feed";

interface Totals {
  buys: number;
  sells: number;
  bought: number;
  sold: number;
}

const EMPTY: Totals = { buys: 0, sells: 0, bought: 0, sold: 0 };

export default function SplitDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.time-and-sales.data",
  });
  const locale = i18n.language;
  const boxRef = useRef<HTMLDivElement>(null);
  const buyTapeRef = useRef<TimeAndSalesHandle>(null);
  const sellTapeRef = useRef<TimeAndSalesHandle>(null);
  const [totals, setTotals] = useState<Totals>(EMPTY);
  const running = useRef<Totals>({ ...EMPTY });
  const shownAt = useRef(0);

  // one market, its trades split by aggressor side into two tapes
  useMarketStream(
    boxRef,
    { seed: 39, activity: 200 },
    {
      load: () => {
        buyTapeRef.current?.clear();
        sellTapeRef.current?.clear();
        running.current = { ...EMPTY };
        setTotals(EMPTY);
      },
      update: ({ trades }) => {
        if (!trades.length) return;
        const buys = trades.filter((trade) => trade.side === "buy");
        const sells = trades.filter((trade) => trade.side === "sell");
        if (buys.length) buyTapeRef.current?.addTrades(buys);
        if (sells.length) sellTapeRef.current?.addTrades(sells);
        const sum = running.current;
        sum.buys += buys.length;
        sum.sells += sells.length;
        for (const trade of buys) sum.bought += trade.size;
        for (const trade of sells) sum.sold += trade.size;
        const now = performance.now();
        if (now - shownAt.current < 500) return;
        shownAt.current = now;
        setTotals({ ...sum });
      },
    },
  );

  const integer = new Intl.NumberFormat(locale);
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const delta = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  });
  const header = (
    color: string,
    title: string,
    count: number,
    size: number,
  ) => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 8,
        fontSize: 13,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <strong style={{ color }}>{title}</strong>
      <span style={{ color: "var(--text-secondary-color)" }}>
        {t("sideTotals", {
          count: integer.format(count),
          size: btc.format(size),
        })}
      </span>
    </div>
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          {header(
            "var(--success-color)",
            t("buysTape"),
            totals.buys,
            totals.bought,
          )}
          <TimeAndSales
            ref={buyTapeRef}
            height={300}
            aggregate
            largeTradeThreshold={1}
            pricePrecision={1}
            sizePrecision={4}
            ariaLabel={t("buysAria")}
          />
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {header(
            "var(--danger-color)",
            t("sellsTape"),
            totals.sells,
            totals.sold,
          )}
          <TimeAndSales
            ref={sellTapeRef}
            height={300}
            aggregate
            largeTradeThreshold={1}
            pricePrecision={1}
            sizePrecision={4}
            ariaLabel={t("sellsAria")}
          />
        </div>
      </div>
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("netFlow", { value: delta.format(totals.bought - totals.sold) })}
      </span>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book/feed.ts

```tsx
// Simulated market for the order book demos: a seeded matching engine
// (limit orders, cancels and market orders sweeping the book) producing a
// snapshot, incremental deltas and trades like an exchange WebSocket feed,
// plus a loop hook that stops on unmount and while the demo is off screen.
// The resting liquidity looks like a real book: a smooth landscape over
// price that drifts over time, clusters at round prices, a thicker zone at
// the touch, and a few large walls with a life of their own (added, pulled
// before the price gets there, or eaten by block trades).
// Not a demo itself: only `demos/*.tsx` files are collected.

import { useEffect, useRef, type RefObject } from "react";
import type {
  OrderBookDelta,
  OrderBookHeatmapHandle,
  OrderBookLevel,
  OrderBookSnapshot,
  MarketTrade,
} from "minerva-design/charts";

export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface FeedOptions {
  /** Seed of the random generator (same seed, same market) */
  seed?: number;
  /** Starting price */
  price?: number;
  /** Price increment */
  tick?: number;
  /** Levels kept on each side */
  levels?: number;
  /** Order book events per second */
  activity?: number;
  /** Probability that an order is a large one (walls, block trades) */
  whales?: number;
  /** Clock of the first update (ms since epoch) */
  start?: number;
}

export interface FeedUpdate {
  /** Levels changed by the update (size 0 removes a level) */
  delta: OrderBookDelta & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
    time: number;
  };
  /** Trades of the update, oldest first */
  trades: MarketTrade[];
}

export interface MarketFeed {
  readonly tick: number;
  /** Full book, best levels first */
  snapshot(): OrderBookSnapshot & {
    bids: OrderBookLevel[];
    asks: OrderBookLevel[];
  };
  /** Advances the market by `ms` milliseconds */
  step(ms: number): FeedUpdate;
  /** Price of the last trade */
  last(): number;
  /** Clock of the market (ms since epoch) */
  time(): number;
}

type Side = "bid" | "ask";

/** A large resting order with a life of its own */
interface Wall {
  /** Size it added to its level */
  size: number;
  /** Clock at which it is pulled (unless the price is already there) */
  until: number;
  /** Pulled as soon as the price comes close (spoofing) */
  spoof: boolean;
}

/** Smoothstep */
const smooth = (t: number) => t * t * (3 - 2 * t);

export function createMarketFeed(options: FeedOptions = {}): MarketFeed {
  const seed = options.seed ?? 7;
  const random = mulberry32(seed);
  const tick = options.tick ?? 0.1;
  const decimals = Math.max(0, Math.round(-Math.log10(tick)));
  const depth = options.levels ?? 1500;
  const activity = options.activity ?? 140;
  const whales = options.whales ?? 0.006;
  /** Walls compared with the default market */
  const wallRate = whales / 0.006;
  let time = options.start ?? Date.now();
  /** Time since the start (drives the liquidity landscape) */
  let elapsed = 0;
  // prices are integers of ticks: no rounding drift
  const center = Math.round((options.price ?? 64000) / tick);
  const books: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const walls: Record<Side, Map<number, Wall>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const best: Record<Side, number> = { bid: center - 1, ask: center };
  let last = center * tick;
  /** Hidden fair value (ticks): a random walk the quotes and orders chase */
  let fair = center - 0.5;
  let momentum = 0;

  const gauss = () => {
    const u = Math.max(1e-9, random());
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
  };
  const lognormal = (median: number, sigma: number) =>
    median * Math.exp(sigma * gauss());
  const round = (size: number) =>
    Math.max(0.0001, Math.round(size * 1e4) / 1e4);
  const priceOf = (index: number) => +(index * tick).toFixed(decimals);
  const sign = (side: Side) => (side === "bid" ? -1 : 1);
  const at = (side: Side, distance: number) =>
    best[side] + sign(side) * distance;
  /** Distance of a price from its side's best (negative: crossed) */
  const distanceOf = (side: Side, index: number) =>
    side === "bid" ? best.bid - index : index - best.ask;

  /** Seeded lattice hash in [0, 1) (stateless: the landscape is a field) */
  const hash = (i: number, j: number, octave: number) => {
    let h =
      Math.imul(i | 0, 0x27d4eb2d) ^
      Math.imul(j | 0, 0x165667b1) ^
      Math.imul((seed + octave * 7919) | 0, 0x9e3779b1);
    h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
    h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
  /** Smooth value noise in [-1, 1] over (price, time) lattice units */
  const noise = (x: number, y: number, octave: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const fx = smooth(x - xi);
    const fy = smooth(y - yi);
    const a = hash(xi, yi, octave);
    const b = hash(xi + 1, yi, octave);
    const c = hash(xi, yi + 1, octave);
    const d = hash(xi + 1, yi + 1, octave);
    return (
      2 * (a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy) - 1
    );
  };
  /**
   * Typical size of a level: thicker at the touch (makers refresh it) and
   * slowly deeper in the book, times a smooth landscape over price (zones
   * of 3 to 12 USD at the default tick) that drifts within a minute, times
   * the clustering at round prices (every 1, 5 and 10 USD)
   */
  const target = (side: Side, index: number) => {
    const d = Math.max(0, distanceOf(side, index));
    const landscape = Math.exp(
      1.05 *
        (0.7 * noise(index / 120, elapsed / 22_000, 1) +
          0.45 * noise(index / 35, elapsed / 9_000, 2)),
    );
    const roundness =
      index % 100 === 0 ? 3 : index % 50 === 0 ? 2 : index % 10 === 0 ? 1.3 : 1;
    return (
      (0.08 + 0.0004 * d) *
      (1 + 1.4 * Math.exp(-d / 15)) *
      landscape *
      roundness
    );
  };
  /** Resting size of a new level: its typical size with noise */
  const levelSize = (side: Side, index: number) =>
    round(target(side, index) * Math.exp(0.7 * gauss()));
  /** Far from the touch, fewer prices hold orders */
  const emptiness = (distance: number) =>
    distance > 3 ? Math.min(0.6, 0.05 + distance / 2500) : 0;

  let touched: Record<Side, Map<number, number>> = {
    bid: new Map(),
    ask: new Map(),
  };
  const set = (side: Side, index: number, size: number) => {
    if (size > 0.00005) books[side].set(index, round(size));
    else books[side].delete(index);
    touched[side].set(index, size > 0.00005 ? round(size) : 0);
  };

  /** Adds a wall (or grows one) living until `until` */
  const addWall = (
    side: Side,
    index: number,
    size: number,
    until: number,
    spoof: boolean,
  ) => {
    set(side, index, (books[side].get(index) ?? 0) + size);
    const wall = walls[side].get(index);
    if (wall) {
      wall.size += size;
      wall.until = Math.max(wall.until, until);
    } else walls[side].set(index, { size, until, spoof });
  };
  /** Size of a wall: a few times a typical level (3 to 12 here) */
  const wallSize = () => lognormal(3.2, 0.5);

  for (const side of ["bid", "ask"] as const) {
    for (let d = 0; d < depth; d++) {
      if (random() < emptiness(d)) continue;
      const index = at(side, d);
      books[side].set(index, levelSize(side, index));
      // a few walls from the start (most at round prices), with varied
      // lives: some end early, a few outlast the window
      const p =
        0.003 *
        wallRate *
        (index % 100 === 0
          ? 8
          : index % 50 === 0
            ? 5
            : index % 10 === 0
              ? 2
              : 1);
      if (d > 8 && random() < p)
        addWall(
          side,
          index,
          wallSize(),
          time + 5_000 + random() * 90_000,
          random() < 0.3,
        );
    }
  }

  /** Best level again after a removal (scans away from the spread) */
  const rescan = (side: Side) => {
    const book = books[side];
    if (book.has(best[side])) return;
    for (let d = 1; d < depth * 3; d++) {
      const index = best[side] + sign(side) * d;
      if (book.has(index)) {
        best[side] = index;
        return;
      }
    }
    // empty side: a fresh level next to the other one
    best[side] = side === "bid" ? best.ask - 1 : best.bid + 1;
    set(side, best[side], levelSize(side, best[side]));
  };

  const limit = (side: Side) => {
    const spread = best.ask - best.bid;
    let index: number;
    if (spread > 1 && random() < (spread > 4 ? 0.95 : 0.6)) {
      // improve the price inside the spread; after a sweep, makers quote
      // back into the gap (up to half of it at once): it closes in ms
      const jump =
        1 + Math.floor(random() * Math.max(1, Math.floor((spread - 1) / 2)));
      index = side === "bid" ? best.bid + jump : best.ask - jump;
    } else {
      index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 7));
    }
    if (side === "bid" && index >= best.ask) index = best.ask - 1;
    if (side === "ask" && index <= best.bid) index = best.bid + 1;
    if (random() < whales * 0.3) {
      // a large passive order at the touch: absorbs the flow for a while
      addWall(
        side,
        index,
        lognormal(5, 0.5),
        time + 5_000 + random() * 25_000,
        false,
      );
    } else {
      // makers refresh the liquidity near the touch
      const d = Math.max(0, distanceOf(side, index));
      const size = lognormal(0.12 * (1 + 1.2 * Math.exp(-d / 15)), 0.6);
      set(side, index, (books[side].get(index) ?? 0) + size);
    }
    if (side === "bid" ? index > best.bid : index < best.ask)
      best[side] = index;
  };

  const cancel = (side: Side) => {
    const index = at(side, Math.floor(-Math.log(Math.max(1e-9, random())) * 9));
    const size = books[side].get(index);
    // walls leave on their own schedule
    if (size === undefined || walls[side].has(index)) return;
    set(side, index, random() < 0.4 ? 0 : size * (0.2 + random() * 0.6));
    rescan(side);
  };

  /** Pulls the best level (a stale quote) */
  const cancelTouch = (side: Side) => {
    const size = books[side].get(best[side]);
    if (size === undefined) return rescan(side);
    if (walls[side].has(best[side])) return;
    set(side, best[side], random() < 0.6 ? 0 : size * 0.3);
    rescan(side);
  };

  const market = (
    buy: boolean,
    trades: MarketTrade[],
    now: number,
    amount?: number,
  ) => {
    const side: Side = buy ? "ask" : "bid";
    let remaining =
      amount ??
      (random() < whales ? lognormal(6, 0.6) : lognormal(0.035, 1.35));
    remaining = round(remaining);
    for (let sweep = 0; sweep < 40 && remaining > 0.00005; sweep++) {
      const index = best[side];
      const size = books[side].get(index) ?? 0;
      if (size <= 0) {
        rescan(side);
        continue;
      }
      const fill = round(Math.min(size, remaining));
      trades.push({
        time: now,
        price: priceOf(index),
        size: fill,
        side: buy ? "buy" : "sell",
      });
      last = priceOf(index);
      remaining -= fill;
      set(side, index, size - fill > 0.00005 ? size - fill : 0);
      rescan(side);
    }
  };

  /**
   * Life of the walls: spoofs are pulled when the price comes close, real
   * ones at the touch are eaten by block trades, the others are pulled at
   * the end of their life; new ones appear away from the touch
   */
  const liveWalls = (ms: number, trades: MarketTrade[], now: number) => {
    for (const side of ["bid", "ask"] as const) {
      for (const [index, wall] of [...walls[side]]) {
        const current = books[side].get(index) ?? 0;
        const d = distanceOf(side, index);
        if (d < 0 || current < wall.size * 0.15) {
          walls[side].delete(index);
        } else if (wall.spoof && d <= 15) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
          rescan(side);
        } else if (d === 0) {
          // absorbed by aggressive orders: large bubbles
          if (random() < ms / 1500)
            market(
              side === "ask",
              trades,
              now,
              current * (0.3 + random() * 0.5),
            );
        } else if (time >= wall.until && d > 3) {
          set(side, index, current - wall.size);
          walls[side].delete(index);
        }
      }
    }
    if (random() < (ms / 8000) * wallRate) {
      const side: Side = random() < 0.5 ? "bid" : "ask";
      let d = 10 + Math.floor(random() * 140);
      let index = at(side, d);
      if (random() < 0.6) {
        // at a round price (1 USD at the default tick), away from the touch
        index =
          side === "bid"
            ? Math.floor(index / 10) * 10
            : Math.ceil(index / 10) * 10;
        d = distanceOf(side, index);
      }
      if (d >= 8)
        addWall(
          side,
          index,
          wallSize(),
          time + 10_000 + random() * 50_000,
          random() < 0.3,
        );
    }
  };

  /**
   * Deep in the book orders come and go: levels drift slowly toward the
   * landscape (horizontal lines change intensity over time), holes fill
   * and levels vanish so the density stays put, far levels are dropped
   */
  const drift = (ms: number) => {
    const visits = Math.ceil((depth * ms) / 900);
    for (const side of ["bid", "ask"] as const) {
      for (let k = 0; k < visits; k++) {
        const d = 4 + Math.floor(random() * depth);
        const index = at(side, d);
        if (walls[side].has(index)) continue;
        const size = books[side].get(index);
        const empty = emptiness(d);
        if (size === undefined) {
          if (random() < (1 - empty) * 0.1)
            set(side, index, levelSize(side, index));
          continue;
        }
        if (random() < empty * 0.1) {
          set(side, index, 0);
          continue;
        }
        if (random() < 0.05) {
          // a stale order is pulled and re-added at the current depth: no
          // liquidity line runs unchanged through the whole history
          set(side, index, 0);
          if (random() > empty) set(side, index, levelSize(side, index));
          continue;
        }
        const log = Math.log(size);
        const goal = Math.log(target(side, index));
        set(side, index, Math.exp(log + 0.1 * gauss() + 0.16 * (goal - log)));
      }
      if (random() < 0.05) {
        for (const index of books[side].keys()) {
          if (Math.abs(index - best[side]) > depth * 1.3) {
            set(side, index, 0);
            walls[side].delete(index);
          }
        }
      }
    }
  };

  const levels = (side: Side): OrderBookLevel[] =>
    [...books[side].entries()]
      .sort((a, b) => (side === "bid" ? b[0] - a[0] : a[0] - b[0]))
      .map(([index, size]) => [priceOf(index), size]);

  /**
   * Safety net of the invariant best bid < best ask: any level at or
   * through the other side's best is removed (the matching engine never
   * produces one, this keeps the feed sound whatever the parameters)
   */
  const uncross = () => {
    for (let guard = 0; guard < 64; guard++) {
      const bid = Math.max(-Infinity, ...books.bid.keys());
      const ask = Math.min(Infinity, ...books.ask.keys());
      if (bid < ask) {
        if (Number.isFinite(bid)) best.bid = bid;
        if (Number.isFinite(ask)) best.ask = ask;
        return;
      }
      // the older side wins: drop the level that crossed it
      if (best.bid >= ask) set("bid", bid, 0);
      else set("ask", ask, 0);
    }
  };

  return {
    tick,
    snapshot: () => ({ bids: levels("bid"), asks: levels("ask"), time }),
    step(ms) {
      touched = { bid: new Map(), ask: new Map() };
      const trades: MarketTrade[] = [];
      const start = time;
      const span = Math.max(0, ms);
      time += span;
      elapsed += span;
      // the fair value wanders (with some momentum); orders chase it
      const seconds = span / 1000;
      momentum =
        momentum * Math.exp(-seconds / 20) + gauss() * Math.sqrt(seconds) * 0.6;
      fair += momentum * seconds * 3 + gauss() * Math.sqrt(seconds) * 15;
      const mid = (best.bid + best.ask) / 2;
      const pull = Math.max(-0.38, Math.min(0.38, (fair - mid) / 25));
      const expected = (activity * span) / 1000;
      const events = Math.floor(expected * (0.4 + random() * 1.2) + random());
      for (let e = 0; e < events; e++) {
        const now = Math.round(
          start + ((e + 1) * (time - start)) / (events + 1),
        );
        const r = random();
        const bias = 0.5 + pull;
        if (r < 0.5) limit(random() < bias ? "bid" : "ask");
        else if (r < 0.76) cancel(random() < 1 - bias ? "bid" : "ask");
        else if (r < 0.86) {
          // stale quotes on the wrong side of the fair value are pulled
          if (best.bid > fair + 1) cancelTouch("bid");
          else if (best.ask < fair - 1) cancelTouch("ask");
          else cancel(random() < 0.5 ? "bid" : "ask");
        } else market(random() < bias, trades, now);
      }
      liveWalls(span, trades, time);
      drift(span);
      uncross();
      const tuples = (side: Side): OrderBookLevel[] =>
        [...touched[side]].map(([index, size]) => [priceOf(index), size]);
      return {
        delta: { bids: tuples("bid"), asks: tuples("ask"), time },
        trades,
      };
    },
    last: () => last,
    time: () => time,
  };
}

/**
 * A market with `ms` of history: the book at `now - ms` and the updates
 * since then, every `step` ms (backfills a heatmap); `feed` goes on live.
 */
export function createHistory(
  options: FeedOptions,
  ms: number,
  step = 100,
): { feed: MarketFeed; snapshot: OrderBookSnapshot; updates: FeedUpdate[] } {
  const now = Date.now();
  const feed = createMarketFeed({ ...options, start: now - ms });
  const snapshot = feed.snapshot();
  const updates: FeedUpdate[] = [];
  while (feed.time() < now) updates.push(feed.step(step));
  return { feed, snapshot, updates };
}

/**
 * Calls `onTick(elapsed ms)` every `interval` ms while `running`, the
 * element is on screen and the page visible; stops on unmount.
 */
export function useFeedLoop(
  targetRef: RefObject<HTMLElement | null>,
  onTick: (elapsed: number) => void,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const tickRef = useRef(onTick);
  useEffect(() => {
    tickRef.current = onTick;
  });
  useEffect(() => {
    if (!running) return;
    let visible = true;
    const target = targetRef.current;
    const observer =
      target && typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
          })
        : null;
    if (target) observer?.observe(target);
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      // after a pause the market resumes where it was (no catch-up burst)
      const elapsed = Math.min(100, now - last);
      last = now;
      if (!visible || document.hidden) return;
      tickRef.current(elapsed);
    }, interval);
    return () => {
      clearInterval(id);
      observer?.disconnect();
    };
  }, [targetRef, interval, running]);
}

type HeatmapSink = Pick<
  OrderBookHeatmapHandle,
  "clear" | "setBook" | "applyDeltas" | "addTrades"
>;

/** Where a market stream goes (usually the handles of the widgets) */
export interface MarketSink {
  /**
   * A fresh market starts (mount, remount): load its whole state, e.g.
   * `setBook(feed.snapshot())` (live deltas only make sense on that book)
   */
  load(feed: MarketFeed): void;
  /** One live update of the market */
  update(update: FeedUpdate, feed: MarketFeed): void;
  /** The market stops (unmount): forget its state */
  reset?(): void;
}

/**
 * Streams a simulated market into `sink` every `interval` ms (see
 * `useFeedLoop`). The market is created inside the effect and loaded
 * whole first: a remount (StrictMode, hot reload) starts again from a
 * fresh, consistent book instead of applying live deltas to a stale
 * snapshot (which crosses the ladder). `options` are read on mount.
 */
export function useMarketStream(
  targetRef: RefObject<HTMLElement | null>,
  options: FeedOptions,
  sink: MarketSink,
  {
    interval = 20,
    running = true,
  }: { interval?: number; running?: boolean } = {},
) {
  const optionsRef = useRef(options);
  const sinkRef = useRef(sink);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    sinkRef.current = sink;
  });
  useEffect(() => {
    const feed = createMarketFeed(optionsRef.current);
    marketRef.current = feed;
    sinkRef.current.load(feed);
    return () => {
      marketRef.current = null;
      sinkRef.current.reset?.();
    };
  }, []);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (feed) sinkRef.current.update(feed.step(elapsed), feed);
    },
    { interval, running },
  );
}

/** Empty book: what a ladder or depth chart shows once its market stopped */
export const EMPTY_BOOK: OrderBookSnapshot = { bids: [], asks: [] };

/**
 * Backfills a heatmap with `history` ms of recorded market, then streams
 * the same market live. The market is created inside the effect and the
 * heatmap cleared first: a remount (StrictMode, hot reload) starts again
 * from a fresh, consistent book, never applying live deltas to a stale one.
 */
export function useHeatmapReplay(
  targetRef: RefObject<HTMLElement | null>,
  heatmapRef: RefObject<HeatmapSink | null>,
  options: FeedOptions,
  history: number,
  { step = 100, interval = 20 }: { step?: number; interval?: number } = {},
) {
  const optionsRef = useRef(options);
  const marketRef = useRef<MarketFeed | null>(null);
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      optionsRef.current,
      history,
      step,
    );
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
    };
  }, [heatmapRef, history, step]);
  useFeedLoop(
    targetRef,
    (elapsed) => {
      const feed = marketRef.current;
      const heatmap = heatmapRef.current;
      if (!feed || !heatmap) return;
      const { delta, trades } = feed.step(elapsed);
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    },
    { interval },
  );
}

```
