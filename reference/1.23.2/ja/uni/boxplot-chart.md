# 箱ひげ図

中央値、四分位数、ひげ、外れ値で分布を比較。生のサンプルからも、計算済みの統計量からも描けます。外れ値は系列色の中抜きの円で、ホバーすると値とグループを確認できます。

Package: minerva-design@1.23.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "BoxPlotChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\" | undefined",
    "required": false
  },
  {
    "name": "outlierShape",
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "required": false
  },
  {
    "name": "outlierSize",
    "typeText": "number | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
