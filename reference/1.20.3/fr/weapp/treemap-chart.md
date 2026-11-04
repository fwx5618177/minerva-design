# Treemap

Des rectangles imbriqués dont l’aire est proportionnelle aux valeurs : on voit d’un coup d’œil ce qui prend le plus de place dans une hiérarchie (espace disque, budgets, portefeuilles). Survolez ou utilisez les flèches pour mettre une cellule en évidence ; l’infobulle affiche son chemin.

Package: minerva-design@1.20.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Médias

Vidéos

Photos

Musique

Applications

Projets

Système

Bibliothèque

Caches

Journaux

Téléchargements

Programmes d'installation

Archives

Utilisation du disque par dossier

{{path}} : {{size}} ({{share}} du disque)

Cliquez sur une cellule pour voir où elle se trouve

Ingénierie

Ventes

Marketing

Succès client

Opérations

Finance

Ressources humaines

Juridique

Budget annuel par service

Technologie

Finance

Santé

Énergie

Consommation

Capitalisation : {{value}}

Carte du marché boursier par secteur, colorée selon la variation du jour

{{share}} du bundle

Taille du bundle JavaScript par module

Total {{size}} ; dépendances de plus de 100 Ko : {{modules}}.

Électronique

Maison

Mode

Sport

Téléphones

Ordinateurs portables

Audio

Cuisine

Meubles

Décoration

Femme

Homme

Enfant

Plein air

Fitness

Chemin dans le catalogue

Toutes les catégories

Chiffre d’affaires trimestriel par catégorie, sous-catégorie et marque

Chiffre d’affaires {{category}} par sous-catégorie et marque

{{path}} : {{revenue}}, soit {{share}} de la catégorie.

Cliquez sur une catégorie pour l’ouvrir.

Cliquez sur une marque pour lire son chiffre d’affaires.

Calcul

Bases de données

Stockage

Réseau

Observabilité

{{share}} de la facture

Coûts cloud mensuels par service et ressource

Affiché : {{visible}}, soit {{share}} de la facture de {{total}}.

Facture du mois : {{total}}.

Tout afficher

Mises à jour en direct

{{used}} sur {{limit}} ({{share}})

Mémoire utilisée par les pods du cluster, par namespace

Au-delà de {{threshold}} de leur limite mémoire : {{pods}}

Tous les pods sont sous {{threshold}} de leur limite mémoire.

Europe

Amériques

Asie-Pacifique

Mesure

Chiffre d’affaires

Commandes

Marge

{{share}} du total ({{metric}})

Ventes annuelles par région et par pays : {{metric}}

## TreemapChart

Support: beta

Treemap: nested nodes (squarified), parent headers, gap, path in the events. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/treemap-chart/index",
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
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "headers",
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
