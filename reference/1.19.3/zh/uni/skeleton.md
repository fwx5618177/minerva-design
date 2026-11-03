# Skeleton 骨架屏

在内容加载期间显示的占位图形。

Package: minerva-design@1.19.3

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Skeleton

Support: beta

Variants, geometry, radius/circle, loading content replacement, decorative/status semantics, pulse/wave/no-animation; text line count, height, gap and shortened final line. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Skeleton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"rounded\" | \"button\" | \"text\" | \"circular\" | \"rectangular\" | \"image\" | \"card\" | undefined",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "\"false\" | \"wave\" | \"pulse\" | undefined",
    "required": false
  },
  {
    "name": "decorative",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "circle",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "animated",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "borderRadius",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "lines",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "avatar",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "avatarSize",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "avatarShape",
    "typeText": "\"circle\" | \"square\" | undefined",
    "required": false
  },
  {
    "name": "active",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "paragraph",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "title",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
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

## SkeletonText

Support: beta

Variants, geometry, radius/circle, loading content replacement, decorative/status semantics, pulse/wave/no-animation; text line count, height, gap and shortened final line. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SkeletonText"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "lines",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "lineHeight",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "lastLineWidth",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "animated",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "shrinkLast",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "\"false\" | \"wave\" | \"pulse\" | undefined",
    "required": false
  }
]
```

## CSS variables

```json
{
  "css:Skeleton": {
    "kind": "cssVars",
    "source": "react/src/components/Skeleton",
    "vars": [
      {
        "name": "--skeleton-color",
        "description": "Base color of the placeholder blocks"
      },
      {
        "name": "--skeleton-highlight-color",
        "description": "Color of the moving highlight (wave animation)"
      },
      {
        "name": "--skeleton-radius",
        "description": "Corner radius of the lines and blocks (circles stay round, rectangular blocks square)"
      },
      {
        "name": "--skeleton-text-height",
        "description": "Height of a text line"
      },
      {
        "name": "--skeleton-gap",
        "description": "Space between the lines of a paragraph and next to the avatar"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
