# Box

A polymorphic container with spacing, size, background, radius and shadow shorthands.

Package: minerva-design@1.23.1

Renderer: wc

Locale: en

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

## Box

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/box",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "p",
    "typeText": "BoxSpace | undefined",
    "attribute": "p",
    "required": false
  },
  {
    "name": "px",
    "typeText": "BoxSpace | undefined",
    "attribute": "px",
    "required": false
  },
  {
    "name": "py",
    "typeText": "BoxSpace | undefined",
    "attribute": "py",
    "required": false
  },
  {
    "name": "pt",
    "typeText": "BoxSpace | undefined",
    "attribute": "pt",
    "required": false
  },
  {
    "name": "pr",
    "typeText": "BoxSpace | undefined",
    "attribute": "pr",
    "required": false
  },
  {
    "name": "pb",
    "typeText": "BoxSpace | undefined",
    "attribute": "pb",
    "required": false
  },
  {
    "name": "pl",
    "typeText": "BoxSpace | undefined",
    "attribute": "pl",
    "required": false
  },
  {
    "name": "m",
    "typeText": "BoxSpace | undefined",
    "attribute": "m",
    "required": false
  },
  {
    "name": "mx",
    "typeText": "BoxSpace | undefined",
    "attribute": "mx",
    "required": false
  },
  {
    "name": "my",
    "typeText": "BoxSpace | undefined",
    "attribute": "my",
    "required": false
  },
  {
    "name": "mt",
    "typeText": "BoxSpace | undefined",
    "attribute": "mt",
    "required": false
  },
  {
    "name": "mr",
    "typeText": "BoxSpace | undefined",
    "attribute": "mr",
    "required": false
  },
  {
    "name": "mb",
    "typeText": "BoxSpace | undefined",
    "attribute": "mb",
    "required": false
  },
  {
    "name": "ml",
    "typeText": "BoxSpace | undefined",
    "attribute": "ml",
    "required": false
  },
  {
    "name": "w",
    "typeText": "BoxSize | undefined",
    "attribute": "w",
    "required": false
  },
  {
    "name": "h",
    "typeText": "BoxSize | undefined",
    "attribute": "h",
    "required": false
  },
  {
    "name": "minW",
    "typeText": "BoxSize | undefined",
    "attribute": "min-w",
    "required": false
  },
  {
    "name": "minH",
    "typeText": "BoxSize | undefined",
    "attribute": "min-h",
    "required": false
  },
  {
    "name": "maxW",
    "typeText": "BoxSize | undefined",
    "attribute": "max-w",
    "required": false
  },
  {
    "name": "maxH",
    "typeText": "BoxSize | undefined",
    "attribute": "max-h",
    "required": false
  },
  {
    "name": "bg",
    "typeText": "string | undefined",
    "attribute": "bg",
    "required": false
  },
  {
    "name": "rounded",
    "typeText": "string | undefined",
    "attribute": "rounded",
    "required": false
  },
  {
    "name": "boxShadow",
    "typeText": "string | undefined",
    "attribute": "box-shadow",
    "required": false
  },
  {
    "name": "border",
    "typeText": "string | undefined",
    "attribute": "border",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Content"
  }
]
```

## API

```json
{
  "wc:minerva-box": {
    "kind": "element",
    "source": "web-components/src/components/box/box.ts",
    "className": "MinervaBox",
    "summary": "Container with spacing, size, background, radius and shadow shorthands.",
    "description": "A container with a small set of style shorthands: padding, margin, size, background, radius, shadow, border (`<Box>` of React). The element itself is the box: the shorthands are applied to the host (through `:host` rules of a per-instance stylesheet), so an inline `style` on the element wins over them, as in React. Side attributes win over axis attributes, which win over the all-sides shorthand. Differences from React: no `as` (use the element directly, or give it a `role`); it is `display: block` by default (override with `style`).",
    "properties": [
      {
        "name": "p",
        "attribute": "p",
        "type": "BoxSpace | undefined",
        "description": "Padding on all sides (spacing token or CSS value)"
      },
      {
        "name": "px",
        "attribute": "px",
        "type": "BoxSpace | undefined",
        "description": "Horizontal padding (left and right)"
      },
      {
        "name": "py",
        "attribute": "py",
        "type": "BoxSpace | undefined",
        "description": "Vertical padding (top and bottom)"
      },
      {
        "name": "pt",
        "attribute": "pt",
        "type": "BoxSpace | undefined",
        "description": "Top padding"
      },
      {
        "name": "pr",
        "attribute": "pr",
        "type": "BoxSpace | undefined",
        "description": "Right padding"
      },
      {
        "name": "pb",
        "attribute": "pb",
        "type": "BoxSpace | undefined",
        "description": "Bottom padding"
      },
      {
        "name": "pl",
        "attribute": "pl",
        "type": "BoxSpace | undefined",
        "description": "Left padding"
      },
      {
        "name": "m",
        "attribute": "m",
        "type": "BoxSpace | undefined",
        "description": "Margin on all sides (spacing token or CSS value such as \"auto\")"
      },
      {
        "name": "mx",
        "attribute": "mx",
        "type": "BoxSpace | undefined",
        "description": "Horizontal margin (left and right)"
      },
      {
        "name": "my",
        "attribute": "my",
        "type": "BoxSpace | undefined",
        "description": "Vertical margin (top and bottom)"
      },
      {
        "name": "mt",
        "attribute": "mt",
        "type": "BoxSpace | undefined",
        "description": "Top margin"
      },
      {
        "name": "mr",
        "attribute": "mr",
        "type": "BoxSpace | undefined",
        "description": "Right margin"
      },
      {
        "name": "mb",
        "attribute": "mb",
        "type": "BoxSpace | undefined",
        "description": "Bottom margin"
      },
      {
        "name": "ml",
        "attribute": "ml",
        "type": "BoxSpace | undefined",
        "description": "Left margin"
      },
      {
        "name": "w",
        "attribute": "w",
        "type": "BoxSize | undefined",
        "description": "Width: numbers are pixels, strings are CSS lengths"
      },
      {
        "name": "h",
        "attribute": "h",
        "type": "BoxSize | undefined",
        "description": "Height: numbers are pixels, strings are CSS lengths"
      },
      {
        "name": "minW",
        "attribute": "min-w",
        "type": "BoxSize | undefined",
        "description": "Minimum width"
      },
      {
        "name": "minH",
        "attribute": "min-h",
        "type": "BoxSize | undefined",
        "description": "Minimum height"
      },
      {
        "name": "maxW",
        "attribute": "max-w",
        "type": "BoxSize | undefined",
        "description": "Maximum width"
      },
      {
        "name": "maxH",
        "attribute": "max-h",
        "type": "BoxSize | undefined",
        "description": "Maximum height"
      },
      {
        "name": "bg",
        "attribute": "bg",
        "type": "string | undefined",
        "description": "Background: a surface alias (`bg`, `bg.subtle`, `bg.muted`, `bg.canvas`, `bg.elevated`, `bg.emphasis`) or any CSS background value"
      },
      {
        "name": "rounded",
        "attribute": "rounded",
        "type": "string | undefined",
        "description": "Border radius: a radius token (none, sm, md, lg, xl, 2xl, full) or any CSS value"
      },
      {
        "name": "boxShadow",
        "attribute": "box-shadow",
        "type": "string | undefined",
        "description": "Box shadow: a shadow token (sm, md, lg, xl) or any CSS value"
      },
      {
        "name": "border",
        "attribute": "border",
        "type": "string | undefined",
        "description": "CSS border shorthand, used as-is"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Content"
      }
    ],
    "parts": [],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

The element itself is the box: p, bg, rounded, box-shadow and border are applied to the host.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/box/wc/basic.html

```html
<minerva-box p="4" bg="bg.muted" rounded="md">
  Padding from the spacing scale, a surface background and a radius token.
</minerva-box>
<minerva-box
  p="4"
  mt="3"
  rounded="lg"
  box-shadow="md"
  border="1px solid var(--border-color)"
>
  An elevated box with a shadow token and a CSS border.
</minerva-box>

```

## Example: Spacing and sizing

Numbers select spacing tokens (p="4" is var(--space-4)), other strings are CSS values; sizes (w, h, min-/max-) are pixels or CSS lengths. Side attributes win over axis ones, which win over the all-sides shorthand.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/box/wc/spacing-sizing.html

```html
<minerva-box bg="bg.subtle" p="2" rounded="md">
  <minerva-box bg="bg.muted" px="6" py="2" mb="3" rounded="sm">
    px="6" py="2" mb="3": spacing tokens
  </minerva-box>
  <minerva-box bg="bg.muted" p="12px" mx="auto" w="240" rounded="sm">
    p="12px" mx="auto" w="240": CSS values and pixels
  </minerva-box>
  <minerva-box bg="bg.muted" p="3" mt="3" max-w="60%" min-h="80" rounded="sm">
    max-w="60%" min-h="80"
  </minerva-box>
</minerva-box>

```

## Example: Surfaces, radius and shadow

bg accepts the surface aliases (bg, bg.subtle, bg.muted, bg.canvas, bg.elevated) or any CSS background; rounded and box-shadow accept tokens or CSS values.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/box/wc/surfaces.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  "
>
  <minerva-box p="4" bg="bg" rounded="md" border="1px solid var(--border-color)"
    >bg</minerva-box
  >
  <minerva-box p="4" bg="bg.subtle" rounded="md">bg.subtle</minerva-box>
  <minerva-box p="4" bg="bg.muted" rounded="md">bg.muted</minerva-box>
  <minerva-box p="4" bg="bg.canvas" rounded="md">bg.canvas</minerva-box>
  <minerva-box p="4" bg="bg.elevated" rounded="lg" box-shadow="sm"
    >box-shadow="sm"</minerva-box
  >
  <minerva-box p="4" bg="bg.elevated" rounded="xl" box-shadow="lg"
    >box-shadow="lg"</minerva-box
  >
  <minerva-box p="4" bg="bg.muted" rounded="full" style="text-align: center"
    >rounded="full"</minerva-box
  >
  <minerva-box
    p="4"
    rounded="md"
    bg="linear-gradient(135deg, var(--primary-color), var(--info-color))"
    style="color: white"
    >CSS gradient</minerva-box
  >
</div>

```
