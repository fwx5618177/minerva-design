# Carte de chaleur

Une grille de cellules colorées selon leur valeur, avec des catégories ou des nombres sur les deux axes : activité par jour et par heure, matrices de corrélation, cartes d’une mesure. Survolez une cellule pour la soulever, éclairer sa ligne et sa colonne et repérer sa valeur sur la légende de couleurs.

Package: minerva-design@1.20.3

Renderer: uni

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HeatmapChart"
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
    "name": "name",
    "typeText": "string | undefined",
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
    "name": "radius",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly HeatmapCell[]",
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
    "name": "xCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "yCategories",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "colorScale",
    "typeText": "readonly string[] | ChartColorScheme | undefined",
    "required": false
  },
  {
    "name": "valueRange",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "colorMidpoint",
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
