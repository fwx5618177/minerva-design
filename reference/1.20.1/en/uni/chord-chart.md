# Chord diagram

Flows between groups placed around a circle: each group is an arc sized by its flows, each flow a ribbon between two arcs. Undirected, a ribbon joins a pair of groups and is as wide as the flows between them in both directions (a symmetric matrix counts each relation once), so a group that only receives flows keeps its arc; directed, every direction has its own ribbon with an arrowhead. Hover a group to highlight its ribbons, hover a ribbon to read both directions; the legend hides / shows groups and the arrow keys walk through groups then ribbons.

Package: minerva-design@1.20.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Design

Engineering

Product

Marketing

Messages exchanged between four teams in a week

North America

Latin America

Europe

Africa

West Asia

South Asia

East Asia

Oceania

{{value}}M people

Migration flows between world regions over five years

app

router

store

ui-kit

api-client

auth

i18n

utils

Imports between the modules of a codebase

United States

China

European Union

Mexico

Canada

Japan

South Korea

Goods trade between major economies in a year

Home

Search

Category

Product

Cart

Checkout

{{value}}k visits

Hover a page or a ribbon

{{source}} → {{target}}: {{value}} (the other way: {{reverse}})

{{name}}: {{value}} in and out

Navigation between the pages of a shop app in a day

US East

US West

EU Central

Asia Pacific SE

Asia Pacific NE

South America

{{value}} Gbit/s

Replication traffic between data centers

Labels

Auto

Tangential

Radial

None

Group order

Data order

Largest first

Smallest first

Ribbon color

Gradient

Source

Target

Neutral

Directed

Ticks

Other operators

Year

{{year}}

{{name}} {{value}}

{{name}} won the most subscribers ({{value}} net). Net change: {{list}}.

Subscribers switching mobile operator in {{year}}

Physics

Chemistry

Biology

Medicine

Computer science

Mathematics

Economics

Engineering

Click a faculty to focus on its collaborations, or a ribbon to see a pair

{{name}}: {{total}} co-authored papers, mostly with {{partners}}

{{name}} ({{value}})

{{a}} and {{b}}: {{value}} co-authored papers

Clear

Papers co-authored by the faculties of a university over five years

Coffee

Milk

Bread

Pastries

Fruit

Cereal

Yogurt

Juice

{{a}} + {{b}}

Bought together in {{value}} baskets ({{share}} of all baskets)

{{value}} pairings with other categories

Product categories bought together in the same basket over a month

Gateway

Users

Orders

Inventory

Payments

Notifications

{{value}} calls/s

Total: {{total}}. Busiest: {{from}} → {{to}} ({{value}})

Pause

Resume

Live calls per second between microservices

London

Paris

Frankfurt

Istanbul

Dubai

Singapore

Tokyo

New York

{{value}}M passengers

Show all hubs

Eastern hubs

Western hubs

Show at least two hubs to see the routes between them

{{shown}} of {{total}} hubs shown: {{routes}} routes, {{passengers}} a year

Yearly passengers between major airport hubs

## ChordChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: group arcs and ribbons, legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ChordChart"
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
    "name": "ticks",
    "typeText": "number | boolean | undefined",
    "required": false
  },
  {
    "name": "directed",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "arrows",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
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
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
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
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false
  },
  {
    "name": "sortGroups",
    "typeText": "\"none\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "sortSubgroups",
    "typeText": "\"none\" | \"auto\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "ribbonColor",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "required": false
  },
  {
    "name": "ribbonOpacity",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "arcWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "tickFormat",
    "typeText": "((value: number) => string) | undefined",
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
