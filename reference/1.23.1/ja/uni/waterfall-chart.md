# ウォーターフォールチャート

一連の増減が値を始点から終点へ運ぶ様子を、小計と合計とともに示します：損益ブリッジ、キャッシュフロー、差異分析。細い破線が各棒を次の棒につなぎます。

Package: minerva-design@1.23.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

売上高

売上原価

売上総利益

研究開発費

マーケティング費

一般管理費

営業利益

受取利息

法人税等

純利益

金額

売上高から純利益までの損益計算書

期首

期末

純キャッシュフロー

期首残高から期末残高までの月ごとの純キャッシュフロー

予算

実績

数量

価格

製品構成

為替

原材料

コスト削減

差異

予算と実績の利益の差異要因

年初

年末

採用

社内異動（受入）

退職

社内異動（送出）

定年退職

人数

1 年間の人員の増減

期首 ARR

新規

アップセル

縮小

解約

期末 ARR

ARR

四半期

第{{n}}四半期

{{quarter}}：純新規 ARR {{net}} · 売上継続率 {{nrr}}

{{quarter}}の ARR ブリッジ

定価

販売店値引き

販促

請求価格

支払条件

運賃

数量リベート

実質手取り価格

単価

バーをクリックすると定価と比較します

{{step}}：{{value}}、定価の {{share}}

定価から実質手取り価格までの価格ウォーターフォール

2019 年基準

事業成長

省エネ

再生可能電力

EV 車両

冷媒

買収

2025 年

2030 年目標

{{value}} kt CO₂e

排出量

変化：{{value}}

{{from}} から {{to}}

2030 年目標を {{value}} 上回る

2019 年基準から 2025 年までの排出量ブリッジ

受注入力

与信審査

ピッキング

品質検査

運送業者待ち

輸送

通関

リードタイム

所要時間

作業

待ち

作業は {{total}} のうち {{work}}（{{share}}）

工程別の注文リードタイム

それ以前

現在

残高

顧客からの入金

仕入先への支払

給与

カード手数料

返金

最新：{{time}} · {{kind}} {{amount}}

一時停止

再開

当日の資金ポジション（ライブ更新）

コミット

追加

削除

再見積もり

持ち越し

完了

ストーリーポイント

向き

縦

横

ラベル

コネクタ

コミットから完了までのスプリントのストーリーポイント

## WaterfallChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "WaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
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
    "name": "connector",
    "typeText": "boolean | ChartConnectorOptions | undefined",
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
    "name": "start",
    "typeText": "number | undefined",
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
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
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
    "name": "steps",
    "typeText": "readonly WaterfallStep[]",
    "required": true
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
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
