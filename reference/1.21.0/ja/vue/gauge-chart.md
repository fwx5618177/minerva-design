# ゲージ

1 つの値を範囲とともに円弧上に表示し、色付きのしきい値も設定できます：KPI、使用率、スコアなど。value を変えると、円弧（と針）が現在の位置からアニメーションします。

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

CPU

メモリ

ディスク

{{metric}}の使用率

ネットプロモータースコア

リクエスト / 秒

ライブ更新される毎秒リクエスト数

更新を一時停止

更新を再開

速度

スピードメーター：{{speed}}

ブレーキ

アクセル

ストレージ

API 呼び出し

シート

ビルド時間

{{used}} / {{limit}}

{{quota}}：クォータの {{share}} を使用

30 日間の可用性

目標：{{value}}

目標に対する 30 日間の可用性

残りのエラーバジェット

許容 {{budget}} のうち停止 {{used}}

今月の残りのエラーバジェット

温度の単位

°C

°F

目標

室温：{{value}}

サーモスタットの目標温度

目標温度を下げる

目標温度を上げる

{{target}} まで暖房中（室温：{{room}}）

{{target}} まで冷房中（室温：{{room}}）

{{target}} を維持（室温：{{room}}）

申請者

クレジットスコア

低い

やや低い

良好

とても良好

非常に優秀

範囲の {{share}} の位置

{{name}} のクレジットスコア

{{name}}：{{score}}。{{advice}}

ほとんどの金融機関で審査に通りません。

承認の可能性はありますが、金利は高めです。

ほとんどのローンを標準金利で利用できます。

平均より有利な金利を利用できます。

最も有利な金利を利用できます。

充電済み

航続距離：{{range}}

車のバッテリー残量

接続中

リセット

満充電

未接続

急速充電中

80 % 以上は低速充電中

80 % まであと{{minutes}}

{{value}} rpm

{{value}} MW

ダークパネル

ローター回転数

出力

ナセル温度

風力タービンの{{reading}}：{{value}}

## GaugeChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "GaugeChart"
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
    "name": "ticks",
    "type": "boolean",
    "required": false,
    "description": "Tick labels at the ends and at the band bounds (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "needle",
    "type": "boolean",
    "required": false,
    "description": "Draws a needle in addition to the value arc",
    "typeText": "boolean"
  },
  {
    "name": "color",
    "type": "string",
    "required": false,
    "description": "Color of the value arc when there are no bands (default: the first palette color)",
    "typeText": "string"
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
    "name": "max",
    "type": "number",
    "required": false,
    "description": "Value at the end of the arc (default 100)",
    "typeText": "number"
  },
  {
    "name": "min",
    "type": "number",
    "required": false,
    "description": "Value at the start of the arc (default 0)",
    "typeText": "number"
  },
  {
    "name": "value",
    "type": "number",
    "required": true,
    "description": "Value shown by the arc (clamped to `min` - `max` for the drawing)",
    "typeText": "number"
  },
  {
    "name": "label",
    "type": "string",
    "required": false,
    "description": "Caption under the value",
    "typeText": "string"
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
    "name": "thickness",
    "type": "number",
    "required": false,
    "description": "Thickness of the arc as a fraction of the radius (default 0.16)",
    "typeText": "number"
  },
  {
    "name": "sweep",
    "type": "number",
    "required": false,
    "description": "Total angle of the arc, degrees (default 240)",
    "typeText": "number"
  },
  {
    "name": "bands",
    "type": "readonly GaugeBand[]",
    "required": false,
    "description": "Colored ranges of the track; the value arc takes the color of its band",
    "typeText": "readonly GaugeBand[]"
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

## Example: bands

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/vue/bands.vue

```vue
<script setup lang="ts">
// Colored bands split the track; the value arc takes the color of its band.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GaugeChart } from "minerva-design/vue/charts";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

const bands = [
  { to: 60, color: "var(--success-color, #16a34a)" },
  { to: 85, color: "var(--warning-color, #f59e0b)" },
  { to: 100, color: "var(--danger-color, #dc2626)" },
];
const { language } = useI18n();
const label = computed(() => TEXT[language.value] ?? TEXT.en);
const format = (value: number) => `${value}%`;
</script>

<template>
  <GaugeChart :value="72" :label="label" :bands="bands" :format="format" />
</template>

```

## Example: needle

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/vue/needle.vue

```vue
<script setup lang="ts">
// `needle` adds a pointer to the arc; `min` / `max` set the scale, `sweep`
// and `thickness` the shape of the arc.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GaugeChart } from "minerva-design/vue/charts";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

const { language } = useI18n();
const label = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <GaugeChart
    :value="128"
    :max="200"
    :label="label"
    needle
    :sweep="270"
    :thickness="0.1"
    :height="260"
  />
</template>

```
