# KeyValueEditor

Edits an ordered list of string pairs with multi-line keys and values, add and remove actions; rows are tracked by a stable id.

Package: minerva-design@1.21.0

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## KeyValueEditor

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "array",
    "typeText": "KeyValueEntry[] | undefined",
    "typeRef": "type:2c38ab2ddee0241179fe",
    "required": false
  },
  {
    "name": "defaultEntries",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "array",
    "typeText": "KeyValueEntry[] | undefined",
    "typeRef": "type:2c38ab2ddee0241179fe",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "keyLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "valueLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "addLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "removeLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "errors",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "object",
    "typeText": "Record<string, KeyValueEntryErrors> | undefined",
    "typeRef": "type:23caf58ea9cb6b434981",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((entries: KeyValueEntry[]) => void) | undefined",
    "typeRef": "type:94f8e572ea5ff6148895",
    "parameters": [
      {
        "name": "entries",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyValueEntry[]",
        "typeRef": "type:59d1544970e6a8f2a83f"
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

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "native:KeyValueEditorProps": {
    "source": "native/src/components/Editors/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"onChange\">"
    ],
    "props": [
      {
        "name": "entries",
        "type": "KeyValueEntry[]",
        "required": false
      },
      {
        "name": "defaultEntries",
        "type": "KeyValueEntry[]",
        "required": false
      },
      {
        "name": "onChange",
        "type": "(entries: KeyValueEntry[]) => void",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "keyLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "valueLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "addLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "removeLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "errors",
        "type": "Record<string, KeyValueEntryErrors>",
        "required": false
      }
    ]
  }
}
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

## Example: Basic usage

Controlled entries with custom labels; newlines and duplicate keys are preserved.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/native/basic.tsx

```tsx
import { KeyValueEditor } from "minerva-design/native";
export default function Basic() {
  return (
    <KeyValueEditor
      defaultEntries={[{ id: "theme", key: "theme", value: "dark" }]}
    />
  );
}

```
