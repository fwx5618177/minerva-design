# スパークライン

軸も凡例もない、文字ほどの大きさの小さなチャート。KPI カードや表のセル、リストの中で数値の横に推移の形を示します。ホバーすると値を読み取れます。

Package: minerva-design@1.22.2

Renderer: uni

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

注文

週ごとの注文、{{variant}}

売上

アクティブユーザー

登録数

p95 レイテンシ

{{metric}}（過去 30 日）

サービス

API ゲートウェイ

認証

検索

決済

通知

リクエスト / 分

p95 レイテンシ（30 日）

{{service}}の過去 30 日の p95 レイテンシ

本日

変化

サービスのレイテンシ

銘柄

アクメ・コーポレーション

ノヴァ・バイオテック

オービット・エアロスペース

カイト・ロボティクス

ルーマ・エナジー

{{symbol}} の本日の株価

株価

ウォッチリスト

過去 14 日間の訪問数：

訪問数

過去 14 日間の訪問数

7 日目のデプロイ後にエラーが急増し、その後元に戻りました：

エラー

過去 14 日間の日別エラー数

この 2 週間の午後の気温：

気温

過去 14 日間の午後の気温

CPU

{{server}} の CPU 使用率

アラート

正常

デイリーアクティブユーザー

最新: {{date}}

{{date}} · 9 月 1 日から {{change}}

9 月 1 日から 10 月 31 日までのデイリーアクティブユーザー

{{value}} 歩

目標の {{value}}

{{days}} 日中 {{reached}} 日で目標の {{goal}} 歩を達成

歩数

4 週間の 1 日あたりの歩数と 1 日の目標

レイキャビク

モントリオール

東京

カイロ

シンガポール

シドニー

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} の月ごとの平均最高気温

期間

7 日

30 日

90 日

後半と前半の比較

前の期間との比較

直近 {{period}} の 1 日あたりの売上

## Sparkline

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Sparkline"
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
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"bar\" | \"line\" | \"area\" | undefined",
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
    "name": "data",
    "typeText": "ChartSeriesData",
    "required": true
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"step\" | \"linear\" | \"smooth\" | undefined",
    "required": false
  },
  {
    "name": "reference",
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
