# WeekStrip 週ストリップ

1 週間の 7 日を横一列に並べます。日付を選択し、今日をひと目で確認し、タスクのある日にマークを付け、週を切り替えられます。

Package: minerva-design@1.21.0

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## WeekStrip

Support: beta

Shared core local-date arithmetic; the seven days of a week from firstDayOfWeek with controlled/default YYYY-MM-DD selection and week (an uncontrolled week follows the selection), today override, count/dot markers with localized accessible names, getDayLabel through configure(), previous/next week navigation with a localized month heading, weekday labels, size, disabled and readOnly. Dates and the week are serialized YYYY-MM-DD strings. DOM roving keyboard focus is not a native mini-program interaction. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/week-strip/index",
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
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "week",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultWeek",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "firstDayOfWeek",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "today",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "markers",
    "typeText": "object",
    "required": false
  },
  {
    "name": "showNavigation",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "previousWeekLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "nextWeekLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "weekdayLabels",
    "typeText": "array",
    "required": false
  },
  {
    "name": "locale",
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
    "name": "ariaLabel",
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
    "name": "weekchange",
    "typeText": "{ week: string }",
    "description": "Requested YYYY-MM-DD first day of the visible week."
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
