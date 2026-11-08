# Sunburst chart

A hierarchy drawn as concentric rings: each ring is a level, each sector a share of its parent. Click a parent (or press Enter on it) to zoom in, click the center (or press Backspace) to go back up; the transition animates the angles and the rings. Hovering a sector highlights its ancestors and descendants, and the labels follow the arc or the radius, whichever fits.

Package: minerva-design@1.23.2

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Macintosh HD

Applications

Documents

Projects

Archive

PDFs

Spreadsheets

Photos

Developer

Package caches

Simulators

System

Music

Other apps

{{value}} GB

Disk usage by folder, in gigabytes

Showing {{path}}. Click the center to go back up.

Click a folder to zoom into it.

Engineering

Platform

Infrastructure

Security

Developer tools

Product engineering

Web

Mobile

Payments

Data

Analytics

Machine learning

Sales

EMEA

Americas

APAC

Customer success

Support

Onboarding

Marketing

Brand

Growth

Content

Operations

Finance

People

Legal

IT

{{value}} people

Headcount by department, group and team

All products

Electronics

Phones

Flagship

Mid-range

Accessories

Laptops

Audio

Headphones

Speakers

Home

Kitchen

Furniture

Decor

Fashion

Men

Women

Kids

Sports

Outdoor

Fitness

Category path

Quarterly revenue by product category

Asia

Africa

Europe

Americas

Oceania

Other countries

{{value}} M

Label mode

Auto

Along the arc

Along the radius

None

World population by continent and country, in millions

Education

Health

Transport

Public safety

Environment

Administration

Schools

Universities

Libraries

Hospitals

Prevention

Public transit

Roads

Cycle lanes

Police

Fire service

Parks

Waste collection

Water

{{path}}: {{amount}}, {{share}} of the budget and {{areaShare}} of {{area}}.

{{path}}: {{amount}}, {{share}} of the budget.

Yearly city budget by policy area and program

Yearly budget: {{total}}. Click a sector to read its share.

Bakery chain

Dental clinic

Language school

Internal

Website

Branding

Booking system

Mobile app

Administration

Training

Design

Development

Meetings

Review

Support

Learning

Period

This week

This month

{{hours}} · {{share}} of the time logged

Hours logged by client, project and activity ({{period}})

Billable: {{billable}} of {{total}} ({{share}}).

Checkout

Search

Accounts

Catalog

Cart

Payment

Shipping

Queries

Suggestions

Sign-in

Profile

Product pages

Reviews

{{value}} req/min

API requests per minute by service and endpoint, updated live

Pause

Resume

Total: {{value}}

Busiest service: {{service}}

Renewables

Nuclear

Fossil fuels

Wind

Solar

Hydro

Biomass

Natural gas

Coal

Oil

{{value}} TWh

Hide fossil fuels

Yearly electricity generation by source and fuel

Renewables hidden: {{total}} shown.

Renewables: {{share}} of the {{total}} shown.

## SunburstChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events and the sunburst drill event; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SunburstChart"
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
    "name": "drill",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
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
    "typeText": "readonly TreemapNode[]",
    "required": true
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
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
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
  },
  {
    "name": "drill",
    "typeText": "[event: ShapeDrillEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
