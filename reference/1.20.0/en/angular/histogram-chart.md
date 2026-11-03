# Histogram

The distribution of raw samples in bins of equal width, from a few hundred values to millions.

Package: minerva-design@1.20.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Requests

Distribution of one million request latencies with p50, p95 and p99

Binning rule

Auto

Sturges

10 bins

40 bins

Students

Score

Distribution of the exam scores

Customers

Age

Age distribution of the customers

Control

New onboarding

Session duration (minutes)

Session durations of the two groups of an A/B test

Normal fit

LSL

USL

Nominal

Tool adjusted

Mean {{mean}}, σ {{sd}}, Cpk {{cpk}}, {{ppm}} ppm out of tolerance:

capable

not capable

Parts

Diameter

Distribution of the shaft diameters with the specification limits and a fitted normal curve

Free shipping

Median {{value}}

p99 {{value}}

{{share}} of the orders reach the free shipping threshold of {{threshold}}.

Orders

Order value (log scale)

Distribution of the order values on a logarithmic scale

Pause

Resume

Reset

{{share}} of the calls answered within {{target}}, p90 {{p90}}:

target met

target missed

Calls

Wait time

Target

p90

Live distribution of the wait times of the last 600 support calls

{{share}} of the employees

{{value}} employees ({{share}})

Click for the cumulative share

Click a bar to see the share of employees with a shorter commute.

{{share}} of the employees ({{employees}}) commute {{limit}} or less.

Employees

One-way commute

Distribution of the commute times of the employees

## HistogramChart

Support: beta

Native Angular: MnHistogramChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHistogramChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "values",
    "typeText": "ArrayLike<number>",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "bins",
    "typeText": "HistogramBinning | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "domain",
    "typeText": "readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "nice",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "formatBin",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Latency distribution

One million request latencies binned in a few milliseconds; quantiles gives the exact p50, p95 and p99, drawn as x reference lines.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<mn-histogram-chart
  [values]="latency"
  [name]="t.requests"
  [xAxis]="{ title: t.ms }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  latency = Array.from({ length: 5000 }, (_, i) => Math.round(Math.exp(4.8 + 0.35 * Math.sqrt(-2 * Math.log(1 - (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1))) * Math.cos(2 * Math.PI * (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1)))));
  labels = {
  "en": {
    "requests": "Requests",
    "ms": "Response time (ms)"
  },
  "zh": {
    "requests": "请求数",
    "ms": "响应时间（毫秒）"
  },
  "ja": {
    "requests": "リクエスト数",
    "ms": "応答時間（ms）"
  },
  "fr": {
    "requests": "Requêtes",
    "ms": "Temps de réponse (ms)"
  }
};
}

```

## Example: Binning rules

bins takes a count or a rule: auto (Freedman-Diaconis, robust to outliers), sturges (log2 n + 1) or a fixed number; the two groups of levels appear with enough bins.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<div style="display: flex; gap: 8px; align-items: center">
  <span>{{ t.bins }}</span>
  <button type="button" (click)="bins = 'sturges'">Sturges</button>
  <button type="button" (click)="bins = 10">10</button>
  <button type="button" (click)="bins = 40">40</button>
</div>
<mn-histogram-chart
  [values]="ages"
  [bins]="bins"
  [name]="t.count"
  [xAxis]="{ title: t.age }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  bins: number | 'sturges' = "sturges";
  ages = Array.from({ length: 2000 }, (_, i) => Math.round((i % 3 ? 42 : 22) + ((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) - 1) * (i % 3 ? 16 : 6)));
  labels = {
  "en": {
    "count": "Count",
    "bins": "Bins:",
    "age": "Age"
  },
  "zh": {
    "count": "人数",
    "bins": "分箱：",
    "age": "年龄"
  },
  "ja": {
    "count": "人数",
    "bins": "ビン：",
    "age": "年齢"
  },
  "fr": {
    "count": "Effectif",
    "bins": "Classes :",
    "age": "Âge"
  }
};
}

```
