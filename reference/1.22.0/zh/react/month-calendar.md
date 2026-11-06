# MonthCalendar 月历

周一开始的月历网格，显示每日日程数量，支持键盘导航并列出选中日期的日程。

Package: minerva-design@1.22.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## MonthCalendar

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Displayed month (controlled; any day of the month; pair with onMonthChange)"
  },
  {
    "name": "defaultMonth",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Initially displayed month (uncontrolled)"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Selected day, \"YYYY-MM-DD\" (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected day, \"YYYY-MM-DD\" (uncontrolled)"
  },
  {
    "name": "events",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "array",
    "typeText": "readonly MonthCalendarEvent[] | undefined",
    "typeRef": "type:006c809aa1350cb4e57b",
    "required": false,
    "description": "Events; each day shows how many it has"
  },
  {
    "name": "rangeStart",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "First day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with rangeEnd)"
  },
  {
    "name": "rangeEnd",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Last day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with rangeStart)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "MonthCalendarSize | undefined",
    "typeRef": "type:06b87f5c4395eb76f9af",
    "default": "medium",
    "required": false,
    "description": "Cell density: compact (\"small\"), default (\"medium\") or comfortable (\"large\")"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks navigation, selection and event clicks"
  },
  {
    "name": "showSelectedDayEvents",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Lists the events of the selected day below the grid"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the calendar"
  },
  {
    "name": "previousMonthLabel",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the previous-month button"
  },
  {
    "name": "nextMonthLabel",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the next-month button"
  },
  {
    "name": "todayLabel",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the button that returns to the current month"
  },
  {
    "name": "locale",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the month heading (Intl.DateTimeFormat)"
  },
  {
    "name": "weekdayLabels",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Column headers, Monday first (7 labels)"
  },
  {
    "name": "getDayLabel",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "function",
    "typeText": "((day: string, eventCount: number) => string) | undefined",
    "typeRef": "type:88ee780a07f30d1cbaa1",
    "parameters": [
      {
        "name": "day",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "eventCount",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible label of a day button; receives the day (\"YYYY-MM-DD\") and its number of events"
  },
  {
    "name": "getEventsLabel",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "function",
    "typeText": "((day: string) => string) | undefined",
    "typeRef": "type:b8391e645d68205791bd",
    "parameters": [
      {
        "name": "day",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible label of the selected day's event list"
  },
  {
    "name": "emptyEventsText",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text shown when the selected day has no events"
  }
]
```

### events

```json
[
  {
    "name": "onMonthChange",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "function",
    "typeText": "((month: Date) => void) | undefined",
    "typeRef": "type:e8d852925f8668d17f93",
    "parameters": [
      {
        "name": "month",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Date",
        "typeRef": "type:db6c47a950e394a72434"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the first day of the requested month, at local midnight"
  },
  {
    "name": "onChange",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "function",
    "typeText": "((day: string) => void) | undefined",
    "typeRef": "type:95add814202329520f38",
    "parameters": [
      {
        "name": "day",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the selected day (\"YYYY-MM-DD\")"
  },
  {
    "name": "onEventClick",
    "source": "packages/react/src/components/MonthCalendar/types.ts",
    "kind": "function",
    "typeText": "((event: MonthCalendarEvent) => void) | undefined",
    "typeRef": "type:3fcddf0b97e02a63c18a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MonthCalendarEvent",
        "typeRef": "type:750b8db3051da1a53e2d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Makes the selected day's events clickable"
  }
]
```

### bindings

```json
[
  {
    "prop": "month",
    "event": "onMonthChange",
    "syntax": "month={month} onMonthChange={handler}"
  },
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "MonthCalendarProps": {
    "source": "react/src/components/MonthCalendar/types.ts",
    "description": "Props of the MonthCalendar component: a Monday-first month grid with per-day event counts, keyboard navigation and the selected day's events",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "month",
        "type": "Date",
        "required": false,
        "description": "Displayed month (controlled; any day of the month; pair with onMonthChange)"
      },
      {
        "name": "defaultMonth",
        "type": "Date",
        "required": false,
        "default": "the current month",
        "description": "Initially displayed month (uncontrolled)"
      },
      {
        "name": "onMonthChange",
        "type": "(month: Date) => void",
        "required": false,
        "description": "Called with the first day of the requested month, at local midnight"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected day, \"YYYY-MM-DD\" (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected day, \"YYYY-MM-DD\" (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(day: string) => void",
        "required": false,
        "description": "Called with the selected day (\"YYYY-MM-DD\")"
      },
      {
        "name": "events",
        "type": "readonly MonthCalendarEvent[]",
        "required": false,
        "default": "[]",
        "description": "Events; each day shows how many it has"
      },
      {
        "name": "onEventClick",
        "type": "(event: MonthCalendarEvent) => void",
        "required": false,
        "description": "Makes the selected day's events clickable"
      },
      {
        "name": "rangeStart",
        "type": "string",
        "required": false,
        "description": "First day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with rangeEnd)"
      },
      {
        "name": "rangeEnd",
        "type": "string",
        "required": false,
        "description": "Last day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with rangeStart)"
      },
      {
        "name": "size",
        "type": "MonthCalendarSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Cell density: compact (\"small\"), default (\"medium\") or comfortable (\"large\")"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks navigation, selection and event clicks"
      },
      {
        "name": "showSelectedDayEvents",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Lists the events of the selected day below the grid"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Month calendar\" (translated)",
        "description": "Accessible label of the calendar"
      },
      {
        "name": "previousMonthLabel",
        "type": "string",
        "required": false,
        "default": "\"Previous month\" (translated)",
        "description": "Label of the previous-month button"
      },
      {
        "name": "nextMonthLabel",
        "type": "string",
        "required": false,
        "default": "\"Next month\" (translated)",
        "description": "Label of the next-month button"
      },
      {
        "name": "todayLabel",
        "type": "string",
        "required": false,
        "default": "\"Today\" (translated)",
        "description": "Label of the button that returns to the current month"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the library language",
        "description": "Locale of the month heading (Intl.DateTimeFormat)"
      },
      {
        "name": "weekdayLabels",
        "type": "readonly string[]",
        "required": false,
        "default": "\"Mon\" ... \"Sun\" (translated)",
        "description": "Column headers, Monday first (7 labels)"
      },
      {
        "name": "getDayLabel",
        "type": "(day: string, eventCount: number) => string",
        "required": false,
        "default": "\"<day>, <n> events\" (translated)",
        "description": "Accessible label of a day button; receives the day (\"YYYY-MM-DD\") and its number of events"
      },
      {
        "name": "getEventsLabel",
        "type": "(day: string) => string",
        "required": false,
        "default": "\"Events on <day>\" (translated)",
        "description": "Accessible label of the selected day's event list"
      },
      {
        "name": "emptyEventsText",
        "type": "string",
        "required": false,
        "default": "\"No events\" (translated)",
        "description": "Text shown when the selected day has no events"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root <section>"
      }
    ]
  },
  "MonthCalendarEvent": {
    "source": "react/src/components/MonthCalendar/types.ts",
    "description": "An event shown in a MonthCalendar",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Unique id of the event"
      },
      {
        "name": "date",
        "type": "string",
        "required": true,
        "description": "Local day of the event, \"YYYY-MM-DD\" (no time or timezone)"
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Title of the event"
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

## Example: 基本用法

选择日期以列出其日程；方向键、Home / End 与 PageUp / PageDown（按住 Shift 为一年）移动焦点。每一天都是带 aria-selected 的可聚焦网格单元格，选中状态只播报一次。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/demos/basic.tsx

```tsx
import { useState } from "react";
import { MonthCalendar } from "minerva-design";

const today = new Date();
const day = (d: number) =>
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const events = [
  { id: "1", date: day(3), title: "Release v2.0" },
  { id: "2", date: day(3), title: "Retrospective" },
  { id: "3", date: day(12), title: "Design review" },
];

export default function BasicDemo() {
  const [value, setValue] = useState(day(3));
  const [clicked, setClicked] = useState("");

  return (
    <div style={{ maxWidth: 560 }}>
      <MonthCalendar
        value={value}
        onChange={setValue}
        events={events}
        onEventClick={(event) => setClicked(event.title)}
      />
      {clicked && <p>Clicked: {clicked}</p>}
    </div>
  );
}

```

## Example: 高亮范围

rangeStart / rangeEnd 为区间内的日期着色并填充两端（仅展示，顺序不限）。此示例中第一次点击开始新范围，第二次点击结束范围。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/demos/range.tsx

```tsx
import { useState } from "react";
import { MonthCalendar } from "minerva-design";

const events = [
  { id: "1", date: "2026-03-10", title: "Offsite day 1" },
  { id: "2", date: "2026-03-11", title: "Offsite day 2" },
];

export default function RangeDemo() {
  const [range, setRange] = useState<[string, string?]>([
    "2026-03-09",
    "2026-03-13",
  ]);
  const [start, end] = range;

  // First click starts a new range, the second one closes it.
  const pick = (day: string) =>
    setRange(end === undefined ? [start, day] : [day]);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MonthCalendar
        defaultMonth={new Date(2026, 2, 1)}
        value={end ?? start}
        onChange={pick}
        rangeStart={start}
        rangeEnd={end ?? start}
        events={events}
        showSelectedDayEvents={false}
      />
      <output>
        {end === undefined
          ? `From ${start}: pick the last day`
          : `From ${[start, end].sort().join(" to ")}`}
      </output>
    </div>
  );
}

```

## Example: 尺寸

size="small" 为紧凑网格，日程以圆点表示；size="large" 为宽松布局，单元格更高，日期数字在顶部，日程数量徽标在底部。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/demos/sizes.tsx

```tsx
import { MonthCalendar } from "minerva-design";

const events = [
  { id: "1", date: "2026-03-02", title: "Sprint planning" },
  { id: "2", date: "2026-03-12", title: "Design review" },
  { id: "3", date: "2026-03-12", title: "Customer call" },
  { id: "4", date: "2026-03-19", title: "Release 2.4" },
];

export default function SizesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        alignItems: "start",
      }}
    >
      <MonthCalendar
        size="small"
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue="2026-03-12"
        events={events}
        showSelectedDayEvents={false}
        aria-label="Compact calendar"
      />
      <MonthCalendar
        size="large"
        defaultMonth={new Date(2026, 2, 1)}
        defaultValue="2026-03-12"
        events={events}
        aria-label="Comfortable calendar"
      />
    </div>
  );
}

```
