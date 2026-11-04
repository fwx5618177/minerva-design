# Funnel chart

Stages of a process that lose volume along the way (sign-ups, sales pipeline, checkout), with the conversion rate from each stage to the next. Hover or use the arrow keys to highlight a stage; click a legend item to hide it.

Package: minerva-design@1.20.6

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/funnel-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "sort",
    "typeText": "\"descending\" | \"ascending\" | \"none\"",
    "attribute": "sort",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"trapezoid\" | \"bar\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "hideConversion",
    "typeText": "boolean",
    "attribute": "hide-conversion",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<FunnelChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Sorted bars

Centered bars instead of trapezoids, with the stages sorted by value.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/bars.html

```html
<minerva-funnel-chart
  id="hiring"
  shape="bar"
  sort="descending"
  height="300"
></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/bars.ts

```tsx
// `shape="bar"` draws centered bars, `sort="descending"` orders the stages
// by value.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Interviews", "Applications", "Offers", "Screenings", "Hires"],
  zh: ["面试", "申请", "录用通知", "筛选", "入职"],
  ja: ["面接", "応募", "内定", "書類選考", "採用"],
  fr: ["Entretiens", "Candidatures", "Offres", "Présélections", "Embauches"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#hiring")!;
  chart.data = [180, 940, 42, 410, 31].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```

## Example: Conversion funnel

Stages narrowing to the next one, each labelled with its conversion rate from the previous stage.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.html

```html
<minerva-funnel-chart id="signup" height="300"></minerva-funnel-chart>

```

### apps/docs/src/docs/pages/funnel-chart/wc/conversion.ts

```tsx
// Stages narrow to the next one; the labels show the conversion rate from
// the previous stage.
import type { MinervaFunnelChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Visits", "Sign-ups", "Trials", "Purchases"],
  zh: ["访问", "注册", "试用", "购买"],
  ja: ["訪問", "登録", "トライアル", "購入"],
  fr: ["Visites", "Inscriptions", "Essais", "Achats"],
};

export function setup(root: HTMLElement) {
  const stages =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaFunnelChart>("#signup")!;
  chart.data = [12000, 4800, 2100, 860].map((value, i) => ({
    name: stages[i],
    value,
  }));
}

```
