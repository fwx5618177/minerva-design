# Graphique linéaire

Lignes ou aires remplies sur des nombres, des dates ou des catégories. Gère des millions de points sur le GPU.

Package: minerva-design@1.19.3

Renderer: weapp

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

Cette semaine

Semaine dernière

Visiteurs par jour, cette semaine et la semaine dernière

Stockage utilisé

Jour

Stockage utilisé sur 60 jours

Lisbonne

Oslo

Courbe

Linéaire

Lissée

En escalier

Températures mensuelles moyennes à Lisbonne et à Oslo

Calcul

Stockage

Réseau

Bases de données

Mode d'empilement

Empilé

Dépenses cloud mensuelles par service, empilées

Pages vues

Sessions

Pages vues et sessions quotidiennes, premier semestre 2026

Capteur

Un million de relevés de capteur

{{points}} points · dessinés avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Visiteurs

Lancement du produit

Panne

Visiteurs quotidiens sur 90 jours avec un lancement de produit et une panne

Intérieur

Extérieur

Températures horaires intérieures et extérieures avec des relevés manquants

Les capteurs ont été hors ligne quelques heures : la ligne s'interrompt au lieu de deviner.

Médiane

95e centile

Critique

Objectif {{value}}

Latence de l'API sur six heures, médiane et 95e centile

Clôture

Période

1 M

3 M

6 M

1 A

Tout

Cours de clôture quotidien sur deux ans

Pas

Pas par jour

{{day}} : {{steps}} pas

Touchez ou parcourez la ligne

Processeur

Mémoire

{{hour}} h

Utilisation du processeur et de la mémoire au cours de la journée

Pincez pour zoomer, touchez deux fois pour réinitialiser ; touchez la légende pour masquer une série.

Température du congélateur

Alarme au-dessus de {{value}}

Pause

Reprendre

Alarme : porte ouverte ?

Normal

Dernière mesure {{value}} à {{time}}

Au-dessus du seuil sur la dernière minute : {{readings}}

Température du congélateur sur la dernière minute, mise à jour chaque seconde

Souche sauvage

Mutant

Avec antibiotique

Phase exponentielle

Échelle logarithmique

Temps depuis l'inoculation

UFC / mL

Courbes de croissance de trois cultures bactériennes sur 24 heures

Les segments droits indiquent un taux de croissance constant : la souche sauvage double environ toutes les {{minutes}}.

Sur une échelle linéaire, les petites cultures paraissent plates : revenez à l'échelle logarithmique pour les comparer.

Valeur du portefeuille

Cliquez sur un point pour commencer une mesure, puis sur un second.

Depuis le {{date}} ({{value}}) : cliquez sur un second point.

{{from}} → {{to}} : {{change}} ({{percent}}) en {{days}}

Effacer

Valeur quotidienne d'un portefeuille en 2026 ; cliquez sur deux points pour mesurer la variation

Actions

Obligations

Or

Immobilier

Base 100

Performance de quatre classes d'actifs en base 100, de 2021 à 2026

{{value}} µg/m³

Delhi

Pékin

Paris

Mexico

Tokyo

São Paulo

Moyenne journalière des particules fines (PM2,5) en novembre ; la ligne en pointillés est le seuil de l'OMS, {{value}}.

{{days}}/{{total}} jours au-dessus

PM2,5 quotidiennes à {{city}} sur 30 jours

## LineChart

Support: beta

Chart whose untyped series are lines, or areas with `area`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/line-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
