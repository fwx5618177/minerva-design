# 订单簿

Canvas 绘制的价格阶梯：卖单在价差行上方、买单在下方，带深度条、价格合并、变动档位闪烁、大单高亮与悬停累计汇总。每秒数百次更新也只需每帧绘制一次。

Package: minerva-design@1.20.4

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
