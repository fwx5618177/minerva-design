# Histogram

The distribution of raw samples in bins of equal width, from a few hundred values to millions.

Package: minerva-design@1.20.4

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Requests

Distribution of one million request latencies with p50, p95 and p99

Binning rule

Auto

Sturges

10 bins

40 bins

Students

Score

Distribution of the exam scores

Customers

Age

Age distribution of the customers

Control

New onboarding

Session duration (minutes)

Session durations of the two groups of an A/B test

Normal fit

LSL

USL

Nominal

Tool adjusted

Mean {{mean}}, σ {{sd}}, Cpk {{cpk}}, {{ppm}} ppm out of tolerance:

capable

not capable

Parts

Diameter

Distribution of the shaft diameters with the specification limits and a fitted normal curve

Free shipping

Median {{value}}

p99 {{value}}

{{share}} of the orders reach the free shipping threshold of {{threshold}}.

Orders

Order value (log scale)

Distribution of the order values on a logarithmic scale

Pause

Resume

Reset

{{share}} of the calls answered within {{target}}, p90 {{p90}}:

target met

target missed

Calls

Wait time

Target

p90

Live distribution of the wait times of the last 600 support calls

{{share}} of the employees

{{value}} employees ({{share}})

Click for the cumulative share

Click a bar to see the share of employees with a shorter commute.

{{share}} of the employees ({{employees}}) commute {{limit}} or less.

Employees

One-way commute

Distribution of the commute times of the employees

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
