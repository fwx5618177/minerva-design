# Drawer

Un panneau qui glisse depuis un bord de la fenêtre pour des tâches secondaires comme les filtres ou les détails. Il se comporte comme une modale : focus piégé, Échap, clic sur le fond et retour du focus.

Package: minerva-design@1.21.1

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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
