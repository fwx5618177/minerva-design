# MonthCalendar 月カレンダー

月曜始まりの月グリッド。日ごとの予定数、キーボード操作、選択日の予定一覧に対応します。

Package: minerva-design@1.22.1

Renderer: wc

Locale: ja

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

## MonthCalendar

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/month-calendar",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "month",
    "typeText": "Date | undefined",
    "attribute": "month",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "attribute": "value",
    "required": false
  },
  {
    "name": "clickableEvents",
    "typeText": "boolean",
    "attribute": "clickable-events",
    "required": false
  },
  {
    "name": "rangeStart",
    "typeText": "string | undefined",
    "attribute": "range-start",
    "required": false
  },
  {
    "name": "rangeEnd",
    "typeText": "string | undefined",
    "attribute": "range-end",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "hideEvents",
    "typeText": "boolean",
    "attribute": "hide-events",
    "required": false
  },
  {
    "name": "previousMonthLabel",
    "typeText": "string | undefined",
    "attribute": "previous-month-label",
    "required": false
  },
  {
    "name": "nextMonthLabel",
    "typeText": "string | undefined",
    "attribute": "next-month-label",
    "required": false
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "attribute": "today-label",
    "required": false
  },
  {
    "name": "emptyEventsText",
    "typeText": "string | undefined",
    "attribute": "empty-events-text",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "events",
    "typeText": "readonly MonthCalendarEvent[]",
    "required": false
  },
  {
    "name": "weekdayLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "getDayLabel",
    "typeText": "(day: string, eventCount: number) => string | undefined",
    "required": false
  },
  {
    "name": "getEventsLabel",
    "typeText": "(day: string) => string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:d7e7899890984f3f7e62"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user selected a day (`detail: { value }`, \"YYYY-MM-DD\")"
  },
  {
    "name": "minerva-month-change",
    "typeText": "CustomEvent<{ month: Date; }>",
    "detailType": {
      "typeText": "{ month: Date; }",
      "typeRef": "type:0b03dd821910fccb2702"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user displayed another month (`detail: { month }`, its first day at local midnight)"
  },
  {
    "name": "minerva-event-click",
    "typeText": "CustomEvent<{ event: MonthCalendarEvent; }>",
    "detailType": {
      "typeText": "{ event: MonthCalendarEvent; }",
      "typeRef": "type:ba00478897289b20132c"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "An event of the selected day was activated (`detail: { event }`; requires `clickable-events`)"
  }
]
```

## API

```json
{
  "wc:minerva-month-calendar": {
    "kind": "element",
    "source": "web-components/src/components/month-calendar/month-calendar.ts",
    "className": "MinervaMonthCalendar",
    "summary": "Month grid with per-day event counts and keyboard navigation.",
    "description": "A Monday-first, six-week month grid (`<MonthCalendar>` of React). Each day shows its number of events; selecting a day lists its events below the grid. Fully keyboard operable as an APG date grid: one tab stop (roving `tabindex` on the `gridcell`s themselves, `aria-selected`, no inner buttons), arrows, Home / End (week start / end), PageUp / PageDown (month), Shift+PageUp / PageDown (year), Enter / Space to select. The arrows follow the reading direction (RTL swaps left / right). Events are given through the `events` property. User navigation updates `month` / `value` and fires `minerva-month-change` / `minerva-change`.",
    "properties": [
      {
        "name": "month",
        "attribute": "month",
        "type": "Date | undefined",
        "description": "Displayed month (any day of it; attribute \"YYYY-MM\"); defaults to the current month"
      },
      {
        "name": "value",
        "attribute": "value",
        "type": "string | undefined",
        "description": "Selected day, \"YYYY-MM-DD\""
      },
      {
        "name": "clickableEvents",
        "attribute": "clickable-events",
        "type": "boolean",
        "default": "false",
        "description": "Renders the selected day's events as buttons firing `minerva-event-click`"
      },
      {
        "name": "rangeStart",
        "attribute": "range-start",
        "type": "string | undefined",
        "description": "First day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with `range-end`)"
      },
      {
        "name": "rangeEnd",
        "attribute": "range-end",
        "type": "string | undefined",
        "description": "Last day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with `range-start`)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Cell density: compact (\"small\"), default (\"medium\") or comfortable (\"large\")"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Blocks navigation, selection and event clicks"
      },
      {
        "name": "hideEvents",
        "attribute": "hide-events",
        "type": "boolean",
        "default": "false",
        "description": "Hides the list of the selected day's events (the React library's `showSelectedDayEvents={false}`)"
      },
      {
        "name": "previousMonthLabel",
        "attribute": "previous-month-label",
        "type": "string | undefined",
        "description": "Label of the previous-month button (default: localized)"
      },
      {
        "name": "nextMonthLabel",
        "attribute": "next-month-label",
        "type": "string | undefined",
        "description": "Label of the next-month button (default: localized)"
      },
      {
        "name": "todayLabel",
        "attribute": "today-label",
        "type": "string | undefined",
        "description": "Label of the button returning to the current month (default: localized \"Today\")"
      },
      {
        "name": "emptyEventsText",
        "attribute": "empty-events-text",
        "type": "string | undefined",
        "description": "Text shown when the selected day has no events (default: localized)"
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "string | undefined",
        "description": "Locale of the month heading (Intl.DateTimeFormat); default: the library language"
      },
      {
        "name": "events",
        "type": "readonly MonthCalendarEvent[]",
        "default": "[]",
        "description": "Events; each day shows how many it has"
      },
      {
        "name": "weekdayLabels",
        "type": "readonly string[] | undefined",
        "description": "Column headers, Monday first (7 labels)"
      },
      {
        "name": "getDayLabel",
        "type": "(day: string, eventCount: number) => string | undefined",
        "description": "Accessible label of a day cell, from the day (\"YYYY-MM-DD\") and its event count"
      },
      {
        "name": "getEventsLabel",
        "type": "(day: string) => string | undefined",
        "description": "Accessible label of the selected day's event list"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user selected a day (`detail: { value }`, \"YYYY-MM-DD\")"
      },
      {
        "name": "minerva-month-change",
        "description": "The user displayed another month (`detail: { month }`, its first day at local midnight)"
      },
      {
        "name": "minerva-event-click",
        "description": "An event of the selected day was activated (`detail: { event }`; requires `clickable-events`)"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The calendar `<section>`"
      },
      {
        "name": "heading",
        "description": "The month heading"
      },
      {
        "name": "nav-button",
        "description": "The previous / today / next buttons"
      },
      {
        "name": "grid",
        "description": "The `role=grid` element"
      },
      {
        "name": "day",
        "description": "A day cell (`role=gridcell`)"
      },
      {
        "name": "day--selected",
        "description": "Item state of `day`: selected"
      },
      {
        "name": "day--today",
        "description": "Item state of `day`: today"
      },
      {
        "name": "day--outside",
        "description": "Item state of `day`: outside"
      },
      {
        "name": "day--disabled",
        "description": "Item state of `day`: disabled"
      },
      {
        "name": "events",
        "description": "The events section of the selected day"
      },
      {
        "name": "event",
        "description": "An event (a button with `clickable-events`)"
      },
      {
        "name": "empty",
        "description": "The text shown when the selected day has no event"
      }
    ],
    "cssProperties": [
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

## Example: 基本的な使い方

month（"YYYY-MM"）と value（"YYYY-MM-DD"）は属性、events はプロパティです。タブストップは 1 つで、矢印キー、Home / End、PageUp / PageDown でグリッド内を移動します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/wc/basic.html

```html
<minerva-month-calendar
  id="calendar"
  month="2026-03"
  value="2026-03-12"
  style="max-width: 560px"
></minerva-month-calendar>

```

### apps/docs/src/docs/pages/month-calendar/wc/basic.ts

```tsx
// Events are a JS property; each day shows its count and the selected day's
// events are listed below the grid. Arrows, Home / End and PageUp / PageDown
// move through the grid (one tab stop).
type CalendarEvent = { id: string; date: string; title: string };

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<
    HTMLElement & { events: CalendarEvent[] }
  >("#calendar")!;
  calendar.events = [
    { id: "1", date: "2026-03-02", title: "Sprint planning" },
    { id: "2", date: "2026-03-12", title: "Design review" },
    { id: "3", date: "2026-03-12", title: "Customer call" },
    { id: "4", date: "2026-03-19", title: "Release 2.4" },
    { id: "5", date: "2026-03-27", title: "Retrospective" },
  ];
}

```

## Example: イベント

minerva-change は選択した日、minerva-month-change は表示中の月を通知します。clickable-events を付けると、予定をクリックしたときに minerva-event-click が発火します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/wc/events.html

```html
<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-month-calendar
    id="calendar"
    month="2026-03"
    value="2026-03-12"
    clickable-events
  ></minerva-month-calendar>
  <output id="log">Select a day, change month or click an event.</output>
</div>

```

### apps/docs/src/docs/pages/month-calendar/wc/events.ts

```tsx
// minerva-change (day), minerva-month-change (month) and, with
// clickable-events, minerva-event-click (event of the selected day).
type CalendarEvent = { id: string; date: string; title: string };

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<
    HTMLElement & { events: CalendarEvent[] }
  >("#calendar")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  calendar.events = [
    { id: "1", date: "2026-03-12", title: "Design review" },
    { id: "2", date: "2026-03-12", title: "Customer call" },
    { id: "3", date: "2026-04-02", title: "Quarterly planning" },
  ];
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    log.value = `Selected ${value}`;
  };
  const onMonth = (e: Event) => {
    const { month } = (e as CustomEvent<{ month: Date }>).detail;
    log.value = `Showing ${month.toLocaleDateString("en", { month: "long", year: "numeric" })}`;
  };
  const onEvent = (e: Event) => {
    const { event } = (e as CustomEvent<{ event: CalendarEvent }>).detail;
    log.value = `Opened "${event.title}"`;
  };
  calendar.addEventListener("minerva-change", onChange);
  calendar.addEventListener("minerva-month-change", onMonth);
  calendar.addEventListener("minerva-event-click", onEvent);
  return () => {
    calendar.removeEventListener("minerva-change", onChange);
    calendar.removeEventListener("minerva-month-change", onMonth);
    calendar.removeEventListener("minerva-event-click", onEvent);
  };
}

```

## Example: ローカライズと状態

locale とラベル属性でカレンダーを翻訳し、weekdayLabels / getDayLabel / getEventsLabel はプロパティです。右側は hide-events と disabled。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/wc/localized.html

```html
<div
  style="
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  "
>
  <minerva-month-calendar
    id="fr"
    month="2026-03"
    locale="fr"
    previous-month-label="Mois précédent"
    next-month-label="Mois suivant"
    today-label="Aujourd'hui"
    empty-events-text="Aucun événement"
    style="--month-calendar-day-height: 3rem"
  ></minerva-month-calendar>
  <minerva-month-calendar
    month="2026-03"
    value="2026-03-12"
    hide-events
    disabled
    style="--month-calendar-day-height: 3rem"
  ></minerva-month-calendar>
</div>

```

### apps/docs/src/docs/pages/month-calendar/wc/localized.ts

```tsx
// Labels are attributes; the column headers and accessible labels are
// properties (weekdayLabels Monday first, getDayLabel / getEventsLabel).
type Calendar = HTMLElement & {
  weekdayLabels: string[];
  getDayLabel: (day: string, count: number) => string;
  getEventsLabel: (day: string) => string;
};

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<Calendar>("#fr")!;
  calendar.weekdayLabels = ["lu", "ma", "me", "je", "ve", "sa", "di"];
  calendar.getDayLabel = (day, count) =>
    `${day}, ${count} événement${count > 1 ? "s" : ""}`;
  calendar.getEventsLabel = (day) => `Événements du ${day}`;
}

```

## Example: 範囲のハイライト

range-start / range-end は間の日付をハイライトします（表示のみ）。minerva-change で設定すれば範囲ピッカーを作れます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/wc/range.html

```html
<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-month-calendar
    id="calendar"
    month="2026-03"
    value="2026-03-13"
    range-start="2026-03-09"
    range-end="2026-03-13"
    hide-events
  ></minerva-month-calendar>
  <output id="range">From 2026-03-09 to 2026-03-13</output>
</div>

```

### apps/docs/src/docs/pages/month-calendar/wc/range.ts

```tsx
// range-start / range-end highlight days (display only, either order):
// here a first click starts a new range and a second one closes it.
type Calendar = HTMLElement & { rangeStart: string; rangeEnd: string };

export function setup(root: HTMLElement) {
  const calendar = root.querySelector<Calendar>("#calendar")!;
  const output = root.querySelector<HTMLOutputElement>("#range")!;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    if (calendar.rangeStart === calendar.rangeEnd) {
      calendar.rangeEnd = value;
      output.textContent = `From ${calendar.rangeStart} to ${value}`;
    } else {
      calendar.rangeStart = value;
      calendar.rangeEnd = value;
      output.textContent = `From ${value}: pick the last day`;
    }
  };
  calendar.addEventListener("minerva-change", onChange);
  return () => calendar.removeEventListener("minerva-change", onChange);
}

```

## Example: サイズ

size="small" は予定をドットで描画し、size="large" は日付を上部に置いた高いセルになります（:state(size-small) などのカスタムステートも利用可能）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/wc/sizes.html

```html
<div
  style="
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    align-items: start;
  "
>
  <minerva-month-calendar
    id="compact"
    size="small"
    month="2026-03"
    value="2026-03-12"
    hide-events
    aria-label="Compact calendar"
  ></minerva-month-calendar>
  <minerva-month-calendar
    id="comfortable"
    size="large"
    month="2026-03"
    value="2026-03-12"
    aria-label="Comfortable calendar"
  ></minerva-month-calendar>
</div>

```

### apps/docs/src/docs/pages/month-calendar/wc/sizes.ts

```tsx
// size="small" draws events as dots, size="large" puts the day number at
// the top of a taller cell. Events are a JS property.
type CalendarEvent = { id: string; date: string; title: string };
type Calendar = HTMLElement & { events: CalendarEvent[] };

export function setup(root: HTMLElement) {
  const compact = root.querySelector<Calendar>("#compact")!;
  const comfortable = root.querySelector<Calendar>("#comfortable")!;
  compact.events = [
    { id: "1", date: "2026-03-02", title: "Sprint planning" },
    { id: "2", date: "2026-03-12", title: "Design review" },
    { id: "3", date: "2026-03-12", title: "Customer call" },
    { id: "4", date: "2026-03-19", title: "Release 2.4" },
  ];
  comfortable.events = [
    { id: "1", date: "2026-03-02", title: "Sprint planning" },
    { id: "2", date: "2026-03-12", title: "Design review" },
    { id: "3", date: "2026-03-12", title: "Customer call" },
    { id: "4", date: "2026-03-19", title: "Release 2.4" },
  ];
}

```
