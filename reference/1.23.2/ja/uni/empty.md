# Empty 空の状態

表示するデータがないときに表示されるプレースホルダーです。

Package: minerva-design@1.23.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Empty

Support: beta

Localized title/description, primary/secondary action slots, size and explicit geometry, shadow, custom icon, exact theme-resolved SVG illustration and Inbox paths rendered through native Image. Real-device SVG data-URI support has not been verified on every native host. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Empty"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | number | false | null | undefined",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "string | false | null | undefined",
    "required": false
  },
  {
    "name": "action",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "secondaryAction",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "useSvg",
    "typeText": "boolean | undefined",
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
    "name": "showShadow",
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
    "name": "icon",
    "typeText": "{}"
  },
  {
    "name": "title",
    "typeText": "{}"
  },
  {
    "name": "description",
    "typeText": "{}"
  },
  {
    "name": "action",
    "typeText": "{}"
  },
  {
    "name": "secondaryAction",
    "typeText": "{}"
  },
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:Empty": {
    "kind": "cssVars",
    "source": "react/src/components/Empty",
    "vars": [
      {
        "name": "--empty-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--empty-gap",
        "description": "Space between the icon, title, description and actions (sized layout)"
      },
      {
        "name": "--empty-icon-size",
        "description": "Size of the illustration icon (every size)"
      },
      {
        "name": "--empty-color",
        "description": "Text color of the description"
      },
      {
        "name": "--empty-background",
        "description": "Background of the framed (unsized) layout"
      },
      {
        "name": "--empty-radius",
        "description": "Corner radius of the framed (unsized) layout (defaults to --radius-sm)"
      },
      {
        "name": "--empty-description-max-width",
        "description": "Maximum width of the description (sized layout)"
      },
      {
        "name": "--empty-icon-background",
        "description": "Background of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-border-color",
        "description": "Ring color of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-radius",
        "description": "Corner radius of the icon tile (sized layout; defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
