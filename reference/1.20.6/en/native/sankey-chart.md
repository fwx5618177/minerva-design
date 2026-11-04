# Sankey diagram

Flows between stages: energy balances, user journeys, budget allocations. Nodes sit in columns, the thickness of a link is proportional to its flow, and the node order is relaxed to straighten the flows and avoid crossings. Hover a node to highlight all its flows, or a link to see it as a share of its source; the arrow keys walk through the nodes and links.

Package: minerva-design@1.20.6

Renderer: native

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly SankeyNode[] | undefined",
    "typeRef": "type:abbae3a275f8cae80221",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended"
  },
  {
    "name": "links",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly SankeyLink[]",
    "typeRef": "type:9b7445fd57ca5be620e0",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
  },
  {
    "name": "nodeWidth",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Width of the node bars, in pixels"
  },
  {
    "name": "nodePadding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
  },
  {
    "name": "align",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "center",
      "justify",
      "left",
      "right"
    ],
    "typeText": "\"right\" | \"left\" | \"center\" | \"justify\" | undefined",
    "typeRef": "type:2d132ecb25497b49ed29",
    "default": "justify",
    "required": false,
    "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
  },
  {
    "name": "iterations",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 32,
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings"
  },
  {
    "name": "linkColor",
    "source": "packages/native/src/components/ShapeChart/types.ts",
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
    "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "linkOpacity",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Opacity of the links, 0-1 (pressed flows are more opaque)"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Node labels (name and value); overlapping labels are skipped"
  },
  {
    "name": "labelValues",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the value after the name in the labels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
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
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
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
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
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

## API

```json
{
  "native:SankeyChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of SankeyChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "nodes",
        "type": "readonly SankeyNode[]",
        "required": false,
        "description": "Nodes, in their initial order; nodes only named by a link are appended"
      },
      {
        "name": "links",
        "type": "readonly SankeyLink[]",
        "required": true,
        "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
      },
      {
        "name": "nodeWidth",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Width of the node bars, in pixels"
      },
      {
        "name": "nodePadding",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
      },
      {
        "name": "align",
        "type": "\"justify\" | \"left\" | \"right\" | \"center\"",
        "required": false,
        "default": "\"justify\"",
        "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
      },
      {
        "name": "iterations",
        "type": "number",
        "required": false,
        "default": "32",
        "description": "Relaxation passes that straighten the flows and reduce crossings"
      },
      {
        "name": "linkColor",
        "type": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
        "required": false,
        "default": "\"gradient\"",
        "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
      },
      {
        "name": "linkOpacity",
        "type": "number",
        "required": false,
        "default": "0.4",
        "description": "Opacity of the links, 0-1 (pressed flows are more opaque)"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Node labels (name and value); overlapping labels are skipped"
      },
      {
        "name": "labelValues",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the value after the name in the labels"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/sankey-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  SankeyChart,
  useTheme,
  type SankeyLink,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Yearly budget of a software company, in millions of dollars: revenue
// streams, then the departments it is split between
const ALLOCATIONS: [string, string, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const money = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([source, target, value]) => ({
        source: t(`data.budget.${source}`),
        target: t(`data.budget.${target}`),
        value: value * 1e6,
      })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <SankeyChart
        links={links}
        nodeWidth={10}
        labelValues={false}
        format={(value) => money.format(value)}
        onClick={setSelected}
        height={320}
        ariaLabel={t("data.budgetAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? selected.source && selected.target
            ? `${selected.source} → ${selected.target}: ${money.format(selected.value)}`
            : `${selected.name}: ${money.format(selected.value)}`
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}

```
