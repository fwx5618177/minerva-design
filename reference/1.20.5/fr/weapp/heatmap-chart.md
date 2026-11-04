# Carte de chaleur

Une grille de cellules colorées selon leur valeur, avec des catégories ou des nombres sur les deux axes : activité par jour et par heure, matrices de corrélation, cartes d’une mesure. Survolez une cellule pour la soulever, éclairer sa ligne et sa colonne et repérer sa valeur sur la légende de couleurs.

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
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

Sessions

Sessions par jour de la semaine et heure de la journée

Anomalie

Anomalie de température mensuelle, de 1995 à 2024

Signal

Puissance du signal Wi-Fi sur un étage de 200 m sur 100 m

{{cells}} cellules · dessinées avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Contributions

Contributions par jour sur un an

{{total}} contributions au cours de la dernière année

Sessions

Pages vues

Inscriptions

Chiffre d'affaires

Attrition

Tickets de support

Corrélation

Matrice de corrélation de six indicateurs produit

Mois {{n}}

Retenus

Rétention des cohortes mensuelles d'inscrits

Ordinateur

Mobile

Tablette

Recherche naturelle

Recherche payante

Réseaux sociaux

E-mail

Sites référents

Accès direct

{{source}} sur {{device}} : {{orders}} commandes pour {{sessions}} sessions, {{rate}} :

au-dessus de la moyenne de {{value}}

en dessous de la moyenne de {{value}}

Cliquez sur une cellule pour voir ses sessions et ses commandes.

Taux de conversion

Taux de conversion par source de trafic et par appareil

Baie {{n}}

Capteur {{n}}

Pause

Reprendre

Le plus chaud : {{rack}}, {{sensor}} à {{value}} · {{alarms}} capteurs au-dessus de {{limit}}

Température d'entrée d'air

Températures d'entrée d'air en direct des capteurs de dix baies de serveurs

Chat

Chien

Oiseau

Voiture

Camion

Réel : {{actual}}, prédit : {{predicted}}

{{value}} images ({{share}} de la classe)

Rappel : {{value}}

Précision : {{value}}

Mal classé

Exactitude : {{value}} sur {{images}} images de test

Part de la classe

Classe prédite

Classe réelle

Matrice de confusion d'un classifieur d'images sur cinq classes

Nord

Sud

Est

Ouest

Centre

T{{n}}

Mesure

Chiffre d'affaires

Croissance sur 2025

Marge brute

{{region}} au {{quarter}}

Meilleur : {{best}} ({{bestValue}}) · plus faible : {{worst}} ({{worstValue}})

Indicateurs de ventes 2026 par région et par trimestre

## HeatmapChart

Support: beta

Grid of cells colored by value from `data` cells (categories or numbers on both axes), colorScale / valueRange / radius; format() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/heatmap-chart/index",
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
    "name": "data",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "array",
    "required": false
  },
  {
    "name": "colorScale",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "valueRange",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "colorMidpoint",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "radius",
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
