# Sunburst chart

A hierarchy drawn as concentric rings: each ring is a level, each sector a share of its parent. Click a parent (or press Enter on it) to zoom in, click the center (or press Backspace) to go back up; the transition animates the angles and the rings. Hovering a sector highlights its ancestors and descendants, and the labels follow the arc or the radius, whichever fits.

Package: minerva-design@1.20.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnSunburstChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSunburstChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly TreemapNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "\"auto\" | \"none\" | \"tangential\" | \"radial\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillDown",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

### events

```json
[
  {
    "name": "drillChange",
    "typeText": "ShapeDrillEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: Disk usage

Folders and apps of a laptop, in GB. Click a folder to zoom into it and the center to go back up; onDrill reports the focused path, shown under the chart.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.folders[0], children: [{ name: t.files[0], value: 12 }, { name: t.files[1], value: 3 }] },
    { name: t.folders[1], children: [{ name: t.files[2], value: 46 }, { name: t.files[3], value: 21 }] },
    { name: t.folders[2], children: [{ name: t.files[4], value: 18 }, { name: t.files[5], value: 7 }] },
    { name: t.folders[3], children: [{ name: t.files[6], value: 9 }, { name: t.files[7], value: 32 }] }
  ]"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "folders": ["Documents", "Photos", "Music", "Apps"],
    "files": ["Work", "Taxes", "2025", "2026", "Albums", "Podcasts", "Tools", "Games"]
  },
  "zh": {
    "folders": ["文档", "照片", "音乐", "应用"],
    "files": ["工作", "税务", "2025", "2026", "专辑", "播客", "工具", "游戏"]
  },
  "ja": {
    "folders": ["書類", "写真", "ミュージック", "アプリ"],
    "files": ["仕事", "税金", "2025", "2026", "アルバム", "ポッドキャスト", "ツール", "ゲーム"]
  },
  "fr": {
    "folders": ["Documents", "Photos", "Musique", "Applications"],
    "files": ["Travail", "Impôts", "2025", "2026", "Albums", "Podcasts", "Outils", "Jeux"]
  }
};
}

```

## Example: Controlled drill-down with a breadcrumb

drillPath makes the focus controlled: clicks only call onDrill, and the breadcrumb owns the path, so its buttons can jump to any level. cornerRadius and padAngle round and separate the sectors.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSunburstChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSunburstChart],
  template: `
@let t = labels[language()];
<mn-sunburst-chart
  [data]="[
    { name: t.teams[0], children: [{ name: t.groups[0], value: 18 }, { name: t.groups[1], value: 11 }, { name: t.groups[2], value: 14 }] },
    { name: t.teams[1], children: [{ name: t.groups[3], value: 16 }, { name: t.groups[4], value: 12 }] },
    { name: t.teams[2], children: [{ name: t.groups[5], value: 20 }, { name: t.groups[6], value: 8 }] }
  ]"
  [innerRadius]="0.32"
  (drillChange)="path = $event.path"
/>
<output aria-live="polite">{{ t.root }}@for (name of path; track $index) { › {{ name }} }</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  path: string[] = [];
  labels = {
  "en": {
    "root": "Company",
    "teams": ["Engineering", "Sales", "Support"],
    "groups": ["Web", "Mobile", "Platform", "Europe", "Asia", "Tier 1", "Tier 2"],
    "hint": "Click a team"
  },
  "zh": {
    "root": "公司",
    "teams": ["研发", "销售", "客服"],
    "groups": ["网页", "移动端", "平台", "欧洲", "亚洲", "一线", "二线"],
    "hint": "点击一个团队"
  },
  "ja": {
    "root": "会社",
    "teams": ["エンジニアリング", "営業", "サポート"],
    "groups": ["Web", "モバイル", "プラットフォーム", "ヨーロッパ", "アジア", "一次対応", "二次対応"],
    "hint": "チームをクリックします"
  },
  "fr": {
    "root": "Entreprise",
    "teams": ["Ingénierie", "Ventes", "Support"],
    "groups": ["Web", "Mobile", "Plateforme", "Europe", "Asie", "Niveau 1", "Niveau 2"],
    "hint": "Cliquez sur une équipe"
  }
};
}

```
