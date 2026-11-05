# レーダーチャート

尺度の異なる複数の指標で、1 つまたは少数の対象を比較します（スキル評価、製品レビュー、風味のプロファイルなど）。多角形にホバーすると、その多角形と最も近い指標がハイライトされます。矢印キーで系列と指標の間を移動し、Esc で解除します。凡例の項目をクリックすると系列を非表示にできます。

Package: minerva-design@1.21.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "type": "boolean",
    "required": false,
    "description": "Entry and update animations, skipped when the user prefers reduced motion (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ShapeLegendOptions",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage or series (shown by default for pie, donut, funnel and multi-series radar charts)",
    "typeText": "boolean | ShapeLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ShapeTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it (default `true`)",
    "typeText": "boolean | ShapeTooltipOptions"
  },
  {
    "name": "dots",
    "type": "boolean",
    "required": false,
    "description": "Dots on the vertices (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D (default `auto`, see `setDefaultChartRenderer`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "series",
    "type": "readonly RadarSeries[]",
    "required": true,
    "description": "Polygons `{ name, values }`: one value per indicator",
    "typeText": "readonly RadarSeries[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the drawing, in pixels (default 8 on every side)",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart (default: the chart type, e.g. \"Donut chart\")",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip rows, accessible names, compact numbers); the page language by default",
    "typeText": "string"
  },
  {
    "name": "shape",
    "type": "\"circle\" | \"polygon\"",
    "required": false,
    "description": "Grid shape (default `polygon`)",
    "typeText": "\"circle\" | \"polygon\""
  },
  {
    "name": "hidden",
    "type": "readonly number[]",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap nodes, by\nindex. Makes the visibility controlled: legend clicks then only emit\n`toggle`, whose `hiddenIndexes` should be stored and passed back.",
    "typeText": "readonly number[]"
  },
  {
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values of the labels and the tooltip (default: compact numbers, 1.2k, 3.4M)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "percentFormat",
    "type": "((share: number) => string)",
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1 (default: one decimal, \"40.0%\")",
    "typeText": "((share: number) => string)"
  },
  {
    "name": "levels",
    "type": "number",
    "required": false,
    "description": "Number of grid rings (default 4)",
    "typeText": "number"
  },
  {
    "name": "indicators",
    "type": "readonly RadarIndicator[]",
    "required": true,
    "description": "Axes of the chart `{ name, max }`, clockwise from 12 o'clock",
    "typeText": "readonly RadarIndicator[]"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "type": "[event: ShapeHoverEvent | null]",
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
    "name": "click",
    "type": "[event: ShapeHoverEvent]",
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
    "name": "toggle",
    "type": "[event: ShapeToggleEvent]",
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

## Example: circle

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/vue/circle.vue

```vue
<script setup lang="ts">
// `shape="circle"` draws round grid rings, `levels` sets how many.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    profile: "Profile",
    skills: ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"],
  },
  zh: {
    profile: "能力画像",
    skills: ["前端", "后端", "设计", "测试", "运维", "数据"],
  },
  ja: {
    profile: "プロフィール",
    skills: [
      "フロントエンド",
      "バックエンド",
      "デザイン",
      "テスト",
      "DevOps",
      "データ",
    ],
  },
  fr: {
    profile: "Profil",
    skills: ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const indicators = computed(() =>
  text.value.skills.map((name) => ({ name, max: 10 })),
);
const series = computed(() => [
  { name: text.value.profile, values: [9, 6, 7, 8, 5, 6] },
]);
</script>

<template>
  <RadarChart
    :indicators="indicators"
    :series="series"
    shape="circle"
    :levels="5"
    :height="320"
  />
</template>

```

## Example: compare

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/vue/compare.vue

```vue
<script setup lang="ts">
// One polygon per series, one value per indicator (axes clockwise from 12
// o'clock); the legend hides / shows a series.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    current: "Current model",
    next: "Next model",
    axes: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
  },
  zh: {
    current: "当前型号",
    next: "新型号",
    axes: ["速度", "可靠性", "舒适性", "安全性", "能效"],
  },
  ja: {
    current: "現行モデル",
    next: "次期モデル",
    axes: ["速度", "信頼性", "快適性", "安全性", "効率"],
  },
  fr: {
    current: "Modèle actuel",
    next: "Nouveau modèle",
    axes: ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const indicators = computed(() =>
  text.value.axes.map((name) => ({ name, max: 100 })),
);
const series = computed(() => [
  { name: text.value.current, values: [72, 85, 64, 90, 58] },
  { name: text.value.next, values: [88, 80, 78, 92, 81] },
]);
</script>

<template>
  <RadarChart :indicators="indicators" :series="series" :height="320" />
</template>

```
