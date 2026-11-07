# Skeleton 骨架屏

在内容加载期间显示的占位图形。

Package: minerva-design@1.22.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Skeleton

Support: beta

Seven placeholder variants, pulse/wave/off animation, decorative circle sizing, width/height/radius, loading replacement slot, lines/avatar/card/title/paragraph states. Native view equivalents replace decorative span and DOM loading regions. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/skeleton/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "circle",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "animated",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "text"
  },
  {
    "name": "animation",
    "typeText": "string",
    "required": false,
    "default": "pulse"
  },
  {
    "name": "decorative",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "size",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "borderRadius",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "lines",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "avatar",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "avatarSize",
    "typeText": "unknown",
    "required": false,
    "default": 40
  },
  {
    "name": "avatarShape",
    "typeText": "string",
    "required": false,
    "default": "circle"
  },
  {
    "name": "active",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "paragraph",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "title",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SkeletonText

Support: beta

Configurable text lines/height/token gap/last-line shrink and pulse/wave/off animation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/skeleton-text/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "lines",
    "typeText": "number",
    "required": false,
    "default": 3
  },
  {
    "name": "lineHeight",
    "typeText": "unknown",
    "required": false,
    "default": "1em"
  },
  {
    "name": "gap",
    "typeText": "unknown",
    "required": false,
    "default": 2
  },
  {
    "name": "lastLineWidth",
    "typeText": "string",
    "required": false,
    "default": "70%"
  },
  {
    "name": "animated",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "shrinkLast",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "animation",
    "typeText": "string",
    "required": false,
    "default": "pulse"
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
