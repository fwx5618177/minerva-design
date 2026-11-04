# Drawer 抽屉

从视口边缘滑出的面板，用于筛选、详情等次要任务。行为与模态框一致：锁定焦点、Escape、点击遮罩关闭并归还焦点。

Package: minerva-design@1.20.5

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Drawer

Support: beta

Controlled/uncontrolled open, trigger/content slots, all sides and sizes, forceMount, modal/nonmodal outside behavior, loading guards, cancelable outside/Escape/autofocus callbacks and opener focus restoration. Native hosts do not expose DOM inert, document-wide focus trapping or React asChild cloning. Native nonmodal outside interactions can call the exposed dismissOutside handle. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean | undefined",
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
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "closeOnOverlayClick",
    "typeText": "boolean | undefined",
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
    "name": "placement",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "side",
    "typeText": "\"bottom\" | \"top\" | \"left\" | \"right\" | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"full\" | undefined",
    "required": false
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
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
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\" | undefined",
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

## DrawerBody

Support: beta

Drawer compound body with injected reactive root state and native slot content. React side/size/hideCloseButton/forceMount, cancelable dismissal/focus callbacks and nonmodal behavior are not fully mapped yet; browser portals and document focus trapping need platform-specific handling. React Drawer has no drag-resize API. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "default",
    "typeText": "{}"
  }
]
```

## DrawerClose

Support: beta

Disabled-aware native close button; consumer click runs before close and can preventDefault. React asChild element cloning maps to native button content slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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

## DrawerContent

Support: beta

Controlled/uncontrolled open, trigger/content slots, all sides and sizes, forceMount, modal/nonmodal outside behavior, loading guards, cancelable outside/Escape/autofocus callbacks and opener focus restoration. Native hosts do not expose DOM inert, document-wide focus trapping or React asChild cloning. Native nonmodal outside interactions can call the exposed dismissOutside handle. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "closeOnOverlayClick",
    "typeText": "boolean | undefined",
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
    "name": "placement",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "side",
    "typeText": "\"bottom\" | \"top\" | \"left\" | \"right\" | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"full\" | undefined",
    "required": false
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
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
    "name": "role",
    "typeText": "\"dialog\" | \"alertdialog\" | undefined",
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

## DrawerFooter

Support: beta

Drawer compound footer with injected reactive root state and native slot content. React side/size/hideCloseButton/forceMount, cancelable dismissal/focus callbacks and nonmodal behavior are not fully mapped yet; browser portals and document focus trapping need platform-specific handling. React Drawer has no drag-resize API. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "default",
    "typeText": "{}"
  }
]
```

## DrawerHeader

Support: beta

Authored accessible heading registered as the enclosing shared surface dialog name. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "DrawerHeader"
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

## DrawerRoot

Support: beta

Shared controlled/uncontrolled open and modal context; native trigger registration for focus recovery. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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

## DrawerTrigger

Support: beta

Shared controlled/uncontrolled open and modal context; native trigger registration for focus recovery. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
