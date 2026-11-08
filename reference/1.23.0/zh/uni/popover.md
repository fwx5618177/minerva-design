# Popover 气泡卡片

点击触发、锚定在触发器上的浮层面板，用于筛选器、账户菜单等可交互内容。与 Tooltip 不同，它可以包含可聚焦内容，并自行管理焦点、Escape 和外部点击；在 Modal 中会先于 Modal 关闭。

Package: minerva-design@1.23.0

Renderer: uni

Locale: zh

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

## Popover

Support: beta

Controlled/default compound state; separate trigger/anchor native measurement; side/align/offset, viewport flip/shift/size, matchAnchorWidth, arrow, forceMount; cancelable dismiss/focus callbacks; resize/native polling cleanup. H5 supports body Teleport, composed asChild triggers/anchors/close actions, modal focus trap, inert background and scroll locking. Native panels use fixed host geometry; native views cannot reproduce browser child cloning or document focus semantics. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Popover"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modal",
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
    "name": "content",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placement",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "openChange",
    "typeText": "any[]"
  },
  {
    "name": "update:open",
    "typeText": "any[]"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  },
  {
    "name": "trigger",
    "typeText": "{}"
  },
  {
    "name": "content",
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

## PopoverAnchor

Support: beta

Separate measurement anchor used by PopoverContent, registered and cleared with the compound lifecycle. Native wrapper replaces React asChild cloning. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "PopoverAnchor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "asChild",
    "typeText": "boolean | undefined",
    "required": false
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

## PopoverClose

Support: beta

Close button updates shared Popover root state. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "PopoverClose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "asChild",
    "typeText": "boolean | undefined",
    "required": false
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

## PopoverContent

Support: beta

Native measured collision-aware panel with side/align/offset/padding/width/arrow/forceMount and cancelable interaction callbacks. H5 supports body Teleport and modal focus trap/inert/scroll lock; native fixed coordinates require device validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "PopoverContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "forceMount",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "role",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dismissLayer",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "side",
    "typeText": "Side | undefined",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"end\" | \"center\" | undefined",
    "required": false
  },
  {
    "name": "sideOffset",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "alignOffset",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "collisionPadding",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "matchAnchorWidth",
    "typeText": "false | \"min\" | \"exact\" | undefined",
    "required": false
  },
  {
    "name": "arrow",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "portal",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "openAutoFocus",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "closeAutoFocus",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "escapeKeyDown",
    "typeText": "[event: KeyboardEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "KeyboardEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointerDownOutside",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "interactOutside",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "focusOutside",
    "typeText": "[event: Event]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "Event",
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

## PopoverTrigger

Support: beta

Native button toggles root state, registers its measurement/focus target and respects disabled. Native wrapper replaces React asChild cloning. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "PopoverTrigger"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "asChild",
    "typeText": "boolean | undefined",
    "required": false
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

## CSS variables

```json
{
  "css:Popover": {
    "kind": "cssVars",
    "source": "react/src/components/Popover",
    "vars": [
      {
        "name": "--popover-min-width",
        "description": "Minimum width of the panel"
      },
      {
        "name": "--popover-max-width",
        "description": "Maximum width of the panel"
      },
      {
        "name": "--popover-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--popover-radius",
        "description": "Corner radius of the panel (defaults to --radius-lg)"
      },
      {
        "name": "--popover-background",
        "description": "Background of the panel and its arrow"
      },
      {
        "name": "--popover-border-color",
        "description": "Border color of the panel and its arrow"
      },
      {
        "name": "--popover-shadow",
        "description": "Shadow of the panel (defaults to --shadow-lg, --shadow-xl in dark themes)"
      },
      {
        "name": "--popover-z-index",
        "description": "Stacking order of the panel (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
