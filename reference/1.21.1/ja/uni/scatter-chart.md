# 散布図

2 つの値で配置する点。ポイントごとにサイズ、色、ラベルを指定でき、両軸でズームできます。

Package: minerva-design@1.21.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

スターター

ビジネス

シート数

月額料金

プラン別のシート数と月額料金

国

1 人あたり GDP

平均寿命

1 人あたり GDP と平均寿命。点の大きさは人口

クラスター {{name}}

それぞれ 100,000 点からなる 2 つのクラスター

{{points}} ポイント · {{renderer}} で描画

セッション時間と閲覧ページ数

分

ページ

無料

プロ

{{plan}}：{{minutes}} 分、{{pages}} ページ

点をタップしてください

キャンペーン

傾向線

週間広告費

週間売上

R² = {{r2}} · 広告費 1 ドルあたり売上 +{{slope}}

60 件のキャンペーンの広告費と売上、傾向線付き

アデリーペンギン

ヒゲペンギン

ジェンツーペンギン

フリッパー長

体重

3 種のペンギンのフリッパー長と体重

リクエスト

外れ値

想定

ペイロードサイズ

応答時間

ペイロードサイズと応答時間。外れ値は赤

{{total}} 件中 {{slow}} 件のリクエストが想定の 2 倍以上かかりました。

測定値

涼しい夜間

生育適温域

暑い午後

すべて表示

温度

相対湿度

生育適温域

温室センサーの温度と湿度の測定値

表示範囲：{{t0}} – {{t1}}、湿度 {{h0}} – {{h1}} · 表示中の測定値：{{points}}

領域を選ぶか、Ctrl / ⌘ + ホイールでズームしてください

エンジニアリング

営業

サポート

勤続年数

評価スコア（1–5）

全社平均

部署別の社員 90 名の勤続年数と評価スコア

{{id}} · {{department}} · {{tenure}} · スコア {{score}} · 年収 {{salary}}

点をクリックすると社員を選択し、空いたプロット領域をクリックすると選択を解除します

選手

リーグ平均

効率の良いスコアラー

試投数の多いシューター

1 試合平均 {{value}} 得点

使用率：{{value}}

TS%：{{value}}

使用率

TS%（真のシュート成功率）

選手 16 人の使用率とシュート効率。点の大きさは 1 試合平均得点

正常

アラーム

最新

{{value}} mm/s

一時停止

再開

最新サンプル：{{rpm}} rpm、{{value}} · 画面上のアラーム：{{alarms}}

回転数（rpm）

振動

アラーム閾値

モーターの回転数に対する振動のライブデータ

哺乳類

トガリネズミ

マウス

ラット

ウサギ

ネコ

イヌ

ヒト

ブタ

ウマ

ウシ

キリン

ゾウ

べき乗則の近似

{{value}} kg

{{value}} W

体重

基礎代謝率

代謝率 ∝ 体重^{{exponent}}（クライバーの法則）

哺乳類 12 種の基礎代謝率と体重（両対数軸）

## ScatterChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ScatterChart"
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
    "name": "locale",
    "typeText": "string | undefined",
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
    "typeText": "readonly ChartSeries[]",
    "required": true
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
