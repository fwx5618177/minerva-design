# 3D bar chart

Bars over an x × y category grid: lit boxes, per-series colors, stacking across series, colors from a color scale by height or by another value, legend and color bar.

Package: minerva-design@1.22.2

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bar-3d-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "barWidth",
    "typeText": "number",
    "attribute": "bar-width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly S[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Chart3DBaseOptions | undefined",
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
    "description": "The hovered point, cell or bar changed; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point, cell or bar was clicked; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }"
  },
  {
    "name": "minerva-camera-change",
    "typeText": "CustomEvent",
    "description": "The user rotated, zoomed, panned or reset the camera; detail: { azimuth, elevation, zoom, pan, projection }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Sales by region and quarter

A bar per region × quarter cell, colored by height; the axes name the categories.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/wc/sales.html

```html
<minerva-bar-3d-chart id="sales" height="420"></minerva-bar-3d-chart>

```

### apps/docs/src/docs/pages/bar-3d-chart/wc/sales.ts

```tsx
// <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
// height (`colorBy: "z"`); the axes name the categories.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBar3DChart>("#sales")!;
  chart.series = [
    {
      name: text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
      ),
    },
  ];
  chart.options = {
    xAxis: { categories: text.regions },
    yAxis: { categories: text.quarters },
    zAxis: { title: text.sales },
  };
}

```

## Example: Stacked channels

Two series on the same cells are stacked (stores and online); thinner bars, legend toggles.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/wc/stacked.html

```html
<minerva-bar-3d-chart
  id="channels"
  bar-width="0.55"
  height="420"
></minerva-bar-3d-chart>

```

### apps/docs/src/docs/pages/bar-3d-chart/wc/stacked.ts

```tsx
// Two series on the same cells are stacked: sales in stores and online per
// product and year; `bar-width` thins the bars, the legend toggles a channel.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    channels: ["Stores", "Online"],
    years: ["2023", "2024", "2025"],
    products: ["Shoes", "Bags", "Watches"],
  },
  zh: {
    channels: ["门店", "线上"],
    years: ["2023", "2024", "2025"],
    products: ["鞋子", "包袋", "手表"],
  },
  ja: {
    channels: ["店舗", "オンライン"],
    years: ["2023", "2024", "2025"],
    products: ["靴", "バッグ", "時計"],
  },
  fr: {
    channels: ["Magasins", "En ligne"],
    years: ["2023", "2024", "2025"],
    products: ["Chaussures", "Sacs", "Montres"],
  },
};

// per channel: products (rows) × years (columns), k units
const CHANNELS = [
  [
    [40, 38, 35],
    [22, 24, 20],
    [15, 14, 12],
  ],
  [
    [18, 27, 36],
    [9, 14, 21],
    [6, 9, 13],
  ],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBar3DChart>("#channels")!;
  chart.series = text.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) =>
      row.map((z, j) => ({ x: i, y: j, z })),
    ),
  }));
  chart.options = {
    xAxis: { categories: text.products },
    yAxis: { categories: text.years },
  };
}

```
