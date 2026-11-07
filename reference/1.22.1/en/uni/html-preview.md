# HtmlPreview

Previews untrusted HTML such as email templates in a fully sandboxed iframe. The markup is sanitized with DOMPurify (fail-closed) and rendered behind a Content-Security-Policy that blocks scripts and network access.

Package: minerva-design@1.22.1

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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
