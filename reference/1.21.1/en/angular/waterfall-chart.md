# Waterfall chart

How a series of increases and decreases takes a value from a start to an end, with subtotals and totals: P&L bridges, cash flow, variances. Thin dashed connectors join every bar to the next one.

Package: minerva-design@1.21.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Revenue

Cost of sales

Gross profit

R&D

Marketing

G&A

Operating income

Interest

Tax

Net income

Amount

Income statement from revenue to net income

Opening

Closing

Net cash flow

Monthly net cash flows from the opening to the closing balance

Budget

Actual

Volume

Price

Product mix

Exchange rates

Raw materials

Savings

Variance

Drivers of the variance between the budgeted and the actual margin

Start of year

End of year

Hires

Transfers in

Resignations

Transfers out

Retirements

People

Headcount changes over the year

Opening ARR

New business

Expansion

Contraction

Churn

Closing ARR

ARR

Quarter

Q{{n}}

{{quarter}}: net new ARR {{net}} · net revenue retention {{nrr}}

ARR bridge of {{quarter}}

List price

Dealer discount

Promotions

Invoice price

Payment terms

Freight

Volume rebates

Pocket price

Price per unit

Click a bar to compare it with the list price

{{step}}: {{value}}, {{share}} of the list price

Price waterfall from the list price to the pocket price

2019 baseline

Business growth

Energy efficiency

Renewable power

Electric fleet

Refrigerants

Acquisition

2025

2030 target

{{value}} kt CO₂e

Emissions

Change: {{value}}

From {{from}} to {{to}}

{{value}} above the 2030 target

Emissions bridge from the 2019 baseline to 2025

Order entry

Credit check

Picking

Quality check

Waiting for carrier

Transit

Customs

Lead time

Duration

Work

Waiting

work takes {{work}} of the {{total}} ({{share}})

Lead time of an order by stage

Earlier

Now

Balance

Customer payment

Supplier invoice

Payroll

Card fees

Refund

Latest: {{time}} · {{kind}} {{amount}}

Pause

Resume

Cash position of the day, updated live

Committed

Added

Removed

Re-estimated

Carried over

Completed

Story points

Orientation

Vertical

Horizontal

Labels

Connectors

Sprint scope from committed to completed story points

## WaterfallChart

Support: beta

Native Angular: MnWaterfallChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnWaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "steps",
    "typeText": "readonly WaterfallStep[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "start",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "connector",
    "typeText": "boolean | ChartConnectorOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Profit and loss bridge

From revenue to net income: each change starts where the previous bar ended, subtotal and total bars show the running total from zero; the labels show the changes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWaterfallChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWaterfallChart],
  template: `
@let s = steps[language()];
<mn-waterfall-chart
  [steps]="[
    { label: s[0], value: 420 },
    { label: s[1], value: -180 },
    { label: s[2], kind: 'subtotal' },
    { label: s[3], value: -130 },
    { label: s[4], value: 25 },
    { label: s[5], value: -34 },
    { label: s[6], kind: 'total' }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  steps = {
  "en": ["Revenue", "Cost of sales", "Gross profit", "Operating costs", "Other income", "Taxes", "Net income"],
  "zh": ["营业收入", "销售成本", "毛利润", "运营费用", "其他收入", "税费", "净利润"],
  "ja": ["売上高", "売上原価", "売上総利益", "営業費用", "その他収益", "税金", "純利益"],
  "fr": ["Chiffre d’affaires", "Coût des ventes", "Marge brute", "Charges d’exploitation", "Autres produits", "Impôts", "Résultat net"]
};
}

```

## Example: Cash flow

start sets the opening balance shown by the first subtotal, the months add their net flows and the closing balance ends the chart; yAxis.min zooms on the changes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWaterfallChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWaterfallChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-waterfall-chart
  [steps]="[
    { label: t.opening, value: 120 },
    { label: m[0], value: 18 },
    { label: m[1], value: -12 },
    { label: m[2], value: 25 },
    { label: m[3], value: -30 },
    { label: m[4], value: 14 },
    { label: m[5], value: 9 },
    { label: t.closing, kind: 'total' }
  ]"
  [labels]="false"
  orientation="horizontal"
  [height]="360"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "opening": "Opening",
    "closing": "Closing"
  },
  "zh": {
    "opening": "期初",
    "closing": "期末"
  },
  "ja": {
    "opening": "期首",
    "closing": "期末"
  },
  "fr": {
    "opening": "Ouverture",
    "closing": "Clôture"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
};
}

```
