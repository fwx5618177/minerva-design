# 3D 散布図

周囲を回転できる 3D ボックス内の点群：数十万〜数百万の点を GPU で描画し、系列ごと・点ごと・カラースケールで色分け。ホバー選択、凡例、カラーバー付き。Line3DChart は 3D の軌跡を描きます。

Package: minerva-design@1.22.2

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

セトサ

バーシカラー

バージニカ

がく片の長さ（cm）

がく片の幅（cm）

花びらの長さ（cm）

がく片の長さ・幅と花びらの長さによる 3 品種の花の 3D 散布図

バルジとバー

古い円盤

若い星

HII 領域

ハロー

{{value}} kpc

100 万個の星の棒渦巻銀河：バルジ、若い星の渦巻腕、HII 領域と塵の帯、円盤とハロー

露出

露出 ×{{value}}

センサー

センサー {{id}} · 湿度 {{humidity}}%

{{value}} °C

長さ（m）

幅（m）

高さ（m）

温度

倉庫内の 300 個のセンサーの位置と高さごとの温度

骨格 1

骨格 2

塩基対

自動回転

投影

透視

平行投影

回転する DNA の二重らせん

トーラス結び目

高さで色分けしたトーラス結び目の周りの 200,000 点

バックエンド

自動

WebGPU

WebGL2

WebGL

Canvas2D

起動中…

使用中のバックエンド：{{backend}}

ここでは {{requested}} を使えないため {{backend}} で描画しています

軌跡

時間

{{value}} 秒

時間で色分けしたローレンツアトラクターの軌跡

スイスロール

ロール上の位置

正面

側面

上面

リセット

方位角 {{azimuth}}°、仰角 {{elevation}}°、ズーム ×{{zoom}}

ドラッグで回転、Shift + ドラッグでパン、Ctrl / ⌘ + ホイールでズーム、ダブルクリックでリセット。

ロール上の位置で色分けしたスイスロールの点群

スポーツ

政治

テクノロジー

健康

金融

旅行

{{topic}}の記事 #{{n}}

最近傍

第 {{n}} 主成分（{{variance}}）

第 1〜第 3 主成分上のニュース記事の埋め込み（トピック別）

{{doc}} に最も近い記事: {{list}}。

{{doc}}（{{distance}}）

記事をクリックすると最も近い記事を探します。

LiDAR 反射

色分けの基準

高さ

反射強度

ダークテーマ

建物・街路樹・駐車車両がある街路の LiDAR 点群

{{points}} 点。点群にホバーすると反射を読み取れます。

高さ {{height}}、反射強度 {{intensity}}。

{{shell}} {{n}}

ブロードバンド（低軌道）

地球観測（極軌道）

測位（中軌道）

静止軌道

地球

再生

千 km

地球を周回する 4 つの軌道殻の衛星

{{shell}}: 高度 {{altitude}}、速度 {{speed}}、周期 {{period}}。

衛星にホバーすると軌道を表示します。

テクノロジー

ヘルスケア

エネルギー

金融

消費財

{{ticker}} · {{cap}}

正射影ビュー

ボラティリティ

ベータ

年間リターン

ボラティリティ・ベータ・年間リターンで配置した銘柄（大きさは時価総額）

{{ticker}}（{{sector}}）: リターン {{ret}}、ボラティリティ {{volatility}}、ベータ {{beta}}、シャープレシオ {{sharpe}}、時価総額 {{cap}}。

銘柄をクリックすると数値を固定表示します。

## Line3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Scatter3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
