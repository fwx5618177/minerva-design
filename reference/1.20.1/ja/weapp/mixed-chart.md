# 複合グラフ

棒・折れ線・面を 1 つのグラフに、1 本または 2 本の値軸で：売上と成長率、降水量と気温、パレート図。

Package: minerva-design@1.20.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

{{year}} 年 Q{{n}}

売上

前年同期比

四半期売上と前年同期比の成長率

降水量

気温

東京の月ごとの降水量と気温

セッション

コンバージョン率

キャンペーン

2 か月間の日ごとのセッション数とコンバージョン率

返品

累積比率

サイズ違い

破損

説明と異なる

配達遅延

気が変わった

誤配送

その他

原因別の返品数とその累積比率

ページビュー

中国語（zh-CN）

フランス語（fr-FR）

日別ページビューとコンバージョン率、{{locale}}

売上

ユーザー数

ユーザー数（対数）

2016〜2025 年の年間売上と対数軸のユーザー数

{{value}} kWh

太陽光発電量

消費量

蓄電池の充電率

夜間

{{value}} の蓄電池

2 日間の自給率は {{share}}、系統からの購入は {{imported}} です。

1 時間あたりの電力量

ある住宅の 2 日間の時間ごとの太陽光発電量と消費量、および蓄電池の充電率

在庫水準

入荷

販促期間

安全在庫

発注点

日付または入荷をクリックしてください。

{{id}}：{{ordered}} に {{quantity}} 個を発注し、{{lead}} 後の {{arrived}} に入荷。

{{date}} の在庫は {{units}} 個。

{{date}} の在庫は {{units}} 個のみで、安全在庫を下回っています。

個数

ある商品の 3 か月間の日別在庫水準。入荷、発注点、安全在庫を表示

リクエスト数

エラー率

リリース

30 分あたりのリクエスト数

ある Web API の 1 日のリクエスト数とエラー率、およびリリース

{{version}} のリリース後、エラー率は {{time}} に {{peak}} でピークに達し、{{rollback}} へのロールバックまで続きました。

{{value}} pt

開始

残作業

完了

理想ペース

{{value}} 追加

理想：残り {{value}}

残り {{value}}

当日の完了 {{value}}

理想より {{value}} 遅れ

理想より {{value}} 先行

ストーリーポイント

スプリントのバーンダウン：10 稼働日の残作業、日ごとの完了ポイント、理想の消化ペース

残り {{left}}、1 日 {{velocity}} のペースでは、スプリント終了時に約 {{forecast}} が未完了になります。

残り {{left}}、1 日 {{velocity}} のペースで、スプリントは順調です。

## MixedChart

Support: beta

Bars, lines, areas and dots each with its `type`, right axis (`yAxis2`), `stackMode` and `orientation`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/mixed-chart/index",
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
    "name": "yAxis2",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stackMode",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
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
