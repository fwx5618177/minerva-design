# TagInput

Saisie libre d’étiquettes avec suggestions : Entrée, le bouton d’ajout ou la perte du focus ajoutent la saisie, les flèches choisissent une suggestion et la composition IME ne valide jamais.

Package: minerva-design@1.23.2

Renderer: weapp

Locale: fr

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

## TagInput

Support: beta

Unique controlled/default tags, shared literal separator and newline parsing, native confirm/blur, filtered deduplicated suggestions, touch/blur selection arbitration, clear, max count and native instance paste(text,start,end). WeChat input does not expose a DOM clipboard event/selection API. Delimited incoming input is parsed; exact clipboard insertion ranges can be supplied to the instance paste() method. Arrow-key suggestion navigation and React render callbacks are not reproduced. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/tag-input/index",
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
    "name": "defaultValue",
    "typeText": "array",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "maxTags",
    "typeText": "number",
    "required": false,
    "default": 9007199254740991
  },
  {
    "name": "options",
    "typeText": "array",
    "required": false
  },
  {
    "name": "separators",
    "typeText": "array",
    "required": false
  },
  {
    "name": "commitOnBlur",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "addLabel",
    "typeText": "string",
    "required": false,
    "default": "Add tag"
  },
  {
    "name": "clearLabel",
    "typeText": "string",
    "required": false,
    "default": "Clear tags"
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "default": "No matches"
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

## CSS variables

```json
{
  "css:TagInput": {
    "kind": "cssVars",
    "source": "react/src/components/TagInput",
    "vars": [
      {
        "name": "--tag-input-gap",
        "description": "Space between the tags and between the tags and the entry row"
      },
      {
        "name": "--tag-input-tag-min-height",
        "description": "Minimum height of a tag (defaults to the density's small control height)"
      },
      {
        "name": "--tag-input-list-max-height",
        "description": "Maximum height of the suggestion list before it scrolls"
      },
      {
        "name": "--tag-input-list-radius",
        "description": "Corner radius of the suggestion list (defaults to --radius-md)"
      },
      {
        "name": "--tag-input-option-padding-y",
        "description": "Vertical padding of a suggestion (follows the density's row padding)"
      },
      {
        "name": "--tag-input-option-padding-x",
        "description": "Horizontal padding of a suggestion (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
