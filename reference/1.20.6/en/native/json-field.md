# JsonField

Strict-JSON textarea with a format button and accessible syntax feedback; formatting preserves numbers, escapes and key order.

Package: minerva-design@1.20.6

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## JsonField

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "JsonField"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "rows",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 8,
    "required": false,
    "description": "Visible text rows (the height of the field)"
  },
  {
    "name": "hideToolbar",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "indent",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false
  },
  {
    "name": "formatLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "validLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "invalidLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the field (controlled)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false,
    "description": "Initial text (uncontrolled)"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "enum",
    "values": [
      "filled",
      "outline",
      "unstyled"
    ],
    "typeText": "FieldVariant | undefined",
    "typeRef": "type:65f0913f5320331d7c25",
    "default": "outline",
    "required": false,
    "description": "Visual style: `outline` (bordered), `filled` (tinted background) or `unstyled` (no frame)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Font size and minimum height"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state: danger border (`aria-invalid` on the web)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the field"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Focusable and selectable, but the text cannot be edited"
  },
  {
    "name": "autoSize",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "union",
    "typeText": "boolean | TextareaAutoSize | undefined",
    "typeRef": "type:2102a802ba0c13e1f29a",
    "default": false,
    "required": false,
    "description": "Grows with the text: `true` (from `rows`, unbounded) or row bounds"
  },
  {
    "name": "showCharCount",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the number of characters (and `maxLength`, when set) under the text"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible label above the field; a string label is also the field's accessible name (unless `accessibilityLabel` is set)"
  },
  {
    "name": "wrapperStyle",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the frame around the text"
  },
  {
    "name": "inputStyle",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the TextInput"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:a3edd2ec8651a9e57222",
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
    "description": "Called with the new text on every edit"
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
  "native:JsonFieldProps": {
    "source": "native/src/components/Editors/index.tsx",
    "kind": "interface",
    "extends": [
      "TextareaProps"
    ],
    "props": [
      {
        "name": "rows",
        "type": "number",
        "required": false,
        "default": "8"
      },
      {
        "name": "hideToolbar",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "indent",
        "type": "number",
        "required": false,
        "default": "2"
      },
      {
        "name": "formatLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "validLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "invalidLabel",
        "type": "string",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:JsonField": {
    "kind": "cssVars",
    "source": "react/src/components/JsonField",
    "vars": [
      {
        "name": "--json-field-gap",
        "description": "Space between the toolbar, the editor and the status line"
      },
      {
        "name": "--json-field-font-family",
        "description": "Font family of the editor (defaults to the monospace stack)"
      },
      {
        "name": "--json-field-font-size",
        "description": "Font size of the editor"
      },
      {
        "name": "--json-field-tab-size",
        "description": "Rendered width of a tab character in the editor"
      },
      {
        "name": "--json-field-status-font-size",
        "description": "Font size of the validation status line"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Syntax feedback is withheld while typing and checked on blur; the button re-indents valid JSON.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/native/basic.tsx

```tsx
import { JsonField } from "minerva-design/native";
export default function Basic() {
  return (
    <JsonField
      accessibilityLabel="JSON configuration"
      defaultValue={'{"version":9007199254740993,"theme":"dark"}'}
    />
  );
}

```
