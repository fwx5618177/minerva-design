# 订单簿

Canvas 绘制的价格阶梯：卖单在价差行上方、买单在下方，带深度条、价格合并、变动档位闪烁、大单高亮与悬停累计汇总。每秒数百次更新也只需每帧绘制一次。

Package: minerva-design@1.20.2

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT 订单簿

### 订单簿

BTC/USDT

价格 (USDT)

数量 (BTC)

累计 (BTC)

更新频率

{{value}} 次/秒

{{updates}} 条消息/秒 · {{levels}} 次档位变动/秒

价格步长

深度条

累计

单档

大单阈值

≥ {{value}} BTC

买单 {{price}}：{{size}} BTC，到此累计 {{sum}} BTC

卖单 {{price}}：{{size}} BTC，到此累计 {{sum}} BTC

点击某一档选取其价格。

显示

双侧

买盘

卖盘

涨跌颜色

红涨绿跌

绿涨红跌

开盘以来 {{value}}

限价：{{price}}

限价

深度

BTC/USDT 深度

最新成交

BTC/USDT 逐笔成交

市场

加密货币 · BTC/USDT

价格 (USDT)

数量 (BTC)

累计 (BTC)

BTC/USDT 订单簿

股票 · AAPL

价格 (USD)

股数

累计

AAPL 订单簿

外汇 · EUR/USD

汇率

数量 (EUR)

累计 (EUR)

EUR/USD 订单簿

期货 · ES

价格（点）

合约

累计

E-mini 标普 500 期货订单簿

{{value}} 点

{{value}} 美分

{{value}} 跳

{{value}} USDT

最小变动价位 {{tick}} · 价差 {{spread}} · 达到 {{large}} 高亮

大单墙

新增

撤单

成交

≥ {{size}} BTC 的大单墙：{{resting}} 挂单中，{{filled}} 成交，{{pulled}} 撤单（撤单率 {{ratio}}）

正在监控盘口中的大单墙…

买盘墙 {{price}}：{{size}} BTC

卖盘墙 {{price}}：{{size}} BTC

持续 {{value}}

限价单

方向

买入

卖出

限价 (USDT)

数量 (BTC)

输入价格和数量，或点击一个档位。

立即成交 {{filled}} BTC，均价 {{average}}。

立即成交 {{filled}} BTC（均价 {{average}}），剩余 {{rest}} BTC 挂在 {{price}}。

挂在 {{price}}，前面排队 {{ahead}} BTC。

{{side}}

已下单：{{side}} {{size}} BTC，价格 {{price}}。

已撤销 {{price}} 的订单。

{{side}} {{size}} @ {{price}}

暂无挂单。

撤销订单

## OrderBook

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
