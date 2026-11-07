# Menu メニュー

ボタン（Menu）または右クリック（ContextMenu）で開くアクションメニュー：アイコン、ショートカット、区切り線、グループ、チェックボックス項目、ラジオグループ、サブメニュー、タイプアヘッド、完全なキーボード操作（Enter、Space、ArrowDown で最初の項目、ArrowUp で最後の項目にフォーカスして開く。矢印キーは循環し無効な項目をスキップ、Home / End、Tab で閉じる、Escape でトリガーにフォーカスを戻す）に対応します。リストから値を選ぶには Select を使います。

Package: minerva-design@1.22.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## ContextMenu

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/context-menu",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "keepOpen",
    "typeText": "boolean",
    "attribute": "keep-open",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "nonModal",
    "typeText": "boolean",
    "attribute": "non-modal",
    "required": false
  },
  {
    "name": "noLoop",
    "typeText": "boolean",
    "attribute": "no-loop",
    "required": false
  },
  {
    "name": "items",
    "typeText": "MenuEntry[]",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "\"ltr\" | \"rtl\"",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent",
    "description": "The menu opens / asks to close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
  },
  {
    "name": "minerva-select",
    "typeText": "CustomEvent",
    "description": "An action item was chosen (`detail: { value, item }`); cancelable: `preventDefault()` keeps the menu open"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent",
    "description": "A checkbox item was toggled (`detail: { value, checked, item }`) or a radio option chosen (`detail: { value, group, item }`); cancelable"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "The area (and the declarative menu entries, which are not displayed)"
  }
]
```

## Menu

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/menu",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "side",
    "typeText": "\"top\" | \"right\" | \"bottom\" | \"left\"",
    "attribute": "side",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\"",
    "attribute": "align",
    "required": false
  },
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "keepOpen",
    "typeText": "boolean",
    "attribute": "keep-open",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "nonModal",
    "typeText": "boolean",
    "attribute": "non-modal",
    "required": false
  },
  {
    "name": "noLoop",
    "typeText": "boolean",
    "attribute": "no-loop",
    "required": false
  },
  {
    "name": "items",
    "typeText": "MenuEntry[]",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "\"ltr\" | \"rtl\"",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent",
    "description": "The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
  },
  {
    "name": "minerva-select",
    "typeText": "CustomEvent",
    "description": "An action item was chosen (`detail: { value, item }`, `value` = the item key / `value`); cancelable: `preventDefault()` keeps the menu open"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent",
    "description": "A checkbox item was toggled (`detail: { value, checked, item }`) or a radio option chosen (`detail: { value, group, item }`); cancelable: `preventDefault()` keeps the previous state"
  }
]
```

### slots

```json
[
  {
    "name": "trigger",
    "description": "The button opening the menu (gets `aria-haspopup=\"menu\"`, `aria-expanded`, `data-state`)"
  }
]
```

## MenuCheckboxItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/menu-checkbox-item",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "checked",
    "typeText": "boolean",
    "attribute": "checked",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "shortcut",
    "typeText": "string",
    "attribute": "shortcut",
    "required": false
  },
  {
    "name": "textValue",
    "typeText": "string",
    "attribute": "text-value",
    "required": false
  },
  {
    "name": "closeOnSelect",
    "typeText": "boolean",
    "attribute": "close-on-select",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label"
  }
]
```

## MenuGroup

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/menu-group",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "closeOnSelect",
    "typeText": "boolean",
    "attribute": "close-on-select",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Entries of the group"
  }
]
```

## MenuItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/menu-item",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "shortcut",
    "typeText": "string",
    "attribute": "shortcut",
    "required": false
  },
  {
    "name": "textValue",
    "typeText": "string",
    "attribute": "text-value",
    "required": false
  },
  {
    "name": "keepOpen",
    "typeText": "boolean",
    "attribute": "keep-open",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label, and nested menu elements forming a submenu"
  },
  {
    "name": "icon",
    "description": "Icon displayed before the label"
  }
]
```

## MenuLabel

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/menu-label",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label text"
  }
]
```

## MenuRadioItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/menu-radio-item",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "checked",
    "typeText": "boolean",
    "attribute": "checked",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "shortcut",
    "typeText": "string",
    "attribute": "shortcut",
    "required": false
  },
  {
    "name": "textValue",
    "typeText": "string",
    "attribute": "text-value",
    "required": false
  },
  {
    "name": "closeOnSelect",
    "typeText": "boolean",
    "attribute": "close-on-select",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label"
  }
]
```

## MenuSeparator

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/menu-separator",
  "exports": [],
  "kind": "side-effect"
}
```

## API

```json
{
  "wc:minerva-context-menu": {
    "kind": "element",
    "source": "web-components/src/components/menu/context-menu.ts",
    "className": "MinervaContextMenu",
    "summary": "Menu opened at the pointer on right click / long press / Shift+F10.",
    "description": "Context menu (`<ContextMenu>` of React): the menu entries opened at the pointer on right click (long press on touch) in its area (the default slot); Shift+F10 or the ContextMenu key open it at the area. A right click while open moves the menu. Focus moves to the first item and returns to the area (or the element focused in it) on close. Same entries, keyboard, submenus and events as `<minerva-menu>`.",
    "properties": [
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the menu is open"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\"",
        "default": "\"medium\"",
        "description": "Density of the items"
      },
      {
        "name": "keepOpen",
        "attribute": "keep-open",
        "type": "boolean",
        "default": "false",
        "description": "Selecting an action keeps the menu open (React `closeOnSelect={false}`)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the menu"
      },
      {
        "name": "nonModal",
        "attribute": "non-modal",
        "type": "boolean",
        "default": "false",
        "description": "Non-modal menu: the page stays interactive, focus is not trapped, scroll is not locked (React `modal={false}`)"
      },
      {
        "name": "noLoop",
        "attribute": "no-loop",
        "type": "boolean",
        "default": "false",
        "description": "Arrow keys stop at the first / last item instead of wrapping"
      },
      {
        "name": "items",
        "type": "MenuEntry[]",
        "default": "[]",
        "description": "Entries of the menu (alternative to the declarative child elements)"
      },
      {
        "name": "direction",
        "type": "\"ltr\" | \"rtl\"",
        "default": "\"ltr\"",
        "description": "Reading direction captured when the menu opens"
      },
      {
        "name": "isModal",
        "type": "boolean",
        "readonly": true
      },
      {
        "name": "entries",
        "type": "MenuEntry[]",
        "readonly": true,
        "description": "Effective entries: `items` when set, else the child elements"
      }
    ],
    "methods": [
      {
        "name": "rootPlacement",
        "signature": "() => Placement",
        "description": "Placement of the root panel."
      },
      {
        "name": "rootOffset",
        "signature": "() => { mainAxis: number; crossAxis: number }",
        "description": "Offset of the root panel."
      },
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the menu"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the menu (and its submenus)"
      },
      {
        "name": "rootLayerOptions",
        "signature": "() => void"
      },
      {
        "name": "subLayerOptions",
        "signature": "(depth: number) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-open-change",
        "description": "The menu opens / asks to close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-select",
        "description": "An action item was chosen (`detail: { value, item }`); cancelable: `preventDefault()` keeps the menu open"
      },
      {
        "name": "minerva-change",
        "description": "A checkbox item was toggled (`detail: { value, checked, item }`) or a radio option chosen (`detail: { value, group, item }`); cancelable"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "The area (and the declarative menu entries, which are not displayed)"
      }
    ],
    "parts": [
      {
        "name": "content",
        "description": "A menu panel (`role=\"menu\"`: the root menu and its submenus)"
      },
      {
        "name": "item",
        "description": "An item (`role=\"menuitem\"`, `menuitemcheckbox` or `menuitemradio`)"
      },
      {
        "name": "item--highlighted",
        "description": "Item state of `item`: highlighted"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "item--checked",
        "description": "Item state of `item`: checked"
      },
      {
        "name": "item--unchecked",
        "description": "Item state of `item`: unchecked"
      },
      {
        "name": "item--expanded",
        "description": "Item state of `item`: expanded"
      },
      {
        "name": "item-indicator",
        "description": "The check mark / radio dot of a checkbox or radio item"
      },
      {
        "name": "icon",
        "description": "The icon of an item"
      },
      {
        "name": "item-label",
        "description": "The label of an item"
      },
      {
        "name": "shortcut",
        "description": "The keyboard shortcut hint of an item"
      },
      {
        "name": "group",
        "description": "A group of entries (`role=\"group\"`, also radio groups)"
      },
      {
        "name": "label",
        "description": "A group heading or section label"
      },
      {
        "name": "separator",
        "description": "A separator"
      }
    ],
    "cssProperties": []
  },
  "wc:minerva-menu-item": {
    "kind": "element",
    "source": "web-components/src/components/menu/menu-items.ts",
    "className": "MinervaMenuItem",
    "summary": "Menu item (action or submenu trigger).",
    "description": "Declarative menu item of `<minerva-menu>` / `<minerva-context-menu>` (the React library's `MenuAction`). The menu reads it and renders the item in its panel (`role=\"menuitem\"`); nested menu elements make it a submenu trigger. Its text is the label; a `slot=\"icon\"` child is the icon.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Key reported by `minerva-select` (default: the label text)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the item"
      },
      {
        "name": "shortcut",
        "attribute": "shortcut",
        "type": "string",
        "default": "\"\"",
        "description": "Keyboard shortcut hint displayed after the label (display only)"
      },
      {
        "name": "textValue",
        "attribute": "text-value",
        "type": "string",
        "default": "\"\"",
        "description": "Text used for typeahead when the label is not plain text"
      },
      {
        "name": "keepOpen",
        "attribute": "keep-open",
        "type": "boolean",
        "default": "false",
        "description": "Selecting this item keeps the menu open"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label, and nested menu elements forming a submenu"
      },
      {
        "name": "icon",
        "description": "Icon displayed before the label"
      }
    ],
    "parts": [],
    "cssProperties": []
  },
  "wc:minerva-menu-checkbox-item": {
    "kind": "element",
    "source": "web-components/src/components/menu/menu-items.ts",
    "className": "MinervaMenuCheckboxItem",
    "summary": "Toggleable menu item.",
    "description": "Declarative checkbox item (`role=\"menuitemcheckbox\"`, the React library's `MenuCheckboxEntry`). Toggling it updates `checked`.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Key reported by `minerva-change`"
      },
      {
        "name": "checked",
        "attribute": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Whether the item is checked"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the item"
      },
      {
        "name": "shortcut",
        "attribute": "shortcut",
        "type": "string",
        "default": "\"\"",
        "description": "Keyboard shortcut hint (display only)"
      },
      {
        "name": "textValue",
        "attribute": "text-value",
        "type": "string",
        "default": "\"\"",
        "description": "Text used for typeahead when the label is not plain text"
      },
      {
        "name": "closeOnSelect",
        "attribute": "close-on-select",
        "type": "boolean",
        "default": "false",
        "description": "Toggling the item closes the menu"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label"
      }
    ],
    "parts": [],
    "cssProperties": []
  },
  "wc:minerva-menu-radio-item": {
    "kind": "element",
    "source": "web-components/src/components/menu/menu-items.ts",
    "className": "MinervaMenuRadioItem",
    "summary": "Mutually exclusive menu option.",
    "description": "Declarative radio item (`role=\"menuitemradio\"`, the React library's `MenuRadioItem`). Radio items of the same `<minerva-menu-group>` (or consecutive radio items) are mutually exclusive.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Value of the option"
      },
      {
        "name": "checked",
        "attribute": "checked",
        "type": "boolean",
        "default": "false",
        "description": "Whether the option is the selected one of its group"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the option"
      },
      {
        "name": "shortcut",
        "attribute": "shortcut",
        "type": "string",
        "default": "\"\"",
        "description": "Keyboard shortcut hint (display only)"
      },
      {
        "name": "textValue",
        "attribute": "text-value",
        "type": "string",
        "default": "\"\"",
        "description": "Text used for typeahead when the label is not plain text"
      },
      {
        "name": "closeOnSelect",
        "attribute": "close-on-select",
        "type": "boolean",
        "default": "false",
        "description": "Choosing the option closes the menu"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label"
      }
    ],
    "parts": [],
    "cssProperties": []
  },
  "wc:minerva-menu-group": {
    "kind": "element",
    "source": "web-components/src/components/menu/menu-items.ts",
    "className": "MinervaMenuGroup",
    "summary": "Labelled group of menu entries.",
    "description": "Labelled group of menu entries (`role=\"group\"`, the React library's `MenuGroupEntry`); a group of radio items is a radio group (`MenuRadioGroupEntry`).",
    "properties": [
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Label displayed above the group (names the group)"
      },
      {
        "name": "closeOnSelect",
        "attribute": "close-on-select",
        "type": "boolean",
        "default": "false",
        "description": "Radio groups: choosing an option closes the menu"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Entries of the group"
      }
    ],
    "parts": [],
    "cssProperties": []
  },
  "wc:minerva-menu-separator": {
    "kind": "element",
    "source": "web-components/src/components/menu/menu-items.ts",
    "className": "MinervaMenuSeparator",
    "summary": "Menu separator.",
    "description": "Separator between menu entries (`role=\"separator\"`).",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [],
    "parts": [],
    "cssProperties": []
  },
  "wc:minerva-menu-label": {
    "kind": "element",
    "source": "web-components/src/components/menu/menu-items.ts",
    "className": "MinervaMenuLabel",
    "summary": "Menu section label.",
    "description": "Non-interactive section label of a menu.",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label text"
      }
    ],
    "parts": [],
    "cssProperties": []
  },
  "wc:minerva-menu": {
    "kind": "element",
    "source": "web-components/src/components/menu/menu.ts",
    "className": "MinervaMenu",
    "summary": "Dropdown action menu with submenus, checkbox / radio items and typeahead.",
    "description": "Action menu opened from a trigger button (`<Menu>` of React, WAI-ARIA menu button). Entries come from declarative child elements (`<minerva-menu-item>`, `<minerva-menu-checkbox-item>`, `<minerva-menu-radio-item>`, `<minerva-menu-group>`, `<minerva-menu-separator>`, `<minerva-menu-label>`; nesting items makes submenus) or from the `items` property (the React library's `MenuEntry` shape). - Trigger: click, Enter, Space or ArrowDown open the menu and focus the first item (a pointer click focuses the panel); ArrowUp focuses the last. - Inside: arrows (wrapping unless `no-loop`), Home / End, typeahead, Enter / Space activate; Escape closes the topmost (sub)menu only and returns focus; Tab closes the menu and moves on from the trigger. - Submenus open with ArrowRight (ArrowLeft in RTL), Enter, Space or hover (after a short delay) and stay open while the pointer moves towards them (core pointer grace). - Modal (default): outside pointer events disabled, focus trapped, scroll locked, the rest of the page hidden from assistive technologies. The panels live in the shadow root in the top layer (`popover=\"manual\"`), so they inherit the theme of the element's scope. The reading direction comes from the closest `dir` attribute (set `dir=\"rtl\"` on the menu or an ancestor).",
    "properties": [
      {
        "name": "side",
        "attribute": "side",
        "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
        "default": "\"bottom\"",
        "description": "Preferred side; the menu flips when there is not enough room"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\"",
        "default": "\"end\"",
        "description": "Alignment of the menu against the trigger"
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the menu is open"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\"",
        "default": "\"medium\"",
        "description": "Density of the items"
      },
      {
        "name": "keepOpen",
        "attribute": "keep-open",
        "type": "boolean",
        "default": "false",
        "description": "Selecting an action keeps the menu open (React `closeOnSelect={false}`)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the menu"
      },
      {
        "name": "nonModal",
        "attribute": "non-modal",
        "type": "boolean",
        "default": "false",
        "description": "Non-modal menu: the page stays interactive, focus is not trapped, scroll is not locked (React `modal={false}`)"
      },
      {
        "name": "noLoop",
        "attribute": "no-loop",
        "type": "boolean",
        "default": "false",
        "description": "Arrow keys stop at the first / last item instead of wrapping"
      },
      {
        "name": "items",
        "type": "MenuEntry[]",
        "default": "[]",
        "description": "Entries of the menu (alternative to the declarative child elements)"
      },
      {
        "name": "direction",
        "type": "\"ltr\" | \"rtl\"",
        "default": "\"ltr\"",
        "description": "Reading direction captured when the menu opens"
      },
      {
        "name": "isModal",
        "type": "boolean",
        "readonly": true
      },
      {
        "name": "entries",
        "type": "MenuEntry[]",
        "readonly": true,
        "description": "Effective entries: `items` when set, else the child elements"
      }
    ],
    "methods": [
      {
        "name": "rootPlacement",
        "signature": "() => Placement",
        "description": "Placement of the root panel."
      },
      {
        "name": "rootOffset",
        "signature": "() => { mainAxis: number; crossAxis: number }",
        "description": "Offset of the root panel."
      },
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the menu"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the menu (and its submenus)"
      },
      {
        "name": "rootLayerOptions",
        "signature": "() => void"
      },
      {
        "name": "subLayerOptions",
        "signature": "(depth: number) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-open-change",
        "description": "The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-select",
        "description": "An action item was chosen (`detail: { value, item }`, `value` = the item key / `value`); cancelable: `preventDefault()` keeps the menu open"
      },
      {
        "name": "minerva-change",
        "description": "A checkbox item was toggled (`detail: { value, checked, item }`) or a radio option chosen (`detail: { value, group, item }`); cancelable: `preventDefault()` keeps the previous state"
      }
    ],
    "slots": [
      {
        "name": "trigger",
        "description": "The button opening the menu (gets `aria-haspopup=\"menu\"`, `aria-expanded`, `data-state`)"
      }
    ],
    "parts": [
      {
        "name": "content",
        "description": "A menu panel (`role=\"menu\"`: the root menu and its submenus)"
      },
      {
        "name": "item",
        "description": "An item (`role=\"menuitem\"`, `menuitemcheckbox` or `menuitemradio`)"
      },
      {
        "name": "item--highlighted",
        "description": "Item state of `item`: highlighted"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "item--checked",
        "description": "Item state of `item`: checked"
      },
      {
        "name": "item--unchecked",
        "description": "Item state of `item`: unchecked"
      },
      {
        "name": "item--expanded",
        "description": "Item state of `item`: expanded"
      },
      {
        "name": "item-indicator",
        "description": "The check mark / radio dot of a checkbox or radio item"
      },
      {
        "name": "icon",
        "description": "The icon of an item"
      },
      {
        "name": "item-label",
        "description": "The label of an item"
      },
      {
        "name": "shortcut",
        "description": "The keyboard shortcut hint of an item"
      },
      {
        "name": "group",
        "description": "A group of entries (`role=\"group\"`, also radio groups)"
      },
      {
        "name": "label",
        "description": "A group heading or section label"
      },
      {
        "name": "separator",
        "description": "A separator"
      }
    ],
    "cssProperties": []
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

子要素で項目を記述します。icon スロットとショートカット表示付きの項目、入れ子のサブメニュー、区切り線、ラベル付きグループ、無効な項目。minerva-select が選ばれた value を返します。 React の Menu と同様に、パネルはフェードインし、閉じた後は退出アニメーションが終わるまで data-state="closed" で描画されたままになります（prefers-reduced-motion ではアニメーションなし）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/menu/wc/basic.html

```html
<minerva-menu id="file-menu">
  <minerva-button slot="trigger" variant="outline">File</minerva-button>
  <minerva-menu-item value="new" shortcut="Ctrl+N">
    <span slot="icon" aria-hidden="true">＋</span>New file
  </minerva-menu-item>
  <minerva-menu-item value="open" shortcut="Ctrl+O">Open…</minerva-menu-item>
  <minerva-menu-item>
    Share
    <minerva-menu-item value="share-link">Copy link</minerva-menu-item>
    <minerva-menu-item value="share-email">Send by email</minerva-menu-item>
  </minerva-menu-item>
  <minerva-menu-separator></minerva-menu-separator>
  <minerva-menu-group label="Danger zone">
    <minerva-menu-item value="archive">Archive</minerva-menu-item>
    <minerva-menu-item value="delete" disabled>Delete</minerva-menu-item>
  </minerva-menu-group>
</minerva-menu>
<p id="file-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/menu/wc/basic.ts

```tsx
// Child elements describe the entries; nested items form a submenu.
// minerva-select gives the item's `value` (or its text without one).
type Select = CustomEvent<{ value: string }>;

export function setup(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>("#file-menu")!;
  const result = root.querySelector<HTMLElement>("#file-result")!;
  const onSelect = (event: Event) =>
    (result.textContent = `Selected: ${(event as Select).detail.value}`);
  menu.addEventListener("minerva-select", onSelect);
  return () => menu.removeEventListener("minerva-select", onSelect);
}

```

## Example: チェックボックスとラジオ項目

チェックボックス項目は切り替わり、<minerva-menu-group> 内のラジオ項目は排他的です。どちらもメニューを開いたままにし、minerva-change を発火します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/menu/wc/checkbox-radio.html

```html
<minerva-menu id="view-menu" align="start" size="small">
  <minerva-button slot="trigger" variant="outline">View</minerva-button>
  <minerva-menu-label>Panels</minerva-menu-label>
  <minerva-menu-checkbox-item value="sidebar" checked
    >Sidebar</minerva-menu-checkbox-item
  >
  <minerva-menu-checkbox-item value="minimap"
    >Minimap</minerva-menu-checkbox-item
  >
  <minerva-menu-separator></minerva-menu-separator>
  <minerva-menu-group label="Density">
    <minerva-menu-radio-item value="compact">Compact</minerva-menu-radio-item>
    <minerva-menu-radio-item value="comfortable" checked
      >Comfortable</minerva-menu-radio-item
    >
    <minerva-menu-radio-item value="spacious">Spacious</minerva-menu-radio-item>
  </minerva-menu-group>
</minerva-menu>
<p id="view-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/menu/wc/checkbox-radio.ts

```tsx
// Checkbox / radio items stay open by default and fire minerva-change;
// the menu toggles their `checked` attribute.
type Change = CustomEvent<{ value: string; checked?: boolean }>;

export function setup(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>("#view-menu")!;
  const result = root.querySelector<HTMLElement>("#view-result")!;
  const onChange = (event: Event) => {
    const { value, checked } = (event as Change).detail;
    result.textContent =
      checked === undefined
        ? `Density: ${value}`
        : `${value}: ${checked ? "shown" : "hidden"}`;
  };
  menu.addEventListener("minerva-change", onChange);
  return () => menu.removeEventListener("minerva-change", onChange);
}

```

## Example: コンテキストメニュー

<minerva-context-menu> は右クリックや長押しでポインター位置に、Shift+F10 で領域の位置にメニューを開きます。領域はそれ以外の子コンテンツです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/menu/wc/context-menu.html

```html
<minerva-context-menu id="canvas-menu">
  <div
    tabindex="0"
    style="
      display: grid;
      place-items: center;
      height: 140px;
      border: 1px dashed currentColor;
      border-radius: 8px;
    "
  >
    Right click here (long press on touch, Shift+F10 when focused)
  </div>
  <minerva-menu-item value="cut" shortcut="Ctrl+X">Cut</minerva-menu-item>
  <minerva-menu-item value="copy" shortcut="Ctrl+C">Copy</minerva-menu-item>
  <minerva-menu-item value="paste" shortcut="Ctrl+V" disabled
    >Paste</minerva-menu-item
  >
  <minerva-menu-separator></minerva-menu-separator>
  <minerva-menu-checkbox-item value="grid" checked
    >Show grid</minerva-menu-checkbox-item
  >
</minerva-context-menu>
<p id="canvas-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/menu/wc/context-menu.ts

```tsx
// Same entries and events as <minerva-menu>, opened at the pointer.
type Detail = { value: string; checked?: boolean };

export function setup(root: HTMLElement) {
  const menu = root.querySelector<HTMLElement>("#canvas-menu")!;
  const result = root.querySelector<HTMLElement>("#canvas-result")!;
  const onEvent = (event: Event) => {
    const { value, checked } = (event as CustomEvent<Detail>).detail;
    result.textContent = `${event.type}: ${value}${
      checked === undefined ? "" : ` = ${checked}`
    }`;
  };
  menu.addEventListener("minerva-select", onEvent);
  menu.addEventListener("minerva-change", onEvent);
  return () => {
    menu.removeEventListener("minerva-select", onEvent);
    menu.removeEventListener("minerva-change", onEvent);
  };
}

```

## Example: データからの項目

items プロパティは子要素の代わりに React 版の MenuEntry オブジェクト（ラジオグループ、区切り線、チェックボックス、アクション）を受け取ります。side / align で位置を決め、no-loop で矢印キーが端で止まります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/menu/wc/items.html

```html
<minerva-menu id="data-menu" side="right" align="start" no-loop>
  <minerva-button slot="trigger" variant="outline">Sort by</minerva-button>
</minerva-menu>
<p id="data-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/menu/wc/items.ts

```tsx
// The `items` property takes the React library's MenuEntry shape instead of child
// elements (handy for data-driven menus).
type Change = CustomEvent<{ value: string; checked?: boolean }>;
type Select = CustomEvent<{ value: string }>;
type Menu = HTMLElement & { items: unknown[] };

export function setup(root: HTMLElement) {
  const menu = root.querySelector<Menu>("#data-menu")!;
  const result = root.querySelector<HTMLElement>("#data-result")!;
  menu.items = [
    {
      type: "radio-group",
      key: "sort",
      label: "Sort by",
      defaultValue: "date",
      items: [
        { value: "name", label: "Name" },
        { value: "date", label: "Date modified" },
        { value: "size", label: "Size" },
      ],
    },
    { type: "separator", key: "sep" },
    { type: "checkbox", key: "desc", label: "Descending" },
    { key: "reset", label: "Reset", shortcut: "Esc" },
  ];
  const onChange = (event: Event) => {
    const { value, checked } = (event as Change).detail;
    result.textContent =
      checked === undefined ? `Sort: ${value}` : `Descending: ${checked}`;
  };
  const onSelect = (event: Event) =>
    (result.textContent = `Action: ${(event as Select).detail.value}`);
  menu.addEventListener("minerva-change", onChange);
  menu.addEventListener("minerva-select", onSelect);
  return () => {
    menu.removeEventListener("minerva-change", onChange);
    menu.removeEventListener("minerva-select", onSelect);
  };
}

```
