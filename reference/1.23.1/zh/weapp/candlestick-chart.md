# K 线图

按周期展示开盘、最高、最低和收盘价，适用于股票、加密货币等任意 OHLC 数据。上涨与下跌的 K 线各有颜色，可叠加折线系列（如均线），即使历史数据很长，借助 GPU 缩放和平移依然流畅。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: zh

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

开盘

最高

最低

收盘

涨跌幅

K 线颜色

绿涨红跌

红涨绿跌

ACME 60 个交易日的日线行情

MA{{days}}

NOVA 120 个交易日的日线行情，含 5 日与 20 日均线

50,000 根 1 分钟 K 线

{{candles}} 根 K 线 · 使用 {{renderer}} 绘制 · Ctrl / ⌘ + 滚轮缩放，拖动平移，双击重置

成交量

ORBT 90 个交易日的日线行情

ORBT 每日成交量

VWAP

下调业绩指引

ORBT 单个交易时段的 5 分钟 K 线及 VWAP

日线美国线

日线蜡烛图

日线空心蜡烛图

美国线

蜡烛图

空心蜡烛图

左右短横线表示开盘和收盘

实体从开盘到收盘

收盘高于开盘时实体空心

ETH/USDT

ETH/USDT 4 小时图，含 8 条指数均线

成交量位置

单独窗格

叠加在价格下方

BTC/USDT

BTC/USDT 1 小时图，成交量按 K 线着色

宁德时代 300750

宁德时代日线图，上涨 K 线为红色

财

息

拆

指引↓

财报

分红

拆股

下调指引

ORBT

ORBT 日线图，标有财报、分红和拆股

暂停

继续

实时：每秒 10 笔成交

已暂停

ADA/USDT

5 秒

实时更新的 ADA/USDT 5 秒 K 线

纳斯达克 100

深色主题下的纳斯达克 100 30 分钟空心 K 线

形态

全部

十字星

锤子线

射击之星

吞没

十

锤

星

吞↑

吞↓

十字星

锤子线

射击之星

看涨吞没

看跌吞没

开盘价与收盘价几乎相同，多空犹豫

下跌后出现长下影线，买方入场

上涨后出现长上影线，卖方入场

阳线实体完全覆盖前一根阴线

阴线实体完全覆盖前一根阳线

{{name}}：{{value}}

{{date}} 的{{name}}：{{meaning}}。

悬停在带标记的 K 线上查看形态名称。

标出 K 线形态的 ORBT 日线图

BTC/USD

AAPL

EUR/USD

黄金 (XAU/USD)

48 小时

30 天

{{name}} K 线，期间涨跌 {{change}}

R1

P

S1

EUR/USD

带每日枢轴点的 EUR/USD 小时 K 线

{{time}} · 振幅 {{range}} 点 · 实体 {{body}} 点 · 涨跌 {{change}} 点 · 光标距最新价 {{distance}} 点

周五枢轴点：P {{pivot}}，R1 {{r1}}，S1 {{s1}}。悬停在 K 线上以点数测量。

## CandlestickChart

Support: beta

Chart whose untyped series are OHLC candles (`open`, `high`, `low`, `y`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/candlestick-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
