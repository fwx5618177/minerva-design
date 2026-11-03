# Calendar heatmap

Daily values on a calendar, like contribution graphs: commits, learning streaks, workouts, orders. Each day is a cell colored by level; month and weekday names, tooltip dates and the first day of the week follow the locale. The legend hides / shows levels; the arrow keys move by day and by week, and the tooltip shows the date.

Package: minerva-design@1.20.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

{{total}} commits in the last year

Commits per day over the last year

{{date}}: {{value}} commits

Click a day (or focus the chart, move with the arrow keys and press Enter) to select it

{{value}} min

Current streak: {{current}} days · longest streak: {{longest}} days

Minutes of language practice per day in 2026

{{date}}: {{value}} of practice

{{date}}: no practice

Click a day to see its practice time

{{value}} km

Running distance per day from 2024 to 2026

{{year}}: {{value}}

First day of the week

From the locale

Online orders per day in 2026, by month

Locale

Deploys per day in the first half of 2026

{{value}} kWh

High use only

Show all

Electricity used per day in 2025

{{days}} days shown, {{value}} in total ({{share}} of the year)

No record

{{value}} against the goal of {{goal}}

Average {{average}} a night · goal of {{goal}} reached on {{reached}} of {{nights}} nights

Hours of sleep per night from May to October 2026

Year

{{year}}: {{total}} incidents, {{quiet}} days without any

{{value}} incidents

Production incidents per day in {{year}}

{{date}}: {{value}} incidents

{{date}}: no incident

{{date}}: still to come

Hover a day to see its incidents

{{done}} workouts ({{share}} of the days) · current streak: {{streak}} days

Reset

Done

Not done

Workouts logged per day from August to October 2026

{{date}} marked as done

{{date}} marked as not done

Click a day (or press Enter on it) to log or remove a workout

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
