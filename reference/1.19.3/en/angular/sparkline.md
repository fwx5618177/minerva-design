# Sparkline

A word-sized chart without axes or legend that shows the shape of a trend next to a number: in KPI cards, table cells or lists. Hover it to read a value.

Package: minerva-design@1.19.3

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Orders

Weekly orders, {{variant}}

Revenue

Active users

Sign-ups

p95 latency

{{metric}}, last 30 days

Service

API gateway

Authentication

Search

Payments

Notifications

Requests / min

p95 latency, 30 days

{{service}} p95 latency over 30 days

Today

Change

Service latency

Symbol

Acme Corporation

Nova Biotech

Orbit Aerospace

Kite Robotics

Luma Energy

{{symbol}} price today

Price

Watchlist

Visits over the last 14 days:

Visits

Visits over the last 14 days

Errors spiked after the deployment of day 7, then went back to normal:

Errors

Errors per day over the last 14 days

Afternoon temperature these two weeks:

Temperature

Afternoon temperature over the last 14 days

CPU

CPU usage of {{server}}

Alert

Healthy

Daily active users

Latest: {{date}}

{{date}} · {{change}} since September 1

Daily active users from September 1 to October 31

{{value}} steps

{{value}} of the goal

Goal of {{goal}} steps reached on {{reached}} of {{days}} days

Steps

Steps per day over four weeks, with the daily goal

Reykjavík

Montreal

Tokyo

Cairo

Singapore

Sydney

High {{max}} ({{maxMonth}}) · low {{min}} ({{minMonth}})

Average daily high of each month in {{city}}

Period

7 days

30 days

90 days

second half against the first

against the previous period

Daily revenue over the last {{period}}

## Sparkline

Support: beta

Native Angular: MnSparkline. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSparkline"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "ChartSeriesData",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "type",
    "typeText": "\"bar\" | \"line\" | \"area\"",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
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
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "reference",
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

## Example: KPI cards

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSparkline, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSparkline],
  template: `
@let t = labels[language()];
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px">
  <div style="display: grid; gap: 4px">
    <span>{{ t.orders }}</span><strong>1,284</strong>
    <mn-sparkline [data]="orders" [name]="t.orders" />
  </div>
  <div style="display: grid; gap: 4px">
    <span>{{ t.revenue }}</span><strong>€48.2k</strong>
    <mn-sparkline type="area" [data]="revenue" [name]="t.revenue" />
  </div>
  <div style="display: grid; gap: 4px">
    <span>{{ t.signups }}</span><strong>312</strong>
    <mn-sparkline type="bar" [data]="signups" [name]="t.signups" />
  </div>
</div>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  orders = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  revenue = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  signups = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  labels = {
  "en": {
    "orders": "Orders",
    "revenue": "Revenue",
    "signups": "Sign-ups"
  },
  "zh": {
    "orders": "订单",
    "revenue": "收入",
    "signups": "注册"
  },
  "ja": {
    "orders": "注文",
    "revenue": "売上",
    "signups": "登録"
  },
  "fr": {
    "orders": "Commandes",
    "revenue": "Chiffre d'affaires",
    "signups": "Inscriptions"
  }
};
}

```

## Example: Target line and hover

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSparkline, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSparkline],
  template: `
@let t = labels[language()];
<mn-sparkline
  [data]="latency"
  [reference]="200"
  [name]="t.latency"
  [height]="64"
  (hover)="hovered = $event?.items?.[0]?.y ?? null"
/>
<output aria-live="polite">{{
  hovered === null ? t.hint : t.latency + ': ' + hovered + ' ms (' + t.target + ')'
}}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered: number | null = null;
  latency = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  labels = {
  "en": {
    "latency": "p95 latency",
    "target": "target 200 ms",
    "hint": "Hover the line"
  },
  "zh": {
    "latency": "p95 延迟",
    "target": "目标 200 毫秒",
    "hint": "将指针悬停在折线上"
  },
  "ja": {
    "latency": "p95 レイテンシ",
    "target": "目標 200 ms",
    "hint": "線にカーソルを合わせます"
  },
  "fr": {
    "latency": "Latence p95",
    "target": "objectif 200 ms",
    "hint": "Survolez la courbe"
  }
};
}

```
