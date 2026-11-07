# Funnel chart

Stages of a process that lose volume along the way (sign-ups, sales pipeline, checkout), with the conversion rate from each stage to the next. Hover or use the arrow keys to highlight a stage; click a legend item to hide it.

Package: minerva-design@1.22.3

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Pricing page

Started sign-up

Verified email

Created project

Invited teammate

Upgraded to paid

{{users}} users

{{share}} of the visitors

{{users}} dropped since “{{stage}}”

Sign-up funnel

Alerts

Dashboards

Integrations

Reports

Public API

Sort order

Descending

Ascending

Data order

{{users}} weekly users

Weekly active users per feature

Visits

Product page

Added to cart

Checkout

Payment

Order placed

Stage

Visitors

Drop-off

{{share}} of the first stage

Checkout funnel of an online shop

Drop-off between the stages

Applied

Screened

Technical interview

On-site interview

Offer

Hired

{{candidates}} candidates

Typical time in this stage: {{days}}

Hiring pipeline of an engineering role

{{stage}}: {{candidates}} candidates ({{share}} of the applicants)

{{rate}} of the applicants are hired, after {{days}} on average

Desktop

Mobile

{{rate}} conversion

Checkout funnel on {{device}}

Impressions

Clicks

Leads

Qualified leads

Customers

All channels

Search ads

Social media

Email

Partners

Channel

{{share}} of the previous stage

Cost per result: {{cost}}

Marketing funnel of this month: {{channel}}

Spend: {{spend}} · Customers: {{customers}} · Acquisition cost: {{cac}} per customer

Visits

Added to cart

Checkout

Paid orders

Monthly checkout funnel computed from the conversion rates

{{from}} → {{to}}

Lower the conversion of {{step}}

Raise the conversion of {{step}}

Reset to today's rates

{{orders}} orders ({{ordersDelta}}) · {{revenue}} revenue ({{revenueDelta}}) per month

Visitors

Viewed the deal

Added to cart

Checkout

Orders

Flash sale funnel, updated live

Pause

Resume

Restart

{{time}} · {{orders}} orders · {{rate}} of the visitors

The sale is over: {{orders}} orders.

Lead

Qualified

Demo

Proposal

Negotiation

{{deals}} deals · {{amount}}

Win probability: {{share}}

Open deals by pipeline stage, by amount

{{stage}}: {{deals}} open deals

Weighted forecast: {{amount}}

Click a stage to list its deals.

## FunnelChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "FunnelChart"
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
    "name": "conversion",
    "type": "boolean",
    "required": false,
    "description": "Shows the conversion rate from the previous stage (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "sort",
    "type": "\"none\" | \"ascending\" | \"descending\"",
    "required": false,
    "description": "Order of the stages (default `none`: the data order)",
    "typeText": "\"none\" | \"ascending\" | \"descending\""
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
    "name": "shape",
    "type": "\"bar\" | \"trapezoid\"",
    "required": false,
    "description": "Shape of the stages: trapezoids narrowing to the next stage, or centered bars (default `trapezoid`)",
    "typeText": "\"bar\" | \"trapezoid\""
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
    "type": "readonly ShapeDatum[]",
    "required": true,
    "description": "Stages: a name, a value and an optional color",
    "typeText": "readonly ShapeDatum[]"
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
    "description": "Vertical gap between the stages, in pixels (default 4)",
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

## Example: bars

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/vue/bars.vue

```vue
<script setup lang="ts">
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

const { language } = useI18n();
const data = computed(() =>
  [180, 940, 42, 410, 31].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <FunnelChart :data="data" shape="bar" sort="descending" :height="300" />
</template>

```

## Example: conversion

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/vue/conversion.vue

```vue
<script setup lang="ts">
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { FunnelChart } from "minerva-design/vue/charts";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

const { language } = useI18n();
const data = computed(() =>
  [12000, 4800, 2100, 860].map((value, i) => ({
    name: (TEXT[language.value] ?? TEXT.en)[i],
    value,
  })),
);
</script>

<template>
  <FunnelChart :data="data" :height="300" />
</template>

```
