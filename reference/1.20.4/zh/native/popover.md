# Popover 气泡卡片

点击触发、锚定在触发器上的浮层面板，用于筛选器、账户菜单等可交互内容。与 Tooltip 不同，它可以包含可聚焦内容，并自行管理焦点、Escape 和外部点击；在 Modal 中会先于 Modal 关闭。

Package: minerva-design@1.20.4

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Popover

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Popover/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Popover/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Popover/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:e31433a604bbaf909b7e",
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

## PopoverAnchor

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "PopoverAnchor"
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

## PopoverClose

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Popover/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "NativeColor | undefined",
    "typeRef": "type:c1c4fb1afcf9f8ec5869",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the button"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "ghost",
      "link",
      "outline",
      "solid"
    ],
    "typeText": "ButtonVariant | undefined",
    "typeRef": "type:1e3b5884a3a7673a4553",
    "default": "solid",
    "required": false,
    "description": "Visual style: `solid` (filled), `outline` (border only), `ghost` (transparent, tinted while pressed) or `link` (text link look)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xlarge",
      "xsmall"
    ],
    "typeText": "ButtonSize | undefined",
    "typeRef": "type:4f1445f517e28a7afd60",
    "default": "medium",
    "required": false,
    "description": "Button size (heights from the `--control-height-*` tokens)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the button"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner and ignores presses (`accessibilityState.busy`)"
  },
  {
    "name": "loadingText",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown instead of the label while loading"
  },
  {
    "name": "startIcon",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element rendered before the label"
  },
  {
    "name": "endIcon",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element rendered after the label"
  },
  {
    "name": "fullWidth",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stretches the button to the full width of its container"
  },
  {
    "name": "active",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the button in its pressed / active state"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "typeRef": "type:bc311df462bffff00236",
    "default": "rounded",
    "required": false,
    "description": "Preset shape: `rounded` (theme radius), `square` (no radius) or `circle` (pill; a square button when the label is an icon)"
  },
  {
    "name": "textStyle",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the label text"
  }
]
```

### events

```json
[
  {
    "name": "onPress",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:79e82a664defccdac2e6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GestureResponderEvent",
        "typeRef": "type:2a25eb9466bc75075bdf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on press (not while disabled or loading)"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Popover/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "role",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "enum",
    "values": [
      "alertdialog",
      "dialog"
    ],
    "typeText": "\"dialog\" | \"alertdialog\" | undefined",
    "typeRef": "type:2cc2e24324879bcc4737",
    "default": "dialog",
    "required": false,
    "description": "`alertdialog` for confirmations that need an answer"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "enum",
    "values": [
      "full",
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | \"full\" | undefined",
    "typeRef": "type:336d1e282a12d0ceef8d",
    "default": "medium",
    "required": false,
    "description": "Width preset (`full`: the whole screen)"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title (also the accessible name of the dialog)"
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text under the title"
  },
  {
    "name": "footer",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom footer, replacing the confirm / cancel buttons"
  },
  {
    "name": "hideCloseButton",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the close (×) button"
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button"
  },
  {
    "name": "closeOnMaskPress",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Closes on a press on the mask"
  },
  {
    "name": "confirmLabel",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the confirm button (shown when set or with `onConfirm`)"
  },
  {
    "name": "cancelLabel",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the cancel button (shown when set or with `onCancel`)"
  },
  {
    "name": "confirmColor",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:56ead6e033d723e3d471",
    "default": "primary",
    "required": false,
    "description": "Color of the confirm button"
  },
  {
    "name": "confirmLoading",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Spinner on the confirm button; the dialog stays open"
  }
]
```

### events

```json
[
  {
    "name": "onConfirm",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:3ec8fe0c6c6fd4def411",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called by the confirm button; the dialog then closes unless `confirmLoading`"
  },
  {
    "name": "onCancel",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:796ccf30b40fb762003e",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called by the cancel button; the dialog then closes"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Popover/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "NativeColor | undefined",
    "typeRef": "type:c1c4fb1afcf9f8ec5869",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the button"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "ghost",
      "link",
      "outline",
      "solid"
    ],
    "typeText": "ButtonVariant | undefined",
    "typeRef": "type:1e3b5884a3a7673a4553",
    "default": "solid",
    "required": false,
    "description": "Visual style: `solid` (filled), `outline` (border only), `ghost` (transparent, tinted while pressed) or `link` (text link look)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xlarge",
      "xsmall"
    ],
    "typeText": "ButtonSize | undefined",
    "typeRef": "type:4f1445f517e28a7afd60",
    "default": "medium",
    "required": false,
    "description": "Button size (heights from the `--control-height-*` tokens)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the button"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner and ignores presses (`accessibilityState.busy`)"
  },
  {
    "name": "loadingText",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown instead of the label while loading"
  },
  {
    "name": "startIcon",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element rendered before the label"
  },
  {
    "name": "endIcon",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element rendered after the label"
  },
  {
    "name": "fullWidth",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stretches the button to the full width of its container"
  },
  {
    "name": "active",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the button in its pressed / active state"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "typeRef": "type:bc311df462bffff00236",
    "default": "rounded",
    "required": false,
    "description": "Preset shape: `rounded` (theme radius), `square` (no radius) or `circle` (pill; a square button when the label is an icon)"
  },
  {
    "name": "textStyle",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the label text"
  }
]
```

### events

```json
[
  {
    "name": "onPress",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:79e82a664defccdac2e6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GestureResponderEvent",
        "typeRef": "type:2a25eb9466bc75075bdf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on press (not while disabled or loading)"
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
  "native:PopoverProps": {
    "source": "native/src/components/Popover/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
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
        "name": "children",
        "type": "ReactNode",
        "required": false
      }
    ]
  },
  "native:PopoverTriggerProps": {
    "source": "native/src/components/Popover/index.tsx",
    "kind": "interface",
    "extends": [
      "ButtonProps"
    ],
    "props": [
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false"
      }
    ]
  },
  "native:PopoverContentProps": {
    "source": "native/src/components/Popover/index.tsx",
    "kind": "interface",
    "extends": [
      "Omit<DialogProps, \"open\" | \"defaultOpen\" | \"onOpenChange\">"
    ],
    "props": [
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false
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

## Example: 基础用法

PopoverTrigger 切换面板；焦点移入面板，关闭后回到触发器。PopoverClose 用于关闭。非模态时，在最后一个元素上按 Tab（在第一个元素上按 Shift+Tab）会关闭面板并把焦点移到触发器之后（之前）的元素；焦点不会在面板内循环。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/popover/native/basic.tsx

```tsx
import { Text } from "react-native";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from "minerva-design/native";
export default function Basic() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Details</Button>
      </PopoverTrigger>
      <PopoverContent title="Account">
        <Text>Signed in as Ada.</Text>
        <PopoverClose asChild>
          <Button>Done</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

```
