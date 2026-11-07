# Box plot

Medians, quartiles, whiskers and outliers to compare distributions, from raw samples or computed statistics. Outliers are rings of the series color: hover one to read its value and group.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/box-plot-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\"",
    "attribute": "whisker",
    "required": false
  },
  {
    "name": "outlierShape",
    "typeText": "\"hollow\" | \"filled\"",
    "attribute": "outlier-shape",
    "required": false
  },
  {
    "name": "outlierSize",
    "typeText": "number",
    "attribute": "outlier-size",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
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

## Example: Horizontal boxes, min-max whiskers

Boxes laid out in rows; whiskers reaching the minimum and the maximum (no outliers).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.html

```html
<minerva-box-plot-chart
  id="scores"
  orientation="horizontal"
  whisker="minmax"
  height="240"
></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/horizontal.ts

```tsx
// `orientation="horizontal"` lays the boxes out in rows; `whisker="minmax"`
// extends the whiskers to the extremes (no outliers).
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { score: "Score", classes: ["Class A", "Class B", "Class C"] },
  zh: { score: "分数", classes: ["一班", "二班", "三班"] },
  ja: { score: "得点", classes: ["A 組", "B 組", "C 組"] },
  fr: { score: "Note", classes: ["Classe A", "Classe B", "Classe C"] },
};

const SCORES = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#scores")!;
  chart.groups = text.classes.map((x, i) => ({ x, values: SCORES[i] }));
  chart.valueName = text.score;
  chart.options = { xAxis: { type: "category" }, yAxis: { min: 0, max: 100 } };
}

```

## Example: Response times per service

Raw samples per service: quartiles, Tukey whiskers and outliers are computed by the chart.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/wc/services.html

```html
<minerva-box-plot-chart id="services" height="300"></minerva-box-plot-chart>

```

### apps/docs/src/docs/pages/boxplot-chart/wc/services.ts

```tsx
// Raw samples per service (`groups`): the element computes the quartiles,
// Tukey whiskers (1.5 IQR) and draws the outliers as dots.
import type { MinervaBoxPlotChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    time: "Response time (ms)",
    services: ["Search", "Checkout", "Profile", "Images"],
  },
  zh: {
    time: "响应时间（毫秒）",
    services: ["搜索", "结账", "个人资料", "图片"],
  },
  ja: {
    time: "応答時間（ms）",
    services: ["検索", "決済", "プロフィール", "画像"],
  },
  fr: {
    time: "Temps de réponse (ms)",
    services: ["Recherche", "Paiement", "Profil", "Images"],
  },
};

// response times (ms) sampled per service
const SAMPLES = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBoxPlotChart>("#services")!;
  chart.groups = text.services.map((x, i) => ({ x, values: SAMPLES[i] }));
  chart.valueName = text.time;
  chart.options = { xAxis: { type: "category" }, yAxis: { title: text.time } };
}

```
