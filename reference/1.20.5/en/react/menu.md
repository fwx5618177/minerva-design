# Menu

An action menu opened from a button (Menu) or with a right click (ContextMenu): icons, shortcuts, separators, groups, checkbox items, radio groups, submenus, typeahead and full keyboard support (Enter, Space or ArrowDown open it on the first item, ArrowUp on the last; arrows wrap around and skip disabled items, Home / End, Tab closes it, Escape returns focus to the trigger). To pick a value from a list, use Select.

Package: minerva-design@1.20.5

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## ContextMenu

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "array",
    "typeText": "MenuEntry[]",
    "typeRef": "type:c67adfd0ac762b4745d5",
    "required": true,
    "description": "Entries of the menu"
  },
  {
    "name": "closeOnSelect",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "MenuSize | undefined",
    "typeRef": "type:0a8867368b46d164e03f",
    "default": "medium",
    "required": false,
    "description": "Density of the items"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the context menu (the native one shows instead)"
  },
  {
    "name": "modal",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open"
  },
  {
    "name": "loop",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Arrow keys wrap around from the last item to the first (and back)"
  },
  {
    "name": "dir",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "enum",
    "values": [
      "ltr",
      "rtl"
    ],
    "typeText": "MenuDirection | undefined",
    "typeRef": "type:789f9dd4b6441a5e9060",
    "required": false,
    "description": "Reading direction: in \"rtl\" submenus open to the left and ArrowLeft / ArrowRight are swapped"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the menu panel"
  }
]
```

### events

```json
[
  {
    "name": "onSelect",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "function",
    "typeText": "((item: MenuAction) => void) | undefined",
    "typeRef": "type:499d0bf42824c590eda9",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MenuAction",
        "typeRef": "type:eeec539f1567c2455eb7"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the original item object when an action is selected"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:a22d2ac9e29e49a53b5e",
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
    "description": "Called when the menu opens or closes"
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

## Menu

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "array",
    "typeText": "MenuEntry[]",
    "typeRef": "type:c67adfd0ac762b4745d5",
    "required": true,
    "description": "Entries of the menu"
  },
  {
    "name": "closeOnSelect",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "MenuSize | undefined",
    "typeRef": "type:0a8867368b46d164e03f",
    "default": "medium",
    "required": false,
    "description": "Density of the items"
  },
  {
    "name": "align",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "enum",
    "values": [
      "center",
      "end",
      "start"
    ],
    "typeText": "MenuAlign | undefined",
    "typeRef": "type:c80b1bc3fde68936e01c",
    "default": "end",
    "required": false,
    "description": "Alignment of the menu against the trigger"
  },
  {
    "name": "side",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "MenuSide | undefined",
    "typeRef": "type:ee59a7eac79943d586de",
    "default": "bottom",
    "required": false,
    "description": "Preferred side; the menu flips when there is not enough room"
  },
  {
    "name": "open",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the menu is open (controlled; pair with onOpenChange)"
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state (uncontrolled)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the trigger"
  },
  {
    "name": "modal",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open"
  },
  {
    "name": "loop",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Arrow keys wrap around from the last item to the first (and back)"
  },
  {
    "name": "dir",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "enum",
    "values": [
      "ltr",
      "rtl"
    ],
    "typeText": "MenuDirection | undefined",
    "typeRef": "type:789f9dd4b6441a5e9060",
    "required": false,
    "description": "Reading direction: in \"rtl\" submenus open to the left and ArrowLeft / ArrowRight are swapped"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the menu panel (defaults to the trigger's label)"
  }
]
```

### events

```json
[
  {
    "name": "onSelect",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "function",
    "typeText": "((item: MenuAction) => void) | undefined",
    "typeRef": "type:dd6f1b9b91a642b50d0a",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MenuAction",
        "typeRef": "type:eeec539f1567c2455eb7"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the original item object when an action is selected"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Menu/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:66d3017287dce930d312",
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
    "description": "Called when the menu opens or closes"
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

Data object in React: an item of the parent component's items / entries prop.

## MenuGroup

Support: n/a

Data object in React: an item of the parent component's items / entries prop.

## MenuItem

Support: n/a

Data object in React: an item of the parent component's items / entries prop.

## MenuLabel

Support: n/a

Data object in React: an item of the parent component's items / entries prop.

## MenuRadioItem

Support: n/a

Data object in React: an item of the parent component's items / entries prop.

## MenuSeparator

Support: n/a

Data object in React: an item of the parent component's items / entries prop.

## API

```json
{
  "MenuProps": {
    "source": "react/src/components/Menu/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactElement",
        "required": true,
        "description": "Trigger element (button); click, Enter, Space and ArrowDown open the menu (ArrowUp focuses the last item)"
      },
      {
        "name": "items",
        "type": "MenuEntry[]",
        "required": true,
        "description": "Entries of the menu"
      },
      {
        "name": "onSelect",
        "type": "(item: MenuAction) => void",
        "required": false,
        "description": "Called with the original item object when an action is selected"
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)"
      },
      {
        "name": "size",
        "type": "MenuSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Density of the items"
      },
      {
        "name": "align",
        "type": "MenuAlign",
        "required": false,
        "default": "\"end\"",
        "description": "Alignment of the menu against the trigger"
      },
      {
        "name": "side",
        "type": "MenuSide",
        "required": false,
        "default": "\"bottom\"",
        "description": "Preferred side; the menu flips when there is not enough room"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Whether the menu is open (controlled; pair with onOpenChange)"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state (uncontrolled)"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the menu opens or closes"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the trigger"
      },
      {
        "name": "modal",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open"
      },
      {
        "name": "loop",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Arrow keys wrap around from the last item to the first (and back)"
      },
      {
        "name": "dir",
        "type": "MenuDirection",
        "required": false,
        "default": "inherited from the nearest `dir` attribute of the trigger (else \"ltr\")",
        "description": "Reading direction: in \"rtl\" submenus open to the left and ArrowLeft / ArrowRight are swapped"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the menu panel"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the menu panel (defaults to the trigger's label)"
      }
    ]
  },
  "ContextMenuProps": {
    "source": "react/src/components/Menu/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactElement",
        "required": true,
        "description": "Area that opens the menu on right click / long press / Shift+F10 / ContextMenu key"
      },
      {
        "name": "items",
        "type": "MenuEntry[]",
        "required": true,
        "description": "Entries of the menu"
      },
      {
        "name": "onSelect",
        "type": "(item: MenuAction) => void",
        "required": false,
        "description": "Called with the original item object when an action is selected"
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Whether selecting an action closes the menu (checkbox and radio items keep it open unless their entry sets closeOnSelect)"
      },
      {
        "name": "size",
        "type": "MenuSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Density of the items"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the menu opens or closes"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the context menu (the native one shows instead)"
      },
      {
        "name": "modal",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Modal menus block pointer interaction outside, trap focus, lock scrolling and hide the rest of the page from assistive technologies while open"
      },
      {
        "name": "loop",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Arrow keys wrap around from the last item to the first (and back)"
      },
      {
        "name": "dir",
        "type": "MenuDirection",
        "required": false,
        "default": "inherited from the nearest `dir` attribute of the trigger (else \"ltr\")",
        "description": "Reading direction: in \"rtl\" submenus open to the left and ArrowLeft / ArrowRight are swapped"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the menu panel"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the menu panel"
      }
    ]
  },
  "MenuAction": {
    "source": "react/src/components/Menu/types.ts",
    "description": "An actionable menu item; with `children` it opens a submenu",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the item"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Content of the item"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false,
        "description": "Text used for typeahead when `label` is not plain text"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon displayed before the label"
      },
      {
        "name": "shortcut",
        "type": "string",
        "required": false,
        "description": "Keyboard shortcut hint displayed after the label (display only)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the item"
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "required": false,
        "description": "Whether selecting this item closes the menu (overrides the menu's `closeOnSelect`)"
      },
      {
        "name": "children",
        "type": "MenuEntry[]",
        "required": false,
        "description": "Entries of a submenu opened by this item"
      }
    ]
  },
  "MenuCheckboxEntry": {
    "source": "react/src/components/Menu/types.ts",
    "description": "A toggleable item (`role=\"menuitemcheckbox\"`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"checkbox\"",
        "required": true,
        "description": "Entry type"
      },
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the item"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Content of the item"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false,
        "description": "Text used for typeahead when `label` is not plain text"
      },
      {
        "name": "shortcut",
        "type": "string",
        "required": false,
        "description": "Keyboard shortcut hint displayed after the label (display only)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the item"
      },
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Whether the item is checked (controlled; pair with onCheckedChange)"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial checked state (uncontrolled)"
      },
      {
        "name": "onCheckedChange",
        "type": "(checked: boolean) => void",
        "required": false,
        "description": "Called with the next checked state when the item is toggled"
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Whether toggling the item closes the menu"
      }
    ]
  },
  "MenuRadioGroupEntry": {
    "source": "react/src/components/Menu/types.ts",
    "description": "A group of mutually exclusive options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"radio-group\"",
        "required": true,
        "description": "Entry type"
      },
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the group"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Label displayed above the group (also names the group)"
      },
      {
        "name": "items",
        "type": "MenuRadioItem[]",
        "required": true,
        "description": "Options of the group"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected value (controlled; pair with onValueChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "onValueChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the value of the option that was chosen"
      },
      {
        "name": "closeOnSelect",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Whether choosing an option closes the menu"
      }
    ]
  },
  "MenuRadioItem": {
    "source": "react/src/components/Menu/types.ts",
    "description": "An option of a radio group entry (`role=\"menuitemradio\"`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value of the option (unique within the group)"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Content of the option"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false,
        "description": "Text used for typeahead when `label` is not plain text"
      },
      {
        "name": "shortcut",
        "type": "string",
        "required": false,
        "description": "Keyboard shortcut hint displayed after the label (display only)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the option"
      }
    ]
  },
  "MenuSeparatorEntry": {
    "source": "react/src/components/Menu/types.ts",
    "description": "A visual separator between entries",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"separator\"",
        "required": true,
        "description": "Entry type"
      },
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the separator"
      }
    ]
  },
  "MenuGroupEntry": {
    "source": "react/src/components/Menu/types.ts",
    "description": "A labelled group of entries",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "type",
        "type": "\"group\"",
        "required": true,
        "description": "Entry type"
      },
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the group"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Label displayed above the group"
      },
      {
        "name": "items",
        "type": "MenuEntry[]",
        "required": true,
        "description": "Entries of the group"
      }
    ]
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

## Example: Basic usage

Items with icons and shortcut hints. onSelect receives the original item object, then the menu closes and focus returns to the trigger.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/basic.tsx

```tsx
import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";
import { LuCopy, LuPencil, LuTrash2 } from "react-icons/lu";

export default function BasicDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        items={[
          { key: "edit", label: "Edit", icon: <LuPencil />, shortcut: "⌘E" },
          { key: "copy", label: "Duplicate", icon: <LuCopy />, shortcut: "⌘D" },
          { type: "separator", key: "sep" },
          { key: "delete", label: "Delete", icon: <LuTrash2 /> },
        ]}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          Actions
        </Button>
      </Menu>
      <span role="status">Selected: {selected ?? "none"}</span>
    </HStack>
  );
}

```

## Example: Checkbox and radio items

type: "checkbox" entries toggle (checked / defaultChecked + onCheckedChange) and type: "radio-group" entries hold mutually exclusive options (value / defaultValue + onValueChange). They keep the menu open so several options can be changed; set closeOnSelect on the entry to close it.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/checkbox-radio.tsx

```tsx
import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";

export default function CheckboxRadioDemo() {
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(false);
  const [zoom, setZoom] = useState("100");
  return (
    <HStack gap={4} wrap>
      <Menu
        align="start"
        items={[
          {
            type: "checkbox",
            key: "grid",
            label: "Show grid",
            shortcut: "⌘'",
            checked: showGrid,
            onCheckedChange: setShowGrid,
          },
          {
            type: "checkbox",
            key: "rulers",
            label: "Show rulers",
            checked: showRulers,
            onCheckedChange: setShowRulers,
          },
          { type: "separator", key: "sep" },
          {
            type: "radio-group",
            key: "zoom",
            label: "Zoom",
            value: zoom,
            onValueChange: setZoom,
            items: [
              { value: "50", label: "50%" },
              { value: "100", label: "100%" },
              { value: "200", label: "200%" },
            ],
          },
        ]}
      >
        <Button color="neutral" variant="outline">
          View
        </Button>
      </Menu>
      <span role="status">
        Grid: {showGrid ? "on" : "off"} · Rulers: {showRulers ? "on" : "off"} ·
        Zoom: {zoom}%
      </span>
    </HStack>
  );
}

```

## Example: Context menu

ContextMenu opens the same entries at the pointer on right click or long press (a new right click moves it), and at the area with Shift+F10 or the ContextMenu key. Focus moves to the first item and returns to the area on close.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/context-menu.tsx

```tsx
import { useState } from "react";
import { Button, ContextMenu, VStack } from "minerva-design";

export default function ContextMenuDemo() {
  const [selected, setSelected] = useState<string>();
  const [pinned, setPinned] = useState(false);
  return (
    <VStack gap={4}>
      <ContextMenu
        items={[
          { key: "open", label: "Open in new tab" },
          { key: "rename", label: "Rename", shortcut: "F2" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            checked: pinned,
            onCheckedChange: setPinned,
          },
          {
            key: "copy",
            label: "Copy",
            children: [
              { key: "copy-link", label: "Link" },
              { key: "copy-path", label: "Path" },
            ],
          },
          { type: "separator", key: "sep" },
          { key: "delete", label: "Delete" },
        ]}
        onSelect={(item) => setSelected(item.key)}
      >
        <div
          style={{
            display: "grid",
            placeItems: "center",
            alignContent: "center",
            gap: 8,
            height: 120,
            border: "1px dashed var(--border-color)",
            borderRadius: 8,
          }}
        >
          <span>Right-click here</span>
          <Button size="small" color="neutral" variant="outline">
            Or focus me and press Shift+F10
          </Button>
        </div>
      </ContextMenu>
      <span role="status">
        Selected: {selected ?? "none"} · Pinned: {pinned ? "yes" : "no"}
      </span>
    </VStack>
  );
}

```

## Example: Controlled

Control the open state with open and onOpenChange; defaultOpen sets the initial state when it is uncontrolled.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Button, Menu } from "minerva-design";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Menu
        open={open}
        onOpenChange={setOpen}
        items={[
          { key: "a", label: "Archive" },
          { key: "b", label: "Move…" },
        ]}
      >
        <Button color="neutral" variant="outline">
          Menu
        </Button>
      </Menu>
      <span>{open ? "Open" : "Closed"}</span>
    </div>
  );
}

```

## Example: Disabled

Disable individual items (they are skipped by the arrow keys) or the whole menu.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/disabled.tsx

```tsx
import { Button, HStack, Menu } from "minerva-design";

const items = [
  { key: "copy", label: "Copy" },
  { key: "paste", label: "Paste (clipboard empty)", disabled: true },
  { key: "delete", label: "Delete" },
];

export default function DisabledDemo() {
  return (
    <HStack gap={4}>
      <Menu items={items} align="start">
        <Button size="small" color="neutral" variant="outline">
          Disabled item
        </Button>
      </Menu>
      <Menu items={items} disabled>
        <Button size="small" color="neutral" variant="outline">
          Disabled menu
        </Button>
      </Menu>
    </HStack>
  );
}

```

## Example: Groups, submenus and size

Group entries with a label, separate them, and nest submenus with children. size="small" makes items denser; side and align position the panel.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/groups.tsx

```tsx
import { useState } from "react";
import { Button, HStack, Menu } from "minerva-design";

export default function GroupsDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        size="small"
        side="bottom"
        align="start"
        items={[
          {
            type: "group",
            key: "file",
            label: "File",
            items: [
              { key: "new", label: "New" },
              { key: "open", label: "Open…" },
            ],
          },
          { type: "separator", key: "sep" },
          {
            key: "export",
            label: "Export as",
            children: [
              { key: "csv", label: "CSV" },
              { key: "json", label: "JSON" },
              { key: "pdf", label: "PDF", disabled: true },
            ],
          },
        ]}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          File
        </Button>
      </Menu>
      <span role="status">Selected: {selected ?? "none"}</span>
    </HStack>
  );
}

```

## Example: Placement

side is the preferred side of the trigger and align the alignment against it; near the viewport edges the menu flips and shifts to stay visible.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/placement.tsx

```tsx
import { Button, HStack, Menu, type MenuSide } from "minerva-design";

const sides: MenuSide[] = ["bottom", "top", "left", "right"];
const items = [
  { key: "first", label: "First" },
  { key: "second", label: "Second" },
  { key: "third", label: "Third" },
];

export default function PlacementDemo() {
  return (
    <HStack gap={4} wrap style={{ padding: "120px 96px" }}>
      {sides.map((side) => (
        <Menu key={side} items={items} side={side} align="start">
          <Button size="small" color="neutral" variant="outline">
            {side}
          </Button>
        </Menu>
      ))}
    </HStack>
  );
}

```

## Example: Submenus

Nest entries with children. ArrowRight, Enter or Space open a submenu on its first item and ArrowLeft or Escape close it only; with the pointer, submenus open on hover and stay open while the pointer moves diagonally towards them. With dir="rtl" they open to the left and the arrow keys are swapped.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/submenus.tsx

```tsx
import { useState } from "react";
import { Button, HStack, Menu, type MenuEntry } from "minerva-design";
import { LuFolderInput, LuShare2 } from "react-icons/lu";

const items: MenuEntry[] = [
  { key: "rename", label: "Rename", shortcut: "F2" },
  {
    key: "move",
    label: "Move to",
    icon: <LuFolderInput />,
    children: [
      { key: "inbox", label: "Inbox" },
      { key: "archive", label: "Archive" },
      {
        key: "projects",
        label: "Projects",
        children: [
          { key: "alpha", label: "Alpha" },
          { key: "beta", label: "Beta" },
        ],
      },
    ],
  },
  {
    key: "share",
    label: "Share",
    icon: <LuShare2 />,
    children: [
      { key: "email", label: "Email" },
      { key: "link", label: "Copy link" },
    ],
  },
  { type: "separator", key: "sep" },
  { key: "delete", label: "Delete" },
];

export default function SubmenusDemo() {
  const [selected, setSelected] = useState<string>();
  return (
    <HStack gap={4} wrap>
      <Menu
        align="start"
        items={items}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          File actions
        </Button>
      </Menu>
      <Menu
        dir="rtl"
        align="start"
        items={items}
        onSelect={(item) => setSelected(item.key)}
      >
        <Button color="neutral" variant="outline">
          RTL
        </Button>
      </Menu>
      <span role="status">Selected: {selected ?? "none"}</span>
    </HStack>
  );
}

```

## Example: Triggers

Any button can be the trigger, such as a Button or an IconButton; label icon-only triggers. Pass aria-label to name the menu panel.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/menu/demos/triggers.tsx

```tsx
import { Button, HStack, IconButton, Menu } from "minerva-design";
import { IoEllipsisVertical } from "react-icons/io5";

const items = [
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
  { type: "separator" as const, key: "sep" },
  { key: "sign-out", label: "Sign out" },
];

export default function TriggersDemo() {
  return (
    <HStack gap={4}>
      <Menu items={items} align="start">
        <Button color="neutral" variant="outline">
          Account ▾
        </Button>
      </Menu>
      <Menu items={items} aria-label="More actions">
        <IconButton icon={<IoEllipsisVertical />} label="More actions" />
      </Menu>
    </HStack>
  );
}

```
