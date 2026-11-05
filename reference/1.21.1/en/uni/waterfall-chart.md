# Waterfall chart

How a series of increases and decreases takes a value from a start to an end, with subtotals and totals: P&L bridges, cash flow, variances. Thin dashed connectors join every bar to the next one.

Package: minerva-design@1.21.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Revenue

Cost of sales

Gross profit

R&D

Marketing

G&A

Operating income

Interest

Tax

Net income

Amount

Income statement from revenue to net income

Opening

Closing

Net cash flow

Monthly net cash flows from the opening to the closing balance

Budget

Actual

Volume

Price

Product mix

Exchange rates

Raw materials

Savings

Variance

Drivers of the variance between the budgeted and the actual margin

Start of year

End of year

Hires

Transfers in

Resignations

Transfers out

Retirements

People

Headcount changes over the year

Opening ARR

New business

Expansion

Contraction

Churn

Closing ARR

ARR

Quarter

Q{{n}}

{{quarter}}: net new ARR {{net}} · net revenue retention {{nrr}}

ARR bridge of {{quarter}}

List price

Dealer discount

Promotions

Invoice price

Payment terms

Freight

Volume rebates

Pocket price

Price per unit

Click a bar to compare it with the list price

{{step}}: {{value}}, {{share}} of the list price

Price waterfall from the list price to the pocket price

2019 baseline

Business growth

Energy efficiency

Renewable power

Electric fleet

Refrigerants

Acquisition

2025

2030 target

{{value}} kt CO₂e

Emissions

Change: {{value}}

From {{from}} to {{to}}

{{value}} above the 2030 target

Emissions bridge from the 2019 baseline to 2025

Order entry

Credit check

Picking

Quality check

Waiting for carrier

Transit

Customs

Lead time

Duration

Work

Waiting

work takes {{work}} of the {{total}} ({{share}})

Lead time of an order by stage

Earlier

Now

Balance

Customer payment

Supplier invoice

Payroll

Card fees

Refund

Latest: {{time}} · {{kind}} {{amount}}

Pause

Resume

Cash position of the day, updated live

Committed

Added

Removed

Re-estimated

Carried over

Completed

Story points

Orientation

Vertical

Horizontal

Labels

Connectors

Sprint scope from committed to completed story points

## WaterfallChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "WaterfallChart"
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
    "name": "connector",
    "typeText": "boolean | ChartConnectorOptions | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
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
    "name": "start",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
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
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "steps",
    "typeText": "readonly WaterfallStep[]",
    "required": true
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
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
