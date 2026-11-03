# Horizontal bar chart

Bars growing from the left with the categories down the side: rankings, long names, diverging surveys and progress.

Package: minerva-design@1.20.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Developers

Share of developers using each programming language

I see a career path here

My workload is manageable

I have the tools I need

My manager supports me

I am paid fairly

Strongly disagree

Disagree

Agree

Strongly agree

Employee survey answers, disagreement on the left and agreement on the right

Done

In review

To do

Platform

Payments

Mobile

Growth

Design

Status of the milestone issues of each team

Votes

Dark mode for every page and email

Offline mode on mobile devices

Export reports as PDF with charts

Single sign-on with SAML and OIDC

Two-way calendar synchronization

Edit many records at once

Custom fields on every object

Votes of the most requested features

Budget

Actual

Engineering

Marketing

Sales

Support

Finance

Budget and actual spend per department

Change

North America

Europe

Asia Pacific

Latin America

Middle East

Africa

Change of the monthly active users per region

Users

Messages

Photos

Maps

Music

Notes

Monthly active users per app

{{app}}: {{users}} M users

Tap a bar

Revenue

Units sold

Wireless headphones

Smartwatch

Bluetooth speaker

Mechanical keyboard

Fast charger

HD webcam

Wireless mouse

Tablet

USB-C cable

Laptop stand

Rank by

Rows shown

Top {{n}}

All products

Best-selling products of last month, from highest to lowest

These {{n}} products make {{share}} of the total.

{{value}} GW

Solar capacity

Play

Pause

Play again

Back to the start

Countries with the most installed solar capacity at the end of {{year}}

Salary band

Junior

Intermediate

Senior

Staff

Principal

Director

Offer

Minimum

Midpoint

Maximum

Offer / midpoint

Offer −{{step}}

Offer +{{step}}

An offer of {{offer}} fits the {{levels}} bands.

An offer of {{offer}} is outside every band.

Yearly salary band of each job level, with the offer as a vertical line

Error budget left

Release freeze

Error budget left to each service over the last 30 days, worst first

SLO {{slo}}, measured availability {{availability}}

{{minutes}} of downtime left out of {{allowed}}.

Budget overspent by {{minutes}}.

Click a service to see its budget.

## HorizontalBarChart

Support: beta

Native Angular: MnHorizontalBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHorizontalBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Most visited pages

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[{ name: t.views, data: [
    { x: t.pages[0], y: 48200 },
    { x: t.pages[1], y: 31900 },
    { x: t.pages[2], y: 27400 },
    { x: t.pages[3], y: 15800 },
    { x: t.pages[4], y: 9100 },
    { x: t.pages[5], y: 4300 }
  ] }]"
  [xAxis]="{ type: 'category' }"
  labels
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "views": "Page views",
    "pages": ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"]
  },
  "zh": {
    "views": "浏览量",
    "pages": ["首页", "价格", "文档", "博客", "招聘", "联系我们"]
  },
  "ja": {
    "views": "ページビュー",
    "pages": ["ホーム", "料金", "ドキュメント", "ブログ", "採用情報", "お問い合わせ"]
  },
  "fr": {
    "views": "Pages vues",
    "pages": ["Accueil", "Tarifs", "Documentation", "Blog", "Carrières", "Contact"]
  }
};
}

```

## Example: Survey answers, 100 % stacked

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[
    { name: t.answers[0], data: [{ x: t.questions[0], y: 72 }, { x: t.questions[1], y: 58 }, { x: t.questions[2], y: 64 }, { x: t.questions[3], y: 81 }] },
    { name: t.answers[1], data: [{ x: t.questions[0], y: 18 }, { x: t.questions[1], y: 27 }, { x: t.questions[2], y: 21 }, { x: t.questions[3], y: 12 }] },
    { name: t.answers[2], data: [{ x: t.questions[0], y: 10 }, { x: t.questions[1], y: 15 }, { x: t.questions[2], y: 15 }, { x: t.questions[3], y: 7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [palette]="answerColors"
  stacked
  percent
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  answerColors = ["var(--success-color, #16a34a)", "var(--text-secondary-color, #9ca3af)", "var(--danger-color, #dc2626)"];
  labels = {
  "en": {
    "answers": ["Agree", "Neutral", "Disagree"],
    "questions": ["Easy to set up", "Good documentation", "Fast enough", "Would recommend"]
  },
  "zh": {
    "answers": ["同意", "中立", "不同意"],
    "questions": ["易于上手", "文档完善", "速度够快", "愿意推荐"]
  },
  "ja": {
    "answers": ["そう思う", "どちらでもない", "そう思わない"],
    "questions": ["導入が簡単", "ドキュメントが充実", "十分に速い", "人に勧めたい"]
  },
  "fr": {
    "answers": ["D’accord", "Neutre", "Pas d’accord"],
    "questions": ["Facile à installer", "Bonne documentation", "Assez rapide", "Je recommande"]
  }
};
}

```
