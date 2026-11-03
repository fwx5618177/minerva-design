# Graphique en aires

Des aires remplies pour montrer un volume dans le temps : lissées par défaut, superposées, empilées en un total ou en parts de 100 %. Survolez pour lire toutes les séries à un même x ; zoomez avec Ctrl / ⌘ + molette ou en pinçant.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Utilisateurs actifs quotidiens

Utilisateurs actifs quotidiens, d'avril à juin 2026

Autres

Part de marché par fabricant, de 2016 à 2026

Recherche naturelle

Accès direct

Sites référents

Réseaux sociaux

Visites mensuelles par source de trafic, empilées

Instances en service

Quota

Instances lancées par l'autoscaler sur une journée

Nucléaire

Hydraulique

Éolien

Solaire

Gaz

{{value}} GW

Puissance

Production d'électricité par source sur une journée, empilée

Réalisé

Objectif

Ventes cumulées de l'année face à l'objectif

Téléchargement

Envoi

Bande passante d'un serveur sur deux heures, téléchargement au-dessus de zéro et envoi en dessous

Production solaire

{{value}} kWh

Énergie quotidienne d'une installation solaire en toiture en 2026

Réinitialiser le zoom

{{from}} – {{to}} : {{total}} au total, {{average}} par jour en moyenne

Ctrl / ⌘ + molette ou pincement pour zoomer sur une saison, glisser pour se déplacer.

Ingénierie

Ventes

Support client

Opérations

Finance et RH

Effectif mensuel par service, 2025 et 2026

Effectif du mois sélectionné

{{value}} salariés

L'an dernier

Cette année

Black Friday

Cyber Monday

Dernier jour d'expédition

Commandes quotidiennes en novembre et décembre, cette année face à l'an dernier

{{total}} commandes cette saison, {{change}} par rapport à l'an dernier.

Utilisé

Tendance

{{value}} Go

Capacité {{value}}

Volume

Base de données

Journaux

Fichiers des utilisateurs

Plein dans environ {{days}}, vers le {{date}}

Pas plein dans les {{days}} à venir

Usage du disque sur 60 jours et sa tendance jusqu'à la capacité

## AreaChart

Support: beta

Native Angular: MnAreaChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAreaChart"
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
    "name": "curve",
    "typeText": "ChartCurve",
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

## Example: Empilées

stacked empile les aires pour que le bord supérieur donne le total ; à utiliser quand la somme des parties a un sens. Cliquez sur un élément de la légende pour masquer une source et réempiler les autres.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAreaChart],
  template: `
@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.organic, data: organic },
    { name: t.paid, data: paid },
    { name: t.referral, data: referral }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.months }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  organic = [320, 332, 301, 334, 390, 430];
  paid = [120, 132, 101, 134, 190, 230];
  referral = [60, 72, 71, 74, 90, 110];
  labels = {
  "en": {
    "organic": "Organic",
    "paid": "Paid",
    "referral": "Referral",
    "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  },
  "zh": {
    "organic": "自然流量",
    "paid": "付费流量",
    "referral": "推荐流量",
    "months": ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  "ja": {
    "organic": "オーガニック",
    "paid": "有料",
    "referral": "参照元",
    "months": ["1月", "2月", "3月", "4月", "5月", "6月"]
  },
  "fr": {
    "organic": "Naturel",
    "paid": "Payant",
    "referral": "Référents",
    "months": ["janv.", "févr.", "mars", "avr.", "mai", "juin"]
  }
};
}

```

## Example: Empilées à 100 %

percent ramène chaque x à 100 % pour comparer des parts plutôt que des quantités, comme des parts de marché ; l’infobulle affiche chaque valeur et sa part.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAreaChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAreaChart],
  template: `
@let t = labels[language()];
<mn-area-chart
  [series]="[
    { name: t.solar, data: solar },
    { name: t.wind, data: wind },
    { name: t.hydro, data: hydro }
  ]"
  percent
  curve="linear"
  [xAxis]="{ type: 'category', categories: t.hours }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  solar = [0, 5, 40, 62, 35, 2];
  wind = [48, 52, 30, 22, 38, 55];
  hydro = [30, 30, 28, 26, 28, 30];
  labels = {
  "en": {
    "solar": "Solar",
    "wind": "Wind",
    "hydro": "Hydro",
    "hours": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  },
  "zh": {
    "solar": "太阳能",
    "wind": "风能",
    "hydro": "水电",
    "hours": ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
  },
  "ja": {
    "solar": "太陽光",
    "wind": "風力",
    "hydro": "水力",
    "hours": ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"]
  },
  "fr": {
    "solar": "Solaire",
    "wind": "Éolien",
    "hydro": "Hydraulique",
    "hours": ["0 h", "4 h", "8 h", "12 h", "16 h", "20 h"]
  }
};
}

```
