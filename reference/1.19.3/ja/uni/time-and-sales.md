# 歩み値

歩み値：最新の約定が上から滑り込んで点滅し、大口約定は太字と色で強調、同一ミリ秒のスイープはまとめられ、数量でのフィルターやホバー中の一時停止に対応します。型付き配列のリングバッファに 20 万件を保持し、見えている行だけを描画します。

Package: minerva-design@1.19.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の歩み値

{{price}} で {{size}} BTC の買い

{{price}} で {{size}} BTC の売り

ホバー中は一時停止：ポインターを外す（またはバッジをクリック）と再開します。

ホバーで一時停止、行をクリックで約定を選択します。

大口約定のしきい値

≥ {{value}} BTC

最小数量

すべて

同一ミリ秒のスイープをまとめる

ティックで価格を色分け

保持中の行：{{value}}

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

約定を {{value}} 件追加

{{rows}} 件、直近のバッチは {{ms}} ms

ローリング期間

直近 {{value}}

VWAP

買いの比率

買い

売り

{{value}} BTC

約定数 / 秒

最大の約定

買い {{size}}（{{price}}）

売り {{size}}（{{price}}）

買い手が売り気配を買い上がっています。

売り手が買い気配に売り込んでいます。

買いと売りの流れは均衡しています。

約定を待っています…

タイムゾーン

ローカル

UTC

ニューヨーク

東京

時刻（{{zone}}）

{{value}} BTC 以上の大口約定

クリア

開始から {{value}} 件の大口約定

大口約定を待っています…

買い

売り

{{time}} · {{size}} BTC、平均 {{price}}、≈ {{notional}}

{{value}} 件

{{count}} 件 · {{size}} BTC

買い

売り

BTC/USDT の買い約定

BTC/USDT の売り約定

ネットフロー：{{value}} BTC（買い − 売り）

## TimeAndSales

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
