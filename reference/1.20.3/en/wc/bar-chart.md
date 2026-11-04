# Bar chart

Bars grouped side by side or stacked, with optional line overlays.

Package: minerva-design@1.20.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Q{{n}}

Tickets closed

Support tickets closed per quarter

Orders

7-day average

Day

Daily orders with their 7-day average

Quarterly revenue, 2025 and 2026

Promoters

Passives

Detractors

North America

Europe

Asia Pacific

Latin America

Middle East

Share of promoters, passives and detractors by region

Web

Mobile app

Partners

Monthly orders by channel, stacked

Sales

Sales per quarter

{{quarter}}: {{units}} units

Tap a bar

Stacked

Grouped

Orders per channel and month

London

Tokyo

Paris

Average monthly rainfall in London, Tokyo and Paris

Net result

Monthly net result, profits above zero and losses below

Units sold

Online sales by country, from highest to lowest

New customers

W{{n}}

Weekly target

New customers per week against the weekly target

Target reached {{reached}} weeks out of {{total}} ({{rate}}).

Revenue

{{month}}: {{value}}

Back to quarters

Click a quarter to see its months.

{{quarter}}: {{value}} in total. Click a month for its revenue.

Revenue per quarter in 2026; click a quarter to see its months

Revenue per month in {{quarter}} 2026

Engineering

Product

Design

Sales

Marketing

Support

Last year

This year

Change

Compare with last year

Hires per department, this year and last year

Successful

Rolled back

Change freeze

Production deployments per day over eight weeks, successful and rolled back

{{perDay}} deployments per working day, change failure rate {{failure}}.

Off-peak

Standard

Peak

Charge

Daily average

Charging time

{{energy}} kWh · {{duration}}

Charge from {{start}} to {{end}} for {{cost}}, {{saving}} less than right after plugging in at {{plugIn}}.

Price per MWh

Day-ahead electricity price for each hour of tomorrow, with the cheapest hours to charge an electric car highlighted

## BarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bar-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "stacked",
    "typeText": "boolean",
    "attribute": "stacked",
    "required": false
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "attribute": "percent",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "attribute": "labels",
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
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
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
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
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

## Example: Grouped bars with labels

Two years side by side per region; labels writes the value above every bar.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/wc/grouped.html

```html
<minerva-bar-chart id="sales" labels height="280"></minerva-bar-chart>

```

### apps/docs/src/docs/pages/bar-chart/wc/grouped.ts

```tsx
// Series are grouped side by side; `labels` writes the value of every bar.
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["North", "South", "East", "West"],
  },
  zh: {
    lastYear: "2024 年",
    thisYear: "2025 年",
    regions: ["华北", "华南", "华东", "西部"],
  },
  ja: {
    lastYear: "2024年",
    thisYear: "2025年",
    regions: ["北部", "南部", "東部", "西部"],
  },
  fr: {
    lastYear: "2024",
    thisYear: "2025",
    regions: ["Nord", "Sud", "Est", "Ouest"],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBarChart>("#sales")!;
  chart.series = [
    { name: text.lastYear, data: [38, 52, 61, 45] },
    { name: text.thisYear, data: [44, 58, 72, 49] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.regions } };
}

```

## Example: Stacked bars

Sessions per device piled up for each day of the week.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/wc/stacked.html

```html
<minerva-bar-chart id="devices" stacked height="280"></minerva-bar-chart>

```

### apps/docs/src/docs/pages/bar-chart/wc/stacked.ts

```tsx
// `stacked` piles the bars of each category (a series can still set its
// own `type`, e.g. a line).
import type { MinervaBarChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    desktop: "Desktop",
    mobile: "Mobile",
    tablet: "Tablet",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    desktop: "桌面端",
    mobile: "移动端",
    tablet: "平板",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    desktop: "デスクトップ",
    mobile: "モバイル",
    tablet: "タブレット",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    desktop: "Ordinateur",
    mobile: "Mobile",
    tablet: "Tablette",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBarChart>("#devices")!;
  chart.series = [
    { name: text.desktop, data: [320, 302, 341, 374, 390, 210, 180] },
    { name: text.mobile, data: [420, 432, 401, 454, 490, 630, 610] },
    { name: text.tablet, data: [80, 72, 71, 84, 90, 130, 120] },
  ];
  chart.options = { xAxis: { type: "category", categories: text.days } };
}

```
