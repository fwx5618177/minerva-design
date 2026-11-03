# Combination chart

Bars, lines and areas in one chart, on one or two value axes: revenue and growth, rainfall and temperature, Pareto charts.

Package: minerva-design@1.19.3

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Q{{n}} {{year}}

Revenue

Growth (YoY)

Quarterly revenue with its year-over-year growth

Rainfall

Temperature

Monthly rainfall and temperature in Tokyo

Sessions

Conversion rate

Campaign

Daily sessions and conversion rate over two months

Returns

Cumulative share

Wrong size

Damaged

Not as described

Arrived late

Changed mind

Wrong item

Other

Returns by cause with their cumulative share

Page views

Chinese (zh-CN)

French (fr-FR)

Daily page views and conversion rate, {{locale}}

Revenue

Users

Users (log scale)

Yearly revenue and users on a logarithmic axis, 2016 to 2025

{{value}} kWh

Solar production

Consumption

Battery charge

Night

{{value}} battery

Self-sufficiency {{share}} over two days, {{imported}} bought from the grid.

Energy per hour

Hourly solar production and consumption of a house over two days, with the state of charge of its battery

Stock level

Deliveries

Promotion

Safety stock

Reorder point

Click a day or a delivery.

{{id}}: {{quantity}} units ordered on {{ordered}}, delivered on {{arrived}} after {{lead}}.

{{units}} units in stock on {{date}}.

Only {{units}} units in stock on {{date}}, under the safety stock.

Units

Daily stock level of an item over three months, with deliveries, the reorder point and the safety stock

Requests

Error rate

Releases

Requests per 30 min

Requests and error rate of a web API over a day, with its releases

The error rate peaked at {{peak}} at {{time}} after {{version}}, until the rollback to {{rollback}}.

{{value}} pts

Start

Remaining work

Completed

Ideal

+{{value}} added

Ideal: {{value}} left

{{value}} left

{{value}} done that day

{{value}} behind the ideal

{{value}} ahead of the ideal

Story points

Sprint burndown: remaining work, points completed each day and the ideal burn over ten working days

{{left}} left at {{velocity}} a day: about {{forecast}} will not be done by the end of the sprint.

{{left}} left at {{velocity}} a day: the sprint is on track.

## MixedChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "MixedChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
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
  },
  {
    "name": "yAxis2",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "stackMode",
    "typeText": "\"percent\" | \"normal\" | undefined",
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
