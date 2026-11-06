# Graphique en cascade

Comment une suite de hausses et de baisses mène une valeur d'un début à une fin, avec sous-totaux et totaux : passages de résultat, trésorerie, écarts. De fins tirets relient chaque barre à la suivante.

Package: minerva-design@1.21.1

Renderer: weapp

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

Chiffre d'affaires

Coût des ventes

Marge brute

R&D

Marketing

Frais généraux

Résultat d'exploitation

Intérêts

Impôts

Résultat net

Montant

Compte de résultat du chiffre d'affaires au résultat net

Ouverture

Clôture

Flux net

Flux de trésorerie mensuels du solde d'ouverture au solde de clôture

Budget

Réel

Volume

Prix

Mix produit

Change

Matières premières

Économies

Écart

Facteurs de l'écart entre la marge budgétée et la marge réelle

Début d'année

Fin d'année

Recrutements

Mutations entrantes

Démissions

Mutations sortantes

Départs en retraite

Personnes

Évolution des effectifs sur l'année

ARR d'ouverture

Nouvelles affaires

Expansion

Contraction

Attrition

ARR de clôture

ARR

Trimestre

T{{n}}

{{quarter}} : ARR net ajouté {{net}} · rétention nette du revenu {{nrr}}

Pont d'ARR du {{quarter}}

Prix catalogue

Remise distributeur

Promotions

Prix facturé

Conditions de paiement

Transport

Ristournes

Prix de poche

Prix unitaire

Cliquez sur une barre pour la comparer au prix catalogue

{{step}} : {{value}}, {{share}} du prix catalogue

Cascade de prix, du prix catalogue au prix de poche

Référence 2019

Croissance de l'activité

Efficacité énergétique

Électricité renouvelable

Flotte électrique

Réfrigérants

Acquisition

2025

Objectif 2030

{{value}} kt CO₂e

Émissions

Variation : {{value}}

De {{from}} à {{to}}

{{value}} au-dessus de l'objectif 2030

Pont des émissions, de la référence 2019 à 2025

Saisie de la commande

Contrôle de crédit

Préparation

Contrôle qualité

Attente du transporteur

Transport

Douane

Délai

Durée

Travail

Attente

le travail occupe {{work}} sur {{total}} ({{share}})

Délai d'une commande par étape

Avant

Maintenant

Solde

Paiement client

Facture fournisseur

Paie

Frais de carte

Remboursement

Dernière : {{time}} · {{kind}} {{amount}}

Pause

Reprendre

Trésorerie de la journée, mise à jour en direct

Engagé

Ajouté

Retiré

Réestimé

Reporté

Terminé

Points d'effort

Orientation

Verticale

Horizontale

Étiquettes

Connecteurs

Périmètre du sprint, des points engagés aux points terminés

## WaterfallChart

Support: beta

Waterfall of changes, subtotals and totals (`steps`), colors, start, labels, locale, orientation; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/waterfall-chart/index",
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
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
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
    "name": "steps",
    "typeText": "array",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "upColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "downColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "totalColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "start",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "connector",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
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
