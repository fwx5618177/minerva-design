# Steps

Affiche les étapes d’un processus et permet de passer de l’une à l’autre.

Package: minerva-design@1.22.1

Renderer: uni

Locale: fr

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

## Steps

Support: beta

React value/defaultValue identities, current/completed states, item disabled and readOnly defaults; label/icon slots. Uni also accepts legacy current/title plus direction, error status and string icons. Native list/view semantics replace DOM ol/ref targets. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Steps"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "Item[] | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "current",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "direction",
    "typeText": "\"vertical\" | \"horizontal\" | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: string | number]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string | number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "icon",
    "typeText": "{ item: Item; index: number; current: boolean; }"
  },
  {
    "name": "label",
    "typeText": "{ item: Item; index: number; }"
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  }
]
```

## CSS variables

```json
{
  "css:Steps": {
    "kind": "cssVars",
    "source": "react/src/components/Steps",
    "vars": [
      {
        "name": "--steps-gap",
        "description": "Space between the steps (row and column gap)"
      },
      {
        "name": "--steps-font-size",
        "description": "Font size of the labels"
      },
      {
        "name": "--steps-indicator-size",
        "description": "Diameter of the numbered indicator"
      },
      {
        "name": "--steps-accent-color",
        "description": "Color of the current / completed indicators (defaults to --primary-color)"
      },
      {
        "name": "--steps-current-background",
        "description": "Background of the current step's indicator"
      },
      {
        "name": "--steps-connector-color",
        "description": "Color of the line joining the upcoming steps (defaults to --border-color)"
      },
      {
        "name": "--steps-connector-complete-color",
        "description": "Color of the line after a completed step (defaults to the accent color)"
      },
      {
        "name": "--steps-connector-min-width",
        "description": "Minimum length of the line joining two steps"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
