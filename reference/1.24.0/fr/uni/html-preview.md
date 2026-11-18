# HtmlPreview

Prévisualise du HTML non fiable, comme des modèles d'e-mail, dans une iframe entièrement isolée. Le balisage est assaini avec DOMPurify (échec sûr) et rendu derrière une Content-Security-Policy qui bloque les scripts et le réseau.

Package: minerva-design@1.24.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.0",
  "sourceCommit": "1ec7f8c462afcd58cce98803534b965221e88a0b",
  "sourceDigest": "sha256:b7c3468445a6a9337f252a14f73347509078e26d4ed34efcf08034d5d4d49c91",
  "referenceSourceDigest": "sha256:8a812cab75521530ab1b07dd5007874119a188b16270406440b165747fa6efc7"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## HtmlPreview

Support: beta

H5 sanitized CSP-protected opaque iframe with viewport sizing; native rich-text node/HTML rendering. Native rich-text has no iframe sandbox or arbitrary browser HTML/CSS engine. H5 previews intentionally prohibit scripts, network access, forms and embedded application execution. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "HtmlPreview"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "html",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "nodes",
    "typeText": "any[] | undefined",
    "required": false
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "viewport",
    "typeText": "\"desktop\" | \"mobile\" | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "mobileWidth",
    "typeText": "number | undefined",
    "required": false
  }
]
```

## CSS variables

```json
{
  "css:HtmlPreview": {
    "kind": "cssVars",
    "source": "react/src/components/HtmlPreview",
    "vars": [
      {
        "name": "--html-preview-bg",
        "description": "Background color around the frame"
      },
      {
        "name": "--html-preview-frame-bg",
        "description": "Background color of the frame"
      },
      {
        "name": "--html-preview-frame-border-color",
        "description": "Border color of the frame"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
