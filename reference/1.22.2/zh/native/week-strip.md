# WeekStrip 周日期条

将一周七天排成一行：选择日期、一眼看到今天、标记有任务的日期，并可逐周切换。

Package: minerva-design@1.22.2

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## WeekStrip

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "value",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Selected day, \"YYYY-MM-DD\" (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected day, \"YYYY-MM-DD\" (uncontrolled)"
  },
  {
    "name": "week",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Displayed week (controlled; any day of the week; pair with onWeekChange)"
  },
  {
    "name": "defaultWeek",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Initially displayed week (uncontrolled; any day of the week). While the week is uncontrolled it follows the selected day."
  },
  {
    "name": "firstDayOfWeek",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday"
  },
  {
    "name": "today",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "The day marked as today, \"YYYY-MM-DD\""
  },
  {
    "name": "markers",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "object",
    "typeText": "Readonly<Record<string, WeekStripMarker>> | undefined",
    "typeRef": "type:7f15b637ab2e847d799d",
    "required": false,
    "description": "Per-day markers keyed by \"YYYY-MM-DD\": a number shows a count badge (99+ above 99), true shows a dot"
  },
  {
    "name": "getDayLabel",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "function",
    "typeText": "((day: string, marker: WeekStripMarker | undefined) => string) | undefined",
    "typeRef": "type:bff9110f3a328afecd78",
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
        "name": "marker",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "WeekStripMarker | undefined",
        "typeRef": "type:79dbfc6bde69547185d9"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible label of a day; receives the day (\"YYYY-MM-DD\") and its marker"
  },
  {
    "name": "showNavigation",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows previous / next week buttons around the month of the week"
  },
  {
    "name": "previousWeekLabel",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the previous-week button"
  },
  {
    "name": "nextWeekLabel",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the next-week button"
  },
  {
    "name": "weekdayLabels",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Weekday names, Monday first (7 labels), whatever firstDayOfWeek is"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the accessible dates and of the month title"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks selection and navigation"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "WeekStripSize | undefined",
    "typeRef": "type:a1b36c68bdbfedde2f8f",
    "default": "medium",
    "required": false,
    "description": "Cell density"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "function",
    "typeText": "((day: string) => void) | undefined",
    "typeRef": "type:e9fb09c2e69445c23307",
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
    "name": "onWeekChange",
    "source": "packages/native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "function",
    "typeText": "((weekStart: Date) => void) | undefined",
    "typeRef": "type:2a46227fac84f8d84c1c",
    "parameters": [
      {
        "name": "weekStart",
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
    "description": "Called with the first day of the requested week, at local midnight"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  },
  {
    "prop": "week",
    "event": "onWeekChange",
    "syntax": "week={week} onWeekChange={handler}"
  }
]
```

## API

```json
{
  "native:WeekStripProps": {
    "source": "native/src/components/WeekStrip/WeekStrip.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
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
        "name": "week",
        "type": "Date",
        "required": false,
        "description": "Displayed week (controlled; any day of the week; pair with onWeekChange)"
      },
      {
        "name": "defaultWeek",
        "type": "Date",
        "required": false,
        "default": "the week of the selected day, else of today",
        "description": "Initially displayed week (uncontrolled; any day of the week). While the week is uncontrolled it follows the selected day."
      },
      {
        "name": "onWeekChange",
        "type": "(weekStart: Date) => void",
        "required": false,
        "description": "Called with the first day of the requested week, at local midnight"
      },
      {
        "name": "firstDayOfWeek",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday"
      },
      {
        "name": "today",
        "type": "string",
        "required": false,
        "default": "the current local day",
        "description": "The day marked as today, \"YYYY-MM-DD\""
      },
      {
        "name": "markers",
        "type": "Readonly<Record<string, WeekStripMarker>>",
        "required": false,
        "description": "Per-day markers keyed by \"YYYY-MM-DD\": a number shows a count badge (99+ above 99), true shows a dot"
      },
      {
        "name": "getDayLabel",
        "type": "(day: string, marker: WeekStripMarker | undefined) => string",
        "required": false,
        "description": "Accessible label of a day; receives the day (\"YYYY-MM-DD\") and its marker"
      },
      {
        "name": "showNavigation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows previous / next week buttons around the month of the week"
      },
      {
        "name": "previousWeekLabel",
        "type": "string",
        "required": false,
        "default": "the \"weekStrip.previousWeek\" message",
        "description": "Label of the previous-week button"
      },
      {
        "name": "nextWeekLabel",
        "type": "string",
        "required": false,
        "default": "the \"weekStrip.nextWeek\" message",
        "description": "Label of the next-week button"
      },
      {
        "name": "weekdayLabels",
        "type": "readonly string[]",
        "required": false,
        "description": "Weekday names, Monday first (7 labels), whatever firstDayOfWeek is"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "description": "Locale of the accessible dates and of the month title"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks selection and navigation"
      },
      {
        "name": "size",
        "type": "WeekStripSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Cell density"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the strip"
      }
    ]
  }
}
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

## Example: 基础用法

受控的选中日期（"YYYY-MM-DD"）。今天带有描边并标注 aria-current="date"；日期条是水平 listbox，可用方向键、Home / End 和 PageUp / PageDown 操作。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/week-strip/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { WeekStrip } from "minerva-design/native";

const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const today = key(new Date());

export default function Basic() {
  const [value, setValue] = useState(today);
  return (
    <View style={{ gap: 12 }}>
      <WeekStrip
        showNavigation
        value={value}
        onChange={setValue}
        markers={{ [today]: 3 }}
      />
      <Text>Selected: {value}</Text>
    </View>
  );
}

```
