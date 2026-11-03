# ウォーターフォールチャート

一連の増減が値を始点から終点へ運ぶ様子を、小計と合計とともに示します：損益ブリッジ、キャッシュフロー、差異分析。細い破線が各棒を次の棒につなぎます。

Package: minerva-design@1.19.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Waterfall of changes, subtotals and totals (`steps`), colors, start, labels, locale, orientation; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/waterfall-chart/index",
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
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
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
    "name": "steps",
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
    "name": "upColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "downColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "totalColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "start",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "connector",
    "typeText": "unknown",
    "required": false,
    "default": null
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
