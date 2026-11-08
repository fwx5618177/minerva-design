# NumberInput

Champ numérique (spinbutton) avec pas au clavier, boutons optionnels, bornes min / max et précision fixe ; la valeur est validée à la perte du focus ou sur Entrée.

Package: minerva-design@1.23.2

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## NumberInput

Support: beta

Shared core number parsing/formatting/clamping; intermediate drafts; blur/confirm-only commit; nullable empty value; precision from step; optional steppers; controlled rejection; disabled/readonly. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/number-input/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "min",
    "typeText": "number",
    "required": false,
    "default": -1.7976931348623157e+308
  },
  {
    "name": "max",
    "typeText": "number",
    "required": false,
    "default": 1.7976931348623157e+308
  },
  {
    "name": "step",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "precision",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "showStepper",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "allowEmpty",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

## CSS variables

```json
{
  "css:NumberInput": {
    "kind": "cssVars",
    "source": "react/src/components/NumberInput",
    "vars": [
      {
        "name": "--number-input-height",
        "description": "Height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--number-input-padding-x",
        "description": "Horizontal padding of the text (defaults to the density's small control padding)"
      },
      {
        "name": "--number-input-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--number-input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--number-input-background",
        "description": "Background color"
      },
      {
        "name": "--number-input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--number-input-stepper-width",
        "description": "Width of the increment / decrement column"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
