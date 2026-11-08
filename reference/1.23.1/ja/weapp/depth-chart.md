# デプスチャート

板の累積深度：仲値を挟んだ階段状の買い・売りエリア、ホバーすると両側の数量・金額・平均価格を鏡映表示し、仲値を中心にズームでき、毎秒数百件の差分更新もなめらかに補間します。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

BTC/USDT の板の深度

リアルタイム配信

表示範囲

自動

±{{value}}

累積方法

数量 (BTC)

金額 (USDT)

曲線

階段

直線

Ctrl/⌘ + ホイールまたはピンチで仲値を中心にズーム、ダブルクリックで戻します。

{{value}} にズーム中

自分の買い

自分の売り

清算価格

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

{{amount}} BTC（{{total}}）を買うと {{price}} までの売り板を約定し、仲値より {{slippage}} 上、平均価格は {{average}} です。

{{amount}} BTC（{{total}}）を売ると {{price}} までの買い板を約定し、仲値より {{slippage}} 下、平均価格は {{average}} です。

曲線にホバーして成行注文のコストを見積もります。

売買

成行買い

成行売り

注文数量

{{value}} BTC

平均約定

最終約定

{{size}} BTC は {{levels}} 段で約定：平均 {{average}}、最終約定 {{worst}}、合計 {{cost}}、仲値から {{slippage}} bp。

このサイドには {{filled}} BTC しかありません（注文は {{size}} BTC）。{{levels}} 段すべてを {{worst}} まで食い尽くします。

集計範囲

{{band}} 以内：買い {{bids}} BTC、売り {{asks}} BTC、偏り {{imbalance}} · スプレッド {{spread}}（{{spreadBp}} bp）

最初の読み取りを待っています…

金額を累積（価格 × 株数）

金額（USD）

株数

ACME 株の板の深さ

統合

取引所 {{name}}

取引所

最良買い気配

最良売り気配

±0.1% 以内の BTC

{{value}}（{{share}}）

BTC/USDT の深さ、{{name}}

取引所別の最良気配と流動性

## DepthChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
