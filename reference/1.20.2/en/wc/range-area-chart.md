# Range area chart

Bands between a lower and an upper edge: confidence intervals, forecasts, min-max ranges and percentile fans.

Package: minerva-design@1.20.2

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

95% interval

80% interval

Actual

Forecast

Orders

Today

Monthly orders with a 12-month forecast and its confidence intervals

Min – max

Seasonal normal

Daily minimum and maximum temperatures over a year

5th – 95th percentile

25th – 75th percentile

Median

Percentiles of the response time over a day

Low – high

Close

Daily trading range and closing price over six months

Expected ± {{k}}σ

Measured

Anomalies

Sensitivity

{{k}}σ band

Requests per minute

API requests per minute over a week, with the expected band and the anomalies outside it

No point outside the band.

Anomalies: {{n}}, the latest on {{latest}}.

Bid – ask

Mid price

Pause

Resume

Bid {{bid}} · Ask {{ask}}

Spread {{value}} bps

Live bid and ask prices of a currency pair over the last minute, with the mid price

Low emissions (SSP1-2.6)

Low emissions, likely range

Very high emissions (SSP5-8.5)

Very high emissions, likely range

Observed

{{value}} limit

Warming since 1850–1900

Global warming observed since 1950 and projected to 2100 under a low and a very high emission scenario

With low emissions the median passes {{lowLimit}} around {{low}} and levels off at {{peak}}; with very high emissions it passes {{highLimit}} around {{high}}.

{{level}} confidence interval

Lift

No difference

Significant

Confidence level

Day of the test

Conversion lift of B over A

Cumulative conversion lift of variant B over variant A during a 28-day test, with its confidence interval

B is ahead by {{lift}}, but the {{level}} interval still includes zero.

B converts {{lift}} better ({{low}} to {{high}} at {{level}}), significant since day {{day}}.

## RangeAreaChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/range-area-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
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

## Example: Forecast with an uncertainty band

A band from y0 to y widens with the horizon; the actual values and the forecast are line series.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/wc/forecast.html

```html
<minerva-range-area-chart id="forecast" height="300"></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/range-area-chart/wc/forecast.ts

```tsx
// A forecast with its uncertainty: the band (`y0` - `y`) widens with the
// horizon; the actual values and the forecast are lines (`type: "line"`).
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { actual: "Actual", forecast: "Forecast", band: "80 % interval" },
  zh: { actual: "实际", forecast: "预测", band: "80% 置信区间" },
  ja: { actual: "実績", forecast: "予測", band: "80% 予測区間" },
  fr: { actual: "Réel", forecast: "Prévision", band: "Intervalle à 80 %" },
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

const ACTUAL = [120, 132, 128, 141, 150, 158];
const FORECAST = [158, 163, 169, 172, 178, 185, 190];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const months = MONTHS[lang] ?? MONTHS.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#forecast")!;
  chart.series = [
    {
      name: text.band,
      data: FORECAST.map((y, i) => ({
        x: months[5 + i],
        y0: y - 4 * i,
        y: y + 4 * i,
      })),
    },
    {
      name: text.actual,
      type: "line",
      data: ACTUAL.map((y, i) => ({ x: months[i], y })),
    },
    {
      name: text.forecast,
      type: "line",
      lineWidth: 1,
      data: FORECAST.map((y, i) => ({ x: months[5 + i], y })),
    },
  ];
  chart.options = { xAxis: { type: "category", categories: months } };
}

```

## Example: Daily temperature range

Minimum and maximum of each day as a band, the average as a line; straight edges keep the measured values.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/range-area-chart/wc/temperature.html

```html
<minerva-range-area-chart
  id="temperature"
  curve="linear"
  height="280"
></minerva-range-area-chart>

```

### apps/docs/src/docs/pages/range-area-chart/wc/temperature.ts

```tsx
// Daily minimum and maximum temperatures as a band, the average as a line;
// `curve="linear"` keeps the measured values at the corners.
import type { MinervaRangeAreaChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { range: "Min – max", mean: "Average" },
  zh: { range: "最低 – 最高", mean: "平均" },
  ja: { range: "最低 – 最高", mean: "平均" },
  fr: { range: "Min – max", mean: "Moyenne" },
};
const DAYS = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  zh: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
  fr: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
};

const LOW = [8, 9, 7, 11, 13, 12, 10];
const HIGH = [16, 18, 15, 21, 24, 22, 19];

export function setup(root: HTMLElement) {
  const lang = document.documentElement.lang as keyof typeof TEXT;
  const text = TEXT[lang] ?? TEXT.en;
  const days = DAYS[lang] ?? DAYS.en;
  const chart = root.querySelector<MinervaRangeAreaChart>("#temperature")!;
  chart.series = [
    {
      name: text.range,
      data: days.map((x, i) => ({ x, y0: LOW[i], y: HIGH[i] })),
    },
    {
      name: text.mean,
      type: "line",
      data: days.map((x, i) => ({ x, y: (LOW[i] + HIGH[i]) / 2 })),
    },
  ];
  chart.options = {
    xAxis: { type: "category" },
    yAxis: { format: (value) => `${value} °C` },
  };
}

```
