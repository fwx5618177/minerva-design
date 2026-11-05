# 技术指标

均线、布林带、VWAP、MACD、RSI、KDJ、ATR 和平均 K 线：在 TradingChart 上一行声明，或用纯函数在普通数组和 Float64Array 列上计算。

Package: minerva-design@1.21.0

Renderer: angular

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

#### 声明式指标

indicators 选项按顺序列出指标：均线、布林带、肯特纳通道、唐奇安通道、VWAP、抛物线 SAR、一目均衡表和超级趋势画在价格上；成交量（overlay 时除外）、MACD、RSI、KDJ、ATR、OBV、CCI、随机 RSI、DMI、威廉指标和 MFI 各自在下方占一个窗格。图例显示十字光标处的数值，点击指标名称可隐藏该指标。

指标默认由类型和参数标识（"ma:7"、"macd:12:26:9"），也可以设置 id：indicatorToggle 和 setIndicatorVisible 使用该标识。修改列表时，未变化指标的计算结果会被保留。

#### 纯函数

minerva-design/charts/core 导出了同样的计算：接收普通数组或类型化数组，返回 Float64Array 列，窗口未满时为 NaN。可用于信号、选股、回测或服务端，得到与图表绘制完全一致的数值。

#### 计算约定

MA 为简单平均，WMA 对最新的 K 线权重最大，EMA 使用 2 / (周期 + 1)，并以首个窗口的简单平均作为起点，与 TradingView 一致。

RSI 和 ATR 使用 Wilder 平滑（1 / 周期）；布林带使用总体标准差。

KDJ 的 K、D 初值为 50，默认按 3 根 K 线平滑；J = 3K − 2D 可能超出 0-100。

VWAP 每天（或每周、每月、从不）重新开始计算，按 timeZone 或 utcOffset 的时区划分。

每次推送时，图表只重新计算最后一根 K 线的数值：无论一百根还是一百万根 K 线，推送的开销都相同。

缩小显示时，指标仍按每一根 K 线计算，并按每个像素列的最低和最高值绘制，因此在一百万根 K 线上尖峰依然可见。

一目均衡表的先行带向前（最新 K 线之后的空白处）移动 displacement − 1 根，迟行线向后移动同样根数；纯函数 ichimoku 返回未移动的数值。

周期

{{period}} 根

微软 MSFT

带简单、指数和加权均线的日线图

通道宽度

{{value}} σ

ETH/USDT

带布林带的小时图

英伟达 NVDA

五个交易日的五分钟图，含 VWAP 和成交量

BTC/USDT

带 MACD 副图的日线图

超买 / 超卖

70 / 30

80 / 20

SOL/USDT

带 14 日和 6 日 RSI 的四小时图

宁德时代 300750

带 KDJ 副图的日线图

多单止损 · 2 ATR

空单止损 · 2 ATR

黄金 XAU/USD

带 ATR 和波动止损线的黄金小时图

图表样式

平均 K 线

蜡烛图

ADA/USDT

平均 K 线四小时图

上涨趋势已持续 {{count}} 根

上涨趋势已持续 {{count}} 根

下跌趋势已持续 {{count}} 根

下跌趋势已持续 {{count}} 根

买

卖

带 EMA 交叉信号和 RSI 的小时图

已平仓 {{trades}} 笔 · 盈利 {{wins}} 笔 · 累计 {{result}}

埃克森美孚 XOM

用 createTradingChart 绘制的日线图

K 线数量还不足以计算 50 日均线

收盘价高于 50 日均线 {{value}}

收盘价低于 50 日均线 {{value}}

云层

日经 225

日经 225 日线图，含一目均衡表

通道距离

{{value}} 倍 ATR

抛物线 SAR

SOL/USDT 4 小时图，含超级趋势及其翻转点

通道

肯特纳

唐奇安

布林带

欧元/美元

EUR/USD 1 小时图，含价格通道

震荡指标

随机 RSI

CCI

威廉指标

MFI

BTC/USDT 4 小时图，含震荡指标窗格

ADX {{adx}}：趋势强劲，{{direction}}

ADX {{adx}}：趋势不强，目前{{direction}}

偏多（+DI 在 −DI 之上）

偏空（−DI 在 +DI 之上）

MSFT 日线图，含 DMI 窗格

苹果 AAPL

AAPL 日线图，含成交量和 OBV

趋势翻转：{{count}} 次

背离

全部

看涨

看跌

画出 RSI 背离的 SOL/USDT 4 小时图

看涨背离 {{bullish}} 个，看跌背离 {{bearish}} 个。

最近：{{kind}}，{{date}}。

EMA {{period}} · {{frame}}

带小时、4 小时和日线 20 周期 EMA 的 ETH/USDT 小时图

{{time}} · 收盘 {{close}}

{{frame}}：高于 {{value}}

{{frame}}：低于 {{value}}

{{frame}}：K 线不足

所有周期向上

所有周期向下

各周期方向不一

指标选股器

品种

收盘价

1 日

RSI 14

MACD 柱

ATR %

相对 SMA 50

信号

超买

超卖

上升趋势

下降趋势

中性

{{name}}：{{signal}}，距 50 日均线 {{distance}}。

带 50 日均线、RSI 和 MACD 的 {{name}} 日线图

```tsx
<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>
```

```tsx
import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 布林带

20 根 K 线的均线，上下轨距离为若干个标准差，中间有浅色填充；波动加大时通道变宽。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';
import { bollinger, ema } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, opacity: 0.18, data: indicators.band },
    { name: t.close, type: 'line', data: indicators.close },
    { name: t.middle, type: 'line', lineWidth: 1, data: indicators.middle },
    { name: t.slow, type: 'line', lineWidth: 1, data: indicators.slow }
  ]"
  curve="linear"
  [xAxis]="{ type: 'time' }"
  crosshair
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  indicators = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  let price = 100;
  const TIMES: number[] = [];
  const CLOSES = Array.from({ length: 200 }, (_, i) => {
    TIMES.push(Date.UTC(2025, 2, 3) + i * 86_400_000);
    price = round(price * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25));
    return price;
  });
  const bands = bollinger(CLOSES, 20, 2);
  const slow = ema(CLOSES, 50);
  const points = (values: ArrayLike<number>) =>
    TIMES.map((x, i) => ({ x, y: Number.isNaN(values[i]) ? null : round(values[i]) }));
  return {
    band: TIMES.map((x, i) =>
      Number.isNaN(bands.upper[i])
        ? { x, y: null }
        : { x, y0: round(bands.lower[i]), y: round(bands.upper[i]) },
    ),
    close: points(CLOSES),
    middle: points(bands.middle),
    slow: points(slow),
  };
})();
  labels = {
  "en": {
    "close": "Close",
    "band": "Bollinger (20, 2)",
    "middle": "SMA 20",
    "slow": "EMA 50"
  },
  "zh": {
    "close": "收盘价",
    "band": "布林带 (20, 2)",
    "middle": "SMA 20",
    "slow": "EMA 50"
  },
  "ja": {
    "close": "終値",
    "band": "ボリンジャーバンド (20, 2)",
    "middle": "SMA 20",
    "slow": "EMA 50"
  },
  "fr": {
    "close": "Clôture",
    "band": "Bollinger (20, 2)",
    "middle": "MMS 20",
    "slow": "MME 50"
  }
};
}

```

## Example: Indicator panes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTradingChart, injectMinerva } from 'minerva-design/angular';
import { macd } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnTradingChart],
  template: `
@let t = labels[language()];
<mn-trading-chart
  [bars]="bars"
  symbol="ACME"
  [indicators]="[
    { type: 'boll', period: 20, multiplier: 2 },
    { type: 'macd' },
    { type: 'rsi', period: 14 }
  ]"
  [height]="440"
/>
<output aria-live="polite">{{ t.macd }}: {{ last.macd }} / {{ last.signal }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  bars = (() => {
          const fraction = (value: number) => value - Math.floor(value);
          const round = (value: number) => Math.round(value * 100) / 100;
          let close = 100;
          return Array.from({ length: 240 }, (_, i) => {
            const open = close;
            close = round(open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25));
            const spread = (open * fraction(Math.sin(i * 78.233) * 43758.5453)) / 60;
            return {
              time: Date.UTC(2025, 2, 3) + i * 86_400_000,
              open,
              high: round(Math.max(open, close) + spread),
              low: round(Math.min(open, close) - spread),
              close,
              volume: Math.round(1000 + fraction(Math.sin(i * 3.7) * 9999) * 4000),
            };
          });
        })();
  last = (() => {
  const result = macd(this.bars.map((bar) => bar.close));
  const end = this.bars.length - 1;
  return {
    macd: result.macd[end].toFixed(2),
    signal: result.signal[end].toFixed(2),
  };
})();
  labels = {
  "en": {
    "macd": "MACD (12, 26, 9)"
  },
  "zh": {
    "macd": "MACD 指标 (12, 26, 9)"
  },
  "ja": {
    "macd": "MACD (12, 26, 9)"
  },
  "fr": {
    "macd": "MACD (12, 26, 9)"
  }
};
}

```
