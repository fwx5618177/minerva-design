# HtmlPreview

Previews untrusted HTML such as email templates in a fully sandboxed iframe. The markup is sanitized with DOMPurify (fail-closed) and rendered behind a Content-Security-Policy that blocks scripts and network access.

Package: minerva-design@1.24.0

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.0",
  "sourceCommit": "db705542be0061d51c135e72566fe0abba4dd3d4",
  "sourceDigest": "sha256:ddf24b058620a47363c171d7a5d941ded5095e4c61225ecdcd3c9a4f29932128",
  "referenceSourceDigest": "sha256:868994bef86fb46d4fdff6c4dc3922a69254cd143c59b0400b1091300bf56a2b"
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
