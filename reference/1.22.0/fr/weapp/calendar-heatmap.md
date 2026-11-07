# Calendrier thermique

Des valeurs quotidiennes sur un calendrier, comme les graphiques de contributions : commits, séries d'apprentissage, entraînements, commandes. Chaque jour est une case colorée selon son niveau ; les noms des mois et des jours, les dates de l'infobulle et le premier jour de la semaine suivent la locale. La légende masque / affiche les niveaux ; les flèches se déplacent par jour et par semaine, et l'infobulle indique la date.

Package: minerva-design@1.22.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

{{total}} commits sur la dernière année

Commits par jour sur la dernière année

{{date}} : {{value}} commits

Cliquez sur un jour (ou donnez le focus au graphique, déplacez-vous avec les flèches et appuyez sur Entrée) pour le sélectionner

{{value}} min

Série en cours : {{current}} jours · plus longue série : {{longest}} jours

Minutes de pratique d'une langue par jour en 2026

{{date}} : {{value}} de pratique

{{date}} : pas de pratique

Cliquez sur un jour pour voir son temps de pratique

{{value}} km

Distance de course par jour de 2024 à 2026

{{year}} : {{value}}

Premier jour de la semaine

Selon la locale

Commandes en ligne par jour en 2026, par mois

Locale

Déploiements par jour au premier semestre 2026

{{value}} kWh

Forte consommation seulement

Tout afficher

Électricité consommée par jour en 2025

{{days}} jours affichés, {{value}} au total ({{share}} de l'année)

Aucun relevé

{{value}} par rapport à l'objectif de {{goal}}

{{average}} par nuit en moyenne · objectif de {{goal}} atteint {{reached}} nuits sur {{nights}}

Heures de sommeil par nuit de mai à octobre 2026

Année

{{year}} : {{total}} incidents, {{quiet}} jours sans incident

{{value}} incidents

Incidents de production par jour en {{year}}

{{date}} : {{value}} incidents

{{date}} : aucun incident

{{date}} : à venir

Survolez un jour pour voir ses incidents

{{done}} entraînements ({{share}} des jours) · série en cours : {{streak}} jours

Réinitialiser

Fait

Pas fait

Entraînements notés par jour d'août à octobre 2026

{{date}} marqué comme fait

{{date}} marqué comme pas fait

Cliquez sur un jour (ou appuyez sur Entrée dessus) pour noter ou retirer un entraînement

## CalendarHeatmap

Support: beta

Calendar heatmap: daily values in weeks or months layouts, color levels / thresholds, month and weekday labels, locale. Same as PieChart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/calendar-heatmap/index",
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
    "name": "range",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "layout",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "weekStart",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "colors",
    "typeText": "array",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "thresholds",
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
    "name": "radius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxCellSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "monthLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "weekdayLabels",
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
