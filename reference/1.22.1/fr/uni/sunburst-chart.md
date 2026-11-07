# Diagramme en rayons de soleil

Une hiérarchie dessinée en anneaux concentriques : chaque anneau est un niveau, chaque secteur une part de son parent. Cliquez sur un parent (ou appuyez sur Entrée) pour zoomer, sur le centre (ou Retour arrière) pour remonter ; la transition anime les angles et les anneaux. Survoler un secteur met en avant ses ancêtres et ses descendants, et les étiquettes suivent l'arc ou le rayon, selon la place.

Package: minerva-design@1.22.1

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Macintosh HD

Applications

Documents

Projets

Archives

PDF

Tableurs

Photos

Développement

Caches de paquets

Simulateurs

Système

Musique

Autres applications

{{value}} Go

Espace disque par dossier, en gigaoctets

Affichage de {{path}}. Cliquez sur le centre pour remonter.

Cliquez sur un dossier pour zoomer dessus.

Ingénierie

Plateforme

Infrastructure

Sécurité

Outils développeurs

Ingénierie produit

Web

Mobile

Paiements

Données

Analyse

Apprentissage automatique

Ventes

EMEA

Amériques

APAC

Succès client

Support

Intégration

Marketing

Marque

Croissance

Contenu

Opérations

Finance

RH

Juridique

Informatique

{{value}} personnes

Effectifs par département, groupe et équipe

Tous les produits

Électronique

Téléphones

Haut de gamme

Milieu de gamme

Accessoires

Ordinateurs portables

Audio

Casques

Enceintes

Maison

Cuisine

Mobilier

Décoration

Mode

Homme

Femme

Enfant

Sport

Plein air

Fitness

Chemin de la catégorie

Chiffre d'affaires trimestriel par catégorie de produits

Asie

Afrique

Europe

Amériques

Océanie

Autres pays

{{value}} M

Mode des étiquettes

Auto

Le long de l'arc

Le long du rayon

Aucune

Population mondiale par continent et par pays, en millions

Éducation

Santé

Transports

Sécurité publique

Environnement

Administration

Écoles

Universités

Bibliothèques

Hôpitaux

Prévention

Transports en commun

Voirie

Pistes cyclables

Police

Pompiers

Parcs

Collecte des déchets

Eau

{{path}} : {{amount}}, soit {{share}} du budget et {{areaShare}} du domaine {{area}}.

{{path}} : {{amount}}, soit {{share}} du budget.

Budget annuel de la ville par domaine et par programme

Budget annuel : {{total}}. Cliquez sur un secteur pour lire sa part.

Chaîne de boulangeries

Cabinet dentaire

École de langues

Interne

Site web

Identité visuelle

Système de réservation

Application mobile

Administration

Formation

Design

Développement

Réunions

Relecture

Support

Apprentissage

Période

Cette semaine

Ce mois-ci

{{hours}} · {{share}} du temps saisi

Heures saisies par client, projet et activité ({{period}})

Facturable : {{billable}} sur {{total}} ({{share}}).

Paiement

Recherche

Comptes

Catalogue

Panier

Règlement

Livraison

Requêtes

Suggestions

Connexion

Profil

Fiches produit

Avis

{{value}} req./min

Requêtes d’API par minute, par service et par endpoint, mises à jour en direct

Pause

Reprendre

Total : {{value}}

Service le plus sollicité : {{service}}

Renouvelables

Nucléaire

Fossiles

Éolien

Solaire

Hydraulique

Biomasse

Gaz naturel

Charbon

Pétrole

{{value}} TWh

Masquer les énergies fossiles

Production annuelle d’électricité par source et par combustible

Renouvelables masquées : {{total}} affichés.

Renouvelables : {{share}} des {{total}} affichés.

## SunburstChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events and the sunburst drill event; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SunburstChart"
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
    "name": "drill",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
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
    "typeText": "readonly TreemapNode[]",
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
    "name": "padAngle",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "cornerRadius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "drillPath",
    "typeText": "readonly string[] | undefined",
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
  },
  {
    "name": "drill",
    "typeText": "[event: ShapeDrillEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
