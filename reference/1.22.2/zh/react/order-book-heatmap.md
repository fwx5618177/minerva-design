# 订单簿热力图

Bookmap 风格的流动性热力图：按时间与价格绘制挂单量（GPU 渲染），叠加最优买卖价线、按成交量缩放的成交气泡与当前订单簿剖面，支持缩放、平移与十字准线读数。实时数据按间隔追加列并保持滑动窗口。

Package: minerva-design@1.22.2

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### 如何阅读

热力图是订单簿随时间的录像：每一列是某一时刻的订单簿快照，从左到右依次排开，最右侧是现在。

横轴是时间（最新在右），纵轴是价格。悬停在任意位置，十字准线会读出该时刻、该价格的挂单量。

格子的颜色是该时刻、该价格上挂着的委托数量：暗色表示几乎没有挂单，越亮（蓝 → 青 → 黄 → 白）挂单越多。左上角的色标给出颜色对应的数量范围与单位。

水平的亮线是一直挂在订单簿里的大单（单墙）。亮线在某处结束，说明这笔挂单被撤掉或被成交：如果价格线正好走到亮线的终点，就是被吃掉了。

贴着价格走的红线和绿线是最优卖价与最优买价，两线之间是买卖价差。价格轴上实心的红、绿标签是当前最优卖价与买价，描边标签是最新成交价。

圆点是成交：绿色为主动买入（吃掉卖单），红色为主动卖出（打掉买单），面积随该列的成交量增大，大气泡就是大额成交。colorConvention="red-up" 会交换这两种颜色。

右侧的横条是当前订单簿：上方红色为卖单，下方绿色为买单，条越长挂单越多，下方刻度是数量。

#### 常见形态

支撑与阻力：价格多次碰到一条亮线后折返，说明这笔大单在承接或压制价格。

撤单（虚假挂单）：价格接近时亮线突然消失，但那里没有成交气泡，说明委托是被撤掉的，而不是被成交。

扫单：一串大气泡快速穿过多个价位，价格线跳动，沿途的挂单变暗。

流动性稀薄：价格附近大片暗色区域表示挂单很少，价格可以很快穿过。

K 线：由调用方提供真实 OHLC 数据，与热力格共用毫秒时间轴及价格坐标；缺失时段保持空缺，不从挂单快照编造 K 线。最新价线使用新成交或更新的蜡烛收盘价。

历史导航：缩放和平移会停止跟随；导航条选择已保留的时间范围，恢复跟随会回到最新行情。getView / setView 与 viewChange 使用同一视图数据。

强度筛选：intensityRange 是颜色映射之后的 0–1 显示区间；它不改变原始挂单量、提示框数值或自动颜色标尺。

数据与语义

本组件展示挂单流动性及调用方提供的成交 K 线。示例数据来自可复现的模拟撮合；真实清算热力图需要独立的清算数据，不能把挂单量直接当成清算量。

BTC/USDT 流动性热力图

渲染后端：{{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

正在跟随行情

自由视图（已缩放或平移）

跟随行情

颜色映射

对数

平方根

线性

对比度

×{{value}}

涨跌颜色

红涨绿跌

绿涨红跌

悬停列：买入 {{buys}} BTC，卖出 {{sells}} BTC

悬停在某列上查看其成交量。

行高

价格范围

{{value}} USDT

自动

适配盘口

{{time}} · {{price}} · {{size}} BTC {{side}} · 买入 {{buys}} BTC，卖出 {{sells}} BTC

{{low}} – {{high}}

（买盘）

（卖盘）

（价差内）

悬停在单元格上查看详情。

时间窗口

实时行情

清空历史

已于 {{time}} 暂停。

已于 {{time}} 恢复。

已于 {{time}} 清空历史。

显示 {{window}}，共保留 {{history}}。

BTC/USDT

最新价 {{value}}

价差 {{value}}

逐笔成交 {{value}} 笔

BTC/USDT 订单簿

BTC/USDT 逐笔成交

BTC-USD 永续合约

1 张 = {{value}} BTC

资金费率 {{rate}}

资金费率 {{rate}}，结算时间 {{time}}，剩余 {{countdown}}

张

挂单

主动买入

主动卖出

BTC-USD 永续合约流动性热力图

{{price}}：挂单 {{contracts}} 张（≈ {{notional}}）

悬停在热力图上查看挂单张数及其价值。

模拟市场

成交 K 线

每根 2 秒 K 线汇总此固定种子撮合引擎的实际成交。无成交的时间段不补线，挂单不会转换为 K 线。

可见强度范围

筛选挂单流动性的归一化颜色强度，只改变可见性，不改变盘口数量或成交量。

保留的成交历史

拖动范围滑块查看保留历史。跟随市场会恢复最新时间和自动价格居中。

流动性终端

最新成交价

买盘深度

卖盘深度

盘口失衡

最大买单墙

最大卖单墙

配色

海洋

余烬

重置视图

当前订单簿

固定种子模拟，并非外部交易所行情。六项指标、成交 K 线与盘口均来自同一撮合引擎。指标每秒刷新，盘口更新独立推送。

模拟流动性与成交 K 线

带强度筛选的模拟流动性

可导航的模拟流动性历史

模拟 BTC USDT 流动性终端

当前模拟 BTC USDT 订单簿

## OrderBookHeatmap

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "OrderBookHeatmap"
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
    "description": "Book, applied when the object changes (stream updates through the ref)"
  },
  {
    "name": "trades",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "array",
    "typeText": "readonly MarketTrade[] | undefined",
    "typeRef": "type:edf3d4fed366b73e5f82",
    "required": false,
    "description": "Trades; when the array grows, only the appended ones are added"
  },
  {
    "name": "bars",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "union",
    "typeText": "TradingBarsInput | undefined",
    "typeRef": "type:03e8bd548e3d64fe4c79",
    "required": false,
    "description": "Candle history, passed through setBars when its identity changes"
  },
  {
    "name": "candles",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Supplied OHLC bars drawn over liquidity; duration uses the lower median of the last 256 observed intervals (1 s for a single bar), leaving missing intervals empty."
  },
  {
    "name": "lastPriceLine",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Dashed latest trade price and axis tag; a bar opened after that trade supplies its newer close instead."
  },
  {
    "name": "intensityRange",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "array",
    "typeText": "readonly [number, number] | undefined",
    "typeRef": "type:993918f52c7908c02d32",
    "required": false,
    "description": "Inclusive normalized intensity range, after the color curve; display-only."
  },
  {
    "name": "maxColumns",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 6000,
    "required": false,
    "description": "Maximum retained columns, clamped to 4–12000 and a 1000000 sampled-row budget."
  },
  {
    "name": "maxBars",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 20000,
    "required": false,
    "description": "Maximum retained OHLC bars, clamped to 1–100000."
  },
  {
    "name": "tickSize",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Height of a price row (levels are aggregated into rows); a round multiple of the book's tick of about 0.1 basis point when omitted"
  },
  {
    "name": "interval",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false,
    "description": "Time between two columns, in ms: the book is sampled at this pace"
  },
  {
    "name": "window",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 60000,
    "required": false,
    "description": "Visible time span, in ms (zoomable)"
  },
  {
    "name": "history",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 300000,
    "required": false,
    "description": "History kept, in ms (columns older than this are dropped)"
  },
  {
    "name": "depth",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 160,
    "required": false,
    "description": "Price rows sampled on each side of the book per column"
  },
  {
    "name": "priceSpan",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Visible price span (top − bottom); fits the best bid / ask of the window when omitted"
  },
  {
    "name": "colorScale",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "linear",
      "log",
      "sqrt"
    ],
    "typeText": "OrderBookHeatmapScale | undefined",
    "typeRef": "type:207aa67ea4812f4bf182",
    "default": "sqrt",
    "required": false,
    "description": "Scale from sizes to colors: `sqrt` keeps typical levels dim and lets significant liquidity glow, `linear` shows only the walls, `log` reveals thin liquidity next to them"
  },
  {
    "name": "sizeUnit",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Unit of the sizes, shown after them in the legend and the tooltip (e.g. \"BTC\"); the numbers are not converted"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Legend of the color ramp (cold to hot, its size range) and of the trades, in the top-left corner of the plot"
  },
  {
    "name": "contrast",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Multiplies the sizes before the scale: above 1 brightens thin liquidity (more of the field glows), below 1 keeps only the largest walls"
  },
  {
    "name": "maxSize",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Size drawn with the hottest color (larger sizes saturate); when omitted, the 99th percentile of the visible non-empty cells (eased), so typical levels stay dark and only the top liquidity glows"
  },
  {
    "name": "colors",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Color ramp, coldest first, interpolated in OKLab. The first color also fills the cells without liquidity (the field is opaque, no holes): make it a dark color in dark themes and a pale one in light themes. A perceptual heat ramp suited to the theme when omitted"
  },
  {
    "name": "bubbles",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Trades drawn as bubbles sized by volume (buys / sells colors)"
  },
  {
    "name": "bubbleSize",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 14,
    "required": false,
    "description": "Diameter of the largest bubble, in pixels (area ∝ volume, the smallest are 3 px dots)"
  },
  {
    "name": "bubbleVolume",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Trade volume of the largest bubble; when omitted, the largest visible trade (eased)"
  },
  {
    "name": "bestLines",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Best bid and ask lines"
  },
  {
    "name": "profile",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Profile of the current book at the right edge"
  },
  {
    "name": "interactive",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Wheel / pinch zoom and drag pan (double click resumes following the market)"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Hover crosshair and tooltip"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the cells: the GPU when available"
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
    "description": "Clock of the time axis and the tooltip: the local time or UTC (the clock of most exchanges)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/engine/orderbook/types.ts",
    "kind": "object",
    "typeText": "Partial<OrderBookHeatmapLabels> | undefined",
    "typeRef": "type:2e819b75d499c23f357f",
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
    "name": "onViewChange",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((data: OrderBookHeatmapViewData) => void) | undefined",
    "typeRef": "type:ccca1796ae329a55312d",
    "parameters": [
      {
        "name": "data",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "OrderBookHeatmapViewData",
        "typeRef": "type:d39c86a0df055e254111"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Available history or current viewport changed"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((event: OrderBookHeatmapHoverEvent | null) => void) | undefined",
    "typeRef": "type:5d251419674e78680f2a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "OrderBookHeatmapHoverEvent | null",
        "typeRef": "type:068474ce52d01381d363"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Hovered cell (`null` when the pointer leaves)"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:ad7ce5364bd44ae54d21",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Backend in use (also after a GPU loss)"
  },
  {
    "name": "onFollowChange",
    "source": "packages/charts/src/react/orderbook.tsx",
    "kind": "function",
    "typeText": "((follow: boolean) => void) | undefined",
    "typeRef": "type:ea62ee9e97c8217c2c62",
    "parameters": [
      {
        "name": "follow",
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
    "description": "`true` while the view follows the market, `false` after a zoom / pan"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "OrderBookHeatmapProps": {
    "source": "charts/src/react/orderbook.tsx",
    "description": "Props of `OrderBookHeatmap`",
    "kind": "interface",
    "extends": [
      "OrderBookHeatmapOptions",
      "OrderBookWidgetProps"
    ],
    "props": [
      {
        "name": "book",
        "type": "OrderBookSnapshot",
        "required": false,
        "description": "Book, applied when the object changes (stream updates through the ref)"
      },
      {
        "name": "trades",
        "type": "readonly MarketTrade[]",
        "required": false,
        "description": "Trades; when the array grows, only the appended ones are added"
      },
      {
        "name": "bars",
        "type": "TradingBarsInput",
        "required": false,
        "description": "Candle history, passed through setBars when its identity changes"
      },
      {
        "name": "onViewChange",
        "type": "(data: OrderBookHeatmapViewData) => void",
        "required": false,
        "description": "Available history or current viewport changed"
      },
      {
        "name": "onHover",
        "type": "(event: OrderBookHeatmapHoverEvent | null) => void",
        "required": false,
        "description": "Hovered cell (`null` when the pointer leaves)"
      },
      {
        "name": "onRendererChange",
        "type": "(renderer: ChartRendererKind) => void",
        "required": false,
        "description": "Backend in use (also after a GPU loss)"
      },
      {
        "name": "onFollowChange",
        "type": "(follow: boolean) => void",
        "required": false,
        "description": "`true` while the view follows the market, `false` after a zoom / pan"
      },
      {
        "name": "ref",
        "type": "Ref<OrderBookHeatmapHandle>",
        "required": false,
        "description": "Imperative handle: `setBook`, `applyDeltas`, `addTrades`, `clear`, `resetView`"
      }
    ]
  },
  "OrderBookHeatmapHandle": {
    "source": "charts/src/react/orderbook.tsx",
    "description": "Imperative handle of `OrderBookHeatmap`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "setBook",
        "type": "(snapshot: OrderBookSnapshot) => void",
        "required": true,
        "description": "Replaces the book (closes the columns up to its time)"
      },
      {
        "name": "applyDeltas",
        "type": "(deltas: OrderBookDelta | readonly OrderBookDelta[]) => void",
        "required": true,
        "description": "Applies updates (closes the columns up to their time)"
      },
      {
        "name": "addTrades",
        "type": "(trades: MarketTrade | readonly MarketTrade[]) => void",
        "required": true,
        "description": "Adds trades (bubbles)"
      },
      {
        "name": "setBars",
        "type": "(bars: TradingBarsInput) => void",
        "required": true,
        "description": "Replaces the candle history"
      },
      {
        "name": "updateBar",
        "type": "(bar: TradingBar) => void",
        "required": true,
        "description": "Updates the latest candle or appends a new one"
      },
      {
        "name": "setView",
        "type": "(view: OrderBookHeatmapViewInput) => void",
        "required": true,
        "description": "Sets the visible time and/or price range"
      },
      {
        "name": "getView",
        "type": "() => OrderBookHeatmapViewData | null",
        "required": true,
        "description": "Available history and current viewport; null before mount"
      },
      {
        "name": "clear",
        "type": "() => void",
        "required": true,
        "description": "Removes the book, the history and the trades"
      },
      {
        "name": "resetView",
        "type": "() => void",
        "required": true,
        "description": "Follows the market again"
      },
      {
        "name": "getInstance",
        "type": "() => OrderBookHeatmapInstance | null",
        "required": true,
        "description": "The underlying engine instance (minerva-design/charts/core)"
      }
    ]
  },
  "OrderBookHeatmapOptions": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Options of the liquidity heatmap",
    "kind": "interface",
    "extends": [
      "OrderBookCommonOptions"
    ],
    "props": [
      {
        "name": "candles",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Supplied OHLC bars drawn over liquidity; duration uses the lower median of the last 256 observed intervals (1 s for a single bar), leaving missing intervals empty."
      },
      {
        "name": "lastPriceLine",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Dashed latest trade price and axis tag; a bar opened after that trade supplies its newer close instead."
      },
      {
        "name": "intensityRange",
        "type": "readonly [number, number]",
        "required": false,
        "default": "[0, 1]",
        "description": "Inclusive normalized intensity range, after the color curve; display-only."
      },
      {
        "name": "maxColumns",
        "type": "number",
        "required": false,
        "default": "6000",
        "description": "Maximum retained columns, clamped to 4–12000 and a 1000000 sampled-row budget."
      },
      {
        "name": "maxBars",
        "type": "number",
        "required": false,
        "default": "20000",
        "description": "Maximum retained OHLC bars, clamped to 1–100000."
      },
      {
        "name": "tickSize",
        "type": "number",
        "required": false,
        "description": "Height of a price row (levels are aggregated into rows); a round multiple of the book's tick of about 0.1 basis point when omitted"
      },
      {
        "name": "interval",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "Time between two columns, in ms: the book is sampled at this pace"
      },
      {
        "name": "window",
        "type": "number",
        "required": false,
        "default": "60000",
        "description": "Visible time span, in ms (zoomable)"
      },
      {
        "name": "history",
        "type": "number",
        "required": false,
        "default": "300000",
        "description": "History kept, in ms (columns older than this are dropped)"
      },
      {
        "name": "depth",
        "type": "number",
        "required": false,
        "default": "160",
        "description": "Price rows sampled on each side of the book per column"
      },
      {
        "name": "priceSpan",
        "type": "number",
        "required": false,
        "description": "Visible price span (top − bottom); fits the best bid / ask of the window when omitted"
      },
      {
        "name": "colorScale",
        "type": "OrderBookHeatmapScale",
        "required": false,
        "default": "\"sqrt\"",
        "description": "Scale from sizes to colors: `sqrt` keeps typical levels dim and lets significant liquidity glow, `linear` shows only the walls, `log` reveals thin liquidity next to them"
      },
      {
        "name": "sizeUnit",
        "type": "string",
        "required": false,
        "description": "Unit of the sizes, shown after them in the legend and the tooltip (e.g. \"BTC\"); the numbers are not converted"
      },
      {
        "name": "legend",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Legend of the color ramp (cold to hot, its size range) and of the trades, in the top-left corner of the plot"
      },
      {
        "name": "contrast",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Multiplies the sizes before the scale: above 1 brightens thin liquidity (more of the field glows), below 1 keeps only the largest walls"
      },
      {
        "name": "maxSize",
        "type": "number",
        "required": false,
        "description": "Size drawn with the hottest color (larger sizes saturate); when omitted, the 99th percentile of the visible non-empty cells (eased), so typical levels stay dark and only the top liquidity glows"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Color ramp, coldest first, interpolated in OKLab. The first color also fills the cells without liquidity (the field is opaque, no holes): make it a dark color in dark themes and a pale one in light themes. A perceptual heat ramp suited to the theme when omitted"
      },
      {
        "name": "bubbles",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Trades drawn as bubbles sized by volume (buys / sells colors)"
      },
      {
        "name": "bubbleSize",
        "type": "number",
        "required": false,
        "default": "14",
        "description": "Diameter of the largest bubble, in pixels (area ∝ volume, the smallest are 3 px dots)"
      },
      {
        "name": "bubbleVolume",
        "type": "number",
        "required": false,
        "description": "Trade volume of the largest bubble; when omitted, the largest visible trade (eased)"
      },
      {
        "name": "bestLines",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Best bid and ask lines"
      },
      {
        "name": "profile",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Profile of the current book at the right edge"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Wheel / pinch zoom and drag pan (double click resumes following the market)"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Hover crosshair and tooltip"
      },
      {
        "name": "renderer",
        "type": "ChartRendererPreference",
        "required": false,
        "default": "\"auto\"",
        "description": "Backend of the cells: the GPU when available"
      },
      {
        "name": "timeZone",
        "type": "ChartTimeZone",
        "required": false,
        "default": "\"local\"",
        "description": "Clock of the time axis and the tooltip: the local time or UTC (the clock of most exchanges)"
      },
      {
        "name": "labels",
        "type": "Partial<OrderBookHeatmapLabels>",
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
  "OrderBookHeatmapLabels": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Texts of the liquidity heatmap (tooltip, accessible name), English defaults",
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
        "name": "liquidity",
        "type": "string",
        "required": true,
        "default": "\"Liquidity\"",
        "description": "Resting size of the hovered cell"
      },
      {
        "name": "buys",
        "type": "string",
        "required": true,
        "default": "\"Buys\"",
        "description": "Bought volume of the hovered column"
      },
      {
        "name": "sells",
        "type": "string",
        "required": true,
        "default": "\"Sells\"",
        "description": "Sold volume of the hovered column"
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
        "name": "bidSide",
        "type": "string",
        "required": true,
        "default": "\"Bid side\"",
        "description": "Side badge of a hovered bid row in the tooltip"
      },
      {
        "name": "askSide",
        "type": "string",
        "required": true,
        "default": "\"Ask side\"",
        "description": "Side badge of a hovered ask row in the tooltip"
      },
      {
        "name": "bubbleHint",
        "type": "string",
        "required": true,
        "default": "\"Bubble area = trade size\"",
        "description": "Legend row of the trades (bubbles)"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "default": "\"Liquidity heatmap\"",
        "description": "Accessible name (when `ariaLabel` is not set)"
      }
    ]
  },
  "OrderBookHeatmapHoverEvent": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Hovered cell of the heatmap",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "bar",
        "type": "TradingBar",
        "required": false,
        "description": "Actual supplied OHLC bar covering the pointer time; absent in gaps and beyond its inferred duration."
      },
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Start time of the hovered column"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "description": "Price of the hovered row; its lowest price when rows are aggregated into price buckets (rows thinner than 2 px)"
      },
      {
        "name": "priceHigh",
        "type": "number",
        "required": true,
        "description": "Highest price of the hovered row (equals `price` without aggregation)"
      },
      {
        "name": "size",
        "type": "number",
        "required": true,
        "description": "Resting size of the cell (summed over the bucket's prices)"
      },
      {
        "name": "side",
        "type": "OrderBookSide | null",
        "required": true,
        "description": "Side of the cell (`null` inside the spread)"
      },
      {
        "name": "buyVolume",
        "type": "number",
        "required": true,
        "description": "Volume bought during the column"
      },
      {
        "name": "sellVolume",
        "type": "number",
        "required": true,
        "description": "Volume sold during the column"
      }
    ]
  },
  "OrderBookHeatmapView": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "A heatmap viewport; time is epoch milliseconds, price is low to high.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "readonly [number, number]",
        "required": true
      },
      {
        "name": "price",
        "type": "readonly [number, number]",
        "required": true
      },
      {
        "name": "follow",
        "type": "boolean",
        "required": true
      }
    ]
  },
  "OrderBookHeatmapViewInput": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Partial manual viewport. Invalid or nonascending ranges are ignored.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "readonly [number, number]",
        "required": false
      },
      {
        "name": "price",
        "type": "readonly [number, number]",
        "required": false
      }
    ]
  },
  "OrderBookHeatmapViewData": {
    "source": "charts/src/engine/orderbook/types.ts",
    "description": "Current viewport and retained liquidity history bounds.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "availableTime",
        "type": "readonly [number, number] | null",
        "required": true
      },
      {
        "name": "view",
        "type": "OrderBookHeatmapView",
        "required": true
      }
    ]
  },
  "TradingBar": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "One bar (candle). Times are milliseconds since the epoch (UTC).",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "number",
        "required": true,
        "description": "Opening time of the bar, in ms since the epoch"
      },
      {
        "name": "open",
        "type": "number",
        "required": true,
        "description": "First traded price"
      },
      {
        "name": "high",
        "type": "number",
        "required": true,
        "description": "Highest traded price"
      },
      {
        "name": "low",
        "type": "number",
        "required": true,
        "description": "Lowest traded price"
      },
      {
        "name": "close",
        "type": "number",
        "required": true,
        "description": "Last traded price"
      },
      {
        "name": "volume",
        "type": "number",
        "required": false,
        "description": "Traded volume"
      }
    ]
  },
  "TradingBarColumns": {
    "source": "charts/src/engine/trading/types.ts",
    "description": "Bars as columns of equal length (typed arrays or plain arrays): the compact form for very large histories (no object per bar)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "time",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Opening times, in ms since the epoch, ascending"
      },
      {
        "name": "open",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Opening prices"
      },
      {
        "name": "high",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Highest prices"
      },
      {
        "name": "low",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Lowest prices"
      },
      {
        "name": "close",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Closing prices"
      },
      {
        "name": "volume",
        "type": "ArrayLike<number>",
        "required": false,
        "description": "Volumes"
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
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 历史回填与实时

历史起点的订单簿传给 setBook，随后按交易所时间逐条传入记录的更新（applyDeltas、addTrades）：热力图按 interval 采样为一列。之后用相同的调用实时推送。拖动可平移，Ctrl/⌘ + 滚轮缩放时间，Ctrl/⌘ + Shift + 滚轮或拖动价格轴缩放价格，双击恢复跟随行情。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/basic.tsx

```tsx
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function BasicDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  // two minutes of market recorded before the page opened (backfilled with
  // the exchange times), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 21 }, 120_000);

  return (
    <div ref={boxRef} style={{ width: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        // one column every 250 ms, two minutes on screen
        interval={250}
        window={120_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
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

## Example: 成交 K 线

将实际模拟成交聚合为稀疏的 2 秒 OHLC K 线，叠加在挂单流动性历史上。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/candles.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import styles from "../market.module.scss";

export default function CandlesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const [candles, setCandles] = useState(true);
  useTerminalMarket(host, heatmap);
  return (
    <div ref={host} className={styles.demo} data-testid="heatmap-candles-demo">
      <div className={styles.controls}>
        <span className={styles.badge}>{t("simulated")}</span>
        <Switch
          checked={candles}
          onChange={setCandles}
          label={t("showCandles")}
        />
      </div>
      <OrderBookHeatmap
        ref={heatmap}
        candles={candles}
        lastPriceLine
        height={420}
        interval={250}
        window={60_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("candlesAria")}
      />
      <p className={styles.caption}>{t("executionsOnly")}</p>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book-heatmap/useTerminalMarket.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";
import type {
  OrderBookHandle,
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../order-book/feed";
import { createTradeBars } from "./market";

export interface MarketSummary {
  latest: number;
  bidDepth: number;
  askDepth: number;
  imbalance: number;
  bidWall: number;
  askWall: number;
  start: number;
  end: number;
  closes: number[];
  viewport: OrderBookHeatmapViewData | null;
}

/** One seeded matching engine supplies the heatmap, execution candles and ladder. */
export function useTerminalMarket(
  target: RefObject<HTMLDivElement | null>,
  heatmap: RefObject<OrderBookHeatmapHandle | null>,
  ladder?: RefObject<OrderBookHandle | null>,
  running = true,
) {
  const market = useRef<MarketFeed | null>(null);
  const candles = useRef(createTradeBars(2000, 180));
  const lastSummary = useRef(0);
  const startTime = useRef(0);
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  const publish = (feed: MarketFeed) => {
    const book = feed.snapshot();
    const bidDepth = book.bids.reduce((sum, level) => sum + level[1], 0);
    const askDepth = book.asks.reduce((sum, level) => sum + level[1], 0);
    setSummary({
      latest: feed.last(),
      bidDepth,
      askDepth,
      imbalance: (bidDepth - askDepth) / (bidDepth + askDepth || 1),
      bidWall: Math.max(0, ...book.bids.map((level) => level[1])),
      askWall: Math.max(0, ...book.asks.map((level) => level[1])),
      start: Math.max(startTime.current, feed.time() - 180_000),
      end: feed.time(),
      closes: candles.current.values().map((bar) => bar.close),
      viewport: heatmap.current?.getView() ?? null,
    });
    lastSummary.current = performance.now();
  };
  const publishRef = useRef(publish);
  useEffect(() => {
    publishRef.current = publish;
  });
  useEffect(() => {
    const mountedHeatmap = heatmap.current;
    let stopped = false;
    let initialized = false;
    const initialize = () => {
      if (initialized || stopped || !heatmap.current) return;
      initialized = true;
      const history = createHistory(
        {
          seed: 71,
          price: 76000,
          tick: 1,
          levels: 180,
          activity: 90,
          whales: 0.01,
        },
        90_000,
        250,
      );
      candles.current = createTradeBars(2000, 180);
      startTime.current = history.snapshot.time ?? history.feed.time() - 90_000;
      const sink = heatmap.current;
      sink.clear();
      sink.setBook(history.snapshot);
      for (const update of history.updates) {
        sink.applyDeltas(update.delta);
        sink.addTrades(update.trades);
        candles.current.add(update.trades);
      }
      sink.setBars(candles.current.values());
      market.current = history.feed;
      ladder?.current?.setBook(history.feed.snapshot());
      ladder?.current?.setLastPrice(history.feed.last());
      publishRef.current(history.feed);
    };
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) initialize();
          })
        : null;
    if (target.current && observer) observer.observe(target.current);
    else initialize();
    return () => {
      stopped = true;
      observer?.disconnect();
      market.current = null;
      mountedHeatmap?.clear();
    };
  }, [target, heatmap, ladder]);
  useFeedLoop(
    target,
    (elapsed) => {
      const feed = market.current;
      const sink = heatmap.current;
      if (!feed || !sink) return;
      const update = feed.step(elapsed);
      sink.applyDeltas(update.delta);
      sink.addTrades(update.trades);
      candles.current.add(update.trades);
      const bars = candles.current.values();
      if (bars.length) sink.updateBar(bars[bars.length - 1]);
      ladder?.current?.applyDeltas(update.delta);
      ladder?.current?.setLastPrice(feed.last());
      if (performance.now() - lastSummary.current >= 1000)
        publishRef.current(feed);
    },
    { interval: 50, running },
  );
  return summary;
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

### apps/docs/src/docs/pages/order-book-heatmap/market.ts

```tsx
import type { MarketTrade, TradingBar } from "minerva-design/charts";

/** Sparse candles from executions only: empty time buckets are never invented. */
export function createTradeBars(interval: number, limit: number) {
  const width = Number.isFinite(interval) && interval > 0 ? interval : 1000;
  const capacity = Number.isFinite(limit)
    ? Math.max(1, Math.floor(limit))
    : 180;
  const buckets = new Map<
    number,
    { bar: TradingBar; first: number; last: number }
  >();
  return {
    add(trades: readonly MarketTrade[]) {
      for (const trade of trades) {
        if (
          ![trade.time, trade.price, trade.size].every(Number.isFinite) ||
          trade.price <= 0 ||
          trade.size <= 0
        )
          continue;
        const time = Math.floor(trade.time / width) * width;
        const bucket = buckets.get(time);
        if (bucket) {
          bucket.bar.high = Math.max(bucket.bar.high, trade.price);
          bucket.bar.low = Math.min(bucket.bar.low, trade.price);
          bucket.bar.volume = (bucket.bar.volume ?? 0) + trade.size;
          if (trade.time < bucket.first) {
            bucket.first = trade.time;
            bucket.bar.open = trade.price;
          }
          if (trade.time >= bucket.last) {
            bucket.last = trade.time;
            bucket.bar.close = trade.price;
          }
        } else
          buckets.set(time, {
            first: trade.time,
            last: trade.time,
            bar: {
              time,
              open: trade.price,
              high: trade.price,
              low: trade.price,
              close: trade.price,
              volume: trade.size,
            },
          });
        if (buckets.size > capacity)
          buckets.delete(Math.min(...buckets.keys()));
      }
    },
    values(): TradingBar[] {
      return [...buckets.values()]
        .map(({ bar }) => ({ ...bar }))
        .sort((a, b) => a.time - b.time);
    },
  };
}

```

### apps/docs/src/docs/pages/order-book-heatmap/market.module.scss

```scss
.demo {
  display: grid;
  gap: 18px;
  width: 100%;
  min-width: 0;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}
.control {
  display: grid;
  gap: 8px;
  min-width: 160px;
  flex: 1 1 160px;
  font-size: 12px;
  color: var(--text-secondary-color);
}
.terminal {
  --background-color: #080d15;
  --surface-color: #101824;
  --surface-elevated-color: #172233;
  --text-color: #e7eef8;
  --text-secondary-color: #99aac0;
  --border-color: #26364c;
  --success-color: #30d6a3;
  --danger-color: #ff657e;
  background: #080d15;
  color: #e7eef8;
  padding: 20px;
  border: 1px solid #26364c;
  border-radius: 14px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: grid;
  gap: 20px;
  font-variant-numeric: tabular-nums;
  container-type: inline-size;
}
.heading {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.heading h3 {
  font-size: 18px;
  letter-spacing: 0.03em;
  margin: 0;
}
.badge {
  color: #ffd68a;
  border: 1px solid #755e34;
  border-radius: 4px;
  font-size: 10px;
  letter-spacing: 0.14em;
  padding: 5px 8px;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}
.metric {
  padding: 12px !important;
  min-width: 0;
  background: #101824 !important;
  border-color: #26364c !important;
}
.metric span {
  display: block;
  font-size: 10px;
  color: #99aac0;
  margin-bottom: 8px;
}
.metric strong {
  font-size: 17px;
  font-weight: 550;
  overflow-wrap: anywhere;
}
.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 16px;
}
.chart {
  min-width: 0;
}
.ladder {
  min-width: 0;
  background: #101824;
  border: 1px solid #26364c;
  border-radius: 8px;
  padding: 12px;
}
.ladder h4 {
  margin: 0 0 12px;
  font-size: 12px;
  color: #99aac0;
}
.navigator {
  display: grid;
  gap: 6px;
  min-width: 0;
}
.navigator svg {
  display: block;
  width: 100%;
  height: 44px;
  background: color-mix(in srgb, var(--text-color) 3%, transparent);
  border-radius: 4px;
}
.navigatorHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--text-secondary-color);
}
.caption {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary-color);
}
@media (max-width: 1000px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .terminal {
    padding: 12px;
  }
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong {
    font-size: 16px;
  }
}

@container (max-width: 760px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container (max-width: 360px) {
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong small {
    display: block;
  }
  .navigatorHeader {
    flex-wrap: wrap;
  }
}

@container (max-width: 600px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr);
  }
}

```

## Example: 颜色映射

colorScale 决定挂单量到颜色的映射：sqrt 让普通挂单保持较暗、只有显著流动性发光，linear 只突出大单墙，log 能显出大单旁的薄弱流动性。contrast 先对数量做倍乘；maxSize 固定最热颜色对应的数量（否则取可见数据的第 99 百分位）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/color-scale.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapScale,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

const CONTRASTS = [0.5, 1, 2, 4];

export default function ColorScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<OrderBookHeatmapScale>("sqrt");
  const [contrast, setContrast] = useState(1);

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 23, whales: 0.015 }, 60_000);

  const number = new Intl.NumberFormat(i18n.language);
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("scale")}
          direction="horizontal"
          value={scale}
          onChange={(value) => setScale(value as OrderBookHeatmapScale)}
        >
          <Radio value="sqrt" label={t("scaleSqrt")} />
          <Radio value="linear" label={t("scaleLinear")} />
          <Radio value="log" label={t("scaleLog")} />
        </RadioGroup>
        <RadioGroup
          aria-label={t("contrast")}
          direction="horizontal"
          value={contrast}
          onChange={(value) => setContrast(Number(value))}
        >
          {CONTRASTS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={t("times", { value: number.format(value) })}
            />
          ))}
        </RadioGroup>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={380}
        // sqrt keeps typical levels dim and lets the walls glow; contrast > 1 brightens
        colorScale={scale}
        contrast={contrast}
        interval={200}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
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

## Example: 紧凑（移动端）

手机卡片：30 秒窗口、profile={false} 与更小的气泡。拖动平移，双击恢复跟随行情。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/compact.tsx

```tsx
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function CompactDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 25 }, 30_000);

  // phone-sized: 30 s, no book profile, smaller bubbles; drag to pan
  return (
    <div ref={boxRef} style={{ width: "100%", maxWidth: 360 }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={240}
        interval={150}
        window={30_000}
        profile={false}
        bubbleSize={16}
        fontSize={10}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
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

颜色读取自容器的 CSS 变量；colors 设置色带（由冷到热，接在底色之后）：在终端配色上使用经典的蓝到红流动性色带，时间轴与多数交易所一样使用 UTC（timeZone）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/dark.tsx

```tsx
import { useRef, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

const TERMINAL = {
  "--background-color": "#06080d",
  "--surface-color": "#06080d",
  "--surface-elevated-color": "#151a22",
  "--text-color": "#e6e8eb",
  "--text-secondary-color": "#7d8590",
  "--border-color": "#262c36",
  "--success-color": "#26d07c",
  "--danger-color": "#ff4d6a",
  background: "#06080d",
  color: "#e6e8eb",
  borderRadius: 12,
  padding: 8,
  width: "100%",
  boxSizing: "border-box",
} as CSSProperties;

// a classic liquidity ramp: from the empty field (near black navy) through
// deep blue, cyan, yellow and orange to red
const RAMP = [
  "#050b18",
  "#0a2a5c",
  "#0f6fb5",
  "#19c2d6",
  "#f5e663",
  "#ff9a1f",
  "#ff3b1f",
];

export default function DarkDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 24, whales: 0.012 }, 90_000);

  return (
    <div ref={boxRef} style={TERMINAL}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={420}
        colors={RAMP}
        contrast={0.7}
        // exchange clock
        timeZone="utc"
        interval={200}
        window={90_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
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

## Example: 历史导航

通过范围导航器检查保留历史，再恢复跟随市场。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/history-navigation.tsx

```tsx
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import { HistoryNavigator } from "../HistoryNavigator";
import styles from "../market.module.scss";

export default function HistoryNavigationDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const summary = useTerminalMarket(host, heatmap);
  return (
    <div
      ref={host}
      className={styles.demo}
      data-testid="heatmap-navigation-demo"
    >
      <span className={styles.badge}>{t("simulated")}</span>
      <OrderBookHeatmap
        ref={heatmap}
        candles
        lastPriceLine
        height={420}
        interval={250}
        window={45_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizeUnit="BTC"
        ariaLabel={t("navigationAria")}
      />
      <HistoryNavigator heatmap={heatmap} summary={summary} />
      <p className={styles.caption}>{t("navigatorHint")}</p>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book-heatmap/useTerminalMarket.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";
import type {
  OrderBookHandle,
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../order-book/feed";
import { createTradeBars } from "./market";

export interface MarketSummary {
  latest: number;
  bidDepth: number;
  askDepth: number;
  imbalance: number;
  bidWall: number;
  askWall: number;
  start: number;
  end: number;
  closes: number[];
  viewport: OrderBookHeatmapViewData | null;
}

/** One seeded matching engine supplies the heatmap, execution candles and ladder. */
export function useTerminalMarket(
  target: RefObject<HTMLDivElement | null>,
  heatmap: RefObject<OrderBookHeatmapHandle | null>,
  ladder?: RefObject<OrderBookHandle | null>,
  running = true,
) {
  const market = useRef<MarketFeed | null>(null);
  const candles = useRef(createTradeBars(2000, 180));
  const lastSummary = useRef(0);
  const startTime = useRef(0);
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  const publish = (feed: MarketFeed) => {
    const book = feed.snapshot();
    const bidDepth = book.bids.reduce((sum, level) => sum + level[1], 0);
    const askDepth = book.asks.reduce((sum, level) => sum + level[1], 0);
    setSummary({
      latest: feed.last(),
      bidDepth,
      askDepth,
      imbalance: (bidDepth - askDepth) / (bidDepth + askDepth || 1),
      bidWall: Math.max(0, ...book.bids.map((level) => level[1])),
      askWall: Math.max(0, ...book.asks.map((level) => level[1])),
      start: Math.max(startTime.current, feed.time() - 180_000),
      end: feed.time(),
      closes: candles.current.values().map((bar) => bar.close),
      viewport: heatmap.current?.getView() ?? null,
    });
    lastSummary.current = performance.now();
  };
  const publishRef = useRef(publish);
  useEffect(() => {
    publishRef.current = publish;
  });
  useEffect(() => {
    const mountedHeatmap = heatmap.current;
    let stopped = false;
    let initialized = false;
    const initialize = () => {
      if (initialized || stopped || !heatmap.current) return;
      initialized = true;
      const history = createHistory(
        {
          seed: 71,
          price: 76000,
          tick: 1,
          levels: 180,
          activity: 90,
          whales: 0.01,
        },
        90_000,
        250,
      );
      candles.current = createTradeBars(2000, 180);
      startTime.current = history.snapshot.time ?? history.feed.time() - 90_000;
      const sink = heatmap.current;
      sink.clear();
      sink.setBook(history.snapshot);
      for (const update of history.updates) {
        sink.applyDeltas(update.delta);
        sink.addTrades(update.trades);
        candles.current.add(update.trades);
      }
      sink.setBars(candles.current.values());
      market.current = history.feed;
      ladder?.current?.setBook(history.feed.snapshot());
      ladder?.current?.setLastPrice(history.feed.last());
      publishRef.current(history.feed);
    };
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) initialize();
          })
        : null;
    if (target.current && observer) observer.observe(target.current);
    else initialize();
    return () => {
      stopped = true;
      observer?.disconnect();
      market.current = null;
      mountedHeatmap?.clear();
    };
  }, [target, heatmap, ladder]);
  useFeedLoop(
    target,
    (elapsed) => {
      const feed = market.current;
      const sink = heatmap.current;
      if (!feed || !sink) return;
      const update = feed.step(elapsed);
      sink.applyDeltas(update.delta);
      sink.addTrades(update.trades);
      candles.current.add(update.trades);
      const bars = candles.current.values();
      if (bars.length) sink.updateBar(bars[bars.length - 1]);
      ladder?.current?.applyDeltas(update.delta);
      ladder?.current?.setLastPrice(feed.last());
      if (performance.now() - lastSummary.current >= 1000)
        publishRef.current(feed);
    },
    { interval: 50, running },
  );
  return summary;
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

### apps/docs/src/docs/pages/order-book-heatmap/market.ts

```tsx
import type { MarketTrade, TradingBar } from "minerva-design/charts";

/** Sparse candles from executions only: empty time buckets are never invented. */
export function createTradeBars(interval: number, limit: number) {
  const width = Number.isFinite(interval) && interval > 0 ? interval : 1000;
  const capacity = Number.isFinite(limit)
    ? Math.max(1, Math.floor(limit))
    : 180;
  const buckets = new Map<
    number,
    { bar: TradingBar; first: number; last: number }
  >();
  return {
    add(trades: readonly MarketTrade[]) {
      for (const trade of trades) {
        if (
          ![trade.time, trade.price, trade.size].every(Number.isFinite) ||
          trade.price <= 0 ||
          trade.size <= 0
        )
          continue;
        const time = Math.floor(trade.time / width) * width;
        const bucket = buckets.get(time);
        if (bucket) {
          bucket.bar.high = Math.max(bucket.bar.high, trade.price);
          bucket.bar.low = Math.min(bucket.bar.low, trade.price);
          bucket.bar.volume = (bucket.bar.volume ?? 0) + trade.size;
          if (trade.time < bucket.first) {
            bucket.first = trade.time;
            bucket.bar.open = trade.price;
          }
          if (trade.time >= bucket.last) {
            bucket.last = trade.time;
            bucket.bar.close = trade.price;
          }
        } else
          buckets.set(time, {
            first: trade.time,
            last: trade.time,
            bar: {
              time,
              open: trade.price,
              high: trade.price,
              low: trade.price,
              close: trade.price,
              volume: trade.size,
            },
          });
        if (buckets.size > capacity)
          buckets.delete(Math.min(...buckets.keys()));
      }
    },
    values(): TradingBar[] {
      return [...buckets.values()]
        .map(({ bar }) => ({ ...bar }))
        .sort((a, b) => a.time - b.time);
    },
  };
}

```

### apps/docs/src/docs/pages/order-book-heatmap/HistoryNavigator.tsx

```tsx
import { useEffect, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { Button, Slider } from "minerva-design";
import type {
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import type { MarketSummary } from "./useTerminalMarket";
import styles from "./market.module.scss";

export function HistoryNavigator({
  heatmap,
  summary,
}: {
  heatmap: RefObject<OrderBookHeatmapHandle | null>;
  summary: MarketSummary | null;
}) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const [navigation, setNavigation] = useState<{
    range: [number, number];
    follow: boolean;
    ready: boolean;
  }>({ range: [0, 100], follow: true, ready: false });
  useEffect(() => {
    const instance = heatmap.current?.getInstance();
    if (!instance) return;
    const update = (data: OrderBookHeatmapViewData) => {
      const available = data.availableTime;
      const ready = !!available && available[1] > available[0];
      const range = ready
        ? (data.view.time.map((time) =>
            Math.max(
              0,
              Math.min(
                100,
                Math.round(
                  ((time - available![0]) / (available![1] - available![0])) *
                    100,
                ),
              ),
            ),
          ) as [number, number])
        : ([0, 100] as [number, number]);
      setNavigation((previous) =>
        previous.ready === ready &&
        previous.follow === data.view.follow &&
        previous.range[0] === range[0] &&
        previous.range[1] === range[1]
          ? previous
          : { range, follow: data.view.follow, ready },
      );
    };
    const unsubscribe = instance.on("view", update);
    const frame = requestAnimationFrame(() => update(instance.getView()));
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [heatmap]);
  const { range, follow, ready } = navigation;
  const closes = summary?.closes ?? [];
  const low = Math.min(...closes);
  const high = Math.max(...closes);
  const path = closes
    .map(
      (close, i) =>
        `${(i * 100) / Math.max(1, closes.length - 1)},${40 - ((close - low) / (high - low || 1)) * 34}`,
    )
    .join(" ");
  return (
    <div
      className={styles.navigator}
      data-testid="heatmap-history-navigator"
      data-follow={follow}
    >
      <div className={styles.navigatorHeader}>
        <span>{t("historyNavigator")}</span>
        <Button
          size="small"
          data-testid="heatmap-follow"
          onClick={() => {
            heatmap.current?.resetView();
          }}
        >
          {t("followMarket")}
        </Button>
      </div>
      <svg viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">
        <polyline
          points={path}
          fill="none"
          stroke="var(--success-color, #30d6a3)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <Slider
        range
        disabled={!ready}
        aria-label={t("historyNavigator")}
        min={0}
        max={100}
        step={1}
        value={range}
        onChange={(value) => {
          const next = value as [number, number];
          const available = heatmap.current?.getView()?.availableTime;
          if (!available || next[1] <= next[0]) return;
          setNavigation((previous) => ({
            ...previous,
            range: next,
            follow: false,
          }));
          const span = available[1] - available[0];
          heatmap.current?.setView({
            time: [
              available[0] + (span * next[0]) / 100,
              available[0] + (span * next[1]) / 100,
            ],
          });
        }}
      />
      <p className={styles.caption}>{t(follow ? "following" : "panned")}</p>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book-heatmap/market.module.scss

```scss
.demo {
  display: grid;
  gap: 18px;
  width: 100%;
  min-width: 0;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}
.control {
  display: grid;
  gap: 8px;
  min-width: 160px;
  flex: 1 1 160px;
  font-size: 12px;
  color: var(--text-secondary-color);
}
.terminal {
  --background-color: #080d15;
  --surface-color: #101824;
  --surface-elevated-color: #172233;
  --text-color: #e7eef8;
  --text-secondary-color: #99aac0;
  --border-color: #26364c;
  --success-color: #30d6a3;
  --danger-color: #ff657e;
  background: #080d15;
  color: #e7eef8;
  padding: 20px;
  border: 1px solid #26364c;
  border-radius: 14px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: grid;
  gap: 20px;
  font-variant-numeric: tabular-nums;
  container-type: inline-size;
}
.heading {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.heading h3 {
  font-size: 18px;
  letter-spacing: 0.03em;
  margin: 0;
}
.badge {
  color: #ffd68a;
  border: 1px solid #755e34;
  border-radius: 4px;
  font-size: 10px;
  letter-spacing: 0.14em;
  padding: 5px 8px;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}
.metric {
  padding: 12px !important;
  min-width: 0;
  background: #101824 !important;
  border-color: #26364c !important;
}
.metric span {
  display: block;
  font-size: 10px;
  color: #99aac0;
  margin-bottom: 8px;
}
.metric strong {
  font-size: 17px;
  font-weight: 550;
  overflow-wrap: anywhere;
}
.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 16px;
}
.chart {
  min-width: 0;
}
.ladder {
  min-width: 0;
  background: #101824;
  border: 1px solid #26364c;
  border-radius: 8px;
  padding: 12px;
}
.ladder h4 {
  margin: 0 0 12px;
  font-size: 12px;
  color: #99aac0;
}
.navigator {
  display: grid;
  gap: 6px;
  min-width: 0;
}
.navigator svg {
  display: block;
  width: 100%;
  height: 44px;
  background: color-mix(in srgb, var(--text-color) 3%, transparent);
  border-radius: 4px;
}
.navigatorHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--text-secondary-color);
}
.caption {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary-color);
}
@media (max-width: 1000px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .terminal {
    padding: 12px;
  }
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong {
    font-size: 16px;
  }
}

@container (max-width: 760px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container (max-width: 360px) {
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong small {
    display: block;
  }
  .navigatorHeader {
    flex-wrap: wrap;
  }
}

@container (max-width: 600px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr);
  }
}

```

## Example: 强度筛选

使用范围滑块筛选可见流动性强度，不改变底层订单簿。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/intensity-filter.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import styles from "../market.module.scss";

export default function IntensityFilterDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const [range, setRange] = useState<[number, number]>([0.25, 1]);
  useTerminalMarket(host, heatmap);
  return (
    <div
      ref={host}
      className={styles.demo}
      data-testid="heatmap-intensity-demo"
    >
      <span className={styles.badge}>{t("simulated")}</span>
      <label className={styles.control}>
        {t("intensityFilter")}
        <Slider
          range
          aria-label={t("intensityFilter")}
          min={0}
          max={1}
          step={0.05}
          value={range}
          onChange={(value) => setRange(value as [number, number])}
          formatValue={(value) => `${Math.round(value * 100)}%`}
          showValue
        />
      </label>
      <OrderBookHeatmap
        ref={heatmap}
        intensityRange={range}
        candles
        lastPriceLine
        height={400}
        interval={250}
        window={60_000}
        maxColumns={720}
        maxBars={180}
        pricePrecision={1}
        sizeUnit="BTC"
        ariaLabel={t("filterAria")}
      />
      <p className={styles.caption}>{t("filterHint")}</p>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book-heatmap/useTerminalMarket.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";
import type {
  OrderBookHandle,
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../order-book/feed";
import { createTradeBars } from "./market";

export interface MarketSummary {
  latest: number;
  bidDepth: number;
  askDepth: number;
  imbalance: number;
  bidWall: number;
  askWall: number;
  start: number;
  end: number;
  closes: number[];
  viewport: OrderBookHeatmapViewData | null;
}

/** One seeded matching engine supplies the heatmap, execution candles and ladder. */
export function useTerminalMarket(
  target: RefObject<HTMLDivElement | null>,
  heatmap: RefObject<OrderBookHeatmapHandle | null>,
  ladder?: RefObject<OrderBookHandle | null>,
  running = true,
) {
  const market = useRef<MarketFeed | null>(null);
  const candles = useRef(createTradeBars(2000, 180));
  const lastSummary = useRef(0);
  const startTime = useRef(0);
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  const publish = (feed: MarketFeed) => {
    const book = feed.snapshot();
    const bidDepth = book.bids.reduce((sum, level) => sum + level[1], 0);
    const askDepth = book.asks.reduce((sum, level) => sum + level[1], 0);
    setSummary({
      latest: feed.last(),
      bidDepth,
      askDepth,
      imbalance: (bidDepth - askDepth) / (bidDepth + askDepth || 1),
      bidWall: Math.max(0, ...book.bids.map((level) => level[1])),
      askWall: Math.max(0, ...book.asks.map((level) => level[1])),
      start: Math.max(startTime.current, feed.time() - 180_000),
      end: feed.time(),
      closes: candles.current.values().map((bar) => bar.close),
      viewport: heatmap.current?.getView() ?? null,
    });
    lastSummary.current = performance.now();
  };
  const publishRef = useRef(publish);
  useEffect(() => {
    publishRef.current = publish;
  });
  useEffect(() => {
    const mountedHeatmap = heatmap.current;
    let stopped = false;
    let initialized = false;
    const initialize = () => {
      if (initialized || stopped || !heatmap.current) return;
      initialized = true;
      const history = createHistory(
        {
          seed: 71,
          price: 76000,
          tick: 1,
          levels: 180,
          activity: 90,
          whales: 0.01,
        },
        90_000,
        250,
      );
      candles.current = createTradeBars(2000, 180);
      startTime.current = history.snapshot.time ?? history.feed.time() - 90_000;
      const sink = heatmap.current;
      sink.clear();
      sink.setBook(history.snapshot);
      for (const update of history.updates) {
        sink.applyDeltas(update.delta);
        sink.addTrades(update.trades);
        candles.current.add(update.trades);
      }
      sink.setBars(candles.current.values());
      market.current = history.feed;
      ladder?.current?.setBook(history.feed.snapshot());
      ladder?.current?.setLastPrice(history.feed.last());
      publishRef.current(history.feed);
    };
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) initialize();
          })
        : null;
    if (target.current && observer) observer.observe(target.current);
    else initialize();
    return () => {
      stopped = true;
      observer?.disconnect();
      market.current = null;
      mountedHeatmap?.clear();
    };
  }, [target, heatmap, ladder]);
  useFeedLoop(
    target,
    (elapsed) => {
      const feed = market.current;
      const sink = heatmap.current;
      if (!feed || !sink) return;
      const update = feed.step(elapsed);
      sink.applyDeltas(update.delta);
      sink.addTrades(update.trades);
      candles.current.add(update.trades);
      const bars = candles.current.values();
      if (bars.length) sink.updateBar(bars[bars.length - 1]);
      ladder?.current?.applyDeltas(update.delta);
      ladder?.current?.setLastPrice(feed.last());
      if (performance.now() - lastSummary.current >= 1000)
        publishRef.current(feed);
    },
    { interval: 50, running },
  );
  return summary;
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

### apps/docs/src/docs/pages/order-book-heatmap/market.ts

```tsx
import type { MarketTrade, TradingBar } from "minerva-design/charts";

/** Sparse candles from executions only: empty time buckets are never invented. */
export function createTradeBars(interval: number, limit: number) {
  const width = Number.isFinite(interval) && interval > 0 ? interval : 1000;
  const capacity = Number.isFinite(limit)
    ? Math.max(1, Math.floor(limit))
    : 180;
  const buckets = new Map<
    number,
    { bar: TradingBar; first: number; last: number }
  >();
  return {
    add(trades: readonly MarketTrade[]) {
      for (const trade of trades) {
        if (
          ![trade.time, trade.price, trade.size].every(Number.isFinite) ||
          trade.price <= 0 ||
          trade.size <= 0
        )
          continue;
        const time = Math.floor(trade.time / width) * width;
        const bucket = buckets.get(time);
        if (bucket) {
          bucket.bar.high = Math.max(bucket.bar.high, trade.price);
          bucket.bar.low = Math.min(bucket.bar.low, trade.price);
          bucket.bar.volume = (bucket.bar.volume ?? 0) + trade.size;
          if (trade.time < bucket.first) {
            bucket.first = trade.time;
            bucket.bar.open = trade.price;
          }
          if (trade.time >= bucket.last) {
            bucket.last = trade.time;
            bucket.bar.close = trade.price;
          }
        } else
          buckets.set(time, {
            first: trade.time,
            last: trade.time,
            bar: {
              time,
              open: trade.price,
              high: trade.price,
              low: trade.price,
              close: trade.price,
              volume: trade.size,
            },
          });
        if (buckets.size > capacity)
          buckets.delete(Math.min(...buckets.keys()));
      }
    },
    values(): TradingBar[] {
      return [...buckets.values()]
        .map(({ bar }) => ({ ...bar }))
        .sort((a, b) => a.time - b.time);
    },
  };
}

```

### apps/docs/src/docs/pages/order-book-heatmap/market.module.scss

```scss
.demo {
  display: grid;
  gap: 18px;
  width: 100%;
  min-width: 0;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}
.control {
  display: grid;
  gap: 8px;
  min-width: 160px;
  flex: 1 1 160px;
  font-size: 12px;
  color: var(--text-secondary-color);
}
.terminal {
  --background-color: #080d15;
  --surface-color: #101824;
  --surface-elevated-color: #172233;
  --text-color: #e7eef8;
  --text-secondary-color: #99aac0;
  --border-color: #26364c;
  --success-color: #30d6a3;
  --danger-color: #ff657e;
  background: #080d15;
  color: #e7eef8;
  padding: 20px;
  border: 1px solid #26364c;
  border-radius: 14px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: grid;
  gap: 20px;
  font-variant-numeric: tabular-nums;
  container-type: inline-size;
}
.heading {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.heading h3 {
  font-size: 18px;
  letter-spacing: 0.03em;
  margin: 0;
}
.badge {
  color: #ffd68a;
  border: 1px solid #755e34;
  border-radius: 4px;
  font-size: 10px;
  letter-spacing: 0.14em;
  padding: 5px 8px;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}
.metric {
  padding: 12px !important;
  min-width: 0;
  background: #101824 !important;
  border-color: #26364c !important;
}
.metric span {
  display: block;
  font-size: 10px;
  color: #99aac0;
  margin-bottom: 8px;
}
.metric strong {
  font-size: 17px;
  font-weight: 550;
  overflow-wrap: anywhere;
}
.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 16px;
}
.chart {
  min-width: 0;
}
.ladder {
  min-width: 0;
  background: #101824;
  border: 1px solid #26364c;
  border-radius: 8px;
  padding: 12px;
}
.ladder h4 {
  margin: 0 0 12px;
  font-size: 12px;
  color: #99aac0;
}
.navigator {
  display: grid;
  gap: 6px;
  min-width: 0;
}
.navigator svg {
  display: block;
  width: 100%;
  height: 44px;
  background: color-mix(in srgb, var(--text-color) 3%, transparent);
  border-radius: 4px;
}
.navigatorHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--text-secondary-color);
}
.caption {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary-color);
}
@media (max-width: 1000px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .terminal {
    padding: 12px;
  }
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong {
    font-size: 16px;
  }
}

@container (max-width: 760px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container (max-width: 360px) {
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong small {
    display: block;
  }
  .navigatorHeader {
    flex-wrap: wrap;
  }
}

@container (max-width: 600px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr);
  }
}

```

## Example: 大额成交

每列的成交按方向合并为一个气泡，绿色为买入、红色为卖出（见图例），面积随成交量增大；bubbleVolume 为最大气泡（bubbleSize 像素）对应的成交量。较低的 contrast 让订单簿变暗，使扫单更醒目；onHover 读取悬停列的买入与卖出量。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/large-trades.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function LargeTradesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);
  // block trades: aggressive whales sweeping several levels at once

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(
    boxRef,
    heatmapRef,
    { seed: 27, whales: 0.03, activity: 180 },
    90_000,
  );

  const size = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 3,
  });
  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={1000}
        window={90_000}
        // bubbles grow with the volume of the column: 12 BTC fills 30 px
        bubbleSize={30}
        bubbleVolume={12}
        // dim the book so the trades stand out
        contrast={0.6}
        onHover={setHover}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <span style={{ color: "var(--text-secondary-color)", fontSize: 13 }}>
        {hover
          ? t("volumeAt", {
              buys: size.format(hover.buyVolume),
              sells: size.format(hover.sellVolume),
            })
          : t("volumeHint")}
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

## Example: 热力图、盘口与逐笔成交

同一分钟的历史以不同方式回填三个组件：热力图回放每次更新（applyDeltas、addTrades），逐笔成交通过 setTrades 一次性获得全部成交，盘口只需当前的订单簿。之后每条实时消息同时发给三者，就像同一个交易所 WebSocket。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/linked.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBook,
  OrderBookHeatmap,
  TimeAndSales,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
  type TimeAndSalesHandle,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

export default function LinkedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const bookRef = useRef<OrderBookHandle>(null);
  const tapeRef = useRef<TimeAndSalesHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [quote, setQuote] = useState({ last: NaN, spread: NaN, trades: 0 });
  const quotedAt = useRef(0);

  // one recorded minute: the heatmap replays it column by column, the tape
  // gets its trades at once, the ladder only needs the book of now
  useEffect(() => {
    const heatmap = heatmapRef.current;
    const tape = tapeRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory({ seed: 34 }, 60_000);
    heatmap.clear();
    heatmap.setBook(snapshot);
    for (const { delta, trades } of updates) {
      heatmap.applyDeltas(delta);
      heatmap.addTrades(trades);
    }
    tape?.setTrades(updates.flatMap((update) => update.trades));
    bookRef.current?.setBook(feed.snapshot());
    bookRef.current?.setLastPrice(feed.last());
    marketRef.current = feed;
    return () => {
      marketRef.current = null;
      heatmap.clear();
      tape?.clear();
    };
  }, []);

  // then every message goes to the three widgets, like one WebSocket
  useFeedLoop(boxRef, (elapsed) => {
    const feed = marketRef.current;
    if (!feed) return;
    const { delta, trades } = feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
    bookRef.current?.applyDeltas(delta);
    if (trades.length) {
      bookRef.current?.setLastPrice(feed.last());
      tapeRef.current?.addTrades(trades);
    }
    const now = performance.now();
    if (now - quotedAt.current < 250) return;
    quotedAt.current = now;
    const store = heatmapRef.current?.getInstance()?.getStore();
    setQuote({
      last: feed.last(),
      spread: store ? store.spread() : NaN,
      trades: tapeRef.current?.getInstance()?.getCount() ?? 0,
    });
  });

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const integer = new Intl.NumberFormat(locale);

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong>{t("pair")}</strong>
        <span>
          {t("lastPrice", {
            value: Number.isNaN(quote.last) ? "…" : usd.format(quote.last),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("spreadIs", {
            value: Number.isNaN(quote.spread) ? "…" : usd.format(quote.spread),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("tradesOnTape", { value: integer.format(quote.trades) })}
        </span>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={320}
        interval={250}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <OrderBook
          ref={bookRef}
          height={300}
          pricePrecision={1}
          sizePrecision={4}
          ariaLabel={t("bookAria")}
        />
        <TimeAndSales
          ref={tapeRef}
          height={300}
          aggregate
          largeTradeThreshold={1}
          pricePrecision={1}
          sizePrecision={4}
          ariaLabel={t("tapeAria")}
        />
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

## Example: 高频行情

模拟的高频行情：每秒约 100 次订单簿更新，每 50 ms 一列，屏幕上保留最近 15 秒。读法与上面的图相同：亮线是大单，圆点是成交，右侧横条是当前订单簿。拖动或缩放后视图不再跟随行情，点击“跟随行情”或双击回到最新。格子由 GPU 绘制（WebGPU 或 WebGL，否则 Canvas2D）：onRendererChange 报告所用后端，onFollowChange 报告视图是否跟随行情。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/live.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  OrderBookHeatmap,
  type ChartRendererKind,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function LiveDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);
  const [follow, setFollow] = useState(true);
  // the last 15 s with one book update every 10 ms (100 a second), then
  // live at the same pace; the heatmap samples the book every 50 ms
  useHeatmapReplay(boxRef, heatmapRef, { seed: 22, activity: 200 }, 15_000, {
    step: 10,
    interval: 10,
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={50}
        window={15_000}
        onRendererChange={setRenderer}
        onFollowChange={setFollow}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          color: "var(--text-secondary-color)",
          fontSize: 13,
        }}
      >
        <span>
          {t("rendererIs", {
            value: renderer ? t(`renderers.${renderer}`) : "…",
          })}
        </span>
        <span>{follow ? t("following") : t("panned")}</span>
        <Button
          size="small"
          variant="outline"
          disabled={follow}
          onClick={() => heatmapRef.current?.resetView()}
        >
          {t("followMarket")}
        </Button>
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

## Example: 以合约张数显示的永续合约

以 0.001 BTC 一张合约报价的 BTC 永续合约：formatSize 换算数量，formatPrice 显示美元，sizeUnit 与 labels 重命名图例和提示中的单位，timeZone="utc" 与上方资金费率倒计时的交易所时钟一致。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/perpetual.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

/** One contract of the perpetual is worth 0.001 BTC */
const CONTRACT = 0.001;
/** Funding is exchanged every 8 hours: 00:00, 08:00 and 16:00 UTC */
const FUNDING = 8 * 3_600_000;
const FUNDING_RATE = 0.0001;

export default function PerpetualDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);
  const [now, setNow] = useState<number | null>(null);
  useHeatmapReplay(boxRef, heatmapRef, { seed: 35 }, 90_000, {
    interval: 50,
  });

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // the feed counts BTC; the venue quotes contracts and dollars
  const { formatPrice, formatSize, contracts, usd } = useMemo(() => {
    const price = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    const count = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const compactUsd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return {
      formatPrice: (value: number) => price.format(value),
      formatSize: (value: number) => count.format(value / CONTRACT),
      contracts: (btc: number) => count.format(Math.round(btc / CONTRACT)),
      usd: (value: number) => compactUsd.format(value),
    };
  }, [locale]);

  const next = now === null ? null : Math.ceil(now / FUNDING) * FUNDING;
  const utc = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });
  const countdown = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  });
  const rate = new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 4,
    signDisplay: "always",
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 16px",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <strong>{t("perpName")}</strong>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("contractSize", {
            value: new Intl.NumberFormat(locale).format(CONTRACT),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {next === null || now === null
            ? t("fundingRate", { rate: rate.format(FUNDING_RATE) })
            : t("funding", {
                rate: rate.format(FUNDING_RATE),
                time: utc.format(next),
                countdown: countdown.format(next - now),
              })}
        </span>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={380}
        interval={250}
        window={90_000}
        formatPrice={formatPrice}
        formatSize={formatSize}
        sizeUnit={t("contracts")}
        // exchanges run on UTC
        timeZone="utc"
        labels={{
          liquidity: t("restingContracts"),
          buys: t("takerBuys"),
          sells: t("takerSells"),
        }}
        onHover={setHover}
        ariaLabel={t("perpAria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hover
          ? t("perpReadout", {
              price: formatPrice(hover.price),
              contracts: contracts(hover.size),
              notional: usd(hover.size * hover.price),
            })
          : t("perpHint")}
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

## Example: 价格精度与悬停检查

tickSize 设置价格行的高度（修改后会按新精度重新采样回放的历史），priceSpan 固定可见价格范围，而不是自动适配最优买卖价。设置 tooltip={false} 后，由 onHover 驱动自定义读数：列时间、价格行、挂单量与方向、成交量。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/price-resolution.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
  type OrderBookHeatmapHoverEvent,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

/** Row heights, in USDT (0: about 0.1 basis point, chosen by the heatmap) */
const TICKS = [0, 1, 5];
/** Visible price spans, in USDT (0: fits the best bid and ask) */
const SPANS = [0, 60, 250];

export default function PriceResolutionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [tickSize, setTickSize] = useState(0);
  const [priceSpan, setPriceSpan] = useState(0);
  const [hover, setHover] = useState<OrderBookHeatmapHoverEvent | null>(null);

  // a new tickSize resamples the book from scratch (the heatmap drops its
  // columns): the two recorded minutes are replayed at the new resolution
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory({ seed: 31 }, 120_000);
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
  }, [tickSize]);
  useFeedLoop(boxRef, (elapsed) => {
    const feed = marketRef.current;
    if (!feed) return;
    const { delta, trades } = feed.step(elapsed);
    heatmapRef.current?.applyDeltas(delta);
    heatmapRef.current?.addTrades(trades);
  });

  const usd = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const whole = new Intl.NumberFormat(locale);
  const btc = new Intl.NumberFormat(locale, { maximumFractionDigits: 3 });
  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
        <RadioGroup
          aria-label={t("rowHeight")}
          direction="horizontal"
          value={tickSize}
          onChange={(value) => setTickSize(Number(value))}
        >
          {TICKS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={
                value
                  ? t("usdtValue", { value: whole.format(value) })
                  : t("auto")
              }
            />
          ))}
        </RadioGroup>
        <RadioGroup
          aria-label={t("priceSpan")}
          direction="horizontal"
          value={priceSpan}
          onChange={(value) => setPriceSpan(Number(value))}
        >
          {SPANS.map((value) => (
            <Radio
              key={value}
              value={value}
              label={
                value
                  ? t("usdtValue", { value: whole.format(value) })
                  : t("fitBook")
              }
            />
          ))}
        </RadioGroup>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={500}
        window={120_000}
        tickSize={tickSize || undefined}
        priceSpan={priceSpan || undefined}
        // the readout below replaces the built-in tooltip
        tooltip={false}
        onHover={setHover}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <span
        style={{
          color: "var(--text-secondary-color)",
          fontSize: 13,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {hover
          ? t("cellReadout", {
              time: clock.format(hover.time),
              price:
                hover.priceHigh > hover.price
                  ? t("priceRange", {
                      low: usd.format(hover.price),
                      high: usd.format(hover.priceHigh),
                    })
                  : usd.format(hover.price),
              size: btc.format(hover.size),
              side:
                hover.side === "bid"
                  ? t("sideBid")
                  : hover.side === "ask"
                    ? t("sideAsk")
                    : t("sideSpread"),
              buys: btc.format(hover.buyVolume),
              sells: btc.format(hover.sellVolume),
            })
          : t("cellHint")}
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

## Example: 红涨绿跌

colorConvention="red-up"：买入气泡与最优买价线为红色，卖出与最优卖价线为绿色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/red-up.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookColorConvention,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useHeatmapReplay } from "../../order-book/feed";

export default function RedUpDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [convention, setConvention] =
    useState<OrderBookColorConvention>("red-up");

  // recorded history (backfilled), then the same market live
  useHeatmapReplay(boxRef, heatmapRef, { seed: 26 }, 60_000);

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
      <OrderBookHeatmap
        ref={heatmapRef}
        // red buy bubbles and best bid line, green sells and best ask
        colorConvention={convention}
        height={360}
        interval={200}
        window={60_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
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

## Example: 流动性终端

完整模拟工作台：六项市场指标、成交 K 线、流动性筛选、保留历史导航及同步订单簿。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/terminal.tsx

```tsx
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  ConfigProvider,
  Select,
  SelectItem,
  Slider,
  Switch,
} from "minerva-design";
import {
  OrderBook,
  OrderBookHeatmap,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import { HistoryNavigator } from "../HistoryNavigator";
import styles from "../market.module.scss";

const PALETTES = {
  ocean: [
    "#080d15",
    "#12355e",
    "#087fa4",
    "#31d7d7",
    "#e9e58a",
    "#ffb35c",
    "#fff4db",
  ],
  ember: [
    "#080d15",
    "#302152",
    "#74336a",
    "#d85b67",
    "#f69d63",
    "#ffe0a0",
    "#fff8db",
  ],
};

export default function TerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const ladder = useRef<OrderBookHandle>(null);
  const [running, setRunning] = useState(true);
  const summary = useTerminalMarket(host, heatmap, ladder, running);
  const [palette, setPalette] = useState<keyof typeof PALETTES>("ocean");
  const [windowMs, setWindowMs] = useState("60000");
  const [filter, setFilter] = useState(0.15);
  const [candles, setCandles] = useState(true);
  const number = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 2,
  });
  const metrics = [
    ["latest", summary?.latest, "USDT"],
    ["bidDepth", summary?.bidDepth, "BTC"],
    ["askDepth", summary?.askDepth, "BTC"],
    ["imbalance", summary ? summary.imbalance * 100 : undefined, "%"],
    ["bidWall", summary?.bidWall, "BTC"],
    ["askWall", summary?.askWall, "BTC"],
  ] as const;
  return (
    <ConfigProvider theme="dark">
      <div
        ref={host}
        className={styles.terminal}
        data-theme="dark"
        data-testid="heatmap-terminal"
      >
        <header className={styles.heading}>
          <h3>
            BTC / USDT{" "}
            <span style={{ color: "#99aac0", fontSize: 12 }}>
              {t("liquidityTerminal")}
            </span>
          </h3>
          <span className={styles.badge}>{t("simulated")}</span>
        </header>
        <div className={styles.metrics} data-testid="heatmap-terminal-metrics">
          {metrics.map(([key, value, unit]) => (
            <Card key={key} className={styles.metric}>
              <span>{t(key)}</span>
              <strong data-metric={key}>
                {value === undefined ? "—" : number.format(value)}{" "}
                <small style={{ fontSize: 10, color: "#99aac0" }}>{unit}</small>
              </strong>
            </Card>
          ))}
        </div>
        <div className={styles.controls}>
          <Switch
            checked={running}
            onChange={setRunning}
            label={t("liveFeed")}
            data-testid="heatmap-live"
          />
          <div className={styles.control}>
            <span>{t("palette")}</span>
            <Select
              aria-label={t("palette")}
              value={palette}
              onChange={(value) => setPalette(value as keyof typeof PALETTES)}
            >
              <SelectItem value="ocean">{t("ocean")}</SelectItem>
              <SelectItem value="ember">{t("ember")}</SelectItem>
            </Select>
          </div>
          <div className={styles.control}>
            <span>{t("timeWindow")}</span>
            <Select
              aria-label={t("timeWindow")}
              value={windowMs}
              onChange={setWindowMs}
            >
              <SelectItem value="30000">30 s</SelectItem>
              <SelectItem value="60000">60 s</SelectItem>
              <SelectItem value="90000">90 s</SelectItem>
            </Select>
          </div>
          <div className={styles.control}>
            <span>{t("intensityFilter")}</span>
            <Slider
              aria-label={t("intensityFilter")}
              min={0}
              max={0.9}
              step={0.05}
              value={filter}
              onChange={(value) => setFilter(Number(value))}
              formatValue={(value) => `${Math.round(value * 100)}%`}
              tooltip
            />
          </div>
          <Switch
            checked={candles}
            onChange={setCandles}
            label={t("showCandles")}
            data-testid="heatmap-show-candles"
          />
          <Button size="small" onClick={() => heatmap.current?.resetView()}>
            {t("resetViewport")}
          </Button>
        </div>
        <div className={styles.workspace}>
          <div className={styles.chart} data-testid="heatmap-terminal-chart">
            <OrderBookHeatmap
              ref={heatmap}
              height={500}
              candles={candles}
              lastPriceLine
              colors={PALETTES[palette]}
              intensityRange={[filter, 1]}
              window={Number(windowMs)}
              interval={250}
              maxColumns={720}
              maxBars={180}
              profile={false}
              pricePrecision={1}
              sizePrecision={3}
              sizeUnit="BTC"
              timeZone="utc"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize={11}
              ariaLabel={t("terminalAria")}
            />
            <HistoryNavigator heatmap={heatmap} summary={summary} />
          </div>
          <aside
            className={styles.ladder}
            data-testid="heatmap-terminal-ladder"
          >
            <h4>{t("currentBook")}</h4>
            <OrderBook
              ref={ladder}
              height={560}
              pricePrecision={1}
              sizePrecision={3}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize={11}
              ariaLabel={t("ladderAria")}
            />
          </aside>
        </div>
        <p className={styles.caption}>{t("terminalHint")}</p>
      </div>
    </ConfigProvider>
  );
}

```

### apps/docs/src/docs/pages/order-book-heatmap/useTerminalMarket.ts

```tsx
import { useEffect, useRef, useState, type RefObject } from "react";
import type {
  OrderBookHandle,
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../order-book/feed";
import { createTradeBars } from "./market";

export interface MarketSummary {
  latest: number;
  bidDepth: number;
  askDepth: number;
  imbalance: number;
  bidWall: number;
  askWall: number;
  start: number;
  end: number;
  closes: number[];
  viewport: OrderBookHeatmapViewData | null;
}

/** One seeded matching engine supplies the heatmap, execution candles and ladder. */
export function useTerminalMarket(
  target: RefObject<HTMLDivElement | null>,
  heatmap: RefObject<OrderBookHeatmapHandle | null>,
  ladder?: RefObject<OrderBookHandle | null>,
  running = true,
) {
  const market = useRef<MarketFeed | null>(null);
  const candles = useRef(createTradeBars(2000, 180));
  const lastSummary = useRef(0);
  const startTime = useRef(0);
  const [summary, setSummary] = useState<MarketSummary | null>(null);
  const publish = (feed: MarketFeed) => {
    const book = feed.snapshot();
    const bidDepth = book.bids.reduce((sum, level) => sum + level[1], 0);
    const askDepth = book.asks.reduce((sum, level) => sum + level[1], 0);
    setSummary({
      latest: feed.last(),
      bidDepth,
      askDepth,
      imbalance: (bidDepth - askDepth) / (bidDepth + askDepth || 1),
      bidWall: Math.max(0, ...book.bids.map((level) => level[1])),
      askWall: Math.max(0, ...book.asks.map((level) => level[1])),
      start: Math.max(startTime.current, feed.time() - 180_000),
      end: feed.time(),
      closes: candles.current.values().map((bar) => bar.close),
      viewport: heatmap.current?.getView() ?? null,
    });
    lastSummary.current = performance.now();
  };
  const publishRef = useRef(publish);
  useEffect(() => {
    publishRef.current = publish;
  });
  useEffect(() => {
    const mountedHeatmap = heatmap.current;
    let stopped = false;
    let initialized = false;
    const initialize = () => {
      if (initialized || stopped || !heatmap.current) return;
      initialized = true;
      const history = createHistory(
        {
          seed: 71,
          price: 76000,
          tick: 1,
          levels: 180,
          activity: 90,
          whales: 0.01,
        },
        90_000,
        250,
      );
      candles.current = createTradeBars(2000, 180);
      startTime.current = history.snapshot.time ?? history.feed.time() - 90_000;
      const sink = heatmap.current;
      sink.clear();
      sink.setBook(history.snapshot);
      for (const update of history.updates) {
        sink.applyDeltas(update.delta);
        sink.addTrades(update.trades);
        candles.current.add(update.trades);
      }
      sink.setBars(candles.current.values());
      market.current = history.feed;
      ladder?.current?.setBook(history.feed.snapshot());
      ladder?.current?.setLastPrice(history.feed.last());
      publishRef.current(history.feed);
    };
    const observer =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) initialize();
          })
        : null;
    if (target.current && observer) observer.observe(target.current);
    else initialize();
    return () => {
      stopped = true;
      observer?.disconnect();
      market.current = null;
      mountedHeatmap?.clear();
    };
  }, [target, heatmap, ladder]);
  useFeedLoop(
    target,
    (elapsed) => {
      const feed = market.current;
      const sink = heatmap.current;
      if (!feed || !sink) return;
      const update = feed.step(elapsed);
      sink.applyDeltas(update.delta);
      sink.addTrades(update.trades);
      candles.current.add(update.trades);
      const bars = candles.current.values();
      if (bars.length) sink.updateBar(bars[bars.length - 1]);
      ladder?.current?.applyDeltas(update.delta);
      ladder?.current?.setLastPrice(feed.last());
      if (performance.now() - lastSummary.current >= 1000)
        publishRef.current(feed);
    },
    { interval: 50, running },
  );
  return summary;
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

### apps/docs/src/docs/pages/order-book-heatmap/market.ts

```tsx
import type { MarketTrade, TradingBar } from "minerva-design/charts";

/** Sparse candles from executions only: empty time buckets are never invented. */
export function createTradeBars(interval: number, limit: number) {
  const width = Number.isFinite(interval) && interval > 0 ? interval : 1000;
  const capacity = Number.isFinite(limit)
    ? Math.max(1, Math.floor(limit))
    : 180;
  const buckets = new Map<
    number,
    { bar: TradingBar; first: number; last: number }
  >();
  return {
    add(trades: readonly MarketTrade[]) {
      for (const trade of trades) {
        if (
          ![trade.time, trade.price, trade.size].every(Number.isFinite) ||
          trade.price <= 0 ||
          trade.size <= 0
        )
          continue;
        const time = Math.floor(trade.time / width) * width;
        const bucket = buckets.get(time);
        if (bucket) {
          bucket.bar.high = Math.max(bucket.bar.high, trade.price);
          bucket.bar.low = Math.min(bucket.bar.low, trade.price);
          bucket.bar.volume = (bucket.bar.volume ?? 0) + trade.size;
          if (trade.time < bucket.first) {
            bucket.first = trade.time;
            bucket.bar.open = trade.price;
          }
          if (trade.time >= bucket.last) {
            bucket.last = trade.time;
            bucket.bar.close = trade.price;
          }
        } else
          buckets.set(time, {
            first: trade.time,
            last: trade.time,
            bar: {
              time,
              open: trade.price,
              high: trade.price,
              low: trade.price,
              close: trade.price,
              volume: trade.size,
            },
          });
        if (buckets.size > capacity)
          buckets.delete(Math.min(...buckets.keys()));
      }
    },
    values(): TradingBar[] {
      return [...buckets.values()]
        .map(({ bar }) => ({ ...bar }))
        .sort((a, b) => a.time - b.time);
    },
  };
}

```

### apps/docs/src/docs/pages/order-book-heatmap/HistoryNavigator.tsx

```tsx
import { useEffect, useState, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import { Button, Slider } from "minerva-design";
import type {
  OrderBookHeatmapHandle,
  OrderBookHeatmapViewData,
} from "minerva-design/charts";
import type { MarketSummary } from "./useTerminalMarket";
import styles from "./market.module.scss";

export function HistoryNavigator({
  heatmap,
  summary,
}: {
  heatmap: RefObject<OrderBookHeatmapHandle | null>;
  summary: MarketSummary | null;
}) {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const [navigation, setNavigation] = useState<{
    range: [number, number];
    follow: boolean;
    ready: boolean;
  }>({ range: [0, 100], follow: true, ready: false });
  useEffect(() => {
    const instance = heatmap.current?.getInstance();
    if (!instance) return;
    const update = (data: OrderBookHeatmapViewData) => {
      const available = data.availableTime;
      const ready = !!available && available[1] > available[0];
      const range = ready
        ? (data.view.time.map((time) =>
            Math.max(
              0,
              Math.min(
                100,
                Math.round(
                  ((time - available![0]) / (available![1] - available![0])) *
                    100,
                ),
              ),
            ),
          ) as [number, number])
        : ([0, 100] as [number, number]);
      setNavigation((previous) =>
        previous.ready === ready &&
        previous.follow === data.view.follow &&
        previous.range[0] === range[0] &&
        previous.range[1] === range[1]
          ? previous
          : { range, follow: data.view.follow, ready },
      );
    };
    const unsubscribe = instance.on("view", update);
    const frame = requestAnimationFrame(() => update(instance.getView()));
    return () => {
      cancelAnimationFrame(frame);
      unsubscribe();
    };
  }, [heatmap]);
  const { range, follow, ready } = navigation;
  const closes = summary?.closes ?? [];
  const low = Math.min(...closes);
  const high = Math.max(...closes);
  const path = closes
    .map(
      (close, i) =>
        `${(i * 100) / Math.max(1, closes.length - 1)},${40 - ((close - low) / (high - low || 1)) * 34}`,
    )
    .join(" ");
  return (
    <div
      className={styles.navigator}
      data-testid="heatmap-history-navigator"
      data-follow={follow}
    >
      <div className={styles.navigatorHeader}>
        <span>{t("historyNavigator")}</span>
        <Button
          size="small"
          data-testid="heatmap-follow"
          onClick={() => {
            heatmap.current?.resetView();
          }}
        >
          {t("followMarket")}
        </Button>
      </div>
      <svg viewBox="0 0 100 44" preserveAspectRatio="none" aria-hidden="true">
        <polyline
          points={path}
          fill="none"
          stroke="var(--success-color, #30d6a3)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <Slider
        range
        disabled={!ready}
        aria-label={t("historyNavigator")}
        min={0}
        max={100}
        step={1}
        value={range}
        onChange={(value) => {
          const next = value as [number, number];
          const available = heatmap.current?.getView()?.availableTime;
          if (!available || next[1] <= next[0]) return;
          setNavigation((previous) => ({
            ...previous,
            range: next,
            follow: false,
          }));
          const span = available[1] - available[0];
          heatmap.current?.setView({
            time: [
              available[0] + (span * next[0]) / 100,
              available[0] + (span * next[1]) / 100,
            ],
          });
        }}
      />
      <p className={styles.caption}>{t(follow ? "following" : "panned")}</p>
    </div>
  );
}

```

### apps/docs/src/docs/pages/order-book-heatmap/market.module.scss

```scss
.demo {
  display: grid;
  gap: 18px;
  width: 100%;
  min-width: 0;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}
.control {
  display: grid;
  gap: 8px;
  min-width: 160px;
  flex: 1 1 160px;
  font-size: 12px;
  color: var(--text-secondary-color);
}
.terminal {
  --background-color: #080d15;
  --surface-color: #101824;
  --surface-elevated-color: #172233;
  --text-color: #e7eef8;
  --text-secondary-color: #99aac0;
  --border-color: #26364c;
  --success-color: #30d6a3;
  --danger-color: #ff657e;
  background: #080d15;
  color: #e7eef8;
  padding: 20px;
  border: 1px solid #26364c;
  border-radius: 14px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  display: grid;
  gap: 20px;
  font-variant-numeric: tabular-nums;
  container-type: inline-size;
}
.heading {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.heading h3 {
  font-size: 18px;
  letter-spacing: 0.03em;
  margin: 0;
}
.badge {
  color: #ffd68a;
  border: 1px solid #755e34;
  border-radius: 4px;
  font-size: 10px;
  letter-spacing: 0.14em;
  padding: 5px 8px;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}
.metric {
  padding: 12px !important;
  min-width: 0;
  background: #101824 !important;
  border-color: #26364c !important;
}
.metric span {
  display: block;
  font-size: 10px;
  color: #99aac0;
  margin-bottom: 8px;
}
.metric strong {
  font-size: 17px;
  font-weight: 550;
  overflow-wrap: anywhere;
}
.workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 240px;
  gap: 16px;
}
.chart {
  min-width: 0;
}
.ladder {
  min-width: 0;
  background: #101824;
  border: 1px solid #26364c;
  border-radius: 8px;
  padding: 12px;
}
.ladder h4 {
  margin: 0 0 12px;
  font-size: 12px;
  color: #99aac0;
}
.navigator {
  display: grid;
  gap: 6px;
  min-width: 0;
}
.navigator svg {
  display: block;
  width: 100%;
  height: 44px;
  background: color-mix(in srgb, var(--text-color) 3%, transparent);
  border-radius: 4px;
}
.navigatorHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  color: var(--text-secondary-color);
}
.caption {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary-color);
}
@media (max-width: 1000px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 480px) {
  .terminal {
    padding: 12px;
  }
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong {
    font-size: 16px;
  }
}

@container (max-width: 760px) {
  .metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container (max-width: 360px) {
  .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .metric strong small {
    display: block;
  }
  .navigatorHeader {
    flex-wrap: wrap;
  }
}

@container (max-width: 600px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr);
  }
}

```

## Example: 时间窗口、暂停与清空

window 决定在已记录的五分钟（history）中显示多少，无需重新采样。开关会停止数据循环：恢复时行情从暂停处继续，没有空档。clear() 清除所有列，再用 setBook 从当前盘口重新开始。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/order-book-heatmap/demos/time-window.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Radio, RadioGroup, Switch } from "minerva-design";
import {
  OrderBookHeatmap,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import {
  createHistory,
  useFeedLoop,
  type MarketFeed,
} from "../../order-book/feed";

/** Visible spans, in ms */
const WINDOWS = [30_000, 120_000, 300_000];

export default function TimeWindowDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const locale = i18n.language;
  const heatmapRef = useRef<OrderBookHeatmapHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<MarketFeed | null>(null);
  const [span, setSpan] = useState(120_000);
  const [running, setRunning] = useState(true);
  const [status, setStatus] = useState("");

  // five minutes of recorded market: all of it fits in `history`, the
  // window only picks how much of it is on screen
  useEffect(() => {
    const heatmap = heatmapRef.current;
    if (!heatmap) return;
    const { feed, snapshot, updates } = createHistory(
      { seed: 33 },
      300_000,
      200,
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
  }, []);
  // paused, the market stops too: it resumes where it was, without a gap
  useFeedLoop(
    boxRef,
    (elapsed) => {
      const feed = marketRef.current;
      if (!feed) return;
      const { delta, trades } = feed.step(elapsed);
      heatmapRef.current?.applyDeltas(delta);
      heatmapRef.current?.addTrades(trades);
    },
    { running },
  );

  const clock = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const duration = (ms: number) =>
    ms < 60_000
      ? new Intl.NumberFormat(locale, { style: "unit", unit: "second" }).format(
          ms / 1000,
        )
      : new Intl.NumberFormat(locale, { style: "unit", unit: "minute" }).format(
          ms / 60_000,
        );
  const marketTime = () => clock.format(marketRef.current?.time() ?? 0);

  return (
    <div ref={boxRef} style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px 24px",
        }}
      >
        <RadioGroup
          aria-label={t("timeWindow")}
          direction="horizontal"
          value={span}
          onChange={(value) => {
            setSpan(Number(value));
            setStatus("");
          }}
        >
          {WINDOWS.map((value) => (
            <Radio key={value} value={value} label={duration(value)} />
          ))}
        </RadioGroup>
        <Switch
          checked={running}
          onChange={(checked) => {
            setRunning(checked);
            setStatus(
              t(checked ? "resumedAt" : "pausedAt", { time: marketTime() }),
            );
          }}
          label={t("liveFeed")}
        />
        <Button
          size="small"
          variant="outline"
          onClick={() => {
            const feed = marketRef.current;
            if (!feed) return;
            // drop the history, keep the current book as the first column
            heatmapRef.current?.clear();
            heatmapRef.current?.setBook(feed.snapshot());
            setStatus(t("clearedAt", { time: marketTime() }));
          }}
        >
          {t("clearHistory")}
        </Button>
      </div>
      <OrderBookHeatmap
        ref={heatmapRef}
        height={400}
        interval={250}
        window={span}
        history={300_000}
        pricePrecision={1}
        sizePrecision={3}
        sizeUnit="BTC"
        ariaLabel={t("aria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)", fontSize: 13 }}
      >
        {status ||
          t("windowStatus", {
            window: duration(span),
            history: duration(300_000),
          })}
      </output>
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
