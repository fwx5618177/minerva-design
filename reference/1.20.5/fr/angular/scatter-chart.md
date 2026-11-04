# Nuage de points

Points placés selon deux valeurs, avec taille, couleur et libellé par point. Zoom sur les deux axes.

Package: minerva-design@1.20.5

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

Essentiel

Entreprise

Postes

Facture mensuelle

Facture mensuelle selon le nombre de postes, par offre

Pays

PIB par habitant

Espérance de vie

Espérance de vie selon le PIB par habitant ; la taille du point est la population

Groupe {{name}}

Deux groupes de 100 000 points chacun

{{points}} points · dessinés avec {{renderer}}

Durée de session selon le nombre de pages vues

Minutes

Pages

Gratuit

Pro

{{plan}} : {{minutes}} min, {{pages}} pages

Touchez un point

Campagnes

Tendance

Dépense publicitaire par semaine

Chiffre d'affaires par semaine

R² = {{r2}} · +{{slope}} de chiffre d'affaires par dollar dépensé

Chiffre d'affaires selon la dépense publicitaire de 60 campagnes, avec une droite de tendance

Manchot Adélie

Manchot à jugulaire

Manchot papou

Longueur de nageoire

Masse corporelle

Longueur de nageoire et masse corporelle de trois espèces de manchots

Requêtes

Valeur aberrante

Attendu

Taille de la charge

Temps de réponse

Temps de réponse selon la taille de la charge, valeurs aberrantes en rouge

{{slow}} requêtes sur {{total}} ont pris plus de deux fois le temps attendu.

Mesures

Nuits fraîches

Plage de culture

Après-midi chauds

Tout afficher

Température

Humidité relative

Plage de culture

Mesures de température et d'humidité des capteurs de la serre

Visible : {{t0}} – {{t1}}, humidité {{h0}} – {{h1}} · mesures affichées : {{points}}

Choisissez une région, ou zoomez avec Ctrl / ⌘ + molette

Ingénierie

Ventes

Support

Ancienneté

Note d'évaluation (1–5)

Moyenne de l'entreprise

Ancienneté et note d'évaluation de 90 employés, par service

{{id}} · {{department}} · {{tenure}} · note {{score}} · {{salary}} par an

Cliquez sur un point pour sélectionner un employé, sur la zone vide pour effacer la sélection

Joueurs

Moyenne de la ligue

Marqueurs efficaces

Gros volumes de tirs

{{value}} points par match

Taux d'utilisation : {{value}}

True shooting : {{value}}

Taux d'utilisation

True shooting (adresse réelle)

Taux d'utilisation et adresse au tir de 16 joueurs ; la taille du point est le nombre de points par match

Normal

Alarme

Dernier

{{value}} mm/s

Pause

Reprendre

Dernier échantillon : {{rpm}} tr/min, {{value}} · alarmes à l'écran : {{alarms}}

Vitesse (tr/min)

Vibration

Seuil d'alarme

Vibration en direct d'un moteur selon sa vitesse

Mammifères

Musaraigne

Souris

Rat

Lapin

Chat

Chien

Humain

Porc

Cheval

Vache

Girafe

Éléphant

Loi de puissance ajustée

{{value}} kg

{{value}} W

Masse corporelle

Métabolisme de base

Métabolisme ∝ masse^{{exponent}} (loi de Kleiber)

Métabolisme de base selon la masse corporelle de 12 mammifères, sur axes log-log

## ScatterChart

Support: beta

Native Angular: MnScatterChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatterChart"
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
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
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

## Example: Two clusters

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[
    { name: t.teamA, data: teamA },
    { name: t.teamB, data: teamB }
  ]"
  [xAxis]="{ title: t.hours }"
  [yAxis]="{ title: t.score }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  teamA = [
  {
    "x": 17.05,
    "y": 66.86
  },
  {
    "x": 11.05,
    "y": 53.86
  },
  {
    "x": 8.21,
    "y": 59.23
  },
  {
    "x": 17.99,
    "y": 70.85
  },
  {
    "x": 7.8,
    "y": 62.49
  },
  {
    "x": 11.6,
    "y": 53.03
  },
  {
    "x": 16.73,
    "y": 63.83
  },
  {
    "x": 6.1,
    "y": 70.5
  },
  {
    "x": 15.14,
    "y": 57.98
  },
  {
    "x": 13.72,
    "y": 54.53
  },
  {
    "x": 6.57,
    "y": 67.94
  },
  {
    "x": 17.52,
    "y": 67.94
  },
  {
    "x": 10.08,
    "y": 54.53
  },
  {
    "x": 9.04,
    "y": 57.99
  },
  {
    "x": 17.86,
    "y": 70.51
  },
  {
    "x": 7.15,
    "y": 63.82
  }
];
  teamB = [
  {
    "x": 21.46,
    "y": 74.12
  },
  {
    "x": 26.1,
    "y": 87.51
  },
  {
    "x": 30.41,
    "y": 83.95
  },
  {
    "x": 20.03,
    "y": 71.47
  },
  {
    "x": 29.55,
    "y": 78.25
  },
  {
    "x": 27.24,
    "y": 88.98
  },
  {
    "x": 20.8,
    "y": 79.43
  },
  {
    "x": 31.69,
    "y": 71.17
  },
  {
    "x": 23.61,
    "y": 82.84
  },
  {
    "x": 23.48,
    "y": 88.1
  },
  {
    "x": 31.74,
    "y": 75.07
  },
  {
    "x": 20.87,
    "y": 73.17
  },
  {
    "x": 27.1,
    "y": 86.69
  },
  {
    "x": 29.67,
    "y": 85.11
  },
  {
    "x": 20.02,
    "y": 71.99
  },
  {
    "x": 30.31,
    "y": 76.96
  }
];
  labels = {
  "en": {
    "teamA": "Team A",
    "teamB": "Team B",
    "hours": "Hours",
    "score": "Score"
  },
  "zh": {
    "teamA": "A 组",
    "teamB": "B 组",
    "hours": "小时",
    "score": "得分"
  },
  "ja": {
    "teamA": "チームA",
    "teamB": "チームB",
    "hours": "時間",
    "score": "スコア"
  },
  "fr": {
    "teamA": "Équipe A",
    "teamB": "Équipe B",
    "hours": "Heures",
    "score": "Score"
  }
};
}

```

## Example: Clicked point

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.cities, pointSize: 12, data: [
    { x: 20.5, y: 31, label: t.names[0] },
    { x: 10.9, y: 17, label: t.names[1] },
    { x: 6.8, y: 15, label: t.names[2] },
    { x: 4.9, y: 15, label: t.names[3] },
    { x: 4.8, y: 21, label: t.names[4] },
    { x: 5.2, y: 16, label: t.names[5] }
  ] }]"
  [xAxis]="{ title: t.density }"
  [yAxis]="{ title: t.rent }"
  [height]="280"
  (pointClick)="selected = $event.items[0]?.label + ': ' + $event.items[0]?.x + ' · ' + $event.items[0]?.y + ' €/m²'"
/>
<output aria-live="polite">{{ selected || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  selected = "";
  labels = {
  "en": {
    "cities": "Cities",
    "density": "Density (k/km²)",
    "rent": "Rent (€/m²)",
    "hint": "Click a city",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  },
  "zh": {
    "cities": "城市",
    "density": "人口密度（千人/km²）",
    "rent": "租金（欧元/m²）",
    "hint": "点击一个城市",
    "names": ["巴黎", "里昂", "里尔", "南特", "尼斯", "波尔多"]
  },
  "ja": {
    "cities": "都市",
    "density": "人口密度（千人/km²）",
    "rent": "家賃（€/m²）",
    "hint": "都市をクリックします",
    "names": ["パリ", "リヨン", "リール", "ナント", "ニース", "ボルドー"]
  },
  "fr": {
    "cities": "Villes",
    "density": "Densité (k/km²)",
    "rent": "Loyer (€/m²)",
    "hint": "Cliquez sur une ville",
    "names": ["Paris", "Lyon", "Lille", "Nantes", "Nice", "Bordeaux"]
  }
};
}

```
