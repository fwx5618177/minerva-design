# Diagramme de Sankey

Des flux entre étapes : bilans énergétiques, parcours utilisateurs, répartitions budgétaires. Les nœuds sont rangés en colonnes, l'épaisseur d'un lien est proportionnelle à son flux, et l'ordre des nœuds est relaxé pour redresser les flux et limiter les croisements. Survolez un nœud pour mettre en avant tous ses flux, ou un lien pour voir sa part dans sa source ; les flèches du clavier parcourent les nœuds et les liens.

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

Solaire

Éolien

Hydraulique

Nucléaire

Gaz naturel

Charbon

Pétrole

Électricité

Réseaux de chaleur

Carburants

Résidentiel

Industrie

Tertiaire

Transports

Pertes

{{value}} TWh

Bilan énergétique : sources primaires, vecteurs et usages finaux, en térawattheures par an

Annonces

Recherche naturelle

Newsletter

Réseaux sociaux

Accueil

Page tarifs

Blog

Inscription

Départ du site

Essai démarré

Abandon

Offre payante

Essai expiré

Sessions d'une semaine, du canal d'acquisition à l'abonnement

{{source}} → {{target}} : {{value}} sessions ({{share}} % de {{source}})

{{name}} : {{value}} sessions

Cliquez sur une étape ou un chemin (ou donnez le focus au graphique et appuyez sur Entrée) pour le sélectionner

Licences

Abonnements

Services

Subventions

Budget annuel

R&D

Ventes et marketing

Opérations

Administration

Plateforme

Applications mobiles

Recherche en IA

Campagnes

Équipe commerciale

Infrastructure

Support client

Finance et juridique

Bureaux

Budget annuel : sources de revenus, départements et programmes

E-mail

Chat

Téléphone

Chatbot

Niveau 1

Niveau 2

Ingénierie

Résolu

Remboursé

Bug signalé

Tickets de support d'un mois, du canal au résultat

Alignement des nœuds

Justifié

Gauche

Droite

Centré

Couleur des liens

Dégradé

Source

Cible

Neutre

Valeurs dans les étiquettes

Cloud

Licences

Matériel

Services

Chiffre d'affaires

Coût des ventes

Marge brute

R&D

Ventes et marketing

Frais généraux

Résultat d'exploitation

Impôt sur les sociétés

Résultat net

Compte de résultat trimestriel : segments de chiffre d'affaires, coûts et marges

Marge brute {{gross}} · marge d'exploitation {{operating}} · marge nette {{net}}

Brésil

Colombie

Éthiopie

Viêt Nam

Torréfaction de Hambourg

Torréfaction de Rotterdam

Entrepôt Nord

Entrepôt Centre

Entrepôt Sud

Cafés

Supermarchés

Boutique en ligne

{{value}} t

Café expédié en un mois, des pays d'origine aux canaux de vente en passant par les torréfactions et les entrepôts

Cliquez sur un site pour suivre tout ce qui le traverse, ou sur une expédition pour la sélectionner

{{name}} : {{inbound}} reçues de {{from}} sites, {{outbound}} envoyées vers {{to}} sites

{{source}} → {{target}} : {{value}} ({{share}} des envois de {{source}})

Effacer la sélection

Cooptation

Sites d'emploi

Réseaux professionnels

Cabinets

Écoles

Candidatures

Refusés sur CV

Entretien téléphonique

Non retenus après l'appel

Entretiens

Non retenus après les entretiens

Offres

Offre déclinée

Embauchés

Afficher les abandons

Entonnoir de recrutement d'une année, de la source du candidat à l'embauche

{{applied}} candidatures, {{hired}} embauches ({{rate}}). {{interview}} des candidats appelés passent les entretiens et {{accepted}} des offres sont acceptées.

Application web

Application iOS

Application Android

API partenaires

Passerelle API

Authentification

Catalogue

Recherche

Paiement

2xx succès

4xx erreur client

5xx erreur serveur

{{value}} req/s

Total : {{total}}.

Erreurs serveur : {{rate}}

Erreurs serveur : {{rate}}, incident sur le paiement

Pause

Reprendre

Trafic d'API en direct, en requêtes par seconde, des clients vers les services et leurs codes de statut

Bouteilles et barquettes PET

Flacons PEHD

Pots et bouchons PP

Films PEBD

Autres polymères

Emballages mis sur le marché

Collectés pour recyclage

Incinérés

Mis en décharge

Rejetés dans la nature

Recyclés

Refus de tri

Nouveaux emballages

Produits de moindre qualité

{{value}} Mt

{{share}} de « {{source}} »

{{share}} de l'ensemble des emballages

Emballages plastiques d'une année en mégatonnes : polymères, filières de fin de vie et recyclage

## SankeyChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SankeyChart"
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
    "name": "labelValues",
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
    "name": "nodes",
    "typeText": "readonly SankeyNode[] | undefined",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"left\" | \"right\" | \"center\" | \"justify\" | undefined",
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
    "name": "links",
    "typeText": "readonly SankeyLink[]",
    "required": true
  },
  {
    "name": "nodeWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "nodePadding",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "iterations",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "linkColor",
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "required": false
  },
  {
    "name": "linkOpacity",
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
