# 折れ線グラフ

数値、日付、カテゴリに対する折れ線または塗りつぶした面。GPU で数百万ポイントを扱えます。

Package: minerva-design@1.20.0

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

今週

先週

今週と先週の日別訪問者数

使用容量

日

60 日間のストレージ使用量

リスボン

オスロ

曲線

直線

なめらか

ステップ

リスボンとオスロの月平均気温

コンピューティング

ストレージ

ネットワーク

データベース

積み上げ方法

積み上げ

サービス別の月間クラウド費用（積み上げ）

ページビュー

セッション

2026 年上半期の日別ページビューとセッション

センサー

100 万件のセンサー測定値

{{points}} ポイント · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

訪問者

製品リリース

障害

製品リリースと障害を含む 90 日間の日別訪問者数

室内

屋外

欠損を含む 1 時間ごとの室内と屋外の気温

センサーが数時間オフラインでした。推測で埋めずに線を途切れさせています。

中央値

95 パーセンタイル

危険

目標 {{value}}

6 時間の API レイテンシ（中央値と 95 パーセンタイル）

終値

期間

1か月

3か月

6か月

1年

すべて

2 年間の日次終値

歩数

1 日の歩数

{{day}}：{{steps}} 歩

線をタップまたはなぞってください

CPU

メモリ

{{hour}}時

1 日の CPU とメモリの使用率

ピンチでズーム、ダブルタップでリセット。凡例をタップすると系列を非表示にできます。

冷凍庫の温度

{{value}} 超で警報

一時停止

再開

警報：扉が開いている？

正常

最新の値 {{value}}（{{time}}）

直近 1 分間の上限超過：{{readings}} 件

直近 1 分間の冷凍庫の温度（毎秒更新）

野生型

変異株

抗生物質あり

対数増殖期

対数スケール

接種後の経過時間

CFU / mL

3 種類の細菌培養の 24 時間の増殖曲線

直線部分は増殖率が一定であることを示します。野生型は約 {{minutes}} ごとに倍増します。

線形スケールでは菌数の少ない培養が平らに見えます。対数スケールに戻すと比較できます。

ポートフォリオ評価額

点をクリックして計測を開始し、続けて 2 点目をクリックします。

始点 {{date}}（{{value}}）：2 点目をクリックしてください。

{{from}} → {{to}}：{{change}}（{{percent}}）、期間 {{days}}

クリア

2026 年のポートフォリオの日次評価額。2 点をクリックすると変化を計測します

株式

債券

金

不動産

基準 = 100

100 を基準に指数化した 4 つの資産クラスのパフォーマンス（2021〜2026 年）

{{value}} µg/m³

デリー

北京

パリ

メキシコシティ

東京

サンパウロ

11 月の微小粒子状物質（PM2.5）の日平均値。破線は WHO の指針値 {{value}} です。

超過 {{days}}/{{total}} 日

{{city}} の 30 日間の日次 PM2.5

## LineChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "LineChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "stacked",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Stacks the series on top of each other (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "percent",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Scales the stacks to 100% (implies `stacked`; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "area",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Fills the area under the lines (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "curve",
    "type": "ChartCurve",
    "required": false,
    "description": "Shape of the lines: straight, smooth (monotone) or steps",
    "typeText": "ChartCurve"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
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
    "type": "readonly ChartSeries[]",
    "required": true,
    "description": "Data series (replace the array or a `data` array to update the chart)",
    "typeText": "readonly ChartSeries[]"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
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
    "type": "[event: ChartHoverEvent | null]",
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
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
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
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
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
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: reset-zoom

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/vue/reset-zoom.vue

```vue
<script setup lang="ts">
// Ctrl / ⌘ + wheel (or pinch) zooms, dragging pans; the template ref exposes
// resetZoom, getView, setView and the engine instance.
import { computed, ref } from "vue";
import { Button, useI18n } from "minerva-design/vue";
import { LineChart, type ChartHandle } from "minerva-design/vue/charts";

const TEXT = {
  en: { sensor: "Sensor", reset: "Reset zoom" },
  zh: { sensor: "传感器", reset: "重置缩放" },
  ja: { sensor: "センサー", reset: "ズームをリセット" },
  fr: { sensor: "Capteur", reset: "Réinitialiser le zoom" },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = Array.from({ length: 2000 }, (_, i) =>
  Math.round(50 + 30 * Math.sin(i / 40) + 10 * Math.sin(i / 7)),
);
const series = computed(() => [{ name: text.value.sensor, data }]);
const chart = ref<ChartHandle>();
</script>

<template>
  <div style="display: grid; gap: 8px; justify-items: start">
    <LineChart
      ref="chart"
      :series="series"
      crosshair
      :interaction="{ zoom: 'x' }"
      :height="260"
    />
    <Button variant="outline" size="small" @click="chart?.resetZoom()">{{
      text.reset
    }}</Button>
  </div>
</template>

```

## Example: trend

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/vue/trend.vue

```vue
<script setup lang="ts">
// The labels follow the language of the closest ConfigProvider.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { LineChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    thisWeek: "This week",
    lastWeek: "Last week",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    thisWeek: "本周",
    lastWeek: "上周",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    thisWeek: "今週",
    lastWeek: "先週",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    thisWeek: "Cette semaine",
    lastWeek: "Semaine dernière",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.thisWeek, data: [820, 932, 901, 934, 1290, 1330, 1320] },
  { name: text.value.lastWeek, data: [620, 732, 701, 834, 1090, 1130, 1020] },
]);
</script>

<template>
  <LineChart
    :series="series"
    curve="smooth"
    :x-axis="{ type: 'category', categories: text.days }"
    :height="280"
  />
</template>

```
