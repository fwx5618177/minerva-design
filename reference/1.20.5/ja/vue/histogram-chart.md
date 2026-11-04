# ヒストグラム

生のサンプルを等幅のビンに分けた分布。数百から数百万の値まで扱えます。

Package: minerva-design@1.20.5

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

リクエスト数

100 万件のリクエストのレイテンシ分布と p50、p95、p99

ビン分けのルール

自動

Sturges

10 ビン

40 ビン

学生

得点

試験の得点分布

顧客

年齢

顧客の年齢分布

対照群

新しいオンボーディング

セッション時間（分）

A/B テストの 2 群のセッション時間

正規分布の当てはめ

下限規格

上限規格

基準値

工具調整済み

平均 {{mean}}、σ {{sd}}、Cpk {{cpk}}、公差外 {{ppm}} ppm:

工程能力あり

工程能力不足

部品

直径

規格限界と当てはめた正規曲線を含むシャフト直径の分布

送料無料

中央値 {{value}}

p99 {{value}}

注文の {{share}} が送料無料の基準 {{threshold}} に達しています。

注文

注文金額（対数スケール）

対数スケールでの注文金額の分布

一時停止

再開

リセット

{{share}} の電話に {{target}} 以内で応答、p90 は {{p90}}:

目標達成

目標未達

電話

待ち時間

目標

p90

直近 600 件のサポート電話の待ち時間のライブ分布

従業員の {{share}}

従業員 {{value}} 人（{{share}}）

クリックで累積割合を表示

棒をクリックすると、通勤時間がそれ以下の従業員の割合を表示します。

従業員の {{share}}（{{employees}} 人）の通勤時間は {{limit}} 以下です。

従業員

片道の通勤時間

従業員の通勤時間の分布

## HistogramChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "HistogramChart"
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
    "name": "nice",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Rounds the bin width to 1, 2 or 5 × 10^k and aligns the edges on it",
    "typeText": "boolean"
  },
  {
    "name": "color",
    "type": "string",
    "required": false,
    "description": "Bar color (any CSS color)",
    "typeText": "string"
  },
  {
    "name": "values",
    "type": "ArrayLike<number>",
    "required": true,
    "description": "Raw samples (typed arrays are counted without copies)",
    "typeText": "ArrayLike<number>"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
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
    "required": false,
    "description": "More series drawn over the bins (e.g. a density `line`)",
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
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the counts (legend, tooltip; default \"Count\")",
    "typeText": "string"
  },
  {
    "name": "bins",
    "type": "HistogramBinning",
    "required": false,
    "description": "Number of bins, or the rule choosing it: `auto`, `sturges`, `freedman-diaconis` (default `auto`)",
    "typeText": "HistogramBinning"
  },
  {
    "name": "domain",
    "type": "readonly [number, number]",
    "required": false,
    "description": "Range covered by the bins (values outside are not counted); the data range by default",
    "typeText": "readonly [number, number]"
  },
  {
    "name": "formatBin",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the edges of the bins in the tooltip",
    "typeText": "((value: number) => string)"
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

## Example: binning

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/vue/binning.vue

```vue
<script setup lang="ts">
// The same samples in fewer or more bins: `bins` takes a count or a rule
// (`sturges`, `freedman-diaconis`, `auto`); two groups appear with enough bins.
import { computed, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import { HistogramChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const bins = ref<number | "sturges">("sturges");
</script>

<template>
  <div style="display: grid; gap: 8px">
    <div style="display: flex; gap: 8px; align-items: center">
      <span>{{ text.bins }}</span>
      <button type="button" @click="bins = 'sturges'">Sturges</button>
      <button type="button" @click="bins = 10">10</button>
      <button type="button" @click="bins = 40">40</button>
    </div>
    <HistogramChart
      :values="AGES"
      :bins="bins"
      :name="text.count"
      :x-axis="{ title: text.age }"
      :height="280"
    />
  </div>
</template>

```

## Example: latency

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/vue/latency.vue

```vue
<script setup lang="ts">
// <HistogramChart> bins raw samples itself (`bins` "auto":
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { HistogramChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <HistogramChart
    :values="LATENCY"
    :name="text.requests"
    :x-axis="{ title: text.ms }"
    :height="300"
  />
</template>

```
