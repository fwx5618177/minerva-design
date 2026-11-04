# Drawer 抽屉

从视口边缘滑出的面板，用于筛选、详情等次要任务。行为与模态框一致：锁定焦点、Escape、点击遮罩关闭并归还焦点。

Package: minerva-design@1.20.6

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## Drawer

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Drawer"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state; leave `undefined` for uncontrolled."
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "trigger",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element that opens the drawer on click (rendered with `asChild`, so pass a single element)."
  },
  {
    "name": "side",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "DrawerSide | undefined",
    "typeRef": "type:6c57481b1b819469129b",
    "default": "right",
    "required": false,
    "description": "Edge the panel slides in from"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "enum",
    "values": [
      "full",
      "large",
      "medium",
      "small"
    ],
    "typeText": "DrawerSize | undefined",
    "typeRef": "type:b8c3c32265e1cf94c3a0",
    "default": "medium",
    "required": false,
    "description": "Size preset"
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title rendered as the drawer's accessible name."
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Description rendered below the title (accessible description)."
  },
  {
    "name": "hideCloseButton",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the close (×) button"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button; defaults to the localized \"Close\"."
  },
  {
    "name": "hiddenDescription",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the visually hidden description rendered when `description` is not set; defaults to the localized \"Drawer content\"."
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:a2f465209355a62c56d9",
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
    "description": "Called with the requested open state."
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

## DrawerBody

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DrawerBody"
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

## DrawerClose

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DrawerClose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`"
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

## DrawerContent

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DrawerContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "role",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "enum",
    "values": [
      "alertdialog",
      "dialog"
    ],
    "typeText": "\"alertdialog\" | \"dialog\" | undefined",
    "typeRef": "type:a906bc3abf78e63c22c7",
    "default": "dialog",
    "required": false,
    "description": "ARIA role of the panel"
  },
  {
    "name": "forceMount",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the panel mounted while closed (`data-state=\"closed\"`), e.g. for animation libraries"
  },
  {
    "name": "side",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "DrawerSide | undefined",
    "typeRef": "type:6c57481b1b819469129b",
    "default": "right",
    "required": false,
    "description": "Edge the panel slides in from"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "enum",
    "values": [
      "full",
      "large",
      "medium",
      "small"
    ],
    "typeText": "DrawerSize | undefined",
    "typeRef": "type:b8c3c32265e1cf94c3a0",
    "default": "medium",
    "required": false,
    "description": "Size preset"
  },
  {
    "name": "hideCloseButton",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the close (×) button"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button; defaults to the localized \"Close\"."
  },
  {
    "name": "hiddenDescription",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the visually hidden description rendered when `description` is not set; defaults to the localized \"Drawer content\"."
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Visible description below the title (accessible description). Without it a visually hidden generic description is rendered."
  },
  {
    "name": "overlayClassName",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Class name of the overlay (backdrop)."
  }
]
```

### events

```json
[
  {
    "name": "onOpenAutoFocus",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "function",
    "typeText": "((event: Event) => void) | undefined",
    "typeRef": "type:349a86de7a5bceed128c",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Event",
        "typeRef": "type:5914c0535b9eea3cd24b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called before focus moves into the panel on open; `event.preventDefault()` keeps focus where it is"
  },
  {
    "name": "onCloseAutoFocus",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "function",
    "typeText": "((event: Event) => void) | undefined",
    "typeRef": "type:d7f0ad8c362713a49bd6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Event",
        "typeRef": "type:5914c0535b9eea3cd24b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called before focus returns to the opener on close; `event.preventDefault()` skips it"
  },
  {
    "name": "onEscapeKeyDown",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "function",
    "typeText": "((event: KeyboardEvent) => void) | undefined",
    "typeRef": "type:085b923e1b961fd20428",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyboardEvent",
        "typeRef": "type:cf927f12d625bb9a2516"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Escape pressed while it is the topmost layer; `event.preventDefault()` keeps it open."
  },
  {
    "name": "onPointerDownOutside",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "function",
    "typeText": "((event: PointerEvent) => void) | undefined",
    "typeRef": "type:d040f442cdad99db1613",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "PointerEvent",
        "typeRef": "type:9b8a3135b665541031a0"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Pointer pressed outside (e.g. on the overlay); `event.preventDefault()` keeps it open."
  },
  {
    "name": "onInteractOutside",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "function",
    "typeText": "((event: PointerEvent | FocusEvent) => void) | undefined",
    "typeRef": "type:db2c11c51a6a149d7a9a",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "PointerEvent | FocusEvent",
        "typeRef": "type:795729439f86fd72381f"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Pointer down or focus outside; `event.preventDefault()` keeps it open."
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

## DrawerFooter

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DrawerFooter"
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

## DrawerHeader

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DrawerHeader"
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

## DrawerRoot

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DrawerRoot"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state; leave `undefined` for uncontrolled."
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "modal",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Modal mode: renders the overlay, traps focus, locks page scrolling and blocks / hides the page behind. Non-modal drawers close on outside click / focus instead."
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:42707c0593465b94a95f",
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
    "description": "Called with the requested open state (trigger, close button, Escape, overlay click)."
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

## DrawerTrigger

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "DrawerTrigger"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "source": "packages/react/src/components/Drawer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`"
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

## API

```json
{
  "DrawerProps": {
    "source": "react/src/components/Drawer/types.ts",
    "description": "Props of the all-in-one `Drawer`.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state; leave `undefined` for uncontrolled."
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state while uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called with the requested open state."
      },
      {
        "name": "trigger",
        "type": "ReactNode",
        "required": false,
        "description": "Element that opens the drawer on click (rendered with `asChild`, so pass a single element)."
      },
      {
        "name": "side",
        "type": "DrawerSide",
        "required": false,
        "default": "\"right\"",
        "description": "Edge the panel slides in from"
      },
      {
        "name": "size",
        "type": "DrawerSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Size preset"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title rendered as the drawer's accessible name."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Description rendered below the title (accessible description)."
      },
      {
        "name": "hideCloseButton",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Hides the close (×) button"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the close button; defaults to the localized \"Close\"."
      },
      {
        "name": "hiddenDescription",
        "type": "string",
        "required": false,
        "description": "Text of the visually hidden description rendered when `description` is not set; defaults to the localized \"Drawer content\"."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the panel."
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the dialog element."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Content: usually `DrawerBody` + `DrawerFooter`."
      }
    ]
  },
  "DrawerRootProps": {
    "source": "react/src/components/Drawer/types.ts",
    "description": "Props of the compound `DrawerRoot` (owns the open state).",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state; leave `undefined` for uncontrolled."
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state while uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called with the requested open state (trigger, close button, Escape, overlay click)."
      },
      {
        "name": "modal",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Modal mode: renders the overlay, traps focus, locks page scrolling and blocks / hides the page behind. Non-modal drawers close on outside click / focus instead."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Trigger and content."
      }
    ]
  },
  "DrawerContentProps": {
    "source": "react/src/components/Drawer/types.ts",
    "description": "Props of `DrawerContent`: the portalled overlay + sliding panel.",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the dialog element."
      },
      {
        "name": "role",
        "type": "\"dialog\" | \"alertdialog\"",
        "required": false,
        "default": "\"dialog\"",
        "description": "ARIA role of the panel"
      },
      {
        "name": "forceMount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps the panel mounted while closed (`data-state=\"closed\"`), e.g. for animation libraries"
      },
      {
        "name": "onOpenAutoFocus",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Called before focus moves into the panel on open; `event.preventDefault()` keeps focus where it is"
      },
      {
        "name": "onCloseAutoFocus",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Called before focus returns to the opener on close; `event.preventDefault()` skips it"
      },
      {
        "name": "onEscapeKeyDown",
        "type": "(event: KeyboardEvent) => void",
        "required": false,
        "description": "Escape pressed while it is the topmost layer; `event.preventDefault()` keeps it open."
      },
      {
        "name": "onPointerDownOutside",
        "type": "(event: PointerEvent) => void",
        "required": false,
        "description": "Pointer pressed outside (e.g. on the overlay); `event.preventDefault()` keeps it open."
      },
      {
        "name": "onInteractOutside",
        "type": "(event: PointerEvent | FocusEvent) => void",
        "required": false,
        "description": "Pointer down or focus outside; `event.preventDefault()` keeps it open."
      },
      {
        "name": "side",
        "type": "DrawerSide",
        "required": false,
        "default": "\"right\"",
        "description": "Edge the panel slides in from"
      },
      {
        "name": "size",
        "type": "DrawerSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Size preset"
      },
      {
        "name": "hideCloseButton",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Hides the close (×) button"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the close button; defaults to the localized \"Close\"."
      },
      {
        "name": "hiddenDescription",
        "type": "string",
        "required": false,
        "description": "Text of the visually hidden description rendered when `description` is not set; defaults to the localized \"Drawer content\"."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Visible description below the title (accessible description). Without it a visually hidden generic description is rendered."
      },
      {
        "name": "overlayClassName",
        "type": "string",
        "required": false,
        "description": "Class name of the overlay (backdrop)."
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Drawer": {
    "kind": "cssVars",
    "source": "react/src/components/Drawer",
    "vars": [
      {
        "name": "--drawer-width",
        "description": "Width of a left / right drawer (every size; defaults to the width of the size)"
      },
      {
        "name": "--drawer-height",
        "description": "Height of a top / bottom drawer (every size; defaults to the height of the size)"
      },
      {
        "name": "--drawer-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--drawer-radius",
        "description": "Corner radius of the inner edge (defaults to --radius-lg)"
      },
      {
        "name": "--drawer-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--drawer-background",
        "description": "Background of the panel"
      },
      {
        "name": "--drawer-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

通过 open 和 onOpenChange 受控，包含主体和操作底栏。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/demos/basic.tsx

```tsx
import { useState } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerFooter,
} from "minerva-design";

export default function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Filters</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Filters"
        description="Narrow the list of books."
      >
        <DrawerBody>
          <Checkbox defaultChecked label="Completed only" />
        </DrawerBody>
        <DrawerFooter>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Reset
          </Button>
          <Button onClick={() => setOpen(false)}>Apply</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

```

## Example: 组合式 API

DrawerRoot、DrawerTrigger、DrawerContent、DrawerHeader、DrawerBody、DrawerFooter 和 DrawerClose。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/demos/compound.tsx

```tsx
import {
  Button,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "minerva-design";

export default function CompoundDemo() {
  return (
    <DrawerRoot>
      <DrawerTrigger asChild>
        <Button color="neutral" variant="outline">
          Open compound drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left" size="large" hideCloseButton>
        <DrawerHeader>Navigation</DrawerHeader>
        <DrawerBody>Build the drawer from its parts.</DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}

```

## Example: 方向与尺寸

side 选择滑出的边缘；size 设置宽度（左 / 右）或高度（上 / 下）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/demos/sides.tsx

```tsx
import { Button, Drawer, DrawerBody, type DrawerSide } from "minerva-design";

const SIDES: DrawerSide[] = ["left", "right", "top", "bottom"];

export default function SidesDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {SIDES.map((side) => (
        <Drawer
          key={side}
          side={side}
          size="small"
          title={`From the ${side}`}
          trigger={
            <Button color="neutral" variant="outline">
              {side}
            </Button>
          }
        >
          <DrawerBody>
            Sizes: small, medium (default), large and full.
          </DrawerBody>
        </Drawer>
      ))}
    </div>
  );
}

```
