# K 线图

按周期展示开盘、最高、最低和收盘价，适用于股票、加密货币等任意 OHLC 数据。上涨与下跌的 K 线各有颜色，可叠加折线系列（如均线），即使历史数据很长，借助 GPU 缩放和平移依然流畅。

Package: minerva-design@1.22.1

Renderer: angular

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

Native Angular: MnCandlestickChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Daily candles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[{ name: t.price, data: candles }]"
  [xAxis]="{ title: t.day }"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 100,
    "y": 100,
    "high": 101.5,
    "low": 98.5
  },
  {
    "x": 2,
    "open": 101.98,
    "y": 105.76,
    "high": 107.26,
    "low": 100.48
  },
  {
    "x": 3,
    "open": 103.84,
    "y": 101.39,
    "high": 105.34,
    "low": 99.89
  },
  {
    "x": 4,
    "open": 105.45,
    "y": 103.25,
    "high": 106.95,
    "low": 101.75
  },
  {
    "x": 5,
    "open": 106.73,
    "y": 110.6,
    "high": 112.1,
    "low": 105.23
  },
  {
    "x": 6,
    "open": 107.59,
    "y": 107.29,
    "high": 109.09,
    "low": 105.79
  },
  {
    "x": 7,
    "open": 107.98,
    "y": 104.3,
    "high": 109.48,
    "low": 102.8
  },
  {
    "x": 8,
    "open": 107.87,
    "y": 110.55,
    "high": 112.05,
    "low": 106.37
  },
  {
    "x": 9,
    "open": 107.27,
    "y": 109.22,
    "high": 110.72,
    "low": 105.77
  },
  {
    "x": 10,
    "open": 106.22,
    "y": 102.29,
    "high": 107.72,
    "low": 100.79
  },
  {
    "x": 11,
    "open": 104.79,
    "y": 105.39,
    "high": 106.89,
    "low": 103.29
  },
  {
    "x": 12,
    "open": 103.05,
    "y": 106.6,
    "high": 108.1,
    "low": 101.55
  },
  {
    "x": 13,
    "open": 101.13,
    "y": 98.23,
    "high": 102.63,
    "low": 96.73
  },
  {
    "x": 14,
    "open": 99.13,
    "y": 97.46,
    "high": 100.63,
    "low": 95.96
  },
  {
    "x": 15,
    "open": 97.19,
    "y": 101.17,
    "high": 102.67,
    "low": 95.69
  },
  {
    "x": 16,
    "open": 95.43,
    "y": 94.53,
    "high": 96.93,
    "low": 93.03
  },
  {
    "x": 17,
    "open": 93.95,
    "y": 90.55,
    "high": 95.45,
    "low": 89.05
  },
  {
    "x": 18,
    "open": 92.84,
    "y": 95.93,
    "high": 97.43,
    "low": 91.34
  },
  {
    "x": 19,
    "open": 92.18,
    "y": 93.58,
    "high": 95.08,
    "low": 90.68
  },
  {
    "x": 20,
    "open": 92.01,
    "y": 88.01,
    "high": 93.51,
    "low": 86.51
  },
  {
    "x": 21,
    "open": 92.33,
    "y": 93.51,
    "high": 95.01,
    "low": 90.83
  },
  {
    "x": 22,
    "open": 93.13,
    "y": 96.36,
    "high": 97.86,
    "low": 91.63
  },
  {
    "x": 23,
    "open": 94.36,
    "y": 91.08,
    "high": 95.86,
    "low": 89.58
  },
  {
    "x": 24,
    "open": 95.93,
    "y": 94.82,
    "high": 97.43,
    "low": 93.32
  }
];
  labels = {
  "en": {
    "price": "Price",
    "day": "Day"
  },
  "zh": {
    "price": "价格",
    "day": "天"
  },
  "ja": {
    "price": "価格",
    "day": "日"
  },
  "fr": {
    "price": "Cours",
    "day": "Jour"
  }
};
}

```

## Example: 均线

type: "line" 的系列绘制在 K 线之上，这里是 5 日和 20 日均线，窗口未满时以 null 开头。悬停某一天可查看其 OHLC、涨跌幅以及两条均线的值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[
    { name: t.price, data: candles },
    { name: t.average, type: 'line', curve: 'smooth', data: average }
  ]"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 80,
    "y": 80,
    "high": 81.5,
    "low": 78.5
  },
  {
    "x": 2,
    "open": 82.78,
    "y": 86.56,
    "high": 88.06,
    "low": 81.28
  },
  {
    "x": 3,
    "open": 85.44,
    "y": 82.99,
    "high": 86.94,
    "low": 81.49
  },
  {
    "x": 4,
    "open": 87.85,
    "y": 85.65,
    "high": 89.35,
    "low": 84.15
  },
  {
    "x": 5,
    "open": 89.93,
    "y": 93.8,
    "high": 95.3,
    "low": 88.43
  },
  {
    "x": 6,
    "open": 91.59,
    "y": 91.29,
    "high": 93.09,
    "low": 89.79
  },
  {
    "x": 7,
    "open": 92.78,
    "y": 89.1,
    "high": 94.28,
    "low": 87.6
  },
  {
    "x": 8,
    "open": 93.47,
    "y": 96.15,
    "high": 97.65,
    "low": 91.97
  },
  {
    "x": 9,
    "open": 93.67,
    "y": 95.62,
    "high": 97.12,
    "low": 92.17
  },
  {
    "x": 10,
    "open": 93.42,
    "y": 89.49,
    "high": 94.92,
    "low": 87.99
  },
  {
    "x": 11,
    "open": 92.79,
    "y": 93.39,
    "high": 94.89,
    "low": 91.29
  },
  {
    "x": 12,
    "open": 91.85,
    "y": 95.4,
    "high": 96.9,
    "low": 90.35
  },
  {
    "x": 13,
    "open": 90.73,
    "y": 87.83,
    "high": 92.23,
    "low": 86.33
  },
  {
    "x": 14,
    "open": 89.53,
    "y": 87.86,
    "high": 91.03,
    "low": 86.36
  },
  {
    "x": 15,
    "open": 88.39,
    "y": 92.37,
    "high": 93.87,
    "low": 86.89
  },
  {
    "x": 16,
    "open": 87.43,
    "y": 86.53,
    "high": 88.93,
    "low": 85.03
  },
  {
    "x": 17,
    "open": 86.75,
    "y": 83.35,
    "high": 88.25,
    "low": 81.85
  },
  {
    "x": 18,
    "open": 86.44,
    "y": 89.53,
    "high": 91.03,
    "low": 84.94
  },
  {
    "x": 19,
    "open": 86.58,
    "y": 87.98,
    "high": 89.48,
    "low": 85.08
  },
  {
    "x": 20,
    "open": 87.21,
    "y": 83.21,
    "high": 88.71,
    "low": 81.71
  },
  {
    "x": 21,
    "open": 88.33,
    "y": 89.51,
    "high": 91.01,
    "low": 86.83
  },
  {
    "x": 22,
    "open": 89.93,
    "y": 93.16,
    "high": 94.66,
    "low": 88.43
  },
  {
    "x": 23,
    "open": 91.96,
    "y": 88.68,
    "high": 93.46,
    "low": 87.18
  },
  {
    "x": 24,
    "open": 94.33,
    "y": 93.22,
    "high": 95.83,
    "low": 91.72
  }
];
  average = [
  {
    "x": 1,
    "y": 80
  },
  {
    "x": 2,
    "y": 83.28
  },
  {
    "x": 3,
    "y": 83.18
  },
  {
    "x": 4,
    "y": 83.8
  },
  {
    "x": 5,
    "y": 85.8
  },
  {
    "x": 6,
    "y": 88.06
  },
  {
    "x": 7,
    "y": 88.57
  },
  {
    "x": 8,
    "y": 91.2
  },
  {
    "x": 9,
    "y": 93.19
  },
  {
    "x": 10,
    "y": 92.33
  },
  {
    "x": 11,
    "y": 92.75
  },
  {
    "x": 12,
    "y": 94.01
  },
  {
    "x": 13,
    "y": 92.35
  },
  {
    "x": 14,
    "y": 90.79
  },
  {
    "x": 15,
    "y": 91.37
  },
  {
    "x": 16,
    "y": 90
  },
  {
    "x": 17,
    "y": 87.59
  },
  {
    "x": 18,
    "y": 87.93
  },
  {
    "x": 19,
    "y": 87.95
  },
  {
    "x": 20,
    "y": 86.12
  },
  {
    "x": 21,
    "y": 86.72
  },
  {
    "x": 22,
    "y": 88.68
  },
  {
    "x": 23,
    "y": 88.51
  },
  {
    "x": 24,
    "y": 89.56
  }
];
  labels = {
  "en": {
    "price": "Price",
    "average": "5-day average"
  },
  "zh": {
    "price": "价格",
    "average": "5 日均线"
  },
  "ja": {
    "price": "価格",
    "average": "5日移動平均"
  },
  "fr": {
    "price": "Cours",
    "average": "Moyenne 5 jours"
  }
};
}

```
