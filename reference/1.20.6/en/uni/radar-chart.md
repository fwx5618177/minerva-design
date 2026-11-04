# Radar chart

Compares one or a few items over several indicators with different scales (skills, product reviews, flavor profiles). Hover a polygon to highlight it and its nearest indicator; the arrow keys move between series and indicators, Esc clears; click a legend item to hide a series.

Package: minerva-design@1.20.6

Renderer: uni

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RadarChart"
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
    "name": "dots",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
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
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true
  },
  {
    "name": "levels",
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
