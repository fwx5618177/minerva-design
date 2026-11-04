# Menu メニュー

ボタン（Menu）または右クリック（ContextMenu）で開くアクションメニュー：アイコン、ショートカット、区切り線、グループ、チェックボックス項目、ラジオグループ、サブメニュー、タイプアヘッド、完全なキーボード操作（Enter、Space、ArrowDown で最初の項目、ArrowUp で最後の項目にフォーカスして開く。矢印キーは循環し無効な項目をスキップ、Home / End、Tab で閉じる、Escape でトリガーにフォーカスを戻す）に対応します。リストから値を選ぶには Select を使います。

Package: minerva-design@1.20.5

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## ContextMenu

Support: beta

Long-press native context anchor with measured viewport clamping; full Menu nested/action/checkbox/radio-group/group/separator schema and configure callbacks. Native long press replaces browser right-click and keyboard context-menu event; no DOM focus trap. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/context-menu/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "array",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "closeOnSelect",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "open",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "triggered",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "modal",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "dir",
    "typeText": "string",
    "required": false,
    "default": "ltr"
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": "Context menu"
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
  },
  {
    "name": "select",
    "typeText": "{ value: string; item: unknown }",
    "description": "Original activated action item."
  },
  {
    "name": "checkedchange",
    "typeText": "{ key: string; checked: boolean; item: unknown }",
    "description": "Checkbox item state request."
  },
  {
    "name": "valuechange",
    "typeText": "{ key: string; value: string; item: unknown }",
    "description": "Radio group state request."
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## Menu

Support: beta

Nested action expansion; groups/separators; controlled/default checkbox and radio-group ownership; original item select payload; disabled/danger/icon/shortcut rows; optional trigger slot and controlled/default open; configure callbacks. Use triggered=true with the trigger slot for a popup, or the default inline native menu panel. Pointer-hover submenus, DOM portals and focus traps are not native mini interactions. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/menu/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "items",
    "typeText": "array",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "open",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "triggered",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "closeOnSelect",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
  },
  {
    "name": "select",
    "typeText": "{ value: string; item: unknown }",
    "description": "Original activated action item."
  },
  {
    "name": "checkedchange",
    "typeText": "{ key: string; checked: boolean; item: unknown }",
    "description": "Checkbox item state request."
  },
  {
    "name": "valuechange",
    "typeText": "{ key: string; value: string; item: unknown }",
    "description": "Radio group state request."
  }
]
```

### slots

```json
[
  {
    "name": "trigger"
  },
  {
    "name": "default"
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
