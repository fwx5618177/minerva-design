# KeyValueEditor キー・値エディター

複数行のキーと値を持つ文字列ペアの順序付きリストを編集し、追加・削除ができます。行は安定した id で追跡されます。

Package: minerva-design@1.23.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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
