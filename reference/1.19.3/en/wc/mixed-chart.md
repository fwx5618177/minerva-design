# Combination chart

Bars, lines and areas in one chart, on one or two value axes: revenue and growth, rainfall and temperature, Pareto charts.

Package: minerva-design@1.19.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Q{{n}} {{year}}

Revenue

Growth (YoY)

Quarterly revenue with its year-over-year growth

Rainfall

Temperature

Monthly rainfall and temperature in Tokyo

Sessions

Conversion rate

Campaign

Daily sessions and conversion rate over two months

Returns

Cumulative share

Wrong size

Damaged

Not as described

Arrived late

Changed mind

Wrong item

Other

Returns by cause with their cumulative share

Page views

Chinese (zh-CN)

French (fr-FR)

Daily page views and conversion rate, {{locale}}

Revenue

Users

Users (log scale)

Yearly revenue and users on a logarithmic axis, 2016 to 2025

{{value}} kWh

Solar production

Consumption

Battery charge

Night

{{value}} battery

Self-sufficiency {{share}} over two days, {{imported}} bought from the grid.

Energy per hour

Hourly solar production and consumption of a house over two days, with the state of charge of its battery

Stock level

Deliveries

Promotion

Safety stock

Reorder point

Click a day or a delivery.

{{id}}: {{quantity}} units ordered on {{ordered}}, delivered on {{arrived}} after {{lead}}.

{{units}} units in stock on {{date}}.

Only {{units}} units in stock on {{date}}, under the safety stock.

Units

Daily stock level of an item over three months, with deliveries, the reorder point and the safety stock

Requests

Error rate

Releases

Requests per 30 min

Requests and error rate of a web API over a day, with its releases

The error rate peaked at {{peak}} at {{time}} after {{version}}, until the rollback to {{rollback}}.

{{value}} pts

Start

Remaining work

Completed

Ideal

+{{value}} added

Ideal: {{value}} left

{{value}} left

{{value}} done that day

{{value}} behind the ideal

{{value}} ahead of the ideal

Story points

Sprint burndown: remaining work, points completed each day and the ideal burn over ten working days

{{left}} left at {{velocity}} a day: about {{forecast}} will not be done by the end of the sprint.

{{left}} left at {{velocity}} a day: the sprint is on track.

## MixedChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/mixed-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
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

## Example: Climate chart

Monthly precipitation as bars and the mean temperature as a smooth line; the crosshair reads both.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/wc/climate.html

```html
<minerva-mixed-chart id="climate" height="300"></minerva-mixed-chart>

```

### apps/docs/src/docs/pages/mixed-chart/wc/climate.ts

```tsx
// A climate chart: monthly precipitation as bars, the mean temperature as
// a smooth line on the right axis; the crosshair reads both.
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { rain: "Precipitation (mm)", temperature: "Temperature (°C)" },
  zh: { rain: "降水量（毫米）", temperature: "气温（°C）" },
  ja: { rain: "降水量（mm）", temperature: "気温（°C）" },
  fr: { rain: "Précipitations (mm)", temperature: "Température (°C)" },
};
const MONTHS = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  zh: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  ja: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

const RAIN = [52, 41, 48, 55, 68, 71, 64, 62, 55, 64, 63, 60];
const TEMPERATURE = [
  3.5, 4.2, 7.6, 10.7, 14.5, 17.6, 19.8, 19.6, 16.4, 12.3, 7.6, 4.4,
];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaMixedChart>("#climate")!;
  chart.series = [
    {
      name: text.rain,
      type: "bar",
      color: "var(--chart-series-2, #0ea5e9)",
      data: RAIN.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.temperature,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      color: "var(--chart-series-4, #ef4444)",
      data: TEMPERATURE.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category" }, crosshair: true };
}

```

## Example: Revenue and growth on two axes

Revenue as bars on the left axis, the growth rate as a line on the right axis (yAxis: "right").

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/mixed-chart/wc/revenue-growth.html

```html
<minerva-mixed-chart id="revenue" height="300"></minerva-mixed-chart>

```

### apps/docs/src/docs/pages/mixed-chart/wc/revenue-growth.ts

```tsx
// Bars and a line on two value axes: the series with `yAxis: "right"` use
// `options.yAxis2` (its ticks are aligned on the left grid).
import type { MinervaMixedChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { revenue: "Revenue (k€)", growth: "Growth" },
  zh: { revenue: "收入（千欧元）", growth: "增长率" },
  ja: { revenue: "売上（千ユーロ）", growth: "成長率" },
  fr: { revenue: "Chiffre d’affaires (k€)", growth: "Croissance" },
};
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月"],
  fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin"],
};

const REVENUE = [182, 196, 214, 205, 238, 261];
// month-over-month growth, %
const GROWTH = REVENUE.map((y, i) =>
  i ? Math.round((y / REVENUE[i - 1] - 1) * 1000) / 10 : 0,
);

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaMixedChart>("#revenue")!;
  chart.series = [
    {
      name: text.revenue,
      type: "bar",
      data: REVENUE.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.growth,
      type: "line",
      curve: "smooth",
      yAxis: "right",
      data: GROWTH.map((y, i) => ({ x: months[i], y })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis2: { format: (value) => `${value} %` },
  };
}

```
