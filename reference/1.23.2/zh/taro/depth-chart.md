# 深度图

订单簿的累计深度：围绕中间价的阶梯状买卖面积，悬停时镜像显示两侧的数量、成交额与均价，可围绕中间价缩放，每秒数百次增量更新也能平滑过渡。

Package: minerva-design@1.23.2

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
