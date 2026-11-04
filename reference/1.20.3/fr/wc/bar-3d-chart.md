# Histogramme 3D

Des barres sur une grille de catégories x × y : volumes éclairés, couleurs par série, empilement entre séries, couleurs d'une échelle selon la hauteur ou une autre valeur, légende et barre de couleurs.

Package: minerva-design@1.20.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Ventes

Région

Mois

Nord

Sud

Est

Ouest

Centre

Ventes mensuelles de cinq régions

Trimestre

T1

T2

T3

T4

Marché

Amériques

Europe

Asie

Océanie

Matériel

Logiciels

Services

Chiffre d'affaires

Chiffre d'affaires trimestriel de trois gammes dans quatre marchés, empilé

Femmes

Hommes

Âge

{{from}}–{{to}} ans

{{from}} ans et +

Année du recensement

Population

{{value}} M

Population par tranche d'âge et par sexe lors de quatre recensements

Visites

Heure

Jour

Visites d'un site par heure de la semaine

Produit

Portables

Téléphones

Tablettes

Montres

Audio

Marge

Chiffre d'affaires et marge de cinq produits dans quatre marchés

En stock

Stock bas

{{value}} unités

Mises à jour en direct

Allée

Allée {{id}}

Niveau d'étagère

Niveau {{n}}

Unités

Unités restant dans chaque emplacement de l'entrepôt par allée et niveau, mises à jour en direct

{{total}} unités en stock · emplacements bas : {{low}} sur {{bins}} · emplacements réapprovisionnés : {{restocked}}.

Rétention

Mois depuis l'inscription

M{{n}}

Mois d'inscription

Rétention des cohortes mensuelles d'inscrits selon le nombre de mois depuis l'inscription

Cohorte de {{cohort}}, mois {{n}} : {{retention}} encore actifs ({{users}} utilisateurs sur {{total}}).

Cliquez sur une barre pour lire la rétention d'une cohorte.

Ingénierie

Ventes

Marketing

Opérations

Support

Finance

Dépense réelle

Exercice

Écart au budget

Service

Dépenses trimestrielles et écarts au budget de six services en {{year}}

{{department}}, {{quarter}} : {{actual}} dépensés pour un budget de {{budget}} ({{variance}}).

{{year}} : {{actual}} dépensés pour un budget de {{budget}} ({{variance}}). Plus fort dépassement : {{department}}, {{quarter}} ({{worst}}).

{{value}} kW

Température d'entrée d'air

Thème sombre

Vue 3D

Plan

Baie

Rangée

Rangée {{id}}

Puissance consommée

Baies de serveurs par rangée et position, la hauteur étant la puissance consommée et la couleur la température d'entrée d'air

Baie {{rack}} : {{power}}, entrée d'air à {{inlet}}, au-dessus de la limite de {{limit}}.

Baie {{rack}} : {{power}}, entrée d'air à {{inlet}}, sous la limite de {{limit}}.

Baies au-dessus de {{limit}} en entrée d'air : {{hot}} sur {{total}} ({{racks}}). Cliquez sur une baie pour voir ses mesures.

## Bar3DChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bar-3d-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "barWidth",
    "typeText": "number",
    "attribute": "bar-width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly S[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Chart3DBaseOptions | undefined",
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
    "description": "The hovered point, cell or bar changed; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point, cell or bar was clicked; detail: { seriesIndex, seriesName, type, index, x, y, z, value, color, label }"
  },
  {
    "name": "minerva-camera-change",
    "typeText": "CustomEvent",
    "description": "The user rotated, zoomed, panned or reset the camera; detail: { azimuth, elevation, zoom, pan, projection }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Ventes par région et trimestre

Une barre par cellule région × trimestre, colorée selon la hauteur ; les axes nomment les catégories.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/wc/sales.html

```html
<minerva-bar-3d-chart id="sales" height="420"></minerva-bar-3d-chart>

```

### apps/docs/src/docs/pages/bar-3d-chart/wc/sales.ts

```tsx
// <minerva-bar-3d-chart>: a bar per region × quarter cell, colored by
// height (`colorBy: "z"`); the axes name the categories.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    sales: "Sales (k€)",
    regions: ["North", "South", "East", "West"],
    quarters: ["Q1", "Q2", "Q3", "Q4"],
  },
  zh: {
    sales: "销售额（千欧元）",
    regions: ["华北", "华南", "华东", "华西"],
    quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
  },
  ja: {
    sales: "売上（千ユーロ）",
    regions: ["北部", "南部", "東部", "西部"],
    quarters: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  },
  fr: {
    sales: "Ventes (k€)",
    regions: ["Nord", "Sud", "Est", "Ouest"],
    quarters: ["T1", "T2", "T3", "T4"],
  },
};

// sales per region (rows) and quarter (columns), k€
const SALES = [
  [120, 135, 150, 180],
  [90, 110, 105, 130],
  [160, 170, 190, 220],
  [70, 85, 95, 100],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBar3DChart>("#sales")!;
  chart.series = [
    {
      name: text.sales,
      colorBy: "z",
      data: SALES.flatMap((row, i) =>
        row.map((z, j) => ({ x: text.regions[i], y: text.quarters[j], z })),
      ),
    },
  ];
  chart.options = {
    xAxis: { categories: text.regions },
    yAxis: { categories: text.quarters },
    zAxis: { title: text.sales },
  };
}

```

## Example: Canaux empilés

Deux séries sur les mêmes cellules s’empilent (magasins et en ligne) ; barres plus fines, légende interactive.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bar-3d-chart/wc/stacked.html

```html
<minerva-bar-3d-chart
  id="channels"
  bar-width="0.55"
  height="420"
></minerva-bar-3d-chart>

```

### apps/docs/src/docs/pages/bar-3d-chart/wc/stacked.ts

```tsx
// Two series on the same cells are stacked: sales in stores and online per
// product and year; `bar-width` thins the bars, the legend toggles a channel.
import type { MinervaBar3DChart } from "minerva-design/web-components/chart-3d";

const TEXT = {
  en: {
    channels: ["Stores", "Online"],
    years: ["2023", "2024", "2025"],
    products: ["Shoes", "Bags", "Watches"],
  },
  zh: {
    channels: ["门店", "线上"],
    years: ["2023", "2024", "2025"],
    products: ["鞋子", "包袋", "手表"],
  },
  ja: {
    channels: ["店舗", "オンライン"],
    years: ["2023", "2024", "2025"],
    products: ["靴", "バッグ", "時計"],
  },
  fr: {
    channels: ["Magasins", "En ligne"],
    years: ["2023", "2024", "2025"],
    products: ["Chaussures", "Sacs", "Montres"],
  },
};

// per channel: products (rows) × years (columns), k units
const CHANNELS = [
  [
    [40, 38, 35],
    [22, 24, 20],
    [15, 14, 12],
  ],
  [
    [18, 27, 36],
    [9, 14, 21],
    [6, 9, 13],
  ],
];

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBar3DChart>("#channels")!;
  chart.series = text.channels.map((name, c) => ({
    name,
    data: CHANNELS[c].flatMap((row, i) =>
      row.map((z, j) => ({ x: i, y: j, z })),
    ),
  }));
  chart.options = {
    xAxis: { categories: text.products },
    yAxis: { categories: text.years },
  };
}

```
