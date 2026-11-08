# Graphique combiné

Barres, lignes et aires dans un même graphique, sur un ou deux axes de valeurs : chiffre d'affaires et croissance, pluie et température, diagrammes de Pareto.

Package: minerva-design@1.23.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Bars, lines, areas and dots each with its `type`, right axis (`yAxis2`), `stackMode` and `orientation`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/mixed-chart/index",
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
    "name": "yAxis2",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stackMode",
    "typeText": "string",
    "required": false,
    "default": ""
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
