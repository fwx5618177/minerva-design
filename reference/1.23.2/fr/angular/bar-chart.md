# Graphique à barres

Barres groupées côte à côte ou empilées, avec des lignes superposées en option.

Package: minerva-design@1.23.2

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

T{{n}}

Tickets résolus

Tickets de support résolus par trimestre

Commandes

Moyenne sur 7 jours

Jour

Commandes quotidiennes et leur moyenne sur 7 jours

Chiffre d'affaires trimestriel, 2025 et 2026

Promoteurs

Passifs

Détracteurs

Amérique du Nord

Europe

Asie-Pacifique

Amérique latine

Moyen-Orient

Part des promoteurs, passifs et détracteurs par région

Web

Application mobile

Partenaires

Commandes mensuelles par canal, empilées

Ventes

Ventes par trimestre

{{quarter}} : {{units}} unités

Touchez une barre

Empilées

Groupées

Commandes par canal et par mois

Londres

Tokyo

Paris

Précipitations mensuelles moyennes à Londres, Tokyo et Paris

Résultat net

Résultat net mensuel, bénéfices au-dessus de zéro et pertes en dessous

Unités vendues

Ventes en ligne par pays, de la plus forte à la plus faible

Nouveaux clients

S{{n}}

Objectif hebdomadaire

Nouveaux clients par semaine face à l'objectif hebdomadaire

Objectif atteint {{reached}} semaines sur {{total}} ({{rate}}).

Chiffre d'affaires

{{month}} : {{value}}

Retour aux trimestres

Cliquez sur un trimestre pour voir ses mois.

{{quarter}} : {{value}} au total. Cliquez sur un mois pour voir son chiffre d'affaires.

Chiffre d'affaires par trimestre en 2026 ; cliquez sur un trimestre pour voir ses mois

Chiffre d'affaires par mois au {{quarter}} 2026

Ingénierie

Produit

Design

Ventes

Marketing

Support

L'an dernier

Cette année

Variation

Comparer avec l'an dernier

Recrutements par service, cette année et l'an dernier

Réussis

Annulés

Gel des changements

Déploiements en production par jour sur huit semaines, réussis et annulés

{{perDay}} déploiements par jour ouvré, taux d'échec des changements de {{failure}}.

Heures creuses

Normal

Heures pleines

Recharge

Moyenne du jour

Durée de recharge

{{energy}} kWh · {{duration}}

Rechargez de {{start}} à {{end}} pour {{cost}}, soit {{saving}} de moins qu'en branchant à {{plugIn}}.

Prix par MWh

Prix de l'électricité du marché J-1 pour chaque heure de demain, avec les heures les moins chères pour recharger une voiture électrique mises en évidence

## BarChart

Support: beta

Native Angular: MnBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBarChart"
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
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
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

## Example: Groupées

Plusieurs séries sans stacked se placent côte à côte dans chaque catégorie, ici les précipitations mensuelles de trois villes ; Intl.NumberFormat écrit l'unité.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBarChart],
  template: `
@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.lastYear, data: lastYear },
    { name: t.thisYear, data: thisYear }
  ]"
  labels
  [xAxis]="{ type: 'category', categories: t.regions }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  lastYear = [38, 52, 61, 45];
  thisYear = [44, 58, 72, 49];
  labels = {
  "en": {
    "lastYear": "2024",
    "thisYear": "2025",
    "regions": ["North", "South", "East", "West"]
  },
  "zh": {
    "lastYear": "2024 年",
    "thisYear": "2025 年",
    "regions": ["华北", "华南", "华东", "西部"]
  },
  "ja": {
    "lastYear": "2024年",
    "thisYear": "2025年",
    "regions": ["北部", "南部", "東部", "西部"]
  },
  "fr": {
    "lastYear": "2024",
    "thisYear": "2025",
    "regions": ["Nord", "Sud", "Est", "Ouest"]
  }
};
}

```

## Example: Empilées

stacked empile les séries les unes sur les autres.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBarChart],
  template: `
@let t = labels[language()];
<mn-bar-chart
  [series]="[
    { name: t.desktop, data: desktop },
    { name: t.mobile, data: mobile },
    { name: t.tablet, data: tablet }
  ]"
  stacked
  [xAxis]="{ type: 'category', categories: t.days }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  desktop = [320, 302, 341, 374, 390, 210, 180];
  mobile = [420, 432, 401, 454, 490, 630, 610];
  tablet = [80, 72, 71, 84, 90, 130, 120];
  labels = {
  "en": {
    "desktop": "Desktop",
    "mobile": "Mobile",
    "tablet": "Tablet",
    "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "zh": {
    "desktop": "桌面端",
    "mobile": "移动端",
    "tablet": "平板",
    "days": ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  },
  "ja": {
    "desktop": "デスクトップ",
    "mobile": "モバイル",
    "tablet": "タブレット",
    "days": ["月", "火", "水", "木", "金", "土", "日"]
  },
  "fr": {
    "desktop": "Ordinateur",
    "mobile": "Mobile",
    "tablet": "Tablette",
    "days": ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."]
  }
};
}

```
