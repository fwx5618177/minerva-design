# MonthCalendar 月历

周一开始的月历网格，显示每日日程数量，支持键盘导航并列出选中日期的日程。

Package: minerva-design@1.19.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## MonthCalendar

Support: beta

Native Angular: MnMonthCalendar. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMonthCalendar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "month",
    "typeText": "Date",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "value",
    "typeText": "string | null",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "today",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "events",
    "typeText": "readonly CalendarEvent[]",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "disabledDate",
    "typeText": "(date: Date) => boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "monthChange",
    "typeText": "Date",
    "required": false
  },
  {
    "name": "valueChange",
    "typeText": "string | null",
    "required": false
  },
  {
    "name": "eventClick",
    "typeText": "CalendarEvent",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "CalendarEvent",
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
    "prop": "month",
    "event": "monthChange",
    "syntax": "[(month)]"
  },
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
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

## Example: Pick a date and inspect events

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMonthCalendar } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMonthCalendar],
  template: `
<mn-month-calendar [month]="month" [(value)]="value" [events]="events"/><output>Selected: {{value}}</output>
  `,
})
export class Example {
  month = new Date(2026, 9, 1);
  value = "2026-10-09";
  events = [
  {
    "id": "review",
    "date": "2026-10-09",
    "title": "Design review"
  }
];
}

```

## Example: Disabled calendar

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMonthCalendar } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMonthCalendar],
  template: `
<mn-month-calendar [month]="month" disabled size="small"/>
  `,
})
export class Example {
  month = new Date(2026, 9, 1);
}

```
