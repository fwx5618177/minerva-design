# Popover

Un panneau flottant ouvert au clic et ancré à son déclencheur, pour du contenu interactif comme des filtres ou un menu de compte. Contrairement à Tooltip, il contient des éléments focalisables et gère lui-même le focus, Échap et les clics extérieurs ; dans une Modal, il se ferme en premier.

Package: minerva-design@1.23.1

Renderer: weapp

Locale: fr

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

## Popover

Support: beta

Controlled/default tap popup; trigger/anchor/content slots, native selectorQuery placement, four sides/alignment/offsets, collision flip/shift, width matching, arrows, forceMount, modal backdrop, configured outside veto and reposition(). Native view/backdrop replaces DOM portal, focus trap and browser focus/pointer event objects; owner-triggered content/scroll changes can call reposition(). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/popover/index",
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
    "name": "content",
    "typeText": "string",
    "required": false,
    "default": ""
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
    "default": "bottom"
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
    "default": "bottom"
  },
  {
    "name": "align",
    "typeText": "string",
    "required": false,
    "default": "center"
  },
  {
    "name": "sideOffset",
    "typeText": "number",
    "required": false,
    "default": 6
  },
  {
    "name": "alignOffset",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "collisionPadding",
    "typeText": "number",
    "required": false,
    "default": 8
  },
  {
    "name": "matchAnchorWidth",
    "typeText": "unknown",
    "required": false,
    "default": false
  },
  {
    "name": "arrow",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "modal",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "default": false
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
    "name": "interactoutside",
    "typeText": "{}",
    "description": "Outside native tap before dismissal."
  },
  {
    "name": "positionchange",
    "typeText": "{ side: string; left: number; top: number; availableWidth: number; availableHeight: number }",
    "description": "Measured native placement after flip/shift."
  }
]
```

### slots

```json
[
  {
    "name": "anchor"
  },
  {
    "name": "trigger"
  },
  {
    "name": "default"
  }
]
```

## PopoverAnchor

Support: n/a

Native composition uses Popover anchor slot as a measured wrapper alongside the trigger slot. Native wrapper rectangles replace DOM refs/asChild. Use Popover props/slots for the native equivalent.

## PopoverClose

Support: n/a

Native composition uses Popover: built-in close and openchange=false. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Popover props/slots for the native equivalent.

## PopoverContent

Support: n/a

Native composition uses Popover default slot and side/align/collisionPadding/matchAnchorWidth/arrow/forceMount props. Native overlay replaces DOM portal and browser focus hooks. Use Popover props/slots for the native equivalent.

## PopoverTrigger

Support: n/a

Native composition uses Popover trigger slot wired to controlled/default open state. No DOM asChild/ref merging. Use Popover props/slots for the native equivalent.

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
