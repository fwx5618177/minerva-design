# Boîte à moustaches

Médianes, quartiles, moustaches et valeurs extrêmes pour comparer des distributions, à partir d'échantillons bruts ou de statistiques calculées. Les valeurs extrêmes sont des anneaux de la couleur de la série : survolez-en une pour lire sa valeur et son groupe.

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
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Passerelle

Authentification

Recherche

Paiement

Recommandations

Images

Temps de réponse

Max

Q3

Médiane

Q1

Min

Valeurs extrêmes

Distribution du temps de réponse de chaque service

Salaire annuel

Développeur junior

Développeur

Développeur senior

Responsable technique

Responsable d'équipe

Distribution des salaires par poste

En semaine

Le week-end

Paris

Lyon

Marseille

Lille

Délai de livraison (heures)

Délais de livraison par ville en semaine et le week-end

Maximale du jour

Moyenne

Distribution des températures maximales quotidiennes par mois

Lint

Tests unitaires

Intégration

Bout en bout

Publication

Portée des moustaches

1,5 × EIQ

3 × EIQ

Min – max

Forme des valeurs aberrantes

Creuses

Pleines

{{value}} exécutions dessinées comme valeurs aberrantes

Durée du build

Distribution des durées de build de chaque pipeline CI

Cliquez sur une boîte ou une valeur aberrante.

{{day}} : un patient a attendu {{value}}.

{{day}} : attente médiane {{median}}, la moitié des patients a attendu entre {{q1}} et {{q3}}, {{outliers}} valeurs aberrantes.

Attente

Objectif de quatre heures

Distribution de l'attente aux urgences par jour de la semaine

Feuilles de style

Scripts

Polices

Images

Vidéos

Échelle logarithmique

{{value}} fichiers dépassent le budget de {{budget}}.

Taille du fichier

Budget

Distribution des tailles de fichiers d'un site web par type

Est des États-Unis

Ouest des États-Unis

Europe de l'Ouest

Asie-Pacifique Sud

Est de l'Amérique du Sud

Pause

Reprendre

SLA menacé : {{regions}}

Toutes les régions respectent le SLA

Latence

SLA

Distribution en direct de la latence des requêtes dans chaque région

## BoxPlotChart

Support: beta

Native Angular: MnBoxPlotChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBoxPlotChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "whisker",
    "typeText": "number | \"minmax\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierShape",
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "outlierSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Temps de réponse par service

groups prend les échantillons bruts de chaque boîte : les quartiles, les moustaches (1,5 écart interquartile) et les valeurs extrêmes sont calculés ; tooltip.labels traduit les lignes de l'infobulle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.services[0], values: samples[0] },
    { x: t.services[1], values: samples[1] },
    { x: t.services[2], values: samples[2] },
    { x: t.services[3], values: samples[3] }
  ]"
  [name]="t.time"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ title: t.time }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  samples = [
  [42, 48, 51, 55, 57, 60, 62, 66, 70, 75, 140],
  [120, 135, 150, 160, 168, 175, 190, 210, 230, 380],
  [30, 32, 35, 36, 38, 40, 41, 43, 47, 52],
  [60, 75, 88, 96, 105, 118, 126, 140, 160, 190, 260]
];
  labels = {
  "en": {
    "time": "Response time (ms)",
    "services": ["Search", "Checkout", "Profile", "Images"]
  },
  "zh": {
    "time": "响应时间（毫秒）",
    "services": ["搜索", "结账", "个人资料", "图片"]
  },
  "ja": {
    "time": "応答時間（ms）",
    "services": ["検索", "決済", "プロフィール", "画像"]
  },
  "fr": {
    "time": "Temps de réponse (ms)",
    "services": ["Recherche", "Paiement", "Profil", "Images"]
  }
};
}

```

## Example: Horizontal

Des statistiques déjà calculées (une donnée avec low, q1, y pour la médiane, q3, high et outliers par boîte) en lignes avec orientation: "horizontal".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBoxPlotChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBoxPlotChart],
  template: `
@let t = labels[language()];
<mn-box-plot-chart
  [groups]="[
    { x: t.classes[0], values: scores[0] },
    { x: t.classes[1], values: scores[1] },
    { x: t.classes[2], values: scores[2] }
  ]"
  [name]="t.score"
  orientation="horizontal"
  whisker="minmax"
  [xAxis]="{ type: 'category' }"
  [yAxis]="{ min: 0, max: 100 }"
  [height]="240"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  scores = [
  [55, 61, 64, 68, 70, 72, 75, 78, 81, 86, 92],
  [40, 52, 58, 63, 66, 71, 73, 77, 84, 95],
  [62, 66, 69, 70, 72, 74, 75, 77, 79, 83]
];
  labels = {
  "en": {
    "score": "Score",
    "classes": ["Class A", "Class B", "Class C"]
  },
  "zh": {
    "score": "分数",
    "classes": ["一班", "二班", "三班"]
  },
  "ja": {
    "score": "得点",
    "classes": ["A 組", "B 組", "C 組"]
  },
  "fr": {
    "score": "Note",
    "classes": ["Classe A", "Classe B", "Classe C"]
  }
};
}

```
