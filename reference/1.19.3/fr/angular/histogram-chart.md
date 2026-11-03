# Histogramme

La distribution d'échantillons bruts en classes de même largeur, de quelques centaines de valeurs à des millions.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Requêtes

Distribution d'un million de latences avec p50, p95 et p99

Règle de classes

Auto

Sturges

10 classes

40 classes

Étudiants

Note

Distribution des notes de l'examen

Clients

Âge

Distribution des âges des clients

Contrôle

Nouvel accueil

Durée de session (minutes)

Durées de session des deux groupes d'un test A/B

Ajustement normal

LSI

LSS

Nominal

Outil réglé

Moyenne {{mean}}, σ {{sd}}, Cpk {{cpk}}, {{ppm}} ppm hors tolérance :

capable

non capable

Pièces

Diamètre

Distribution des diamètres d'arbres avec les limites de spécification et une courbe normale ajustée

Livraison gratuite

Médiane {{value}}

p99 {{value}}

{{share}} des commandes atteignent le seuil de livraison gratuite de {{threshold}}.

Commandes

Montant de la commande (échelle log)

Distribution des montants de commande sur une échelle logarithmique

Pause

Reprendre

Réinitialiser

{{share}} des appels décrochés en {{target}} ou moins, p90 {{p90}} :

objectif atteint

objectif manqué

Appels

Temps d'attente

Objectif

p90

Distribution en direct des temps d'attente des 600 derniers appels au support

{{share}} des employés

{{value}} employés ({{share}})

Cliquez pour la part cumulée

Cliquez sur une barre pour voir la part des employés dont le trajet est plus court.

{{share}} des employés ({{employees}}) font un trajet de {{limit}} ou moins.

Employés

Trajet aller

Distribution des temps de trajet des employés

## HistogramChart

Support: beta

Native Angular: MnHistogramChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHistogramChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "values",
    "typeText": "ArrayLike<number>",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "bins",
    "typeText": "HistogramBinning | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "domain",
    "typeText": "readonly [number, number] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "nice",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "formatBin",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Distribution des latences

Un million de latences classées en quelques millisecondes ; quantiles donne les p50, p95 et p99 exacts, dessinés en lignes de référence x.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<mn-histogram-chart
  [values]="latency"
  [name]="t.requests"
  [xAxis]="{ title: t.ms }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  latency = Array.from({ length: 5000 }, (_, i) => Math.round(Math.exp(4.8 + 0.35 * Math.sqrt(-2 * Math.log(1 - (Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1))) * Math.cos(2 * Math.PI * (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1)))));
  labels = {
  "en": {
    "requests": "Requests",
    "ms": "Response time (ms)"
  },
  "zh": {
    "requests": "请求数",
    "ms": "响应时间（毫秒）"
  },
  "ja": {
    "requests": "リクエスト数",
    "ms": "応答時間（ms）"
  },
  "fr": {
    "requests": "Requêtes",
    "ms": "Temps de réponse (ms)"
  }
};
}

```

## Example: Règles de classes

bins prend un nombre ou une règle : auto (Freedman-Diaconis, robuste aux valeurs extrêmes), sturges (log2 n + 1) ou un nombre fixe ; les deux groupes de niveaux apparaissent avec assez de classes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHistogramChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHistogramChart],
  template: `
@let t = labels[language()];
<div style="display: flex; gap: 8px; align-items: center">
  <span>{{ t.bins }}</span>
  <button type="button" (click)="bins = 'sturges'">Sturges</button>
  <button type="button" (click)="bins = 10">10</button>
  <button type="button" (click)="bins = 40">40</button>
</div>
<mn-histogram-chart
  [values]="ages"
  [bins]="bins"
  [name]="t.count"
  [xAxis]="{ title: t.age }"
  [height]="280"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  bins: number | 'sturges' = "sturges";
  ages = Array.from({ length: 2000 }, (_, i) => Math.round((i % 3 ? 42 : 22) + ((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) - 1) * (i % 3 ? 16 : 6)));
  labels = {
  "en": {
    "count": "Count",
    "bins": "Bins:",
    "age": "Age"
  },
  "zh": {
    "count": "人数",
    "bins": "分箱：",
    "age": "年龄"
  },
  "ja": {
    "count": "人数",
    "bins": "ビン：",
    "age": "年齢"
  },
  "fr": {
    "count": "Effectif",
    "bins": "Classes :",
    "age": "Âge"
  }
};
}

```
