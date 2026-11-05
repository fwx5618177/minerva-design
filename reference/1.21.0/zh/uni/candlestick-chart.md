# K 线图

按周期展示开盘、最高、最低和收盘价，适用于股票、加密货币等任意 OHLC 数据。上涨与下跌的 K 线各有颜色，可叠加折线系列（如均线），即使历史数据很长，借助 GPU 缩放和平移依然流畅。

Package: minerva-design@1.21.0

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "CandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
