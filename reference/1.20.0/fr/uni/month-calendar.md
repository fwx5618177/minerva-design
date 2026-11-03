# MonthCalendar

Grille mensuelle commençant le lundi, avec le nombre d’événements par jour, la navigation au clavier et les événements du jour choisi.

Package: minerva-design@1.20.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## MonthCalendar

Support: beta

Shared local-date core: Monday-first 42-day grid; controlled Date month and string selection/defaults; adjacent day navigation, today/year keys, localized headers and labels, event counts/clicks, display-only normalized ranges, size and day/event slots. Uni extensions: weekStartsOn, min/max and disabledDates. Keyboard metadata and native touch actions are implemented; device focus/geometry still require validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "MonthCalendar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "month",
    "typeText": "string | Date | undefined",
    "required": false
  },
  {
    "name": "defaultMonth",
    "typeText": "string | Date | undefined",
    "required": false
  },
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
    "name": "events",
    "typeText": "readonly CalendarEvent[] | undefined",
    "required": false
  },
  {
    "name": "rangeStart",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "rangeEnd",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showSelectedDayEvents",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "weekdayLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "previousMonthLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "nextMonthLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "getDayLabel",
    "typeText": "((day: string, count: number) => string) | undefined",
    "required": false
  },
  {
    "name": "getEventsLabel",
    "typeText": "((day: string) => string) | undefined",
    "required": false
  },
  {
    "name": "emptyEventsText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "min",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "weekStartsOn",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "disabledDates",
    "typeText": "readonly string[] | ((day: string) => boolean) | undefined",
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
    "name": "select",
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
    "name": "monthChange",
    "typeText": "[date: Date]",
    "parameters": [
      {
        "name": "date",
        "position": 0,
        "typeText": "Date",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:month",
    "typeText": "[date: Date]",
    "parameters": [
      {
        "name": "date",
        "position": 0,
        "typeText": "Date",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "eventClick",
    "typeText": "[event: CalendarEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "CalendarEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "day",
    "typeText": "{ date: Date; day: string; selected: boolean; count: number; }"
  },
  {
    "name": "event",
    "typeText": "{ event: CalendarEvent; }"
  }
]
```

### bindings

```json
[
  {
    "prop": "month",
    "event": "update:month",
    "syntax": "v-model:month"
  },
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  }
]
```

## CSS variables

```json
{
  "css:MonthCalendar": {
    "kind": "cssVars",
    "source": "react/src/components/MonthCalendar",
    "vars": [
      {
        "name": "--month-calendar-font-size",
        "description": "Base font size"
      },
      {
        "name": "--month-calendar-gap",
        "description": "Space between the day cells"
      },
      {
        "name": "--month-calendar-day-height",
        "description": "Height of a day cell (defaults to 4rem, 3.25rem on narrow screens; 2.5rem with size=\"small\", 5.5rem with size=\"large\")"
      },
      {
        "name": "--month-calendar-nav-height",
        "description": "Height of the toolbar buttons (defaults to the density's small control height)"
      },
      {
        "name": "--month-calendar-radius",
        "description": "Corner radius of the buttons, days and events (defaults to --radius-md)"
      },
      {
        "name": "--month-calendar-hover-background",
        "description": "Background of a hovered day"
      },
      {
        "name": "--month-calendar-selected-background",
        "description": "Background of the selected day"
      },
      {
        "name": "--month-calendar-selected-color",
        "description": "Text color of the selected day"
      },
      {
        "name": "--month-calendar-today-color",
        "description": "Ring color marking today"
      },
      {
        "name": "--month-calendar-weekday-color",
        "description": "Text color of the weekday headers"
      },
      {
        "name": "--month-calendar-outside-color",
        "description": "Text color of the days of the previous / next month"
      },
      {
        "name": "--month-calendar-event-background",
        "description": "Background of the event count badge"
      },
      {
        "name": "--month-calendar-event-color",
        "description": "Text color of the event count badge (and color of the event dot)"
      },
      {
        "name": "--month-calendar-range-background",
        "description": "Background of the days inside the highlighted range"
      },
      {
        "name": "--month-calendar-range-edge-background",
        "description": "Background of the first and last days of the range"
      },
      {
        "name": "--month-calendar-range-edge-color",
        "description": "Text color of the first and last days of the range"
      },
      {
        "name": "--month-calendar-events-background",
        "description": "Background of the selected day's event panel"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
