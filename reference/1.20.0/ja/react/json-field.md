# JsonField JSON フィールド

整形ボタンとアクセシブルな構文フィードバックを持つ厳密な JSON テキストエリア。整形は数値・エスケープ・キー順を保持します。

Package: minerva-design@1.20.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## JsonField

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "value",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "JSON text (controlled); omit for an uncontrolled field"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false,
    "description": "Initial text of an uncontrolled field"
  },
  {
    "name": "hideToolbar",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the format button; syntax feedback stays visible and associated"
  },
  {
    "name": "indent",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Spaces per indentation level when formatting (0 to 10; 0 compacts the JSON)"
  },
  {
    "name": "formatLabel",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the format button"
  },
  {
    "name": "validLabel",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Status text for valid JSON"
  },
  {
    "name": "invalidLabel",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Status text prefix for invalid JSON (followed by the parser error)"
  },
  {
    "name": "rows",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 8,
    "required": false,
    "description": "Rows of the textarea"
  },
  {
    "name": "defaultChecked",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "autoFocus",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Identifies the element (or elements) that describes the object."
  },
  {
    "name": "aria-label",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Defines a string value that labels the current element."
  },
  {
    "name": "form",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "name",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Textarea/types.ts",
    "kind": "enum",
    "values": [
      "filled",
      "outline",
      "unstyled"
    ],
    "typeText": "TextareaVariant | undefined",
    "typeRef": "type:c9aa22b2e03155ba2cc8",
    "default": "outline",
    "required": false,
    "description": "Visual style"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Textarea/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "TextareaSize | undefined",
    "typeRef": "type:c75a6aba5dce730111b0",
    "default": "medium",
    "required": false,
    "description": "Font size and minimum height"
  },
  {
    "name": "autoComplete",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "maxLength",
    "inherited": true,
    "source": "react",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "minLength",
    "inherited": true,
    "source": "react",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "placeholder",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "readOnly",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "required",
    "inherited": true,
    "source": "react",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/Textarea/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state (also set by an invalid FormControl); sets aria-invalid"
  },
  {
    "name": "wrap",
    "inherited": true,
    "source": "react",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "cols",
    "inherited": true,
    "source": "react",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/JsonField/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:993ea178bcb714b0fcd6",
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
    "description": "Called with the new text on every edit and after formatting"
  },
  {
    "name": "onFocus",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "FocusEventHandler<HTMLTextAreaElement> | undefined",
    "typeRef": "type:92385719391805df2234",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLTextAreaElement, Element>",
        "typeRef": "type:4aa81160c83a7cd0b49a"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onBlur",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "FocusEventHandler<HTMLTextAreaElement> | undefined",
    "typeRef": "type:92385719391805df2234",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLTextAreaElement, Element>",
        "typeRef": "type:4aa81160c83a7cd0b49a"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onInput",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "InputEventHandler<HTMLTextAreaElement> | undefined",
    "typeRef": "type:0985627e043be1bb5c1c",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "InputEvent<HTMLTextAreaElement>",
        "typeRef": "type:84808a69da016e8c8b8f"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onKeyDown",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "KeyboardEventHandler<HTMLTextAreaElement> | undefined",
    "typeRef": "type:73d8f98218b1febea8a2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent<HTMLTextAreaElement>",
        "typeRef": "type:5d0a9015745659189953"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onKeyUp",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "KeyboardEventHandler<HTMLTextAreaElement> | undefined",
    "typeRef": "type:73d8f98218b1febea8a2",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent<HTMLTextAreaElement>",
        "typeRef": "type:5d0a9015745659189953"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onClick",
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "MouseEventHandler<HTMLTextAreaElement> | undefined",
    "typeRef": "type:b5e69e37c56bebe7b731",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLTextAreaElement, MouseEvent>",
        "typeRef": "type:61fd815a49ede4b9a289"
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
  "JsonFieldProps": {
    "source": "react/src/components/JsonField/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<TextareaProps, \"value\" | \"defaultValue\" | \"onChange\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "JSON text (controlled); omit for an uncontrolled field"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Initial text of an uncontrolled field"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the new text on every edit and after formatting"
      },
      {
        "name": "hideToolbar",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Hides the format button; syntax feedback stays visible and associated"
      },
      {
        "name": "indent",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Spaces per indentation level when formatting (0 to 10; 0 compacts the JSON)"
      },
      {
        "name": "formatLabel",
        "type": "string",
        "required": false,
        "default": "\"Format JSON\" (localized)",
        "description": "Accessible label of the format button"
      },
      {
        "name": "validLabel",
        "type": "string",
        "required": false,
        "default": "\"Valid JSON\" (localized)",
        "description": "Status text for valid JSON"
      },
      {
        "name": "invalidLabel",
        "type": "string",
        "required": false,
        "default": "\"Invalid JSON\" (localized)",
        "description": "Status text prefix for invalid JSON (followed by the parser error)"
      },
      {
        "name": "rows",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Rows of the textarea"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class name of the outer wrapper"
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

## Example: 基本

入力中は構文フィードバックを控え、フォーカス喪失時に確認します。ボタンは有効な JSON を再インデントします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/demos/basic.tsx

```tsx
import { JsonField } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [text, setText] = useState('{"title":"Draft","tags":["a","b"]}');
  return (
    <JsonField
      aria-label="Response body"
      value={text}
      onChange={setText}
      rows={6}
    />
  );
}

```

## Example: FormField と併用

無効化・読み取り専用・必須の状態はフィールドから継承されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/demos/form-control.tsx

```tsx
import { FormField, JsonField } from "minerva-design";

export default function FormControlDemo() {
  return (
    <FormField
      label="Dictionary"
      helperText="Public translation dictionary."
      required
    >
      <JsonField name="dictionary" defaultValue='{"hello":"world"}' rows={5} />
    </FormField>
  );
}

```

## Example: インデントとツールバー

indent は 1 段あたりの空白数（0 で圧縮）、hideToolbar はボタンを除きフィードバックを残します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/json-field/demos/indent.tsx

```tsx
import { JsonField } from "minerva-design";

export default function IndentDemo() {
  return (
    <>
      <JsonField
        aria-label="Four spaces"
        defaultValue='{"a":[1,2]}'
        indent={4}
        rows={4}
      />
      <JsonField
        aria-label="Compact"
        defaultValue={'{\n  "a": [1, 2]\n}'}
        indent={0}
        rows={4}
      />
      <JsonField
        aria-label="Without toolbar"
        defaultValue="{"
        hideToolbar
        rows={2}
      />
    </>
  );
}

```
