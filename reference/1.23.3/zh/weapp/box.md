# Box 盒子

多态容器，提供间距、尺寸、背景、圆角和阴影的简写属性。

Package: minerva-design@1.23.3

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.3",
  "sourceCommit": "476a289a1ef792c8950058e6bf15f1fe46ce18b0",
  "sourceDigest": "sha256:b7c3468445a6a9337f252a14f73347509078e26d4ed34efcf08034d5d4d49c91",
  "referenceSourceDigest": "sha256:7eba577017a7e4dd3baaf9e50ce53ce6efacf4bb06dac6c879af80bc45a8bca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.3/types.json) or getType() from minerva-design/contracts.

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
