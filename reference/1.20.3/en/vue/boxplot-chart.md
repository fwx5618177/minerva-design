# Box plot

Medians, quartiles, whiskers and outliers to compare distributions, from raw samples or computed statistics. Outliers are rings of the series color: hover one to read its value and group.

Package: minerva-design@1.20.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Gateway

Auth

Search

Checkout

Recommendations

Images

Response time

Max

Q3

Median

Q1

Min

Outliers

Distribution of the response time of each service

Yearly salary

Junior developer

Developer

Senior developer

Tech lead

Engineering manager

Distribution of the salaries per role

Weekdays

Weekends

Paris

Lyon

Marseille

Lille

Delivery time (hours)

Delivery times per city on weekdays and weekends

Daily high

Mean

Distribution of the daily high temperatures per month

Lint

Unit tests

Integration

End-to-end

Release

Whisker reach

1.5 × IQR

3 × IQR

Min – max

Outlier shape

Hollow

Filled

{{value}} runs drawn as outliers

Build time

Distribution of the build durations of each CI pipeline

Click a box or an outlier.

{{day}}: a patient waited {{value}}.

{{day}}: median wait {{median}}, half of the patients waited between {{q1}} and {{q3}}, {{outliers}} outliers.

Wait

Four-hour target

Distribution of the emergency room waits per day of the week

Style sheets

Scripts

Fonts

Images

Videos

Log scale

{{value}} files are over the budget of {{budget}}.

File size

Budget

Distribution of the file sizes of a website by type

US East

US West

EU West

Asia Pacific South

South America East

Pause

Resume

SLA at risk in {{regions}}

Every region is within the SLA

Latency

SLA

Live distribution of the request latency in each region

## BoxPlotChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "BoxPlotChart"
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
    "name": "name",
    "type": "string",
    "default": "\"Values\"",
    "required": false,
    "description": "Name of the series built from `groups`",
    "typeText": "string"
  },
  {
    "name": "groups",
    "type": "readonly BoxplotGroup[]",
    "required": false,
    "description": "Raw samples, one box each (an alternative to `series`)",
    "typeText": "readonly BoxplotGroup[]"
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
    "description": "Series of box plots: data points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers`",
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
  },
  {
    "name": "outlierSize",
    "type": "number",
    "required": false,
    "description": "Diameter of the outliers in CSS pixels (default 7)",
    "typeText": "number"
  },
  {
    "name": "whisker",
    "type": "number | \"minmax\"",
    "required": false,
    "description": "Reach of the whiskers in interquartile ranges beyond the box (Tukey: 1.5); `minmax` extends them to the extremes",
    "typeText": "number | \"minmax\""
  },
  {
    "name": "outlierShape",
    "type": "\"hollow\" | \"filled\"",
    "required": false,
    "description": "Outliers drawn as rings of the series color or as filled dots; series may set their own (default `hollow`)",
    "typeText": "\"hollow\" | \"filled\""
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

## Example: horizontal

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/vue/horizontal.vue

```vue
<script setup lang="ts">
// `orientation="horizontal"` lays the boxes out in rows; `whisker="minmax"`
// extends the whiskers to the extremes (no outliers).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BoxPlotChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const groups = computed(() =>
  text.value.classes.map((x, i) => ({ x, values: SCORES[i] })),
);
</script>

<template>
  <BoxPlotChart
    :groups="groups"
    :name="text.score"
    orientation="horizontal"
    whisker="minmax"
    :x-axis="{ type: 'category' }"
    :y-axis="{ min: 0, max: 100 }"
    :height="240"
  />
</template>

```

## Example: services

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/vue/services.vue

```vue
<script setup lang="ts">
// Raw samples per service (`groups`): the component computes the
// quartiles, Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BoxPlotChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const groups = computed(() =>
  text.value.services.map((x, i) => ({ x, values: SAMPLES[i] })),
);
</script>

<template>
  <BoxPlotChart
    :groups="groups"
    :name="text.time"
    :x-axis="{ type: 'category' }"
    :y-axis="{ title: text.time }"
    :height="300"
  />
</template>

```
