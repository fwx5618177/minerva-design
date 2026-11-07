# Radar chart

Compares one or a few items over several indicators with different scales (skills, product reviews, flavor profiles). Hover a polygon to highlight it and its nearest indicator; the arrow keys move between series and indicators, Esc clears; click a legend item to hide a series.

Package: minerva-design@1.22.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Problem solving

Coding

System design

Communication

Collaboration

Ownership

Candidate

{{value}} / {{max}}

Interview scorecard of a candidate

Aroma

Acidity

Sweetness

Body

Bitterness

Aftertaste

Ethiopia Yirgacheffe

Sumatra Mandheling

Flavor profiles of two coffees

Performance

Battery

Camera

Display

Value for money

Build quality

Review scores of three phones

Hover a polygon or use the arrow keys to compare the phones

Pace

Shooting

Passing

Dribbling

Defending

Physical

Attributes of two football players

Security

Integrations

Reporting

Mobile

Automation

Support

Pricing

Our product

Main competitor

Market average

Products to compare

Capability ratings of our product, a competitor and the market

Protein

Fiber

Sugar

Fat

Sodium

Calcium

Oatmeal with fruit

Eggs on toast

Yogurt with granola

{{value}} DV

{{meal}}: {{amount}} ({{share}})

Nutrients of three breakfasts, in percent of the daily value

CPU

Memory

Disk I/O

Network

Latency

Errors

Last hour average

Now

Live updates

Alert: {{metric}} is above {{threshold}} of its capacity.

Busiest metric: {{metric}}.

Current load of the service against the last hour's average

Communication

Delivery

Expertise

Collaboration

Mentoring

Initiative

Team average

Person

360° review ratings of {{name}} against the team average

Strongest: {{strength}} ({{strengthGap}} vs. the team). To develop: {{growth}} ({{growthGap}}).

Revenue

Deals won

Win rate

Avg. deal size

Calls

NPS

Target

Actual

{{kpi}}: {{actual}} for a target of {{target}} ({{attainment}}).

Quarterly KPIs of a sales rep against their targets

Click near an axis to read its KPI.

## RadarChart

Support: beta

Native Angular: MnRadarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "dots",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ShapeHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemClick",
    "typeText": "ShapeHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibilityChange",
    "typeText": "ShapeToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Comparing products

Three series get a legend automatically; onHover reports the series and the indicator closest to the pointer.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.axes[0], max: 100 },
    { name: t.axes[1], max: 100 },
    { name: t.axes[2], max: 100 },
    { name: t.axes[3], max: 100 },
    { name: t.axes[4], max: 100 }
  ]"
  [series]="[
    { name: t.current, values: [72, 85, 64, 90, 58] },
    { name: t.next, values: [88, 80, 78, 92, 81] }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "current": "Current model",
    "next": "Next model",
    "axes": ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"]
  },
  "zh": {
    "current": "当前型号",
    "next": "新型号",
    "axes": ["速度", "可靠性", "舒适性", "安全性", "能效"]
  },
  "ja": {
    "current": "現行モデル",
    "next": "次期モデル",
    "axes": ["速度", "信頼性", "快適性", "安全性", "効率"]
  },
  "fr": {
    "current": "Modèle actuel",
    "next": "Nouveau modèle",
    "axes": ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"]
  }
};
}

```

## Example: Circular grid

shape="circle" draws round rings, levels sets their number and dots={false} hides the vertices; opacity strengthens the fills.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.skills[0], max: 10 },
    { name: t.skills[1], max: 10 },
    { name: t.skills[2], max: 10 },
    { name: t.skills[3], max: 10 },
    { name: t.skills[4], max: 10 },
    { name: t.skills[5], max: 10 }
  ]"
  [series]="[{ name: t.profile, values: [9, 6, 7, 8, 5, 6] }]"
  shape="circle"
  [levels]="5"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "profile": "Profile",
    "skills": ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"]
  },
  "zh": {
    "profile": "能力画像",
    "skills": ["前端", "后端", "设计", "测试", "运维", "数据"]
  },
  "ja": {
    "profile": "プロフィール",
    "skills": ["フロントエンド", "バックエンド", "デザイン", "テスト", "DevOps", "データ"]
  },
  "fr": {
    "profile": "Profil",
    "skills": ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"]
  }
};
}

```
