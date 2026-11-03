# TagInput

Saisie libre d’étiquettes avec suggestions : Entrée, le bouton d’ajout ou la perte du focus ajoutent la saisie, les flèches choisissent une suggestion et la composition IME ne valide jamais.

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

## TagInput

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "TagInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false
  },
  {
    "name": "options",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false
  },
  {
    "name": "commitOnBlur",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "separators",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false
  },
  {
    "name": "emptyText",
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
    "name": "clearLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the clear button"
  },
  {
    "name": "removeLabel",
    "source": "packages/native/src/components/Editors/index.tsx",
    "kind": "function",
    "typeText": "((tag: string) => string) | undefined",
    "typeRef": "type:861eb9402186a1b11317",
    "parameters": [
      {
        "name": "tag",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the field"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Input/Input.tsx",
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
    "description": "Height (`--control-height-*`) and font size"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Focusable and selectable, but the text cannot be edited"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state: danger border (`aria-invalid` on the web)"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible label above the field; a string label is also the field's accessible name (unless `accessibilityLabel` is set)"
  },
  {
    "name": "inputStyle",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the TextInput"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Input/Input.tsx",
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
    "name": "prefix",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content before the text, e.g. an icon or \"@\""
  },
  {
    "name": "suffix",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content after the text, e.g. a unit or a button"
  },
  {
    "name": "clearable",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a clear button while the field has a value (not when disabled or read-only). Clearing calls `onChange(\"\")` and `onClear`"
  },
  {
    "name": "type",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "enum",
    "values": [
      "password",
      "text"
    ],
    "typeText": "InputType | undefined",
    "typeRef": "type:7d2a2d4b2a26bde5e83c",
    "default": "text",
    "required": false,
    "description": "`password` hides the text and shows a visibility toggle"
  },
  {
    "name": "showPasswordLabel",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the visibility toggle while hidden"
  },
  {
    "name": "hidePasswordLabel",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the visibility toggle while visible"
  },
  {
    "name": "showCharCount",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the number of characters (and `maxLength`, when set) after the text"
  },
  {
    "name": "wrapperStyle",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the frame around the text"
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
    "typeText": "((value: string[]) => void) | undefined",
    "typeRef": "type:d04c53dce0de80395e40",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:876798c326dba0ca62bf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onClear",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:a23c10430194766639b6",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after the clear button emptied the field"
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
  "native:TagInputProps": {
    "source": "native/src/components/Editors/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<InputProps, \"value\" | \"defaultValue\" | \"onChange\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "readonly string[]",
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "readonly string[]",
        "required": false
      },
      {
        "name": "onChange",
        "type": "(value: string[]) => void",
        "required": false
      },
      {
        "name": "options",
        "type": "readonly string[]",
        "required": false
      },
      {
        "name": "commitOnBlur",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "separators",
        "type": "readonly string[]",
        "required": false
      },
      {
        "name": "emptyText",
        "type": "string",
        "required": false
      },
      {
        "name": "addLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "clearLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "removeLabel",
        "type": "(tag: string) => string",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:TagInput": {
    "kind": "cssVars",
    "source": "react/src/components/TagInput",
    "vars": [
      {
        "name": "--tag-input-gap",
        "description": "Space between the tags and between the tags and the entry row"
      },
      {
        "name": "--tag-input-tag-min-height",
        "description": "Minimum height of a tag (defaults to the density's small control height)"
      },
      {
        "name": "--tag-input-list-max-height",
        "description": "Maximum height of the suggestion list before it scrolls"
      },
      {
        "name": "--tag-input-list-radius",
        "description": "Corner radius of the suggestion list (defaults to --radius-md)"
      },
      {
        "name": "--tag-input-option-padding-y",
        "description": "Vertical padding of a suggestion (follows the density's row padding)"
      },
      {
        "name": "--tag-input-option-padding-x",
        "description": "Horizontal padding of a suggestion (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Les étiquettes choisies sont masquées des suggestions ; Échap abandonne la saisie.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/native/basic.tsx

```tsx
import { TagInput } from "minerva-design/native";
export default function Basic() {
  return (
    <TagInput
      accessibilityLabel="Project tags"
      defaultValue={["design"]}
      options={["native", "web", "design"]}
    />
  );
}

```
