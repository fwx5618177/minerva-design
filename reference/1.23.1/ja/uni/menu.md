# Menu メニュー

ボタン（Menu）または右クリック（ContextMenu）で開くアクションメニュー：アイコン、ショートカット、区切り線、グループ、チェックボックス項目、ラジオグループ、サブメニュー、タイプアヘッド、完全なキーボード操作（Enter、Space、ArrowDown で最初の項目、ArrowUp で最後の項目にフォーカスして開く。矢印キーは循環し無効な項目をスキップ、Home / End、Tab で閉じる、Escape でトリガーにフォーカスを戻す）に対応します。リストから値を選ぶには Select を使います。

Package: minerva-design@1.23.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## ContextMenu

Support: beta

Pointer, Shift+F10/Menu-key and cancelable 700ms touch opening; size/loop/dir/labels, disabled preserves native menu, measured flip/shift, original menu items, focus return and keyboard Tab containment. Native fixed positioning replaces DOM portals. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "MenuEntry[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "closeOnSelect",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | undefined",
    "required": false
  },
  {
    "name": "loop",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "modal",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "dir",
    "typeText": "\"ltr\" | \"rtl\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "select",
    "typeText": "[item: MenuEntry]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "MenuEntry",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## Menu

Support: beta

Nested/group/separator/checkbox/radio items and original callbacks, controlled open, measured collision-aware popup, scoped keyboard navigation/typeahead, RTL submenu open and return focus, trigger restoration. Native hosts do not expose DOM modal inert or React element cloning. Hover opens submenus and preserves a pointer grace period before closing. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "MenuEntry[] | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "open",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "closeOnSelect",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | undefined",
    "required": false
  },
  {
    "name": "side",
    "typeText": "\"bottom\" | \"top\" | \"left\" | \"right\" | undefined",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"end\" | \"center\" | undefined",
    "required": false
  },
  {
    "name": "loop",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "dir",
    "typeText": "\"ltr\" | \"rtl\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[key: string]",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "select",
    "typeText": "[item: MenuEntry]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "MenuEntry",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:open",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "[key: string, checked: boolean]",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      },
      {
        "name": "checked",
        "position": 1,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "valueChange",
    "typeText": "[key: string, value: string]",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      },
      {
        "name": "value",
        "position": 1,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "trigger",
    "typeText": "{ open: boolean; disabled: boolean; }"
  },
  {
    "name": "item",
    "typeText": "{ item: MenuEntry; checked: boolean | undefined; }"
  },
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "update:open",
    "syntax": "v-model:open"
  }
]
```

## MenuCheckboxItem

Support: n/a

Data API rather than a standalone component. Menu.items entries with type: "checkbox", checked/defaultChecked and disabled; uni emits checkedChange and WeApp emits checkedchange (or configure({ onCheckedChange })).

## MenuGroup

Support: n/a

Data API rather than a standalone component. Menu.items entries with type: "group", label and nested items.

## MenuItem

Support: n/a

Data API rather than a standalone component. Menu.items: { key, label, disabled, shortcut, children }; children opens a submenu and the parent emits select/change.

## MenuLabel

Support: n/a

Data API rather than a standalone component. A noninteractive heading in Menu.items: { type: "group", key, label, items: [] }; it is rendered as text, not a selectable action.

## MenuRadioItem

Support: n/a

Data API rather than a standalone component. Menu.items entries with type: "radio-group" and items: [{ value, label, disabled }]; the group owns value/defaultValue; uni emits valueChange and WeApp emits valuechange (or configure({ onValueChange })).

## MenuSeparator

Support: n/a

Data API rather than a standalone component. Menu.items entries with type: "separator" render a noninteractive separator.

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
