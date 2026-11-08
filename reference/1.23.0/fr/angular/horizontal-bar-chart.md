# Diagramme en barres horizontales

Des barres qui partent de la gauche, les catégories le long du bord : classements, noms longs, enquêtes divergentes et avancements.

Package: minerva-design@1.23.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Développeurs

Part des développeurs utilisant chaque langage de programmation

Je vois une perspective de carrière ici

Ma charge de travail est raisonnable

J'ai les outils dont j'ai besoin

Mon manager me soutient

Je suis payé équitablement

Pas du tout d'accord

Pas d'accord

D'accord

Tout à fait d'accord

Réponses à l'enquête interne, désaccord à gauche et accord à droite

Terminé

En revue

À faire

Plateforme

Paiements

Mobile

Croissance

Design

État des tickets du jalon pour chaque équipe

Votes

Mode sombre sur toutes les pages et les e-mails

Mode hors ligne sur mobile

Export des rapports en PDF avec graphiques

Authentification unique SAML et OIDC

Synchronisation bidirectionnelle du calendrier

Modifier plusieurs fiches à la fois

Champs personnalisés sur tous les objets

Votes des fonctionnalités les plus demandées

Budget

Réel

Ingénierie

Marketing

Ventes

Support

Finance

Budget et dépenses réelles par service

Variation

Amérique du Nord

Europe

Asie-Pacifique

Amérique latine

Moyen-Orient

Afrique

Variation des utilisateurs actifs mensuels par région

Utilisateurs

Messages

Photos

Plans

Musique

Notes

Utilisateurs actifs mensuels par application

{{app}} : {{users}} M d'utilisateurs

Touchez une barre

Chiffre d'affaires

Unités vendues

Casque sans fil

Montre connectée

Enceinte Bluetooth

Clavier mécanique

Chargeur rapide

Webcam HD

Souris sans fil

Tablette

Câble USB-C

Support d'ordinateur

Classer par

Lignes affichées

Top {{n}}

Tous les produits

Produits les plus vendus du mois dernier, du plus élevé au plus faible

Ces {{n}} produits représentent {{share}} du total.

{{value}} GW

Capacité solaire

Lecture

Pause

Rejouer

Revenir au début

Pays ayant la plus grande capacité solaire installée fin {{year}}

Fourchette de salaire

Junior

Confirmé

Senior

Staff

Principal

Directeur

Offre

Minimum

Milieu

Maximum

Offre / milieu

Offre −{{step}}

Offre +{{step}}

Une offre de {{offer}} entre dans les fourchettes {{levels}}.

Une offre de {{offer}} est en dehors de toutes les fourchettes.

Fourchette de salaire annuel de chaque niveau, avec l'offre en ligne verticale

Budget d'erreur restant

Gel des mises en production

Budget d'erreur restant de chaque service sur les 30 derniers jours, du pire au meilleur

SLO {{slo}}, disponibilité mesurée {{availability}}

Il reste {{minutes}} d'indisponibilité sur {{allowed}}.

Budget dépassé de {{minutes}}.

Cliquez sur un service pour voir son budget.

## HorizontalBarChart

Support: beta

Native Angular: MnHorizontalBarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnHorizontalBarChart"
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
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "labels",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Most visited pages

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[{ name: t.views, data: [
    { x: t.pages[0], y: 48200 },
    { x: t.pages[1], y: 31900 },
    { x: t.pages[2], y: 27400 },
    { x: t.pages[3], y: 15800 },
    { x: t.pages[4], y: 9100 },
    { x: t.pages[5], y: 4300 }
  ] }]"
  [xAxis]="{ type: 'category' }"
  labels
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "views": "Page views",
    "pages": ["Home", "Pricing", "Documentation", "Blog", "Careers", "Contact"]
  },
  "zh": {
    "views": "浏览量",
    "pages": ["首页", "价格", "文档", "博客", "招聘", "联系我们"]
  },
  "ja": {
    "views": "ページビュー",
    "pages": ["ホーム", "料金", "ドキュメント", "ブログ", "採用情報", "お問い合わせ"]
  },
  "fr": {
    "views": "Pages vues",
    "pages": ["Accueil", "Tarifs", "Documentation", "Blog", "Carrières", "Contact"]
  }
};
}

```

## Example: Survey answers, 100 % stacked

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnHorizontalBarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnHorizontalBarChart],
  template: `
@let t = labels[language()];
<mn-horizontal-bar-chart
  [series]="[
    { name: t.answers[0], data: [{ x: t.questions[0], y: 72 }, { x: t.questions[1], y: 58 }, { x: t.questions[2], y: 64 }, { x: t.questions[3], y: 81 }] },
    { name: t.answers[1], data: [{ x: t.questions[0], y: 18 }, { x: t.questions[1], y: 27 }, { x: t.questions[2], y: 21 }, { x: t.questions[3], y: 12 }] },
    { name: t.answers[2], data: [{ x: t.questions[0], y: 10 }, { x: t.questions[1], y: 15 }, { x: t.questions[2], y: 15 }, { x: t.questions[3], y: 7 }] }
  ]"
  [xAxis]="{ type: 'category' }"
  [palette]="answerColors"
  stacked
  percent
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  answerColors = ["var(--success-color, #16a34a)", "var(--text-secondary-color, #9ca3af)", "var(--danger-color, #dc2626)"];
  labels = {
  "en": {
    "answers": ["Agree", "Neutral", "Disagree"],
    "questions": ["Easy to set up", "Good documentation", "Fast enough", "Would recommend"]
  },
  "zh": {
    "answers": ["同意", "中立", "不同意"],
    "questions": ["易于上手", "文档完善", "速度够快", "愿意推荐"]
  },
  "ja": {
    "answers": ["そう思う", "どちらでもない", "そう思わない"],
    "questions": ["導入が簡単", "ドキュメントが充実", "十分に速い", "人に勧めたい"]
  },
  "fr": {
    "answers": ["D’accord", "Neutre", "Pas d’accord"],
    "questions": ["Facile à installer", "Bonne documentation", "Assez rapide", "Je recommande"]
  }
};
}

```
