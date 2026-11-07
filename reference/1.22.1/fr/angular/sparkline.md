# Sparkline

Un graphique de la taille d’un mot, sans axes ni légende, qui montre l’allure d’une tendance à côté d’un chiffre : dans des cartes d’indicateurs, des cellules de tableau ou des listes. Survolez-le pour lire une valeur.

Package: minerva-design@1.22.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Commandes

Commandes hebdomadaires, {{variant}}

Chiffre d'affaires

Utilisateurs actifs

Inscriptions

Latence p95

{{metric}}, 30 derniers jours

Service

Passerelle API

Authentification

Recherche

Paiements

Notifications

Requêtes / min

Latence p95, 30 jours

Latence p95 de {{service}} sur 30 jours

Aujourd'hui

Variation

Latence des services

Symbole

Acme Corporation

Nova Biotech

Orbit Aérospatiale

Kite Robotique

Luma Énergie

Cours de {{symbol}} aujourd'hui

Cours

Liste de surveillance

Visites des 14 derniers jours :

Visites

Visites des 14 derniers jours

Les erreurs ont bondi après le déploiement du 7e jour, puis sont revenues à la normale :

Erreurs

Erreurs par jour sur les 14 derniers jours

Température de l'après-midi ces deux semaines :

Température

Température de l'après-midi sur les 14 derniers jours

Processeur

Utilisation du processeur de {{server}}

Alerte

Normal

Utilisateurs actifs par jour

Dernier jour : {{date}}

{{date}} · {{change}} depuis le 1er septembre

Utilisateurs actifs par jour du 1er septembre au 31 octobre

{{value}} pas

{{value}} de l'objectif

Objectif de {{goal}} pas atteint {{reached}} jours sur {{days}}

Pas

Pas par jour sur quatre semaines, avec l'objectif quotidien

Reykjavik

Montréal

Tokyo

Le Caire

Singapour

Sydney

Max. {{max}} ({{maxMonth}}) · min. {{min}} ({{minMonth}})

Moyenne des maximales quotidiennes de chaque mois à {{city}}

Période

7 jours

30 jours

90 jours

seconde moitié par rapport à la première

par rapport à la période précédente

Chiffre d'affaires quotidien, période : {{period}}

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
