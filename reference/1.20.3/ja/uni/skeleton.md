# Skeleton スケルトン

コンテンツの読み込み中に表示されるプレースホルダーの図形です。

Package: minerva-design@1.20.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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
