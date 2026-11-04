# Graphique à bulles

Des nuages de points avec une troisième valeur dessinée par la taille des points : l'aire d'une bulle est proportionnelle à sa valeur.

Package: minerva-design@1.20.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Asie

Europe

Amériques

Afrique

Population

PIB par habitant

Espérance de vie (ans)

PIB par habitant, espérance de vie et population des pays

Produits

Chiffre d'affaires

Stockage cloud

Analytique

SDK mobile

Paiements

Application de bureau

Matériel

Conseil

Part de marché relative

Croissance du marché

Leader

Forte croissance

Part de marché, croissance et chiffre d'affaires des produits

Qualifiée

Proposition

Négociation

Montant

Affaire n° {{id}}

Jours dans le pipeline

Probabilité de gain

{{deal}} ({{stage}}) : {{amount}}

Cliquez sur une bulle

Affaires en cours par ancienneté, probabilité de gain et montant

PIB par habitant (échelle log)

Revenu élevé

Espérance de vie selon le PIB par habitant en échelle log, taille selon la population

Revenus visibles : {{from}} – {{to}}

Zoomez pour voir la plage visible en dollars

Infrastructure

Sécurité

Équipe

Budget

Exposition

Coupure de courant

Retard de livraison du matériel

Bascule réseau

Fuite de données

Retard de revue des accès

Départ d'une personne clé

Manque de compétences du prestataire

Formation insuffisante

Hausse du coût des licences

Taux de change

Acceptable

Critique

Probabilité {{likelihood}} × impact {{impact}} = {{score}}

Exposition : {{value}}

Probabilité

Impact

Risques du projet selon la probabilité, l'impact et l'exposition financière

Recherche

Réseaux sociaux

Vidéo

E-mail

Budget

Lancée le {{date}}

Date de lancement

Retour sur dépenses publicitaires

Seuil de rentabilité

Campagnes marketing selon la date de lancement, le retour sur dépenses publicitaires et le budget

Nord

Sud

Est

Ouest

Centre

Même échelle de taille dans les deux graphiques

Les deux graphiques dessinent {{value}} avec la plus grande bulle.

Chaque graphique dessine son propre chiffre d'affaires maximal avec la plus grande bulle.

Ventes au m²

Marge

Ventes au mètre carré, marge et chiffre d'affaires des régions de magasins en {{year}}

Lecture

Pause

Rejouer

Recommencer

Année : {{year}}

Fécondité (enfants par femme)

Fécondité, espérance de vie et population des pays de 1990 à 2025

## BubbleChart

Support: beta

Scatter series sized by `value` (√value diameters, minSize / maxSize / maxValue). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/bubble-chart/index",
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
    "default": 320
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
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
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
    "name": "palette",
    "typeText": "array",
    "required": false
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
    "name": "labels",
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
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "minSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxValue",
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
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
