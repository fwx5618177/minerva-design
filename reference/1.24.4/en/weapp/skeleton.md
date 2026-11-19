# Skeleton

Placeholder shapes shown while content is loading.

Package: minerva-design@1.24.4

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

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
