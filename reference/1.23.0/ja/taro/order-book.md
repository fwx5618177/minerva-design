# 板情報

Canvas で描く価格ラダー：スプレッド行の上に売り、下に買い。深度バー、価格のまとめ表示、変化した気配の点滅、大口注文の強調、ホバー時の累計サマリーを備えます。毎秒数百件の更新もフレームごとに 1 回の描画で済みます。

Package: minerva-design@1.23.0

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の板

### 板情報

BTC/USDT

価格 (USDT)

数量 (BTC)

累計 (BTC)

更新頻度

{{value}} 回/秒

{{updates}} メッセージ/秒 · 気配の変化 {{levels}} 件/秒

価格の刻み

深度バー

累計

気配ごと

大口注文のしきい値

≥ {{value}} BTC

買い {{price}}：{{size}} BTC、ここまでの累計 {{sum}} BTC

売り {{price}}：{{size}} BTC、ここまでの累計 {{sum}} BTC

気配をクリックして価格を選びます。

表示

両方

買い

売り

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

始値から {{value}}

指値：{{price}}

指値

デプス

BTC/USDT の深度

歩み値

BTC/USDT の歩み値

市場

暗号資産 · BTC/USDT

価格 (USDT)

数量 (BTC)

累計 (BTC)

BTC/USDT の板

株式 · AAPL

価格 (USD)

株数

累計

AAPL の板

FX · EUR/USD

レート

数量 (EUR)

累計 (EUR)

EUR/USD の板

先物 · ES

価格（ポイント）

枚数

累計

E-mini S&P 500 先物の板

{{value}} pips

{{value}} セント

{{value}} ティック

{{value}} USDT

呼値 {{tick}} · スプレッド {{spread}} · {{large}} 以上を強調

大口の壁

新規

取消

約定

{{size}} BTC 以上の壁：待機 {{resting}}、約定 {{filled}}、取消 {{pulled}}（取消率 {{ratio}}）

板の大口の壁を監視中…

買いの壁 {{price}}：{{size}} BTC

売りの壁 {{price}}：{{size}} BTC

{{value}} 後

指値注文

売買

買い

売り

指値 (USDT)

数量 (BTC)

価格と数量を入力するか、気配をクリックしてください。

{{filled}} BTC が即座に約定、平均 {{average}}。

{{filled}} BTC が即座に約定（平均 {{average}}）、残り {{rest}} BTC は {{price}} で待機。

{{price}} で待機、前に {{ahead}} BTC。

{{side}}

{{side}} {{size}} BTC（{{price}}）を発注しました。

{{price}} の注文を取り消しました。

{{side}} {{size}} @ {{price}}

未約定の注文はありません。

注文を取り消す

## OrderBook

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
