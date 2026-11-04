# Graphique en aires

Des aires remplies pour montrer un volume dans le temps : lissées par défaut, superposées, empilées en un total ou en parts de 100 %. Survolez pour lire toutes les séries à un même x ; zoomez avec Ctrl / ⌘ + molette ou en pinçant.

Package: minerva-design@1.20.3

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "AreaChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "stacked",
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
    "name": "percent",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
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
    "name": "locale",
    "typeText": "string | undefined",
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
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
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
    "name": "curve",
    "typeText": "\"step\" | \"linear\" | \"smooth\" | undefined",
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
