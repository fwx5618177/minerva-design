# TagInput

Free-form tag entry with suggestions: Enter, the add button or blur add the draft, arrow keys pick a suggestion, and IME composition never commits.

Package: minerva-design@1.19.3

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
