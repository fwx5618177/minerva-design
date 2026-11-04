# Combination chart

Bars, lines and areas in one chart, on one or two value axes: revenue and growth, rainfall and temperature, Pareto charts.

Package: minerva-design@1.21.0

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Q{{n}} {{year}}

Revenue

Growth (YoY)

Quarterly revenue with its year-over-year growth

Rainfall

Temperature

Monthly rainfall and temperature in Tokyo

Sessions

Conversion rate

Campaign

Daily sessions and conversion rate over two months

Returns

Cumulative share

Wrong size

Damaged

Not as described

Arrived late

Changed mind

Wrong item

Other

Returns by cause with their cumulative share

Page views

Chinese (zh-CN)

French (fr-FR)

Daily page views and conversion rate, {{locale}}

Revenue

Users

Users (log scale)

Yearly revenue and users on a logarithmic axis, 2016 to 2025

{{value}} kWh

Solar production

Consumption

Battery charge

Night

{{value}} battery

Self-sufficiency {{share}} over two days, {{imported}} bought from the grid.

Energy per hour

Hourly solar production and consumption of a house over two days, with the state of charge of its battery

Stock level

Deliveries

Promotion

Safety stock

Reorder point

Click a day or a delivery.

{{id}}: {{quantity}} units ordered on {{ordered}}, delivered on {{arrived}} after {{lead}}.

{{units}} units in stock on {{date}}.

Only {{units}} units in stock on {{date}}, under the safety stock.

Units

Daily stock level of an item over three months, with deliveries, the reorder point and the safety stock

Requests

Error rate

Releases

Requests per 30 min

Requests and error rate of a web API over a day, with its releases

The error rate peaked at {{peak}} at {{time}} after {{version}}, until the rollback to {{rollback}}.

{{value}} pts

Start

Remaining work

Completed

Ideal

+{{value}} added

Ideal: {{value}} left

{{value}} left

{{value}} done that day

{{value}} behind the ideal

{{value}} ahead of the ideal

Story points

Sprint burndown: remaining work, points completed each day and the ideal burn over ten working days

{{left}} left at {{velocity}} a day: about {{forecast}} will not be done by the end of the sprint.

{{left}} left at {{velocity}} a day: the sprint is on track.

## MixedChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "MixedChart"
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
  },
  {
    "name": "stackMode",
    "type": "\"percent\" | \"normal\"",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x (default `normal`)",
    "typeText": "\"percent\" | \"normal\""
  },
  {
    "name": "yAxis2",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"`; its range is aligned on the left ticks (vertical charts)",
    "typeText": "ChartAxisOptions"
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

## Example: climate

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/vue/climate.vue

```vue
<script setup lang="ts">
// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { MixedChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    {
      name: text.rain,
      type: "bar" as const,
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line" as const,
      curve: "smooth" as const,
      yAxis: "right" as const,
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
});
</script>

<template>
  <MixedChart
    :series="series"
    :x-axis="{ type: 'category' }"
    crosshair
    :height="300"
  />
</template>

```

## Example: revenue-growth

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/vue/revenue-growth.vue

```vue
<script setup lang="ts">
// Bars and a line on two value axes: the series with `yAxis: "right"` use
// `yAxis2` (its ticks are aligned on the left grid).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { MixedChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

const { language } = useI18n();
const series = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    {
      name: text.revenue,
      type: "bar" as const,
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line" as const,
      curve: "smooth" as const,
      yAxis: "right" as const,
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
});
const yAxis2 = { format: (value: number) => `${value} %` };
</script>

<template>
  <MixedChart
    :series="series"
    :x-axis="{ type: 'category' }"
    :y-axis2="yAxis2"
    :height="300"
  />
</template>

```
