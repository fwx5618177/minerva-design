# バブルチャート

3 つ目の値を点の大きさで表す散布図：バブルの面積が値に比例します。

Package: minerva-design@1.20.6

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

アジア

ヨーロッパ

アメリカ大陸

アフリカ

人口

1 人あたり GDP

平均寿命（年）

各国の 1 人あたり GDP、平均寿命、人口

製品

売上

クラウドストレージ

分析

モバイル SDK

決済

デスクトップアプリ

ハードウェア

コンサルティング

相対市場シェア

市場成長率

市場リーダー

高成長

製品の市場シェア、成長率、売上

見込み確定

提案

交渉

金額

案件 #{{id}}

パイプライン滞留日数

受注確率

{{deal}}（{{stage}}）：{{amount}}

バブルをクリックしてください

経過日数、受注確率、金額別の進行中案件

1 人あたり GDP（対数スケール）

高所得

対数スケールの 1 人あたり GDP と平均寿命、バブルの大きさは人口

表示中の所得：{{from}} – {{to}}

ズームすると表示範囲がドルで表示されます

インフラ

セキュリティ

人員

予算

エクスポージャー

停電

ハードウェアの納期遅延

ネットワーク切り替え

データ漏えい

アクセス権レビューの滞留

キーパーソンの退職

ベンダーのスキル不足

研修不足

ライセンス費用の上昇

為替変動

許容範囲

重大

発生可能性 {{likelihood}} × 影響度 {{impact}} = {{score}}

エクスポージャー: {{value}}

発生可能性

影響度

発生可能性、影響度、コストエクスポージャー別のプロジェクトリスク

検索

ソーシャル

動画

メール

予算

{{date}} 開始

開始日

広告費用対効果

損益分岐点

開始日、広告費用対効果、予算別のマーケティングキャンペーン

北部

南部

東部

西部

中部

両方のチャートで同じサイズスケールを使う

両方のチャートで {{value}} を最大のバブルで描きます。

各チャートが自身の最大売上を最大のバブルで描きます。

1 m² あたりの売上

利益率

{{year}} 年の店舗地域別の 1 m² あたり売上、利益率、売上高

再生

一時停止

もう一度再生

最初から

年: {{year}}

出生率（女性 1 人あたりの子どもの数）

1990 年から 2025 年までの国別の出生率、平均寿命、人口

## BubbleChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "BubbleChart"
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
    "name": "maxSize",
    "typeText": "number | undefined",
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
    "name": "minSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "maxValue",
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
