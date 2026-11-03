# Horizontal bar chart

Bars growing from the left with the categories down the side: rankings, long names, diverging surveys and progress.

Package: minerva-design@1.19.3

Renderer: uni

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HorizontalBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "stacked",
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
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "percent",
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
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
