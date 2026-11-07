# Sankey diagram

Flows between stages: energy balances, user journeys, budget allocations. Nodes sit in columns, the thickness of a link is proportional to its flow, and the node order is relaxed to straighten the flows and avoid crossings. Hover a node to highlight all its flows, or a link to see it as a share of its source; the arrow keys walk through the nodes and links.

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

Solar

Wind

Hydro

Nuclear

Natural gas

Coal

Oil

Electricity

District heat

Refined fuels

Homes

Industry

Services

Transport

Losses

{{value}} TWh

Energy balance: primary sources, carriers and end uses, in terawatt-hours per year

Search ads

Organic search

Newsletter

Social media

Home page

Pricing page

Blog

Sign-up form

Left the site

Trial started

Abandoned

Paid plan

Trial expired

Sessions of a week, from the acquisition channel to the subscription

{{source}} → {{target}}: {{value}} sessions ({{share}}% of {{source}})

{{name}}: {{value}} sessions

Click a step or a path (or focus the chart and press Enter) to select it

Licenses

Subscriptions

Services

Grants

Annual budget

R&D

Sales & marketing

Operations

General & admin

Platform

Mobile apps

AI research

Campaigns

Sales team

Infrastructure

Customer support

Finance & legal

Offices

Annual budget: revenue streams, departments and programs

Email

Chat

Phone

Chatbot

Tier 1

Tier 2

Engineering

Solved

Refunded

Bug filed

Support tickets of a month, from the channel to the outcome

Node alignment

Justify

Left

Right

Center

Link color

Gradient

Source

Target

Neutral

Values in the labels

Cloud

Licenses

Hardware

Services

Revenue

Cost of revenue

Gross profit

R&D

Sales & marketing

General & admin

Operating income

Income tax

Net income

Quarterly income statement: revenue segments, costs and profit

Gross margin {{gross}} · operating margin {{operating}} · net margin {{net}}

Brazil

Colombia

Ethiopia

Vietnam

Hamburg roastery

Rotterdam roastery

North warehouse

Central warehouse

South warehouse

Cafés

Supermarkets

Online shop

{{value}} t

Coffee shipped in a month, from the origins through the roasteries and warehouses to the sales channels

Click a site to trace everything that goes through it, or a shipment to select it

{{name}}: {{inbound}} in from {{from}} sites, {{outbound}} out to {{to}} sites

{{source}} → {{target}}: {{value}} ({{share}} of what {{source}} ships)

Clear selection

Referrals

Job boards

Professional networks

Agencies

Campus

Applications

Rejected on résumé

Phone screen

Not selected after screen

Interviews

Not selected after interviews

Offers

Offer declined

Hired

Show drop-offs

Hiring funnel of a year, from the candidate source to the hire

{{applied}} applications, {{hired}} hires ({{rate}}). {{interview}} of the screened candidates reach the interviews and {{accepted}} of the offers are accepted.

Web app

iOS app

Android app

Partner API

API gateway

Auth

Catalog

Search

Checkout

2xx success

4xx client error

5xx server error

{{value}} req/s

Total: {{total}}.

Server errors: {{rate}}

Server errors: {{rate}}, checkout incident

Pause

Resume

Live API traffic, in requests per second, from the clients to the services and their status codes

PET bottles & trays

HDPE containers

PP pots & caps

LDPE films

Other polymers

Packaging on the market

Collected for recycling

Incinerated

Landfill

Leaked to nature

Recycled

Sorting rejects

New packaging

Lower-grade products

{{value}} Mt

{{share}} of {{source}}

{{share}} of all the packaging

Plastic packaging of a year in megatonnes: polymers, end-of-life routes and recycling

## SankeyChart

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "SankeyChart"
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
    "name": "labels",
    "type": "boolean",
    "required": false,
    "description": "Node labels (name and value; default `true`)",
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
    "name": "labelValues",
    "type": "boolean",
    "required": false,
    "description": "Shows the value after the name in the labels (default `true`)",
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
    "name": "links",
    "type": "readonly SankeyLink[]",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored",
    "typeText": "readonly SankeyLink[]"
  },
  {
    "name": "nodes",
    "type": "readonly SankeyNode[]",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended",
    "typeText": "readonly SankeyNode[]"
  },
  {
    "name": "align",
    "type": "\"left\" | \"right\" | \"center\" | \"justify\"",
    "required": false,
    "description": "Column of the nodes without a `column` (default `justify`)",
    "typeText": "\"left\" | \"right\" | \"center\" | \"justify\""
  },
  {
    "name": "nodeWidth",
    "type": "number",
    "required": false,
    "description": "Width of the node bars, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "nodePadding",
    "type": "number",
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (default 12)",
    "typeText": "number"
  },
  {
    "name": "iterations",
    "type": "number",
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings (default 32)",
    "typeText": "number"
  },
  {
    "name": "linkOpacity",
    "type": "number",
    "required": false,
    "description": "Opacity of the links, 0-1 (default 0.4)",
    "typeText": "number"
  },
  {
    "name": "linkColor",
    "type": "\"neutral\" | \"target\" | \"gradient\" | \"source\"",
    "required": false,
    "description": "Color of the links without `color` (default `gradient`)",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\""
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

## Example: energy

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/energy.vue

```vue
<script setup lang="ts">
// Energy flows from the sources to the uses through the grid: link
// thickness is the flow, colored from the source to the target.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const NODES = {
  en: [
    "Solar",
    "Wind",
    "Gas",
    "Grid",
    "Homes",
    "Industry",
    "Transport",
    "Losses",
  ],
  zh: ["太阳能", "风能", "天然气", "电网", "居民", "工业", "交通", "损耗"],
  ja: ["太陽光", "風力", "ガス", "送電網", "家庭", "産業", "運輸", "損失"],
  fr: [
    "Solaire",
    "Éolien",
    "Gaz",
    "Réseau",
    "Foyers",
    "Industrie",
    "Transports",
    "Pertes",
  ],
};

// source, target (node indexes), TWh
const LINKS = [
  [0, 3, 32],
  [1, 3, 48],
  [2, 3, 70],
  [3, 4, 52],
  [3, 5, 61],
  [3, 6, 22],
  [3, 7, 15],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (NODES[language.value] ?? NODES.en).map((name) => ({ name })),
);
const format = (value: number) => `${value} TWh`;
</script>

<template>
  <SankeyChart :nodes="nodes" :links="LINKS" :format="format" />
</template>

```

## Example: journey

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/vue/journey.vue

```vue
<script setup lang="ts">
// A user journey with drop-offs: `align="left"` keeps every step in its
// column, `link-color="source"` colors a flow like the page it leaves.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { SankeyChart } from "minerva-design/vue/charts";

const STEPS = {
  en: ["Home page", "Search", "Product page", "Cart", "Checkout", "Left"],
  zh: ["首页", "搜索", "商品页", "购物车", "结账", "离开"],
  ja: ["トップページ", "検索", "商品ページ", "カート", "購入手続き", "離脱"],
  fr: ["Accueil", "Recherche", "Fiche produit", "Panier", "Paiement", "Départ"],
};

// from, to (step indexes), visitors
const FLOWS = [
  [0, 1, 420],
  [0, 2, 310],
  [0, 5, 270],
  [1, 2, 330],
  [1, 5, 90],
  [2, 3, 380],
  [2, 5, 260],
  [3, 4, 240],
  [3, 5, 140],
].map(([source, target, value]) => ({ source, target, value }));

const { language } = useI18n();
const nodes = computed(() =>
  (STEPS[language.value] ?? STEPS.en).map((name, i) => ({
    name,
    ...(i === 5 ? { color: "var(--text-secondary-color, #9ca3af)" } : {}),
  })),
);
</script>

<template>
  <SankeyChart :nodes="nodes" :links="FLOWS" align="left" link-color="source" />
</template>

```
