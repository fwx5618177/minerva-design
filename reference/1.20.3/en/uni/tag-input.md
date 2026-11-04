# TagInput

Free-form tag entry with suggestions: Enter, the add button or blur add the draft, arrow keys pick a suggestion, and IME composition never commits.

Package: minerva-design@1.20.3

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## TagInput

Support: beta

Shared core separator parsing; typed remainder and H5 paste selection; deduplicated suggestions/create choice; blur opt-out, native confirm, H5 navigation/backspace/Escape, IME guards, clear/remove, owner rejection, defaults/model, maxTags, custom labels and inherited locking. Touch actions suppress accidental blur commit. Browser hidden-input form serialization is unavailable in native hosts. Clipboard range handling applies to H5 paste events; native hosts provide their input/confirm events. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "TagInput"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "separators",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabelledby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaDescribedby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "maxTags",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "commitOnBlur",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "addLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "removeLabel",
    "typeText": "((tag: string) => string) | undefined",
    "required": false
  },
  {
    "name": "createLabel",
    "typeText": "((tag: string) => string) | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: string[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: string[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
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
