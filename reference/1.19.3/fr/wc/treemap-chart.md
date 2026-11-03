# Treemap

Des rectangles imbriqués dont l’aire est proportionnelle aux valeurs : on voit d’un coup d’œil ce qui prend le plus de place dans une hiérarchie (espace disque, budgets, portefeuilles). Survolez ou utilisez les flèches pour mettre une cellule en évidence ; l’infobulle affiche son chemin.

Package: minerva-design@1.19.3

Renderer: wc

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/treemap-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "gap",
    "typeText": "number",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "hideHeaders",
    "typeText": "boolean",
    "attribute": "hide-headers",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly TreemapNode[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<TreemapChartOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Liste plate

Un rectangle par région, d'aire proportionnelle à la population.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/wc/flat.html

```html
<minerva-treemap-chart
  id="markets"
  gap="4"
  height="300"
></minerva-treemap-chart>

```

### apps/docs/src/docs/pages/treemap-chart/wc/flat.ts

```tsx
// A flat list: one rectangle per node, its area proportional to the value.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: ["Asia", "Europe", "North America", "South America", "Africa", "Oceania"],
  zh: ["亚洲", "欧洲", "北美洲", "南美洲", "非洲", "大洋洲"],
  ja: ["アジア", "ヨーロッパ", "北米", "南米", "アフリカ", "オセアニア"],
  fr: [
    "Asie",
    "Europe",
    "Amérique du Nord",
    "Amérique du Sud",
    "Afrique",
    "Océanie",
  ],
};

export function setup(root: HTMLElement) {
  const regions =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreemapChart>("#markets")!;
  chart.data = [4750, 745, 600, 440, 1460, 46].map((value, i) => ({
    name: regions[i],
    value,
  }));
  chart.options = { format: (millions) => `${millions}M` };
}

```

## Example: Nœuds imbriqués

L'espace disque par dossier : les parents additionnent leurs enfants et affichent leur nom au-dessus.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/wc/nested.html

```html
<minerva-treemap-chart id="disk" height="320"></minerva-treemap-chart>

```

### apps/docs/src/docs/pages/treemap-chart/wc/nested.ts

```tsx
// Parents sum their children and draw their name above them.
import type { MinervaTreemapChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    media: "Media",
    documents: "Documents",
    apps: "Apps",
    photos: "Photos",
    videos: "Videos",
    music: "Music",
    work: "Work",
    personal: "Personal",
    tools: "Tools",
    games: "Games",
  },
  zh: {
    media: "媒体",
    documents: "文档",
    apps: "应用",
    photos: "照片",
    videos: "视频",
    music: "音乐",
    work: "工作",
    personal: "个人",
    tools: "工具",
    games: "游戏",
  },
  ja: {
    media: "メディア",
    documents: "書類",
    apps: "アプリ",
    photos: "写真",
    videos: "動画",
    music: "音楽",
    work: "仕事",
    personal: "個人",
    tools: "ツール",
    games: "ゲーム",
  },
  fr: {
    media: "Médias",
    documents: "Documents",
    apps: "Applications",
    photos: "Photos",
    videos: "Vidéos",
    music: "Musique",
    work: "Travail",
    personal: "Personnel",
    tools: "Outils",
    games: "Jeux",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTreemapChart>("#disk")!;
  chart.data = [
    {
      name: text.media,
      children: [
        { name: text.photos, value: 48 },
        { name: text.videos, value: 96 },
        { name: text.music, value: 22 },
      ],
    },
    {
      name: text.documents,
      children: [
        { name: text.work, value: 31 },
        { name: text.personal, value: 12 },
      ],
    },
    {
      name: text.apps,
      children: [
        { name: text.tools, value: 40 },
        { name: text.games, value: 64 },
      ],
    },
  ];
  chart.options = { format: (gb) => `${gb} GB` };
}

```
