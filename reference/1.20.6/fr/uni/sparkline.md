# Sparkline

Un graphique de la taille d’un mot, sans axes ni légende, qui montre l’allure d’une tendance à côté d’un chiffre : dans des cartes d’indicateurs, des cellules de tableau ou des listes. Survolez-le pour lire une valeur.

Package: minerva-design@1.20.6

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Sparkline"
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
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"bar\" | \"line\" | \"area\" | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
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
    "name": "data",
    "typeText": "ChartSeriesData",
    "required": true
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
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"step\" | \"linear\" | \"smooth\" | undefined",
    "required": false
  },
  {
    "name": "reference",
    "typeText": "number | undefined",
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
