# Horizontal bar chart

Bars growing from the left with the categories down the side: rankings, long names, diverging surveys and progress.

Package: minerva-design@1.22.2

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Developers

Share of developers using each programming language

I see a career path here

My workload is manageable

I have the tools I need

My manager supports me

I am paid fairly

Strongly disagree

Disagree

Agree

Strongly agree

Employee survey answers, disagreement on the left and agreement on the right

Done

In review

To do

Platform

Payments

Mobile

Growth

Design

Status of the milestone issues of each team

Votes

Dark mode for every page and email

Offline mode on mobile devices

Export reports as PDF with charts

Single sign-on with SAML and OIDC

Two-way calendar synchronization

Edit many records at once

Custom fields on every object

Votes of the most requested features

Budget

Actual

Engineering

Marketing

Sales

Support

Finance

Budget and actual spend per department

Change

North America

Europe

Asia Pacific

Latin America

Middle East

Africa

Change of the monthly active users per region

Users

Messages

Photos

Maps

Music

Notes

Monthly active users per app

{{app}}: {{users}} M users

Tap a bar

Revenue

Units sold

Wireless headphones

Smartwatch

Bluetooth speaker

Mechanical keyboard

Fast charger

HD webcam

Wireless mouse

Tablet

USB-C cable

Laptop stand

Rank by

Rows shown

Top {{n}}

All products

Best-selling products of last month, from highest to lowest

These {{n}} products make {{share}} of the total.

{{value}} GW

Solar capacity

Play

Pause

Play again

Back to the start

Countries with the most installed solar capacity at the end of {{year}}

Salary band

Junior

Intermediate

Senior

Staff

Principal

Director

Offer

Minimum

Midpoint

Maximum

Offer / midpoint

Offer −{{step}}

Offer +{{step}}

An offer of {{offer}} fits the {{levels}} bands.

An offer of {{offer}} is outside every band.

Yearly salary band of each job level, with the offer as a vertical line

Error budget left

Release freeze

Error budget left to each service over the last 30 days, worst first

SLO {{slo}}, measured availability {{availability}}

{{minutes}} of downtime left out of {{allowed}}.

Budget overspent by {{minutes}}.

Click a service to see its budget.

## HorizontalBarChart

Support: beta

Chart whose untyped series are bars from the left (categories down the left side), `stacked` / `percent`, value `labels`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/horizontal-bar-chart/index",
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
    "default": 320
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
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
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
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
