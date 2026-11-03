# Diagramme d’accords

Flux entre des groupes disposés en cercle : chaque groupe est un arc dimensionné par ses flux, chaque flux un ruban entre deux arcs. Non orienté, un ruban relie une paire de groupes et sa largeur est la somme des flux dans les deux sens (une matrice symétrique compte chaque relation une seule fois), si bien qu’un groupe qui ne fait que recevoir garde son arc ; orienté, chaque sens a son propre ruban, terminé par une flèche. Survolez un groupe pour mettre ses rubans en avant, un ruban pour lire les deux sens ; la légende masque / affiche les groupes et les flèches du clavier parcourent les groupes puis les rubans.

Package: minerva-design@1.20.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Design

Ingénierie

Produit

Marketing

Messages échangés entre quatre équipes en une semaine

Amérique du Nord

Amérique latine

Europe

Afrique

Asie occidentale

Asie du Sud

Asie de l’Est

Océanie

{{value}} M de personnes

Flux migratoires entre les régions du monde sur cinq ans

app

router

store

ui-kit

api-client

auth

i18n

utils

Imports entre les modules d’une base de code

États-Unis

Chine

Union européenne

Mexique

Canada

Japon

Corée du Sud

Commerce de marchandises entre grandes économies sur un an

Accueil

Recherche

Catégorie

Produit

Panier

Paiement

{{value}} k visites

Survolez une page ou un ruban

{{source}} → {{target}} : {{value}} (dans l’autre sens : {{reverse}})

{{name}} : {{value}} en entrée et en sortie

Navigation entre les pages d’une application de boutique en une journée

États-Unis Est

États-Unis Ouest

Europe centrale

Asie-Pacifique SE

Asie-Pacifique NE

Amérique du Sud

{{value}} Gbit/s

Trafic de réplication entre centres de données

Libellés

Auto

Tangentiels

Radiaux

Aucun

Ordre des groupes

Ordre des données

Du plus grand

Du plus petit

Couleur des rubans

Dégradé

Source

Cible

Neutre

Orienté

Graduations

Autres opérateurs

Année

{{year}}

{{name}} {{value}}

{{name}} a gagné le plus d'abonnés ({{value}} en net). Solde net : {{list}}.

Abonnés changeant d'opérateur mobile en {{year}}

Physique

Chimie

Biologie

Médecine

Informatique

Mathématiques

Économie

Ingénierie

Cliquez sur une faculté pour voir ses collaborations, ou sur un ruban pour voir une paire

{{name}} : {{total}} articles co-écrits, surtout avec {{partners}}

{{name}} ({{value}})

{{a}} et {{b}} : {{value}} articles co-écrits

Effacer

Articles co-écrits par les facultés d'une université sur cinq ans

Café

Lait

Pain

Viennoiseries

Fruits

Céréales

Yaourts

Jus

{{a}} + {{b}}

Achetés ensemble dans {{value}} paniers ({{share}} de tous les paniers)

{{value}} associations avec d'autres catégories

Catégories de produits achetées ensemble dans un même panier sur un mois

Passerelle

Utilisateurs

Commandes

Stocks

Paiements

Notifications

{{value}} appels/s

Total : {{total}}. Le plus chargé : {{from}} → {{to}} ({{value}})

Pause

Reprendre

Appels par seconde entre microservices, en direct

Londres

Paris

Francfort

Istanbul

Dubaï

Singapour

Tokyo

New York

{{value}} M de passagers

Afficher toutes les plateformes

Plateformes de l'Est

Plateformes de l'Ouest

Affichez au moins deux plateformes pour voir les liaisons entre elles

{{shown}} plateformes sur {{total}} affichées : {{routes}} liaisons, {{passengers}} par an

Passagers annuels entre les grandes plateformes aéroportuaires

## ChordChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: group arcs and ribbons, legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ChordChart"
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
    "typeText": "number | boolean | undefined",
    "required": false
  },
  {
    "name": "directed",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "arrows",
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
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
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
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "links",
    "typeText": "readonly ChordLink[] | undefined",
    "required": false
  },
  {
    "name": "matrix",
    "typeText": "readonly (readonly number[])[] | undefined",
    "required": false
  },
  {
    "name": "sortGroups",
    "typeText": "\"none\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "sortSubgroups",
    "typeText": "\"none\" | \"auto\" | \"descending\" | \"ascending\" | undefined",
    "required": false
  },
  {
    "name": "ribbonColor",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "required": false
  },
  {
    "name": "ribbonOpacity",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "arcWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "tickFormat",
    "typeText": "((value: number) => string) | undefined",
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
