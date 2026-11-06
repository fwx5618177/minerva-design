# Textarea 多行输入

多行文本输入，与 Input 共享尺寸和变体；禁用手动拖拽调整大小，请使用 rows。

Package: minerva-design@1.22.0

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Textarea

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Textarea"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "rows",
    "source": "packages/native/src/components/Textarea/Textarea.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 3,
    "required": false,
    "description": "Visible text rows (the height of the field)"
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
  "native:TextareaProps": {
    "source": "native/src/components/Textarea/Textarea.tsx",
    "kind": "interface",
    "extends": [
      "Omit<TextInputProps, | \"style\" | \"value\" | \"defaultValue\" | \"onChange\" | \"editable\" | \"readOnly\" | \"multiline\" | \"numberOfLines\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Text of the field (controlled)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Initial text (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the new text on every edit"
      },
      {
        "name": "variant",
        "type": "TextareaVariant",
        "required": false,
        "default": "\"outline\"",
        "description": "Visual style: `outline` (bordered), `filled` (tinted background) or `unstyled` (no frame)"
      },
      {
        "name": "size",
        "type": "TextareaSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Font size and minimum height"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Error state: danger border (`aria-invalid` on the web)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the field"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Focusable and selectable, but the text cannot be edited"
      },
      {
        "name": "rows",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Visible text rows (the height of the field)"
      },
      {
        "name": "autoSize",
        "type": "boolean | TextareaAutoSize",
        "required": false,
        "default": "false",
        "description": "Grows with the text: `true` (from `rows`, unbounded) or row bounds"
      },
      {
        "name": "showCharCount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the number of characters (and `maxLength`, when set) under the text"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Visible label above the field; a string label is also the field's accessible name (unless `accessibilityLabel` is set)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view (label + frame)"
      },
      {
        "name": "wrapperStyle",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the frame around the text"
      },
      {
        "name": "inputStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the TextInput"
      },
      {
        "name": "ref",
        "type": "Ref<TextInput>",
        "required": false,
        "description": "Ref of the TextInput"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Textarea": {
    "kind": "cssVars",
    "source": "react/src/components/Textarea",
    "vars": [
      {
        "name": "--textarea-min-height",
        "description": "Minimum height (every size)"
      },
      {
        "name": "--textarea-padding-y",
        "description": "Vertical padding of the text"
      },
      {
        "name": "--textarea-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--textarea-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--textarea-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--textarea-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--textarea-border-color",
        "description": "Border color at rest"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

受控的多行输入；原生属性直接透传。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/native/basic.tsx

```tsx
import { Textarea } from "minerva-design/native";
export default function Basic() {
  return (
    <Textarea
      label="Notes"
      placeholder="Add a note"
      maxLength={200}
      showCharCount
    />
  );
}

```
