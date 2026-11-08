# Grid

Native mobile grid with accessible controls and shared design tokens.

Package: minerva-design@1.23.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Grid

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## GridItem

Support: beta

Native grid child with full row and optional column/row spans. Native wrapper replaces DOM asChild cloning. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "GridItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "fullWidth",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "columnSpan",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "rowSpan",
    "typeText": "number | undefined",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
