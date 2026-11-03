# WeekStrip 周日期条

将一周七天排成一行：选择日期、一眼看到今天、标记有任务的日期，并可逐周切换。

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
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## WeekStrip

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "WeekStrip"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "week",
    "type": "Date",
    "required": false,
    "description": "Displayed week (controlled, `v-model:week`; any day of the week)",
    "typeText": "Date"
  },
  {
    "name": "defaultWeek",
    "type": "Date",
    "required": false,
    "description": "Initially displayed week (uncontrolled; any day of the week). While the\nweek is uncontrolled it follows the selected day.",
    "typeText": "Date"
  },
  {
    "name": "firstDayOfWeek",
    "type": "number",
    "default": "1",
    "required": false,
    "description": "First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday",
    "typeText": "number"
  },
  {
    "name": "today",
    "type": "string",
    "required": false,
    "description": "The day marked as today, \"YYYY-MM-DD\" (e.g. a server date or a fixed\ndate in tests)",
    "typeText": "string"
  },
  {
    "name": "markers",
    "type": "Readonly<Record<string, WeekStripMarker>>",
    "required": false,
    "description": "Per-day markers keyed by \"YYYY-MM-DD\": a number shows a count badge\n(99+ above 99), true shows a dot",
    "typeText": "Readonly<Record<string, WeekStripMarker>>"
  },
  {
    "name": "getDayLabel",
    "type": "((day: string, marker: WeekStripMarker | undefined) => string)",
    "required": false,
    "description": "Accessible label of a day; receives the day (\"YYYY-MM-DD\") and its marker",
    "typeText": "((day: string, marker: WeekStripMarker | undefined) => string)"
  },
  {
    "name": "showNavigation",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows previous / next week buttons around the month of the week",
    "typeText": "boolean"
  },
  {
    "name": "previousWeekLabel",
    "type": "string",
    "required": false,
    "description": "Label of the previous-week button",
    "typeText": "string"
  },
  {
    "name": "nextWeekLabel",
    "type": "string",
    "required": false,
    "description": "Label of the next-week button",
    "typeText": "string"
  },
  {
    "name": "weekdayLabels",
    "type": "readonly string[]",
    "required": false,
    "description": "Weekday names, Monday first (7 labels), whatever firstDayOfWeek is",
    "typeText": "readonly string[]"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Locale of the dates (Intl.DateTimeFormat)",
    "typeText": "string"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Blocks selection and navigation",
    "typeText": "boolean"
  },
  {
    "name": "size",
    "type": "WeekStripSize",
    "default": "\"medium\"",
    "required": false,
    "description": "Cell density",
    "typeText": "WeekStripSize"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label of the day list",
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
    "name": "update:week",
    "type": "[week: Date]",
    "typeText": "[week: Date]",
    "parameters": [
      {
        "name": "week",
        "position": 0,
        "typeText": "Date",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "weekChange",
    "type": "[weekStart: Date]",
    "typeText": "[weekStart: Date]",
    "parameters": [
      {
        "name": "weekStart",
        "position": 0,
        "typeText": "Date",
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
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  },
  {
    "prop": "week",
    "event": "update:week",
    "syntax": "v-model:week"
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { VStack, WeekStrip } from "minerva-design/vue";
const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();
const day = ref(
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
);
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 480px"
    ><WeekStrip v-model="day" aria-label="Study days" /><output
      >Selected: {{ day }}</output
    ></VStack
  >
</template>

```

## Example: markers

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/vue/markers.vue

```vue
<script setup lang="ts">
import { VStack, WeekStrip, type WeekStripMarker } from "minerva-design/vue";
const pad = (n: number) => String(n).padStart(2, "0");
const inDays = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
// A number shows a count badge, true shows a dot
const markers: Record<string, WeekStripMarker> = {
  [inDays(-1)]: 2,
  [inDays(0)]: 3,
  [inDays(1)]: true,
  [inDays(3)]: 1,
};
const dayLabel = (day: string, marker: WeekStripMarker | undefined) =>
  typeof marker === "number"
    ? `${day}: ${marker} tasks`
    : marker
      ? `${day}: reminder`
      : day;
</script>
<template>
  <VStack :gap="6" align="stretch" style="max-width: 480px"
    ><WeekStrip :default-value="inDays(0)" :markers="markers" /><WeekStrip
      :default-value="inDays(0)"
      :markers="markers"
      :first-day-of-week="0"
      :get-day-label="dayLabel"
      aria-label="Tasks this week (Sunday first)"
  /></VStack>
</template>

```

## Example: navigation

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/vue/navigation.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { VStack, WeekStrip } from "minerva-design/vue";
const day = ref<string>();
const week = ref(new Date());
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 480px"
    ><WeekStrip v-model="day" v-model:week="week" show-navigation /><output
      >Week of {{ week.toLocaleDateString()
      }}{{ day ? ` · selected ${day}` : "" }}</output
    ></VStack
  >
</template>

```

## Example: sizes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/vue/sizes.vue

```vue
<script setup lang="ts">
import { VStack, WeekStrip } from "minerva-design/vue";
const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();
const markers = {
  [`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`]: 4,
};
</script>
<template>
  <VStack :gap="6" align="stretch" style="max-width: 480px"
    ><WeekStrip
      size="small"
      :markers="markers"
      aria-label="Small week" /><WeekStrip
      :markers="markers"
      aria-label="Medium week" /><WeekStrip
      size="large"
      :markers="markers"
      aria-label="Large week" /><WeekStrip
      disabled
      :markers="markers"
      aria-label="Disabled week"
  /></VStack>
</template>

```
