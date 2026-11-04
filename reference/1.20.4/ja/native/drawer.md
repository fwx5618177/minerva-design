# Drawer ドロワー

ビューポートの端からスライドして現れるパネルで、フィルターや詳細などの補助的な作業に使います。モーダルと同様にフォーカスの閉じ込め、Escape、背景クリック、フォーカスの復帰に対応します。

Package: minerva-design@1.20.4

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Drawer

Support: beta

Popup / BottomSheet: placement bottom by default on mobile

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Popup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state"
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "placement",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "center",
      "left",
      "right",
      "top"
    ],
    "typeText": "OverlayPlacement | undefined",
    "typeRef": "type:f9bc4badf1d35967ab46",
    "default": "bottom",
    "required": false,
    "description": "Edge the panel slides in from (`center`: a centered card). Mobile default \"bottom\" (a bottom sheet); the web Drawer slides from the right"
  },
  {
    "name": "side",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "\"top\" | \"right\" | \"bottom\" | \"left\" | undefined",
    "typeRef": "type:dd4623139902ea8324ab",
    "required": false,
    "description": "Web Drawer name of `placement` (used when `placement` is not set)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "enum",
    "values": [
      "full",
      "large",
      "medium",
      "small"
    ],
    "typeText": "PopupSize | undefined",
    "typeRef": "type:1b5917d932470c978de0",
    "default": "medium",
    "required": false,
    "description": "Size preset: the width of a side panel, the maximum height of a top / bottom sheet (`full`: the whole screen)"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title (also the accessible name of the panel)"
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text under the title"
  },
  {
    "name": "footer",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content pinned under the scrolling body (e.g. buttons)"
  },
  {
    "name": "round",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Rounds the panel corners on its open edges"
  },
  {
    "name": "hideCloseButton",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the close (×) button"
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button"
  },
  {
    "name": "closeOnMaskPress",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Closes on a press on the mask"
  },
  {
    "name": "safeArea",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pads the panel with the safe-area insets of its edge"
  },
  {
    "name": "showHandle",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the drag handle (visual only) at the top of a bottom sheet"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the panel when there is no string title"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "function",
    "typeText": "((open: boolean, reason?: OverlayCloseReason | undefined) => void) | undefined",
    "typeRef": "type:6d1d29debc6d579aa091",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "reason",
        "position": 1,
        "required": false,
        "rest": false,
        "typeText": "OverlayCloseReason | undefined",
        "typeRef": "type:dee0306bddc4ca67a449"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested open state and, when closing, the reason (\"mask\", \"back\" for the Android back button, \"close-button\")"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Parts/index.tsx",
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

## DrawerContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "testID",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the panel when there is no string title"
  },
  {
    "name": "placement",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "center",
      "left",
      "right",
      "top"
    ],
    "typeText": "OverlayPlacement | undefined",
    "typeRef": "type:f9bc4badf1d35967ab46",
    "default": "bottom",
    "required": false,
    "description": "Edge the panel slides in from (`center`: a centered card). Mobile default \"bottom\" (a bottom sheet); the web Drawer slides from the right"
  },
  {
    "name": "side",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "\"top\" | \"right\" | \"bottom\" | \"left\" | undefined",
    "typeRef": "type:dd4623139902ea8324ab",
    "required": false,
    "description": "Web Drawer name of `placement` (used when `placement` is not set)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "enum",
    "values": [
      "full",
      "large",
      "medium",
      "small"
    ],
    "typeText": "PopupSize | undefined",
    "typeRef": "type:1b5917d932470c978de0",
    "default": "medium",
    "required": false,
    "description": "Size preset: the width of a side panel, the maximum height of a top / bottom sheet (`full`: the whole screen)"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title (also the accessible name of the panel)"
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text under the title"
  },
  {
    "name": "footer",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content pinned under the scrolling body (e.g. buttons)"
  },
  {
    "name": "round",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Rounds the panel corners on its open edges"
  },
  {
    "name": "hideCloseButton",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Hides the close (×) button"
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button"
  },
  {
    "name": "closeOnMaskPress",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Closes on a press on the mask"
  },
  {
    "name": "safeArea",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pads the panel with the safe-area insets of its edge"
  },
  {
    "name": "showHandle",
    "source": "packages/native/src/components/Popup/Popup.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the drag handle (visual only) at the top of a bottom sheet"
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Parts/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Parts/index.tsx",
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
    "source": "packages/native/src/components/Parts/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:caf12e12486e1266ca9d",
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

## DrawerTrigger

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Parts/index.tsx",
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
  "native:PopupProps": {
    "source": "native/src/components/Popup/Popup.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state"
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
        "type": "(open: boolean, reason?: PopupCloseReason) => void",
        "required": false,
        "description": "Called with the requested open state and, when closing, the reason (\"mask\", \"back\" for the Android back button, \"close-button\")"
      },
      {
        "name": "placement",
        "type": "PopupPlacement",
        "required": false,
        "default": "\"bottom\"",
        "description": "Edge the panel slides in from (`center`: a centered card). Mobile default \"bottom\" (a bottom sheet); the web Drawer slides from the right"
      },
      {
        "name": "side",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "required": false,
        "description": "Web Drawer name of `placement` (used when `placement` is not set)"
      },
      {
        "name": "size",
        "type": "PopupSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Size preset: the width of a side panel, the maximum height of a top / bottom sheet (`full`: the whole screen)"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title (also the accessible name of the panel)"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Text under the title"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Panel content"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Content pinned under the scrolling body (e.g. buttons)"
      },
      {
        "name": "round",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Rounds the panel corners on its open edges"
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
        "default": "the \"drawer.close\" message (\"modal.close\" when centered)",
        "description": "Accessible label of the close button"
      },
      {
        "name": "closeOnMaskPress",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Closes on a press on the mask"
      },
      {
        "name": "safeArea",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Pads the panel with the safe-area insets of its edge"
      },
      {
        "name": "showHandle",
        "type": "boolean",
        "required": false,
        "default": "true for placement \"bottom\"",
        "description": "Shows the drag handle (visual only) at the top of a bottom sheet"
      },
      {
        "name": "accessibilityLabel",
        "type": "string",
        "required": false,
        "description": "Accessible name of the panel when there is no string title"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the panel"
      },
      {
        "name": "testID",
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

## Example: 基本的な使い方

open と onOpenChange で制御し、本文と操作用フッターを配置します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/native/basic.tsx

```tsx
import { Text } from "react-native";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
} from "minerva-design/native";
export default function Basic() {
  return (
    <DrawerRoot>
      <DrawerTrigger>Open details</DrawerTrigger>
      <DrawerContent title="Details">
        <DrawerHeader>
          <Text>Project details</Text>
        </DrawerHeader>
        <DrawerBody>
          <Text>Native overlay content.</Text>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
}

```
