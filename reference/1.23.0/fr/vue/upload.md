# Upload

Sélectionne des fichiers par bouton ou glisser-déposer, les valide et les liste avec leur état de transfert. Le transfert lui-même reste dans votre code.

Package: minerva-design@1.23.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Upload

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "type": "string",
    "required": true,
    "description": "Visible label of the upload field (also names the file input)",
    "typeText": "string"
  },
  {
    "name": "modelValue",
    "type": "UploadItem[]",
    "required": false,
    "description": "Files to list, with their transfer state (controlled, `v-model`)",
    "typeText": "UploadItem[]"
  },
  {
    "name": "defaultValue",
    "type": "UploadItem[]",
    "required": false,
    "description": "Initial files of an uncontrolled list",
    "typeText": "UploadItem[]"
  },
  {
    "name": "accept",
    "type": "string",
    "default": "\"*\"",
    "required": false,
    "description": "Accepted file types, as for <input accept> (\".pdf\", \"image/*\", \"application/json\"...)",
    "typeText": "string"
  },
  {
    "name": "multiple",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Allows selecting several files",
    "typeText": "boolean"
  },
  {
    "name": "replace",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Single-file mode: lets a new file replace the listed one (the existing\nfile does not count toward maxCount)",
    "typeText": "boolean"
  },
  {
    "name": "maxCount",
    "type": "number",
    "required": false,
    "description": "Maximum number of files, including the listed ones",
    "typeText": "number"
  },
  {
    "name": "maxSize",
    "type": "number",
    "required": false,
    "description": "Maximum size of a file, in bytes",
    "typeText": "number"
  },
  {
    "name": "loading",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Busy state: blocks new selections and retries (removal stays possible)\nand sets aria-busy",
    "typeText": "boolean"
  },
  {
    "name": "disabled",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Disables selection, retry and removal",
    "typeText": "boolean"
  },
  {
    "name": "labels",
    "type": "UploadLabels",
    "required": false,
    "description": "Custom texts; each one overrides the localized default",
    "typeText": "UploadLabels"
  }
]
```

### events

```json
[
  {
    "name": "update:modelValue",
    "type": "[value: UploadItem[]]",
    "typeText": "[value: UploadItem[]]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "UploadItem[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "retry",
    "type": "[item: UploadItem]",
    "typeText": "[item: UploadItem]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "UploadItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "remove",
    "type": "[item: UploadItem]",
    "typeText": "[item: UploadItem]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "UploadItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "filesSelected",
    "type": "[files: File[]]",
    "typeText": "[files: File[]]",
    "parameters": [
      {
        "name": "files",
        "position": 0,
        "typeText": "File[]",
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
    "type": "any",
    "description": "Content of the select button (the `labels.select` text)",
    "typeText": "any"
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/upload/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Upload } from "minerva-design/vue";
import type { UploadItem } from "minerva-design/vue";
const files = ref<UploadItem[]>([]);
function selected(items: File[]) {
  files.value.push(
    ...items.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      status: "done" as const,
    })),
  );
}
</script>
<template>
  <Upload
    v-model="files"
    label="Attachments"
    multiple
    @files-selected="selected"
  />
</template>

```

## Example: form

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/upload/vue/form.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Upload, FormField } from "minerva-design/vue";
import type { UploadItem } from "minerva-design/vue";
const files = ref<UploadItem[]>([]);
function selected(items: File[]) {
  files.value.push(
    ...items.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      status: "done" as const,
    })),
  );
}
</script>
<template>
  <FormField
    label="Project documents"
    helper-text="Up to 3 PDF files, 2 MB each"
    ><Upload
      v-model="files"
      label="PDF documents"
      accept=".pdf"
      multiple
      :max-count="3"
      :max-size="2 * 1024 * 1024"
      @files-selected="selected"
  /></FormField>
</template>

```

## Example: transfer

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/upload/vue/transfer.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Upload } from "minerva-design/vue";
import type { UploadItem } from "minerva-design/vue";
const files = ref<UploadItem[]>([
  {
    id: "failed",
    name: "report.pdf",
    status: "error",
    error: "Transfer interrupted",
  },
]);
async function retry(item: UploadItem) {
  item.status = "uploading";
  await new Promise((resolve) => setTimeout(resolve, 500));
  item.status = "done";
  item.error = undefined;
}
function selected(items: File[]) {
  for (const file of items) {
    const item: UploadItem = {
      id: String(Date.now()),
      name: file.name,
      status: "uploading",
    };
    files.value.push(item);
    void retry(files.value[files.value.length - 1]!);
  }
}
</script>
<template>
  <Upload
    v-model="files"
    label="Transfer queue"
    @retry="retry"
    @files-selected="selected"
  />
</template>

```
