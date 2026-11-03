# Sankey diagram

Flows between stages: energy balances, user journeys, budget allocations. Nodes sit in columns, the thickness of a link is proportional to its flow, and the node order is relaxed to straighten the flows and avoid crossings. Hover a node to highlight all its flows, or a link to see it as a share of its source; the arrow keys walk through the nodes and links.

Package: minerva-design@1.20.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
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

Sankey diagram: nodes in columns and links with thickness proportional to the flow, alignment, link colors / opacity, labels. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/sankey-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "nodes",
    "typeText": "array",
    "required": false
  },
  {
    "name": "links",
    "typeText": "array",
    "required": false
  },
  {
    "name": "nodeWidth",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "nodePadding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "iterations",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "linkColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "linkOpacity",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labelValues",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
