# Graphique à barres

Barres groupées côte à côte ou empilées, avec des lignes superposées en option.

Package: minerva-design@1.20.5

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "BarChart"
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
