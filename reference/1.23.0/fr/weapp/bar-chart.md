# Graphique à barres

Barres groupées côte à côte ou empilées, avec des lignes superposées en option.

Package: minerva-design@1.23.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

T{{n}}

Tickets résolus

Tickets de support résolus par trimestre

Commandes

Moyenne sur 7 jours

Jour

Commandes quotidiennes et leur moyenne sur 7 jours

Chiffre d'affaires trimestriel, 2025 et 2026

Promoteurs

Passifs

Détracteurs

Amérique du Nord

Europe

Asie-Pacifique

Amérique latine

Moyen-Orient

Part des promoteurs, passifs et détracteurs par région

Web

Application mobile

Partenaires

Commandes mensuelles par canal, empilées

Ventes

Ventes par trimestre

{{quarter}} : {{units}} unités

Touchez une barre

Empilées

Groupées

Commandes par canal et par mois

Londres

Tokyo

Paris

Précipitations mensuelles moyennes à Londres, Tokyo et Paris

Résultat net

Résultat net mensuel, bénéfices au-dessus de zéro et pertes en dessous

Unités vendues

Ventes en ligne par pays, de la plus forte à la plus faible

Nouveaux clients

S{{n}}

Objectif hebdomadaire

Nouveaux clients par semaine face à l'objectif hebdomadaire

Objectif atteint {{reached}} semaines sur {{total}} ({{rate}}).

Chiffre d'affaires

{{month}} : {{value}}

Retour aux trimestres

Cliquez sur un trimestre pour voir ses mois.

{{quarter}} : {{value}} au total. Cliquez sur un mois pour voir son chiffre d'affaires.

Chiffre d'affaires par trimestre en 2026 ; cliquez sur un trimestre pour voir ses mois

Chiffre d'affaires par mois au {{quarter}} 2026

Ingénierie

Produit

Design

Ventes

Marketing

Support

L'an dernier

Cette année

Variation

Comparer avec l'an dernier

Recrutements par service, cette année et l'an dernier

Réussis

Annulés

Gel des changements

Déploiements en production par jour sur huit semaines, réussis et annulés

{{perDay}} déploiements par jour ouvré, taux d'échec des changements de {{failure}}.

Heures creuses

Normal

Heures pleines

Recharge

Moyenne du jour

Durée de recharge

{{energy}} kWh · {{duration}}

Rechargez de {{start}} à {{end}} pour {{cost}}, soit {{saving}} de moins qu'en branchant à {{plugIn}}.

Prix par MWh

Prix de l'électricité du marché J-1 pour chaque heure de demain, avec les heures les moins chères pour recharger une voiture électrique mises en évidence

## BarChart

Support: beta

Chart whose untyped series are bars, grouped or `stacked`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/bar-chart/index",
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
    "name": "stacked",
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
