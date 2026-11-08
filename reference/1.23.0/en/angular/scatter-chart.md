# Scatter chart

Dots positioned by two values, with per-point size, color and label. Zooms on both axes.

Package: minerva-design@1.23.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Starter

Business

Seats

Monthly bill

Monthly bill by number of seats, per plan

Countries

GDP per capita

Life expectancy

Life expectancy by GDP per capita; dot size is the population

Cluster {{name}}

Two clusters of 100,000 points each

{{points}} points · drawn with {{renderer}}

Session length against pages viewed

Minutes

Pages

Free

Pro

{{plan}}: {{minutes}} min, {{pages}} pages

Tap a dot

Campaigns

Trend

Ad spend per week

Revenue per week

R² = {{r2}} · +{{slope}} of revenue per dollar spent

Revenue against ad spend for 60 campaigns, with a trend line

Adélie

Chinstrap

Gentoo

Flipper length

Body mass

Flipper length against body mass of three penguin species

Requests

Outlier

Expected

Payload size

Response time

Response time against payload size, outliers in red

{{slow}} of {{total}} requests took more than twice the expected time.

Readings

Cool nights

Growing range

Hot afternoons

Show all

Temperature

Relative humidity

Growing range

Temperature and humidity readings of the greenhouse sensors

Visible: {{t0}} – {{t1}}, humidity {{h0}} – {{h1}} · readings in view: {{points}}

Pick a region, or zoom with Ctrl / ⌘ + wheel

Engineering

Sales

Support

Tenure

Review score (1–5)

Company average

Tenure and review score of 90 employees by department

{{id}} · {{department}} · {{tenure}} · score {{score}} · {{salary}} a year

Click a dot to select an employee, click the empty plot to clear the selection

Players

League average

Efficient scorers

Volume shooters

{{value}} points per game

Usage rate: {{value}}

True shooting: {{value}}

Usage rate

True shooting

Usage rate against shooting efficiency of 16 players; the dot size is the points per game

Normal

Alarm

Latest

{{value}} mm/s

Pause

Resume

Latest sample: {{rpm}} rpm, {{value}} · alarms on screen: {{alarms}}

Speed (rpm)

Vibration

Alarm limit

Live vibration of a motor against its speed

Mammals

Shrew

Mouse

Rat

Rabbit

Cat

Dog

Human

Pig

Horse

Cow

Giraffe

Elephant

Power-law fit

{{value}} kg

{{value}} W

Body mass

Basal metabolic rate

Metabolic rate ∝ mass^{{exponent}} (Kleiber's law)

Basal metabolic rate against body mass of 12 mammals, on log-log axes

## ScatterChart

Support: beta

Native Angular: MnScatterChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatterChart"
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

## Example: Two clusters

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[
    { name: t.teamA, data: teamA },
    { name: t.teamB, data: teamB }
  ]"
  [xAxis]="{ title: t.hours }"
  [yAxis]="{ title: t.score }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teamA = [
  {
    "x": 17.05,
    "y": 66.86
  },
  {
    "x": 11.05,
    "y": 53.86
  },
  {
    "x": 8.21,
    "y": 59.23
  },
  {
    "x": 17.99,
    "y": 70.85
  },
  {
    "x": 7.8,
    "y": 62.49
  },
  {
    "x": 11.6,
    "y": 53.03
  },
  {
    "x": 16.73,
    "y": 63.83
  },
  {
    "x": 6.1,
    "y": 70.5
  },
  {
    "x": 15.14,
    "y": 57.98
  },
  {
    "x": 13.72,
    "y": 54.53
  },
  {
    "x": 6.57,
    "y": 67.94
  },
  {
    "x": 17.52,
    "y": 67.94
  },
  {
    "x": 10.08,
    "y": 54.53
  },
  {
    "x": 9.04,
    "y": 57.99
  },
  {
    "x": 17.86,
    "y": 70.51
  },
  {
    "x": 7.15,
    "y": 63.82
  }
];
  teamB = [
  {
    "x": 21.46,
    "y": 74.12
  },
  {
    "x": 26.1,
    "y": 87.51
  },
  {
    "x": 30.41,
    "y": 83.95
  },
  {
    "x": 20.03,
    "y": 71.47
  },
  {
    "x": 29.55,
    "y": 78.25
  },
  {
    "x": 27.24,
    "y": 88.98
  },
  {
    "x": 20.8,
    "y": 79.43
  },
  {
    "x": 31.69,
    "y": 71.17
  },
  {
    "x": 23.61,
    "y": 82.84
  },
  {
    "x": 23.48,
    "y": 88.1
  },
  {
    "x": 31.74,
    "y": 75.07
  },
  {
    "x": 20.87,
    "y": 73.17
  },
  {
    "x": 27.1,
    "y": 86.69
  },
  {
    "x": 29.67,
    "y": 85.11
  },
  {
    "x": 20.02,
    "y": 71.99
  },
  {
    "x": 30.31,
    "y": 76.96
  }
];
  labels = {
  "en": {
    "teamA": "Team A",
    "teamB": "Team B",
    "hours": "Hours",
    "score": "Score"
  },
  "zh": {
    "teamA": "A 组",
    "teamB": "B 组",
    "hours": "小时",
    "score": "得分"
  },
  "ja": {
    "teamA": "チームA",
    "teamB": "チームB",
    "hours": "時間",
    "score": "スコア"
  },
  "fr": {
    "teamA": "Équipe A",
    "teamB": "Équipe B",
    "hours": "Heures",
    "score": "Score"
  }
};
}

```

## Example: Clicked point

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.cities, pointSize: 12, data: [
    { x: 20.5, y: 31, label: t.names[0] },
    { x: 10.9, y: 17, label: t.names[1] },
    { x: 6.8, y: 15, label: t.names[2] },
    { x: 4.9, y: 15, label: t.names[3] },
    { x: 4.8, y: 21, label: t.names[4] },
    { x: 5.2, y: 16, label: t.names[5] }
  ] }]"
  [xAxis]="{ title: t.density }"
  [yAxis]="{ title: t.rent }"
  [height]="280"
  (pointClick)="selected = $event.items[0]?.label + ': ' + $event.items[0]?.x + ' · ' + $event.items[0]?.y + ' €/m²'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "cities": "Cities",
    "density": "Density (k/km²)",
    "rent": "Rent (€/m²)",
    "hint": "Click a city",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  },
  "zh": {
    "cities": "城市",
    "density": "人口密度（千人/km²）",
    "rent": "租金（欧元/m²）",
    "hint": "点击一个城市",
    "names": ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"]
  },
  "ja": {
    "cities": "都市",
    "density": "人口密度（千人/km²）",
    "rent": "家賃（€/m²）",
    "hint": "都市をクリックします",
    "names": ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"]
  },
  "fr": {
    "cities": "Villes",
    "density": "Densité (k/km²)",
    "rent": "Loyer (€/m²)",
    "hint": "Cliquez sur une ville",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  }
};
}

```
