# Graphique en cascade

Comment une suite de hausses et de baisses mène une valeur d'un début à une fin, avec sous-totaux et totaux : passages de résultat, trésorerie, écarts. De fins tirets relient chaque barre à la suivante.

Package: minerva-design@1.20.4

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize. No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text. QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "steps",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly WaterfallStep[]",
    "typeRef": "type:3873f9105900201e8357",
    "required": true,
    "description": "Changes, subtotals and totals, in order"
  },
  {
    "name": "labels",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Writes the change (or the total) at the end of every bar"
  },
  {
    "name": "orientation",
    "source": "packages/taro/src/charts.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` lays the steps out in rows"
  },
  {
    "name": "ariaLabel",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  },
  {
    "name": "xAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart (needed to pan a zoomed chart or drag points)"
  },
  {
    "name": "height",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "legend",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "annotations",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch zoom, pan (drag when zoomed) and double-tap reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "locale",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes). Mini-programs have no `<html lang>`: pass the app language"
  }
]
```

### events

```json
[
  {
    "name": "onPointClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:054b6d565969c517cbb1",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:02c2f014ba9839a6e936",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onHover",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:980cbee566a575ab834d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the touched (or hovered) points change"
  },
  {
    "name": "onZoom",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:6871f590139907a5872c",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
