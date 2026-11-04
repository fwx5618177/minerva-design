# Bar chart

Bars grouped side by side or stacked, with optional line overlays.

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

Q{{n}}

Tickets closed

Support tickets closed per quarter

Orders

7-day average

Day

Daily orders with their 7-day average

Quarterly revenue, 2025 and 2026

Promoters

Passives

Detractors

North America

Europe

Asia Pacific

Latin America

Middle East

Share of promoters, passives and detractors by region

Web

Mobile app

Partners

Monthly orders by channel, stacked

Sales

Sales per quarter

{{quarter}}: {{units}} units

Tap a bar

Stacked

Grouped

Orders per channel and month

London

Tokyo

Paris

Average monthly rainfall in London, Tokyo and Paris

Net result

Monthly net result, profits above zero and losses below

Units sold

Online sales by country, from highest to lowest

New customers

W{{n}}

Weekly target

New customers per week against the weekly target

Target reached {{reached}} weeks out of {{total}} ({{rate}}).

Revenue

{{month}}: {{value}}

Back to quarters

Click a quarter to see its months.

{{quarter}}: {{value}} in total. Click a month for its revenue.

Revenue per quarter in 2026; click a quarter to see its months

Revenue per month in {{quarter}} 2026

Engineering

Product

Design

Sales

Marketing

Support

Last year

This year

Change

Compare with last year

Hires per department, this year and last year

Successful

Rolled back

Change freeze

Production deployments per day over eight weeks, successful and rolled back

{{perDay}} deployments per working day, change failure rate {{failure}}.

Off-peak

Standard

Peak

Charge

Daily average

Charging time

{{energy}} kWh · {{duration}}

Charge from {{start}} to {{end}} for {{cost}}, {{saving}} less than right after plugging in at {{plugIn}}.

Price per MWh

Day-ahead electricity price for each hour of tomorrow, with the cheapest hours to charge an electric car highlighted

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
