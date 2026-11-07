# 深度图

订单簿的累计深度：围绕中间价的阶梯状买卖面积，悬停时镜像显示两侧的数量、成交额与均价，可围绕中间价缩放，每秒数百次增量更新也能平滑过渡。

Package: minerva-design@1.22.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT 订单簿深度

实时推送

可见范围

自适应

±{{value}}

累计方式

数量 (BTC)

金额 (USDT)

曲线

阶梯

直线

Ctrl/⌘ + 滚轮或双指捏合围绕中间价缩放，双击复位。

已缩放至 {{value}}

我的买单

我的卖单

强平价

涨跌颜色

红涨绿跌

绿涨红跌

买入 {{amount}} BTC（{{total}}）将吃掉直到 {{price}} 的卖单，高于中间价 {{slippage}}，成交均价 {{average}}。

卖出 {{amount}} BTC（{{total}}）将吃掉直到 {{price}} 的买单，低于中间价 {{slippage}}，成交均价 {{average}}。

悬停在曲线上，估算一笔市价单的成本。

方向

市价买入

市价卖出

下单数量

{{value}} BTC

成交均价

最后成交

{{size}} BTC 将吃掉 {{levels}} 档：均价 {{average}}，最后一档 {{worst}}，合计 {{cost}}，偏离中间价 {{slippage}} 个基点。

这一侧只有 {{filled}} BTC（需要 {{size}} BTC）：订单会吃光全部 {{levels}} 档，直到 {{worst}}。

统计区间

{{band}} 内：买盘 {{bids}} BTC，卖盘 {{asks}} BTC，失衡 {{imbalance}} · 价差 {{spread}}（{{spreadBp}} 个基点）

等待第一次读数…

累计美元金额（价格 × 股数）

金额（美元）

股数

ACME 股票订单簿深度

合并

交易所 {{name}}

交易所

最优买价

最优卖价

±0.1% 内 BTC

{{value}}（{{share}}）

BTC/USDT 深度，{{name}}

各交易所最优价与流动性

## DepthChart

Support: beta

Native Angular: MnDepthChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDepthChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "book",
    "typeText": "OrderBookSnapshot | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "options",
    "typeText": "O | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "DepthChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "DepthChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "depthClick",
    "typeText": "DepthChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "DepthChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rangeChange",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Cumulative depth

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDepthChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDepthChart],
  template: `
@let t = labels[language()];
<mn-depth-chart [book]="book" (hover)="hovered = $event ? t.price + ' ' + $event.price + ' · ' + t.total + ' ' + $event.amount : ''" />
<output aria-live="polite">{{ hovered || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered = "";
  book = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  return { bids: side(-1, 1), asks: side(1, 2) };
})();
  labels = {
  "en": {
    "price": "Price",
    "total": "Total",
    "hint": "Hover the curves"
  },
  "zh": {
    "price": "价格",
    "total": "累计",
    "hint": "将指针悬停在曲线上"
  },
  "ja": {
    "price": "価格",
    "total": "累計",
    "hint": "曲線にカーソルを合わせます"
  },
  "fr": {
    "price": "Prix",
    "total": "Cumul",
    "hint": "Survolez les courbes"
  }
};
}

```

## Example: 实时行情

模拟撮合引擎每秒约 100 次增量通过 ref 句柄传入（applyDeltas：价格 → 数量，0 表示删除该档）。React 不会重新渲染：图表把它们合并到一帧中绘制，并平滑过渡曲线与刻度；离开视口时停止绘制。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnDepthChart } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDepthChart],
  template: `
<mn-depth-chart [book]="book()" [options]="{ range: 0.012 }" [height]="280" />
  `,
})
export class Example {
  book = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  const book = signal({ bids: side(-1, 3), asks: side(1, 4) });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    book.set({ bids: side(-1, 3 + tick), asks: side(1, 4 + tick) });
  }, 1000);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return book;
})();
}

```
