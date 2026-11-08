# Combination chart

Bars, lines and areas in one chart, on one or two value axes: revenue and growth, rainfall and temperature, Pareto charts.

Package: minerva-design@1.23.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnMixedChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMixedChart"
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
    "name": "yAxis2",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "stackMode",
    "typeText": "\"normal\" | \"percent\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Revenue and growth

The growth line sets yAxis: "right" and is drawn against yAxis2 with its own format; the right range is aligned on the left ticks, so the grid fits both axes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMixedChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMixedChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.revenue, type: 'bar', data: [{ x: m[0], y: 182 }, { x: m[1], y: 196 }, { x: m[2], y: 214 }, { x: m[3], y: 205 }, { x: m[4], y: 238 }, { x: m[5], y: 261 }] },
    { name: t.growth, type: 'line', curve: 'smooth', yAxis: 'right', data: [{ x: m[0], y: 0 }, { x: m[1], y: 7.7 }, { x: m[2], y: 9.2 }, { x: m[3], y: -4.2 }, { x: m[4], y: 16.1 }, { x: m[5], y: 9.7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "revenue": "Revenue (k€)",
    "growth": "Growth"
  },
  "zh": {
    "revenue": "收入（千欧元）",
    "growth": "增长率"
  },
  "ja": {
    "revenue": "売上（千ユーロ）",
    "growth": "成長率"
  },
  "fr": {
    "revenue": "Chiffre d’affaires (k€)",
    "growth": "Croissance"
  }
};
  months = {
  "en": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  "zh": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "ja": ["1月", "2月", "3月", "4月", "5月", "6月"],
  "fr": ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
};
}

```

## Example: Climate chart

Rainfall bars on the left axis and the temperature curve on the right axis; zero: true keeps zero in the right range.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMixedChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMixedChart],
  template: `
@let t = labels[language()];
@let m = months[language()];
<mn-mixed-chart
  [series]="[
    { name: t.rain, type: 'bar', color: 'var(--chart-series-2, #0ea5e9)', data: [{ x: m[0], y: 52 }, { x: m[1], y: 41 }, { x: m[2], y: 48 }, { x: m[3], y: 55 }, { x: m[4], y: 68 }, { x: m[5], y: 71 }, { x: m[6], y: 64 }, { x: m[7], y: 62 }, { x: m[8], y: 55 }, { x: m[9], y: 64 }, { x: m[10], y: 63 }, { x: m[11], y: 60 }] },
    { name: t.temperature, type: 'line', curve: 'smooth', yAxis: 'right', color: 'var(--chart-series-4, #ef4444)', data: [{ x: m[0], y: 3.5 }, { x: m[1], y: 4.2 }, { x: m[2], y: 7.6 }, { x: m[3], y: 10.7 }, { x: m[4], y: 14.5 }, { x: m[5], y: 17.6 }, { x: m[6], y: 19.8 }, { x: m[7], y: 19.6 }, { x: m[8], y: 16.4 }, { x: m[9], y: 12.3 }, { x: m[10], y: 7.6 }, { x: m[11], y: 4.4 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  crosshair
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "rain": "Precipitation (mm)",
    "temperature": "Temperature (°C)"
  },
  "zh": {
    "rain": "降水量（毫米）",
    "temperature": "气温（°C）"
  },
  "ja": {
    "rain": "降水量（mm）",
    "temperature": "気温（°C）"
  },
  "fr": {
    "rain": "Précipitations (mm)",
    "temperature": "Température (°C)"
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
