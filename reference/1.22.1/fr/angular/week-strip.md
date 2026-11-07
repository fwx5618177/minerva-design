# WeekStrip

Les sept jours d’une semaine sur une ligne : sélectionnez un jour, repérez aujourd’hui d’un coup d’œil, marquez les jours qui ont des tâches et passez d’une semaine à l’autre.

Package: minerva-design@1.22.1

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## WeekStrip

Support: beta

Native Angular: MnWeekStrip. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnWeekStrip"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | null",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "week",
    "typeText": "Date | null",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "firstDayOfWeek",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "today",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "markers",
    "typeText": "Readonly<Record<string, WeekStripMarker>> | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "getDayLabel",
    "typeText": "((day: string, marker: WeekStripMarker | undefined) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "showNavigation",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "previousWeekLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "nextWeekLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "weekdayLabels",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "size",
    "typeText": "WeekStripSize",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/week-strip.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | null",
    "required": false
  },
  {
    "name": "weekChange",
    "typeText": "Date | null",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  },
  {
    "prop": "week",
    "event": "weekChange",
    "syntax": "[(week)]"
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

## Example: Pick a day of the week

value is the selected day ("YYYY-MM-DD"); markers show a count badge (a number) or a dot (true). Arrows, Home / End and PageUp / PageDown move through the days.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWeekStrip } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWeekStrip],
  template: `
<mn-week-strip [(value)]="value" [markers]="markers" today="2026-10-07" aria-label="Study days"/><output>Selected: {{value}}</output>
  `,
})
export class Example {
  value: string | null = "2026-10-07";
  markers = {
  "2026-10-06": 2,
  "2026-10-07": 3,
  "2026-10-08": true
};
}

```

## Example: Week navigation

showNavigation adds previous / next week buttons; [(week)] holds the first day of the displayed week.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWeekStrip } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWeekStrip],
  template: `
<mn-week-strip showNavigation [(week)]="week" [(value)]="value" firstDayOfWeek="0"/><output>Week of {{week?.toDateString()}}</output>
  `,
})
export class Example {
  week: Date | null = new Date(2026, 9, 7);
  value: string | null = null;
}

```

## Example: Sizes and disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnWeekStrip } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnWeekStrip],
  template: `
<mn-week-strip size="small" today="2026-10-07"/><mn-week-strip size="large" today="2026-10-07"/><mn-week-strip disabled value="2026-10-07" today="2026-10-07"/>
  `,
})
export class Example {

}

```
