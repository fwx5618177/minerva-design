# 折れ線グラフ

数値、日付、カテゴリに対する折れ線または塗りつぶした面。GPU で数百万ポイントを扱えます。

Package: minerva-design@1.22.0

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

今週

先週

今週と先週の日別訪問者数

使用容量

日

60 日間のストレージ使用量

リスボン

オスロ

曲線

直線

なめらか

ステップ

リスボンとオスロの月平均気温

コンピューティング

ストレージ

ネットワーク

データベース

積み上げ方法

積み上げ

サービス別の月間クラウド費用（積み上げ）

ページビュー

セッション

2026 年上半期の日別ページビューとセッション

センサー

100 万件のセンサー測定値

{{points}} ポイント · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

訪問者

製品リリース

障害

製品リリースと障害を含む 90 日間の日別訪問者数

室内

屋外

欠損を含む 1 時間ごとの室内と屋外の気温

センサーが数時間オフラインでした。推測で埋めずに線を途切れさせています。

中央値

95 パーセンタイル

危険

目標 {{value}}

6 時間の API レイテンシ（中央値と 95 パーセンタイル）

終値

期間

1か月

3か月

6か月

1年

すべて

2 年間の日次終値

歩数

1 日の歩数

{{day}}：{{steps}} 歩

線をタップまたはなぞってください

CPU

メモリ

{{hour}}時

1 日の CPU とメモリの使用率

ピンチでズーム、ダブルタップでリセット。凡例をタップすると系列を非表示にできます。

冷凍庫の温度

{{value}} 超で警報

一時停止

再開

警報：扉が開いている？

正常

最新の値 {{value}}（{{time}}）

直近 1 分間の上限超過：{{readings}} 件

直近 1 分間の冷凍庫の温度（毎秒更新）

野生型

変異株

抗生物質あり

対数増殖期

対数スケール

接種後の経過時間

CFU / mL

3 種類の細菌培養の 24 時間の増殖曲線

直線部分は増殖率が一定であることを示します。野生型は約 {{minutes}} ごとに倍増します。

線形スケールでは菌数の少ない培養が平らに見えます。対数スケールに戻すと比較できます。

ポートフォリオ評価額

点をクリックして計測を開始し、続けて 2 点目をクリックします。

始点 {{date}}（{{value}}）：2 点目をクリックしてください。

{{from}} → {{to}}：{{change}}（{{percent}}）、期間 {{days}}

クリア

2026 年のポートフォリオの日次評価額。2 点をクリックすると変化を計測します

株式

債券

金

不動産

基準 = 100

100 を基準に指数化した 4 つの資産クラスのパフォーマンス（2021〜2026 年）

{{value}} µg/m³

デリー

北京

パリ

メキシコシティ

東京

サンパウロ

11 月の微小粒子状物質（PM2.5）の日平均値。破線は WHO の指針値 {{value}} です。

超過 {{days}}/{{total}} 日

{{city}} の 30 日間の日次 PM2.5

## LineChart

Support: beta

Chart whose untyped series are lines, or areas with `area`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/line-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
