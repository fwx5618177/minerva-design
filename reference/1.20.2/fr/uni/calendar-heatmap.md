# Calendrier thermique

Des valeurs quotidiennes sur un calendrier, comme les graphiques de contributions : commits, séries d'apprentissage, entraînements, commandes. Chaque jour est une case colorée selon son niveau ; les noms des mois et des jours, les dates de l'infobulle et le premier jour de la semaine suivent la locale. La légende masque / affiche les niveaux ; les flèches se déplacent par jour et par semaine, et l'infobulle indique la date.

Package: minerva-design@1.20.2

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "CalendarHeatmap"
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
    "name": "weekdayLabels",
    "typeText": "boolean | undefined",
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
    "name": "monthLabels",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "color",
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
    "typeText": "readonly CalendarDatum[]",
    "required": true
  },
  {
    "name": "gap",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "layout",
    "typeText": "\"weeks\" | \"months\" | undefined",
    "required": false
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
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
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "percentFormat",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "weekStart",
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
  },
  {
    "name": "thresholds",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "maxCellSize",
    "typeText": "number | undefined",
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
