# Drawer

A panel that slides in from an edge of the viewport for secondary tasks such as filters or details. Behaves like a modal: focus trap, Escape, backdrop click and focus return.

Package: minerva-design@1.22.2

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Drawer

Support: beta

Controlled/default native drawer with trigger, close, header/body/footer slots, four sides and sizes, forceMount, modal/nonmodal backdrop, configured outside-dismissal veto and localized close/description. Native view layering replaces document portals, DOM focus trapping and outside focus/keyboard events. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/drawer/index",
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

## DrawerBody

Support: n/a

Native composition uses Drawer: default content slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Drawer props/slots for the native equivalent.

## DrawerClose

Support: n/a

Native composition uses Drawer: built-in close action emits openchange=false. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Drawer props/slots for the native equivalent.

## DrawerContent

Support: n/a

Native composition uses Drawer: default slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Drawer props/slots for the native equivalent.

## DrawerFooter

Support: n/a

Native composition uses Drawer: footer slot. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Drawer props/slots for the native equivalent.

## DrawerHeader

Support: n/a

Native composition uses Drawer: header slot and title/description. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Drawer props/slots for the native equivalent.

## DrawerRoot

Support: n/a

Native composition uses Drawer: controlled open and openchange. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Drawer props/slots for the native equivalent.

## DrawerTrigger

Support: n/a

Native composition uses Drawer: trigger slot requests controlled or default open. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Drawer props/slots for the native equivalent.

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
