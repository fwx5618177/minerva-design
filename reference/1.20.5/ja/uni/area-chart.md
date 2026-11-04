# 面グラフ

時間とともに変化する量を塗りつぶした面で表します。既定でなめらかな曲線になり、重ねて表示するほか、合計として積み上げたり 100% の構成比として表示したりできます。ホバーすると同じ x の全系列を読み取れ、Ctrl / ⌘ + ホイールやピンチでズームできます。

Package: minerva-design@1.20.5

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

デイリーアクティブユーザー

2026 年 4 月〜6 月のデイリーアクティブユーザー

その他

2016〜2026 年のベンダー別市場シェア

自然検索

ダイレクト

参照元サイト

ソーシャル

流入元別の月間訪問数（積み上げ）

稼働中のインスタンス

上限

1 日にオートスケーラーが起動したインスタンス数

原子力

水力

風力

太陽光

ガス

{{value}} GW

出力

1 日の電源別発電量（積み上げ）

実績

計画

年間の売上累計と計画の比較

ダウンロード

アップロード

2 時間のサーバー帯域幅。ダウンロードはゼロの上、アップロードは下

太陽光発電量

{{value}} kWh

2026 年の屋根置き太陽光発電の日次発電量

ズームをリセット

{{from}} – {{to}}：合計 {{total}}、1 日平均 {{average}}

Ctrl / ⌘ + ホイールまたはピンチで季節を拡大し、ドラッグで移動します。

エンジニアリング

営業

カスタマーサポート

オペレーション

財務・人事

2025〜2026 年の部門別の月次人数

選択した月の人数

従業員 {{value}} 人

昨年

今年

ブラックフライデー

サイバーマンデー

最終発送日

11 月と 12 月の日次注文数（今年と昨年の比較）

今シーズンの注文は {{total}} 件、前年比 {{change}}。

使用量

傾向

{{value}} GB

容量 {{value}}

ボリューム

データベース

ログ

ユーザーのアップロード

約 {{days}}後（{{date}} ごろ）に満杯

今後 {{days}}は満杯になりません

60 日間のディスク使用量と容量までの傾向

## AreaChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "AreaChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "stacked",
    "typeText": "boolean | undefined",
    "required": false
  },
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
    "name": "percent",
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
  },
  {
    "name": "curve",
    "typeText": "\"step\" | \"linear\" | \"smooth\" | undefined",
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
