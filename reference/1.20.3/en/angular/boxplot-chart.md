# Box plot

Medians, quartiles, whiskers and outliers to compare distributions, from raw samples or computed statistics. Outliers are rings of the series color: hover one to read its value and group.

Package: minerva-design@1.20.3

Renderer: angular

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

Gateway

Auth

Search

Checkout

Recommendations

Images

Response time

Max

Q3

Median

Q1

Min

Outliers

Distribution of the response time of each service

Yearly salary

Junior developer

Developer

Senior developer

Tech lead

Engineering manager

Distribution of the salaries per role

Weekdays

Weekends

Paris

Lyon

Marseille

Lille

Delivery time (hours)

Delivery times per city on weekdays and weekends

Daily high

Mean

Distribution of the daily high temperatures per month

Lint

Unit tests

Integration

End-to-end

Release

Whisker reach

1.5 × IQR

3 × IQR

Min – max

Outlier shape

Hollow

Filled

{{value}} runs drawn as outliers

Build time

Distribution of the build durations of each CI pipeline

Click a box or an outlier.

{{day}}: a patient waited {{value}}.

{{day}}: median wait {{median}}, half of the patients waited between {{q1}} and {{q3}}, {{outliers}} outliers.

Wait

Four-hour target

Distribution of the emergency room waits per day of the week

Style sheets

Scripts

Fonts

Images

Videos

Log scale

{{value}} files are over the budget of {{budget}}.

File size

Budget

Distribution of the file sizes of a website by type

US East

US West

EU West

Asia Pacific South

South America East

Pause

Resume

SLA at risk in {{regions}}

Every region is within the SLA

Latency

SLA

Live distribution of the request latency in each region

## BoxPlotChart

Support: beta

Native Angular: MnBoxPlotChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBoxPlotChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierShape",
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierSize",
    "typeText": "number | undefined",
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

## Example: Response time per service

groups takes the raw samples of every box: the quartiles, the whiskers (1.5 interquartile ranges) and the outliers are computed; tooltip.labels translates the rows of the tooltip.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.services[0], values: samples[0] },
    { x: t.services[1], values: samples[1] },
    { x: t.services[2], values: samples[2] },
    { x: t.services[3], values: samples[3] }
  ]"
  [name]="t.time"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ title: t.time }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  samples = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260]
];
  labels = {
  "en": {
    "time": "Response time (ms)",
    "services": ["Search", "Checkout", "Profile", "Images"]
  },
  "zh": {
    "time": "响应时间（毫秒）",
    "services": ["搜索", "结账", "个人资料", "图片"]
  },
  "ja": {
    "time": "応答時間（ms）",
    "services": ["検索", "決済", "プロフィール", "画像"]
  },
  "fr": {
    "time": "Temps de réponse (ms)",
    "services": ["Recherche", "Paiement", "Profil", "Images"]
  }
};
}

```

## Example: Horizontal

Statistics already computed (one datum with low, q1, y as the median, q3, high and outliers per box) in rows with orientation: "horizontal".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.classes[0], values: scores[0] },
    { x: t.classes[1], values: scores[1] },
    { x: t.classes[2], values: scores[2] }
  ]"
  [name]="t.score"
  orientation="horizontal"
  whisker="minmax"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ min: 0, max: 100 }"
  [height]="240"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  scores = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83]
];
  labels = {
  "en": {
    "score": "Score",
    "classes": ["Class A", "Class B", "Class C"]
  },
  "zh": {
    "score": "分数",
    "classes": ["一班", "二班", "三班"]
  },
  "ja": {
    "score": "得点",
    "classes": ["A 組", "B 組", "C 組"]
  },
  "fr": {
    "score": "Note",
    "classes": ["Classe A", "Classe B", "Classe C"]
  }
};
}

```
