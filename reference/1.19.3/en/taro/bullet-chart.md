# Bullet chart

Compact KPI bars (Stephen Few): each row shows a measure as a bar over qualitative ranges (shades of gray, the poorest darkest) with a marker at its target, on the row's own scale. Rows can mix units, so dashboards fit many KPIs in little space. Hover a row or use the arrow keys to read its value, target and range.

Package: minerva-design@1.19.3

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Revenue

thousands of US$

Profit

% of revenue

Avg. order size

US$

New customers

count

Satisfaction

out of 5

Poor

Fair

Good

Breach

At risk

Healthy

Quarter-to-date sales KPIs against their targets

Checkout

Search

Mobile

Platform

Growth

Data

Story points delivered by each team against its commitment

Availability

% of requests

Apdex

score, 0–1

Throughput

requests / s

Error budget

% remaining

Service level objectives of the API this month

Visitors

thousands

Sign-ups

accounts

Activation

% of sign-ups

MRR

thousands of US$

Month

Growth KPIs of the selected month against their targets

Enterprise customer onboarding completed within the first 30 days

% of new accounts

Priority support tickets answered within one business hour

% of tickets

Production deployments rolled out without a customer-facing incident

% of deployments

Net revenue retention of annual subscription contracts

ratio

Operational KPIs with long names against their targets

Marketing

Engineering

Sales

People

Facilities

Travel

Yearly budget: {{budget}}

Comfortable

Tight

Over plan

{{over}} departments spend faster than planned. Click a row to see its variance.

{{department}} is over plan: {{variance}} by the end of Q3, {{share}} of the yearly budget spent, {{left}} left.

{{department}} is within plan: {{variance}} by the end of Q3, {{share}} of the yearly budget spent, {{left}} left.

Department spending at the end of Q3 against the budget planned by then

Inlet temperature

Humidity

Power draw

Fan speed

°C

% relative

kW per rack

% of max speed

Normal

Warning

Critical

Live readings

Server room sensor readings against their setpoints and thresholds

Needs attention: {{sensors}}

All sensors are within their limits.

Weekly distance

Long run

Elevation gain

Sessions

Sleep

plan: {{plan}}

Under plan

On plan

Above plan

Runner

Amara

Lucas

Mei

{{value}} for a plan of {{plan}} ({{share}})

Weekly training of {{runner}} against the plan

{{runner}} met {{met}} of {{metrics}} weekly targets.

Engineering

Sales

Support

Marketing

Product

Finance

{{plan}} planned this year

Behind

Catching up

On track

Sort

Plan order

Most behind first

Most ahead first

Hires of each team against the yearly headcount plan

{{hired}} of {{planned}} planned hires ({{share}}) across {{teams}} teams shown.

No team shown.

## BulletChart

Support: beta

Shape charts drawn on a Canvas 2D node by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, entry / update animations, sunburst drill-down with onDrill, and a generic ShapeChart taking any shape type's options. No keyboard navigation and no React tooltip content: tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "BulletChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly BulletDatum[]",
    "typeRef": "type:b946a1d988b0a77b92fd",
    "required": true,
    "description": "Rows (columns when vertical): name, value, target, ranges and scale"
  },
  {
    "name": "orientation",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "typeRef": "type:4e4ac2a46972f482e8a6",
    "default": "horizontal",
    "required": false,
    "description": "Horizontal rows or vertical columns"
  },
  {
    "name": "ranges",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:2efc21c063c671bd9177",
    "required": false,
    "description": "Qualitative ranges of the rows without `ranges`: upper bounds, ascending"
  },
  {
    "name": "rangeLabels",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false,
    "description": "Names of the qualitative ranges, lowest first (tooltip)"
  },
  {
    "name": "rangeColors",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false,
    "description": "Colors of the qualitative ranges, lowest first; shades of gray by default"
  },
  {
    "name": "barSize",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Thickness of the value bar as a fraction of the ranges' thickness"
  },
  {
    "name": "targetColor",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the target markers"
  },
  {
    "name": "ticks",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Tick labels of the scales (when there is room)"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
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
    "typeRef": "type:2efc21c063c671bd9177",
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
