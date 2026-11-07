# レーダーチャート

尺度の異なる複数の指標で、1 つまたは少数の対象を比較します（スキル評価、製品レビュー、風味のプロファイルなど）。多角形にホバーすると、その多角形と最も近い指標がハイライトされます。矢印キーで系列と指標の間を移動し、Esc で解除します。凡例の項目をクリックすると系列を非表示にできます。

Package: minerva-design@1.23.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

問題解決

コーディング

システム設計

コミュニケーション

協調性

当事者意識

候補者

{{value}} / {{max}}

候補者の面接評価シート

香り

酸味

甘み

コク

苦味

余韻

エチオピア イルガチェフェ

スマトラ マンデリン

2 種類のコーヒーの風味

性能

バッテリー

カメラ

ディスプレイ

コストパフォーマンス

質感

3 機種のスマートフォンのレビュースコア

多角形にホバーするか矢印キーで機種を比較します

スピード

シュート

パス

ドリブル

守備

フィジカル

2 人のサッカー選手の能力値

セキュリティ

連携

レポート

モバイル

自動化

サポート

価格

自社製品

主要競合

市場平均

比較する製品

自社製品、競合、市場平均の機能評価

たんぱく質

食物繊維

糖質

脂質

ナトリウム

カルシウム

フルーツ入りオートミール

卵のトースト

グラノーラ入りヨーグルト

基準量の {{value}}

{{meal}}：{{amount}}（{{share}}）

3 種類の朝食の栄養成分（1 日の基準量に対する割合）

CPU

メモリ

ディスク I/O

ネットワーク

レイテンシ

エラー

直近 1 時間の平均

現在

ライブ更新

アラート：{{metric}} が容量の {{threshold}} を超えています。

最も負荷の高い指標：{{metric}}。

サービスの現在の負荷と直近 1 時間の平均

コミュニケーション

成果の提供

専門性

協働

育成

主体性

チーム平均

対象者

{{name}} の 360 度評価とチーム平均

強み：{{strength}}（チーム比 {{strengthGap}}）。伸ばす点：{{growth}}（{{growthGap}}）。

売上

受注件数

成約率

平均案件規模

通話数

NPS

目標

実績

{{kpi}}：{{actual}}（目標 {{target}}、達成率 {{attainment}}）。

営業担当者の四半期 KPI と目標

軸の近くをクリックすると KPI を表示します。

## RadarChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
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
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "dots",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
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
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
