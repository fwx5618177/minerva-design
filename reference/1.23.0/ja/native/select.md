# Select セレクト

完全なキーボード操作・グループ・フォーム連携に対応した単一選択ドロップダウン。

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

### 動作とアクセシビリティ

トリガーは combobox ロールを持つボタンです（aria-haspopup="listbox"）。クリック、Enter、Space、↓ / ↑、Home、End でリストを開き、選択中の候補（なければ最初の有効な候補）にフォーカスします。矢印キーは端で折り返さず、無効な候補を飛ばします。Home / End と Page Up / Page Down でジャンプできます。Enter または Space で選択して閉じ、フォーカスはトリガーに戻ります。Escape は選択せずに閉じ、Tab は閉じて次のフィールドへ進みます。

閉じたトリガー上で文字を入力すると、ネイティブの select と同様に選択が直接変わります。開いているときはハイライトが移動します。内容がプレーンテキストでない候補には textValue を指定してください。

リストはトリガーの下に配置され、幅はトリガー以上です。下に十分な余白がないときは上に反転し、候補がビューポートに収まらないときはスクロールします。ライブラリの他のオーバーレイと同じ popper 配置で、タッチ端末や小さな画面でも予測しやすく、トリガーを隠しません。選択中の候補をトリガーに重ねて揃える配置（"item-aligned"）は macOS 特有の慣習のため、意図的に採用していません。

非表示のネイティブ select が name・required・disabled を持ちます。値は FormData に含まれ、required はネイティブの制約検証に参加し、フォームのリセットで defaultValue に戻ります。値が undefined または空文字列のときはプレースホルダーを表示します。

リストは最も近い ConfigProvider のテーマコンテナへポータルされます。Modal や Drawer の中では、Escape はリストだけを閉じます。

## Select

Support: beta

Options open in a bottom sheet (single or multiple)

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Select"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "multiple",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Several values (checkboxes and a confirm button)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:cdf445ffccc04acaf8cd",
    "required": false,
    "description": "Selected value (controlled; pair with `onChange`) Selected values (controlled; pair with `onChange`)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:cdf445ffccc04acaf8cd",
    "required": false,
    "description": "Initially selected value (uncontrolled) Initially selected values (uncontrolled)"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "options",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "array",
    "typeText": "SelectOption[] | undefined",
    "typeRef": "type:e271e6e04b0fbf392840",
    "required": false,
    "description": "The options"
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state of the options sheet"
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown in the trigger while nothing is selected"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Select/Select.tsx",
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
    "description": "Size of the trigger"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the select"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label above the trigger; also its accessible name and the sheet title"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title of the options sheet"
  },
  {
    "name": "searchable",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a search field filtering the options by label"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the trigger when there is no `label`"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | ((value: string[]) => void) | undefined",
    "typeRef": "type:68aa65800c73636ebe44",
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
    "description": "Called with the picked value (the sheet then closes) Called with the confirmed values"
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "function",
    "typeText": "((open: boolean, reason?: OverlayCloseReason | undefined) => void) | undefined",
    "typeRef": "type:4865fc0abe338cf883c6",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "reason",
        "position": 1,
        "required": false,
        "rest": false,
        "typeText": "OverlayCloseReason | undefined",
        "typeRef": "type:dee0306bddc4ca67a449"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested open state (and, when closing, the reason: \"action\" after a pick, \"confirm\", \"cancel\", \"mask\", \"back\")"
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
  },
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## SelectGroup

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
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

## SelectItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "textValue",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
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

## SelectLabel

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectLabel"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## SelectSeparator

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectSeparator"
  ],
  "kind": "named"
}
```

## API

```json
{
  "native:SelectSingleProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "interface",
    "extends": [
      "SelectBaseProps"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "false",
        "required": false,
        "default": "false",
        "description": "Several values (checkboxes and a confirm button)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected value (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the picked value (the sheet then closes)"
      }
    ]
  },
  "native:SelectMultipleProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "interface",
    "extends": [
      "SelectBaseProps"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "true",
        "required": true,
        "default": "false",
        "description": "Several values (checkboxes and a confirm button)"
      },
      {
        "name": "value",
        "type": "string[]",
        "required": false,
        "description": "Selected values (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultValue",
        "type": "string[]",
        "required": false,
        "description": "Initially selected values (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string[]) => void",
        "required": false,
        "description": "Called with the confirmed values"
      }
    ]
  },
  "native:SelectOption": {
    "source": "native/src/components/Select/Select.tsx",
    "description": "An option of the list",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "group",
        "type": "string",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Visible text (also the accessible name of the row)"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value reported by `onChange`"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the row"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Secondary text under the label"
      }
    ]
  },
  "native:SelectProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "alias",
    "type": "SelectSingleProps | SelectMultipleProps"
  },
  "native:SelectItemProps": {
    "source": "native/src/components/Select/SelectParts.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "required": false
      }
    ]
  },
  "native:SelectGroupProps": {
    "source": "native/src/components/Select/SelectParts.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Select": {
    "kind": "cssVars",
    "source": "react/src/components/Select",
    "vars": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

最初は English が選択され、Chinese または French を選ぶと制御された値が更新されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/select/native/basic.tsx

```tsx
import { useState } from "react";
import { Select } from "minerva-design/native";
export default function Basic() {
  const [language, setLanguage] = useState("en");
  return (
    <Select
      accessibilityLabel="Language"
      value={language}
      onChange={setLanguage}
      options={[
        { value: "en", label: "English" },
        { value: "zh", label: "Chinese" },
        { value: "fr", label: "French" },
      ]}
    />
  );
}

```
