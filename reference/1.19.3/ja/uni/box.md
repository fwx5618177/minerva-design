# Box ボックス

スペーシング・サイズ・背景・角丸・影のショートハンドを備えたポリモーフィックなコンテナ。

Package: minerva-design@1.19.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
