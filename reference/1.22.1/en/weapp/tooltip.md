# Tooltip

A short text label shown when the user hovers over or focuses an element. Near the viewport edges it flips and shifts to stay visible.

Package: minerva-design@1.22.1

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tooltip

Support: beta

Controlled/default native touch tooltip with open/close/toggle instance methods, enter/leave timers, 12 placements, offset, color/variant/shape/animation/arrow/disable and content slot. Native touch replaces hover/focus; followCursor/asChild/DOM content refs are not available. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/tooltip/index",
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
    "default": "top"
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "neutral"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "solid"
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": "default"
  },
  {
    "name": "animation",
    "typeText": "string",
    "required": false,
    "default": "fade"
  },
  {
    "name": "enterDelay",
    "typeText": "number",
    "required": false,
    "default": 200
  },
  {
    "name": "leaveDelay",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "offset",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "zIndex",
    "typeText": "number",
    "required": false,
    "default": 1500
  },
  {
    "name": "arrow",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "contentClassName",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
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
    "name": "open",
    "typeText": "{}",
    "description": "Open requested by native touch or instance method."
  },
  {
    "name": "close",
    "typeText": "{}",
    "description": "Close requested by native touch or instance method."
  }
]
```

### slots

```json
[
  {
    "name": "default"
  },
  {
    "name": "content"
  }
]
```

## TooltipProvider

Support: n/a

Native composition uses Tooltip: explicit enterDelay/leaveDelay and controlled/default open; native tap and long-press timers. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Tooltip props/slots for the native equivalent.

## CSS variables

```json
{
  "css:Tooltip": {
    "kind": "cssVars",
    "source": "react/src/components/Tooltip",
    "vars": [
      {
        "name": "--tooltip-max-width",
        "description": "Maximum width (capped by the viewport)"
      },
      {
        "name": "--tooltip-padding",
        "description": "Padding (every shape)"
      },
      {
        "name": "--tooltip-radius",
        "description": "Corner radius (defaults to the radius of the shape)"
      },
      {
        "name": "--tooltip-font-size",
        "description": "Font size"
      },
      {
        "name": "--tooltip-bg",
        "description": "Background (gradients allowed; every variant)"
      },
      {
        "name": "--tooltip-color",
        "description": "Text color (every variant)"
      },
      {
        "name": "--tooltip-shadow",
        "description": "Shadow (defaults to --shadow-md, --shadow-lg for the glass variant)"
      },
      {
        "name": "--tooltip-z-index",
        "description": "Stacking order (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
