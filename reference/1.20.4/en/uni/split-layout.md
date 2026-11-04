# SplitLayout

Main content with an optional aside that splits beside it once the layout's own width reaches a breakpoint.

Package: minerva-design@1.20.4

Renderer: uni

Locale: en

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

## SplitLayout

Support: beta

Main/aside slots, validated asideWidth, md/lg actual-container collapse breakpoint, core gap and no empty aside column. Native views replace DOM refs; React SplitLayout has no drag-resize/persistence API. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SplitLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asideWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "sidebarWidth",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "collapseBelow",
    "typeText": "\"md\" | \"lg\" | undefined",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "reverse",
    "typeText": "boolean | undefined",
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
  },
  {
    "name": "aside",
    "typeText": "{}"
  },
  {
    "name": "sidebar",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:SplitLayout": {
    "kind": "cssVars",
    "source": "react/src/components/SplitLayout",
    "vars": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
