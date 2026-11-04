# TimePicker

Picks a time of day from hour, minute and second columns, or by typing it.

Package: minerva-design@1.20.5

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Arrow Down on the input opens the panel; clicking outside closes it.

Each column (Hours, Minutes, Seconds, AM/PM) is a listbox: Arrow Up / Arrow Down, Home and End move within it, Arrow Left / Arrow Right switch columns.

Enter or Space picks the focused option.

Escape closes the panel and returns focus to the input. Tab past the last column closes it and moves on to the next field; Shift+Tab before the first column closes it and returns to the input.

Typed text is committed only once it is a complete, valid time. On blur a more lenient parse is applied; empty text clears the value and unparsable text restores the previous one.

## TimePicker

Support: beta

Typed HH:mm or HH:mm:ss, hour/minute/second steps, normalized constraints, locale labels, clear, keyboard time columns, original string change and open-change notifications; measured collision-aware popup. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string | Date | null | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | Date | null | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | Date | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "use12Hours",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showSecond",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "hourStep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "minuteStep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "secondStep",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "minTime",
    "typeText": "Date | undefined",
    "required": false
  },
  {
    "name": "maxTime",
    "typeText": "Date | undefined",
    "required": false
  },
  {
    "name": "start",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "end",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "clearable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabelledby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaDescribedby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: Date | undefined]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "Date | undefined",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: Date | undefined]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "Date | undefined",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
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
  }
]
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
