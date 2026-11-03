# Barres radiales

Une progression en anneaux concentriques : anneaux d'activité, avancement des OKR, ventes face aux objectifs. Chaque barre remplit son anneau selon sa valeur rapportée à son maximum, sur une piste de fond teintée, avec des extrémités arrondies ; les étiquettes occupent la partie ouverte du cercle et un texte central peut résumer l'ensemble. Survolez un anneau ou utilisez les flèches pour lire sa valeur, son maximum et sa progression.

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
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Bouger

Exercice

Debout

Jour de la semaine

anneaux bouclés

Anneaux d'activité du jour choisi : bouger, exercice et debout face à leurs objectifs

Taux d'activation

Rétention à 4 semaines

NPS au-dessus de 50

Latence p95

Baisse de l'attrition

avancement moyen

Avancement des résultats clés du trimestre

Nord

Sud

Est

Ouest

de l'objectif

Ventes trimestrielles de chaque région face à son objectif

Processeur

Mémoire

Disque

Réseau

Forme

Trois quarts

Cercle complet

Demi-cercle

Extrémités arrondies

Pistes

Utilisation des ressources d'un serveur, en pourcentage de la capacité

Épargne de précaution

Vacances d’été

Nouvel ordinateur

Apport immobilier

Cliquez sur un objectif pour voir le temps nécessaire.

{{goal}} : {{saved}} épargnés sur {{target}}. Reste {{remaining}}, soit environ {{months}} mois à {{monthly}} par mois.

de tous les objectifs

Épargne de chaque objectif comparée à sa cible

R. Silva

M. Kowalski

C. Okafor

L. Moreau

K. Tanaka

E. Jensen

Buts

Passes décisives

Classement

{{rank}}. {{name}}

{{stat}} : {{value}} en {{games}} matchs

{{ratio}} par match

Meilleurs joueurs de la saison : {{stat}}

En tête : {{name}} ({{stat}} : {{value}})

Vidéo de lancement

Photos de l’évènement

Présentation

Sauvegarde de la base

envoyés

Progression de l’envoi de chaque fichier

Recommencer

Tous les fichiers sont envoyés ({{size}}).

{{done}} fichiers sur {{files}} envoyés

Je me sens valorisé

Mes objectifs sont clairs

Je peux progresser ici

Équilibre vie pro / perso

Mon manager me soutient

Je recommanderais l’entreprise

Ordre

Ordre du questionnaire

Plus d’accord d’abord

Moins d’accord d’abord

accord moyen

{{agree}} répondants sur {{answered}} d’accord ({{share}})

Part des salariés d’accord avec chaque affirmation de l’enquête

## RadialBarChart

Support: beta

Native Angular: MnRadialBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadialBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly RadialBarDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Anneaux d'activité

Des anneaux complets (sweep={360}) pour Bouger, Exercice et Debout, chacun face à son objectif du jour (max). Choisir un autre jour anime les anneaux ; faute de place pour les étiquettes, la légende les nomme.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadialBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadialBarChart],
  template: `
@let t = labels[language()];
<mn-radial-bar-chart
  [data]="[
    { name: t.rings[0], value: 420, max: 500, color: '#ef4444' },
    { name: t.rings[1], value: 24, max: 30, color: '#22c55e' },
    { name: t.rings[2], value: 9, max: 12, color: '#06b6d4' }
  ]"
  [sweep]="360"
  centerValue="78 %"
  [centerLabel]="t.today"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "rings": ["Move", "Exercise", "Stand"],
    "today": "of today’s goals"
  },
  "zh": {
    "rings": ["活动", "锻炼", "站立"],
    "today": "今日目标"
  },
  "ja": {
    "rings": ["ムーブ", "エクササイズ", "スタンド"],
    "today": "今日の目標"
  },
  "fr": {
    "rings": ["Bouger", "M’entraîner", "Me lever"],
    "today": "des objectifs du jour"
  }
};
}

```

## Example: Avancement des OKR

Les résultats clés en pourcentage de leur cible (max={100}), étiquetés par leur nom et leur pourcentage avant le début de chaque barre ; l'avancement moyen est écrit au centre.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadialBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadialBarChart],
  template: `
@let n = names[language()];
<mn-radial-bar-chart
  [data]="[
    { name: n[0], value: 92 },
    { name: n[1], value: 74 },
    { name: n[2], value: 61 },
    { name: n[3], value: 48 },
    { name: n[4], value: 35 }
  ]"
  [max]="100"
  [innerRadius]="0.2"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  names = {
  "en": ["Revenue", "New customers", "Retention", "NPS", "Hiring"],
  "zh": ["营收", "新客户", "留存率", "净推荐值", "招聘"],
  "ja": ["売上", "新規顧客", "継続率", "NPS", "採用"],
  "fr": ["Chiffre d’affaires", "Nouveaux clients", "Rétention", "NPS", "Recrutement"]
};
}

```
