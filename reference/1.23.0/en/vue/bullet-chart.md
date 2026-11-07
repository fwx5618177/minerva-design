# Bullet chart

Compact KPI bars (Stephen Few): each row shows a measure as a bar over qualitative ranges (shades of gray, the poorest darkest) with a marker at its target, on the row's own scale. Rows can mix units, so dashboards fit many KPIs in little space. Hover a row or use the arrow keys to read its value, target and range.

Package: minerva-design@1.23.0

Renderer: vue

Locale: en

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

Revenue

thousands of US$

Profit

% of revenue

Avg. order size

US$

New customers

count

Satisfaction

out of 5

Poor

Fair

Good

Breach

At risk

Healthy

Quarter-to-date sales KPIs against their targets

Checkout

Search

Mobile

Platform

Growth

Data

Story points delivered by each team against its commitment

Availability

% of requests

Apdex

score, 0–1

Throughput

requests / s

Error budget

% remaining

Service level objectives of the API this month

Visitors

thousands

Sign-ups

accounts

Activation

% of sign-ups

MRR

thousands of US$

Month

Growth KPIs of the selected month against their targets

Enterprise customer onboarding completed within the first 30 days

% of new accounts

Priority support tickets answered within one business hour

% of tickets

Production deployments rolled out without a customer-facing incident

% of deployments

Net revenue retention of annual subscription contracts

ratio

Operational KPIs with long names against their targets

Marketing

Engineering

Sales

People

Facilities

Travel

Yearly budget: {{budget}}

Comfortable

Tight

Over plan

{{over}} departments spend faster than planned. Click a row to see its variance.

{{department}} is over plan: {{variance}} by the end of Q3, {{share}} of the yearly budget spent, {{left}} left.

{{department}} is within plan: {{variance}} by the end of Q3, {{share}} of the yearly budget spent, {{left}} left.

Department spending at the end of Q3 against the budget planned by then

Inlet temperature

Humidity

Power draw

Fan speed

°C

% relative

kW per rack

% of max speed

Normal

Warning

Critical

Live readings

Server room sensor readings against their setpoints and thresholds

Needs attention: {{sensors}}

All sensors are within their limits.

Weekly distance

Long run

Elevation gain

Sessions

Sleep

plan: {{plan}}

Under plan

On plan

Above plan

Runner

Amara

Lucas

Mei

{{value}} for a plan of {{plan}} ({{share}})

Weekly training of {{runner}} against the plan

{{runner}} met {{met}} of {{metrics}} weekly targets.

Engineering

Sales

Support

Marketing

Product

Finance

{{plan}} planned this year

Behind

Catching up

On track

Sort

Plan order

Most behind first

Most ahead first

Hires of each team against the yearly headcount plan

{{hired}} of {{planned}} planned hires ({{share}}) across {{teams}} teams shown.

No team shown.

## BulletChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "BulletChart"
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
    "description": "Tick labels of the scales, when there is room (default `true`)",
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
    "name": "hidden",
    "type": "readonly number[]",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap nodes, by\nindex. Makes the visibility controlled: legend clicks then only emit\n`toggle`, whose `hiddenIndexes` should be stored and passed back.",
    "typeText": "readonly number[]"
  },
  {
    "name": "orientation",
    "type": "\"vertical\" | \"horizontal\"",
    "required": false,
    "description": "Horizontal rows or vertical columns (default `horizontal`)",
    "typeText": "\"vertical\" | \"horizontal\""
  },
  {
    "name": "texts",
    "type": "Partial<ShapeChartLabels>",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")",
    "typeText": "Partial<ShapeChartLabels>"
  },
  {
    "name": "barSize",
    "type": "number",
    "required": false,
    "description": "Thickness of the value bar as a fraction of the ranges' thickness (default 0.4)",
    "typeText": "number"
  },
  {
    "name": "targetColor",
    "type": "string",
    "required": false,
    "description": "Color of the target markers (default: the text color)",
    "typeText": "string"
  },
  {
    "name": "data",
    "type": "readonly BulletDatum[]",
    "required": true,
    "description": "Rows (columns when vertical): name, value, target, ranges and scale",
    "typeText": "readonly BulletDatum[]"
  },
  {
    "name": "ranges",
    "type": "readonly number[]",
    "required": false,
    "description": "Qualitative ranges of the rows without `ranges`: upper bounds, ascending",
    "typeText": "readonly number[]"
  },
  {
    "name": "rangeLabels",
    "type": "readonly string[]",
    "required": false,
    "description": "Names of the qualitative ranges, lowest first (tooltip)",
    "typeText": "readonly string[]"
  },
  {
    "name": "rangeColors",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the qualitative ranges, lowest first; shades of gray by default",
    "typeText": "readonly string[]"
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

## Example: kpis

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/vue/kpis.vue

```vue
<script setup lang="ts">
// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by `range-labels` in the tooltip).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BulletChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() =>
  KPIS.map(([value, target, ranges], i) => ({
    name: text.value.kpis[i],
    value,
    target,
    ranges,
  })),
);
</script>

<template>
  <BulletChart :data="data" :range-labels="text.ranges" />
</template>

```

## Example: vertical

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/vue/vertical.vue

```vue
<script setup lang="ts">
// `orientation="vertical"`: columns sharing the ranges of the component
// (`ranges`), the targets in the danger color.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { BulletChart } from "minerva-design/vue/charts";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

const { language } = useI18n();
const data = computed(() =>
  (QUARTERS[language.value] ?? QUARTERS.en).map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  })),
);
</script>

<template>
  <BulletChart
    :data="data"
    orientation="vertical"
    :ranges="[60, 90, 120]"
    target-color="var(--danger-color, #dc2626)"
  />
</template>

```
