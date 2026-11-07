# Box ボックス

スペーシング・サイズ・背景・角丸・影のショートハンドを備えたポリモーフィックなコンテナ。

Package: minerva-design@1.22.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Box

Support: beta

All React Box spacing axes with core token resolution, dimensions/min/max, semantic backgrounds, rounded/shadow/border and last-wins customStyle. Native view and WXSS replace polymorphic DOM element and CSSProperties. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/box/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "padding",
    "typeText": "string",
    "required": false,
    "default": "0"
  },
  {
    "name": "margin",
    "typeText": "string",
    "required": false,
    "default": "0"
  },
  {
    "name": "background",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "radius",
    "typeText": "string",
    "required": false,
    "default": "0"
  },
  {
    "name": "p",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "px",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "py",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "pt",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "pr",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "pb",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "pl",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "m",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "mx",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "my",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "mt",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "mr",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "mb",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "ml",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "w",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "h",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "minW",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "minH",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxW",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxH",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "bg",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "rounded",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "boxShadow",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "border",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "customStyle",
    "typeText": "unknown",
    "required": false
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
