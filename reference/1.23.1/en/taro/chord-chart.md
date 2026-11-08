# Chord diagram

Flows between groups placed around a circle: each group is an arc sized by its flows, each flow a ribbon between two arcs. Undirected, a ribbon joins a pair of groups and is as wide as the flows between them in both directions (a symmetric matrix counts each relation once), so a group that only receives flows keeps its arc; directed, every direction has its own ribbon with an arrowhead. Hover a group to highlight its ribbons, hover a ribbon to read both directions; the legend hides / shows groups and the arrow keys walk through groups then ribbons.

Package: minerva-design@1.23.1

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Shape charts drawn on a Canvas 2D node by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, entry / update animations, sunburst drill-down with onDrill, and a generic ShapeChart taking any shape type's options. No keyboard navigation and no React tooltip content: tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "groups",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "typeRef": "type:a2dc79840661498eae07",
    "required": false,
    "description": "Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended. With `matrix`, unnamed rows are numbered from 1."
  },
  {
    "name": "matrix",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly (readonly number[])[] | undefined",
    "typeRef": "type:14cda7081cd30af85dad",
    "required": false,
    "description": "Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent)"
  },
  {
    "name": "links",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly ChordLink[] | undefined",
    "typeRef": "type:2c67592f3a0996019a5b",
    "required": false,
    "description": "Flows as a list (by group name or index); takes precedence over `matrix`"
  },
  {
    "name": "directed",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "`false`: one ribbon per pair of groups, as wide as the flows between them in both directions (a symmetric matrix counts each relation once), arcs sized by the ribbons of the group. `true`: one ribbon per direction (same width at both ends), arcs sized by the outgoing plus the incoming flows; flows from a group to itself are ignored."
  },
  {
    "name": "arrows",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Arrowheads at the target end of the ribbons"
  },
  {
    "name": "padAngle",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Gap between the groups, in degrees"
  },
  {
    "name": "startAngle",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first group, degrees clockwise from 12 o'clock"
  },
  {
    "name": "sortGroups",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "enum",
    "values": [
      "ascending",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"descending\" | \"ascending\" | undefined",
    "typeRef": "type:154ca89219e5412440c1",
    "required": false,
    "description": "Order of the groups around the circle"
  },
  {
    "name": "sortSubgroups",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "enum",
    "values": [
      "ascending",
      "auto",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"auto\" | \"descending\" | \"ascending\" | undefined",
    "typeRef": "type:4e1e010f0af7a29736cb",
    "default": "auto",
    "required": false,
    "description": "Order of the ribbon ends along an arc: `auto` minimizes the crossings; otherwise the order of the groups, or by value"
  },
  {
    "name": "ribbonColor",
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
    "description": "Color of the ribbons without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "ribbonOpacity",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.65,
    "required": false,
    "description": "Opacity of the ribbons, 0-1 (highlighted ribbons are more opaque)"
  },
  {
    "name": "arcWidth",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Thickness of the group arcs, in pixels"
  },
  {
    "name": "ticks",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "number | boolean | undefined",
    "typeRef": "type:11d9d08024b0b84c460e",
    "required": false,
    "description": "Value ticks outside the arcs (labelled where there is room); a number sets the step between ticks"
  },
  {
    "name": "tickFormat",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:0ed66f8404442b5bd3aa",
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
    "description": "Formats the tick labels"
  },
  {
    "name": "labels",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "enum",
    "values": [
      "auto",
      "none",
      "radial",
      "tangential"
    ],
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
    "typeRef": "type:450a54e2e59f3bb532d3",
    "default": "auto",
    "required": false,
    "description": "Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks tangential when every name fits; colliding labels are shortened or skipped"
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
