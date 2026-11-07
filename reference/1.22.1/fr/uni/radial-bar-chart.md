# Barres radiales

Une progression en anneaux concentriques : anneaux d'activité, avancement des OKR, ventes face aux objectifs. Chaque barre remplit son anneau selon sa valeur rapportée à son maximum, sur une piste de fond teintée, avec des extrémités arrondies ; les étiquettes occupent la partie ouverte du cercle et un texte central peut résumer l'ensemble. Survolez un anneau ou utilisez les flèches pour lire sa valeur, son maximum et sa progression.

Package: minerva-design@1.22.1

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RadialBarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "rounded",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
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
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "track",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly RadialBarDatum[]",
    "required": true
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false
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
    "name": "innerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "startAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "labelContent",
    "typeText": "readonly (\"value\" | \"name\" | \"percent\")[] | undefined",
    "required": false
  },
  {
    "name": "centerValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "centerLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "sweep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "hidden",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
