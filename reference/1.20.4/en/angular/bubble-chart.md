# Bubble chart

Scatter charts with a third value drawn as the size of the dots: the area of a bubble is proportional to its value.

Package: minerva-design@1.20.4

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

Asia

Europe

Americas

Africa

Population

GDP per capita

Life expectancy (years)

GDP per capita, life expectancy and population of countries

Products

Revenue

Cloud storage

Analytics

Mobile SDK

Payments

Desktop app

Hardware

Consulting

Relative market share

Market growth

Market leader

High growth

Market share, growth and revenue of the products

Qualified

Proposal

Negotiation

Amount

Deal #{{id}}

Days in the pipeline

Win probability

{{deal}} ({{stage}}): {{amount}}

Click a bubble

Open deals by age, win probability and amount

GDP per capita (log scale)

High income

Life expectancy against GDP per capita on a log scale, sized by population

Visible incomes: {{from}} – {{to}}

Zoom to see the visible range in dollars

Infrastructure

Security

People

Budget

Exposure

Power outage

Hardware delivery delay

Network cutover

Data leak

Access review backlog

Key person leaves

Vendor skills shortage

Training gap

License cost increase

Exchange rate

Acceptable

Critical

Likelihood {{likelihood}} × impact {{impact}} = {{score}}

Exposure: {{value}}

Likelihood

Impact

Project risks by likelihood, impact and cost exposure

Search

Social

Video

Email

Budget

Launched on {{date}}

Launch date

Return on ad spend

Break-even

Marketing campaigns by launch date, return on ad spend and budget

North

South

East

West

Center

Same size scale in both charts

Both charts draw {{value}} with the largest bubble.

Each chart draws its own largest revenue with the largest bubble.

Sales per m²

Margin

Sales per square meter, margin and revenue of the store regions in {{year}}

Play

Pause

Replay

Restart

Year: {{year}}

Fertility (children per woman)

Fertility, life expectancy and population of countries from 1990 to 2025

## BubbleChart

Support: beta

Native Angular: MnBubbleChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBubbleChart"
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
    "name": "minSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Countries

GDP per capita against life expectancy, the bubbles sized by population and colored by continent; valueName and format name and format the value in the tooltip.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[{ name: t.life, showLabels: true, data: [
    { x: 34, y: 84.5, value: 124, label: t.names[0] },
    { x: 44, y: 82.5, value: 68, label: t.names[1] },
    { x: 12.6, y: 78.6, value: 1410, label: t.names[2] },
    { x: 9, y: 75.9, value: 216, label: t.names[3] },
    { x: 2.5, y: 70.8, value: 1430, label: t.names[4] },
    { x: 2.2, y: 53.6, value: 224, label: t.names[5] },
    { x: 52, y: 81.2, value: 84, label: t.names[6] },
    { x: 11.5, y: 75, value: 128, label: t.names[7] }
  ] }]"
  [xAxis]="{ title: t.gdp }"
  [yAxis]="{ title: t.life, min: 50 }"
  [maxSize]="64"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "gdp": "GDP per capita (k$)",
    "life": "Life expectancy",
    "names": ["Japan", "France", "China", "Brazil", "India", "Nigeria", "Germany", "Mexico"]
  },
  "zh": {
    "gdp": "人均 GDP（千美元）",
    "life": "预期寿命",
    "names": ["日本", "法国", "中国", "巴西", "印度", "尼日利亚", "德国", "墨西哥"]
  },
  "ja": {
    "gdp": "1 人あたり GDP（千ドル）",
    "life": "平均寿命",
    "names": ["日本", "フランス", "中国", "ブラジル", "インド", "ナイジェリア", "ドイツ", "メキシコ"]
  },
  "fr": {
    "gdp": "PIB par habitant (k$)",
    "life": "Espérance de vie",
    "names": ["Japon", "France", "Chine", "Brésil", "Inde", "Nigeria", "Allemagne", "Mexique"]
  }
};
}

```

## Example: Product portfolio

Market share, market growth and revenue of the products, split in four quadrants by two reference lines; showLabels writes the names around the bubbles.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBubbleChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBubbleChart],
  template: `
@let t = labels[language()];
<mn-bubble-chart
  [series]="[
    { name: t.assets[0], data: [{ x: 4, y: 3, value: 30 }] },
    { name: t.assets[1], data: [{ x: 15, y: 7, value: 25 }] },
    { name: t.assets[2], data: [{ x: 12, y: 6, value: 20 }] },
    { name: t.assets[3], data: [{ x: 28, y: 12, value: 15 }] },
    { name: t.assets[4], data: [{ x: 16, y: 4, value: 5 }] },
    { name: t.assets[5], data: [{ x: 45, y: 18, value: 5 }] }
  ]"
  [xAxis]="{ title: t.risk }"
  [yAxis]="{ title: t.return }"
  [height]="300"
  (pointClick)="selected = $event.items[0] ? $event.items[0].seriesName + ': ' + $event.items[0].value + ' %' : selected"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "risk": "Risk (volatility %)",
    "return": "Expected return %",
    "hint": "Click a bubble",
    "assets": ["Bonds", "Index fund", "Real estate", "Tech stocks", "Gold", "Start-ups"]
  },
  "zh": {
    "risk": "风险（波动率 %）",
    "return": "预期收益 %",
    "hint": "点击一个气泡",
    "assets": ["债券", "指数基金", "房地产", "科技股", "黄金", "初创企业"]
  },
  "ja": {
    "risk": "リスク（ボラティリティ %）",
    "return": "期待リターン %",
    "hint": "バブルをクリックします",
    "assets": ["債券", "インデックスファンド", "不動産", "ハイテク株", "金", "スタートアップ"]
  },
  "fr": {
    "risk": "Risque (volatilité %)",
    "return": "Rendement attendu %",
    "hint": "Cliquez sur une bulle",
    "assets": ["Obligations", "Fonds indiciel", "Immobilier", "Actions tech", "Or", "Start-up"]
  }
};
}

```
