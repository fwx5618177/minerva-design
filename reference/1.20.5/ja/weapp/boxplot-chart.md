# 箱ひげ図

中央値、四分位数、ひげ、外れ値で分布を比較。生のサンプルからも、計算済みの統計量からも描けます。外れ値は系列色の中抜きの円で、ホバーすると値とグループを確認できます。

Package: minerva-design@1.20.5

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

ゲートウェイ

認証

検索

決済

レコメンド

画像

応答時間

最大

第 3 四分位

中央値

第 1 四分位

最小

外れ値

サービスごとの応答時間の分布

年収

ジュニア開発者

開発者

シニア開発者

テックリード

エンジニアリングマネージャー

職種ごとの給与の分布

平日

週末

パリ

リヨン

マルセイユ

リール

配達時間（時間）

都市ごとの平日と週末の配達時間

日最高気温

平均

月ごとの日最高気温の分布

Lint

単体テスト

結合テスト

E2E テスト

リリース

ひげの範囲

1.5 × IQR

3 × IQR

最小 – 最大

外れ値の形

中抜き

塗りつぶし

{{value}} 件の実行を外れ値として表示

ビルド時間

CI パイプラインごとのビルド時間の分布

箱または外れ値をクリックしてください。

{{day}}: ある患者は {{value}} 待ちました。

{{day}}: 待ち時間の中央値 {{median}}、半数の患者は {{q1}} から {{q3}} 待ち、外れ値 {{outliers}} 件。

待ち時間

4 時間目標

曜日ごとの救急外来の待ち時間の分布

スタイルシート

スクリプト

フォント

画像

動画

対数スケール

{{value}} 個のファイルが予算 {{budget}} を超えています。

ファイルサイズ

予算

Web サイトのファイルサイズの種類別の分布

米国東部

米国西部

欧州西部

アジア太平洋南部

南米東部

一時停止

再開

{{regions}} で SLA 違反のおそれ

すべてのリージョンが SLA 内です

レイテンシ

SLA

リージョンごとのリクエストレイテンシのライブ分布

## BoxPlotChart

Support: beta

Box plots from raw `groups` (Tukey whiskers or minmax) or statistics `series`, vertical or horizontal. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/box-plot-chart/index",
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
    "name": "groups",
    "typeText": "array",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "whisker",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "outlierShape",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "outlierSize",
    "typeText": "unknown",
    "required": false,
    "default": null
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
