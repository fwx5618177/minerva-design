# Tooltip

A short text label shown when the user hovers over or focuses an element. Near the viewport edges it flips and shifts to stay visible.

Package: minerva-design@1.20.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tooltip

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "content",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "success",
      "warning"
    ],
    "typeText": "\"success\" | \"warning\" | \"danger\" | \"info\" | \"neutral\" | undefined",
    "typeRef": "type:692e2a50eca8e62a5d33",
    "default": "neutral",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "enum",
    "values": [
      "glass",
      "solid",
      "subtle"
    ],
    "typeText": "\"subtle\" | \"solid\" | \"glass\" | undefined",
    "typeRef": "type:287bb5003e6cef97cce7",
    "default": "solid",
    "required": false
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "enum",
    "values": [
      "default",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"default\" | undefined",
    "typeRef": "type:46f2a20c1bbba0f6b21c",
    "default": "default",
    "required": false
  },
  {
    "name": "enterDelay",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 200,
    "required": false
  },
  {
    "name": "leaveDelay",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:659f12642c99c06e3ef8",
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
  },
  {
    "name": "onOpen",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:78e4e9eb51a16d9ee984",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onClose",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:2f8475e5350f68e0d933",
    "parameters": [],
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

## TooltipProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "leaveDelay",
    "source": "packages/native/src/components/Tooltip/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
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

## API

```json
{
  "native:TooltipProps": {
    "source": "native/src/components/Tooltip/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactElement<ButtonProps>",
        "required": true
      },
      {
        "name": "content",
        "type": "ReactNode",
        "required": true
      },
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
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "color",
        "type": "Exclude<NativeColor, \"primary\">",
        "required": false,
        "default": "\"neutral\""
      },
      {
        "name": "variant",
        "type": "\"solid\" | \"subtle\" | \"glass\"",
        "required": false,
        "default": "\"solid\""
      },
      {
        "name": "shape",
        "type": "\"default\" | \"rounded\" | \"square\"",
        "required": false,
        "default": "\"default\""
      },
      {
        "name": "enterDelay",
        "type": "number",
        "required": false,
        "default": "200"
      },
      {
        "name": "leaveDelay",
        "type": "number",
        "required": false,
        "default": "0"
      },
      {
        "name": "onOpen",
        "type": "() => void",
        "required": false
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": false
      },
      {
        "name": "ref",
        "type": "Ref<TooltipRef>",
        "required": false
      }
    ]
  },
  "native:TooltipProviderProps": {
    "source": "native/src/components/Tooltip/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "enterDelay",
        "type": "number",
        "required": false
      },
      {
        "name": "leaveDelay",
        "type": "number",
        "required": false
      }
    ]
  }
}
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

## Example: Basic usage

Wrap a focusable element. The tooltip shows on hover and on keyboard focus, and Escape closes it, even when it was opened by hover.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tooltip/native/basic.tsx

```tsx
import { Tooltip, TooltipProvider, Button } from "minerva-design/native";
export default function Basic() {
  return (
    <TooltipProvider>
      <Tooltip content="Long press to read contextual help">
        <Button variant="outline">Help</Button>
      </Tooltip>
    </TooltipProvider>
  );
}

```
