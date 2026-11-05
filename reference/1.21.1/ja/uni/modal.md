# Modal モーダル

ページを中断して一つの作業に集中させるダイアログです。フォーカスは内部に閉じ込められ、Escape や背景クリックで閉じ、閉じるとフォーカスは開いた要素に戻ります。狭い画面ではボトムシートになります。

Package: minerva-design@1.21.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Modal

Support: beta

Controlled/default dialog using the shared Drawer surface, title/description and authored heading linkage, all width sizes with responsive bottom sheet, forceMount, close label/hide action, role and modal/nonmodal semantics; cancelable outside/Escape/autofocus, busy guards, declarative/compound opener recovery. Native hosts do not expose DOM inert, document-wide focus trapping or React asChild cloning. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Modal"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"xlarge\" | \"full\" | undefined",
    "required": false
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\" | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
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
    "name": "closeOnOverlayClick",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "confirmLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "cancelLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "forceMount",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "modal",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "close",
    "typeText": "any[]"
  },
  {
    "name": "openChange",
    "typeText": "any[]"
  },
  {
    "name": "update:open",
    "typeText": "any[]"
  },
  {
    "name": "confirm",
    "typeText": "any[]"
  },
  {
    "name": "cancel",
    "typeText": "any[]"
  },
  {
    "name": "openAutoFocus",
    "typeText": "any[]"
  },
  {
    "name": "closeAutoFocus",
    "typeText": "any[]"
  },
  {
    "name": "escapeKeyDown",
    "typeText": "any[]"
  },
  {
    "name": "pointerDownOutside",
    "typeText": "any[]"
  },
  {
    "name": "interactOutside",
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
    "name": "title",
    "typeText": "{}"
  },
  {
    "name": "description",
    "typeText": "{}"
  },
  {
    "name": "footer",
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

## ModalBody

Support: beta

Modal compound body with injected reactive root state and native slot content. DOM portals and document focus trapping do not apply to native views. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "default",
    "typeText": "{}"
  }
]
```

## ModalClose

Support: beta

Disabled-aware native close button; consumer click runs before close and can preventDefault. React asChild element cloning maps to native button content slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
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

## ModalContent

Support: beta

Complete Modal content props and slots forwarded into shared surface; compound root owns open/modal state and registered trigger recovery. Native fixed surface replaces React DOM portal and asChild behavior. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"xlarge\" | \"full\" | undefined",
    "required": false
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\" | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
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
    "name": "closeOnOverlayClick",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "confirmLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "cancelLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "forceMount",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "modal",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "overlayClassName",
    "typeText": "string | undefined",
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
  },
  {
    "name": "trigger",
    "typeText": "{}"
  },
  {
    "name": "title",
    "typeText": "{}"
  },
  {
    "name": "description",
    "typeText": "{}"
  },
  {
    "name": "footer",
    "typeText": "{}"
  }
]
```

## ModalFooter

Support: beta

Modal compound footer with injected reactive root state and native slot content. DOM portals and document focus trapping do not apply to native views. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "default",
    "typeText": "{}"
  }
]
```

## ModalHeader

Support: beta

Authored accessible heading registered as the enclosing surface dialog name. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ModalHeader"
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

## ModalRoot

Support: beta

Controlled/default open and modal context with registered opener. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "modal",
    "typeText": "boolean | undefined",
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
    "typeText": "{ open: boolean; }"
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

## ModalTrigger

Support: beta

Disabled-aware native trigger that registers the focus return target. React asChild maps to native button content slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "disabled",
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
