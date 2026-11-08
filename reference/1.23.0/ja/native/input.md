# Input 入力

サイズ・バリアント・前後の装飾・クリアボタン・文字数カウント・パスワード表示切り替えを備えた一行テキスト入力。ラベル・ヘルプテキスト・エラーメッセージが必要なら FormField で囲みます。

Package: minerva-design@1.23.0

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Input

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Input"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the field (controlled)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false,
    "description": "Initial text (uncontrolled)"
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
    "name": "clearLabel",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the clear button"
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
    "name": "label",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible label above the field; a string label is also the field's accessible name (unless `accessibilityLabel` is set)"
  },
  {
    "name": "wrapperStyle",
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the frame around the text"
  },
  {
    "name": "inputStyle",
    "source": "packages/native/src/components/Input/Input.tsx",
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
    "source": "packages/native/src/components/Input/Input.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:2dd86a3922a1e1859af1",
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
    "description": "Called with the new text on every edit and when the field is cleared"
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
  "native:InputProps": {
    "source": "native/src/components/Input/Input.tsx",
    "kind": "interface",
    "extends": [
      "Omit<TextInputProps, | \"style\" | \"value\" | \"defaultValue\" | \"onChange\" | \"editable\" | \"readOnly\" | \"secureTextEntry\" | \"multiline\">"
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
        "description": "Called with the new text on every edit and when the field is cleared"
      },
      {
        "name": "variant",
        "type": "InputVariant",
        "required": false,
        "default": "\"outline\"",
        "description": "Visual style: `outline` (bordered), `filled` (tinted background) or `unstyled` (no frame)"
      },
      {
        "name": "size",
        "type": "InputSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Height (`--control-height-*`) and font size"
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
        "name": "prefix",
        "type": "ReactNode",
        "required": false,
        "description": "Content before the text, e.g. an icon or \"@\""
      },
      {
        "name": "suffix",
        "type": "ReactNode",
        "required": false,
        "description": "Content after the text, e.g. a unit or a button"
      },
      {
        "name": "clearable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a clear button while the field has a value (not when disabled or read-only). Clearing calls `onChange(\"\")` and `onClear`"
      },
      {
        "name": "clearLabel",
        "type": "string",
        "required": false,
        "default": "i18n \"input.clear\"",
        "description": "Accessible label of the clear button"
      },
      {
        "name": "onClear",
        "type": "() => void",
        "required": false,
        "description": "Called after the clear button emptied the field"
      },
      {
        "name": "type",
        "type": "InputType",
        "required": false,
        "default": "\"text\"",
        "description": "`password` hides the text and shows a visibility toggle"
      },
      {
        "name": "showPasswordLabel",
        "type": "string",
        "required": false,
        "default": "i18n \"input.showPassword\"",
        "description": "Label of the visibility toggle while hidden"
      },
      {
        "name": "hidePasswordLabel",
        "type": "string",
        "required": false,
        "default": "i18n \"input.hidePassword\"",
        "description": "Label of the visibility toggle while visible"
      },
      {
        "name": "showCharCount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the number of characters (and `maxLength`, when set) after the text"
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
        "description": "Ref of the TextInput (focus(), blur(), clear())"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

ネイティブ属性とイベントはそのまま渡され、className はラッパー、ref は <input> に適用されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/input/native/basic.tsx

```tsx
import { View } from "react-native";
import { Input } from "minerva-design/native";
import { useState } from "react";

export default function BasicDemo() {
  const [value, setValue] = useState("");
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Name" placeholder="Uncontrolled" />
      <Input
        accessibilityLabel="Controlled"
        placeholder="Controlled"
        value={value}
        onChange={setValue}
      />
    </View>
  );
}

```

## Example: クリアボタンと文字数

clearable は値があるときにラベル付きのクリアボタンを表示します。クリアすると空の値で onChange が呼ばれ、フォーカスは入力欄に残ります。showCharCount は文字数（と maxLength）を表示し、入力欄に関連付けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/input/native/clearable-and-count.tsx

```tsx
import { View } from "react-native";
import { Input } from "minerva-design/native";

export default function ClearableAndCountDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Search" placeholder="Search" clearable />
      <Input
        accessibilityLabel="Short bio"
        defaultValue="Frontend developer"
        clearable
        showCharCount
        maxLength={40}
      />
    </View>
  );
}

```

## Example: サイズとバリアント

3 つのサイズと outline・filled・unstyled バリアント。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/input/native/sizes-variants.tsx

```tsx
import { View } from "react-native";
import { Input } from "minerva-design/native";

export default function SizesVariantsDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Small" size="small" placeholder="small" />
      <Input accessibilityLabel="Medium" placeholder="medium (outline)" />
      <Input accessibilityLabel="Large" size="large" placeholder="large" />
      <Input
        accessibilityLabel="Filled"
        variant="filled"
        placeholder="filled"
      />
      <Input
        accessibilityLabel="Unstyled"
        variant="unstyled"
        placeholder="unstyled"
      />
    </View>
  );
}

```

## Example: 状態

invalid・disabled・readOnly。FormField 内では状態を継承します。 読み取り専用フィールドには --readonly-surface-color を使用し、通常の文字コントラストとフォーカス、選択、コピーを維持します。編集用の操作は非表示になり、エラーの境界線は維持されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/input/native/states.tsx

```tsx
import { View } from "react-native";
import { FormField, Input } from "minerva-design/native";

export default function StatesDemo() {
  return (
    <View style={{ gap: 12 }}>
      <Input accessibilityLabel="Invalid" invalid defaultValue="Invalid" />
      <Input accessibilityLabel="Disabled" disabled defaultValue="Disabled" />
      <Input accessibilityLabel="Read-only" readOnly defaultValue="Read-only" />
      <FormField label="Inside a FormField" errorMessage="Inherits the error">
        <Input />
      </FormField>
    </View>
  );
}

```
