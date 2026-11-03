# Entonnoir

Les étapes d’un processus qui perd du volume en chemin (inscriptions, pipeline commercial, paiement), avec le taux de conversion d’une étape à la suivante. Survolez ou utilisez les flèches pour mettre une étape en évidence ; un clic sur la légende la masque.

Package: minerva-design@1.19.3

Renderer: weapp

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

Page des tarifs

Inscription commencée

E-mail vérifié

Projet créé

Collègue invité

Passage à l'offre payante

{{users}} utilisateurs

{{share}} des visiteurs

{{users}} perdus depuis « {{stage}} »

Entonnoir d'inscription

Alertes

Tableaux de bord

Intégrations

Rapports

API publique

Ordre de tri

Décroissant

Croissant

Ordre des données

{{users}} utilisateurs par semaine

Utilisateurs actifs hebdomadaires par fonctionnalité

Visites

Fiche produit

Ajout au panier

Commande

Paiement

Commande validée

Étape

Visiteurs

Abandon

{{share}} de la première étape

Tunnel de commande d'une boutique en ligne

Abandon entre les étapes

Candidature

Présélection

Entretien technique

Entretien sur site

Offre

Embauche

{{candidates}} candidats

Durée habituelle de l'étape : {{days}}

Processus de recrutement d'un poste d'ingénieur

{{stage}} : {{candidates}} candidats ({{share}} des candidatures)

{{rate}} des candidats sont embauchés, en {{days}} en moyenne

Ordinateur

Mobile

{{rate}} de conversion

Tunnel de commande : {{device}}

Impressions

Clics

Prospects

Prospects qualifiés

Clients

Tous les canaux

Annonces de recherche

Réseaux sociaux

E-mail

Partenaires

Canal

{{share}} de l’étape précédente

Coût par résultat : {{cost}}

Entonnoir marketing du mois : {{channel}}

Dépenses : {{spend}} · Clients : {{customers}} · Coût d’acquisition : {{cac}} par client

Visites

Ajouts au panier

Paiement

Commandes payées

Entonnoir de paiement mensuel calculé à partir des taux de conversion

{{from}} → {{to}}

Baisser la conversion de {{step}}

Augmenter la conversion de {{step}}

Revenir aux taux actuels

{{orders}} commandes ({{ordersDelta}}) · {{revenue}} de chiffre d’affaires ({{revenueDelta}}) par mois

Visiteurs

Offre consultée

Ajouts au panier

Paiement

Commandes

Entonnoir de la vente flash, mis à jour en direct

Pause

Reprendre

Recommencer

{{time}} · {{orders}} commandes · {{rate}} des visiteurs

La vente est terminée : {{orders}} commandes.

Prospect

Qualifié

Démo

Proposition

Négociation

{{deals}} affaires · {{amount}}

Probabilité de gain : {{share}}

Affaires en cours par étape du pipeline, en montant

{{stage}} : {{deals}} affaires en cours

Prévision pondérée : {{amount}}

Cliquez sur une étape pour lister ses affaires.

## FunnelChart

Support: beta

Funnel chart: trapezoid or bar stages, sort, gap, conversion rates, legend toggles. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/funnel-chart/index",
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
    "name": "sort",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "conversion",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "shape",
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
