# Treemap

Des rectangles imbriqués dont l’aire est proportionnelle aux valeurs : on voit d’un coup d’œil ce qui prend le plus de place dans une hiérarchie (espace disque, budgets, portefeuilles). Survolez ou utilisez les flèches pour mettre une cellule en évidence ; l’infobulle affiche son chemin.

Package: minerva-design@1.22.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Médias

Vidéos

Photos

Musique

Applications

Projets

Système

Bibliothèque

Caches

Journaux

Téléchargements

Programmes d'installation

Archives

Utilisation du disque par dossier

{{path}} : {{size}} ({{share}} du disque)

Cliquez sur une cellule pour voir où elle se trouve

Ingénierie

Ventes

Marketing

Succès client

Opérations

Finance

Ressources humaines

Juridique

Budget annuel par service

Technologie

Finance

Santé

Énergie

Consommation

Capitalisation : {{value}}

Carte du marché boursier par secteur, colorée selon la variation du jour

{{share}} du bundle

Taille du bundle JavaScript par module

Total {{size}} ; dépendances de plus de 100 Ko : {{modules}}.

Électronique

Maison

Mode

Sport

Téléphones

Ordinateurs portables

Audio

Cuisine

Meubles

Décoration

Femme

Homme

Enfant

Plein air

Fitness

Chemin dans le catalogue

Toutes les catégories

Chiffre d’affaires trimestriel par catégorie, sous-catégorie et marque

Chiffre d’affaires {{category}} par sous-catégorie et marque

{{path}} : {{revenue}}, soit {{share}} de la catégorie.

Cliquez sur une catégorie pour l’ouvrir.

Cliquez sur une marque pour lire son chiffre d’affaires.

Calcul

Bases de données

Stockage

Réseau

Observabilité

{{share}} de la facture

Coûts cloud mensuels par service et ressource

Affiché : {{visible}}, soit {{share}} de la facture de {{total}}.

Facture du mois : {{total}}.

Tout afficher

Mises à jour en direct

{{used}} sur {{limit}} ({{share}})

Mémoire utilisée par les pods du cluster, par namespace

Au-delà de {{threshold}} de leur limite mémoire : {{pods}}

Tous les pods sont sous {{threshold}} de leur limite mémoire.

Europe

Amériques

Asie-Pacifique

Mesure

Chiffre d’affaires

Commandes

Marge

{{share}} du total ({{metric}})

Ventes annuelles par région et par pays : {{metric}}

## TreemapChart

Support: beta

Native Angular: MnTreemapChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTreemapChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly TreemapNode[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape.ts"
  },
  {
    "name": "headers",
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

## Example: Nested nodes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTreemapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreemapChart],
  template: `
@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t.media, children: [
      { name: t.photos, value: 48 },
      { name: t.videos, value: 96 },
      { name: t.music, value: 22 }
    ] },
    { name: t.documents, children: [
      { name: t.work, value: 31 },
      { name: t.personal, value: 12 }
    ] },
    { name: t.apps, children: [
      { name: t.tools, value: 40 },
      { name: t.games, value: 64 }
    ] }
  ]"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "media": "Media",
    "documents": "Documents",
    "apps": "Apps",
    "photos": "Photos",
    "videos": "Videos",
    "music": "Music",
    "work": "Work",
    "personal": "Personal",
    "tools": "Tools",
    "games": "Games"
  },
  "zh": {
    "media": "媒体",
    "documents": "文档",
    "apps": "应用",
    "photos": "照片",
    "videos": "视频",
    "music": "音乐",
    "work": "工作",
    "personal": "个人",
    "tools": "工具",
    "games": "游戏"
  },
  "ja": {
    "media": "メディア",
    "documents": "書類",
    "apps": "アプリ",
    "photos": "写真",
    "videos": "動画",
    "music": "音楽",
    "work": "仕事",
    "personal": "個人",
    "tools": "ツール",
    "games": "ゲーム"
  },
  "fr": {
    "media": "Médias",
    "documents": "Documents",
    "apps": "Applications",
    "photos": "Photos",
    "videos": "Vidéos",
    "music": "Musique",
    "work": "Travail",
    "personal": "Personnel",
    "tools": "Outils",
    "games": "Jeux"
  }
};
}

```

## Example: À plat

Sans enfants, chaque nœud est une feuille ; gap élargit l’espace entre les cellules.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTreemapChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTreemapChart],
  template: `
@let t = labels[language()];
<mn-treemap-chart
  [data]="[
    { name: t[0], value: 4750 },
    { name: t[1], value: 745 },
    { name: t[2], value: 600 },
    { name: t[3], value: 440 },
    { name: t[4], value: 1460 },
    { name: t[5], value: 46 }
  ]"
  [gap]="4"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  "zh": ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  "ja": ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  "fr": ["Asie", "Europe", "Amérique du Nord", "Amérique du Sud", "Afrique", "Océanie"]
};
}

```
