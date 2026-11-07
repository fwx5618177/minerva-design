# Select セレクト

完全なキーボード操作・グループ・フォーム連携に対応した単一選択ドロップダウン。

Package: minerva-design@1.22.2

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### 動作とアクセシビリティ

トリガーは combobox ロールを持つボタンです（aria-haspopup="listbox"）。クリック、Enter、Space、↓ / ↑、Home、End でリストを開き、選択中の候補（なければ最初の有効な候補）にフォーカスします。矢印キーは端で折り返さず、無効な候補を飛ばします。Home / End と Page Up / Page Down でジャンプできます。Enter または Space で選択して閉じ、フォーカスはトリガーに戻ります。Escape は選択せずに閉じ、Tab は閉じて次のフィールドへ進みます。

閉じたトリガー上で文字を入力すると、ネイティブの select と同様に選択が直接変わります。開いているときはハイライトが移動します。内容がプレーンテキストでない候補には textValue を指定してください。

リストはトリガーの下に配置され、幅はトリガー以上です。下に十分な余白がないときは上に反転し、候補がビューポートに収まらないときはスクロールします。ライブラリの他のオーバーレイと同じ popper 配置で、タッチ端末や小さな画面でも予測しやすく、トリガーを隠しません。選択中の候補をトリガーに重ねて揃える配置（"item-aligned"）は macOS 特有の慣習のため、意図的に採用していません。

非表示のネイティブ select が name・required・disabled を持ちます。値は FormData に含まれ、required はネイティブの制約検証に参加し、フォームのリセットで defaultValue に戻ります。値が undefined または空文字列のときはプレースホルダーを表示します。

リストは最も近い ConfigProvider のテーマコンテナへポータルされます。Modal や Drawer の中では、Escape はリストだけを閉じます。

## Select

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "value",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Selected value (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected value (uncontrolled)"
  },
  {
    "name": "open",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the popup is open (controlled; pair with onOpenChange)"
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Whether the popup is initially open (uncontrolled)"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown in the trigger while nothing is selected"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "SelectSize | undefined",
    "typeRef": "type:c866404a77e3de6bf902",
    "default": "medium",
    "required": false,
    "description": "Size of the trigger"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state (also set by an invalid enclosing FormControl)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the select. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the select as required (inherited from an enclosing FormControl)"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the hidden native select, used in forms"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id of the trigger (defaults to the enclosing FormControl's id)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the trigger, required when there is no visible label"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) labelling the trigger (also names the listbox)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra ids of elements describing the trigger (aria-describedby)"
  },
  {
    "name": "contentClassName",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Additional class name of the popup"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:4012ac2d38c9fd9f0713",
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
    "description": "Called with the value of the newly selected item"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:721f5831e84a52ad8ecc",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the popup opens or closes"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "SelectGroup"
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

## SelectItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Value of the option (must not be an empty string)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Prevents selecting the option"
  },
  {
    "name": "textValue",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text used for typeahead when the content is not plain text"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "SelectSeparator"
  ],
  "kind": "named"
}
```

## API

```json
{
  "SelectProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of the Select component (a single-choice dropdown: select-only combobox trigger + listbox popup anchored below it, with full keyboard support and a hidden native select for forms). `id`, `className`, `style`, `aria-*` and `data-*` attributes go to the trigger <button>.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected value (controlled; pair with onChange)"
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
        "description": "Called with the value of the newly selected item"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Whether the popup is open (controlled; pair with onOpenChange)"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Whether the popup is initially open (uncontrolled)"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the popup opens or closes"
      },
      {
        "name": "placeholder",
        "type": "React.ReactNode",
        "required": false,
        "description": "Text shown in the trigger while nothing is selected"
      },
      {
        "name": "size",
        "type": "SelectSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of the trigger"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the error state (also set by an invalid enclosing FormControl)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the select. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the select as required (inherited from an enclosing FormControl)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the hidden native select, used in forms"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "id of the trigger (defaults to the enclosing FormControl's id)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the trigger, required when there is no visible label"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) labelling the trigger (also names the listbox)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra ids of elements describing the trigger (aria-describedby)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the trigger"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the trigger"
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false,
        "description": "Additional class name of the popup"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "SelectItem / SelectGroup / SelectLabel / SelectSeparator elements"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLButtonElement>",
        "required": false,
        "description": "Ref to the trigger <button>"
      }
    ]
  },
  "SelectItemProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of an option of a Select",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value of the option (must not be an empty string)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Prevents selecting the option"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false,
        "description": "Text used for typeahead when the content is not plain text"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Content of the option"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the option element"
      }
    ]
  },
  "SelectGroupProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of a group of Select options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "SelectLabel and SelectItem elements"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the group element"
      }
    ]
  },
  "SelectLabelProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of the label of a SelectGroup",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label content"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the label element"
      }
    ]
  },
  "SelectSeparatorProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of a separator between Select options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the separator element"
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

### apps/docs/src/docs/pages/select/demos/basic.tsx

```tsx
import { useState } from "react";
import { Select, SelectItem } from "minerva-design";

export default function BasicDemo() {
  const [language, setLanguage] = useState("en");

  return (
    <div style={{ width: 240 }}>
      <Select aria-label="Language" value={language} onChange={setLanguage}>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">Chinese</SelectItem>
        <SelectItem value="fr">French</SelectItem>
      </Select>
    </div>
  );
}

```

## Example: グループ

SelectGroup・SelectLabel・SelectSeparator で候補を整理し、無効な候補は選択できません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/select/demos/groups.tsx

```tsx
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "minerva-design";

export default function GroupsDemo() {
  return (
    <div style={{ width: 240 }}>
      <Select aria-label="Fruit" placeholder="Pick a fruit">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Out of season</SelectLabel>
          <SelectItem value="cherry" disabled>
            Cherry
          </SelectItem>
        </SelectGroup>
      </Select>
    </div>
  );
}

```

## Example: サイズ・状態・FormControl

3 つのサイズと無効・無効化状態。FormControl 内ではトリガーがラベル・説明・必須状態を受け取ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/select/demos/sizes-and-states.tsx

```tsx
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  SelectItem,
} from "minerva-design";

const items = (
  <>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </>
);

export default function SizesAndStatesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: 260 }}>
      <Select aria-label="Small" size="small" placeholder="Small">
        {items}
      </Select>
      <Select aria-label="Large" size="large" placeholder="Large">
        {items}
      </Select>
      <Select aria-label="Invalid" invalid placeholder="Invalid">
        {items}
      </Select>
      <Select aria-label="Disabled" disabled placeholder="Disabled">
        {items}
      </Select>
      <FormControl required>
        <FormLabel>Genre</FormLabel>
        <Select placeholder="Pick a genre" name="genre">
          {items}
        </Select>
        <FormHelperText>Shown on the book page</FormHelperText>
      </FormControl>
    </div>
  );
}

```
