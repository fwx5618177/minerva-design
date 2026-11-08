# K 线图

按周期展示开盘、最高、最低和收盘价，适用于股票、加密货币等任意 OHLC 数据。上涨与下跌的 K 线各有颜色，可叠加折线系列（如均线），即使历史数据很长，借助 GPU 缩放和平移依然流畅。

Package: minerva-design@1.23.1

Renderer: wc

Locale: zh

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/candlestick-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 均线叠加

在 K 线上叠加一条折线系列：收盘价的 5 日移动平均线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/candlestick-chart/wc/moving-average.html

```html
<minerva-candlestick-chart id="trend" height="300"></minerva-candlestick-chart>

```

### apps/docs/src/docs/pages/candlestick-chart/wc/moving-average.ts

```tsx
// A series with `type: "line"` is drawn over the candles: a 5-day moving
// average of the closes.
import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", average: "5-day average" },
  zh: { price: "价格", average: "5 日均线" },
  ja: { price: "価格", average: "5日移動平均" },
  fr: { price: "Cours", average: "Moyenne 5 jours" },
};

const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 80 + 0.6 * i + 6 * Math.sin(i / 3);
  const close = open + 4 * Math.sin(i * 1.7);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high: Math.round((Math.max(open, close) + 1.5) * 100) / 100,
    low: Math.round((Math.min(open, close) - 1.5) * 100) / 100,
  };
});
const average = candles.map((candle, i) => {
  const window = candles.slice(Math.max(0, i - 4), i + 1);
  const mean = window.reduce((sum, c) => sum + c.y, 0) / window.length;
  return [candle.x, Math.round(mean * 100) / 100] as [number, number];
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCandlestickChart>("#trend")!;
  chart.series = [
    { name: text.price, data: candles },
    { name: text.average, type: "line", curve: "smooth", data: average },
  ];
  chart.options = { yAxis: { zero: false } };
}

```

## Example: 日 K 线

每个数据点包含开盘价、最高价、最低价和收盘价；上涨和下跌的 K 线分别使用成功色和危险色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/candlestick-chart/wc/ohlc.html

```html
<minerva-candlestick-chart id="prices" height="300"></minerva-candlestick-chart>

```

### apps/docs/src/docs/pages/candlestick-chart/wc/ohlc.ts

```tsx
// Each point carries open, high, low and y (the close); rising candles use
// the success color, falling ones the danger color.
import type { MinervaCandlestickChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { price: "Price", day: "Day" },
  zh: { price: "价格", day: "天" },
  ja: { price: "価格", day: "日" },
  fr: { price: "Cours", day: "Jour" },
};

// 40 deterministic sessions
const candles = Array.from({ length: 40 }, (_, i) => {
  const open = 100 + 12 * Math.sin(i / 5) + 4 * Math.sin(i * 1.3);
  const close = open + 5 * Math.sin(i * 2.1);
  return {
    x: i + 1,
    open: Math.round(open * 100) / 100,
    y: Math.round(close * 100) / 100,
    high:
      Math.round((Math.max(open, close) + 2 + Math.abs(Math.sin(i))) * 100) /
      100,
    low:
      Math.round((Math.min(open, close) - 2 - Math.abs(Math.cos(i))) * 100) /
      100,
  };
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCandlestickChart>("#prices")!;
  chart.series = [{ name: text.price, data: candles }];
  chart.options = { xAxis: { title: text.day }, yAxis: { zero: false } };
}

```
