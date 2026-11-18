# ProgressIndicator プログレスインジケーター

進捗を示します。スピナー、サークル、ウェーブ、バー、ドットバーで描かれる不確定の progressbar、または value を指定した確定的なバー／サークルです。

Package: minerva-design@1.23.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "6c540b5293a3b5d4cb8d1c38c6d3c462f6e8d1b1",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:de9407f9acf37f670db2dc646bbdcb8b05067fae0b4c7fd4ec79011e933f6519"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## ProgressIndicator

Support: beta

Spinner/bar/wave/circle/dottedBar native visuals, five sizes, semantic/current color, decorative labels, width/full, reduced-motion CSS; determinate numeric extension. CSS conic-gradient and animation support on individual native renderer versions still requires device validation. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "ProgressIndicator"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"circle\" | \"spinner\" | \"bar\" | \"wave\" | \"dottedBar\" | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | \"xsmall\" | \"xlarge\" | undefined",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"current\" | \"neutral\" | undefined",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "decorative",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "full",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "indeterminate",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showLabel",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "status",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "icon",
    "typeText": "{}"
  },
  {
    "name": "label",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:ProgressIndicator": {
    "kind": "cssVars",
    "source": "react/src/components/ProgressIndicator",
    "vars": [
      {
        "name": "--progress-width",
        "description": "Width of a linear indicator with the default width"
      },
      {
        "name": "--progress-bar-height",
        "description": "Thickness of the bar (every size)"
      },
      {
        "name": "--progress-track-color",
        "description": "Color of the bar track (and of the determinate circle track)"
      },
      {
        "name": "--progress-radius",
        "description": "Corner radius of the bar track (defaults to --radius-sm)"
      },
      {
        "name": "--progress-size",
        "description": "Size of the round indicators (spinner / circle / wave; every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
