# Upload

Sélectionne des fichiers par bouton ou glisser-déposer, les valide et les liste avec leur état de transfert. Le transfert lui-même reste dans votre code.

Package: minerva-design@1.21.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Upload

Support: beta

Controlled file statuses, MIME/extension and max-size/count validation, original native selected-file callbacks, media/document picker capabilities, progress, retry/remove callbacks, replacement/multiple, labels and disabled/loading guards. Native selected files carry platform paths and metadata, not browser File objects. Network upload/cancellation is consumer-owned as in React; document picking requires chooseFile or chooseMessageFile host capability. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Upload"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "Item[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "maxCount",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "maxSize",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "accept",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "multiple",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "replace",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Labels | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[items: Item[]]",
    "parameters": [
      {
        "name": "items",
        "position": 0,
        "typeText": "Item[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "select",
    "typeText": "[files: NativeFile[]]",
    "parameters": [
      {
        "name": "files",
        "position": 0,
        "typeText": "NativeFile[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "error",
    "typeText": "[error: unknown]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "retry",
    "typeText": "[item: Item]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "Item",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "filesSelected",
    "typeText": "[files: NativeFile[]]",
    "parameters": [
      {
        "name": "files",
        "position": 0,
        "typeText": "NativeFile[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "remove",
    "typeText": "[item: Item]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "Item",
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
    "name": "select",
    "typeText": "{}"
  },
  {
    "name": "item",
    "typeText": "{ item: Item; }"
  }
]
```

## CSS variables

```json
{
  "css:Upload": {
    "kind": "cssVars",
    "source": "react/src/components/Upload",
    "vars": [
      {
        "name": "--upload-gap",
        "description": "Space between the label, the dropzone, the error and the file list"
      },
      {
        "name": "--upload-font-size",
        "description": "Font size"
      },
      {
        "name": "--upload-dropzone-padding",
        "description": "Inner padding of the dropzone"
      },
      {
        "name": "--upload-dropzone-radius",
        "description": "Corner radius of the dropzone (defaults to --radius-md)"
      },
      {
        "name": "--upload-dropzone-border-color",
        "description": "Dashed border color of the dropzone at rest"
      },
      {
        "name": "--upload-dropzone-background",
        "description": "Background of the dropzone at rest"
      },
      {
        "name": "--upload-preview-width",
        "description": "Width of an image preview in the file list"
      },
      {
        "name": "--upload-preview-height",
        "description": "Height of an image preview in the file list"
      },
      {
        "name": "--upload-dropzone-min-height",
        "description": "Minimum height of the dropzone (its content is centered)"
      },
      {
        "name": "--upload-item-background",
        "description": "Background of a file row (defaults to --surface-color)"
      },
      {
        "name": "--upload-dropzone-active-color",
        "description": "Border and ring color of the dropzone while a file is dragged over it (defaults to --primary-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
