# Heatmap

A grid of cells colored by value, over categories or numbers on both axes: activity by weekday and hour, correlation matrices, maps of a measure. Hover a cell to lift it, highlight its row and column and mark its value on the color legend.

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

Sessions

Sessions by weekday and hour of the day

Anomaly

Monthly temperature anomaly, 1995 to 2024

Signal

Wi-Fi signal strength over a 200 by 100 meter floor

{{cells}} cells · drawn with {{renderer}} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset

Contributions

Contributions per day over one year

{{total}} contributions in the last year

Sessions

Page views

Sign-ups

Revenue

Churn

Support tickets

Correlation

Correlation matrix of six product metrics

Month {{n}}

Retained

Retention of monthly signup cohorts

Desktop

Mobile

Tablet

Organic search

Paid search

Social

Email

Referral

Direct

{{source}} on {{device}}: {{orders}} orders from {{sessions}} sessions, {{rate}}:

above the average of {{value}}

below the average of {{value}}

Click a cell to see its sessions and orders.

Conversion rate

Conversion rate by traffic source and device

Rack {{n}}

Sensor {{n}}

Pause

Resume

Hottest: {{rack}}, {{sensor}} at {{value}} · {{alarms}} sensors above {{limit}}

Inlet temperature

Live inlet temperatures of the sensors of ten server racks

Cat

Dog

Bird

Car

Truck

Actual {{actual}}, predicted {{predicted}}

{{value}} images ({{share}} of the class)

Recall: {{value}}

Precision: {{value}}

Misclassified

Accuracy: {{value}} of {{images}} test images

Share of the class

Predicted class

Actual class

Confusion matrix of an image classifier over five classes

North

South

East

West

Central

Q{{n}}

Metric

Revenue

Growth over 2025

Gross margin

{{region}} in {{quarter}}

Best: {{best}} ({{bestValue}}) · weakest: {{worst}} ({{worstValue}})

Sales metrics of 2026 by region and quarter

## HeatmapChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/heatmap-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "colorScale",
    "typeText": "readonly string[] | \"sequential\" | \"diverging\"",
    "attribute": "color-scale",
    "required": false
  },
  {
    "name": "colorMidpoint",
    "typeText": "number | undefined",
    "attribute": "color-midpoint",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "number | undefined",
    "attribute": "radius",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly HeatmapCell[] | undefined",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "valueRange",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
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

## Example: Diverging color scale

A correlation matrix on a fixed -1 to 1 range: blue for negative values, red for positive ones, rounded cells.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/wc/color-scale.html

```html
<minerva-heatmap-chart
  id="correlation"
  radius="4"
  height="320"
></minerva-heatmap-chart>

```

### apps/docs/src/docs/pages/heatmap-chart/wc/color-scale.ts

```tsx
// A diverging color scale over a fixed value range (-1 to 1): negative
// correlations in blue, positive ones in red.
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    correlation: "Correlation",
    metrics: ["Price", "Rating", "Delivery", "Returns", "Sales"],
  },
  zh: {
    correlation: "相关系数",
    metrics: ["价格", "评分", "配送", "退货", "销量"],
  },
  ja: {
    correlation: "相関係数",
    metrics: ["価格", "評価", "配送", "返品", "売上"],
  },
  fr: {
    correlation: "Corrélation",
    metrics: ["Prix", "Note", "Livraison", "Retours", "Ventes"],
  },
};

const MATRIX = [
  [1, -0.32, 0.12, 0.41, -0.58],
  [-0.32, 1, -0.44, -0.61, 0.72],
  [0.12, -0.44, 1, 0.35, -0.27],
  [0.41, -0.61, 0.35, 1, -0.49],
  [-0.58, 0.72, -0.27, -0.49, 1],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHeatmapChart>("#correlation")!;
  chart.data = MATRIX.flatMap((row, r) =>
    row.map((value, c) => ({
      x: text.metrics[c],
      y: text.metrics[r],
      value,
    })),
  );
  chart.colorScale = ["#2563eb", "#f8fafc", "#dc2626"];
  chart.valueRange = [-1, 1];
  chart.valueName = text.correlation;
  chart.format = (value) => value.toFixed(2);
}

```

## Example: Weekly activity

Commits per day and time slot; the categories set the order of the columns and rows.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/wc/weekly-activity.html

```html
<minerva-heatmap-chart id="activity" height="300"></minerva-heatmap-chart>

```

### apps/docs/src/docs/pages/heatmap-chart/wc/weekly-activity.ts

```tsx
// `data` holds { x, y, value } cells; categories set the order of the
// columns and rows (rows from bottom to top).
import type { MinervaHeatmapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    commits: "Commits",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  zh: {
    commits: "提交数",
    days: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  ja: {
    commits: "コミット数",
    days: ["月", "火", "水", "木", "金", "土", "日"],
  },
  fr: {
    commits: "Commits",
    days: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
  },
};

const HOURS = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHeatmapChart>("#activity")!;
  chart.data = text.days.flatMap((day, d) =>
    HOURS.map((hour, h) => ({
      x: hour,
      y: day,
      value:
        d < 5 && h > 1 && h < 5
          ? 20 + ((d * 7 + h * 5) % 13)
          : (d * 3 + h * 2) % 6,
    })),
  );
  chart.xCategories = HOURS;
  chart.yCategories = [...text.days].reverse();
  chart.valueName = text.commits;
}

```
