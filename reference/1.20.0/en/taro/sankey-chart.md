# Sankey diagram

Flows between stages: energy balances, user journeys, budget allocations. Nodes sit in columns, the thickness of a link is proportional to its flow, and the node order is relaxed to straighten the flows and avoid crossings. Hover a node to highlight all its flows, or a link to see it as a share of its source; the arrow keys walk through the nodes and links.

Package: minerva-design@1.20.0

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Shape charts drawn on a Canvas 2D node by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, entry / update animations, sunburst drill-down with onDrill, and a generic ShapeChart taking any shape type's options. No keyboard navigation and no React tooltip content: tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "nodes",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly SankeyNode[] | undefined",
    "typeRef": "type:abbae3a275f8cae80221",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended"
  },
  {
    "name": "links",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly SankeyLink[]",
    "typeRef": "type:9b7445fd57ca5be620e0",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
  },
  {
    "name": "nodeWidth",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Width of the node bars, in pixels"
  },
  {
    "name": "nodePadding",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels"
  },
  {
    "name": "align",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "enum",
    "values": [
      "center",
      "justify",
      "left",
      "right"
    ],
    "typeText": "\"left\" | \"right\" | \"center\" | \"justify\" | undefined",
    "typeRef": "type:0e2004db1f554c24a752",
    "default": "justify",
    "required": false,
    "description": "Column of the nodes without a `column`"
  },
  {
    "name": "iterations",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 32,
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings"
  },
  {
    "name": "linkColor",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "enum",
    "values": [
      "gradient",
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "typeRef": "type:f280eddf1871945519d6",
    "default": "gradient",
    "required": false,
    "description": "Color of the links without `color`"
  },
  {
    "name": "linkOpacity",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Opacity of the links, 0-1"
  },
  {
    "name": "labels",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Node labels (name and value); overlapping labels are skipped"
  },
  {
    "name": "labelValues",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the value after the name in the labels"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip drawn on the canvas (`render` may return its text); `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:b7ec984d2eb3ed678a80",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:9b7cae367bbdb6b10ac6",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "hidden",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations"
  },
  {
    "name": "padding",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates). Mini-programs have no `<html lang>`: pass the app language"
  },
  {
    "name": "texts",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "height",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart"
  },
  {
    "name": "id",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:348e97229a786720de93",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (tap, or the mouse on H5)"
  },
  {
    "name": "onClick",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:2f0a619712ca66b7ac75",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:5e77e83d29468fb39c06",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
