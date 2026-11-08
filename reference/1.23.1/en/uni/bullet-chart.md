# Bullet chart

Compact KPI bars (Stephen Few): each row shows a measure as a bar over qualitative ranges (shades of gray, the poorest darkest) with a marker at its target, on the row's own scale. Rows can mix units, so dashboards fit many KPIs in little space. Hover a row or use the arrow keys to read its value, target and range.

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "ticks",
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
    "name": "data",
    "typeText": "readonly BulletDatum[]",
    "required": true
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\" | undefined",
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
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "rangeColors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "barSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
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
