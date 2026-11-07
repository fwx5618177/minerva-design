# Bullet chart

Compact KPI bars (Stephen Few): each row shows a measure as a bar over qualitative ranges (shades of gray, the poorest darkest) with a marker at its target, on the row's own scale. Rows can mix units, so dashboards fit many KPIs in little space. Hover a row or use the arrow keys to read its value, target and range.

Package: minerva-design@1.22.2

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnBulletChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBulletChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly BulletDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "rangeColors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: KPIs against targets

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let t = labels[language()];
<mn-bullet-chart
  [data]="[
    { name: t.kpis[0], value: 270, target: 250, ranges: [150, 225, 300] },
    { name: t.kpis[1], value: 22.5, target: 26, ranges: [20, 25, 30] },
    { name: t.kpis[2], value: 1650, target: 2100, ranges: [1000, 2000, 2500] },
    { name: t.kpis[3], value: 4.4, target: 4.5, ranges: [3.5, 4.25, 5] }
  ]"
  [rangeLabels]="t.ranges"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "kpis": ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    "ranges": ["Poor", "Fair", "Good"]
  },
  "zh": {
    "kpis": ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    "ranges": ["差", "一般", "良好"]
  },
  "ja": {
    "kpis": ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    "ranges": ["不良", "普通", "良好"]
  },
  "fr": {
    "kpis": ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    "ranges": ["Faible", "Correct", "Bon"]
  }
};
}

```

## Example: Vertical

orientation="vertical" turns the rows into columns, here the story points of each team against its commitment. The ranges are shared by every column through the chart's ranges prop; barSize makes the bars thicker.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBulletChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBulletChart],
  template: `
@let q = quarters[language()];
<mn-bullet-chart
  [data]="[
    { name: q[0], value: 82, target: 90 },
    { name: q[1], value: 95, target: 90 },
    { name: q[2], value: 71, target: 100 },
    { name: q[3], value: 104, target: 100 }
  ]"
  orientation="vertical"
  [ranges]="[60, 90, 120]"
  targetColor="var(--danger-color, #dc2626)"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  quarters = {
  "en": ["Q1", "Q2", "Q3", "Q4"],
  "zh": ["第一季度", "第二季度", "第三季度", "第四季度"],
  "ja": ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  "fr": ["T1", "T2", "T3", "T4"]
};
}

```
