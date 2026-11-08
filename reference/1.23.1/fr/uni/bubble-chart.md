# Graphique à bulles

Des nuages de points avec une troisième valeur dessinée par la taille des points : l'aire d'une bulle est proportionnelle à sa valeur.

Package: minerva-design@1.23.1

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "BubbleChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
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
    "name": "maxSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "minSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "maxValue",
    "typeText": "number | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
