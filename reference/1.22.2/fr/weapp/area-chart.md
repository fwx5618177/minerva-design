# Graphique en aires

Des aires remplies pour montrer un volume dans le temps : lissées par défaut, superposées, empilées en un total ou en parts de 100 %. Survolez pour lire toutes les séries à un même x ; zoomez avec Ctrl / ⌘ + molette ou en pinçant.

Package: minerva-design@1.22.2

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Utilisateurs actifs quotidiens

Utilisateurs actifs quotidiens, d'avril à juin 2026

Autres

Part de marché par fabricant, de 2016 à 2026

Recherche naturelle

Accès direct

Sites référents

Réseaux sociaux

Visites mensuelles par source de trafic, empilées

Instances en service

Quota

Instances lancées par l'autoscaler sur une journée

Nucléaire

Hydraulique

Éolien

Solaire

Gaz

{{value}} GW

Puissance

Production d'électricité par source sur une journée, empilée

Réalisé

Objectif

Ventes cumulées de l'année face à l'objectif

Téléchargement

Envoi

Bande passante d'un serveur sur deux heures, téléchargement au-dessus de zéro et envoi en dessous

Production solaire

{{value}} kWh

Énergie quotidienne d'une installation solaire en toiture en 2026

Réinitialiser le zoom

{{from}} – {{to}} : {{total}} au total, {{average}} par jour en moyenne

Ctrl / ⌘ + molette ou pincement pour zoomer sur une saison, glisser pour se déplacer.

Ingénierie

Ventes

Support client

Opérations

Finance et RH

Effectif mensuel par service, 2025 et 2026

Effectif du mois sélectionné

{{value}} salariés

L'an dernier

Cette année

Black Friday

Cyber Monday

Dernier jour d'expédition

Commandes quotidiennes en novembre et décembre, cette année face à l'an dernier

{{total}} commandes cette saison, {{change}} par rapport à l'an dernier.

Utilisé

Tendance

{{value}} Go

Capacité {{value}}

Volume

Base de données

Journaux

Fichiers des utilisateurs

Plein dans environ {{days}}, vers le {{date}}

Pas plein dans les {{days}} à venir

Usage du disque sur 60 jours et sa tendance jusqu'à la capacité

## AreaChart

Support: beta

Chart whose untyped series are areas: smooth by default (`curve`), `stacked` or 100% (`percent`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/area-chart/index",
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
    "name": "curve",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "percent",
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
