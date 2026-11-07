# Drawer

A panel that slides in from an edge of the viewport for secondary tasks such as filters or details. Behaves like a modal: focus trap, Escape, backdrop click and focus return.

Package: minerva-design@1.22.3

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

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
