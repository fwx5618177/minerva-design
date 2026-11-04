# Range area chart

Bands between a lower and an upper edge: confidence intervals, forecasts, min-max ranges and percentile fans.

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

Support: beta

Native Angular: MnRangeAreaChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRangeAreaChart"
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
    "name": "curve",
    "typeText": "ChartCurve",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Forecast with confidence bands

Each point of an area sets its lower edge with y0: the 80% and 95% intervals widen with the horizon, the history and the forecast are lines; lineWidth: 0 hides the edges of the bands.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, data: [{ x: m[5], y0: 158, y: 158 }, { x: m[6], y0: 159, y: 167 }, { x: m[7], y0: 161, y: 177 }, { x: m[8], y0: 160, y: 184 }, { x: m[9], y0: 162, y: 194 }, { x: m[10], y0: 165, y: 205 }, { x: m[11], y0: 166, y: 214 }] },
    { name: t.actual, type: 'line', data: [{ x: m[0], y: 120 }, { x: m[1], y: 132 }, { x: m[2], y: 128 }, { x: m[3], y: 141 }, { x: m[4], y: 150 }, { x: m[5], y: 158 }] },
    { name: t.forecast, type: 'line', lineWidth: 1, data: [{ x: m[5], y: 158 }, { x: m[6], y: 163 }, { x: m[7], y: 169 }, { x: m[8], y: 172 }, { x: m[9], y: 178 }, { x: m[10], y: 185 }, { x: m[11], y: 190 }] }
  ]"
  [xAxis]="{ type: 'category', categories: m }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "actual": "Actual",
    "forecast": "Forecast",
    "band": "80 % interval"
  },
  "zh": {
    "actual": "实际",
    "forecast": "预测",
    "band": "80% 置信区间"
  },
  "ja": {
    "actual": "実績",
    "forecast": "予測",
    "band": "80% 予測区間"
  },
  "fr": {
    "actual": "Réel",
    "forecast": "Prévision",
    "band": "Intervalle à 80 %"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
};
}

```

## Example: Daily minimum and maximum

A year of daily temperature ranges with the seasonal normal: the tooltip shows both ends of the band, Ctrl / ⌘ + wheel zooms on single days.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
@let d = days[language()];
<mn-range-area-chart
  [series]="[
    { name: t.range, data: [{ x: d[0], y0: 8, y: 16 }, { x: d[1], y0: 9, y: 18 }, { x: d[2], y0: 7, y: 15 }, { x: d[3], y0: 11, y: 21 }, { x: d[4], y0: 13, y: 24 }, { x: d[5], y0: 12, y: 22 }, { x: d[6], y0: 10, y: 19 }] },
    { name: t.mean, type: 'line', data: [{ x: d[0], y: 12 }, { x: d[1], y: 13.5 }, { x: d[2], y: 11 }, { x: d[3], y: 16 }, { x: d[4], y: 18.5 }, { x: d[5], y: 17 }, { x: d[6], y: 14.5 }] }
  ]"
  curve="linear"
  [xAxis]="{ type: 'category' }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "range": "Min – max",
    "mean": "Average"
  },
  "zh": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "ja": {
    "range": "最低 – 最高",
    "mean": "平均"
  },
  "fr": {
    "range": "Min – max",
    "mean": "Moyenne"
  }
};
  days = {
  "en": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  "zh": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  "ja": ["月", "火", "水", "木", "金", "土", "日"],
  "fr": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
};
}

```
