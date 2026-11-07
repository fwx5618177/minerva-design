# Upload 上传

通过按钮或拖放选择文件，进行校验，并列出文件及其传输状态。实际传输由你的代码负责。

Package: minerva-design@1.22.1

Renderer: taro

Locale: zh

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

## Upload

Support: beta

Native file chooser, validated native-file onFilesSelected callback, whole-batch accept/size/count enforcement with React single-only replace semantics, controlled items, preview/status/custom labels, remove/retry/loading/progress and error feedback. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports real File input, reset and drop with the same whole-batch validation. Native capability selection uses chooseMessageFile or a compatible media picker, reports unavailable picker errors, and depends on host MIME metadata. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "labels",
    "source": "packages/taro/src/data.tsx",
    "kind": "object",
    "typeText": "UploadLabels | undefined",
    "typeRef": "type:1a510f126387b644d467",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/taro/src/data.tsx",
    "kind": "array",
    "typeText": "UploadItem[] | undefined",
    "typeRef": "type:43a090634162eb188700",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "accept",
    "source": "packages/taro/src/data.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "multiple",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "replace",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "maxCount",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "maxSize",
    "source": "packages/taro/src/data.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "removable",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "retryable",
    "source": "packages/taro/src/data.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onFilesSelected",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((files: NativeUploadFile[]) => void) | undefined",
    "typeRef": "type:73e6aa3fda683fb60690",
    "parameters": [
      {
        "name": "files",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "NativeUploadFile[]",
        "typeRef": "type:890cd392036d3b9f3d41"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onChange",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((items: UploadItem[]) => void) | undefined",
    "typeRef": "type:b6db4cf38ad90a1d245b",
    "parameters": [
      {
        "name": "items",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem[]",
        "typeRef": "type:b2bdff3b67c7e8873637"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onSelect",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((items: UploadItem[]) => void) | undefined",
    "typeRef": "type:71a5dc1a4abb0c9e2517",
    "parameters": [
      {
        "name": "items",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem[]",
        "typeRef": "type:b2bdff3b67c7e8873637"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onRemove",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((item: UploadItem) => void) | undefined",
    "typeRef": "type:ccc1eadc4666777ba143",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem",
        "typeRef": "type:4ae34b76be34d7b5dc25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onRetry",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((item: UploadItem) => void) | undefined",
    "typeRef": "type:7e6fd52689d4915deb49",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem",
        "typeRef": "type:4ae34b76be34d7b5dc25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onReject",
    "source": "packages/taro/src/data.tsx",
    "kind": "function",
    "typeText": "((message: string) => void) | undefined",
    "typeRef": "type:f3c00a1c1eb854f5cefe",
    "parameters": [
      {
        "name": "message",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
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
