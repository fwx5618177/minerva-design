# WeekStrip

Les sept jours d’une semaine sur une ligne : sélectionnez un jour, repérez aujourd’hui d’un coup d’œil, marquez les jours qui ont des tâches et passez d’une semaine à l’autre.

Package: minerva-design@1.20.3

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## WeekStrip

Support: beta

Shared local-date core: the seven days of a week from firstDayOfWeek; controlled/default string selection (v-model) and Date week (v-model:week, follows the selection while uncontrolled); today override, count/dot markers with localized accessible names, getDayLabel, previous/next week navigation with a localized month heading, weekday labels, size and disabled; listbox/option semantics with arrow, Home/End and PageUp/PageDown keys across weeks. Keyboard metadata and native touch actions are implemented; device focus/geometry still require validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "WeekStrip"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "week",
    "typeText": "string | Date | undefined",
    "required": false
  },
  {
    "name": "defaultWeek",
    "typeText": "string | Date | undefined",
    "required": false
  },
  {
    "name": "firstDayOfWeek",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "today",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "markers",
    "typeText": "Readonly<Record<string, WeekStripMarker>> | undefined",
    "required": false
  },
  {
    "name": "getDayLabel",
    "typeText": "((day: string, marker: WeekStripMarker | undefined) => string) | undefined",
    "required": false
  },
  {
    "name": "showNavigation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "previousWeekLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "nextWeekLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "weekdayLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[day: string]",
    "parameters": [
      {
        "name": "day",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[day: string]",
    "parameters": [
      {
        "name": "day",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "weekChange",
    "typeText": "[weekStart: Date]",
    "parameters": [
      {
        "name": "weekStart",
        "position": 0,
        "typeText": "Date",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:week",
    "typeText": "[weekStart: Date]",
    "parameters": [
      {
        "name": "weekStart",
        "position": 0,
        "typeText": "Date",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  },
  {
    "prop": "week",
    "event": "update:week",
    "syntax": "v-model:week"
  }
]
```

## CSS variables

```json
{
  "css:WeekStrip": {
    "kind": "cssVars",
    "source": "react/src/components/WeekStrip",
    "vars": [
      {
        "name": "--week-strip-gap",
        "description": "Space between the day cells"
      },
      {
        "name": "--week-strip-day-height",
        "description": "Minimum height of a day cell (defaults to 3.5rem; 2.75rem with size=\"small\", 4.5rem with size=\"large\"); cells grow to fit a count badge"
      },
      {
        "name": "--week-strip-radius",
        "description": "Corner radius of the day cells and buttons (defaults to --radius-md)"
      },
      {
        "name": "--week-strip-hover-background",
        "description": "Background of a hovered day"
      },
      {
        "name": "--week-strip-selected-background",
        "description": "Background of the selected day (defaults to --primary-color)"
      },
      {
        "name": "--week-strip-selected-color",
        "description": "Text color of the selected day"
      },
      {
        "name": "--week-strip-today-color",
        "description": "Ring and number color marking today"
      },
      {
        "name": "--week-strip-weekday-color",
        "description": "Text color of the weekday names"
      },
      {
        "name": "--week-strip-marker-background",
        "description": "Background of the count badge"
      },
      {
        "name": "--week-strip-marker-color",
        "description": "Text color of the count badge (and color of the dot)"
      },
      {
        "name": "--week-strip-nav-height",
        "description": "Size of the previous / next week buttons (defaults to the density's small control height)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
