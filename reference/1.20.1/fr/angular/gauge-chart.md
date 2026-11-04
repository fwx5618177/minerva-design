# Jauge

Une seule valeur sur un arc, par rapport à une plage et à des seuils colorés facultatifs : KPI, taux d’utilisation, scores. Quand value change, l’arc (et l’aiguille) s’animent depuis leur position actuelle.

Package: minerva-design@1.20.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Processeur

Mémoire

Disque

Utilisation : {{metric}}

Net Promoter Score

Requêtes / s

Requêtes par seconde, mises à jour en direct

Mettre en pause

Reprendre

Vitesse

Compteur de vitesse : {{speed}}

Freiner

Accélérer

Stockage

Appels d'API

Postes

Minutes de build

{{used}} sur {{limit}}

{{quota}} : {{share}} du quota utilisé

Disponibilité, 30 jours

Objectif : {{value}}

Disponibilité sur 30 jours face à l'objectif

Budget d'erreur restant

{{used}} d'indisponibilité sur {{budget}} autorisées

Budget d'erreur restant ce mois-ci

Unité de température

°C

°F

consigne

Pièce : {{value}}

Température de consigne du thermostat

Baisser la consigne

Augmenter la consigne

Chauffe jusqu’à {{target}} (pièce : {{room}})

Refroidit jusqu’à {{target}} (pièce : {{room}})

Maintient {{target}} (pièce : {{room}})

Demandeur

score de crédit

Faible

Passable

Bon

Très bon

Exceptionnel

À {{share}} de l’échelle

Score de crédit de {{name}}

{{name}} : {{score}}. {{advice}}

La plupart des prêteurs refuseront la demande.

Un accord est possible, à un taux plus élevé.

Éligible à la plupart des prêts aux taux standards.

Éligible à des taux meilleurs que la moyenne.

Éligible aux meilleurs taux proposés.

chargée

Autonomie : {{range}}

Charge de la batterie de la voiture

Branchée

Réinitialiser

Charge complète

Débranchée

Charge rapide

Charge lente au-delà de 80 %

80 % dans {{minutes}}

{{value}} tr/min

{{value}} MW

Panneau sombre

Vitesse du rotor

Puissance produite

Température de la nacelle

{{reading}} de l’éolienne : {{value}}

## GaugeChart

Support: beta

Native Angular: MnGaugeChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnGaugeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "min",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "thickness",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "needle",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "ticks",
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

## Example: Plages et aiguille

bands colore la piste par plage (rouge, orange, vert) et l’arc de valeur prend la couleur de sa plage ; needle pointe la valeur, min peut être négatif.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGaugeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGaugeChart],
  template: `
<mn-gauge-chart
  [value]="72"
  [label]="labels[language()]"
  [bands]="[
    { to: 60, color: 'var(--success-color, #16a34a)' },
    { to: 85, color: 'var(--warning-color, #f59e0b)' },
    { to: 100, color: 'var(--danger-color, #dc2626)' }
  ]"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": "CPU load",
  "zh": "CPU 负载",
  "ja": "CPU 負荷",
  "fr": "Charge CPU"
};
}

```

## Example: Needle and custom scale

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGaugeChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGaugeChart],
  template: `
<mn-gauge-chart
  [value]="128"
  [max]="200"
  [label]="labels[language()]"
  needle
  [sweep]="270"
  [thickness]="0.1"
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": "Speed (km/h)",
  "zh": "速度（公里/小时）",
  "ja": "速度（km/h）",
  "fr": "Vitesse (km/h)"
};
}

```
