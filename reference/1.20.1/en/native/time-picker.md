# TimePicker

Picks a time of day from hour, minute and second columns, or by typing it.

Package: minerva-design@1.20.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down on the input opens the panel; clicking outside closes it.

Each column (Hours, Minutes, Seconds, AM/PM) is a listbox: Arrow Up / Arrow Down, Home and End move within it, Arrow Left / Arrow Right switch columns.

Enter or Space picks the focused option.

Escape closes the panel and returns focus to the input. Tab past the last column closes it and moves on to the next field; Shift+Tab before the first column closes it and returns to the input.

Typed text is committed only once it is a complete, valid time. On blur a more lenient parse is applied; empty text clears the value and unparsable text restores the previous one.

## TimePicker

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "TimePicker"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | null | undefined",
    "typeRef": "type:4b2ab921fe33ea9fd1a2",
    "required": false
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false
  },
  {
    "name": "format",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "HH:mm:ss",
    "required": false
  },
  {
    "name": "use12Hours",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "clearable",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "showSecond",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "hourStep",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false
  },
  {
    "name": "minuteStep",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false
  },
  {
    "name": "secondStep",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false
  },
  {
    "name": "minTime",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false
  },
  {
    "name": "maxTime",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "object",
    "typeText": "Date | undefined",
    "typeRef": "type:007ea92938c0789e072e",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "function",
    "typeText": "((date: Date | undefined) => void) | undefined",
    "typeRef": "type:b1ce96b0681b6b0a7162",
    "parameters": [
      {
        "name": "date",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Date | undefined",
        "typeRef": "type:007ea92938c0789e072e"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/TimePicker/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:6d012db6d3c560a434e6",
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
    "required": false
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
  "native:TimePickerProps": {
    "source": "native/src/components/TimePicker/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "Date | null",
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "Date",
        "required": false
      },
      {
        "name": "onChange",
        "type": "(date: Date | undefined) => void",
        "required": false
      },
      {
        "name": "format",
        "type": "string",
        "required": false,
        "default": "\"HH:mm:ss\""
      },
      {
        "name": "use12Hours",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "showSecond",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "hourStep",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "minuteStep",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "secondStep",
        "type": "number",
        "required": false,
        "default": "1"
      },
      {
        "name": "minTime",
        "type": "Date",
        "required": false
      },
      {
        "name": "maxTime",
        "type": "Date",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:TimePicker": {
    "kind": "cssVars",
    "source": "react/src/components/TimePicker",
    "vars": [
      {
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Click the input (or press Arrow Down) to open the panel. onChange receives a Date, or undefined when cleared. Without label, the input is named "Time".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/time-picker/native/basic.tsx

```tsx
import { TimePicker } from "minerva-design/native";
export default function Basic() {
  return (
    <TimePicker
      label="Appointment"
      defaultValue={new Date(2026, 0, 1, 13, 30)}
      use12Hours
      minuteStep={15}
      clearable
    />
  );
}

```
