# Graphique combiné

Barres, lignes et aires dans un même graphique, sur un ou deux axes de valeurs : chiffre d'affaires et croissance, pluie et température, diagrammes de Pareto.

Package: minerva-design@1.19.3

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

T{{n}} {{year}}

Chiffre d'affaires

Croissance (sur un an)

Chiffre d'affaires trimestriel et sa croissance sur un an

Précipitations

Température

Précipitations et températures mensuelles à Tokyo

Sessions

Taux de conversion

Campagne

Sessions quotidiennes et taux de conversion sur deux mois

Retours

Part cumulée

Mauvaise taille

Endommagé

Non conforme

Livré en retard

Changement d'avis

Mauvais article

Autre

Retours par cause et leur part cumulée

Pages vues

Chinois (zh-CN)

Français (fr-FR)

Pages vues et taux de conversion par jour, {{locale}}

Chiffre d’affaires

Utilisateurs

Utilisateurs (échelle log)

Chiffre d’affaires annuel et utilisateurs sur un axe logarithmique, de 2016 à 2025

{{value}} kWh

Production solaire

Consommation

Charge de la batterie

Nuit

Batterie de {{value}}

Autosuffisance de {{share}} sur deux jours, {{imported}} achetés au réseau.

Énergie par heure

Production solaire et consommation horaires d'une maison sur deux jours, avec l'état de charge de sa batterie

Niveau de stock

Livraisons

Promotion

Stock de sécurité

Point de commande

Cliquez sur un jour ou une livraison.

{{id}} : {{quantity}} unités commandées le {{ordered}}, livrées le {{arrived}} après {{lead}}.

{{units}} unités en stock le {{date}}.

Seulement {{units}} unités en stock le {{date}}, sous le stock de sécurité.

Unités

Niveau de stock quotidien d'un article sur trois mois, avec les livraisons, le point de commande et le stock de sécurité

Requêtes

Taux d'erreur

Mises en production

Requêtes par 30 min

Requêtes et taux d'erreur d'une API web sur une journée, avec ses mises en production

Le taux d'erreur a culminé à {{peak}} à {{time}} après {{version}}, jusqu'au retour à {{rollback}}.

{{value}} pts

Début

Travail restant

Terminé

Idéal

+{{value}} ajoutés

Idéal : {{value}} restants

{{value}} restants

{{value}} terminés ce jour-là

{{value}} de retard sur l'idéal

{{value}} d'avance sur l'idéal

Points d'histoire

Burndown de sprint : travail restant, points terminés chaque jour et progression idéale sur dix jours ouvrés

{{left}} restants à {{velocity}} par jour : environ {{forecast}} ne seront pas terminés à la fin du sprint.

{{left}} restants à {{velocity}} par jour : le sprint est dans les temps.

## MixedChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "MixedChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "yAxis2",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "stackMode",
    "typeText": "\"percent\" | \"normal\" | undefined",
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
