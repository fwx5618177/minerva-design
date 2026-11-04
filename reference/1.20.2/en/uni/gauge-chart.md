# Gauge

A single value on an arc, against a range and optional colored thresholds: KPIs, usage, scores. Changing value animates the arc (and the needle) from its current position.

Package: minerva-design@1.20.2

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

CPU

Memory

Disk

{{metric}} usage

Net Promoter Score

Requests / s

Requests per second, updated live

Pause updates

Resume updates

Speed

Speedometer: {{speed}}

Brake

Accelerate

Storage

API calls

Seats

Build minutes

{{used}} of {{limit}}

{{quota}}: {{share}} of the quota used

Availability, 30 days

Objective: {{value}}

Availability over 30 days against the objective

Error budget left

{{used}} of downtime out of {{budget}} allowed

Error budget left this month

Temperature unit

°C

°F

target

Room: {{value}}

Thermostat target temperature

Lower the target temperature

Raise the target temperature

Heating to {{target}} (room: {{room}})

Cooling to {{target}} (room: {{room}})

Holding {{target}} (room: {{room}})

Applicant

credit score

Poor

Fair

Good

Very good

Exceptional

{{share}} of the way up the scale

Credit score of {{name}}

{{name}}: {{score}}. {{advice}}

Most lenders will decline the application.

Approval is possible, at a higher rate.

Eligible for most loans at standard rates.

Eligible for better than average rates.

Eligible for the best rates on offer.

charged

Range: {{range}}

Battery charge of the car

Plugged in

Reset

Fully charged

Unplugged

Fast charging

Slow charging above 80 %

80 % in {{minutes}}

{{value}} rpm

{{value}} MW

Dark panel

Rotor speed

Power output

Nacelle temperature

{{reading}} of the wind turbine: {{value}}

## GaugeChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "GaugeChart"
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
    "name": "needle",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ticks",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "number",
    "required": true
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "thickness",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number | undefined",
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
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
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
