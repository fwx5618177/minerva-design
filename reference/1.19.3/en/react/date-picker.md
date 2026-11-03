# DatePicker

Picks a calendar date from a popup Monday-first month grid, or by typing a YYYY-MM-DD date.

Package: minerva-design@1.19.3

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down on the input opens the popup calendar and moves focus to the active day cell; clicking outside closes it.

Arrow keys, Home / End and PageUp / PageDown (with Shift: a year) move focus across the calendar grid.

Enter or Space picks the focused day and closes the popup.

Escape closes the popup and returns focus to the input.

Typed text is committed immediately when it forms a complete YYYY-MM-DD date within range; on blur, flexible formats like YYYY/M/D are normalized.

## DatePicker

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DatePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | null | undefined",
    "typeRef": "type:5d93807f845ffb9259f1",
    "required": false,
    "description": "Selected date as `\"YYYY-MM-DD\"` (controlled; pair with `onChange`). `\"\"` or `null` means \"no date\" while staying controlled; `undefined` makes the picker uncontrolled."
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected date as `\"YYYY-MM-DD\"` (uncontrolled)"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the input"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label of the input; without it the input is labelled \"Date\" (localized)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the input when no visible label is shown"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the input; defaults to the id of an enclosing FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as required; defaults to the enclosing FormControl's state"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "date-picker",
    "required": false,
    "description": "Name of the input"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the picker; defaults to the enclosing FormControl's state"
  },
  {
    "name": "clearable",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Allows clearing the value with the suffix button"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/DatePicker/types.ts",
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
    "description": "Size of the input"
  },
  {
    "name": "minDate",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Earliest selectable date (`\"YYYY-MM-DD\"`); earlier days are disabled"
  },
  {
    "name": "maxDate",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Latest selectable date (`\"YYYY-MM-DD\"`); later days are disabled"
  },
  {
    "name": "locale",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the month heading (`Intl.DateTimeFormat`)"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:9ae0989a2dc6d4ff1d09",
    "parameters": [
      {
        "name": "value",
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
    "description": "Called with the selected date (`\"YYYY-MM-DD\"`), or `\"\"` when the value is cleared"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/DatePicker/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:f1732a1ac5226db324f6",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the popup calendar opens or closes"
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
  }
]
```

## API

```json
{
  "DatePickerProps": {
    "source": "react/src/components/DatePicker/types.ts",
    "description": "Props of DatePicker; `data-*` attributes are forwarded to the root element",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the <input> element"
      },
      {
        "name": "value",
        "type": "string | null",
        "required": false,
        "description": "Selected date as `\"YYYY-MM-DD\"` (controlled; pair with `onChange`). `\"\"` or `null` means \"no date\" while staying controlled; `undefined` makes the picker uncontrolled."
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected date as `\"YYYY-MM-DD\"` (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the selected date (`\"YYYY-MM-DD\"`), or `\"\"` when the value is cleared"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Select date\" (localized)",
        "description": "Placeholder of the input"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Visible label of the input; without it the input is labelled \"Date\" (localized)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the input when no visible label is shown"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) labelling the input; inside a FormControl it defaults to the FormLabel (unless `label` / `aria-label` is set)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the input; defaults to the id of an enclosing FormControl"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as required; defaults to the enclosing FormControl's state"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "description": "Shows the value without allowing changes (typing, panel, clearing); defaults to the enclosing FormControl's state"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"date-picker\"",
        "description": "Name of the input"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the popup calendar opens or closes"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the picker; defaults to the enclosing FormControl's state"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Allows clearing the value with the suffix button"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of the input"
      },
      {
        "name": "minDate",
        "type": "string",
        "required": false,
        "description": "Earliest selectable date (`\"YYYY-MM-DD\"`); earlier days are disabled"
      },
      {
        "name": "maxDate",
        "type": "string",
        "required": false,
        "description": "Latest selectable date (`\"YYYY-MM-DD\"`); later days are disabled"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the library language",
        "description": "Locale of the month heading (`Intl.DateTimeFormat`)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:DatePicker": {
    "kind": "cssVars",
    "source": "react/src/components/DatePicker",
    "vars": [
      {
        "name": "--date-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--date-picker-panel-width",
        "description": "Width of the popup calendar panel"
      },
      {
        "name": "--date-picker-panel-radius",
        "description": "Corner radius of the popup panel (defaults to --radius-lg)"
      },
      {
        "name": "--date-picker-panel-padding",
        "description": "Inner padding of the popup panel"
      },
      {
        "name": "--date-picker-cell-size",
        "description": "Width and height of a day cell in the popup grid"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Click the input (or press Arrow Down) to open the popup calendar. onChange receives a "YYYY-MM-DD" string, or "" when cleared. Without label, the input is named "Date".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/basic.tsx

```tsx
import { useState } from "react";
import { DatePicker } from "minerva-design";

export default function BasicDemo() {
  const [date, setDate] = useState("");

  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker onChange={setDate} />
      <p>Selected: {date || "none"}</p>
    </div>
  );
}

```

## Example: Controlled

Pass value and update it in onChange. "" or null keeps the picker controlled but empty, while undefined makes it uncontrolled.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Button, DatePicker } from "minerva-design";

export default function ControlledDemo() {
  const [date, setDate] = useState<string | null>("2026-04-17");

  return (
    <div
      style={{ display: "grid", gap: 12, justifyItems: "start", maxWidth: 280 }}
    >
      <DatePicker
        label="Target date"
        value={date}
        onChange={(next) => setDate(next || null)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button size="small" onClick={() => setDate("2026-05-01")}>
          Set to 2026-05-01
        </Button>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setDate(null)}
        >
          Reset
        </Button>
      </div>
      <p>Value: {date ?? "null"}</p>
    </div>
  );
}

```

## Example: Default value and clearing

defaultValue sets the initial date. The clear button is labelled "Clear date"; set clearable={false} to hide it.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/default-value.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function DefaultValueDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" />
      <DatePicker defaultValue="2026-04-17" clearable={false} />
    </div>
  );
}

```

## Example: Disabled and read-only

A disabled or read-only picker cannot be opened or edited.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/disabled.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker defaultValue="2026-04-17" disabled />
      <DatePicker defaultValue="2026-04-17" readOnly />
    </div>
  );
}

```

## Example: With FormField

Inside FormControl / FormField, DatePicker inherits the id, label, helper / error text, required, disabled, readOnly and invalid states.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/form-control.tsx

```tsx
import { DatePicker, FormField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
      <FormField label="Start date" helperText="Format: YYYY-MM-DD" required>
        <DatePicker />
      </FormField>
      <FormField
        label="Deadline"
        errorMessage="Please choose a date in the future."
      >
        <DatePicker defaultValue="2026-01-01" />
      </FormField>
    </div>
  );
}

```

## Example: Date range

minDate and maxDate ("YYYY-MM-DD") disable dates outside the allowed range.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/min-max.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function MinMaxDemo() {
  return (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue="2026-04-15"
        minDate="2026-04-10"
        maxDate="2026-04-20"
        placeholder="2026-04-10 – 2026-04-20"
      />
    </div>
  );
}

```

## Example: Sizes

Three sizes: small, medium (default) and large.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/date-picker/demos/sizes.tsx

```tsx
import { DatePicker } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 280 }}>
      <DatePicker size="small" placeholder="Small" />
      <DatePicker size="medium" placeholder="Medium" />
      <DatePicker size="large" placeholder="Large" />
    </div>
  );
}

```
