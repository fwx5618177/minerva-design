# Radial bar chart

Progress as concentric rings: activity rings, OKR completion, sales against quota. Each bar fills its ring up to its value over its max, on a tinted background track, with rounded ends; labels sit in the open part of the circle and a center text can sum things up. Hover a ring or use the arrow keys to read its value, max and progress.

Package: minerva-design@1.20.4

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Move

Exercise

Stand

Day of the week

rings closed

Activity rings of the selected day: move, exercise and stand against their goals

Activation rate

Week-4 retention

NPS above 50

p95 latency

Churn reduction

average completion

Completion of the quarter's key results

North

South

East

West

of quota

Quarterly sales of each region against its quota

CPU

Memory

Disk

Network

Shape

Three quarters

Full circle

Half circle

Rounded ends

Tracks

Server resource usage, in percent of capacity

Emergency fund

Summer holiday

New laptop

House deposit

Click a goal to see how long it will take.

{{goal}}: {{saved}} of {{target}} saved. {{remaining}} to go, about {{months}} months at {{monthly}} a month.

of all goals

Savings of each goal against its target

R. Silva

M. Kowalski

C. Okafor

L. Moreau

K. Tanaka

E. Jensen

Goals

Assists

Ranking

#{{rank}} {{name}}

{{stat}}: {{value}} in {{games}} games

{{ratio}} per game

League leaders of the season by {{stat}}

Leader: {{name}} ({{stat}}: {{value}})

Launch video

Event photos

Slides

Database backup

uploaded

Upload progress of each file

Restart

All files uploaded ({{size}}).

{{done}} of {{files}} files uploaded

I feel valued

My goals are clear

I can grow here

Work-life balance

My manager supports me

I'd recommend working here

Order

Survey order

Highest agreement first

Lowest agreement first

average agreement

{{agree}} of {{answered}} respondents agree ({{share}})

Share of employees who agree with each survey statement

## RadialBarChart

Support: beta

Native Angular: MnRadialBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadialBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly RadialBarDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Activity rings

Full rings (sweep={360}) for Move, Exercise and Stand, each against its own daily goal (max). Picking another day animates the rings; as there is no room for labels, the legend names the rings.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadialBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadialBarChart],
  template: `
@let t = labels[language()];
<mn-radial-bar-chart
  [data]="[
    { name: t.rings[0], value: 420, max: 500, color: '#ef4444' },
    { name: t.rings[1], value: 24, max: 30, color: '#22c55e' },
    { name: t.rings[2], value: 9, max: 12, color: '#06b6d4' }
  ]"
  [sweep]="360"
  centerValue="78 %"
  [centerLabel]="t.today"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "rings": ["Move", "Exercise", "Stand"],
    "today": "of today’s goals"
  },
  "zh": {
    "rings": ["活动", "锻炼", "站立"],
    "today": "今日目标"
  },
  "ja": {
    "rings": ["ムーブ", "エクササイズ", "スタンド"],
    "today": "今日の目標"
  },
  "fr": {
    "rings": ["Bouger", "M’entraîner", "Me lever"],
    "today": "des objectifs du jour"
  }
};
}

```

## Example: OKR completion

Key results in percent of their target (max={100}), labelled with their name and percent before the start of each bar; the average completion is written in the center.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadialBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadialBarChart],
  template: `
@let n = names[language()];
<mn-radial-bar-chart
  [data]="[
    { name: n[0], value: 92 },
    { name: n[1], value: 74 },
    { name: n[2], value: 61 },
    { name: n[3], value: 48 },
    { name: n[4], value: 35 }
  ]"
  [max]="100"
  [innerRadius]="0.2"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  names = {
  "en": ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  "zh": ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  "ja": ["売上", "新規顧客", "継続率", "NPS", "採用"],
  "fr": ["Chiffre d’affaires", "Nouveaux clients", "Rétention", "NPS", "Recrutement"]
};
}

```
