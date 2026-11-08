# Sankey diagram

Flows between stages: energy balances, user journeys, budget allocations. Nodes sit in columns, the thickness of a link is proportional to its flow, and the node order is relaxed to straighten the flows and avoid crossings. Hover a node to highlight all its flows, or a link to see it as a share of its source; the arrow keys walk through the nodes and links.

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labelValues",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "readonly SankeyNode[] | undefined",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"left\" | \"right\" | \"center\" | \"justify\" | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "links",
    "typeText": "readonly SankeyLink[]",
    "required": true
  },
  {
    "name": "nodeWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "nodePadding",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "iterations",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "linkColor",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "required": false
  },
  {
    "name": "linkOpacity",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
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
    "name": "hover",
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
    "name": "toggle",
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
