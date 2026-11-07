# Radar chart

Compares one or a few items over several indicators with different scales (skills, product reviews, flavor profiles). Hover a polygon to highlight it and its nearest indicator; the arrow keys move between series and indicators, Esc clears; click a legend item to hide a series.

Package: minerva-design@1.22.2

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Problem solving

Coding

System design

Communication

Collaboration

Ownership

Candidate

{{value}} / {{max}}

Interview scorecard of a candidate

Aroma

Acidity

Sweetness

Body

Bitterness

Aftertaste

Ethiopia Yirgacheffe

Sumatra Mandheling

Flavor profiles of two coffees

Performance

Battery

Camera

Display

Value for money

Build quality

Review scores of three phones

Hover a polygon or use the arrow keys to compare the phones

Pace

Shooting

Passing

Dribbling

Defending

Physical

Attributes of two football players

Security

Integrations

Reporting

Mobile

Automation

Support

Pricing

Our product

Main competitor

Market average

Products to compare

Capability ratings of our product, a competitor and the market

Protein

Fiber

Sugar

Fat

Sodium

Calcium

Oatmeal with fruit

Eggs on toast

Yogurt with granola

{{value}} DV

{{meal}}: {{amount}} ({{share}})

Nutrients of three breakfasts, in percent of the daily value

CPU

Memory

Disk I/O

Network

Latency

Errors

Last hour average

Now

Live updates

Alert: {{metric}} is above {{threshold}} of its capacity.

Busiest metric: {{metric}}.

Current load of the service against the last hour's average

Communication

Delivery

Expertise

Collaboration

Mentoring

Initiative

Team average

Person

360° review ratings of {{name}} against the team average

Strongest: {{strength}} ({{strengthGap}} vs. the team). To develop: {{growth}} ({{growthGap}}).

Revenue

Deals won

Win rate

Avg. deal size

Calls

NPS

Target

Actual

{{kpi}}: {{actual}} for a target of {{target}} ({{attainment}}).

Quarterly KPIs of a sales rep against their targets

Click near an axis to read its KPI.

## RadarChart

Support: beta

Radar chart: indicators, series, polygon / circle grid, levels, vertex dots, per-indicator tooltip, legend toggles. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radar-chart/index",
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
    "name": "indicators",
    "typeText": "array",
    "required": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "levels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "dots",
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
