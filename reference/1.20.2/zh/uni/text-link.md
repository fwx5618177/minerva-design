# TextLink 文本链接

带样式的原生链接，适用于行内链接、低调导航和设置列表行；asChild 可为路由链接加样式而不嵌套 a 标签。

Package: minerva-design@1.20.2

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## TextLink

Support: beta

Native navigator with disabled fallback and click. Internal native routes only; browser external anchors require platform navigation configuration. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TextLink"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "href",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "openType",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "any[]"
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

## CSS variables

```json
{
  "css:TextLink": {
    "kind": "cssVars",
    "source": "react/src/components/TextLink",
    "vars": [
      {
        "name": "--text-link-color",
        "description": "Color of the default variant (falls back to --link-color, then --primary-color)"
      },
      {
        "name": "--text-link-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--text-link-text-decoration",
        "description": "Text decoration of the default variant (default: underline)"
      },
      {
        "name": "--text-link-underline-offset",
        "description": "Distance between the text and its underline"
      },
      {
        "name": "--text-link-action-min-height",
        "description": "Minimum height of the action variant"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
