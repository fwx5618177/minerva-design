# Box 盒子

多态容器，提供间距、尺寸、背景、圆角和阴影的简写属性。

Package: minerva-design@1.20.2

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Box

Support: beta

Full React Box spacing, axis/side precedence, size, surface alias, border, radius and shadow props with core token resolution. Native view replaces arbitrary DOM as-element/ref targets. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Box"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "p",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "px",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "py",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "pt",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "pr",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "pb",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "pl",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "m",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "mx",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "my",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "mt",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "mr",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "mb",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "ml",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "w",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "h",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "minW",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "minH",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "maxW",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "maxH",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "bg",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "rounded",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "boxShadow",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "border",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "margin",
    "typeText": "Space | undefined",
    "required": false
  },
  {
    "name": "background",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "Space | undefined",
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
