# Menu

An action menu opened from a button (Menu) or with a right click (ContextMenu): icons, shortcuts, separators, groups, checkbox items, radio groups, submenus, typeahead and full keyboard support (Enter, Space or ArrowDown open it on the first item, ArrowUp on the last; arrows wrap around and skip disabled items, Home / End, Tab closes it, Escape returns focus to the trigger). To pick a value from a list, use Select.

Package: minerva-design@1.19.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
