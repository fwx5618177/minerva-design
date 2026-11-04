# Graphique radar

Compare un ou quelques éléments selon plusieurs indicateurs aux échelles différentes (compétences, tests de produits, profils aromatiques). Survolez un polygone pour le mettre en évidence avec l’indicateur le plus proche ; les flèches passent d’une série ou d’un indicateur à l’autre, Échap efface ; un clic sur la légende masque une série.

Package: minerva-design@1.20.2

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Résolution de problèmes

Programmation

Conception de systèmes

Communication

Collaboration

Responsabilité

Candidat

{{value}} / {{max}}

Grille d'entretien d'un candidat

Arôme

Acidité

Douceur

Corps

Amertume

Persistance

Éthiopie Yirgacheffe

Sumatra Mandheling

Profils aromatiques de deux cafés

Performances

Autonomie

Appareil photo

Écran

Rapport qualité-prix

Finition

Notes de test de trois téléphones

Survolez un polygone ou utilisez les flèches pour comparer les téléphones

Vitesse

Tir

Passe

Dribble

Défense

Physique

Attributs de deux footballeurs

Sécurité

Intégrations

Rapports

Mobile

Automatisation

Support

Prix

Notre produit

Principal concurrent

Moyenne du marché

Produits à comparer

Notes des capacités de notre produit, d'un concurrent et du marché

Protéines

Fibres

Sucres

Lipides

Sodium

Calcium

Porridge aux fruits

Œufs sur toast

Yaourt et granola

{{value}} VQ

{{meal}} : {{amount}} ({{share}})

Nutriments de trois petits-déjeuners, en pourcentage de la valeur quotidienne

CPU

Mémoire

E/S disque

Réseau

Latence

Erreurs

Moyenne de la dernière heure

Maintenant

Mises à jour en direct

Alerte : {{metric}} dépasse {{threshold}} de sa capacité.

Métrique la plus chargée : {{metric}}.

Charge actuelle du service comparée à la moyenne de la dernière heure

Communication

Livraison

Expertise

Collaboration

Mentorat

Initiative

Moyenne de l’équipe

Personne

Notes de l’évaluation à 360° de {{name}} comparées à la moyenne de l’équipe

Point fort : {{strength}} ({{strengthGap}} par rapport à l’équipe). À développer : {{growth}} ({{growthGap}}).

Chiffre d’affaires

Affaires gagnées

Taux de réussite

Montant moyen

Appels

NPS

Objectif

Réel

{{kpi}} : {{actual}} pour un objectif de {{target}} ({{attainment}}).

KPI trimestriels d’un commercial comparés à ses objectifs

Cliquez près d’un axe pour lire son KPI.

## RadarChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "RadarChart"
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
    "name": "dots",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"circle\" | \"polygon\" | undefined",
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
    "name": "series",
    "typeText": "readonly RadarSeries[]",
    "required": true
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly RadarIndicator[]",
    "required": true
  },
  {
    "name": "levels",
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
