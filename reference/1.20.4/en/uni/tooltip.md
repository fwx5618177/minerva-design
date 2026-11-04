# Tooltip

A short text label shown when the user hovers over or focuses an element. Near the viewport edges it flips and shifts to stay visible.

Package: minerva-design@1.20.4

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tooltip

Support: beta

Controlled/default/imperative visibility, hover/focus/native tap, shared delay and skip context, interactive content, measured collision-aware positioning, cursor following, colors/variants/shapes/arrows/animations and labels. Native trigger is a wrapper rather than React child cloning. Pointer hover and keyboard behavior depend on host input capabilities. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Tooltip"
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
    "name": "content",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placement",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "enterDelay",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "leaveDelay",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"info\" | \"success\" | \"warning\" | \"danger\" | \"neutral\" | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"solid\" | \"glass\" | undefined",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"rounded\" | \"default\" | \"square\" | \"thought\" | undefined",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "\"fade\" | \"scale\" | \"shift-away\" | \"shift-toward\" | \"perspective\" | undefined",
    "required": false
  },
  {
    "name": "offset",
    "typeText": "[number, number] | undefined",
    "required": false
  },
  {
    "name": "followCursor",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "zIndex",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "arrow",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "contentClassName",
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
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "openChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "open",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "update:open",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
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
  },
  {
    "name": "content",
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

## TooltipProvider

Support: beta

Real shared enter/leave/skip-delay context consumed by Tooltip on H5; native taps open immediately. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TooltipProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "enterDelay",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "leaveDelay",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "skipDelay",
    "typeText": "number | undefined",
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
