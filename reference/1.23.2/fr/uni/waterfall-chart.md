# Graphique en cascade

Comment une suite de hausses et de baisses mène une valeur d'un début à une fin, avec sous-totaux et totaux : passages de résultat, trésorerie, écarts. De fins tirets relient chaque barre à la suivante.

Package: minerva-design@1.23.2

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "WaterfallChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "labels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "connector",
    "typeText": "boolean | ChartConnectorOptions | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "start",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "steps",
    "typeText": "readonly WaterfallStep[]",
    "required": true
  },
  {
    "name": "upColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "downColor",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "totalColor",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
