# Barres radiales

Une progression en anneaux concentriques : anneaux d'activité, avancement des OKR, ventes face aux objectifs. Chaque barre remplit son anneau selon sa valeur rapportée à son maximum, sur une piste de fond teintée, avec des extrémités arrondies ; les étiquettes occupent la partie ouverte du cercle et un texte central peut résumer l'ensemble. Survolez un anneau ou utilisez les flèches pour lire sa valeur, son maximum et sa progression.

Package: minerva-design@1.22.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Bouger

Exercice

Debout

Jour de la semaine

anneaux bouclés

Anneaux d'activité du jour choisi : bouger, exercice et debout face à leurs objectifs

Taux d'activation

Rétention à 4 semaines

NPS au-dessus de 50

Latence p95

Baisse de l'attrition

avancement moyen

Avancement des résultats clés du trimestre

Nord

Sud

Est

Ouest

de l'objectif

Ventes trimestrielles de chaque région face à son objectif

Processeur

Mémoire

Disque

Réseau

Forme

Trois quarts

Cercle complet

Demi-cercle

Extrémités arrondies

Pistes

Utilisation des ressources d'un serveur, en pourcentage de la capacité

Épargne de précaution

Vacances d’été

Nouvel ordinateur

Apport immobilier

Cliquez sur un objectif pour voir le temps nécessaire.

{{goal}} : {{saved}} épargnés sur {{target}}. Reste {{remaining}}, soit environ {{months}} mois à {{monthly}} par mois.

de tous les objectifs

Épargne de chaque objectif comparée à sa cible

R. Silva

M. Kowalski

C. Okafor

L. Moreau

K. Tanaka

E. Jensen

Buts

Passes décisives

Classement

{{rank}}. {{name}}

{{stat}} : {{value}} en {{games}} matchs

{{ratio}} par match

Meilleurs joueurs de la saison : {{stat}}

En tête : {{name}} ({{stat}} : {{value}})

Vidéo de lancement

Photos de l’évènement

Présentation

Sauvegarde de la base

envoyés

Progression de l’envoi de chaque fichier

Recommencer

Tous les fichiers sont envoyés ({{size}}).

{{done}} fichiers sur {{files}} envoyés

Je me sens valorisé

Mes objectifs sont clairs

Je peux progresser ici

Équilibre vie pro / perso

Mon manager me soutient

Je recommanderais l’entreprise

Ordre

Ordre du questionnaire

Plus d’accord d’abord

Moins d’accord d’abord

accord moyen

{{agree}} répondants sur {{answered}} d’accord ({{share}})

Part des salariés d’accord avec chaque affirmation de l’enquête

## RadialBarChart

Support: beta

Radial bar chart: concentric progress rings with tracks, rounded ends, labels and center texts. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/radial-bar-chart/index",
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
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "hidden",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "animation",
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
    "name": "texts",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "max",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "innerRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "startAngle",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "sweep",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "track",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "rounded",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "labelContent",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "centerValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "centerLabel",
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
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
