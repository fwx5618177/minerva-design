# Diagramme en barres horizontales

Des barres qui partent de la gauche, les catégories le long du bord : classements, noms longs, enquêtes divergentes et avancements.

Package: minerva-design@1.21.1

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Développeurs

Part des développeurs utilisant chaque langage de programmation

Je vois une perspective de carrière ici

Ma charge de travail est raisonnable

J'ai les outils dont j'ai besoin

Mon manager me soutient

Je suis payé équitablement

Pas du tout d'accord

Pas d'accord

D'accord

Tout à fait d'accord

Réponses à l'enquête interne, désaccord à gauche et accord à droite

Terminé

En revue

À faire

Plateforme

Paiements

Mobile

Croissance

Design

État des tickets du jalon pour chaque équipe

Votes

Mode sombre sur toutes les pages et les e-mails

Mode hors ligne sur mobile

Export des rapports en PDF avec graphiques

Authentification unique SAML et OIDC

Synchronisation bidirectionnelle du calendrier

Modifier plusieurs fiches à la fois

Champs personnalisés sur tous les objets

Votes des fonctionnalités les plus demandées

Budget

Réel

Ingénierie

Marketing

Ventes

Support

Finance

Budget et dépenses réelles par service

Variation

Amérique du Nord

Europe

Asie-Pacifique

Amérique latine

Moyen-Orient

Afrique

Variation des utilisateurs actifs mensuels par région

Utilisateurs

Messages

Photos

Plans

Musique

Notes

Utilisateurs actifs mensuels par application

{{app}} : {{users}} M d'utilisateurs

Touchez une barre

Chiffre d'affaires

Unités vendues

Casque sans fil

Montre connectée

Enceinte Bluetooth

Clavier mécanique

Chargeur rapide

Webcam HD

Souris sans fil

Tablette

Câble USB-C

Support d'ordinateur

Classer par

Lignes affichées

Top {{n}}

Tous les produits

Produits les plus vendus du mois dernier, du plus élevé au plus faible

Ces {{n}} produits représentent {{share}} du total.

{{value}} GW

Capacité solaire

Lecture

Pause

Rejouer

Revenir au début

Pays ayant la plus grande capacité solaire installée fin {{year}}

Fourchette de salaire

Junior

Confirmé

Senior

Staff

Principal

Directeur

Offre

Minimum

Milieu

Maximum

Offre / milieu

Offre −{{step}}

Offre +{{step}}

Une offre de {{offer}} entre dans les fourchettes {{levels}}.

Une offre de {{offer}} est en dehors de toutes les fourchettes.

Fourchette de salaire annuel de chaque niveau, avec l'offre en ligne verticale

Budget d'erreur restant

Gel des mises en production

Budget d'erreur restant de chaque service sur les 30 derniers jours, du pire au meilleur

SLO {{slo}}, disponibilité mesurée {{availability}}

Il reste {{minutes}} d'indisponibilité sur {{allowed}}.

Budget dépassé de {{minutes}}.

Cliquez sur un service pour voir son budget.

## HorizontalBarChart

Support: beta

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HorizontalBarChart"
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
