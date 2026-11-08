# MonthCalendar

A Monday-first month grid with per-day event counts, keyboard navigation and the selected day's events.

Package: minerva-design@1.23.2

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## MonthCalendar

Support: beta

Shared core local-date arithmetic; six-week Monday-first grid with configurable week start, controlled/default month and day, disabled dates/bounds, display-only range highlight, event counts/list/actions, today navigation and configured date labels. Month props are serialized YYYY-MM strings. DOM roving keyboard focus is not a native mini-program interaction. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/month-calendar/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "month",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "min",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "max",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultMonth",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "events",
    "typeText": "array",
    "required": false
  },
  {
    "name": "weekStartsOn",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "weekdayLabels",
    "typeText": "array",
    "required": false
  },
  {
    "name": "disabledDates",
    "typeText": "array",
    "required": false
  },
  {
    "name": "rangeStart",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "rangeEnd",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "showSelectedDayEvents",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "previousMonthLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "nextMonthLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "todayLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "emptyEventsText",
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
    "name": "change",
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "monthchange",
    "typeText": "{ month: string }",
    "description": "Requested YYYY-MM visible month."
  },
  {
    "name": "eventclick",
    "typeText": "{ event: { id: string; date: string; title: string } }",
    "description": "Original selected calendar event."
  }
]
```

### slots

```json
[
  {
    "name": "header"
  },
  {
    "name": "events"
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
