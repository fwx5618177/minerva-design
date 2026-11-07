# Upload アップロード

ボタンまたはドラッグ＆ドロップでファイルを選択・検証し、転送状態とともに一覧表示します。転送処理自体はアプリ側で行います。

Package: minerva-design@1.22.2

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Upload

Support: beta

Native Angular: MnUpload. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnUpload"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "value",
    "typeText": "UploadItem[]",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "accept",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "multiple",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "replace",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "maxCount",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "maxSize",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "removable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "retryable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "labels",
    "typeText": "UploadLabels | undefined",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "UploadItem[]",
    "required": false
  },
  {
    "name": "filesSelected",
    "typeText": "File[]",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "File[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "remove",
    "typeText": "UploadItem",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "UploadItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "retry",
    "typeText": "UploadItem",
    "required": false,
    "source": "packages/angular/src/components/upload/upload.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "UploadItem",
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
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
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

## Example: Select local files

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnUpload } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnUpload],
  template: `
<mn-upload label="Attachments" multiple (filesSelected)="count=$event.length"/><output>{{count}} files selected</output>
  `,
})
export class Example {
  count = 0;
}

```

## Example: Restricted file types

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnUpload } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnUpload],
  template: `
<mn-upload label="Images" accept="image/*"/><mn-upload label="Disabled upload" disabled/>
  `,
})
export class Example {

}

```
