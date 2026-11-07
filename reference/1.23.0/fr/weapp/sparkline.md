# Sparkline

Un graphique de la taille d’un mot, sans axes ni légende, qui montre l’allure d’une tendance à côté d’un chiffre : dans des cartes d’indicateurs, des cellules de tableau ou des listes. Survolez-le pour lire une valeur.

Package: minerva-design@1.23.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Commandes

Commandes hebdomadaires, {{variant}}

Chiffre d'affaires

Utilisateurs actifs

Inscriptions

Latence p95

{{metric}}, 30 derniers jours

Service

Passerelle API

Authentification

Recherche

Paiements

Notifications

Requêtes / min

Latence p95, 30 jours

Latence p95 de {{service}} sur 30 jours

Aujourd'hui

Variation

Latence des services

Symbole

Acme Corporation

Nova Biotech

Orbit Aérospatiale

Kite Robotique

Luma Énergie

Cours de {{symbol}} aujourd'hui

Cours

Liste de surveillance

Visites des 14 derniers jours :

Visites

Visites des 14 derniers jours

Les erreurs ont bondi après le déploiement du 7e jour, puis sont revenues à la normale :

Erreurs

Erreurs par jour sur les 14 derniers jours

Température de l'après-midi ces deux semaines :

Température

Température de l'après-midi sur les 14 derniers jours

Processeur

Utilisation du processeur de {{server}}

Alerte

Normal

Utilisateurs actifs par jour

Dernier jour : {{date}}

{{date}} · {{change}} depuis le 1er septembre

Utilisateurs actifs par jour du 1er septembre au 31 octobre

{{value}} pas

{{value}} de l'objectif

Objectif de {{goal}} pas atteint {{reached}} jours sur {{days}}

Pas

Pas par jour sur quatre semaines, avec l'objectif quotidien

Reykjavik

Montréal

Tokyo

Le Caire

Singapour

Sydney

Max. {{max}} ({{maxMonth}}) · min. {{min}} ({{minMonth}})

Moyenne des maximales quotidiennes de chaque mois à {{city}}

Période

7 jours

30 jours

90 jours

seconde moitié par rapport à la première

par rapport à la période précédente

Chiffre d'affaires quotidien, période : {{period}}

## Sparkline

Support: beta

Word-sized line / area / bar without axes or legend (default height 48), reference line, tooltip; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/sparkline/index",
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
    "default": 48
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
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "type",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "curve",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "reference",
    "typeText": "unknown",
    "required": false,
    "default": null
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
