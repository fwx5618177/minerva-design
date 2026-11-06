# Upload

Selects files by button or drag and drop, validates them and lists them with their transfer state. The transfer itself stays in your code.

Package: minerva-design@1.21.1

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Upload

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "array",
    "typeText": "UploadItem[]",
    "typeRef": "type:6e2a631820f47813c6e9",
    "required": true
  },
  {
    "name": "pickFiles",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "function",
    "typeText": "(options: { accept: string; multiple: boolean; }) => Promise<NativeUploadFile[] | null>",
    "typeRef": "type:518ffb9f8764203037bc",
    "parameters": [
      {
        "name": "options",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "{ accept: string; multiple: boolean; }",
        "typeRef": "type:bc87e43c14e2b3cc950d"
      }
    ],
    "returnType": {
      "typeText": "Promise<NativeUploadFile[] | null>",
      "typeRef": "type:8502d565d3b1431543f5"
    },
    "required": true,
    "description": "Connect a system document/image picker. null or [] means user cancellation."
  },
  {
    "name": "accept",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "*",
    "required": false
  },
  {
    "name": "multiple",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "replace",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "maxCount",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "maxSize",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "object",
    "typeText": "UploadLabels | undefined",
    "typeRef": "type:5a1cdc5d9ff532fd3e9a",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onFilesSelected",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "function",
    "typeText": "(files: NativeUploadFile[]) => void",
    "typeRef": "type:a06c2918079a6a4dc2b3",
    "parameters": [
      {
        "name": "files",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "NativeUploadFile[]",
        "typeRef": "type:26523f9a4bf2e5474006"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true
  },
  {
    "name": "onRemove",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "function",
    "typeText": "((item: UploadItem) => void) | undefined",
    "typeRef": "type:86cc317aa29745181b1f",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem",
        "typeRef": "type:81a21c4daf3731334707"
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
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "function",
    "typeText": "((item: UploadItem) => void) | undefined",
    "typeRef": "type:03fdc6676fa548d0a2d1",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem",
        "typeRef": "type:81a21c4daf3731334707"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onError",
    "source": "packages/native/src/components/Upload/index.tsx",
    "kind": "function",
    "typeText": "((error: Error) => void) | undefined",
    "typeRef": "type:ab29d56da1082f1951bc",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "Error",
        "typeRef": "type:b40c167fb5f5408880b2"
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

## API

```json
{
  "native:UploadProps": {
    "source": "native/src/components/Upload/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true
      },
      {
        "name": "value",
        "type": "UploadItem[]",
        "required": true
      },
      {
        "name": "onFilesSelected",
        "type": "(files: NativeUploadFile[]) => void",
        "required": true
      },
      {
        "name": "pickFiles",
        "type": "(options: { accept: string; multiple: boolean; }) => Promise<NativeUploadFile[] | null>",
        "required": true,
        "description": "Connect a system document/image picker. null or [] means user cancellation."
      },
      {
        "name": "onRemove",
        "type": "(item: UploadItem) => void",
        "required": false
      },
      {
        "name": "onRetry",
        "type": "(item: UploadItem) => void",
        "required": false
      },
      {
        "name": "accept",
        "type": "string",
        "required": false,
        "default": "\"*\""
      },
      {
        "name": "multiple",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "replace",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "maxCount",
        "type": "number",
        "required": false
      },
      {
        "name": "maxSize",
        "type": "number",
        "required": false
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "labels",
        "type": "UploadLabels",
        "required": false
      },
      {
        "name": "onError",
        "type": "(error: Error) => void",
        "required": false
      }
    ]
  }
}
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

## Example: Single file

onFilesSelected receives files that pass accept and maxSize; reflect the transfer in value. replace lets a new file replace the current one.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/upload/native/basic.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { Upload, type UploadItem } from "minerva-design/native";
export default function Basic() {
  const resources = useRef(new Set<string>());
  useEffect(() => {
    const issued = resources.current;
    return () => {
      for (const uri of issued) URL.revokeObjectURL(uri);
    };
  }, []);
  const [files, setFiles] = useState<UploadItem[]>([]);
  return (
    <Upload
      label="Documents"
      value={files}
      multiple
      pickFiles={(options) =>
        pickBrowserFiles(options, (uri) => resources.current.add(uri))
      }
      onFilesSelected={(items) =>
        setFiles((current) => [
          ...current,
          ...items.map((file) => ({
            id: file.uri,
            name: file.name,
            status: "done" as const,
          })),
        ])
      }
      onRemove={(item) => {
        URL.revokeObjectURL(item.id);
        resources.current.delete(item.id);
        setFiles((current) => current.filter((file) => file.id !== item.id));
      }}
      labels={{ done: "Selected" }}
    />
  );
}
// Browser documentation host; the Expo example supplies expo-document-picker on iOS/Android.
function pickBrowserFiles(
  {
    accept,
    multiple,
  }: {
    accept: string;
    multiple: boolean;
  },
  recordUri: (uri: string) => void,
) {
  return new Promise<import("minerva-design/native").NativeUploadFile[] | null>(
    (resolve) => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept === "*" ? "" : accept;
      input.multiple = multiple;
      input.oncancel = () => resolve(null);
      input.onchange = () =>
        resolve(
          Array.from(input.files ?? []).map((file) => {
            const uri = URL.createObjectURL(file);
            recordUri(uri);
            return {
              name: file.name,
              uri,
              size: file.size,
              mimeType: file.type,
            };
          }),
        );
      input.click();
    },
  );
}

```
