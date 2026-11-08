# Calendar heatmap

Daily values on a calendar, like contribution graphs: commits, learning streaks, workouts, orders. Each day is a cell colored by level; month and weekday names, tooltip dates and the first day of the week follow the locale. The legend hides / shows levels; the arrow keys move by day and by week, and the tooltip shows the date.

Package: minerva-design@1.23.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnCalendarHeatmap. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCalendarHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly CalendarDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "layout",
    "typeText": "\"weeks\" | \"months\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "weekStart",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "thresholds",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Contributions over a year

Without range, the chart shows the 53 weeks ending on the last day of the data. color sets the highest level (lower levels are lighter, in light and dark themes); onClick reports the day, with its formatted date in name and its YYYY-MM-DD date in date.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCalendarHeatmap, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCalendarHeatmap],
  template: `
@let t = labels[language()];
<mn-calendar-heatmap [data]="days" [range]="2025" [locale]="t.locale" />
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  days = Array.from({ length: 365 }, (_, i) => ({ date: Date.UTC(2025, 0, 1 + i), value: Math.floor((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * (i % 7 < 5 ? 9 : 3)) }));
  labels = {
  "en": {
    "locale": "en-US",
    "unit": "contributions"
  },
  "zh": {
    "locale": "zh-CN",
    "unit": "次贡献"
  },
  "ja": {
    "locale": "ja-JP",
    "unit": "件のコントリビューション"
  },
  "fr": {
    "locale": "fr-FR",
    "unit": "contributions"
  }
};
}

```

## Example: Month calendars

layout="months" draws a small calendar per month, in the grid that gives the biggest cells. weekStart overrides the first day of the week given by the locale; days without orders (closed on Mondays) stay empty.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCalendarHeatmap, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCalendarHeatmap],
  template: `
@let t = labels[language()];
<mn-calendar-heatmap
  [data]="steps"
  [range]="['2026-01-01', '2026-06-30']"
  layout="months"
  [levels]="5"
  [thresholds]="[4000, 6000, 8000, 10000]"
  color="var(--success-color, #16a34a)"
  [locale]="t.locale"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  steps = Array.from({ length: 181 }, (_, i) => ({ date: Date.UTC(2026, 0, 1 + i), value: Math.round(3000 + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) * 9000) }));
  labels = {
  "en": {
    "locale": "en-US"
  },
  "zh": {
    "locale": "zh-CN"
  },
  "ja": {
    "locale": "ja-JP"
  },
  "fr": {
    "locale": "fr-FR"
  }
};
}

```
