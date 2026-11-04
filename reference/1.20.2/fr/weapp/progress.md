# ProgressIndicator

Indique une progression : une progressbar indéterminée dessinée en spinner, cercle, vague, barre ou barre pointillée, ou — avec value — une barre ou un cercle déterminés.

Package: minerva-design@1.20.2

Renderer: weapp

Locale: fr

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

## ProgressIndicator

Support: beta

Spinner, circle, wave, bar and dottedBar native animations; size/color/icon/label/decorative/width/full; optional bounded determinate progress. Native CSS geometry replaces DOM/SVG icons; device animation verification pending. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/progress-indicator/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "default": 100
  },
  {
    "name": "indeterminate",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showLabel",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "spinner"
  },
  {
    "name": "size",
    "typeText": "unknown",
    "required": false,
    "default": "medium"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "primary"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "decorative",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "full",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### slots

```json
[
  {
    "name": "icon"
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
