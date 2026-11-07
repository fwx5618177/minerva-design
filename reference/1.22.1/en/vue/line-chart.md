# Line chart

Lines or filled areas over numbers, dates or categories. Handles millions of points on the GPU.

Package: minerva-design@1.22.1

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

This week

Last week

Visitors per day, this week and last week

Storage used

Day

Storage used over 60 days

Lisbon

Oslo

Curve

Linear

Smooth

Step

Average monthly temperatures in Lisbon and Oslo

Compute

Storage

Network

Databases

Stack mode

Stacked

Monthly cloud spend by service, stacked

Page views

Sessions

Daily page views and sessions, first half of 2026

Sensor

One million sensor readings

{{points}} points · drawn with {{renderer}} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset

Visitors

Product launch

Outage

Daily visitors over 90 days with a product launch and an outage

Indoor

Outdoor

Hourly indoor and outdoor temperatures with missing readings

The sensors were offline for a few hours: the line stops instead of guessing.

Median

95th percentile

Critical

Target {{value}}

API latency over six hours, median and 95th percentile

Close

Period

1M

3M

6M

1Y

All

Daily closing price over two years

Steps

Steps per day

{{day}}: {{steps}} steps

Tap or scrub the line

CPU

Memory

{{hour}}h

CPU and memory usage over the day

Pinch to zoom, double tap to reset; tap the legend to hide a series.

Freezer temperature

Alarm above {{value}}

Pause

Resume

Alarm: door open?

Normal

Last reading {{value}} at {{time}}

Above the limit in the last minute: {{readings}}

Freezer temperature over the last minute, updated every second

Wild type

Mutant

With antibiotic

Exponential phase

Logarithmic scale

Time since inoculation

CFU / mL

Growth curves of three bacterial cultures over 24 hours

Straight segments mean a constant growth rate: the wild type doubles about every {{minutes}}.

On a linear scale the small cultures look flat: switch back to the logarithmic scale to compare them.

Portfolio value

Click a point to start a measurement, then a second one.

From {{date}} ({{value}}): click a second point.

{{from}} → {{to}}: {{change}} ({{percent}}) over {{days}}

Clear

Daily value of a portfolio in 2026; click two points to measure the change

Equities

Bonds

Gold

Real estate

Base 100

Performance of four asset classes rebased to 100, 2021 to 2026

{{value}} µg/m³

Delhi

Beijing

Paris

Mexico City

Tokyo

São Paulo

Daily mean of fine particles (PM2.5) in November; the dashed line is the WHO guideline of {{value}}.

{{days}}/{{total}} days above

Daily PM2.5 in {{city}} over 30 days

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
