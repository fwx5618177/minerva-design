# Funnel chart

Stages of a process that lose volume along the way (sign-ups, sales pipeline, checkout), with the conversion rate from each stage to the next. Hover or use the arrow keys to highlight a stage; click a legend item to hide it.

Package: minerva-design@1.23.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Pricing page

Started sign-up

Verified email

Created project

Invited teammate

Upgraded to paid

{{users}} users

{{share}} of the visitors

{{users}} dropped since “{{stage}}”

Sign-up funnel

Alerts

Dashboards

Integrations

Reports

Public API

Sort order

Descending

Ascending

Data order

{{users}} weekly users

Weekly active users per feature

Visits

Product page

Added to cart

Checkout

Payment

Order placed

Stage

Visitors

Drop-off

{{share}} of the first stage

Checkout funnel of an online shop

Drop-off between the stages

Applied

Screened

Technical interview

On-site interview

Offer

Hired

{{candidates}} candidates

Typical time in this stage: {{days}}

Hiring pipeline of an engineering role

{{stage}}: {{candidates}} candidates ({{share}} of the applicants)

{{rate}} of the applicants are hired, after {{days}} on average

Desktop

Mobile

{{rate}} conversion

Checkout funnel on {{device}}

Impressions

Clicks

Leads

Qualified leads

Customers

All channels

Search ads

Social media

Email

Partners

Channel

{{share}} of the previous stage

Cost per result: {{cost}}

Marketing funnel of this month: {{channel}}

Spend: {{spend}} · Customers: {{customers}} · Acquisition cost: {{cac}} per customer

Visits

Added to cart

Checkout

Paid orders

Monthly checkout funnel computed from the conversion rates

{{from}} → {{to}}

Lower the conversion of {{step}}

Raise the conversion of {{step}}

Reset to today's rates

{{orders}} orders ({{ordersDelta}}) · {{revenue}} revenue ({{revenueDelta}}) per month

Visitors

Viewed the deal

Added to cart

Checkout

Orders

Flash sale funnel, updated live

Pause

Resume

Restart

{{time}} · {{orders}} orders · {{rate}} of the visitors

The sale is over: {{orders}} orders.

Lead

Qualified

Demo

Proposal

Negotiation

{{deals}} deals · {{amount}}

Win probability: {{share}}

Open deals by pipeline stage, by amount

{{stage}}: {{deals}} open deals

Weighted forecast: {{amount}}

Click a stage to list its deals.

## FunnelChart

Support: beta

Funnel chart: trapezoid or bar stages, sort, gap, conversion rates, legend toggles. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/funnel-chart/index",
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
    "name": "sort",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "conversion",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": ""
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
