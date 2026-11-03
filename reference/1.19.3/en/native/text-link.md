# TextLink

A styled native anchor for inline links, quiet navigation and settings rows; asChild styles a router link without nesting anchors.

Package: minerva-design@1.19.3

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## TextLink

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "TextLink"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "href",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "enum",
    "values": [
      "action",
      "default",
      "subtle"
    ],
    "typeText": "\"subtle\" | \"action\" | \"default\" | undefined",
    "typeRef": "type:03c77f4c1ca73b94327c",
    "default": "default",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Specifies the disabled state of the text view for testing purposes."
  }
]
```

### events

```json
[
  {
    "name": "onOpenError",
    "source": "packages/native/src/components/Display/index.tsx",
    "kind": "function",
    "typeText": "((error: unknown) => void) | undefined",
    "typeRef": "type:8c3beffd5a54236fd07f",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "unknown",
        "typeRef": "type:dc96c0cac9f2d6c9a926"
      }
    ],
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

## API

```json
{
  "native:TextLinkProps": {
    "source": "native/src/components/Display/index.tsx",
    "kind": "interface",
    "extends": [
      "TextProps"
    ],
    "props": [
      {
        "name": "href",
        "type": "string",
        "required": false
      },
      {
        "name": "variant",
        "type": "\"default\" | \"subtle\" | \"action\"",
        "required": false,
        "default": "\"default\""
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenError",
        "type": "(error: unknown) => void",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:TextLink": {
    "kind": "cssVars",
    "source": "react/src/components/TextLink",
    "vars": [
      {
        "name": "--text-link-color",
        "description": "Color of the default variant (falls back to --link-color, then --primary-color)"
      },
      {
        "name": "--text-link-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--text-link-text-decoration",
        "description": "Text decoration of the default variant (default: underline)"
      },
      {
        "name": "--text-link-underline-offset",
        "description": "Distance between the text and its underline"
      },
      {
        "name": "--text-link-action-min-height",
        "description": "Minimum height of the action variant"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/text-link/native/basic.tsx

```tsx
import { TextLink } from "minerva-design/native";
export default function Basic() {
  return (
    <TextLink href="https://reactnative.dev/">
      React Native documentation
    </TextLink>
  );
}

```
