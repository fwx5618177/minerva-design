# Pie / donut chart

Parts of a whole: pie, donut (with a total in the hole) and Nightingale rose. Use them for a few categories (up to ~8) whose shares matter more than exact comparisons. Hover or use the arrow keys to highlight a slice, Esc clears; click a legend item to hide a slice.

Package: minerva-design@1.22.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Organic search

Direct

Social

Paid ads

Referral

Email

{{sessions}} sessions · {{share}}

Website sessions by traffic source, last 30 days

{{source}}: {{sessions}} sessions ({{share}} of the traffic)

Click a slice (or focus the chart and press Enter) to select a source

Enterprise

Business

Pro

Starter

Monthly revenue

Monthly recurring revenue by plan

Email

Live chat

Web form

Phone

Social media

Community

Label placement

Outside

Inside

None

Label content

Name

Value

Percent

{{tickets}} tickets · {{share}}

Support tickets by channel

Average monthly rainfall

Others

Units shipped

{{units}} units · {{share}}

Smartphone market share by vendor

Housing

Food

Transport

Leisure

Rent

Energy

Insurance

Groceries

Restaurants

Public transit

Car

Travel

Subscriptions

Sport

Monthly budget by item

Monthly budget by category

{{name}}: {{amount}} ({{share}})

Hover a ring to read a category or an item

Asia Pacific

Europe

North America

Latin America

Mobile

Desktop

Tablet

Sessions by device in {{region}}

US equities

International equities

Bonds

Real estate

Commodities

Cash

Asset classes shown

Show all

selection

total value

{{share}} of the portfolio

Investment portfolio by asset class

{{shown}} of {{total}} asset classes shown: {{value}}, {{share}} of the portfolio.

Dark mode

Offline mode

Public API

More integrations

Custom reports

Which feature should we build next?

votes

{{votes}} votes · {{share}}

Live poll results by answer

Pause

Resume

Reset

Leading: {{answer}}

Compute

Databases

Storage

Network

Virtual machines

Kubernetes

Serverless functions

SQL databases

NoSQL databases

In-memory cache

Object storage

Block storage

Backups

Data transfer

CDN

Load balancers

Cloud bill

All categories

Click to see its services

{{category}} costs by service

Monthly cloud bill by category

{{service}}: {{amount}}, {{share}} of {{category}}.

{{category}}: {{amount}}, {{share}} of the bill. Click a service for its share.

Monthly bill: {{total}}. Click a category to see its services.

Very dissatisfied

Dissatisfied

Neutral

Satisfied

Very satisfied

Q{{n}}

Quarter

CSAT

{{answers}} answers · {{share}}

Customer satisfaction answers in {{quarter}}

CSAT {{csat}} from {{respondents}} respondents.

CSAT {{csat}}, {{delta}} points since {{previous}}, from {{respondents}} respondents.

## DonutChart

Support: beta

Native Angular: MnDonutChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDonutChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## PieChart

Support: beta

Native Angular: MnPieChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnPieChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly ShapeDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "rose",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"outside\" | \"inside\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"percent\" | \"name\")[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Traffic sources

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnPieChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnPieChart],
  template: `
@let t = labels[language()];
<mn-pie-chart
  [data]="[
    { name: t[0], value: 1048 },
    { name: t[1], value: 735 },
    { name: t[2], value: 580 },
    { name: t[3], value: 484 },
    { name: t[4], value: 300 }
  ]"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Search", "Direct", "Social", "Email", "Referral"],
  "zh": ["搜索", "直接访问", "社交媒体", "邮件", "推荐"],
  "ja": ["検索", "ダイレクト", "ソーシャル", "メール", "参照元"],
  "fr": ["Recherche", "Direct", "Réseaux sociaux", "E-mail", "Référents"]
};
}

```

## Example: Donut with a total

centerValue and centerLabel write the total in the hole; onHover replaces it with the hovered plan, so the tooltip is turned off. legend.toggle is false so the total always matches the visible slices.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDonutChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDonutChart],
  template: `
@let t = labels[language()];
<mn-donut-chart
  [data]="[
    { name: t.plans[0], value: 2 },
    { name: t.plans[1], value: 18 },
    { name: t.plans[2], value: 46 },
    { name: t.plans[3], value: 34 }
  ]"
  centerValue="€100k"
  [centerLabel]="t.total"
  [height]="300"
  (itemClick)="selected = $event.name + ': €' + $event.value + 'k'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "total": "monthly revenue",
    "hint": "Click a slice",
    "plans": ["Free", "Starter", "Pro", "Enterprise"]
  },
  "zh": {
    "total": "月收入",
    "hint": "点击一个扇区",
    "plans": ["免费版", "入门版", "专业版", "企业版"]
  },
  "ja": {
    "total": "月間売上",
    "hint": "スライスをクリックします",
    "plans": ["無料", "スターター", "プロ", "エンタープライズ"]
  },
  "fr": {
    "total": "revenu mensuel",
    "hint": "Cliquez sur une part",
    "plans": ["Gratuit", "Starter", "Pro", "Entreprise"]
  }
};
}

```
