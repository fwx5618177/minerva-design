# Line chart

Lines or filled areas over numbers, dates or categories. Handles millions of points on the GPU.

Package: minerva-design@1.20.2

Renderer: angular

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

This week

Last week

Visitors per day, this week and last week

Storage used

Day

Storage used over 60 days

Lisbon

Oslo

Curve

Linear

Smooth

Step

Average monthly temperatures in Lisbon and Oslo

Compute

Storage

Network

Databases

Stack mode

Stacked

Monthly cloud spend by service, stacked

Page views

Sessions

Daily page views and sessions, first half of 2026

Sensor

One million sensor readings

{{points}} points · drawn with {{renderer}} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset

Visitors

Product launch

Outage

Daily visitors over 90 days with a product launch and an outage

Indoor

Outdoor

Hourly indoor and outdoor temperatures with missing readings

The sensors were offline for a few hours: the line stops instead of guessing.

Median

95th percentile

Critical

Target {{value}}

API latency over six hours, median and 95th percentile

Close

Period

1M

3M

6M

1Y

All

Daily closing price over two years

Steps

Steps per day

{{day}}: {{steps}} steps

Tap or scrub the line

CPU

Memory

{{hour}}h

CPU and memory usage over the day

Pinch to zoom, double tap to reset; tap the legend to hide a series.

Freezer temperature

Alarm above {{value}}

Pause

Resume

Alarm: door open?

Normal

Last reading {{value}} at {{time}}

Above the limit in the last minute: {{readings}}

Freezer temperature over the last minute, updated every second

Wild type

Mutant

With antibiotic

Exponential phase

Logarithmic scale

Time since inoculation

CFU / mL

Growth curves of three bacterial cultures over 24 hours

Straight segments mean a constant growth rate: the wild type doubles about every {{minutes}}.

On a linear scale the small cultures look flat: switch back to the logarithmic scale to compare them.

Portfolio value

Click a point to start a measurement, then a second one.

From {{date}} ({{value}}): click a second point.

{{from}} → {{to}}: {{change}} ({{percent}}) over {{days}}

Clear

Daily value of a portfolio in 2026; click two points to measure the change

Equities

Bonds

Gold

Real estate

Base 100

Performance of four asset classes rebased to 100, 2021 to 2026

{{value}} µg/m³

Delhi

Beijing

Paris

Mexico City

Tokyo

São Paulo

Daily mean of fine particles (PM2.5) in November; the dashed line is the WHO guideline of {{value}}.

{{days}}/{{total}} days above

Daily PM2.5 in {{city}} over 30 days

## LineChart

Support: beta

Native Angular: MnLineChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnLineChart"
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
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "curve",
    "typeText": "ChartCurve | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
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

## Example: Weekly trend

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLineChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLineChart],
  template: `
@let t = labels[language()];
<mn-line-chart
  [series]="[
    { name: t.thisWeek, data: thisWeek },
    { name: t.lastWeek, data: lastWeek }
  ]"
  curve="smooth"
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  thisWeek = [820, 932, 901, 934, 1290, 1330, 1320];
  lastWeek = [620, 732, 701, 834, 1090, 1130, 1020];
  labels = {
  "en": {
    "thisWeek": "This week",
    "lastWeek": "Last week",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "zh": {
    "thisWeek": "本周",
    "lastWeek": "上周",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "ja": {
    "thisWeek": "今週",
    "lastWeek": "先週",
    "days": ["月", "火", "水", "木", "金", "土", "日"]
  },
  "fr": {
    "thisWeek": "Cette semaine",
    "lastWeek": "Semaine dernière",
    "days": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
  }
};
}

```

## Example: Zoom and reset

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLineChart, MnButton, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLineChart, MnButton],
  template: `
@let t = labels[language()];
<mn-line-chart
  #chart
  [series]="[{ name: t.sensor, data: sensor }]"
  crosshair
  [interaction]="{ zoom: 'x' }"
  [height]="260"
/>
<button mnButton variant="outline" size="small" (click)="chart.resetZoom()">{{ t.reset }}</button>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  sensor = [50, 58, 64, 69, 71, 70, 68, 66, 64, 64, 66, 70, 75, 81, 86, 89, 90, 88, 83, 78, 72, 67, 64, 64, 65, 67, 70, 71, 70, 67, 61, 53, 45, 38, 33, 30, 29, 31, 33, 35, 36, 35, 32, 27, 21, 16, 12, 10, 11, 15, 20, 26, 31, 35, 36, 36, 34, 31, 29, 29, 32, 37, 43, 51, 59, 65, 69, 71, 70, 68, 65, 64, 64, 66, 71, 76, 82, 87, 90, 90, 87, 82, 77, 71, 66, 64, 64, 65, 68, 70, 71, 70, 66, 60, 52, 44, 37, 32, 29, 29, 31, 34, 36, 36, 35, 31, 26, 20, 15, 11, 10, 11, 15, 21, 27, 32, 35, 36, 36, 33];
  labels = {
  "en": {
    "sensor": "Sensor",
    "reset": "Reset zoom"
  },
  "zh": {
    "sensor": "传感器",
    "reset": "重置缩放"
  },
  "ja": {
    "sensor": "センサー",
    "reset": "ズームをリセット"
  },
  "fr": {
    "sensor": "Capteur",
    "reset": "Réinitialiser le zoom"
  }
};
}

```
