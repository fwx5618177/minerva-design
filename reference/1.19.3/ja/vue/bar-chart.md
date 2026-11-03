# 棒グラフ

横に並べるか積み上げた棒グラフ。折れ線を重ねることもできます。

Package: minerva-design@1.19.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

第{{n}}四半期

完了したチケット

四半期ごとに完了したサポートチケット

注文

7 日平均

日

日別の注文数と 7 日平均

2025 年と 2026 年の四半期売上

推奨者

中立者

批判者

北米

ヨーロッパ

アジア太平洋

中南米

中東

地域別の推奨者・中立者・批判者の割合

Web

モバイルアプリ

パートナー

チャネル別の月間注文数（積み上げ）

販売数

四半期ごとの販売数

{{quarter}}：{{units}} 個

棒をタップしてください

積み上げ

グループ化

チャネル別・月別の注文数

ロンドン

東京

パリ

ロンドン、東京、パリの月平均降水量

純損益

月別の純損益。利益はゼロの上、損失は下

販売数

国別のオンライン販売数（多い順）

新規顧客

第{{n}}週

週間目標

週ごとの新規顧客数と週間目標の比較

{{total}} 週中 {{reached}} 週で目標を達成（{{rate}}）。

売上

{{month}}：{{value}}

四半期に戻る

四半期をクリックすると月別に表示します。

{{quarter}}：合計 {{value}}。月をクリックすると売上を表示します。

2026 年の四半期別売上。四半期をクリックすると月別に表示します

2026 年 {{quarter}} の月別売上

エンジニアリング

プロダクト

デザイン

営業

マーケティング

サポート

前年

今年

増減

前年と比較

部門別の採用数（今年と前年）

成功

ロールバック

変更凍結

8 週間の日別本番デプロイ数（成功とロールバック）

稼働日あたり {{perDay}} 回のデプロイ、変更失敗率 {{failure}}。

オフピーク

通常

ピーク

充電

日平均

充電時間

{{energy}} kWh・{{duration}}

{{start}}〜{{end}} に充電すると {{cost}}。{{plugIn}} の接続直後に充電するより {{saving}} 安くなります。

MWh あたりの価格

明日の各時間の前日市場電力価格。電気自動車の充電に最も安い時間帯を強調表示

## BarChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "BarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Writes the value above every bar (default `false`)",
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
  },
  {
    "name": "orientation",
    "type": "ChartOrientation",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side and the values along the bottom (default `vertical`)",
    "typeText": "ChartOrientation"
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

## Example: grouped

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/vue/grouped.vue

```vue
<script setup lang="ts">
// Series are grouped side by side; `labels` writes the value of every bar.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.lastYear, data: [38, 52, 61, 45] },
  { name: text.value.thisYear, data: [44, 58, 72, 49] },
]);
</script>

<template>
  <BarChart
    :series="series"
    labels
    :x-axis="{ type: 'category', categories: text.regions }"
    :height="280"
  />
</template>

```

## Example: stacked

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/vue/stacked.vue

```vue
<script setup lang="ts">
// `stacked` piles the bars of each category (a series can still set its
// own `type`, e.g. a line).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const series = computed(() => [
  { name: text.value.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
  { name: text.value.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
  { name: text.value.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
]);
</script>

<template>
  <BarChart
    :series="series"
    stacked
    :x-axis="{ type: 'category', categories: text.days }"
    :height="280"
  />
</template>

```
