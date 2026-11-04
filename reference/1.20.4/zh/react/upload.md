# Upload 上传

通过按钮或拖放选择文件，进行校验，并列出文件及其传输状态。实际传输由你的代码负责。

Package: minerva-design@1.20.4

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Upload

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Visible label of the upload field (also names the file input)"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "array",
    "typeText": "UploadItem[]",
    "typeRef": "type:e26c7d52d015cdbcc640",
    "required": true,
    "description": "Files to list, with their transfer state (controlled)"
  },
  {
    "name": "accept",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "*",
    "required": false,
    "description": "Accepted file types, as for <input accept> (\".pdf\", \"image/*\", \"application/json\"...)"
  },
  {
    "name": "multiple",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Allows selecting several files"
  },
  {
    "name": "replace",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Single-file mode: lets a new file replace the listed one (the existing file does not count toward maxCount)"
  },
  {
    "name": "maxCount",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Maximum number of files, including the listed ones"
  },
  {
    "name": "maxSize",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Maximum size of a file, in bytes"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Busy state: blocks new selections and retries (removal stays possible) and sets aria-busy"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables selection, retry and removal"
  },
  {
    "name": "labels",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "object",
    "typeText": "UploadLabels | undefined",
    "typeRef": "type:ed976eb420408e9fc902",
    "required": false,
    "description": "Custom texts; each one overrides the localized default"
  }
]
```

### events

```json
[
  {
    "name": "onFilesSelected",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "function",
    "typeText": "(files: File[]) => void",
    "typeRef": "type:2c6927fbc2413055326e",
    "parameters": [
      {
        "name": "files",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "File[]",
        "typeRef": "type:40ae21b0493523b4c65f"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true,
    "description": "Called with the selected (or dropped) files once they pass accept, maxSize and maxCount. Transfer, cancellation and persisted URLs belong to the caller"
  },
  {
    "name": "onRemove",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "function",
    "typeText": "((item: UploadItem) => void) | undefined",
    "typeRef": "type:95c187c778be5b4c6e97",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem",
        "typeRef": "type:035c2046eded505136ac"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called to remove a file; shows a remove button on every item"
  },
  {
    "name": "onRetry",
    "source": "packages/react/src/components/Upload/types.ts",
    "kind": "function",
    "typeText": "((item: UploadItem) => void) | undefined",
    "typeRef": "type:f463d1d328c6b29ef79a",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "UploadItem",
        "typeRef": "type:035c2046eded505136ac"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called to retry a failed file; shows a retry button on failed items"
  }
]
```

## API

```json
{
  "UploadProps": {
    "source": "react/src/components/Upload/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"onChange\" | \"children\">"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Visible label of the upload field (also names the file input)"
      },
      {
        "name": "value",
        "type": "UploadItem[]",
        "required": true,
        "description": "Files to list, with their transfer state (controlled)"
      },
      {
        "name": "onFilesSelected",
        "type": "(files: File[]) => void",
        "required": true,
        "description": "Called with the selected (or dropped) files once they pass accept, maxSize and maxCount. Transfer, cancellation and persisted URLs belong to the caller"
      },
      {
        "name": "onRemove",
        "type": "(item: UploadItem) => void",
        "required": false,
        "description": "Called to remove a file; shows a remove button on every item"
      },
      {
        "name": "onRetry",
        "type": "(item: UploadItem) => void",
        "required": false,
        "description": "Called to retry a failed file; shows a retry button on failed items"
      },
      {
        "name": "accept",
        "type": "string",
        "required": false,
        "default": "\"*\"",
        "description": "Accepted file types, as for <input accept> (\".pdf\", \"image/*\", \"application/json\"...)"
      },
      {
        "name": "multiple",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Allows selecting several files"
      },
      {
        "name": "replace",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Single-file mode: lets a new file replace the listed one (the existing file does not count toward maxCount)"
      },
      {
        "name": "maxCount",
        "type": "number",
        "required": false,
        "default": "50 when multiple, otherwise 1",
        "description": "Maximum number of files, including the listed ones"
      },
      {
        "name": "maxSize",
        "type": "number",
        "required": false,
        "description": "Maximum size of a file, in bytes"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Busy state: blocks new selections and retries (removal stays possible) and sets aria-busy"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables selection, retry and removal"
      },
      {
        "name": "labels",
        "type": "UploadLabels",
        "required": false,
        "description": "Custom texts; each one overrides the localized default"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root element"
      }
    ]
  },
  "UploadItem": {
    "source": "react/src/components/Upload/types.ts",
    "description": "A file shown in the Upload list (owned by the caller)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Stable identifier of the file"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "File name shown in the list"
      },
      {
        "name": "status",
        "type": "UploadItemStatus",
        "required": true,
        "description": "Transfer state of the file"
      },
      {
        "name": "error",
        "type": "string",
        "required": false,
        "description": "Error message shown when status is \"error\""
      },
      {
        "name": "previewUrl",
        "type": "string",
        "required": false,
        "description": "Image preview URL (e.g. an object URL)"
      }
    ]
  },
  "UploadLabels": {
    "source": "react/src/components/Upload/types.ts",
    "description": "Texts of Upload; every omitted entry uses the localized default",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "select",
        "type": "ReactNode",
        "required": false,
        "default": "\"Select files\" (localized)",
        "description": "Text of the select button"
      },
      {
        "name": "uploading",
        "type": "string",
        "required": false,
        "default": "\"Uploading\" (localized)",
        "description": "Status text of an uploading file"
      },
      {
        "name": "done",
        "type": "string",
        "required": false,
        "default": "\"Uploaded\" (localized)",
        "description": "Status text of an uploaded file"
      },
      {
        "name": "failed",
        "type": "string",
        "required": false,
        "default": "\"Upload failed\" (localized)",
        "description": "Status text of a failed file without its own error message"
      },
      {
        "name": "tooMany",
        "type": "(max: number) => string",
        "required": false,
        "default": "(max) => `You can select up to ${max} files` (localized)",
        "description": "Error shown when too many files are selected"
      },
      {
        "name": "invalidType",
        "type": "(name: string) => string",
        "required": false,
        "default": "(name) => `${name}: unsupported file type` (localized)",
        "description": "Error shown when a file does not match accept"
      },
      {
        "name": "tooLarge",
        "type": "(name: string) => string",
        "required": false,
        "default": "(name) => `${name}: file exceeds the size limit` (localized)",
        "description": "Error shown when a file exceeds maxSize"
      },
      {
        "name": "retry",
        "type": "(name: string) => string",
        "required": false,
        "default": "(name) => `Retry ${name}` (localized)",
        "description": "Accessible label of the retry button of a file"
      },
      {
        "name": "remove",
        "type": "(name: string) => string",
        "required": false,
        "default": "(name) => `Remove ${name}` (localized)",
        "description": "Accessible label of the remove button of a file"
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

## Example: 单个文件

onFilesSelected 接收通过 accept 与 maxSize 校验的文件；在 value 中反映传输状态。replace 允许新文件替换当前文件。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/upload/demos/basic.tsx

```tsx
import { useState } from "react";
import { Upload, type UploadItem } from "minerva-design";

export default function BasicDemo() {
  const [items, setItems] = useState<UploadItem[]>([]);

  const upload = (files: File[]) => {
    const file = files[0];
    const item: UploadItem = {
      id: crypto.randomUUID(),
      name: file.name,
      status: "uploading",
      previewUrl: URL.createObjectURL(file),
    };
    setItems([item]);
    // simulate the transfer; a real app uploads the file here
    setTimeout(() => setItems([{ ...item, status: "done" }]), 1000);
  };

  return (
    <Upload
      label="Cover image"
      accept="image/*"
      maxSize={5 * 1024 * 1024}
      replace
      value={items}
      onFilesSelected={upload}
      onRemove={() => setItems([])}
    />
  );
}

```

## Example: 多个文件

multiple 配合 maxCount；失败的文件显示错误信息，并在设置 onRetry 时显示重试按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/upload/demos/multiple.tsx

```tsx
import { useState } from "react";
import { Upload, type UploadItem } from "minerva-design";

const initial: UploadItem[] = [
  { id: "1", name: "report.pdf", status: "done" },
  { id: "2", name: "data.csv", status: "error", error: "Network error" },
];

export default function MultipleDemo() {
  const [items, setItems] = useState(initial);

  return (
    <Upload
      label="Attachments"
      accept=".pdf,.csv"
      multiple
      maxCount={5}
      value={items}
      onFilesSelected={(files) =>
        setItems((prev) => [
          ...prev,
          ...files.map((file) => ({
            id: crypto.randomUUID(),
            name: file.name,
            status: "done" as const,
          })),
        ])
      }
      onRetry={(item) =>
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id ? { ...it, status: "done" } : it,
          ),
        )
      }
      onRemove={(item) =>
        setItems((prev) => prev.filter((it) => it.id !== item.id))
      }
    />
  );
}

```
