# 逐笔成交

逐笔成交列表：最新成交位于顶部并滑入、闪烁，大额成交加粗着色，同一毫秒的扫单可合并，可按数量过滤，悬停时暂停。基于类型化数组的环形缓冲区保存 20 万笔成交，只绘制可见的行。

Package: minerva-design@1.19.3

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT 逐笔成交

以 {{price}} 买入 {{size}} BTC

以 {{price}} 卖出 {{size}} BTC

悬停时暂停：移开指针（或点击徽标）即可继续。

悬停可暂停列表，点击某行选中一笔成交。

大额成交阈值

≥ {{value}} BTC

最小数量

全部

合并同一毫秒的扫单

按涨跌为价格着色

保留 {{value}} 行

涨跌颜色

红涨绿跌

绿涨红跌

追加 {{value}} 笔成交

共 {{rows}} 笔成交，最近一批耗时 {{ms}} ms

滚动窗口

最近 {{value}}

VWAP

买入占比

买入量

卖出量

{{value}} BTC

每秒成交笔数

最大单笔

买入 {{size}}，价格 {{price}}

卖出 {{size}}，价格 {{price}}

买方在主动吃卖单。

卖方在主动砸买单。

买卖力量均衡。

等待成交…

时区

本地

UTC

纽约

东京

时间（{{zone}}）

≥ {{value}} BTC 的大宗成交

清空

开始以来共 {{value}} 笔大宗成交

等待大宗成交…

买入

卖出

{{time}} · {{size}} BTC，均价 {{price}}，≈ {{notional}}

{{value}} 笔

{{count}} 笔 · {{size}} BTC

买入

卖出

BTC/USDT 买入成交

BTC/USDT 卖出成交

净流量：{{value}} BTC（买入 − 卖出）

## TimeAndSales

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
