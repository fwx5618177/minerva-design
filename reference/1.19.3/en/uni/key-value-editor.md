# KeyValueEditor

Edits an ordered list of string pairs with multi-line keys and values, add and remove actions; rows are tracked by a stable id.

Package: minerva-design@1.19.3

Renderer: uni

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

## KeyValueEditor

Support: beta

entries/defaultEntries and stable id-based edits/removal/errors; duplicate keys allowed and validation remains consumer-owned; multiline whitespace-preserving textareas, labels, unique addition ids, controlled rejection including native field rollback, model updates and inherited locking. Legacy value arrays remain accepted. Browser DOM refs and focus-to-remove-button behavior have no native equivalent; newly added rows focus their key textarea. Native textarea geometry and keyboard require device validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "KeyValueEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "entries",
    "typeText": "Entry[] | undefined",
    "required": false
  },
  {
    "name": "defaultEntries",
    "typeText": "Entry[] | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "LegacyEntry[] | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "LegacyEntry[] | undefined",
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
    "name": "keyLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "valueLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "addLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "removeLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "errors",
    "typeText": "Record<string, { key?: string | undefined; value?: string | undefined; }> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[entries: Entry[]]",
    "parameters": [
      {
        "name": "entries",
        "position": 0,
        "typeText": "Entry[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[entries: Entry[]]",
    "parameters": [
      {
        "name": "entries",
        "position": 0,
        "typeText": "Entry[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:entries",
    "typeText": "[entries: Entry[]]",
    "parameters": [
      {
        "name": "entries",
        "position": 0,
        "typeText": "Entry[]",
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
    "prop": "entries",
    "event": "update:entries",
    "syntax": "v-model:entries"
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
  "css:KeyValueEditor": {
    "kind": "cssVars",
    "source": "react/src/components/KeyValueEditor",
    "vars": [
      {
        "name": "--key-value-editor-gap",
        "description": "Space between the rows and the add button"
      },
      {
        "name": "--key-value-editor-column-gap",
        "description": "Space between the key, the value and the remove button of a row"
      },
      {
        "name": "--key-value-editor-control-height",
        "description": "Size of the remove button and minimum height of the key field and of the add button (defaults to the density's small control height)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
