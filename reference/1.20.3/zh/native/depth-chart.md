# 深度图

订单簿的累计深度：围绕中间价的阶梯状买卖面积，悬停时镜像显示两侧的数量、成交额与均价，可围绕中间价缩放，每秒数百次增量更新也能平滑过渡。

Package: minerva-design@1.20.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
