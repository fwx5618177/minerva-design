# Empty 空状态

没有数据可展示时显示的占位内容。

Package: minerva-design@1.20.4

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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
