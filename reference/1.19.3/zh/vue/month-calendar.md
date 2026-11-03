# MonthCalendar 月历

周一开始的月历网格，显示每日日程数量，支持键盘导航并列出选中日期的日程。

Package: minerva-design@1.19.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## MonthCalendar

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "type": "Date",
    "required": false,
    "description": "Displayed month (controlled, `v-model:month`; any day of the month)",
    "typeText": "Date"
  },
  {
    "name": "defaultMonth",
    "type": "Date",
    "required": false,
    "description": "Initially displayed month (uncontrolled)",
    "typeText": "Date"
  },
  {
    "name": "modelValue",
    "type": "string",
    "required": false,
    "description": "Selected day, \"YYYY-MM-DD\" (controlled, `v-model`)",
    "typeText": "string"
  },
  {
    "name": "defaultValue",
    "type": "string",
    "required": false,
    "description": "Initially selected day, \"YYYY-MM-DD\" (uncontrolled)",
    "typeText": "string"
  },
  {
    "name": "events",
    "type": "readonly MonthCalendarEvent[]",
    "default": "NO_EVENTS",
    "required": false,
    "description": "Events; each day shows how many it has",
    "typeText": "readonly MonthCalendarEvent[]"
  },
  {
    "name": "rangeStart",
    "type": "string",
    "required": false,
    "description": "First day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with\nrangeEnd)",
    "typeText": "string"
  },
  {
    "name": "rangeEnd",
    "type": "string",
    "required": false,
    "description": "Last day of a highlighted range, \"YYYY-MM-DD\" (display only; pair with\nrangeStart)",
    "typeText": "string"
  },
  {
    "name": "size",
    "type": "MonthCalendarSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Cell density: compact (\"small\"), default (\"medium\") or comfortable\n(\"large\")",
    "typeText": "MonthCalendarSize"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Blocks navigation, selection and event clicks",
    "typeText": "boolean"
  },
  {
    "name": "showSelectedDayEvents",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Lists the events of the selected day below the grid",
    "typeText": "boolean"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label of the calendar",
    "typeText": "string"
  },
  {
    "name": "previousMonthLabel",
    "type": "string",
    "required": false,
    "description": "Label of the previous-month button",
    "typeText": "string"
  },
  {
    "name": "nextMonthLabel",
    "type": "string",
    "required": false,
    "description": "Label of the next-month button",
    "typeText": "string"
  },
  {
    "name": "todayLabel",
    "type": "string",
    "required": false,
    "description": "Label of the button that returns to the current month",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Locale of the month heading (Intl.DateTimeFormat)",
    "typeText": "string"
  },
  {
    "name": "weekdayLabels",
    "type": "readonly string[]",
    "required": false,
    "description": "Column headers, Monday first (7 labels)",
    "typeText": "readonly string[]"
  },
  {
    "name": "getDayLabel",
    "type": "((day: string, eventCount: number) => string)",
    "required": false,
    "description": "Accessible label of a day button; receives the day (\"YYYY-MM-DD\") and its\nnumber of events",
    "typeText": "((day: string, eventCount: number) => string)"
  },
  {
    "name": "getEventsLabel",
    "type": "((day: string) => string)",
    "required": false,
    "description": "Accessible label of the selected day's event list",
    "typeText": "((day: string) => string)"
  },
  {
    "name": "emptyEventsText",
    "type": "string",
    "required": false,
    "description": "Text shown when the selected day has no events",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[day: string]",
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
    "name": "change",
    "type": "[day: string]",
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
    "name": "update:month",
    "type": "[month: Date]",
    "typeText": "[month: Date]",
    "parameters": [
      {
        "name": "month",
        "position": 0,
        "typeText": "Date",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "monthChange",
    "type": "[month: Date]",
    "typeText": "[month: Date]",
    "parameters": [
      {
        "name": "month",
        "position": 0,
        "typeText": "Date",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "eventClick",
    "type": "[event: MonthCalendarEvent]",
    "typeText": "[event: MonthCalendarEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "MonthCalendarEvent",
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, VStack } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><MonthCalendar v-model="day" v-model:month="month" /><output
      >Selected: {{ day }}</output
    ></VStack
  >
</template>

```

## Example: events

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/vue/events.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, VStack } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
const selected = ref("");
const events = [
  { id: "design", date: "2026-10-09", title: "Design review" },
  { id: "launch", date: "2026-10-09", title: "Launch planning" },
  { id: "retro", date: "2026-10-15", title: "Retrospective" },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><MonthCalendar
      v-model="day"
      v-model:month="month"
      :events="events"
      @event-click="(event) => (selected = event.title)"
    /><output>{{ selected }}</output></VStack
  >
</template>

```

## Example: localized

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/vue/localized.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, ConfigProvider } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <ConfigProvider :locale="{ language: 'zh' }"
    ><MonthCalendar v-model="day" v-model:month="month" locale="zh-CN"
  /></ConfigProvider>
</template>

```

## Example: range

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/vue/range.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <MonthCalendar
    v-model="day"
    v-model:month="month"
    range-start="2026-10-05"
    range-end="2026-10-12"
  />
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/vue/sizes.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MonthCalendar, ResponsiveGrid } from "minerva-design/vue";
const month = ref(new Date(2026, 9, 1));
const day = ref("2026-10-09");
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, lg: 2 }" :gap="4"
    ><MonthCalendar
      :default-month="month"
      size="small"
      :show-selected-day-events="false" /><MonthCalendar
      :default-month="month"
      size="large"
      :show-selected-day-events="false"
  /></ResponsiveGrid>
</template>

```
