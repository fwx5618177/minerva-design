# 技术指标

均线、布林带、VWAP、MACD、RSI、KDJ、ATR 和平均 K 线：在 TradingChart 上一行声明，或用纯函数在普通数组和 Float64Array 列上计算。

Package: minerva-design@1.22.3

Renderer: taro

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
