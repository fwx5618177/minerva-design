# Histogram

The distribution of raw samples in bins of equal width, from a few hundred values to millions.

Package: minerva-design@1.21.0

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/histogram-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "bins",
    "typeText": "HistogramBinning",
    "attribute": "bins",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "values",
    "typeText": "ArrayLike<number> | undefined",
    "required": false
  },
  {
    "name": "domain",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "nice",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "formatBin",
    "typeText": "(value: number) => string | undefined",
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

## Example: Binning rules

The same ages in Sturges bins, 10 or 40 bins: the two groups of customers appear with enough bins.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/wc/binning.html

```html
<div style="display: grid; gap: 8px">
  <div style="display: flex; gap: 8px; align-items: center">
    <span id="label"></span>
    <button id="sturges" type="button">Sturges</button>
    <button id="ten" type="button">10</button>
    <button id="forty" type="button">40</button>
  </div>
  <minerva-histogram-chart
    id="ages"
    bins="sturges"
    height="280"
  ></minerva-histogram-chart>
</div>

```

### apps/docs/src/docs/pages/histogram-chart/wc/binning.ts

```tsx
// The same samples in fewer or more bins: `bins` takes a count or a rule
// (`sturges`, `freedman-diaconis`, `auto`); two groups appear with enough bins.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#ages")!;
  const label = root.querySelector<HTMLSpanElement>("#label")!;
  const sturges = root.querySelector<HTMLButtonElement>("#sturges")!;
  const ten = root.querySelector<HTMLButtonElement>("#ten")!;
  const forty = root.querySelector<HTMLButtonElement>("#forty")!;
  chart.values = AGES;
  chart.valueName = text.count;
  chart.options = { xAxis: { title: text.age } };
  label.textContent = text.bins;
  const useSturges = () => {
    chart.bins = "sturges";
  };
  const useTen = () => {
    chart.bins = 10;
  };
  const useForty = () => {
    chart.bins = 40;
  };
  sturges.addEventListener("click", useSturges);
  ten.addEventListener("click", useTen);
  forty.addEventListener("click", useForty);
  return () => {
    sturges.removeEventListener("click", useSturges);
    ten.removeEventListener("click", useTen);
    forty.removeEventListener("click", useForty);
  };
}

```

## Example: Response time distribution

5,000 raw samples binned by the chart (Freedman-Diaconis): the long tail of slow requests shows at once.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/wc/latency.html

```html
<minerva-histogram-chart id="latency" height="300"></minerva-histogram-chart>

```

### apps/docs/src/docs/pages/histogram-chart/wc/latency.ts

```tsx
// <minerva-histogram-chart> bins raw samples itself (`bins="auto"`:
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#latency")!;
  chart.values = LATENCY;
  chart.valueName = text.requests;
  chart.options = { xAxis: { title: text.ms } };
}

```
