# Graphique à puces

Des barres d'indicateurs compactes (Stephen Few) : chaque ligne montre une mesure sous forme de barre sur des plages qualitatives (des gris, la plus mauvaise la plus foncée) avec un repère à sa cible, sur sa propre échelle. Les lignes peuvent mélanger les unités, un tableau de bord tient donc beaucoup d'indicateurs dans peu de place. Survolez une ligne ou utilisez les flèches pour lire sa valeur, sa cible et sa plage.

Package: minerva-design@1.21.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Bullet chart: value bars against qualitative ranges and a target marker, horizontal or vertical, scale ticks. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/bullet-chart/index",
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
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ranges",
    "typeText": "array",
    "required": false
  },
  {
    "name": "rangeLabels",
    "typeText": "array",
    "required": false
  },
  {
    "name": "rangeColors",
    "typeText": "array",
    "required": false
  },
  {
    "name": "barSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "targetColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ticks",
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
