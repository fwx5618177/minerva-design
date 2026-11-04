# 3D bar chart

Bars over an x × y category grid: lit boxes, per-series colors, stacking across series, colors from a color scale by height or by another value, legend and color bar.

Package: minerva-design@1.20.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Sales

Region

Month

North

South

East

West

Central

Monthly sales of five regions

Quarter

Q1

Q2

Q3

Q4

Market

Americas

Europe

Asia

Oceania

Hardware

Software

Services

Revenue

Quarterly revenue of three product lines in four markets, stacked

Women

Men

Age

{{from}}–{{to}}

{{from}}+

Census year

Population

{{value}} M

Population by age group and sex in four census years

Visits

Hour

Day

Website visits per hour of the week

Product

Laptops

Phones

Tablets

Watches

Audio

Margin

Revenue and margin of five products in four markets

In stock

Low stock

{{value}} units

Live updates

Aisle

Aisle {{id}}

Shelf level

Level {{n}}

Units

Units left in each warehouse bin by aisle and shelf level, updated live

{{total}} units in stock · low bins: {{low}} of {{bins}} · bins restocked: {{restocked}}.

Retention

Months since signup

M{{n}}

Signup month

Retention of monthly signup cohorts by months since signup

{{cohort}} cohort, month {{n}}: {{retention}} still active ({{users}} of {{total}} users).

Click a bar to read the retention of a cohort.

Engineering

Sales

Marketing

Operations

Support

Finance

Actual spend

Fiscal year

Variance to budget

Department

Quarterly spend and variance to budget of six departments in {{year}}

{{department}}, {{quarter}}: spent {{actual}} for a budget of {{budget}} ({{variance}}).

{{year}}: spent {{actual}} for a budget of {{budget}} ({{variance}}). Largest overrun: {{department}}, {{quarter}} ({{worst}}).

{{value}} kW

Inlet temperature

Dark theme

3D view

Floor plan

Rack

Row

Row {{id}}

Power draw

Server racks by row and position, with power draw as height and inlet temperature as color

Rack {{rack}}: {{power}}, inlet {{inlet}}, above the {{limit}} limit.

Rack {{rack}}: {{power}}, inlet {{inlet}}, within the {{limit}} limit.

Racks above {{limit}} at the inlet: {{hot}} of {{total}} ({{racks}}). Click a rack for its readings.

## Bar3DChart

Support: beta

Native Angular: MnBar3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBar3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "barWidth",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "series",
    "typeText": "readonly S[]",
    "required": true,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "xAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "yAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "zAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "camera",
    "typeText": "Chart3DCameraOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "autoRotate",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorScale",
    "typeText": "Chart3DColorScale | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorBar",
    "typeText": "boolean | Chart3DColorBarOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | Chart3DLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | Chart3DTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<Chart3DOptions, \"series\">> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "Chart3DHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "Chart3DHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cameraChange",
    "typeText": "Chart3DCameraState",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Sales by region and month

Monthly sales of five regions: category axes with names from the locale and month names from Intl.DateTimeFormat, amounts in compact currency.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBar3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBar3DChart],
  template: `
@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[{ name: t.sales, colorBy: 'z', data: [
    { x: 0, y: 0, z: 120 }, { x: 0, y: 1, z: 135 }, { x: 0, y: 2, z: 150 }, { x: 0, y: 3, z: 180 },
    { x: 1, y: 0, z: 90 }, { x: 1, y: 1, z: 110 }, { x: 1, y: 2, z: 105 }, { x: 1, y: 3, z: 130 },
    { x: 2, y: 0, z: 160 }, { x: 2, y: 1, z: 170 }, { x: 2, y: 2, z: 190 }, { x: 2, y: 3, z: 220 },
    { x: 3, y: 0, z: 70 }, { x: 3, y: 1, z: 85 }, { x: 3, y: 2, z: 95 }, { x: 3, y: 3, z: 100 }
  ] }]"
  [xAxis]="{ categories: t.regions }"
  [yAxis]="{ categories: t.quarters }"
  [zAxis]="{ title: t.sales }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "sales": "Sales (k€)",
    "regions": ["North", "South", "East", "West"],
    "quarters": ["Q1", "Q2", "Q3", "Q4"]
  },
  "zh": {
    "sales": "销售额（千欧元）",
    "regions": ["华北", "华南", "华东", "华西"],
    "quarters": ["第一季度", "第二季度", "第三季度", "第四季度"]
  },
  "ja": {
    "sales": "売上（千ユーロ）",
    "regions": ["北部", "南部", "東部", "西部"],
    "quarters": ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"]
  },
  "fr": {
    "sales": "Ventes (k€)",
    "regions": ["Nord", "Sud", "Est", "Ouest"],
    "quarters": ["T1", "T2", "T3", "T4"]
  }
};
}

```

## Example: Stacked with legend

Three product lines stacked in each quarter × market cell; the legend at the bottom toggles a series and the stacks shrink accordingly.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBar3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBar3DChart],
  template: `
@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[
    { name: t.channels[0], data: [
      { x: 0, y: 0, z: 40 }, { x: 0, y: 1, z: 38 }, { x: 0, y: 2, z: 35 },
      { x: 1, y: 0, z: 22 }, { x: 1, y: 1, z: 24 }, { x: 1, y: 2, z: 20 },
      { x: 2, y: 0, z: 15 }, { x: 2, y: 1, z: 14 }, { x: 2, y: 2, z: 12 }
    ] },
    { name: t.channels[1], data: [
      { x: 0, y: 0, z: 18 }, { x: 0, y: 1, z: 27 }, { x: 0, y: 2, z: 36 },
      { x: 1, y: 0, z: 9 }, { x: 1, y: 1, z: 14 }, { x: 1, y: 2, z: 21 },
      { x: 2, y: 0, z: 6 }, { x: 2, y: 1, z: 9 }, { x: 2, y: 2, z: 13 }
    ] }
  ]"
  [barWidth]="0.55"
  [xAxis]="{ categories: t.products }"
  [yAxis]="{ categories: t.years }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "channels": ["Stores", "Online"],
    "years": ["2023", "2024", "2025"],
    "products": ["Shoes", "Bags", "Watches"]
  },
  "zh": {
    "channels": ["门店", "线上"],
    "years": ["2023", "2024", "2025"],
    "products": ["鞋子", "包袋", "手表"]
  },
  "ja": {
    "channels": ["店舗", "オンライン"],
    "years": ["2023", "2024", "2025"],
    "products": ["靴", "バッグ", "時計"]
  },
  "fr": {
    "channels": ["Magasins", "En ligne"],
    "years": ["2023", "2024", "2025"],
    "products": ["Chaussures", "Sacs", "Montres"]
  }
};
}

```
