# Calendar heatmap

Daily values on a calendar, like contribution graphs: commits, learning streaks, workouts, orders. Each day is a cell colored by level; month and weekday names, tooltip dates and the first day of the week follow the locale. The legend hides / shows levels; the arrow keys move by day and by week, and the tooltip shows the date.

Package: minerva-design@1.20.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/calendar-heatmap",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"weeks\" | \"months\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number",
    "attribute": "levels",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly CalendarDatum[] | undefined",
    "required": false
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<CalendarHeatmapOptions, \"type\">> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: A year of contributions

One value per day of 2025; month and weekday names follow the locale of the page language.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/wc/contributions.html

```html
<minerva-calendar-heatmap id="contributions"></minerva-calendar-heatmap>

```

### apps/docs/src/docs/pages/calendar-heatmap/wc/contributions.ts

```tsx
// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow `locale` (the page language here).
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#contributions")!;
  chart.data = DAYS;
  chart.range = 2025;
  chart.locale = text.locale;
  chart.options = { format: (value) => `${value} ${text.unit}` };
}

```

## Example: Monthly calendars

A small calendar per month, five color levels with explicit thresholds (steps walked per day).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/wc/months.html

```html
<minerva-calendar-heatmap
  id="steps"
  layout="months"
  levels="5"
  height="420"
></minerva-calendar-heatmap>

```

### apps/docs/src/docs/pages/calendar-heatmap/wc/months.ts

```tsx
// `layout="months"`: a small calendar per month; `levels` sets the number
// of color steps above the empty days, `thresholds` their bounds.
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#steps")!;
  chart.data = STEPS;
  chart.range = ["2026-01-01", "2026-06-30"];
  chart.locale = text.locale;
  chart.options = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };
}

```
