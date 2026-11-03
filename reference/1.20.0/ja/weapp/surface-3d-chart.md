# 3D サーフェスチャート

規則格子上のサーフェス z = f(x, y)：ライティング、組み込みのカラーマップ（viridis、plasma、terrain…）、ワイヤーフレーム、床面に投影した等高線、透明度。ドラッグで回転、Ctrl / ⌘ + ホイールでズーム。

Package: minerva-design@1.20.0

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

sinc

Peaks

鞍点面

関数

{{name}} 関数の 3D サーフェス

x

y

z

島

{{value}} km

{{value}} m

東

北

標高

幅 20 km の島の地形

インプライド・ボラティリティ

{{value}}%

権利行使価格（現値比 %）

満期までの日数

{{value}} 日

権利行使価格と満期ごとのインプライド・ボラティリティ・サーフェス

面

ワイヤーフレーム

床面の等高線

サーフェス上の等高線

ワイヤーフレームと等高線付きの peaks サーフェス

お椀

傾いた平面

透明なお椀と交わる透明な傾いた平面

波

アニメーション

振幅

中心から広がるアニメーションの波紋

金属板

リセット

cm

温度

点熱源で加熱された金属板の温度

熱源: {{sources}} · 最高 {{max}} · 平均 {{mean}}。板をクリックすると熱源を追加・削除できます。

国債利回り

年限

月

利回り

24 か月間の年限別国債利回り

{{date}}の {{maturity}} 利回り: {{yield}}。

曲面にホバーすると利回りを表示します。

{{date}}は逆イールドです（10 年 − 2 年: {{spread}}）。

{{date}}は右肩上がりの曲線です（10 年 − 2 年: {{spread}}）。

損失

({{x}}, {{y}})

カラースケール

Viridis

Plasma

Magma

Cividis

Turbo

重み 1

重み 2

log₁₀(1 + 損失)

4 つの極小値を持つ Himmelblau 関数の損失地形

{{start}}（損失 {{loss}}）から勾配降下法で {{steps}} ステップ後、{{minimum}} にある極小値 {{n}} に到達しました。

曲面をクリックすると、そこから勾配降下法を開始します。

{{value}} dBm

信号

アクセスポイント

ロビー

オープンスペース

会議室

キッチン

3D 表示

真上から

メートル

オフィスフロアの Wi-Fi 信号強度

フロアの {{good}} が {{goodLevel}} 以上（ビデオ通話可）、{{usable}} が {{usableLevel}} 以上です。

すべてのアクセスポイントがオフです。カバレッジはありません。

## Surface3DChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
