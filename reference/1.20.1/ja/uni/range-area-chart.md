# 範囲面グラフ

下端と上端の間を塗る帯：信頼区間、予測、最小・最大の範囲、パーセンタイルのファンチャートに。

Package: minerva-design@1.20.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

95% 区間

80% 区間

実績

予測

注文数

今日

月間注文数と 12 か月の予測、その信頼区間

最低 – 最高

平年値

1 年間の日ごとの最低・最高気温

5 – 95 パーセンタイル

25 – 75 パーセンタイル

中央値

1 日の応答時間のパーセンタイル

安値 – 高値

終値

6 か月間の日ごとの値幅と終値

予測値 ± {{k}}σ

実測値

異常

感度

{{k}}σ の帯

1 分あたりのリクエスト数

1 週間の 1 分あたり API リクエスト数。予測の帯とその外側の異常を表示

帯の外にある点はありません。

異常：{{n}} 件。最新は {{latest}}。

買値 – 売値

仲値

一時停止

再開

買値 {{bid}} ・ 売値 {{ask}}

スプレッド {{value}} bp

通貨ペアの直近 1 分間のリアルタイムの買値と売値、および仲値

低排出（SSP1-2.6）

低排出、可能性の高い範囲

非常に高い排出（SSP5-8.5）

非常に高い排出、可能性の高い範囲

観測値

{{value}} の上限

1850〜1900 年比の気温上昇

1950 年以降に観測された地球温暖化と、低排出および非常に高い排出シナリオでの 2100 年までの予測

低排出では中央値が {{low}} 年ごろに {{lowLimit}} を超え、{{peak}} で横ばいになります。非常に高い排出では {{high}} 年ごろに {{highLimit}} を超えます。

{{level}} 信頼区間

リフト

差なし

有意

信頼水準

テスト日数

A に対する B のコンバージョンリフト

28 日間のテストにおけるバリアント A に対するバリアント B の累積コンバージョンリフトと信頼区間

B は {{lift}} 上回っていますが、{{level}} 区間はまだゼロを含んでいます。

B のコンバージョンは {{lift}} 高く（{{level}} 区間で {{low}}〜{{high}}）、{{day}} 日目から有意です。

## RangeAreaChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RangeAreaChart"
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
