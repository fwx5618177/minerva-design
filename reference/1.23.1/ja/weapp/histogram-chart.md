# ヒストグラム

生のサンプルを等幅のビンに分けた分布。数百から数百万の値まで扱えます。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

リクエスト数

100 万件のリクエストのレイテンシ分布と p50、p95、p99

ビン分けのルール

自動

Sturges

10 ビン

40 ビン

学生

得点

試験の得点分布

顧客

年齢

顧客の年齢分布

対照群

新しいオンボーディング

セッション時間（分）

A/B テストの 2 群のセッション時間

正規分布の当てはめ

下限規格

上限規格

基準値

工具調整済み

平均 {{mean}}、σ {{sd}}、Cpk {{cpk}}、公差外 {{ppm}} ppm:

工程能力あり

工程能力不足

部品

直径

規格限界と当てはめた正規曲線を含むシャフト直径の分布

送料無料

中央値 {{value}}

p99 {{value}}

注文の {{share}} が送料無料の基準 {{threshold}} に達しています。

注文

注文金額（対数スケール）

対数スケールでの注文金額の分布

一時停止

再開

リセット

{{share}} の電話に {{target}} 以内で応答、p90 は {{p90}}:

目標達成

目標未達

電話

待ち時間

目標

p90

直近 600 件のサポート電話の待ち時間のライブ分布

従業員の {{share}}

従業員 {{value}} 人（{{share}}）

クリックで累積割合を表示

棒をクリックすると、通勤時間がそれ以下の従業員の割合を表示します。

従業員の {{share}}（{{employees}} 人）の通勤時間は {{limit}} 以下です。

従業員

片道の通勤時間

従業員の通勤時間の分布

## HistogramChart

Support: beta

Histogram of the raw `values` (bins rule or count, domain, nice), extra series over the bins; formatBin() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/histogram-chart/index",
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
    "name": "values",
    "typeText": "array",
    "required": false
  },
  {
    "name": "bins",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "domain",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "nice",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
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
