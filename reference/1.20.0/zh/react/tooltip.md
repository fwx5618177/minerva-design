# Tooltip 文字提示

当用户悬停或聚焦某个元素时显示的简短文字提示。靠近视口边缘时会翻转和平移以保持可见。

Package: minerva-design@1.20.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tooltip

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Tooltip"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "content",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Content displayed inside the tooltip"
  },
  {
    "name": "open",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the tooltip is shown (controlled; pair with onOpenChange)"
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state (uncontrolled)"
  },
  {
    "name": "placement",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "bottom-end",
      "bottom-start",
      "left",
      "left-end",
      "left-start",
      "right",
      "right-end",
      "right-start",
      "top",
      "top-end",
      "top-start"
    ],
    "typeText": "TooltipPlacement | undefined",
    "typeRef": "type:66b4e93683fc8cd06a31",
    "default": "top",
    "required": false,
    "description": "Placement relative to the trigger"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "success",
      "warning"
    ],
    "typeText": "\"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\" | undefined",
    "typeRef": "type:67605a28b15b51d103c7",
    "default": "neutral",
    "required": false,
    "description": "Semantic color of the tooltip. With the `glass` variant the color only tints the border (neutral keeps the plain frosted surface)"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "enum",
    "values": [
      "glass",
      "solid",
      "subtle"
    ],
    "typeText": "TooltipVariant | undefined",
    "typeRef": "type:7762eeb2bd92058b95f9",
    "default": "solid",
    "required": false,
    "description": "Visual style: `solid` (filled; neutral is the inverted contrasting surface), `subtle` (tinted surface with a border) or `glass` (frosted elevated surface)"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "enum",
    "values": [
      "default",
      "rounded",
      "square",
      "thought"
    ],
    "typeText": "TooltipShape | undefined",
    "typeRef": "type:7668498afd4117cbbc41",
    "default": "default",
    "required": false,
    "description": "Shape of the tooltip"
  },
  {
    "name": "animation",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "enum",
    "values": [
      "fade",
      "perspective",
      "scale",
      "shift-away",
      "shift-toward"
    ],
    "typeText": "TooltipAnimation | undefined",
    "typeRef": "type:2a66dfed012390f232b9",
    "default": "fade",
    "required": false,
    "description": "Show / hide animation"
  },
  {
    "name": "enterDelay",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 200,
    "required": false,
    "description": "Delay before showing on hover, in milliseconds"
  },
  {
    "name": "leaveDelay",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Delay before hiding on mouse leave, in milliseconds"
  },
  {
    "name": "offset",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "array",
    "typeText": "[number, number] | undefined",
    "typeRef": "type:e4bdfc457972809a67b5",
    "required": false,
    "description": "Offset as [x, y] in pixels. For top/bottom placements `y` is the gap to the trigger and `x` shifts along it; for left/right placements `x` is the gap and `y` shifts along it. Without it the tooltip sits 8px away."
  },
  {
    "name": "followCursor",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Makes the tooltip follow the mouse cursor"
  },
  {
    "name": "zIndex",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1500,
    "required": false,
    "description": "z-index of the tooltip"
  },
  {
    "name": "arrow",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows an arrow pointing at the trigger"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the tooltip"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the tooltip element"
  },
  {
    "name": "asChild",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Attaches the hover / focus handlers, the ref and `className` directly to the single child element instead of wrapping it in a `<div>` (keeps flex and grid layouts intact). The child must accept a `ref`."
  },
  {
    "name": "contentClassName",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Additional class name of the tooltip (floating) element. To customize the colors, set the `--tooltip-bg` (background, gradients allowed) and `--tooltip-color` (text) custom properties on it"
  },
  {
    "name": "contentRef",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "union",
    "typeText": "Ref<HTMLDivElement> | undefined",
    "typeRef": "type:f1fde64bfecb18ff0f51",
    "parameters": [
      {
        "name": "instance",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "HTMLDivElement | null",
        "typeRef": "type:85c3c0588323940d3ef1"
      }
    ],
    "returnType": {
      "typeText": "void | (() => VoidOrUndefinedOnly)",
      "typeRef": "type:6ec5bf6e8394c6a38fa9"
    },
    "required": false,
    "description": "Ref to the tooltip (floating) element, set while it is shown"
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:d5627f481007b7b0262f",
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
    "description": "Called with the requested open state (hover, focus, Escape, ref methods)"
  },
  {
    "name": "onOpen",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:2ba53e8b3b177cd47aed",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the tooltip opens from hover or focus"
  },
  {
    "name": "onClose",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:6e2472fe200f0e09bd8d",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the tooltip closes from mouse leave, blur or Escape"
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

## TooltipProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "TooltipProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "enterDelay",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Default delay before showing on hover, in milliseconds, for every Tooltip inside that does not set `enterDelay`"
  },
  {
    "name": "leaveDelay",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Default delay before hiding on mouse leave, in milliseconds, for every Tooltip inside that does not set `leaveDelay`"
  },
  {
    "name": "skipDelay",
    "source": "packages/react/src/components/Tooltip/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 300,
    "required": false,
    "description": "When another tooltip of the provider closed less than this many milliseconds ago, the next one opens without waiting for its enter delay"
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
  "TooltipProps": {
    "source": "react/src/components/Tooltip/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "ref",
        "type": "Ref<TooltipRef>",
        "required": false,
        "description": "Imperative handle with open / close / toggle"
      },
      {
        "name": "content",
        "type": "ReactNode",
        "required": true,
        "description": "Content displayed inside the tooltip"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "The element that triggers the tooltip; prefer a focusable element"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Whether the tooltip is shown (controlled; pair with onOpenChange)"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called with the requested open state (hover, focus, Escape, ref methods)"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state (uncontrolled)"
      },
      {
        "name": "placement",
        "type": "TooltipPlacement",
        "required": false,
        "default": "\"top\"",
        "description": "Placement relative to the trigger"
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"neutral\" | \"info\" | \"success\" | \"warning\" | \"danger\">",
        "required": false,
        "default": "\"neutral\"",
        "description": "Semantic color of the tooltip. With the `glass` variant the color only tints the border (neutral keeps the plain frosted surface)"
      },
      {
        "name": "variant",
        "type": "TooltipVariant",
        "required": false,
        "default": "\"solid\"",
        "description": "Visual style: `solid` (filled; neutral is the inverted contrasting surface), `subtle` (tinted surface with a border) or `glass` (frosted elevated surface)"
      },
      {
        "name": "shape",
        "type": "TooltipShape",
        "required": false,
        "default": "\"default\"",
        "description": "Shape of the tooltip"
      },
      {
        "name": "animation",
        "type": "TooltipAnimation",
        "required": false,
        "default": "\"fade\"",
        "description": "Show / hide animation"
      },
      {
        "name": "enterDelay",
        "type": "number",
        "required": false,
        "default": "200",
        "description": "Delay before showing on hover, in milliseconds"
      },
      {
        "name": "leaveDelay",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Delay before hiding on mouse leave, in milliseconds"
      },
      {
        "name": "offset",
        "type": "[number, number]",
        "required": false,
        "description": "Offset as [x, y] in pixels. For top/bottom placements `y` is the gap to the trigger and `x` shifts along it; for left/right placements `x` is the gap and `y` shifts along it. Without it the tooltip sits 8px away."
      },
      {
        "name": "followCursor",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the tooltip follow the mouse cursor"
      },
      {
        "name": "zIndex",
        "type": "number",
        "required": false,
        "default": "1500",
        "description": "z-index of the tooltip"
      },
      {
        "name": "arrow",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows an arrow pointing at the trigger"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the tooltip"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name of the trigger wrapper"
      },
      {
        "name": "onOpen",
        "type": "() => void",
        "required": false,
        "description": "Called when the tooltip opens from hover or focus"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": false,
        "description": "Called when the tooltip closes from mouse leave, blur or Escape"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the tooltip element"
      },
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Attaches the hover / focus handlers, the ref and `className` directly to the single child element instead of wrapping it in a `<div>` (keeps flex and grid layouts intact). The child must accept a `ref`."
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false,
        "description": "Additional class name of the tooltip (floating) element. To customize the colors, set the `--tooltip-bg` (background, gradients allowed) and `--tooltip-color` (text) custom properties on it"
      },
      {
        "name": "contentRef",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the tooltip (floating) element, set while it is shown"
      }
    ]
  },
  "TooltipRef": {
    "source": "react/src/components/Tooltip/types.ts",
    "description": "Imperative handle exposed through `ref`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "() => void",
        "required": true,
        "description": "Opens the tooltip"
      },
      {
        "name": "close",
        "type": "() => void",
        "required": true,
        "description": "Closes the tooltip"
      },
      {
        "name": "toggle",
        "type": "() => void",
        "required": true,
        "description": "Toggles the tooltip"
      }
    ]
  },
  "TooltipProviderProps": {
    "source": "react/src/components/Tooltip/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "enterDelay",
        "type": "number",
        "required": false,
        "description": "Default delay before showing on hover, in milliseconds, for every Tooltip inside that does not set `enterDelay`"
      },
      {
        "name": "leaveDelay",
        "type": "number",
        "required": false,
        "description": "Default delay before hiding on mouse leave, in milliseconds, for every Tooltip inside that does not set `leaveDelay`"
      },
      {
        "name": "skipDelay",
        "type": "number",
        "required": false,
        "default": "300",
        "description": "When another tooltip of the provider closed less than this many milliseconds ago, the next one opens without waiting for its enter delay"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Content of the provider"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Tooltip": {
    "kind": "cssVars",
    "source": "react/src/components/Tooltip",
    "vars": [
      {
        "name": "--tooltip-max-width",
        "description": "Maximum width (capped by the viewport)"
      },
      {
        "name": "--tooltip-padding",
        "description": "Padding (every shape)"
      },
      {
        "name": "--tooltip-radius",
        "description": "Corner radius (defaults to the radius of the shape)"
      },
      {
        "name": "--tooltip-font-size",
        "description": "Font size"
      },
      {
        "name": "--tooltip-bg",
        "description": "Background (gradients allowed; every variant)"
      },
      {
        "name": "--tooltip-color",
        "description": "Text color (every variant)"
      },
      {
        "name": "--tooltip-shadow",
        "description": "Shadow (defaults to --shadow-md, --shadow-lg for the glass variant)"
      },
      {
        "name": "--tooltip-z-index",
        "description": "Stacking order (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 动画

选择提示出现和消失的动画。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/animations.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

const animations = [
  "fade",
  "scale",
  "shift-away",
  "shift-toward",
  "perspective",
] as const;

export default function AnimationsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {animations.map((animation) => (
        <Tooltip key={animation} content={animation} animation={animation}>
          <Button color="neutral" variant="outline" size="small">
            {animation}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}

```

## Example: asChild

asChild 将提示直接挂到子元素上，不额外包裹元素，因此不会破坏 flex 和 grid 布局。contentClassName 用于设置提示的样式。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/as-child.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

export default function AsChildDemo() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Tooltip content="Attached to the button itself" asChild>
        <Button color="neutral" variant="outline">
          No wrapper
        </Button>
      </Tooltip>
      <Tooltip
        content="Frosted, follows the theme"
        variant="glass"
        placement="bottom-start"
        contentClassName="my-tooltip"
        asChild
      >
        <Button color="neutral" variant="outline">
          Glass variant
        </Button>
      </Tooltip>
    </div>
  );
}

```

## Example: 基础用法

包裹一个可聚焦的元素。提示会在悬停和键盘聚焦时显示，按 Escape 即可关闭，即使它是由悬停打开的。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/basic.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

export default function BasicDemo() {
  return (
    <Tooltip content="Save your changes">
      <Button>Hover or focus me</Button>
    </Tooltip>
  );
}

```

## Example: 颜色

color 选择语义色：neutral（默认）、info、success、warning 或 danger。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/colors.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

const colors = ["neutral", "info", "success", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {colors.map((color) => (
        <Tooltip key={color} content={`A ${color} tooltip`} color={color}>
          <Button color="neutral" variant="outline" size="small">
            {color}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}

```

## Example: 受控与命令式

通过 open 和 onOpenChange 控制可见性（悬停、聚焦和 Escape 仍会请求变化），或调用 TooltipRef 上的 open / close / toggle。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/controlled.tsx

```tsx
import { useRef, useState } from "react";
import { Button, Tooltip, type TooltipRef } from "minerva-design";

export default function ControlledDemo() {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<TooltipRef>(null);

  return (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tooltip
          content="Controlled with the open prop"
          open={open}
          onOpenChange={setOpen}
          placement="bottom"
        >
          <span>Controlled</span>
        </Tooltip>
        <Button size="small" onClick={() => setOpen((prev) => !prev)}>
          {open ? "Hide" : "Show"}
        </Button>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tooltip
          ref={tooltipRef}
          content="Opened through the ref"
          placement="bottom"
        >
          <span>Imperative</span>
        </Tooltip>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => tooltipRef.current?.toggle()}
        >
          Toggle via ref
        </Button>
      </div>
    </div>
  );
}

```

## Example: 自定义颜色、箭头和偏移

通过 contentClassName 在提示上设置 --tooltip-bg（支持纯色和 CSS 渐变）与 --tooltip-color 自定义属性；arrow 添加指向触发元素的箭头；offset 设置与触发元素的间距（默认 8px）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/custom-colors.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

// The tooltip is portalled to <body>: set the custom properties on the
// tooltip itself through contentClassName.
const css = `
.brand-tooltip {
  --tooltip-bg: #7c3aed;
  --tooltip-color: #fff;
}
.gradient-tooltip {
  --tooltip-bg: linear-gradient(135deg, #ec4899, #f59e0b);
  --tooltip-color: #fff;
}
`;

export default function CustomColorsDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <style>{css}</style>
      <Tooltip content="Solid color" contentClassName="brand-tooltip" arrow>
        <Button color="neutral" variant="outline" size="small">
          Solid
        </Button>
      </Tooltip>
      <Tooltip
        content="Gradient background"
        contentClassName="gradient-tooltip"
        arrow
      >
        <Button color="neutral" variant="outline" size="small">
          Gradient
        </Button>
      </Tooltip>
      <Tooltip content="Further away" offset={[0, 20]}>
        <Button color="neutral" variant="outline" size="small">
          Offset 20px
        </Button>
      </Tooltip>
    </div>
  );
}

```

## Example: 延迟与禁用

enterDelay 和 leaveDelay 控制悬停时机；disabled 关闭提示。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/delays.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

export default function DelaysDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tooltip content="Shows immediately" enterDelay={0}>
        <Button color="neutral" variant="outline" size="small">
          No delay
        </Button>
      </Tooltip>
      <Tooltip
        content="Shows after 800ms, hides after 500ms"
        enterDelay={800}
        leaveDelay={500}
      >
        <Button color="neutral" variant="outline" size="small">
          Slow
        </Button>
      </Tooltip>
      <Tooltip content="Never shown" disabled>
        <Button color="neutral" variant="outline" size="small">
          Disabled tooltip
        </Button>
      </Tooltip>
    </div>
  );
}

```

## Example: 事件

onOpen 和 onClose 会在悬停、聚焦、失焦及按下 Escape 时触发。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/events.tsx

```tsx
import { useState } from "react";
import { Button, Tooltip } from "minerva-design";

export default function EventsDemo() {
  const [opened, setOpened] = useState(0);
  const [closed, setClosed] = useState(0);

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Tooltip
        content="Press Escape to close"
        onOpen={() => setOpened((prev) => prev + 1)}
        onClose={() => setClosed((prev) => prev + 1)}
      >
        <Button color="neutral" variant="outline">
          Hover or focus me
        </Button>
      </Tooltip>
      <span>
        onOpen: {opened} · onClose: {closed}
      </span>
    </div>
  );
}

```

## Example: 跟随鼠标

开启 followCursor 后，提示会跟随鼠标指针移动。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/follow-cursor.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

export default function FollowCursorDemo() {
  return (
    <Tooltip content="I follow your cursor" followCursor>
      <Button
        color="neutral"
        variant="outline"
        type="button"
        style={{
          width: 280,
          height: 100,
          display: "grid",
          placeItems: "center",
          border: "1px dashed currentColor",
          borderRadius: 8,
          background: "transparent",
          color: "inherit",
          font: "inherit",
        }}
      >
        Move the mouse here
      </Button>
    </Tooltip>
  );
}

```

## Example: 位置

围绕触发元素的十二种位置。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/placements.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

const placements = [
  "top-start",
  "top",
  "top-end",
  "left-start",
  "left",
  "left-end",
  "right-start",
  "right",
  "right-end",
  "bottom-start",
  "bottom",
  "bottom-end",
] as const;

export default function PlacementsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, max-content)",
        gap: 8,
      }}
    >
      {placements.map((placement) => (
        <Tooltip
          key={placement}
          content={placement}
          placement={placement}
          arrow
        >
          <Button color="neutral" variant="outline" size="small">
            {placement}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}

```

## Example: TooltipProvider

TooltipProvider 为内部的提示设置默认延迟；在提示之间快速移动时，下一个提示会立即打开。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/provider.tsx

```tsx
import { Button, Tooltip, TooltipProvider } from "minerva-design";

export default function ProviderDemo() {
  return (
    <TooltipProvider enterDelay={500} skipDelay={300}>
      <div style={{ display: "flex", gap: 8 }}>
        {["Bold", "Italic", "Underline"].map((label) => (
          <Tooltip key={label} content={label} asChild>
            <Button color="neutral" variant="outline" size="small">
              {label[0]}
            </Button>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

```

## Example: 形状

默认、圆角、方形和气泡形状。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/shapes.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

const shapes = ["default", "rounded", "square", "thought"] as const;

export default function ShapesDemo() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {shapes.map((shape) => (
        <Tooltip key={shape} content={`Shape: ${shape}`} shape={shape}>
          <Button color="neutral" variant="outline" size="small">
            {shape}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
}

```

## Example: 变体

variant 选择视觉样式：solid（默认，实心填充；neutral 为与主题形成对比的反色表面）、subtle（带边框的浅色调表面）或 glass（跟随主题的磨砂表面，颜色只为边框着色）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/demos/variants.tsx

```tsx
import { Button, Tooltip } from "minerva-design";

const variants = ["solid", "subtle", "glass"] as const;
const colors = ["neutral", "info", "danger"] as const;

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {variants.map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          {colors.map((color) => (
            <Tooltip
              key={color}
              content={`${variant} · ${color}`}
              variant={variant}
              color={color}
            >
              <Button color="neutral" variant="outline" size="small">
                {variant} {color}
              </Button>
            </Tooltip>
          ))}
        </div>
      ))}
    </div>
  );
}

```
