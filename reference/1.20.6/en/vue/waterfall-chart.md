# Waterfall chart

How a series of increases and decreases takes a value from a start to an end, with subtotals and totals: P&L bridges, cash flow, variances. Thin dashed connectors join every bar to the next one.

Package: minerva-design@1.20.6

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

Revenue

Cost of sales

Gross profit

R&D

Marketing

G&A

Operating income

Interest

Tax

Net income

Amount

Income statement from revenue to net income

Opening

Closing

Net cash flow

Monthly net cash flows from the opening to the closing balance

Budget

Actual

Volume

Price

Product mix

Exchange rates

Raw materials

Savings

Variance

Drivers of the variance between the budgeted and the actual margin

Start of year

End of year

Hires

Transfers in

Resignations

Transfers out

Retirements

People

Headcount changes over the year

Opening ARR

New business

Expansion

Contraction

Churn

Closing ARR

ARR

Quarter

Q{{n}}

{{quarter}}: net new ARR {{net}} · net revenue retention {{nrr}}

ARR bridge of {{quarter}}

List price

Dealer discount

Promotions

Invoice price

Payment terms

Freight

Volume rebates

Pocket price

Price per unit

Click a bar to compare it with the list price

{{step}}: {{value}}, {{share}} of the list price

Price waterfall from the list price to the pocket price

2019 baseline

Business growth

Energy efficiency

Renewable power

Electric fleet

Refrigerants

Acquisition

2025

2030 target

{{value}} kt CO₂e

Emissions

Change: {{value}}

From {{from}} to {{to}}

{{value}} above the 2030 target

Emissions bridge from the 2019 baseline to 2025

Order entry

Credit check

Picking

Quality check

Waiting for carrier

Transit

Customs

Lead time

Duration

Work

Waiting

work takes {{work}} of the {{total}} ({{share}})

Lead time of an order by stage

Earlier

Now

Balance

Customer payment

Supplier invoice

Payroll

Card fees

Refund

Latest: {{time}} · {{kind}} {{amount}}

Pause

Resume

Cash position of the day, updated live

Committed

Added

Removed

Re-estimated

Carried over

Completed

Story points

Orientation

Vertical

Horizontal

Labels

Connectors

Sprint scope from committed to completed story points

## WaterfallChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "WaterfallChart"
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
    "default": "true",
    "required": false,
    "description": "Writes the change (or the total) at the end of every bar",
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
    "name": "connector",
    "type": "boolean | ChartConnectorOptions",
    "required": false,
    "description": "Thin lines from the end of every bar to the next one; an object styles them (default `true`: dashed, secondary text color)",
    "typeText": "boolean | ChartConnectorOptions"
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
    "name": "start",
    "type": "number",
    "required": false,
    "description": "Value the first change starts from (default 0)",
    "typeText": "number"
  },
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "Name of the series (tooltip; default \"Change\")",
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
    "name": "format",
    "type": "((value: number) => string)",
    "required": false,
    "description": "Formats the values (labels, tooltip)",
    "typeText": "((value: number) => string)"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of the increases (the success color by default)",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of the decreases (the danger color by default)",
    "typeText": "string"
  },
  {
    "name": "totalColor",
    "type": "string",
    "required": false,
    "description": "Color of the totals and subtotals (the primary color by default)",
    "typeText": "string"
  },
  {
    "name": "steps",
    "type": "readonly WaterfallStep[]",
    "required": true,
    "description": "Changes, subtotals and totals, in order",
    "typeText": "readonly WaterfallStep[]"
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

## Example: cash-flow

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/cash-flow.vue

```vue
<script setup lang="ts">
// Monthly cash flows from an opening balance: rows instead of
// columns (`orientation="horizontal"`), values in the tooltip only.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const TEXT = {
  en: { opening: "Opening", closing: "Closing" },
  zh: { opening: "期初", closing: "期末" },
  ja: { opening: "期首", closing: "期末" },
  fr: { opening: "Ouverture", closing: "Clôture" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const FLOWS = [18, -12, 25, -30, 14, 9];

const { language } = useI18n();
const steps = computed(() => {
  const text = TEXT[language.value] ?? TEXT.en;
  const months = MONTHS[language.value] ?? MONTHS.en;
  return [
    { label: text.opening, value: 120 },
    ...FLOWS.map((value, i) => ({ label: months[i], value })),
    { label: text.closing, kind: "total" as const },
  ];
});
</script>

<template>
  <WaterfallChart
    :steps="steps"
    :labels="false"
    orientation="horizontal"
    :height="360"
  />
</template>

```

## Example: pnl

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/waterfall-chart/vue/pnl.vue

```vue
<script setup lang="ts">
// A profit and loss bridge: changes float from the running total,
// `subtotal` / `total` steps start from zero; the values are written on the bars.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { WaterfallChart } from "minerva-design/vue/charts";

const STEPS = {
  en: [
    "Revenue",
    "Cost of sales",
    "Gross profit",
    "Operating costs",
    "Other income",
    "Taxes",
    "Net income",
  ],
  zh: [
    "营业收入",
    "销售成本",
    "毛利润",
    "运营费用",
    "其他收入",
    "税费",
    "净利润",
  ],
  ja: [
    "売上高",
    "売上原価",
    "売上総利益",
    "営業費用",
    "その他収益",
    "税金",
    "純利益",
  ],
  fr: [
    "Chiffre d’affaires",
    "Coût des ventes",
    "Marge brute",
    "Charges d’exploitation",
    "Autres produits",
    "Impôts",
    "Résultat net",
  ],
};

const { language } = useI18n();
const steps = computed(() => {
  const label = STEPS[language.value] ?? STEPS.en;
  return [
    { label: label[0], value: 420 },
    { label: label[1], value: -180 },
    { label: label[2], kind: "subtotal" as const },
    { label: label[3], value: -130 },
    { label: label[4], value: 25 },
    { label: label[5], value: -34 },
    { label: label[6], kind: "total" as const },
  ];
});
const format = (value: number) => `${value} k€`;
</script>

<template>
  <WaterfallChart :steps="steps" :format="format" :height="320" />
</template>

```
