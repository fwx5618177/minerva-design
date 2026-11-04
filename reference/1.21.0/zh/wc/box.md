# Box 盒子

多态容器，提供间距、尺寸、背景、圆角和阴影的简写属性。

Package: minerva-design@1.21.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

## Example: 基本用法

元素本身就是盒子：p、bg、rounded、box-shadow 和 border 都作用于宿主元素。

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

## Example: 间距与尺寸

数字会选择间距令牌（p="4" 即 var(--space-4)），其他字符串作为 CSS 值；尺寸（w、h、min-/max-）为像素或 CSS 长度。单边属性优先于轴向属性，轴向属性优先于四边简写。

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

## Example: 表面、圆角与阴影

bg 接受表面别名（bg、bg.subtle、bg.muted、bg.canvas、bg.elevated）或任意 CSS 背景；rounded 和 box-shadow 接受令牌或 CSS 值。

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
