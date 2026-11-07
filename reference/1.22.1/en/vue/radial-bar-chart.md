# Radial bar chart

Progress as concentric rings: activity rings, OKR completion, sales against quota. Each bar fills its ring up to its value over its max, on a tinted background track, with rounded ends; labels sit in the open part of the circle and a center text can sum things up. Hover a ring or use the arrow keys to read its value, max and progress.

Package: minerva-design@1.22.1

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Move

Exercise

Stand

Day of the week

rings closed

Activity rings of the selected day: move, exercise and stand against their goals

Activation rate

Week-4 retention

NPS above 50

p95 latency

Churn reduction

average completion

Completion of the quarter's key results

North

South

East

West

of quota

Quarterly sales of each region against its quota

CPU

Memory

Disk

Network

Shape

Three quarters

Full circle

Half circle

Rounded ends

Tracks

Server resource usage, in percent of capacity

Emergency fund

Summer holiday

New laptop

House deposit

Click a goal to see how long it will take.

{{goal}}: {{saved}} of {{target}} saved. {{remaining}} to go, about {{months}} months at {{monthly}} a month.

of all goals

Savings of each goal against its target

R. Silva

M. Kowalski

C. Okafor

L. Moreau

K. Tanaka

E. Jensen

Goals

Assists

Ranking

#{{rank}} {{name}}

{{stat}}: {{value}} in {{games}} games

{{ratio}} per game

League leaders of the season by {{stat}}

Leader: {{name}} ({{stat}}: {{value}})

Launch video

Event photos

Slides

Database backup

uploaded

Upload progress of each file

Restart

All files uploaded ({{size}}).

{{done}} of {{files}} files uploaded

I feel valued

My goals are clear

I can grow here

Work-life balance

My manager supports me

I'd recommend working here

Order

Survey order

Highest agreement first

Lowest agreement first

average agreement

{{agree}} of {{answered}} respondents agree ({{share}})

Share of employees who agree with each survey statement

## RadialBarChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "RadialBarChart"
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
    "name": "rounded",
    "type": "boolean",
    "required": false,
    "description": "Rounded bar ends (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "boolean",
    "required": false,
    "description": "Labels before the start of the bars (default: when `sweep` leaves room for them)",
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
    "name": "track",
    "type": "boolean",
    "required": false,
    "description": "Background tracks behind the bars (default `true`)",
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
    "name": "max",
    "type": "number",
    "required": false,
    "description": "Value of a full bar for the data without `max` (default: the largest value)",
    "typeText": "number"
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
    "name": "data",
    "type": "readonly RadialBarDatum[]",
    "required": true,
    "description": "Bars, from the outermost ring inward: a name, a value, an optional `max` and color",
    "typeText": "readonly RadialBarDatum[]"
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
    "name": "gap",
    "type": "number",
    "required": false,
    "description": "Gap between the rings, as a fraction of a ring's slot (default 0.28)",
    "typeText": "number"
  },
  {
    "name": "startAngle",
    "type": "number",
    "required": false,
    "description": "Angle where the bars start, degrees clockwise from 12 o'clock (default 0)",
    "typeText": "number"
  },
  {
    "name": "innerRadius",
    "type": "number",
    "required": false,
    "description": "Radius of the innermost ring's inner edge, as a fraction of the outer radius (default 0.3)",
    "typeText": "number"
  },
  {
    "name": "labelContent",
    "type": "readonly (\"percent\" | \"value\" | \"name\")[]",
    "required": false,
    "description": "What a label shows: name, value, percent of the bar's max (default `[\"name\", \"value\"]`)",
    "typeText": "readonly (\"percent\" | \"value\" | \"name\")[]"
  },
  {
    "name": "centerValue",
    "type": "string",
    "required": false,
    "description": "Big text in the center (e.g. the overall completion)",
    "typeText": "string"
  },
  {
    "name": "centerLabel",
    "type": "string",
    "required": false,
    "description": "Small text under `centerValue`",
    "typeText": "string"
  },
  {
    "name": "sweep",
    "type": "number",
    "required": false,
    "description": "Angle of a full bar, degrees; 360 = full rings (default 270)",
    "typeText": "number"
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

## Example: activity

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/vue/activity.vue

```vue
<script setup lang="ts">
// Activity rings: each bar has its own `max` (the goal), `sweep` 360 makes
// full rings and the center texts summarize them.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadialBarChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { rings: ["Move", "Exercise", "Stand"], today: "of today’s goals" },
  zh: { rings: ["活动", "锻炼", "站立"], today: "今日目标" },
  ja: { rings: ["ムーブ", "エクササイズ", "スタンド"], today: "今日の目標" },
  fr: {
    rings: ["Bouger", "M’entraîner", "Me lever"],
    today: "des objectifs du jour",
  },
};

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const data = computed(() => [
  { name: text.value.rings[0], value: 420, max: 500, color: "#ef4444" },
  { name: text.value.rings[1], value: 24, max: 30, color: "#22c55e" },
  { name: text.value.rings[2], value: 9, max: 12, color: "#06b6d4" },
]);
</script>

<template>
  <RadialBarChart
    :data="data"
    :sweep="360"
    :label-content="['name', 'percent']"
    center-value="78 %"
    :center-label="text.today"
  />
</template>

```

## Example: okr

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/radial-bar-chart/vue/okr.vue

```vue
<script setup lang="ts">
// Key results completion on one scale (`max` 100): the labels sit before
// the start of the bars, in the empty quarter left by the 270° sweep.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { RadialBarChart } from "minerva-design/vue/charts";

const OKR = {
  en: ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  zh: ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  ja: ["売上", "新規顧客", "継続率", "NPS", "採用"],
  fr: [
    "Chiffre d’affaires",
    "Nouveaux clients",
    "Rétention",
    "NPS",
    "Recrutement",
  ],
};

const DONE = [92, 74, 61, 48, 35];

const { language } = useI18n();
const data = computed(() =>
  (OKR[language.value] ?? OKR.en).map((name, i) => ({ name, value: DONE[i] })),
);
const format = (value: number) => `${value} %`;
</script>

<template>
  <RadialBarChart
    :data="data"
    :max="100"
    :inner-radius="0.2"
    :format="format"
  />
</template>

```
