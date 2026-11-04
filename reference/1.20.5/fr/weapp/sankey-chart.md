# Diagramme de Sankey

Des flux entre étapes : bilans énergétiques, parcours utilisateurs, répartitions budgétaires. Les nœuds sont rangés en colonnes, l'épaisseur d'un lien est proportionnelle à son flux, et l'ordre des nœuds est relaxé pour redresser les flux et limiter les croisements. Survolez un nœud pour mettre en avant tous ses flux, ou un lien pour voir sa part dans sa source ; les flèches du clavier parcourent les nœuds et les liens.

Package: minerva-design@1.20.5

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Sankey diagram: nodes in columns and links with thickness proportional to the flow, alignment, link colors / opacity, labels. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/sankey-chart/index",
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
    "name": "nodes",
    "typeText": "array",
    "required": false
  },
  {
    "name": "links",
    "typeText": "array",
    "required": false
  },
  {
    "name": "nodeWidth",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "nodePadding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "iterations",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "linkColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "linkOpacity",
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
    "name": "labelValues",
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
