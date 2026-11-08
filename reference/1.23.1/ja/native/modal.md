# Modal モーダル

ページを中断して一つの作業に集中させるダイアログです。フォーカスは内部に閉じ込められ、Escape や背景クリックで閉じ、閉じるとフォーカスは開いた要素に戻ります。狭い画面ではボトムシートになります。

Package: minerva-design@1.23.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Modal

Support: beta

Dialog (alias Modal): Android back button closes it

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Dialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state"
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
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
    "name": "testID",
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
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
    "source": "packages/native/src/components/Dialog/Dialog.tsx",
    "kind": "function",
    "typeText": "((open: boolean, reason?: OverlayCloseReason | undefined) => void) | undefined",
    "typeRef": "type:86739563be02f5e85ebe",
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
    "description": "Called with the requested open state and, when closing, the reason (\"mask\", \"back\" for the Android back button, \"close-button\", \"cancel\", \"confirm\")"
  },
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

## ModalBody

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ModalBody"
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

## ModalClose

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ModalClose"
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

## ModalContent

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ModalContent"
  ],
  "kind": "named"
}
```

### props

```json
[
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

## ModalFooter

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ModalFooter"
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

## ModalHeader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ModalHeader"
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

## ModalRoot

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ModalRoot"
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

## ModalTrigger

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ModalTrigger"
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
  "native:DialogProps": {
    "source": "native/src/components/Dialog/Dialog.tsx",
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
        "type": "(open: boolean, reason?: DialogCloseReason) => void",
        "required": false,
        "description": "Called with the requested open state and, when closing, the reason (\"mask\", \"back\" for the Android back button, \"close-button\", \"cancel\", \"confirm\")"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title (also the accessible name of the dialog)"
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
        "description": "Body content"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Custom footer, replacing the confirm / cancel buttons"
      },
      {
        "name": "confirmLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Label of the confirm button (shown when set or with `onConfirm`)"
      },
      {
        "name": "cancelLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Label of the cancel button (shown when set or with `onCancel`)"
      },
      {
        "name": "onConfirm",
        "type": "() => void",
        "required": false,
        "description": "Called by the confirm button; the dialog then closes unless `confirmLoading`"
      },
      {
        "name": "onCancel",
        "type": "() => void",
        "required": false,
        "description": "Called by the cancel button; the dialog then closes"
      },
      {
        "name": "confirmColor",
        "type": "\"primary\" | \"danger\" | \"warning\" | \"success\"",
        "required": false,
        "default": "\"primary\"",
        "description": "Color of the confirm button"
      },
      {
        "name": "confirmLoading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Spinner on the confirm button; the dialog stays open"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\" | \"full\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Width preset (`full`: the whole screen)"
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
        "default": "the \"modal.close\" message",
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
        "name": "role",
        "type": "\"dialog\" | \"alertdialog\"",
        "required": false,
        "default": "\"dialog\"",
        "description": "`alertdialog` for confirmations that need an answer"
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
  },
  "native:ModalRootProps": {
    "source": "native/src/components/Parts/index.tsx",
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
  "native:ModalTriggerProps": {
    "source": "native/src/components/Parts/index.tsx",
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
  }
}
```

## CSS variables

```json
{
  "css:Modal": {
    "kind": "cssVars",
    "source": "react/src/components/Modal",
    "vars": [
      {
        "name": "--modal-width",
        "description": "Width of the panel (every size; defaults to the width of the size, capped by the viewport)"
      },
      {
        "name": "--modal-max-height",
        "description": "Maximum height of the panel (the body scrolls beyond)"
      },
      {
        "name": "--modal-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--modal-radius",
        "description": "Corner radius of the panel (defaults to --radius-xl)"
      },
      {
        "name": "--modal-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--modal-background",
        "description": "Background of the panel"
      },
      {
        "name": "--modal-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

Cancel は削除せずに閉じます。Delete は閉じた後に Record deleted を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/modal/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Dialog, useTheme } from "minerva-design/native";
export default function Basic() {
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <Button onPress={() => setOpen(true)}>Delete record</Button>
      {deleted && (
        <Text role="status" style={{ color: colors["text-color"] }}>
          Record deleted
        </Text>
      )}
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this record?"
        description="The record and its history are removed permanently."
        size="small"
        footer={
          <View
            style={{ gap: 8, flexDirection: "row", justifyContent: "flex-end" }}
          >
            <Button
              color="neutral"
              variant="outline"
              onPress={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={() => {
                setDeleted(true);
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </View>
        }
      >
        <Text style={{ color: colors["text-color"] }}>
          Other team members lose access immediately.
        </Text>
      </Dialog>
    </View>
  );
}

```

## Example: confirm

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/modal/native/confirm.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Dialog, useTheme } from "minerva-design/native";

export default function Confirm() {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState("No answer yet");
  return (
    <View style={{ gap: 12 }}>
      <Button color="danger" variant="outline" onPress={() => setOpen(true)}>
        Delete account
      </Button>
      <Text style={{ color: colors["text-secondary-color"] }}>{result}</Text>
      <Dialog
        role="alertdialog"
        open={open}
        onOpenChange={(next, reason) => {
          setOpen(next);
          if (!next) setResult(`Closed: ${reason}`);
        }}
        hideCloseButton
        title="Delete account?"
        description="Your orders and addresses will be removed. This cannot be undone."
        confirmLabel="Delete"
        confirmColor="danger"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </View>
  );
}

```

## Example: custom-footer

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/modal/native/custom-footer.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Dialog } from "minerva-design/native";

export default function CustomFooter() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onPress={() => setOpen(true)}>
        Rate the app
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size="small"
        title="Enjoying Minerva?"
        footer={
          <View style={{ gap: 8 }}>
            <Button fullWidth onPress={() => setOpen(false)}>
              Rate 5 stars
            </Button>
            <Button
              fullWidth
              variant="ghost"
              color="neutral"
              onPress={() => setOpen(false)}
            >
              Not now
            </Button>
          </View>
        }
      >
        <Text style={{ textAlign: "center" }}>A quick rating helps a lot.</Text>
      </Dialog>
    </>
  );
}

```

## Example: フォーム

Name を編集して Save を押すと Quarterly report の名前が変わり、ボタンにも新しい名前が表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/modal/native/form.tsx

```tsx
import { useState } from "react";
import { Button, Input, Dialog } from "minerva-design/native";
export default function Form() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Quarterly report");
  const [draft, setDraft] = useState(name);
  return (
    <>
      <Button
        onPress={() => {
          setDraft(name);
          setOpen(true);
        }}
      >
        {`Rename “${name}”`}
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Rename document"
        footer={
          <Button
            onPress={() => {
              setName(draft);
              setOpen(false);
            }}
          >
            Save
          </Button>
        }
      >
        <Input label="Name" value={draft} onChange={setDraft} />
      </Dialog>
    </>
  );
}

```
