# Heatmap

A grid of cells colored by value, over categories or numbers on both axes: activity by weekday and hour, correlation matrices, maps of a measure. Hover a cell to lift it, highlight its row and column and mark its value on the color legend.

Package: minerva-design@1.22.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnHeatmapChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHeatmapChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly HeatmapCell[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xCategories",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yCategories",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "colorScale",
    "typeText": "readonly string[] | ChartColorScheme | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "valueRange",
    "typeText": "readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "colorMidpoint",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "radius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Weekly activity

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHeatmapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHeatmapChart],
  template: `
@let t = labels[language()];
<mn-heatmap-chart
  [data]="cells[language()]"
  [xCategories]="hours"
  [yCategories]="t.rows"
  [name]="t.commits"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hours = ["0–4", "4–8", "8–12", "12–16", "16–20", "20–24"];
  cells = {
  "en": [
    {
      "x": "0–4",
      "y": "Mon",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "Mon",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "Mon",
      "value": 30
    },
    {
      "x": "12–16",
      "y": "Mon",
      "value": 22
    },
    {
      "x": "16–20",
      "y": "Mon",
      "value": 27
    },
    {
      "x": "20–24",
      "y": "Mon",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "Tue",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "Tue",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "Tue",
      "value": 24
    },
    {
      "x": "12–16",
      "y": "Tue",
      "value": 29
    },
    {
      "x": "16–20",
      "y": "Tue",
      "value": 21
    },
    {
      "x": "20–24",
      "y": "Tue",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "Wed",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "Wed",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "Wed",
      "value": 31
    },
    {
      "x": "12–16",
      "y": "Wed",
      "value": 23
    },
    {
      "x": "16–20",
      "y": "Wed",
      "value": 28
    },
    {
      "x": "20–24",
      "y": "Wed",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "Thu",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "Thu",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "Thu",
      "value": 25
    },
    {
      "x": "12–16",
      "y": "Thu",
      "value": 30
    },
    {
      "x": "16–20",
      "y": "Thu",
      "value": 22
    },
    {
      "x": "20–24",
      "y": "Thu",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "Fri",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "Fri",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "Fri",
      "value": 32
    },
    {
      "x": "12–16",
      "y": "Fri",
      "value": 24
    },
    {
      "x": "16–20",
      "y": "Fri",
      "value": 29
    },
    {
      "x": "20–24",
      "y": "Fri",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "Sat",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "Sat",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "Sat",
      "value": 1
    },
    {
      "x": "12–16",
      "y": "Sat",
      "value": 3
    },
    {
      "x": "16–20",
      "y": "Sat",
      "value": 5
    },
    {
      "x": "20–24",
      "y": "Sat",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "Sun",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "Sun",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "Sun",
      "value": 4
    },
    {
      "x": "12–16",
      "y": "Sun",
      "value": 0
    },
    {
      "x": "16–20",
      "y": "Sun",
      "value": 2
    },
    {
      "x": "20–24",
      "y": "Sun",
      "value": 4
    }
  ],
  "zh": [
    {
      "x": "0–4",
      "y": "周一",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "周一",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "周一",
      "value": 30
    },
    {
      "x": "12–16",
      "y": "周一",
      "value": 22
    },
    {
      "x": "16–20",
      "y": "周一",
      "value": 27
    },
    {
      "x": "20–24",
      "y": "周一",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "周二",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "周二",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "周二",
      "value": 24
    },
    {
      "x": "12–16",
      "y": "周二",
      "value": 29
    },
    {
      "x": "16–20",
      "y": "周二",
      "value": 21
    },
    {
      "x": "20–24",
      "y": "周二",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "周三",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "周三",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "周三",
      "value": 31
    },
    {
      "x": "12–16",
      "y": "周三",
      "value": 23
    },
    {
      "x": "16–20",
      "y": "周三",
      "value": 28
    },
    {
      "x": "20–24",
      "y": "周三",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "周四",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "周四",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "周四",
      "value": 25
    },
    {
      "x": "12–16",
      "y": "周四",
      "value": 30
    },
    {
      "x": "16–20",
      "y": "周四",
      "value": 22
    },
    {
      "x": "20–24",
      "y": "周四",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "周五",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "周五",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "周五",
      "value": 32
    },
    {
      "x": "12–16",
      "y": "周五",
      "value": 24
    },
    {
      "x": "16–20",
      "y": "周五",
      "value": 29
    },
    {
      "x": "20–24",
      "y": "周五",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "周六",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "周六",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "周六",
      "value": 1
    },
    {
      "x": "12–16",
      "y": "周六",
      "value": 3
    },
    {
      "x": "16–20",
      "y": "周六",
      "value": 5
    },
    {
      "x": "20–24",
      "y": "周六",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "周日",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "周日",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "周日",
      "value": 4
    },
    {
      "x": "12–16",
      "y": "周日",
      "value": 0
    },
    {
      "x": "16–20",
      "y": "周日",
      "value": 2
    },
    {
      "x": "20–24",
      "y": "周日",
      "value": 4
    }
  ],
  "ja": [
    {
      "x": "0–4",
      "y": "月",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "月",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "月",
      "value": 30
    },
    {
      "x": "12–16",
      "y": "月",
      "value": 22
    },
    {
      "x": "16–20",
      "y": "月",
      "value": 27
    },
    {
      "x": "20–24",
      "y": "月",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "火",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "火",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "火",
      "value": 24
    },
    {
      "x": "12–16",
      "y": "火",
      "value": 29
    },
    {
      "x": "16–20",
      "y": "火",
      "value": 21
    },
    {
      "x": "20–24",
      "y": "火",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "水",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "水",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "水",
      "value": 31
    },
    {
      "x": "12–16",
      "y": "水",
      "value": 23
    },
    {
      "x": "16–20",
      "y": "水",
      "value": 28
    },
    {
      "x": "20–24",
      "y": "水",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "木",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "木",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "木",
      "value": 25
    },
    {
      "x": "12–16",
      "y": "木",
      "value": 30
    },
    {
      "x": "16–20",
      "y": "木",
      "value": 22
    },
    {
      "x": "20–24",
      "y": "木",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "金",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "金",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "金",
      "value": 32
    },
    {
      "x": "12–16",
      "y": "金",
      "value": 24
    },
    {
      "x": "16–20",
      "y": "金",
      "value": 29
    },
    {
      "x": "20–24",
      "y": "金",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "土",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "土",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "土",
      "value": 1
    },
    {
      "x": "12–16",
      "y": "土",
      "value": 3
    },
    {
      "x": "16–20",
      "y": "土",
      "value": 5
    },
    {
      "x": "20–24",
      "y": "土",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "日",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "日",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "日",
      "value": 4
    },
    {
      "x": "12–16",
      "y": "日",
      "value": 0
    },
    {
      "x": "16–20",
      "y": "日",
      "value": 2
    },
    {
      "x": "20–24",
      "y": "日",
      "value": 4
    }
  ],
  "fr": [
    {
      "x": "0–4",
      "y": "lun.",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "lun.",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "lun.",
      "value": 30
    },
    {
      "x": "12–16",
      "y": "lun.",
      "value": 22
    },
    {
      "x": "16–20",
      "y": "lun.",
      "value": 27
    },
    {
      "x": "20–24",
      "y": "lun.",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "mar.",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "mar.",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "mar.",
      "value": 24
    },
    {
      "x": "12–16",
      "y": "mar.",
      "value": 29
    },
    {
      "x": "16–20",
      "y": "mar.",
      "value": 21
    },
    {
      "x": "20–24",
      "y": "mar.",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "mer.",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "mer.",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "mer.",
      "value": 31
    },
    {
      "x": "12–16",
      "y": "mer.",
      "value": 23
    },
    {
      "x": "16–20",
      "y": "mer.",
      "value": 28
    },
    {
      "x": "20–24",
      "y": "mer.",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "jeu.",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "jeu.",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "jeu.",
      "value": 25
    },
    {
      "x": "12–16",
      "y": "jeu.",
      "value": 30
    },
    {
      "x": "16–20",
      "y": "jeu.",
      "value": 22
    },
    {
      "x": "20–24",
      "y": "jeu.",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "ven.",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "ven.",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "ven.",
      "value": 32
    },
    {
      "x": "12–16",
      "y": "ven.",
      "value": 24
    },
    {
      "x": "16–20",
      "y": "ven.",
      "value": 29
    },
    {
      "x": "20–24",
      "y": "ven.",
      "value": 4
    },
    {
      "x": "0–4",
      "y": "sam.",
      "value": 3
    },
    {
      "x": "4–8",
      "y": "sam.",
      "value": 5
    },
    {
      "x": "8–12",
      "y": "sam.",
      "value": 1
    },
    {
      "x": "12–16",
      "y": "sam.",
      "value": 3
    },
    {
      "x": "16–20",
      "y": "sam.",
      "value": 5
    },
    {
      "x": "20–24",
      "y": "sam.",
      "value": 1
    },
    {
      "x": "0–4",
      "y": "dim.",
      "value": 0
    },
    {
      "x": "4–8",
      "y": "dim.",
      "value": 2
    },
    {
      "x": "8–12",
      "y": "dim.",
      "value": 4
    },
    {
      "x": "12–16",
      "y": "dim.",
      "value": 0
    },
    {
      "x": "16–20",
      "y": "dim.",
      "value": 2
    },
    {
      "x": "20–24",
      "y": "dim.",
      "value": 4
    }
  ]
};
  labels = {
  "en": {
    "commits": "Commits",
    "rows": ["Sun", "Sat", "Fri", "Thu", "Wed", "Tue", "Mon"]
  },
  "zh": {
    "commits": "提交数",
    "rows": ["周日", "周六", "周五", "周四", "周三", "周二", "周一"]
  },
  "ja": {
    "commits": "コミット数",
    "rows": ["日", "土", "金", "木", "水", "火", "月"]
  },
  "fr": {
    "commits": "Commits",
    "rows": ["dim.", "sam.", "ven.", "jeu.", "mer.", "mar.", "lun."]
  }
};
}

```

## Example: Diverging scale

colorScale lists the colors from the lowest to the highest value and accepts CSS variables, so the middle stop follows the theme. A symmetric valueRange keeps 0 in the middle of the scale.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHeatmapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHeatmapChart],
  template: `
@let t = labels[language()];
<mn-heatmap-chart
  [data]="cells[language()]"
  [colorScale]="['#2563eb', '#f8fafc', '#dc2626']"
  [valueRange]="[-1, 1]"
  [name]="t.correlation"
  [radius]="4"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  cells = {
  "en": [
    {
      "x": "Price",
      "y": "Price",
      "value": 1
    },
    {
      "x": "Rating",
      "y": "Price",
      "value": -0.32
    },
    {
      "x": "Delivery",
      "y": "Price",
      "value": 0.12
    },
    {
      "x": "Returns",
      "y": "Price",
      "value": 0.41
    },
    {
      "x": "Sales",
      "y": "Price",
      "value": -0.58
    },
    {
      "x": "Price",
      "y": "Rating",
      "value": -0.32
    },
    {
      "x": "Rating",
      "y": "Rating",
      "value": 1
    },
    {
      "x": "Delivery",
      "y": "Rating",
      "value": -0.44
    },
    {
      "x": "Returns",
      "y": "Rating",
      "value": -0.61
    },
    {
      "x": "Sales",
      "y": "Rating",
      "value": 0.72
    },
    {
      "x": "Price",
      "y": "Delivery",
      "value": 0.12
    },
    {
      "x": "Rating",
      "y": "Delivery",
      "value": -0.44
    },
    {
      "x": "Delivery",
      "y": "Delivery",
      "value": 1
    },
    {
      "x": "Returns",
      "y": "Delivery",
      "value": 0.35
    },
    {
      "x": "Sales",
      "y": "Delivery",
      "value": -0.27
    },
    {
      "x": "Price",
      "y": "Returns",
      "value": 0.41
    },
    {
      "x": "Rating",
      "y": "Returns",
      "value": -0.61
    },
    {
      "x": "Delivery",
      "y": "Returns",
      "value": 0.35
    },
    {
      "x": "Returns",
      "y": "Returns",
      "value": 1
    },
    {
      "x": "Sales",
      "y": "Returns",
      "value": -0.49
    },
    {
      "x": "Price",
      "y": "Sales",
      "value": -0.58
    },
    {
      "x": "Rating",
      "y": "Sales",
      "value": 0.72
    },
    {
      "x": "Delivery",
      "y": "Sales",
      "value": -0.27
    },
    {
      "x": "Returns",
      "y": "Sales",
      "value": -0.49
    },
    {
      "x": "Sales",
      "y": "Sales",
      "value": 1
    }
  ],
  "zh": [
    {
      "x": "价格",
      "y": "价格",
      "value": 1
    },
    {
      "x": "评分",
      "y": "价格",
      "value": -0.32
    },
    {
      "x": "配送",
      "y": "价格",
      "value": 0.12
    },
    {
      "x": "退货",
      "y": "价格",
      "value": 0.41
    },
    {
      "x": "销量",
      "y": "价格",
      "value": -0.58
    },
    {
      "x": "价格",
      "y": "评分",
      "value": -0.32
    },
    {
      "x": "评分",
      "y": "评分",
      "value": 1
    },
    {
      "x": "配送",
      "y": "评分",
      "value": -0.44
    },
    {
      "x": "退货",
      "y": "评分",
      "value": -0.61
    },
    {
      "x": "销量",
      "y": "评分",
      "value": 0.72
    },
    {
      "x": "价格",
      "y": "配送",
      "value": 0.12
    },
    {
      "x": "评分",
      "y": "配送",
      "value": -0.44
    },
    {
      "x": "配送",
      "y": "配送",
      "value": 1
    },
    {
      "x": "退货",
      "y": "配送",
      "value": 0.35
    },
    {
      "x": "销量",
      "y": "配送",
      "value": -0.27
    },
    {
      "x": "价格",
      "y": "退货",
      "value": 0.41
    },
    {
      "x": "评分",
      "y": "退货",
      "value": -0.61
    },
    {
      "x": "配送",
      "y": "退货",
      "value": 0.35
    },
    {
      "x": "退货",
      "y": "退货",
      "value": 1
    },
    {
      "x": "销量",
      "y": "退货",
      "value": -0.49
    },
    {
      "x": "价格",
      "y": "销量",
      "value": -0.58
    },
    {
      "x": "评分",
      "y": "销量",
      "value": 0.72
    },
    {
      "x": "配送",
      "y": "销量",
      "value": -0.27
    },
    {
      "x": "退货",
      "y": "销量",
      "value": -0.49
    },
    {
      "x": "销量",
      "y": "销量",
      "value": 1
    }
  ],
  "ja": [
    {
      "x": "価格",
      "y": "価格",
      "value": 1
    },
    {
      "x": "評価",
      "y": "価格",
      "value": -0.32
    },
    {
      "x": "配送",
      "y": "価格",
      "value": 0.12
    },
    {
      "x": "返品",
      "y": "価格",
      "value": 0.41
    },
    {
      "x": "売上",
      "y": "価格",
      "value": -0.58
    },
    {
      "x": "価格",
      "y": "評価",
      "value": -0.32
    },
    {
      "x": "評価",
      "y": "評価",
      "value": 1
    },
    {
      "x": "配送",
      "y": "評価",
      "value": -0.44
    },
    {
      "x": "返品",
      "y": "評価",
      "value": -0.61
    },
    {
      "x": "売上",
      "y": "評価",
      "value": 0.72
    },
    {
      "x": "価格",
      "y": "配送",
      "value": 0.12
    },
    {
      "x": "評価",
      "y": "配送",
      "value": -0.44
    },
    {
      "x": "配送",
      "y": "配送",
      "value": 1
    },
    {
      "x": "返品",
      "y": "配送",
      "value": 0.35
    },
    {
      "x": "売上",
      "y": "配送",
      "value": -0.27
    },
    {
      "x": "価格",
      "y": "返品",
      "value": 0.41
    },
    {
      "x": "評価",
      "y": "返品",
      "value": -0.61
    },
    {
      "x": "配送",
      "y": "返品",
      "value": 0.35
    },
    {
      "x": "返品",
      "y": "返品",
      "value": 1
    },
    {
      "x": "売上",
      "y": "返品",
      "value": -0.49
    },
    {
      "x": "価格",
      "y": "売上",
      "value": -0.58
    },
    {
      "x": "評価",
      "y": "売上",
      "value": 0.72
    },
    {
      "x": "配送",
      "y": "売上",
      "value": -0.27
    },
    {
      "x": "返品",
      "y": "売上",
      "value": -0.49
    },
    {
      "x": "売上",
      "y": "売上",
      "value": 1
    }
  ],
  "fr": [
    {
      "x": "Prix",
      "y": "Prix",
      "value": 1
    },
    {
      "x": "Note",
      "y": "Prix",
      "value": -0.32
    },
    {
      "x": "Livraison",
      "y": "Prix",
      "value": 0.12
    },
    {
      "x": "Retours",
      "y": "Prix",
      "value": 0.41
    },
    {
      "x": "Ventes",
      "y": "Prix",
      "value": -0.58
    },
    {
      "x": "Prix",
      "y": "Note",
      "value": -0.32
    },
    {
      "x": "Note",
      "y": "Note",
      "value": 1
    },
    {
      "x": "Livraison",
      "y": "Note",
      "value": -0.44
    },
    {
      "x": "Retours",
      "y": "Note",
      "value": -0.61
    },
    {
      "x": "Ventes",
      "y": "Note",
      "value": 0.72
    },
    {
      "x": "Prix",
      "y": "Livraison",
      "value": 0.12
    },
    {
      "x": "Note",
      "y": "Livraison",
      "value": -0.44
    },
    {
      "x": "Livraison",
      "y": "Livraison",
      "value": 1
    },
    {
      "x": "Retours",
      "y": "Livraison",
      "value": 0.35
    },
    {
      "x": "Ventes",
      "y": "Livraison",
      "value": -0.27
    },
    {
      "x": "Prix",
      "y": "Retours",
      "value": 0.41
    },
    {
      "x": "Note",
      "y": "Retours",
      "value": -0.61
    },
    {
      "x": "Livraison",
      "y": "Retours",
      "value": 0.35
    },
    {
      "x": "Retours",
      "y": "Retours",
      "value": 1
    },
    {
      "x": "Ventes",
      "y": "Retours",
      "value": -0.49
    },
    {
      "x": "Prix",
      "y": "Ventes",
      "value": -0.58
    },
    {
      "x": "Note",
      "y": "Ventes",
      "value": 0.72
    },
    {
      "x": "Livraison",
      "y": "Ventes",
      "value": -0.27
    },
    {
      "x": "Retours",
      "y": "Ventes",
      "value": -0.49
    },
    {
      "x": "Ventes",
      "y": "Ventes",
      "value": 1
    }
  ]
};
  labels = {
  "en": {
    "correlation": "Correlation"
  },
  "zh": {
    "correlation": "相关系数"
  },
  "ja": {
    "correlation": "相関係数"
  },
  "fr": {
    "correlation": "Corrélation"
  }
};
}

```
