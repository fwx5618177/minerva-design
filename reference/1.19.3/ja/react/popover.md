# Popover ポップオーバー

クリックで開き、トリガーに固定されるフローティングパネル。フィルターやアカウントメニューなどの操作可能なコンテンツに使います。Tooltip と異なりフォーカス可能な内容を持ち、フォーカス・Escape・外側クリックを自身で管理します。Modal 内では Modal より先に閉じます。

Package: minerva-design@1.19.3

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Popover

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "open",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state; leave `undefined` for uncontrolled."
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "modal",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Modal mode: traps focus inside the panel, locks page scrolling, hides the rest of the page from assistive technology and blocks outside pointer interaction (an outside click still closes it)"
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:fbbae3d0f5c8e6c4c40e",
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
    "description": "Called with the requested open state (trigger, Escape, outside click, `PopoverClose`)."
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

## PopoverAnchor

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "asChild",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges onto the single child element instead of rendering a `<div>`"
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

## PopoverClose

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "asChild",
    "source": "packages/react/src/components/Popover/types.ts",
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

## PopoverContent

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "side",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "PopoverSide | undefined",
    "typeRef": "type:8b5e9dfa9c324353f8ff",
    "default": "bottom",
    "required": false,
    "description": "Preferred side; flips when there is not enough room"
  },
  {
    "name": "align",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "enum",
    "values": [
      "center",
      "end",
      "start"
    ],
    "typeText": "PopoverAlign | undefined",
    "typeRef": "type:de83405c059d49a43b4a",
    "default": "center",
    "required": false,
    "description": "Alignment along the trigger"
  },
  {
    "name": "sideOffset",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 6,
    "required": false,
    "description": "Gap to the trigger in pixels"
  },
  {
    "name": "alignOffset",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Skid along the trigger in pixels (positive = towards the end)"
  },
  {
    "name": "collisionPadding",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 8,
    "required": false,
    "description": "Minimum distance kept to the viewport edges in pixels when flipping, shifting and sizing the panel"
  },
  {
    "name": "matchAnchorWidth",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "union",
    "typeText": "false | \"min\" | \"exact\" | undefined",
    "typeRef": "type:e293f44130fdc1fa1dec",
    "default": false,
    "required": false,
    "description": "Sizes the panel after the trigger / anchor width: `\"min\"` at least as wide, `\"exact\"` exactly as wide (also caps the width to the viewport)"
  },
  {
    "name": "arrow",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders an arrow pointing at the trigger"
  },
  {
    "name": "portal",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Renders the panel into a portal (the theme-scoped container of a nested `ConfigProvider`, else `document.body`)"
  },
  {
    "name": "forceMount",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the panel mounted while closed (`data-state=\"closed\"`), e.g. for animation libraries"
  }
]
```

### events

```json
[
  {
    "name": "onOpenAutoFocus",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "function",
    "typeText": "((event: Event) => void) | undefined",
    "typeRef": "type:b540e27cce05a7d2fc1d",
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
    "description": "Before focus moves into the panel on open; `event.preventDefault()` keeps focus where it is."
  },
  {
    "name": "onCloseAutoFocus",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "function",
    "typeText": "((event: Event) => void) | undefined",
    "typeRef": "type:6397e5612f5eb103b991",
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
    "description": "Before focus returns to the trigger on close; `event.preventDefault()` skips it."
  },
  {
    "name": "onEscapeKeyDown",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "function",
    "typeText": "((event: KeyboardEvent) => void) | undefined",
    "typeRef": "type:e555fbfc59c88efff5e5",
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
    "description": "Escape pressed while topmost; `event.preventDefault()` keeps it open."
  },
  {
    "name": "onPointerDownOutside",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "function",
    "typeText": "((event: PointerEvent) => void) | undefined",
    "typeRef": "type:dfa9198f7c683cbbef50",
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
    "description": "Pointer pressed outside; `event.preventDefault()` keeps it open."
  },
  {
    "name": "onFocusOutside",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "function",
    "typeText": "((event: FocusEvent) => void) | undefined",
    "typeRef": "type:7d47e4a8d5801db6b0b8",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent",
        "typeRef": "type:ab952d2eda9554108c00"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Focus moved outside; `event.preventDefault()` keeps it open."
  },
  {
    "name": "onInteractOutside",
    "source": "packages/react/src/components/Popover/types.ts",
    "kind": "function",
    "typeText": "((event: PointerEvent | FocusEvent) => void) | undefined",
    "typeRef": "type:549f9d368e98b7fd1fa5",
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

## PopoverTrigger

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "asChild",
    "source": "packages/react/src/components/Popover/types.ts",
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
  "PopoverProps": {
    "source": "react/src/components/Popover/types.ts",
    "description": "Props of `Popover` (the root; owns the open state).",
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
        "description": "Called with the requested open state (trigger, Escape, outside click, `PopoverClose`)."
      },
      {
        "name": "modal",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Modal mode: traps focus inside the panel, locks page scrolling, hides the rest of the page from assistive technology and blocks outside pointer interaction (an outside click still closes it)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "`PopoverTrigger` / `PopoverAnchor` and `PopoverContent`."
      }
    ]
  },
  "PopoverContentProps": {
    "source": "react/src/components/Popover/types.ts",
    "description": "Props of `PopoverContent`: the portalled, anchored panel (role=\"dialog\").",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the panel element."
      },
      {
        "name": "side",
        "type": "PopoverSide",
        "required": false,
        "default": "\"bottom\"",
        "description": "Preferred side; flips when there is not enough room"
      },
      {
        "name": "align",
        "type": "PopoverAlign",
        "required": false,
        "default": "\"center\"",
        "description": "Alignment along the trigger"
      },
      {
        "name": "sideOffset",
        "type": "number",
        "required": false,
        "default": "6",
        "description": "Gap to the trigger in pixels"
      },
      {
        "name": "alignOffset",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Skid along the trigger in pixels (positive = towards the end)"
      },
      {
        "name": "collisionPadding",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Minimum distance kept to the viewport edges in pixels when flipping, shifting and sizing the panel"
      },
      {
        "name": "matchAnchorWidth",
        "type": "false | \"min\" | \"exact\"",
        "required": false,
        "default": "false",
        "description": "Sizes the panel after the trigger / anchor width: `\"min\"` at least as wide, `\"exact\"` exactly as wide (also caps the width to the viewport)"
      },
      {
        "name": "arrow",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders an arrow pointing at the trigger"
      },
      {
        "name": "portal",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Renders the panel into a portal (the theme-scoped container of a nested `ConfigProvider`, else `document.body`)"
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
        "description": "Before focus moves into the panel on open; `event.preventDefault()` keeps focus where it is."
      },
      {
        "name": "onCloseAutoFocus",
        "type": "(event: Event) => void",
        "required": false,
        "description": "Before focus returns to the trigger on close; `event.preventDefault()` skips it."
      },
      {
        "name": "onEscapeKeyDown",
        "type": "(event: KeyboardEvent) => void",
        "required": false,
        "description": "Escape pressed while topmost; `event.preventDefault()` keeps it open."
      },
      {
        "name": "onPointerDownOutside",
        "type": "(event: PointerEvent) => void",
        "required": false,
        "description": "Pointer pressed outside; `event.preventDefault()` keeps it open."
      },
      {
        "name": "onFocusOutside",
        "type": "(event: FocusEvent) => void",
        "required": false,
        "description": "Focus moved outside; `event.preventDefault()` keeps it open."
      },
      {
        "name": "onInteractOutside",
        "type": "(event: PointerEvent | FocusEvent) => void",
        "required": false,
        "description": "Pointer down or focus outside; `event.preventDefault()` keeps it open."
      }
    ]
  },
  "PopoverTriggerProps": {
    "source": "react/src/components/Popover/types.ts",
    "description": "Props of `PopoverTrigger` / `PopoverClose` (a native button, or the child with `asChild`).",
    "kind": "interface",
    "extends": [
      "ComponentPropsWithRef<\"button\">"
    ],
    "props": [
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Merges the behaviour onto the single child element instead of rendering a `<button>`"
      }
    ]
  }
}
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

## Example: 基本的な使い方

PopoverTrigger でパネルを切り替えます。フォーカスは内部に移り、閉じるとトリガーに戻ります。PopoverClose で閉じます。非モーダルでは、最後の要素で Tab（最初の要素で Shift+Tab）を押すとパネルが閉じ、フォーカスはトリガーの次（前）の要素へ移ります。パネル内でループしません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/popover/demos/basic.tsx

```tsx
import {
  Button,
  Checkbox,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "minerva-design";

export default function BasicDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button color="neutral" variant="outline">
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Filters" arrow>
        <Checkbox defaultChecked label="Read" />
        <Checkbox label="Unread" />
        <PopoverClose asChild>
          <Button size="small">Apply</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

```

## Example: アンカー付きの制御

open + onOpenChange で状態を制御し、PopoverAnchor で別の要素を基準に配置します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/popover/demos/controlled.tsx

```tsx
import { useState } from "react";
import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "minerva-design";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div
          style={{
            display: "inline-flex",
            gap: 8,
            padding: 8,
            border: "1px dashed",
          }}
        >
          <PopoverTrigger asChild>
            <Button>{open ? "Close" : "Open"} account menu</Button>
          </PopoverTrigger>
        </div>
      </PopoverAnchor>
      <PopoverContent align="end" aria-label="Account">
        Signed in as reader@example.com
      </PopoverContent>
    </Popover>
  );
}

```

## Example: 配置

side、align、sideOffset でパネルを配置します。収まらない場合は反転・移動して表示を保ちます。arrow はトリガーを指す矢印です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/popover/demos/placement.tsx

```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverSide,
} from "minerva-design";

const SIDES: PopoverSide[] = ["top", "right", "bottom", "left"];

export default function PlacementDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {SIDES.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button color="neutral" variant="outline">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} align="start" sideOffset={10} arrow>
            Placed on the {side}, aligned to the start.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

```
