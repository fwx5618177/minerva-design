# 订单簿热力图

Bookmap 风格的流动性热力图：按时间与价格绘制挂单量（GPU 渲染），叠加最优买卖价线、按成交量缩放的成交气泡与当前订单簿剖面，支持缩放、平移与十字准线读数。实时数据按间隔追加列并保持滑动窗口。

Package: minerva-design@1.23.0

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnOrderBookHeatmap. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnOrderBookHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "bars",
    "typeText": "TradingBarsInput | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "trades",
    "typeText": "readonly MarketTrade[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
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
    "typeText": "OrderBookHeatmapHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookHeatmapHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "followChange",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "viewChange",
    "typeText": "OrderBookHeatmapViewData",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookHeatmapViewData",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: K 线与历史导航

将实际成交聚合为 OHLC K 线并叠加挂单流动性。选择保留历史，再恢复跟随市场。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, viewChild, effect, untracked } from '@angular/core';
import { MnOrderBookHeatmap, MnButton, MnSlider, injectMinerva } from 'minerva-design/angular';
import { MarketTrade, OrderBookSnapshot, TradingBar } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap, MnButton, MnSlider],
  template: `
@let t = labels[language()];
<div style="display:grid;gap:12px;width:100%">
<p>{{t.source}}</p>
<div style="display:flex;gap:8px;flex-wrap:wrap">
<button mnButton size="small" variant="outline" (click)="show(10)">{{t.latest}}</button>
<button mnButton size="small" variant="outline" (click)="show(30)">{{t.full}}</button>
<button mnButton size="small" (click)="heatmap.resetView()">{{t.follow}}</button>
</div>
<mn-slider [attr.aria-label]="t.minimum" [value]="minimum" (valueChange)="filter($event)" [min]="0" [max]="90" [step]="5" showValue style="max-width:320px"/>
<mn-order-book-heatmap #heatmap [height]="400" [options]="{ interval:250, window:30000, history:60000, maxBars:30, maxColumns:240, intensityRange:[minimum / 100, 1] }" (viewChange)="viewState = $event"/>
<output aria-live="polite">{{viewState?.view?.follow ? t.following : t.manual}} · {{t.minimum}} {{minimum}}% · {{viewState ? ((viewState.view.time[1] - viewState.view.time[0]) / 1000).toFixed(0) : 30}} {{t.visible}}</output>
</div>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  minimum = 0;
  labels = {
  "en": {
    "source": "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    "latest": "Latest 10s",
    "full": "Full 30s",
    "follow": "Follow market",
    "following": "Following market",
    "manual": "Manual view",
    "minimum": "Minimum liquidity intensity (%)",
    "visible": "s visible"
  },
  "zh": {
    "source": "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    "latest": "最近 10 秒",
    "full": "完整 30 秒",
    "follow": "跟随行情",
    "following": "正在跟随行情",
    "manual": "手动视图",
    "minimum": "最低流动性强度（%）",
    "visible": "秒可见"
  },
  "ja": {
    "source": "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    "latest": "直近 10 秒",
    "full": "全 30 秒",
    "follow": "相場に追従",
    "following": "相場に追従中",
    "manual": "手動表示",
    "minimum": "流動性強度の下限（%）",
    "visible": "秒を表示"
  },
  "fr": {
    "source": "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    "latest": "10 dernières s",
    "full": "30 s complètes",
    "follow": "Suivre le marché",
    "following": "Suivi du marché",
    "manual": "Vue manuelle",
    "minimum": "Intensité minimale de liquidité (%)",
    "visible": "s visibles"
  }
};
  viewState = null as import("minerva-design/charts/core").OrderBookHeatmapViewData | null;
  filter = (value: number | [number, number]) => { this.minimum = typeof value === 'number' ? value : value[0]; };
  chart = viewChild<import('minerva-design/angular').MnOrderBookHeatmap>('heatmap');
  history = (() => {
  const end = Math.floor(Date.now() / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12);
    const size = 1 + (i * 7 % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) => Array.from({ length: 36 }, (_, level) =>
      [round(price + sign * (level + 1) * 0.05), 2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0)] as [number, number]);
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0) bars.push({ time: start + bucket * 1000, open: price, high: price, low: price, close: price, volume: size });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price); bar.low = Math.min(bar.low, price);
      bar.close = price; bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
})();
  show = (seconds: number) => this.chart()?.setView({ time: [this.history.end - seconds * 1000, this.history.end], price: [98, 102] });
  initialize = effect(() => {
  const heatmap = this.chart();
  if (!heatmap?.instance()) return;
  // instance is a public readiness signal; the engine is created after render.
  untracked(() => {
    for (const book of this.history.books) heatmap.setBook(book);
    heatmap.addTrades(this.history.trades);
    heatmap.setBars(this.history.bars);
    this.show(30);
  });
});
}

```

## Example: Live liquidity heatmap

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```

## Example: 红涨绿跌

colorConvention="red-up"：买入气泡与最优买价线为红色，卖出与最优卖价线为绿色。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" [options]="{ colorConvention: 'red-up', colorScale: 'sqrt', profile: false }" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```
