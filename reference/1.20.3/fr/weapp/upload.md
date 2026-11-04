# Upload

Sélectionne des fichiers par bouton ou glisser-déposer, les valide et les liste avec leur état de transfert. Le transfert lui-même reste dans votre code.

Package: minerva-design@1.20.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Upload

Support: beta

Native document/media picker, core accept/maxSize/count validation, controlled status list, replace/multiple, loading/disabled guards, preview, retry/removal, localized callback labels and filesselected. Native paths replace browser File objects and document/media picker selection replaces drag/drop; upload transport remains consumer-owned. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/upload/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "array",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "maxCount",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "accept",
    "typeText": "string",
    "required": false,
    "default": "*"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "multiple",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "replace",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "maxSize",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "removable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "retryable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
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

### events

```json
[
  {
    "name": "filesselected",
    "typeText": "{ files: NativeUploadFile[] }",
    "description": "Validated native file paths; the consumer owns upload transport and value status."
  },
  {
    "name": "select",
    "typeText": "{ files: NativeUploadFile[] }",
    "description": "Compatibility alias for filesselected."
  },
  {
    "name": "error",
    "typeText": "{ code: 'too-many' | 'invalid-type' | 'too-large' | 'picker'; message: string; files?: NativeUploadFile[] }",
    "description": "Selection validation or native picker error; cancellations are ignored."
  },
  {
    "name": "remove",
    "typeText": "{ id: string; item: NativeUploadItem }",
    "description": "Requested removal; owner updates value."
  },
  {
    "name": "retry",
    "typeText": "{ item: NativeUploadItem }",
    "description": "Requested retry of an error item."
  }
]
```

### slots

```json
[
  {
    "name": "default"
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
