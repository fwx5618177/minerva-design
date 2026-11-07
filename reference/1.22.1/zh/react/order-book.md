# 订单簿

Canvas 绘制的价格阶梯：卖单在价差行上方、买单在下方，带深度条、价格合并、变动档位闪烁、大单高亮与悬停累计汇总。每秒数百次更新也只需每帧绘制一次。

Package: minerva-design@1.22.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT 订单簿

### 订单簿

BTC/USDT

价格 (USDT)

数量 (BTC)

累计 (BTC)

更新频率

{{value}} 次/秒

{{updates}} 条消息/秒 · {{levels}} 次档位变动/秒

价格步长

深度条

累计

单档

大单阈值

≥ {{value}} BTC

买单 {{price}}：{{size}} BTC，到此累计 {{sum}} BTC

卖单 {{price}}：{{size}} BTC，到此累计 {{sum}} BTC

点击某一档选取其价格。

显示

双侧

买盘

卖盘

涨跌颜色

红涨绿跌

绿涨红跌

开盘以来 {{value}}

限价：{{price}}

限价

深度

BTC/USDT 深度

最新成交

BTC/USDT 逐笔成交

市场

加密货币 · BTC/USDT

价格 (USDT)

数量 (BTC)

累计 (BTC)

BTC/USDT 订单簿

股票 · AAPL

价格 (USD)

股数

累计

AAPL 订单簿

外汇 · EUR/USD

汇率

数量 (EUR)

累计 (EUR)

EUR/USD 订单簿

期货 · ES

价格（点）

合约

累计

E-mini 标普 500 期货订单簿

{{value}} 点

{{value}} 美分

{{value}} 跳

{{value}} USDT

最小变动价位 {{tick}} · 价差 {{spread}} · 达到 {{large}} 高亮

大单墙

新增

撤单

成交

≥ {{size}} BTC 的大单墙：{{resting}} 挂单中，{{filled}} 成交，{{pulled}} 撤单（撤单率 {{ratio}}）

正在监控盘口中的大单墙…

买盘墙 {{price}}：{{size}} BTC

卖盘墙 {{price}}：{{size}} BTC

持续 {{value}}

限价单

方向

买入

卖出

限价 (USDT)

数量 (BTC)

输入价格和数量，或点击一个档位。

立即成交 {{filled}} BTC，均价 {{average}}。

立即成交 {{filled}} BTC（均价 {{average}}），剩余 {{rest}} BTC 挂在 {{price}}。

挂在 {{price}}，前面排队 {{ahead}} BTC。

{{side}}

已下单：{{side}} {{size}} BTC，价格 {{price}}。

已撤销 {{price}} 的订单。

{{side}} {{size}} @ {{price}}

暂无挂单。

撤销订单

## OrderBook

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "OrderBook"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "book",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "object",
    "typeText": "OrderBookSnapshot | undefined",
    "typeRef": "type:2b8335b1888add1c7fed",
    "required": false,
    "description": "Book to draw, applied when the object changes (stream updates through the ref)"
  },
  {
    "name": "lastPrice",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "required": false,
    "description": "Price of the spread row, colored by its last move; the mid price when omitted"
  },
  {
    "name": "mode",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "asks",
      "bids",
      "both"
    ],
    "typeText": "OrderBookMode | undefined",
    "typeRef": "type:31f4f45d4be137c363f4",
    "default": "both",
    "required": false,
    "description": "Sides shown: asks above the spread row and bids below, or one side"
  },
  {
    "name": "grouping",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Price grouping step (tick size aggregation): bids rounded down, asks up; 0 shows the raw levels"
  },
  {
    "name": "rows",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Rows per side; as many as the height allows when omitted"
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
    "name": "depthBars",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "cumulative",
      "level",
      "none"
    ],
    "typeText": "\"none\" | \"cumulative\" | \"level\" | undefined",
    "typeRef": "type:50c570d91610be0a534d",
    "default": "cumulative",
    "required": false,
    "description": "Depth bars behind the rows: cumulative total, size of the level, or none"
  },
  {
    "name": "total",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "base",
      "quote"
    ],
    "typeText": "\"base\" | \"quote\" | undefined",
    "typeRef": "type:70b1a5117d93dd66174a",
    "default": "base",
    "required": false,
    "description": "The total column cumulates sizes (`base`) or notional values (`quote`)"
  },
  {
    "name": "columns",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "array",
    "typeText": "readonly (\"size\" | \"total\" | \"price\")[] | undefined",
    "typeRef": "type:9b6dc2c16fb07b240c5d",
    "required": false,
    "description": "Columns, left to right"
  },
  {
    "name": "flash",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Flashes the size of the levels that changed (side color when it grows, gray when it shrinks)"
  },
  {
    "name": "flashDuration",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 450,
    "required": false,
    "description": "Duration of a flash, in ms"
  },
  {
    "name": "largeOrderThreshold",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Rows whose size reaches this value are highlighted (walls)"
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
    "name": "spreadRow",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Spread row between the sides: last / mid price, spread and its basis points"
  },
  {
    "name": "imbalance",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Bid / ask imbalance bar at the bottom"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Hover summary (average price, cumulative size and notional to the hovered row)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "object",
    "typeText": "Partial<OrderBookLabels> | undefined",
    "typeRef": "type:916db2420d7dbe2fe23c",
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
    "typeText": "((level: OrderBookLevelEvent | null) => void) | undefined",
    "typeRef": "type:e93a723fa2fc57c0b2dd",
    "parameters": [
      {
        "name": "level",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "OrderBookLevelEvent | null",
        "typeRef": "type:2719392ae96ff603e25d"
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
    "name": "onLevelClick",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((level: OrderBookLevelEvent) => void) | undefined",
    "typeRef": "type:481d1690b484f66f5c8c",
    "parameters": [
      {
        "name": "level",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "OrderBookLevelEvent",
        "typeRef": "type:4a60f156049948f90d1e"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Click / tap / Enter on a row (e.g. to fill a price in an order form)"
  }
]
```

## API

```json
{
  "OrderBookProps": {
    "source": "charts/src/react/orderbook.tsx",
    "description": "Props of `OrderBook`",
    "kind": "interface",
    "extends": [
      "OrderBookOptions",
      "OrderBookWidgetProps"
    ],
    "props": [
      {
        "name": "book",
        "type": "OrderBookSnapshot",
        "required": false,
        "description": "Book to draw, applied when the object changes (stream updates through the ref)"
      },
      {
        "name": "lastPrice",
        "type": "number | null",
        "required": false,
        "description": "Price of the spread row, colored by its last move; the mid price when omitted"
      },
      {
        "name": "onHover",
        "type": "(level: OrderBookLevelEvent | null) => void",
        "required": false,
        "description": "Hovered row (`null` when the pointer leaves)"
      },
      {
        "name": "onLevelClick",
        "type": "(level: OrderBookLevelEvent) => void",
        "required": false,
        "description": "Click / tap / Enter on a row (e.g. to fill a price in an order form)"
      },
      {
        "name": "ref",
        "type": "Ref<OrderBookHandle>",
        "required": false,
        "description": "Imperative handle: `setBook`, `applyDeltas`, `setLastPrice`"
      }
    ]
  },
  "OrderBookHandle": {
    "source": "charts/src/react/orderbook.tsx",
    "description": "Imperative handle of `OrderBook`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setBook",
        "type": "(snapshot: OrderBookSnapshot) => void",
        "required": true,
        "description": "Replaces the book"
      },
      {
        "name": "applyDeltas",
        "type": "(deltas: OrderBookDelta | readonly OrderBookDelta[]) => void",
        "required": true,
        "description": "Applies updates (size 0 removes a level); drawn once at the next frame"
      },
      {
        "name": "setLastPrice",
        "type": "(price: number | null) => void",
        "required": true,
        "description": "Price of the spread row (the mid price when `null`)"
      },
      {
        "name": "getInstance",
        "type": "() => OrderBookInstance | null",
        "required": true,
        "description": "The underlying engine instance (minerva-design/charts/core)"
      }
    ]
  },
  "OrderBookOptions": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Options of the order book ladder",
    "kind": "interface",
    "extends": [
      "OrderBookCommonOptions"
    ],
    "props": [
      {
        "name": "mode",
        "type": "OrderBookMode",
        "required": false,
        "default": "\"both\"",
        "description": "Sides shown: asks above the spread row and bids below, or one side"
      },
      {
        "name": "grouping",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Price grouping step (tick size aggregation): bids rounded down, asks up; 0 shows the raw levels"
      },
      {
        "name": "rows",
        "type": "number",
        "required": false,
        "description": "Rows per side; as many as the height allows when omitted"
      },
      {
        "name": "rowHeight",
        "type": "number",
        "required": false,
        "default": "20",
        "description": "Height of a row, in pixels"
      },
      {
        "name": "depthBars",
        "type": "\"cumulative\" | \"level\" | \"none\"",
        "required": false,
        "default": "\"cumulative\"",
        "description": "Depth bars behind the rows: cumulative total, size of the level, or none"
      },
      {
        "name": "total",
        "type": "\"base\" | \"quote\"",
        "required": false,
        "default": "\"base\"",
        "description": "The total column cumulates sizes (`base`) or notional values (`quote`)"
      },
      {
        "name": "columns",
        "type": "readonly (\"price\" | \"size\" | \"total\")[]",
        "required": false,
        "default": "[\"price\", \"size\", \"total\"]",
        "description": "Columns, left to right"
      },
      {
        "name": "flash",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Flashes the size of the levels that changed (side color when it grows, gray when it shrinks)"
      },
      {
        "name": "flashDuration",
        "type": "number",
        "required": false,
        "default": "450",
        "description": "Duration of a flash, in ms"
      },
      {
        "name": "largeOrderThreshold",
        "type": "number",
        "required": false,
        "description": "Rows whose size reaches this value are highlighted (walls)"
      },
      {
        "name": "header",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Header row with the column names"
      },
      {
        "name": "spreadRow",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Spread row between the sides: last / mid price, spread and its basis points"
      },
      {
        "name": "imbalance",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Bid / ask imbalance bar at the bottom"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Hover summary (average price, cumulative size and notional to the hovered row)"
      },
      {
        "name": "labels",
        "type": "Partial<OrderBookLabels>",
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
  "OrderBookLabels": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Texts of the order book ladder (headers, spread row, tooltip, accessible name), English defaults",
    "kind": "interface",
    "extends": [],
    "props": [
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
        "name": "total",
        "type": "string",
        "required": true,
        "default": "\"Total\""
      },
      {
        "name": "spread",
        "type": "string",
        "required": true,
        "default": "\"Spread\""
      },
      {
        "name": "average",
        "type": "string",
        "required": true,
        "default": "\"Avg. price\"",
        "description": "Hover summary: average fill price"
      },
      {
        "name": "sum",
        "type": "string",
        "required": true,
        "default": "\"Sum\"",
        "description": "Hover summary: cumulative size"
      },
      {
        "name": "notional",
        "type": "string",
        "required": true,
        "default": "\"Notional\"",
        "description": "Hover summary: cumulative notional"
      },
      {
        "name": "buyShare",
        "type": "string",
        "required": true,
        "default": "\"B\"",
        "description": "Imbalance bar, bid share"
      },
      {
        "name": "sellShare",
        "type": "string",
        "required": true,
        "default": "\"S\"",
        "description": "Imbalance bar, ask share"
      },
      {
        "name": "bid",
        "type": "string",
        "required": true,
        "default": "\"Bid\"",
        "description": "Best bid, in the screen reader summary"
      },
      {
        "name": "ask",
        "type": "string",
        "required": true,
        "default": "\"Ask\"",
        "description": "Best ask, in the screen reader summary"
      },
      {
        "name": "basisPoints",
        "type": "string",
        "required": true,
        "default": "\"bp\"",
        "description": "Basis points unit of the spread row"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "default": "\"Order book\"",
        "description": "Accessible name (when `ariaLabel` is not set)"
      }
    ]
  },
  "OrderBookLevelEvent": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "A row of the ladder with its cumulative values",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "side",
        "type": "OrderBookSide",
        "required": true,
        "description": "Side of the row"
      },
      {
        "name": "index",
        "type": "number",
        "required": true,
        "description": "Rows from the spread (0 = best)"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price of the (grouped) level"
      },
      {
        "name": "size",
        "type": "number",
        "required": true,
        "description": "Size of the (grouped) level"
      },
      {
        "name": "sum",
        "type": "number",
        "required": true,
        "description": "Cumulative size from the best level to this one"
      },
      {
        "name": "notional",
        "type": "number",
        "required": true,
        "description": "Cumulative notional (Σ price × size) from the best level to this one"
      },
      {
        "name": "average",
        "type": "number",
        "required": true,
        "description": "Average fill price of `sum`"
      }
    ]
  },
  "OrderBookSnapshot": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Full state of an order book",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "bids",
        "type": "OrderBookLevels",
        "required": true,
        "description": "Buy orders (any order: they are sorted, highest price first)"
      },
      {
        "name": "asks",
        "type": "OrderBookLevels",
        "required": true,
        "description": "Sell orders (any order: they are sorted, lowest price first)"
      },
      {
        "name": "time",
        "type": "number",
        "required": false,
        "description": "Exchange time of the snapshot (ms since epoch); the local clock when omitted"
      }
    ]
  },
  "OrderBookDelta": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Incremental update of an order book: every level sets the new resting size of its price, a size of 0 removes the level",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "bids",
        "type": "OrderBookLevels",
        "required": false,
        "description": "Changed buy levels"
      },
      {
        "name": "asks",
        "type": "OrderBookLevels",
        "required": false,
        "description": "Changed sell levels"
      },
      {
        "name": "time",
        "type": "number",
        "required": false,
        "description": "Exchange time of the update (ms since epoch); the local clock when omitted"
      }
    ]
  },
  "OrderBookLevelColumns": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Price levels as two parallel columns (typed arrays welcome)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "price",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Prices of the levels"
      },
      {
        "name": "size",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Resting size of each level (0 removes the level in a delta)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础

book 接收快照（任意顺序的 [价格, 数量] 档位）。行数随高度自动填满；价差行显示中间价（或 lastPrice）及以基点计的价差，底部条显示买卖力量对比。悬停某行：显示从最优档到该行的均价、累计数量与成交额。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook } from "minerva-design/charts";
import { createMarketFeed } from "../feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  // a BTC/USDT book: 0.1 USDT price tick, sizes in BTC
  const book = useMemo(() => createMarketFeed({ seed: 1 }).snapshot(), []);
  return (
    <OrderBook
      book={book}
      height={420}
      pricePrecision={1}
      sizePrecision={4}
      labels={{ price: t("price"), size: t("size"), total: t("total") }}
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

## Example: 紧凑（移动端）

手机面板：两列、17 px 行高、无买卖比例条，行数随高度自动决定（或设置 rows）。宽度小于 260 px 时文字缩小并隐藏第三列。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/compact.tsx

```tsx
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 5 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  // a phone-sized panel: two columns, smaller rows, as many as fit
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 300 }}>
      <OrderBook
        ref={bookRef}
        height={300}
        rowHeight={17}
        fontSize={11}
        columns={["price", "size"]}
        imbalance={false}
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

## Example: 暗色交易终端

订单簿读取容器上的 CSS 变量：在外层设置终端配色（或使用站点暗色主题）。等宽字体让数字对齐；total="quote" 以 USDT 显示累计成交额，depthBars="level" 每档一条深度条。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/dark.tsx

```tsx
import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

// a trading terminal palette: the ladder reads its colors from these
// variables (a dark site theme works the same way, without the wrapper)
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
  padding: "12px 4px 4px",
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 4 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  return (
    <div ref={boxRef} style={TERMINAL}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px 8px",
          fontSize: 13,
        }}
      >
        <strong>{t("pair")}</strong>
        <span style={{ color: "#848e9c" }}>{t("title")}</span>
      </div>
      <OrderBook
        ref={bookRef}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        // the total column in USDT, bars per level
        total="quote"
        depthBars="level"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
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

## Example: 价格合并

grouping 按价格步长合并档位：买单向下取整、卖单向上取整，因此两侧区间不会交叉。价格小数位随步长变化。depthBars 绘制累计或单档深度条。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/grouping.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

const STEPS = [0.1, 0.5, 1, 10, 50];

export default function GroupingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [grouping, setGrouping] = useState(1);
  const [bars, setBars] = useState<"cumulative" | "level">("cumulative");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 3 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("grouping")}
          direction="horizontal"
          value={grouping}
          onChange={(value) => setGrouping(Number(value))}
        >
          {STEPS.map((step) => (
            <Radio
              key={step}
              value={step}
              label={new Intl.NumberFormat(i18n.language).format(step)}
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("depthBars")}
          direction="horizontal"
          value={bars}
          onChange={(value) => setBars(value as "cumulative" | "level")}
        >
          <Radio value="cumulative" label={t("barsCumulative")} />
          <Radio value="level" label={t("barsLevel")} />
        </RadioGroup>
      </div>
      <OrderBook
        ref={bookRef}
        // bids are rounded down to the step, asks up: buckets never cross
        grouping={grouping}
        depthBars={bars}
        // the price decimals follow the step (1 → "64,012")
        sizePrecision={3}
        height={420}
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

## Example: 大单高亮

达到 largeOrderThreshold 的档位会着色、加标记并加粗。点击某行（或按 Enter）会触发 onLevelClick 并带上累计数值，例如用于填写下单表单。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/large-orders.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

const THRESHOLDS = [2, 5, 10];

export default function LargeOrdersDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [threshold, setThreshold] = useState(5);
  const [picked, setPicked] = useState<OrderBookLevelEvent | null>(null);
  // a fresh market on every mount: its snapshot, then its deltas; more
  // whales than usual: walls of 5 to 30 BTC
  useMarketStream(
    boxRef,
    { seed: 8, whales: 0.03 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  const price = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 4,
  });
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
      <OrderBook
        ref={bookRef}
        largeOrderThreshold={threshold}
        depthBars="level"
        height={420}
        pricePrecision={1}
        sizePrecision={4}
        onLevelClick={setPicked}
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {picked
          ? t(picked.side === "bid" ? "pickedBid" : "pickedAsk", {
              price: price.format(picked.price),
              size: size.format(picked.size),
              sum: size.format(picked.sum),
            })
          : t("pickHint")}
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

## Example: 高频行情

模拟撮合引擎每秒通过 ref 句柄发送 10 到 200 条消息：applyDeltas 更新订单簿，setLastPrice 更新最新成交价。变动的档位会闪烁（增加时为该侧颜色，减少时为灰色）；每条消息只是几次数组写入，阶梯每帧只绘制一次，离开视口即停止。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/live.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookHandle } from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function LiveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [rate, setRate] = useState(50);
  const [stats, setStats] = useState({ updates: 0, levels: 0 });
  const counter = useRef({ updates: 0, levels: 0, since: 0 });

  // the simulated exchange, created on mount: one snapshot, then a stream
  // of deltas; every message goes straight to the ladder (it draws once
  // per frame)
  useMarketStream(
    boxRef,
    { seed: 2 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
        const c = counter.current;
        c.updates++;
        c.levels += delta.bids.length + delta.asks.length;
        const now = performance.now();
        if (now - c.since >= 1000) {
          const seconds = c.since ? (now - c.since) / 1000 : 1;
          setStats({
            updates: Math.round(c.updates / seconds),
            levels: Math.round(c.levels / seconds),
          });
          counter.current = { updates: 0, levels: 0, since: now };
        }
      },
    },
    { interval: 1000 / rate },
  );

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("updateRate")}
        direction="horizontal"
        value={rate}
        onChange={(value) => setRate(Number(value))}
      >
        {[10, 50, 200].map((value) => (
          <Radio key={value} value={value} label={t("perSecond", { value })} />
        ))}
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        height={440}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("liveStats", {
          updates: number.format(stats.updates),
          levels: number.format(stats.levels),
        })}
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

## Example: 不同资产类别

同一个盘口展示加密货币、美股、外汇和期货：formatPrice 与 formatSize 采用各市场的惯例（美元与美分、整手股数、以百万计的欧元、合约张数），labels 重命名列，largeOrderThreshold 按各市场的常见挂单量设置。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/markets.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { OrderBook, type OrderBookLevel } from "minerva-design/charts";
import { mulberry32 } from "../feed";

type MarketId = "crypto" | "equity" | "fx" | "futures";

interface Market {
  id: MarketId;
  /** Price increment */
  tick: number;
  /** Decimals of the prices */
  decimals: number;
  /** Best bid, in ticks */
  bid: number;
  /** Spread, in ticks */
  spread: number;
  /** Size of a level, in base units (contracts, shares, euros, BTC) */
  size: (random: () => number, ticks: number) => number;
  /** Highlighted resting size */
  large: number;
  seed: number;
}

const MARKETS: Market[] = [
  {
    id: "crypto",
    tick: 0.1,
    decimals: 1,
    bid: 640_125,
    spread: 1,
    size: (random) =>
      Math.round(
        (0.002 + random() ** 4 * 3 + (random() < 0.03 ? 9 : 0)) * 1e4,
      ) / 1e4,
    large: 5,
    seed: 101,
  },
  {
    // one-cent ticks, round lots of 100 shares, more on whole dollars
    id: "equity",
    tick: 0.01,
    decimals: 2,
    bid: 22_844,
    spread: 2,
    size: (random, ticks) =>
      Math.ceil((0.2 + random() ** 3 * 10) * (ticks % 100 === 0 ? 6 : 1)) * 100,
    large: 3_000,
    seed: 102,
  },
  {
    // a tenth of a pip, sizes in whole millions of euros
    id: "fx",
    tick: 0.00001,
    decimals: 5,
    bid: 108_541,
    spread: 2,
    size: (random) => (1 + Math.floor(random() ** 2 * 12)) * 1_000_000,
    large: 10_000_000,
    seed: 103,
  },
  {
    // E-mini S&P 500: quarter-point ticks, hundreds of contracts per level
    id: "futures",
    tick: 0.25,
    decimals: 2,
    bid: 23_211,
    spread: 1,
    size: (random) => 20 + Math.floor(random() ** 2 * 260),
    large: 250,
    seed: 104,
  },
];

function marketBook(market: Market) {
  const random = mulberry32(market.seed);
  const side = (from: number, step: 1 | -1): OrderBookLevel[] =>
    Array.from({ length: 60 }, (_, i) => {
      const ticks = from + step * i;
      return [
        Number((ticks * market.tick).toFixed(market.decimals)),
        market.size(random, ticks),
      ];
    });
  return {
    bids: side(market.bid, -1),
    asks: side(market.bid + market.spread, 1),
  };
}

export default function MarketsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const [id, setId] = useState<MarketId>("crypto");
  const market = MARKETS.find((item) => item.id === id) ?? MARKETS[0];
  const book = useMemo(() => marketBook(market), [market]);

  // each market has its own price and size conventions
  const { formatPrice, formatSize, spread } = useMemo(() => {
    const price = new Intl.NumberFormat(locale, {
      ...(market.id === "equity" ? { style: "currency", currency: "USD" } : {}),
      minimumFractionDigits: market.decimals,
      maximumFractionDigits: market.decimals,
    });
    const size =
      market.id === "crypto"
        ? new Intl.NumberFormat(locale, { maximumFractionDigits: 4 })
        : market.id === "futures"
          ? new Intl.NumberFormat(locale)
          : new Intl.NumberFormat(locale, {
              notation: "compact",
              maximumFractionDigits: 1,
            });
    const ticks = market.spread;
    const width = ticks * market.tick;
    const unit = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
    return {
      formatPrice: (value: number) => price.format(value),
      formatSize: (value: number) => size.format(value),
      // spreads are quoted in the unit of each market
      spread:
        market.id === "fx"
          ? t("spreadPips", { value: unit.format(width / 0.0001) })
          : market.id === "equity"
            ? t("spreadCents", { value: unit.format(width * 100) })
            : market.id === "futures"
              ? t("spreadTicks", { value: unit.format(ticks) })
              : t("spreadUsdt", { value: price.format(width) }),
    };
  }, [locale, market, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("market")}
        direction="horizontal"
        value={id}
        onChange={(value) => setId(value as MarketId)}
      >
        {MARKETS.map((item) => (
          <Radio
            key={item.id}
            value={item.id}
            label={t(`markets.${item.id}.name`)}
          />
        ))}
      </RadioGroup>
      <OrderBook
        book={book}
        formatPrice={formatPrice}
        formatSize={formatSize}
        largeOrderThreshold={market.large}
        labels={{
          price: t(`markets.${id}.price`),
          size: t(`markets.${id}.size`),
          total: t(`markets.${id}.total`),
        }}
        height={400}
        ariaLabel={t(`markets.${id}.aria`)}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {t("marketStatus", {
          tick: formatPrice(market.tick),
          spread,
          large: formatSize(market.large),
        })}
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

## Example: 显示模式

mode 可显示双侧，或仅显示买盘或卖盘：此时单侧占满整个高度。方向键在各行间移动，Enter 选中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/modes.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookMode,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function ModesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<OrderBookMode>("both");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 9 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
      },
    },
  );

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("mode")}
        direction="horizontal"
        value={mode}
        onChange={(value) => setMode(value as OrderBookMode)}
      >
        <Radio value="both" label={t("modeBoth")} />
        <Radio value="bids" label={t("modeBids")} />
        <Radio value="asks" label={t("modeAsks")} />
      </RadioGroup>
      <OrderBook
        ref={bookRef}
        // one side fills the whole height: twice the levels
        mode={mode}
        height={380}
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

## Example: 下单面板

onLevelClick 填写下单面板：点击卖盘档位，按该价格和累计数量（sum）准备买单；点击买盘档位则准备卖单。预览会遍历盘口：可成交部分立即以均价成交，剩余部分排在已挂数量之后。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/order-ticket.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, NumberInput, Radio, RadioGroup, Tag } from "minerva-design";
import {
  OrderBook,
  type OrderBookLevel,
  type OrderBookLevelEvent,
} from "minerva-design/charts";
import { createMarketFeed } from "../feed";

type Side = "buy" | "sell";

interface Order {
  id: number;
  side: Side;
  price: number;
  size: number;
}

/**
 * What a limit order would do against the book (best levels first): the
 * part that crosses fills at once, the rest joins the queue of its side
 */
function preview(
  bids: OrderBookLevel[],
  asks: OrderBookLevel[],
  side: Side,
  price: number,
  size: number,
) {
  const opposite = side === "buy" ? asks : bids;
  const crosses = (level: number) =>
    side === "buy" ? level <= price : level >= price;
  let filled = 0;
  let notional = 0;
  for (const [level, available] of opposite) {
    if (filled >= size || !crosses(level)) break;
    const fill = Math.min(available, size - filled);
    filled += fill;
    notional += fill * level;
  }
  // size resting at the same or a better price, filled before the order
  let ahead = 0;
  for (const [level, resting] of side === "buy" ? bids : asks) {
    if (side === "buy" ? level < price : level > price) break;
    ahead += resting;
  }
  return {
    filled,
    average: filled ? notional / filled : NaN,
    rest: Math.max(0, size - filled),
    ahead: filled ? 0 : ahead,
  };
}

export default function OrderTicketDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const book = useMemo(() => createMarketFeed({ seed: 23 }).snapshot(), []);
  const [side, setSide] = useState<Side>("buy");
  const [price, setPrice] = useState<number | null>(book.bids[0][0]);
  const [size, setSize] = useState<number | null>(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [status, setStatus] = useState("");

  // a click on an ask prepares a buy at that price for everything above
  // it down to the spread (sum), a click on a bid a sell
  const pick = (level: OrderBookLevelEvent) => {
    setSide(level.side === "ask" ? "buy" : "sell");
    setPrice(level.price);
    setSize(Math.round(level.sum * 1e4) / 1e4);
  };

  const result =
    price && size ? preview(book.bids, book.asks, side, price, size) : null;
  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 4 });
  const sideLabel = (value: Side) => (value === "buy" ? t("buy") : t("sell"));

  const place = () => {
    if (!price || !size) return;
    setOrders((list) => [
      ...list,
      { id: (list.at(-1)?.id ?? 0) + 1, side, price, size },
    ]);
    setStatus(
      t("orderPlaced", {
        side: sideLabel(side),
        size: btc.format(size),
        price: usd.format(price),
      }),
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        width: "100%",
      }}
    >
      <OrderBook
        book={book}
        height={400}
        pricePrecision={1}
        sizePrecision={4}
        onLevelClick={pick}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 12, alignContent: "start" }}>
        <strong>{t("ticket")}</strong>
        <RadioGroup
          aria-label={t("side")}
          direction="horizontal"
          value={side}
          onChange={(value) => setSide(value as Side)}
        >
          <Radio value="buy" label={t("buy")} />
          <Radio value="sell" label={t("sell")} />
        </RadioGroup>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          {t("limitPrice")}
          <NumberInput
            value={price}
            onChange={setPrice}
            min={0}
            step={0.1}
            precision={1}
          />
        </label>
        <label style={{ display: "grid", gap: 4, fontSize: 13 }}>
          {t("quantity")}
          <NumberInput
            value={size}
            onChange={setSize}
            min={0}
            step={0.1}
            precision={4}
          />
        </label>
        <span
          style={{
            color: "var(--text-secondary-color)",
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {!result
            ? t("ticketHint")
            : result.filled > 0
              ? t(result.rest > 0 ? "previewPartial" : "previewFill", {
                  filled: btc.format(result.filled),
                  average: usd.format(result.average),
                  rest: btc.format(result.rest),
                  price: usd.format(price ?? 0),
                })
              : t("previewRest", {
                  price: usd.format(price ?? 0),
                  ahead: btc.format(result.ahead),
                })}
        </span>
        <Button disabled={!result} onClick={place}>
          {t("placeOrder", { side: sideLabel(side) })}
        </Button>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {orders.map((order) => (
            <Tag
              key={order.id}
              color={order.side === "buy" ? "success" : "danger"}
              closable
              closeLabel={t("cancelOrder")}
              onClose={() => {
                setOrders((list) => list.filter((o) => o.id !== order.id));
                setStatus(
                  t("orderCancelled", { price: usd.format(order.price) }),
                );
              }}
            >
              {t("orderTag", {
                side: sideLabel(order.side),
                size: btc.format(order.size),
                price: usd.format(order.price),
              })}
            </Tag>
          ))}
        </div>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
        >
          {orders.length === 0 && !status ? t("noOrders") : status}
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

## Example: 红涨绿跌

colorConvention="red-up"：买盘为红色、卖盘为绿色（中国大陆、日本、韩国的习惯）。闪烁、深度条、买卖比例条与最新价箭头都随之变化。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/red-up.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBook,
  type OrderBookColorConvention,
  type OrderBookHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");
  // a fresh market on every mount: its snapshot, then its deltas
  useMarketStream(
    boxRef,
    { seed: 6 },
    {
      load: (feed) => bookRef.current?.setBook(feed.snapshot()),
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
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
      <OrderBook
        ref={bookRef}
        // red bids and green asks (mainland China, Japan, Korea)
        colorConvention={convention}
        height={400}
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

## Example: 交易终端

一个模拟行情源同时驱动三个组件：订单簿、深度图与逐笔成交，就像一条交易所 WebSocket。点击某一档：其价格会作为限价线显示在深度图上。React 只重新渲染顶部行情，每秒四次。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/terminal.tsx

```tsx
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DepthChart,
  OrderBook,
  TimeAndSales,
  type DepthChartHandle,
  type OrderBookHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import { useMarketStream } from "../feed";

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function TerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const bookRef = useRef<OrderBookHandle>(null);
  const depthRef = useRef<DepthChartHandle>(null);
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // one market for the three widgets, like one exchange WebSocket; a
  // fresh one on every mount (snapshot first, then the stream)
  const [ticker, setTicker] = useState<{ last: number; open: number } | null>(
    null,
  );
  const [limit, setLimit] = useState<number | null>(null);
  const shownAt = useRef(0);

  useMarketStream(
    boxRef,
    { seed: 10 },
    {
      load: (feed) => {
        const book = feed.snapshot();
        bookRef.current?.setBook(book);
        bookRef.current?.setLastPrice(feed.last());
        depthRef.current?.setBook(book);
        tapeRef.current?.clear();
        setTicker({ last: feed.last(), open: feed.last() });
      },
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        depthRef.current?.applyDeltas(delta);
        if (!trades.length) return;
        tapeRef.current?.addTrades(trades);
        bookRef.current?.setLastPrice(feed.last());
        // React only renders the header, four times a second
        const now = performance.now();
        if (now - shownAt.current > 250) {
          shownAt.current = now;
          setTicker(
            (previous) => previous && { ...previous, last: feed.last() },
          );
        }
      },
    },
  );

  const limitLabel = t("limit");
  const limitLines = useMemo(
    () => (limit === null ? [] : [{ price: limit, label: limitLabel }]),
    [limit, limitLabel],
  );
  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 2,
    signDisplay: "always",
  });
  const change = ticker ? ticker.last / ticker.open - 1 : 0;
  const common = {
    pricePrecision: 1,
    sizePrecision: 4,
    fontFamily: MONO,
  };
  const panel = {
    border: "1px solid var(--border-color)",
    borderRadius: 10,
    padding: "8px 4px 4px",
    minWidth: 0,
  };
  const heading = {
    margin: "0 10px 6px",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-secondary-color)",
  };

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "4px 16px",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong style={{ fontSize: 16 }}>{t("pair")}</strong>
        <span
          style={{
            fontSize: 20,
            fontWeight: 700,
            fontFamily: MONO,
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {ticker ? price.format(ticker.last) : "\u2014"}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {t("sessionChange", { value: percent.format(change) })}
        </span>
        <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
          {limit === null
            ? t("pickHint")
            : t("limitAt", { price: price.format(limit) })}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <section style={panel} aria-label={t("title")}>
          <h4 style={heading}>{t("title")}</h4>
          <OrderBook
            ref={bookRef}
            height={472}
            onLevelClick={(level) => setLimit(level.price)}
            labels={{ price: t("price"), size: t("size"), total: t("total") }}
            ariaLabel={t("aria")}
            {...common}
          />
        </section>
        <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
          <section style={panel} aria-label={t("depth")}>
            <h4 style={heading}>{t("depth")}</h4>
            <DepthChart
              ref={depthRef}
              height={200}
              range={0.002}
              legend={false}
              // the price picked in the ladder
              priceLines={limitLines}
              ariaLabel={t("depthAria")}
              {...common}
            />
          </section>
          <section style={panel} aria-label={t("trades")}>
            <h4 style={heading}>{t("trades")}</h4>
            <TimeAndSales
              ref={tapeRef}
              height={220}
              largeTradeThreshold={1}
              ariaLabel={t("tradesAria")}
              {...common}
            />
          </section>
        </div>
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

## Example: 大单墙监控（幌骗）

传给 applyDeltas 的增量同时与每个档位之前的数量比较：一次增加 5 BTC 及以上即视为新的大单墙，并由 largeOrderThreshold 高亮。它消失时，根据该价位的成交判断是被吃掉，还是在价格到达前被撤单。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book/demos/wall-watch.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tag } from "minerva-design";
import {
  OrderBook,
  type OrderBookHandle,
  type OrderBookLevel,
} from "minerva-design/charts";
import { useMarketStream, type MarketFeed } from "../feed";

/** A level growing by at least this much at once is a new wall (BTC) */
const WALL = 5;

type Side = "bid" | "ask";

interface Wall {
  id: number;
  side: Side;
  price: number;
  /** Size the wall added */
  size: number;
  /** Size of the level before the wall */
  base: number;
  /** Volume traded at the wall's price since it appeared */
  traded: number;
  time: number;
}

interface WallEvent {
  id: number;
  kind: "new" | "pulled" | "filled";
  side: Side;
  price: number;
  size: number;
  /** Seconds the wall rested (when it left) */
  rested: number;
}

export default function WallWatchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book.data",
  });
  const locale = i18n.language;
  const bookRef = useRef<OrderBookHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<WallEvent[]>([]);
  const [counts, setCounts] = useState({ resting: 0, pulled: 0, filled: 0 });
  // our own copy of the book, to see each level's change, and the walls
  const sizes = useRef<Record<Side, Map<number, number>>>({
    bid: new Map(),
    ask: new Map(),
  });
  const walls = useRef<Wall[]>([]);
  const nextId = useRef(0);

  const load = (feed: MarketFeed) => {
    const snapshot = feed.snapshot();
    sizes.current = {
      bid: new Map(snapshot.bids),
      ask: new Map(snapshot.asks),
    };
    walls.current = [];
    setEvents([]);
    setCounts({ resting: 0, pulled: 0, filled: 0 });
    bookRef.current?.setBook(snapshot);
  };

  useMarketStream(
    boxRef,
    // more whales than usual, and some of their walls are spoofs
    { seed: 18, whales: 0.03 },
    {
      load,
      update: ({ delta, trades }, feed) => {
        bookRef.current?.applyDeltas(delta);
        if (trades.length) bookRef.current?.setLastPrice(feed.last());
        for (const trade of trades)
          for (const wall of walls.current)
            if (trade.price === wall.price) wall.traded += trade.size;

        const found: WallEvent[] = [];
        const scan = (side: Side, levels: OrderBookLevel[]) => {
          const map = sizes.current[side];
          for (const [price, size] of levels) {
            const before = map.get(price) ?? 0;
            if (size - before >= WALL) {
              const wall: Wall = {
                id: nextId.current++,
                side,
                price,
                size: size - before,
                base: before,
                traded: 0,
                time: delta.time,
              };
              walls.current.push(wall);
              found.push({ ...wall, kind: "new", rested: 0 });
            }
            if (size === 0) map.delete(price);
            else map.set(price, size);
          }
        };
        scan("bid", delta.bids);
        scan("ask", delta.asks);

        // a wall is gone once 70% of it left the level: eaten by trades at
        // its price, or pulled before the price got there (spoofing)
        let pulled = 0;
        let filled = 0;
        walls.current = walls.current.filter((wall) => {
          const now = sizes.current[wall.side].get(wall.price) ?? 0;
          if (now > wall.base + wall.size * 0.3) return true;
          const kind = wall.traded >= wall.size * 0.3 ? "filled" : "pulled";
          if (kind === "filled") filled++;
          else pulled++;
          found.push({
            ...wall,
            kind,
            id: nextId.current++,
            rested: (delta.time - wall.time) / 1000,
          });
          return false;
        });
        if (!found.length) return;
        setEvents((list) => [...found.reverse(), ...list].slice(0, 6));
        setCounts((c) => ({
          resting: walls.current.length,
          pulled: c.pulled + pulled,
          filled: c.filled + filled,
        }));
      },
    },
  );

  const price = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  const seconds = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "second",
    maximumFractionDigits: 0,
  });
  const percent = new Intl.NumberFormat(locale, { style: "percent" });
  const integer = new Intl.NumberFormat(locale);
  const gone = counts.pulled + counts.filled;
  const tags = {
    new: { color: "info", label: t("wallNew") },
    pulled: { color: "warning", label: t("wallPulled") },
    filled: { color: "success", label: t("wallFilled") },
  } as const;

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
      <OrderBook
        ref={bookRef}
        largeOrderThreshold={WALL}
        depthBars="level"
        height={420}
        pricePrecision={1}
        sizePrecision={4}
        ariaLabel={t("aria")}
      />
      <div style={{ display: "grid", gap: 8, alignContent: "start" }}>
        <strong>{t("wallLog")}</strong>
        <span
          style={{
            color: "var(--text-secondary-color)",
            fontSize: 13,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {t("wallStats", {
            size: btc.format(WALL),
            resting: integer.format(counts.resting),
            pulled: integer.format(counts.pulled),
            filled: integer.format(counts.filled),
            ratio: percent.format(gone ? counts.pulled / gone : 0),
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
          {events.length === 0 && (
            <span style={{ color: "var(--text-secondary-color)" }}>
              {t("wallWaiting")}
            </span>
          )}
          {events.map((event) => (
            <span
              key={event.id}
              style={{ display: "flex", gap: 8, alignItems: "center" }}
            >
              <Tag color={tags[event.kind].color}>{tags[event.kind].label}</Tag>
              {t(event.side === "bid" ? "wallBid" : "wallAsk", {
                price: price.format(event.price),
                size: btc.format(event.size),
              })}
              {event.kind !== "new" && (
                <span style={{ color: "var(--text-secondary-color)" }}>
                  {t("wallRested", { value: seconds.format(event.rested) })}
                </span>
              )}
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
