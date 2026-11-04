# Sunburst chart

A hierarchy drawn as concentric rings: each ring is a level, each sector a share of its parent. Click a parent (or press Enter on it) to zoom in, click the center (or press Backspace) to go back up; the transition animates the angles and the rings. Hovering a sector highlights its ancestors and descendants, and the labels follow the arc or the radius, whichever fits.

Package: minerva-design@1.20.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Sunburst: hierarchy as rings, sector labels, tap a parent to drill in and the center to go back (`drill` event, drill() / getDrillPath(), controlled drillPath). Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/sunburst-chart/index",
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
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "levels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "cornerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "drill",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "drillPath",
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
