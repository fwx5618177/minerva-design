# MonthCalendar

Grille mensuelle commençant le lundi, avec le nombre d’événements par jour, la navigation au clavier et les événements du jour choisi.

Package: minerva-design@1.19.3

Renderer: native

Locale: fr

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

As Calendar

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Calendar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "type",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "enum",
    "values": [
      "multiple",
      "range",
      "single"
    ],
    "typeText": "CalendarType | undefined",
    "typeRef": "type:72a8b94de4b1db189b4d",
    "default": "single",
    "required": false,
    "description": "Selection type: one day, several days, or a range"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "union",
    "typeText": "CalendarValue | undefined",
    "typeRef": "type:457fc4f94d68d7e03f94",
    "required": false,
    "description": "Selected day(s) (controlled; pair with `onChange`): a `Date` (`single`), `Date[]` (`multiple`) or `[start, end]` (`range`)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "union",
    "typeText": "CalendarValue | undefined",
    "typeRef": "type:457fc4f94d68d7e03f94",
    "default": null,
    "required": false,
    "description": "Initially selected day(s) (uncontrolled)"
  },
  {
    "name": "month",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Displayed month (controlled; any day of the month; pair with `onMonthChange`)"
  },
  {
    "name": "defaultMonth",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Initially displayed month (uncontrolled)"
  },
  {
    "name": "minDate",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Earliest selectable day (earlier days are disabled)"
  },
  {
    "name": "maxDate",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false,
    "description": "Latest selectable day (later days are disabled)"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of calendar month and accessible date names."
  },
  {
    "name": "disabledDate",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "function",
    "typeText": "((date: Date) => boolean) | undefined",
    "typeRef": "type:69b3b60a8eda1fc53d82",
    "parameters": [
      {
        "name": "date",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Date",
        "typeRef": "type:db6c47a950e394a72434"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false,
    "description": "Extra disabled days"
  },
  {
    "name": "firstDayOfWeek",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "First column of the week (0: Sunday ... 6: Saturday)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false,
    "description": "Cell density: compact (\"small\"), default (\"medium\") or comfortable (\"large\")"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks navigation and selection"
  },
  {
    "name": "previousMonthLabel",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the previous-month button"
  },
  {
    "name": "nextMonthLabel",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the next-month button"
  },
  {
    "name": "poppable",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the calendar in a bottom sheet with a title and a confirm button (`open` / `defaultOpen` / `onOpenChange`)"
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state of the poppable sheet"
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state of the poppable sheet while uncontrolled"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title of the poppable sheet"
  },
  {
    "name": "confirmText",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text of the confirm button"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "function",
    "typeText": "((value: CalendarValue) => void) | undefined",
    "typeRef": "type:5ee49c842ec71067c83c",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CalendarValue",
        "typeRef": "type:4857927e679310bb9765"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new selection (a range once both ends are picked)"
  },
  {
    "name": "onSelect",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "function",
    "typeText": "((date: Date) => void) | undefined",
    "typeRef": "type:5178320f90eef57098be",
    "parameters": [
      {
        "name": "date",
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
    "description": "Called with every pressed day"
  },
  {
    "name": "onMonthChange",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "function",
    "typeText": "((month: Date) => void) | undefined",
    "typeRef": "type:0513399924e17cd52a6e",
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
    "description": "Called with the first day of the month navigated to"
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "function",
    "typeText": "((open: boolean, reason?: OverlayCloseReason | undefined) => void) | undefined",
    "typeRef": "type:685b119f8fe0117ff585",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "reason",
        "position": 1,
        "required": false,
        "rest": false,
        "typeText": "OverlayCloseReason | undefined",
        "typeRef": "type:dee0306bddc4ca67a449"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested open state of the sheet and the close reason"
  },
  {
    "name": "onConfirm",
    "source": "packages/native/src/components/Calendar/Calendar.tsx",
    "kind": "function",
    "typeText": "((value: CalendarValue) => void) | undefined",
    "typeRef": "type:84f76e92ba7139ee778a",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CalendarValue",
        "typeRef": "type:4857927e679310bb9765"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called by the confirm button of the poppable sheet with the selection"
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
    "prop": "month",
    "event": "onMonthChange",
    "syntax": "month={month} onMonthChange={handler}"
  },
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## API

```json
{
  "native:CalendarProps": {
    "source": "native/src/components/Calendar/Calendar.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "type",
        "type": "CalendarType",
        "required": false,
        "default": "\"single\"",
        "description": "Selection type: one day, several days, or a range"
      },
      {
        "name": "value",
        "type": "CalendarValue",
        "required": false,
        "description": "Selected day(s) (controlled; pair with `onChange`): a `Date` (`single`), `Date[]` (`multiple`) or `[start, end]` (`range`)"
      },
      {
        "name": "defaultValue",
        "type": "CalendarValue",
        "required": false,
        "default": "null",
        "description": "Initially selected day(s) (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: CalendarValue) => void",
        "required": false,
        "description": "Called with the new selection (a range once both ends are picked)"
      },
      {
        "name": "onSelect",
        "type": "(date: Date) => void",
        "required": false,
        "description": "Called with every pressed day"
      },
      {
        "name": "month",
        "type": "Date",
        "required": false,
        "description": "Displayed month (controlled; any day of the month; pair with `onMonthChange`)"
      },
      {
        "name": "defaultMonth",
        "type": "Date",
        "required": false,
        "default": "the month of the first selected day, else of today",
        "description": "Initially displayed month (uncontrolled)"
      },
      {
        "name": "onMonthChange",
        "type": "(month: Date) => void",
        "required": false,
        "description": "Called with the first day of the month navigated to"
      },
      {
        "name": "minDate",
        "type": "Date",
        "required": false,
        "description": "Earliest selectable day (earlier days are disabled)"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "required": false,
        "description": "Latest selectable day (later days are disabled)"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "description": "Locale of calendar month and accessible date names."
      },
      {
        "name": "disabledDate",
        "type": "(date: Date) => boolean",
        "required": false,
        "description": "Extra disabled days"
      },
      {
        "name": "firstDayOfWeek",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "First column of the week (0: Sunday ... 6: Saturday)"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Cell density: compact (\"small\"), default (\"medium\") or comfortable (\"large\")"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks navigation and selection"
      },
      {
        "name": "previousMonthLabel",
        "type": "string",
        "required": false,
        "default": "the \"monthCalendar.previousMonth\" message",
        "description": "Label of the previous-month button"
      },
      {
        "name": "nextMonthLabel",
        "type": "string",
        "required": false,
        "default": "the \"monthCalendar.nextMonth\" message",
        "description": "Label of the next-month button"
      },
      {
        "name": "poppable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders the calendar in a bottom sheet with a title and a confirm button (`open` / `defaultOpen` / `onOpenChange`)"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state of the poppable sheet"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state of the poppable sheet while uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean, reason?: CalendarCloseReason) => void",
        "required": false,
        "description": "Called with the requested open state of the sheet and the close reason"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "default": "the \"calendar.title\" message",
        "description": "Title of the poppable sheet"
      },
      {
        "name": "confirmText",
        "type": "ReactNode",
        "required": false,
        "default": "the \"calendar.confirm\" message",
        "description": "Text of the confirm button"
      },
      {
        "name": "onConfirm",
        "type": "(value: CalendarValue) => void",
        "required": false,
        "description": "Called by the confirm button of the poppable sheet with the selection"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the calendar"
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

## Example: Utilisation de base

Choisissez un jour pour lister ses événements ; flèches, Début / Fin et Page préc. / suiv. (avec Maj : un an) déplacent le focus. Chaque jour est une cellule de grille focalisable marquée aria-selected : la sélection n’est annoncée qu’une fois.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/month-calendar/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { MonthCalendar, Button } from "minerva-design/native";
export default function Basic() {
  const [open, setOpen] = useState(false);
  const [value, setValue] =
    useState<import("minerva-design/native").CalendarValue>(null);
  return (
    <View>
      <Button onPress={() => setOpen(true)}>Choose date</Button>
      <Text>
        {value instanceof Date
          ? value.toLocaleDateString()
          : "No date selected"}
      </Text>
      <MonthCalendar
        poppable
        open={open}
        onOpenChange={setOpen}
        value={value}
        onChange={setValue}
      />
    </View>
  );
}

```
