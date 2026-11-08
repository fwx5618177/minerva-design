# Menu メニュー

ボタン（Menu）または右クリック（ContextMenu）で開くアクションメニュー：アイコン、ショートカット、区切り線、グループ、チェックボックス項目、ラジオグループ、サブメニュー、タイプアヘッド、完全なキーボード操作（Enter、Space、ArrowDown で最初の項目、ArrowUp で最後の項目にフォーカスして開く。矢印キーは循環し無効な項目をスキップ、Home / End、Tab で閉じる、Escape でトリガーにフォーカスを戻す）に対応します。リストから値を選ぶには Select を使います。

Package: minerva-design@1.23.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## ContextMenu

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ContextMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "array",
    "typeText": "MenuEntry[]",
    "typeRef": "type:70ad1aeb0ed71bd0c9b2",
    "required": true
  },
  {
    "name": "closeOnSelect",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Menu/index.tsx",
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
    "name": "onSelect",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "function",
    "typeText": "((item: MenuAction) => void) | undefined",
    "typeRef": "type:3bb22ef2a9ad5e5f3e79",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MenuAction",
        "typeRef": "type:cd5c7e33ef334ee8ab13"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:f798768a2a0d056af0f0",
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
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## Menu

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Menu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "array",
    "typeText": "MenuEntry[]",
    "typeRef": "type:70ad1aeb0ed71bd0c9b2",
    "required": true
  },
  {
    "name": "closeOnSelect",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Menu/index.tsx",
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
    "name": "onSelect",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "function",
    "typeText": "((item: MenuAction) => void) | undefined",
    "typeRef": "type:3bb22ef2a9ad5e5f3e79",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MenuAction",
        "typeRef": "type:cd5c7e33ef334ee8ab13"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Menu/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:f798768a2a0d056af0f0",
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
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## MenuCheckboxItem

Support: n/a

No standalone native element: MenuCheckboxEntry (type: checkbox) renders an accessible checkbox with checked/defaultChecked, onCheckedChange and closeOnSelect behavior.

## MenuGroup

Support: n/a

No standalone native element: MenuGroupEntry (type: group) supplies a heading label and recursively rendered items.

## MenuItem

Support: n/a

No standalone native element: Menu and ContextMenu items accept MenuAction entries with label, disabled, children and onSelect behavior.

## MenuLabel

Support: n/a

No standalone native element: the label of MenuGroupEntry or MenuRadioGroupEntry renders an accessible native heading.

## MenuRadioItem

Support: n/a

No standalone native element: MenuRadioGroupEntry (type: radio-group) supplies items with value, label and disabled; the group owns value/defaultValue and onValueChange.

## MenuSeparator

Support: n/a

No standalone native element: MenuSeparatorEntry (type: separator) renders the native Divider between menu entries.

## API

```json
{
  "native:MenuProps": {
    "source": "native/src/components/Menu/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactElement<ButtonProps>",
        "required": true
      },
      {
        "name": "items",
        "type": "MenuEntry[]",
        "required": true
      },
      {
        "name": "onSelect",
        "type": "(item: MenuAction) => void",
        "required": false
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false
      }
    ]
  },
  "native:ContextMenuProps": {
    "source": "native/src/components/Menu/index.tsx",
    "kind": "alias",
    "type": "MenuProps"
  }
}
```

## CSS variables

```json
{
  "css:Menu": {
    "kind": "cssVars",
    "source": "react/src/components/Menu",
    "vars": [
      {
        "name": "--menu-min-width",
        "description": "Minimum width of the menu panel"
      },
      {
        "name": "--menu-max-width",
        "description": "Maximum width of the menu panel"
      },
      {
        "name": "--menu-max-height",
        "description": "Maximum height of the menu panel (scrolls beyond)"
      },
      {
        "name": "--menu-padding",
        "description": "Inner padding of the menu panel"
      },
      {
        "name": "--menu-radius",
        "description": "Corner radius of the menu panel (defaults to --radius-lg)"
      },
      {
        "name": "--menu-shadow",
        "description": "Shadow of the menu panel (defaults to --shadow-md)"
      },
      {
        "name": "--menu-item-height",
        "description": "Minimum height of an item (every size; defaults to the density's control height)"
      },
      {
        "name": "--menu-z-index",
        "description": "Stacking order of the menu panel (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

アイコンとショートカットのヒント付きの項目。onSelect は元の項目オブジェクトを受け取り、その後メニューが閉じてフォーカスがトリガーに戻ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/menu/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import {
  Menu,
  ContextMenu,
  Button,
  type MenuEntry,
} from "minerva-design/native";
export default function Basic() {
  const [selected, setSelected] = useState("");
  const items: MenuEntry[] = [
    { key: "save", label: "Save" },
    {
      key: "more",
      label: "More",
      children: [{ key: "archive", label: "Archive" }],
    },
    { type: "separator", key: "separator" },
    {
      type: "group",
      key: "view",
      label: "View",
      items: [
        {
          type: "checkbox",
          key: "grid",
          label: "Show grid",
          defaultChecked: true,
        },
        {
          type: "radio-group",
          key: "density",
          label: "Density",
          defaultValue: "comfortable",
          items: [
            { value: "compact", label: "Compact" },
            { value: "comfortable", label: "Comfortable" },
          ],
        },
      ],
    },
  ];
  return (
    <View style={{ gap: 12 }}>
      <Menu items={items} onSelect={(item) => setSelected(item.key)}>
        <Button>Actions</Button>
      </Menu>
      <ContextMenu items={items} onSelect={(item) => setSelected(item.key)}>
        <Button variant="outline">Long press</Button>
      </ContextMenu>
      <Text>{selected}</Text>
    </View>
  );
}

```
