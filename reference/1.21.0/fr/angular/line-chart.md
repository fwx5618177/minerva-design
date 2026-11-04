# Graphique linéaire

Lignes ou aires remplies sur des nombres, des dates ou des catégories. Gère des millions de points sur le GPU.

Package: minerva-design@1.21.0

Renderer: angular

Locale: fr

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

Cette semaine

Semaine dernière

Visiteurs par jour, cette semaine et la semaine dernière

Stockage utilisé

Jour

Stockage utilisé sur 60 jours

Lisbonne

Oslo

Courbe

Linéaire

Lissée

En escalier

Températures mensuelles moyennes à Lisbonne et à Oslo

Calcul

Stockage

Réseau

Bases de données

Mode d'empilement

Empilé

Dépenses cloud mensuelles par service, empilées

Pages vues

Sessions

Pages vues et sessions quotidiennes, premier semestre 2026

Capteur

Un million de relevés de capteur

{{points}} points · dessinés avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Visiteurs

Lancement du produit

Panne

Visiteurs quotidiens sur 90 jours avec un lancement de produit et une panne

Intérieur

Extérieur

Températures horaires intérieures et extérieures avec des relevés manquants

Les capteurs ont été hors ligne quelques heures : la ligne s'interrompt au lieu de deviner.

Médiane

95e centile

Critique

Objectif {{value}}

Latence de l'API sur six heures, médiane et 95e centile

Clôture

Période

1 M

3 M

6 M

1 A

Tout

Cours de clôture quotidien sur deux ans

Pas

Pas par jour

{{day}} : {{steps}} pas

Touchez ou parcourez la ligne

Processeur

Mémoire

{{hour}} h

Utilisation du processeur et de la mémoire au cours de la journée

Pincez pour zoomer, touchez deux fois pour réinitialiser ; touchez la légende pour masquer une série.

Température du congélateur

Alarme au-dessus de {{value}}

Pause

Reprendre

Alarme : porte ouverte ?

Normal

Dernière mesure {{value}} à {{time}}

Au-dessus du seuil sur la dernière minute : {{readings}}

Température du congélateur sur la dernière minute, mise à jour chaque seconde

Souche sauvage

Mutant

Avec antibiotique

Phase exponentielle

Échelle logarithmique

Temps depuis l'inoculation

UFC / mL

Courbes de croissance de trois cultures bactériennes sur 24 heures

Les segments droits indiquent un taux de croissance constant : la souche sauvage double environ toutes les {{minutes}}.

Sur une échelle linéaire, les petites cultures paraissent plates : revenez à l'échelle logarithmique pour les comparer.

Valeur du portefeuille

Cliquez sur un point pour commencer une mesure, puis sur un second.

Depuis le {{date}} ({{value}}) : cliquez sur un second point.

{{from}} → {{to}} : {{change}} ({{percent}}) en {{days}}

Effacer

Valeur quotidienne d'un portefeuille en 2026 ; cliquez sur deux points pour mesurer la variation

Actions

Obligations

Or

Immobilier

Base 100

Performance de quatre classes d'actifs en base 100, de 2021 à 2026

{{value}} µg/m³

Delhi

Pékin

Paris

Mexico

Tokyo

São Paulo

Moyenne journalière des particules fines (PM2,5) en novembre ; la ligne en pointillés est le seuil de l'OMS, {{value}}.

{{days}}/{{total}} jours au-dessus

PM2,5 quotidiennes à {{city}} sur 30 jours

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
