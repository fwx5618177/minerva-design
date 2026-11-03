# Modal 模态框

打断页面、聚焦单一任务的对话框。焦点被锁定在内部，Escape 和点击遮罩可关闭，关闭后焦点回到打开它的元素。窄屏下以底部弹层呈现。

Package: minerva-design@1.19.3

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Modal

Support: beta

Controlled/default native modal with trigger, header/body/footer slots, five sizes, forceMount, modal/nonmodal backdrop, close labels and configured outside dismissal veto. DOM portals and document focus trapping do not apply to native views. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/modal/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "description",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "closeOnOverlayClick",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "placement",
    "typeText": "string",
    "required": false,
    "default": "right"
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "side",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "modal",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "closeLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "hiddenDescription",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "role",
    "typeText": "string",
    "required": false,
    "default": "dialog"
  },
  {
    "name": "overlayClassName",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
  },
  {
    "name": "close",
    "typeText": "{ reason: 'trigger' | 'close' | 'overlay' }",
    "description": "Close reason."
  },
  {
    "name": "interactoutside",
    "typeText": "{}",
    "description": "Native backdrop interaction before configured veto."
  },
  {
    "name": "confirm"
  },
  {
    "name": "cancel"
  }
]
```

### slots

```json
[
  {
    "name": "trigger"
  },
  {
    "name": "header"
  },
  {
    "name": "default"
  },
  {
    "name": "footer"
  }
]
```

## ModalBody

Support: n/a

Native composition uses Modal: default content slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Modal props/slots for the native equivalent.

## ModalClose

Support: n/a

Native composition uses Modal: built-in close action emits openchange=false. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Modal props/slots for the native equivalent.

## ModalContent

Support: n/a

Native composition uses Modal: default slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Modal props/slots for the native equivalent.

## ModalFooter

Support: n/a

Native composition uses Modal: footer slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Modal props/slots for the native equivalent.

## ModalHeader

Support: n/a

Native composition uses Modal: title/description. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Modal props/slots for the native equivalent.

## ModalRoot

Support: n/a

Native composition uses Modal: controlled open and openchange. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Modal props/slots for the native equivalent.

## ModalTrigger

Support: n/a

Native composition uses Modal: parent button updates open. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Modal props/slots for the native equivalent.

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
