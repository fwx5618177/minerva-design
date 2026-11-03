# Textarea テキストエリア

Input とサイズ・バリアントを共有する複数行入力。手動リサイズは無効で、rows で指定します。

Package: minerva-design@1.19.3

Renderer: react

Locale: ja

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

## Textarea

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "defaultValue",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "string | number | readonly string[] | undefined",
    "typeRef": "type:9d6f4fff8ef3f096d001",
    "required": false
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
    "name": "value",
    "inherited": true,
    "source": "react",
    "kind": "union",
    "typeText": "string | number | readonly string[] | undefined",
    "typeRef": "type:9d6f4fff8ef3f096d001",
    "required": false
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
  },
  {
    "name": "rows",
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
    "inherited": true,
    "source": "react",
    "kind": "function",
    "typeText": "ChangeEventHandler<HTMLTextAreaElement, HTMLTextAreaElement> | undefined",
    "typeRef": "type:8df9d46a7fda7e88f63f",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>",
        "typeRef": "type:cc04c320430a9931d41a"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
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
  "TextareaProps": {
    "source": "react/src/components/Textarea/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, \"size\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "TextareaVariant",
        "required": false,
        "default": "\"outline\"",
        "description": "Visual style"
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
        "description": "Error state (also set by an invalid FormControl); sets aria-invalid"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLTextAreaElement>",
        "required": false,
        "description": "Ref to the <textarea> element"
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

## Example: 基本

制御されたテキストエリア。ネイティブ属性はそのまま渡されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/demos/basic.tsx

```tsx
import { Textarea } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [bio, setBio] = useState("");
  return (
    <Textarea
      aria-label="Bio"
      rows={4}
      placeholder="Tell us about yourself"
      value={bio}
      onChange={(event) => setBio(event.target.value)}
    />
  );
}

```

## Example: FormField と併用

ラベル・ヘルプ・エラー・必須状態はフィールドから来ます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/demos/form-control.tsx

```tsx
import { FormField, Textarea } from "minerva-design";

export default function FormControlDemo() {
  return (
    <>
      <FormField label="Summary" helperText="At most 200 characters." required>
        <Textarea rows={3} maxLength={200} />
      </FormField>
      <FormField label="Notes" errorMessage="Notes are too long.">
        <Textarea rows={3} defaultValue="Lorem ipsum…" />
      </FormField>
    </>
  );
}

```

## Example: サイズとバリアント

サイズはフォントサイズと最小の高さを変えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/textarea/demos/sizes-variants.tsx

```tsx
import { Textarea } from "minerva-design";

export default function SizesVariantsDemo() {
  return (
    <>
      <Textarea aria-label="Small" size="small" placeholder="small" />
      <Textarea aria-label="Large" size="large" placeholder="large" />
      <Textarea aria-label="Filled" variant="filled" placeholder="filled" />
      <Textarea
        aria-label="Unstyled"
        variant="unstyled"
        placeholder="unstyled"
      />
    </>
  );
}

```
