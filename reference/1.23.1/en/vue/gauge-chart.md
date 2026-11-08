# Gauge

A single value on an arc, against a range and optional colored thresholds: KPIs, usage, scores. Changing value animates the arc (and the needle) from its current position.

Package: minerva-design@1.23.1

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

CPU

Memory

Disk

{{metric}} usage

Net Promoter Score

Requests / s

Requests per second, updated live

Pause updates

Resume updates

Speed

Speedometer: {{speed}}

Brake

Accelerate

Storage

API calls

Seats

Build minutes

{{used}} of {{limit}}

{{quota}}: {{share}} of the quota used

Availability, 30 days

Objective: {{value}}

Availability over 30 days against the objective

Error budget left

{{used}} of downtime out of {{budget}} allowed

Error budget left this month

Temperature unit

°C

°F

target

Room: {{value}}

Thermostat target temperature

Lower the target temperature

Raise the target temperature

Heating to {{target}} (room: {{room}})

Cooling to {{target}} (room: {{room}})

Holding {{target}} (room: {{room}})

Applicant

credit score

Poor

Fair

Good

Very good

Exceptional

{{share}} of the way up the scale

Credit score of {{name}}

{{name}}: {{score}}. {{advice}}

Most lenders will decline the application.

Approval is possible, at a higher rate.

Eligible for most loans at standard rates.

Eligible for better than average rates.

Eligible for the best rates on offer.

charged

Range: {{range}}

Battery charge of the car

Plugged in

Reset

Fully charged

Unplugged

Fast charging

Slow charging above 80 %

80 % in {{minutes}}

{{value}} rpm

{{value}} MW

Dark panel

Rotor speed

Power output

Nacelle temperature

{{reading}} of the wind turbine: {{value}}

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
