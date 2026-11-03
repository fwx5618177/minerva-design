# Graphique à puces

Des barres d'indicateurs compactes (Stephen Few) : chaque ligne montre une mesure sous forme de barre sur des plages qualitatives (des gris, la plus mauvaise la plus foncée) avec un repère à sa cible, sur sa propre échelle. Les lignes peuvent mélanger les unités, un tableau de bord tient donc beaucoup d'indicateurs dans peu de place. Survolez une ligne ou utilisez les flèches pour lire sa valeur, sa cible et sa plage.

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
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Chiffre d'affaires

milliers de dollars US

Marge

% du chiffre d'affaires

Panier moyen

dollars US

Nouveaux clients

nombre

Satisfaction

sur 5

Mauvais

Moyen

Bon

Non respecté

À risque

Sain

Indicateurs commerciaux du trimestre en cours face à leurs cibles

Paiement

Recherche

Mobile

Plateforme

Croissance

Données

Points livrés par chaque équipe face à son engagement

Disponibilité

% des requêtes

Apdex

score, 0–1

Débit

requêtes / s

Budget d'erreur

% restant

Objectifs de niveau de service de l'API ce mois-ci

Visiteurs

milliers

Inscriptions

comptes

Activation

% des inscriptions

Revenu mensuel récurrent

milliers de dollars US

Mois

Indicateurs de croissance du mois choisi face à leurs cibles

Clients grands comptes intégrés dans les 30 premiers jours suivant la signature

% des nouveaux comptes

Tickets de support prioritaires traités en moins d’une heure ouvrée

% des tickets

Mises en production déployées sans incident visible par les clients

% des déploiements

Rétention nette du chiffre d’affaires des abonnements annuels

ratio

KPI opérationnels aux noms longs comparés à leurs objectifs

Marketing

Ingénierie

Ventes

Ressources humaines

Services généraux

Déplacements

Budget annuel : {{budget}}

Confortable

Tendu

Hors plan

{{over}} services dépensent plus vite que prévu. Cliquez sur une ligne pour voir son écart.

{{department}} dépasse le plan : {{variance}} à la fin du T3, {{share}} du budget annuel consommé, {{left}} restants.

{{department}} respecte le plan : {{variance}} à la fin du T3, {{share}} du budget annuel consommé, {{left}} restants.

Dépenses de chaque service à la fin du T3 comparées au budget prévu à cette date

Température d’entrée

Humidité

Consommation

Vitesse des ventilateurs

°C

% relative

kW par baie

% de la vitesse max.

Normal

Alerte

Critique

Mesures en direct

Mesures des capteurs de la salle serveurs comparées à leurs consignes et seuils

À surveiller : {{sensors}}

Tous les capteurs sont dans leurs limites.

Distance de la semaine

Sortie longue

Dénivelé positif

Séances

Sommeil

plan : {{plan}}

Sous le plan

Dans le plan

Au-dessus du plan

Coureur

Amara

Lucas

Mei

{{value}} pour un plan de {{plan}} ({{share}})

Entraînement hebdomadaire de {{runner}} comparé au plan

{{runner}} a atteint {{met}} objectifs hebdomadaires sur {{metrics}}.

Ingénierie

Ventes

Support

Marketing

Produit

Finance

{{plan}} prévus cette année

En retard

En rattrapage

Dans les temps

Tri

Ordre du plan

Plus en retard d’abord

Plus en avance d’abord

Embauches de chaque équipe comparées au plan d’effectifs annuel

{{hired}} embauches sur {{planned}} prévues ({{share}}) pour les {{teams}} équipes affichées.

Aucune équipe affichée.

## BulletChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "BulletChart"
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
    "name": "ticks",
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
    "name": "data",
    "typeText": "readonly BulletDatum[]",
    "required": true
  },
  {
    "name": "orientation",
    "typeText": "\"vertical\" | \"horizontal\" | undefined",
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
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "rangeColors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "barSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
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
