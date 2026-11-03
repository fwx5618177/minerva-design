# KeyValueEditor

Edits an ordered list of string pairs with multi-line keys and values, add and remove actions; rows are tracked by a stable id.

Package: minerva-design@1.20.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## KeyValueEditor

Support: beta

Controlled entries arrays/defaultEntries, legacy value object normalization, stable ids across edits, id-keyed key/value errors, add/edit/remove, readonly and rejected owner updates. Validation including duplicate keys belongs to the consumer, matching React; provide errors keyed by row id. Native events expose both detail.entries and the legacy detail.value rows. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/key-value-editor/index",
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
    "name": "entries",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultEntries",
    "typeText": "array",
    "required": false
  },
  {
    "name": "errors",
    "typeText": "object",
    "required": false
  },
  {
    "name": "keyLabel",
    "typeText": "string",
    "required": false,
    "default": "Key"
  },
  {
    "name": "valueLabel",
    "typeText": "string",
    "required": false,
    "default": "Value"
  },
  {
    "name": "addLabel",
    "typeText": "string",
    "required": false,
    "default": "Add entry"
  },
  {
    "name": "removeLabel",
    "typeText": "string",
    "required": false,
    "default": "Remove entry"
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
  "css:KeyValueEditor": {
    "kind": "cssVars",
    "source": "react/src/components/KeyValueEditor",
    "vars": [
      {
        "name": "--key-value-editor-gap",
        "description": "Space between the rows and the add button"
      },
      {
        "name": "--key-value-editor-column-gap",
        "description": "Space between the key, the value and the remove button of a row"
      },
      {
        "name": "--key-value-editor-control-height",
        "description": "Size of the remove button and minimum height of the key field and of the add button (defaults to the density's small control height)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
