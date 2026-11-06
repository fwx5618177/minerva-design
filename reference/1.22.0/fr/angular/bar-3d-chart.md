# Histogramme 3D

Des barres sur une grille de catégories x × y : volumes éclairés, couleurs par série, empilement entre séries, couleurs d'une échelle selon la hauteur ou une autre valeur, légende et barre de couleurs.

Package: minerva-design@1.22.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnBar3DChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnBar3DChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "barWidth",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "series",
    "typeText": "readonly S[]",
    "required": true,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "xAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "yAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "zAxis",
    "typeText": "Chart3DAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "camera",
    "typeText": "Chart3DCameraOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "autoRotate",
    "typeText": "number | boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorScale",
    "typeText": "Chart3DColorScale | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "colorBar",
    "typeText": "boolean | Chart3DColorBarOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | Chart3DLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | Chart3DTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<Chart3DOptions, \"series\">> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "Chart3DHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "Chart3DHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "cameraChange",
    "typeText": "Chart3DCameraState",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "Chart3DCameraState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/three-d.ts",
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

## Example: Ventes par région et par mois

Ventes mensuelles de cinq régions : des axes de catégories nommés par la langue et les mois par Intl.DateTimeFormat, montants en devise compacte.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBar3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBar3DChart],
  template: `
@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[{ name: t.sales, colorBy: 'z', data: [
    { x: 0, y: 0, z: 120 }, { x: 0, y: 1, z: 135 }, { x: 0, y: 2, z: 150 }, { x: 0, y: 3, z: 180 },
    { x: 1, y: 0, z: 90 }, { x: 1, y: 1, z: 110 }, { x: 1, y: 2, z: 105 }, { x: 1, y: 3, z: 130 },
    { x: 2, y: 0, z: 160 }, { x: 2, y: 1, z: 170 }, { x: 2, y: 2, z: 190 }, { x: 2, y: 3, z: 220 },
    { x: 3, y: 0, z: 70 }, { x: 3, y: 1, z: 85 }, { x: 3, y: 2, z: 95 }, { x: 3, y: 3, z: 100 }
  ] }]"
  [xAxis]="{ categories: t.regions }"
  [yAxis]="{ categories: t.quarters }"
  [zAxis]="{ title: t.sales }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "sales": "Sales (k€)",
    "regions": ["North", "South", "East", "West"],
    "quarters": ["Q1", "Q2", "Q3", "Q4"]
  },
  "zh": {
    "sales": "销售额（千欧元）",
    "regions": ["华北", "华南", "华东", "华西"],
    "quarters": ["第一季度", "第二季度", "第三季度", "第四季度"]
  },
  "ja": {
    "sales": "売上（千ユーロ）",
    "regions": ["北部", "南部", "東部", "西部"],
    "quarters": ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"]
  },
  "fr": {
    "sales": "Ventes (k€)",
    "regions": ["Nord", "Sud", "Est", "Ouest"],
    "quarters": ["T1", "T2", "T3", "T4"]
  }
};
}

```

## Example: Empilé avec légende

Trois gammes de produits empilées dans chaque case trimestre × marché ; la légende en bas masque une série et les piles se réduisent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnBar3DChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnBar3DChart],
  template: `
@let t = labels[language()];
<mn-bar-3d-chart
  [series]="[
    { name: t.channels[0], data: [
      { x: 0, y: 0, z: 40 }, { x: 0, y: 1, z: 38 }, { x: 0, y: 2, z: 35 },
      { x: 1, y: 0, z: 22 }, { x: 1, y: 1, z: 24 }, { x: 1, y: 2, z: 20 },
      { x: 2, y: 0, z: 15 }, { x: 2, y: 1, z: 14 }, { x: 2, y: 2, z: 12 }
    ] },
    { name: t.channels[1], data: [
      { x: 0, y: 0, z: 18 }, { x: 0, y: 1, z: 27 }, { x: 0, y: 2, z: 36 },
      { x: 1, y: 0, z: 9 }, { x: 1, y: 1, z: 14 }, { x: 1, y: 2, z: 21 },
      { x: 2, y: 0, z: 6 }, { x: 2, y: 1, z: 9 }, { x: 2, y: 2, z: 13 }
    ] }
  ]"
  [barWidth]="0.55"
  [xAxis]="{ categories: t.products }"
  [yAxis]="{ categories: t.years }"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  labels = {
  "en": {
    "channels": ["Stores", "Online"],
    "years": ["2023", "2024", "2025"],
    "products": ["Shoes", "Bags", "Watches"]
  },
  "zh": {
    "channels": ["门店", "线上"],
    "years": ["2023", "2024", "2025"],
    "products": ["鞋子", "包袋", "手表"]
  },
  "ja": {
    "channels": ["店舗", "オンライン"],
    "years": ["2023", "2024", "2025"],
    "products": ["靴", "バッグ", "時計"]
  },
  "fr": {
    "channels": ["Magasins", "En ligne"],
    "years": ["2023", "2024", "2025"],
    "products": ["Chaussures", "Sacs", "Montres"]
  }
};
}

```
