# Graphique radar

Compare un ou quelques éléments selon plusieurs indicateurs aux échelles différentes (compétences, tests de produits, profils aromatiques). Survolez un polygone pour le mettre en évidence avec l’indicateur le plus proche ; les flèches passent d’une série ou d’un indicateur à l’autre, Échap efface ; un clic sur la légende masque une série.

Package: minerva-design@1.21.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Résolution de problèmes

Programmation

Conception de systèmes

Communication

Collaboration

Responsabilité

Candidat

{{value}} / {{max}}

Grille d'entretien d'un candidat

Arôme

Acidité

Douceur

Corps

Amertume

Persistance

Éthiopie Yirgacheffe

Sumatra Mandheling

Profils aromatiques de deux cafés

Performances

Autonomie

Appareil photo

Écran

Rapport qualité-prix

Finition

Notes de test de trois téléphones

Survolez un polygone ou utilisez les flèches pour comparer les téléphones

Vitesse

Tir

Passe

Dribble

Défense

Physique

Attributs de deux footballeurs

Sécurité

Intégrations

Rapports

Mobile

Automatisation

Support

Prix

Notre produit

Principal concurrent

Moyenne du marché

Produits à comparer

Notes des capacités de notre produit, d'un concurrent et du marché

Protéines

Fibres

Sucres

Lipides

Sodium

Calcium

Porridge aux fruits

Œufs sur toast

Yaourt et granola

{{value}} VQ

{{meal}} : {{amount}} ({{share}})

Nutriments de trois petits-déjeuners, en pourcentage de la valeur quotidienne

CPU

Mémoire

E/S disque

Réseau

Latence

Erreurs

Moyenne de la dernière heure

Maintenant

Mises à jour en direct

Alerte : {{metric}} dépasse {{threshold}} de sa capacité.

Métrique la plus chargée : {{metric}}.

Charge actuelle du service comparée à la moyenne de la dernière heure

Communication

Livraison

Expertise

Collaboration

Mentorat

Initiative

Moyenne de l’équipe

Personne

Notes de l’évaluation à 360° de {{name}} comparées à la moyenne de l’équipe

Point fort : {{strength}} ({{strengthGap}} par rapport à l’équipe). À développer : {{growth}} ({{growthGap}}).

Chiffre d’affaires

Affaires gagnées

Taux de réussite

Montant moyen

Appels

NPS

Objectif

Réel

{{kpi}} : {{actual}} pour un objectif de {{target}} ({{attainment}}).

KPI trimestriels d’un commercial comparés à ses objectifs

Cliquez près d’un axe pour lire son KPI.

## RadarChart

Support: beta

Native Angular: MnRadarChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnRadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "dots",
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

## Example: Comparer des produits

Avec trois séries, la légende s’affiche automatiquement ; onHover renvoie la série et l’indicateur le plus proche du pointeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.axes[0], max: 100 },
    { name: t.axes[1], max: 100 },
    { name: t.axes[2], max: 100 },
    { name: t.axes[3], max: 100 },
    { name: t.axes[4], max: 100 }
  ]"
  [series]="[
    { name: t.current, values: [72, 85, 64, 90, 58] },
    { name: t.next, values: [88, 80, 78, 92, 81] }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "current": "Current model",
    "next": "Next model",
    "axes": ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"]
  },
  "zh": {
    "current": "当前型号",
    "next": "新型号",
    "axes": ["速度", "可靠性", "舒适性", "安全性", "能效"]
  },
  "ja": {
    "current": "現行モデル",
    "next": "次期モデル",
    "axes": ["速度", "信頼性", "快適性", "安全性", "効率"]
  },
  "fr": {
    "current": "Modèle actuel",
    "next": "Nouveau modèle",
    "axes": ["Vitesse", "Fiabilité", "Confort", "Sécurité", "Efficacité"]
  }
};
}

```

## Example: Grille circulaire

shape="circle" trace des anneaux ronds, levels en fixe le nombre et dots={false} masque les sommets ; opacity renforce les remplissages.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRadarChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnRadarChart],
  template: `
@let t = labels[language()];
<mn-radar-chart
  [indicators]="[
    { name: t.skills[0], max: 10 },
    { name: t.skills[1], max: 10 },
    { name: t.skills[2], max: 10 },
    { name: t.skills[3], max: 10 },
    { name: t.skills[4], max: 10 },
    { name: t.skills[5], max: 10 }
  ]"
  [series]="[{ name: t.profile, values: [9, 6, 7, 8, 5, 6] }]"
  shape="circle"
  [levels]="5"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "profile": "Profile",
    "skills": ["Frontend", "Backend", "Design", "Testing", "DevOps", "Data"]
  },
  "zh": {
    "profile": "能力画像",
    "skills": ["前端", "后端", "设计", "测试", "运维", "数据"]
  },
  "ja": {
    "profile": "プロフィール",
    "skills": ["フロントエンド", "バックエンド", "デザイン", "テスト", "DevOps", "データ"]
  },
  "fr": {
    "profile": "Profil",
    "skills": ["Front-end", "Back-end", "Design", "Tests", "DevOps", "Données"]
  }
};
}

```
