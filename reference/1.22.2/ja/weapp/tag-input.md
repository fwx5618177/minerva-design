# TagInput タグ入力

候補付きの自由なタグ入力：Enter・追加ボタン・フォーカス喪失で下書きを追加し、矢印キーで候補を選び、IME 変換中は確定しません。

Package: minerva-design@1.22.2

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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
