# Upload 上传

通过按钮或拖放选择文件，进行校验，并列出文件及其传输状态。实际传输由你的代码负责。

Package: minerva-design@1.20.5

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Upload

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/upload",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "accept",
    "typeText": "string",
    "attribute": "accept",
    "required": false
  },
  {
    "name": "multiple",
    "typeText": "boolean",
    "attribute": "multiple",
    "required": false
  },
  {
    "name": "replace",
    "typeText": "boolean",
    "attribute": "replace",
    "required": false
  },
  {
    "name": "maxCount",
    "typeText": "number | undefined",
    "attribute": "max-count",
    "required": false
  },
  {
    "name": "maxSize",
    "typeText": "number | undefined",
    "attribute": "max-size",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "removable",
    "typeText": "boolean",
    "attribute": "removable",
    "required": false
  },
  {
    "name": "retryable",
    "typeText": "boolean",
    "attribute": "retryable",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean",
    "attribute": "required",
    "required": false
  },
  {
    "name": "items",
    "typeText": "UploadItem[]",
    "required": false
  },
  {
    "name": "texts",
    "typeText": "UploadLabels | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "Event",
    "description": "The listed files changed through the user"
  },
  {
    "name": "minerva-files-selected",
    "typeText": "CustomEvent<{ files: File[]; }>",
    "detailType": {
      "typeText": "{ files: File[]; }",
      "typeRef": "type:7e583d045ea8f0ba9644"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "Valid files were picked or dropped; `detail: { files }`; cancelable (the files are then not listed)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: UploadItem[]; }>",
    "detailType": {
      "typeText": "{ value: UploadItem[]; }",
      "typeRef": "type:efebaaaa4cac981d4edc"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The listed files changed through the user; `detail: { value }` (the items)"
  },
  {
    "name": "minerva-remove",
    "typeText": "CustomEvent<{ item: UploadItem; }>",
    "detailType": {
      "typeText": "{ item: UploadItem; }",
      "typeRef": "type:7f10b7ea119298f47c03"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The remove button of an item was activated; `detail: { item }`; cancelable (keeps the item)"
  },
  {
    "name": "minerva-retry",
    "typeText": "CustomEvent<{ item: UploadItem; }>",
    "detailType": {
      "typeText": "{ item: UploadItem; }",
      "typeRef": "type:bf3db17f7d1046f5c316"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The retry button of a failed item was activated; `detail: { item }`"
  }
]
```

## API

```json
{
  "wc:minerva-upload": {
    "kind": "element",
    "source": "web-components/src/components/upload/upload.ts",
    "className": "MinervaUpload",
    "summary": "File picker with drag and drop, validation and a file list.",
    "description": "File selection with a button or drag and drop, validation (`accept`, `max-size`, `max-count`) and a list of files with their transfer state (`<Upload>` of React). Valid selections fire `minerva-files-selected` (cancelable): unless it is canceled, the files are added to `items` (status \"done\", with their `file`; replacing the listed file in single `replace` mode). Update `items` to show transfer progress / errors and persisted files. With `removable`, each item has a remove button (`minerva-remove`, cancelable; removes the item by default); with `retryable`, failed items have a retry button (`minerva-retry`). Form-associated: submits the `file` of every item under `name` (multipart `FormData`); `required` makes an upload without files invalid (`valueMissing`, localized \"Please select a file.\"); `form.reset()` empties the list; `<fieldset disabled>` and state restoration supported.",
    "properties": [
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Visible label of the field (also names the group and the file input)"
      },
      {
        "name": "accept",
        "attribute": "accept",
        "type": "string",
        "default": "\"*\"",
        "description": "Accepted file types, as for `<input accept>` (\".pdf\", \"image/*\"...)"
      },
      {
        "name": "multiple",
        "attribute": "multiple",
        "type": "boolean",
        "default": "false",
        "description": "Allows selecting several files"
      },
      {
        "name": "replace",
        "attribute": "replace",
        "type": "boolean",
        "default": "false",
        "description": "Single-file mode: a new file replaces the listed one"
      },
      {
        "name": "maxCount",
        "attribute": "max-count",
        "type": "number | undefined",
        "description": "Maximum number of files, including the listed ones (default: 50 when multiple, else 1)"
      },
      {
        "name": "maxSize",
        "attribute": "max-size",
        "type": "number | undefined",
        "description": "Maximum size of a file, in bytes"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Busy state: blocks new selections and retries (removal stays possible)"
      },
      {
        "name": "removable",
        "attribute": "removable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a remove button on every item"
      },
      {
        "name": "retryable",
        "attribute": "retryable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a retry button on failed items"
      },
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Name submitted with the form data"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control (not focusable, not submitted, not validated)"
      },
      {
        "name": "required",
        "attribute": "required",
        "type": "boolean",
        "default": "false",
        "description": "The control must have a value for the form to be submitted"
      },
      {
        "name": "items",
        "type": "UploadItem[]",
        "default": "[]",
        "description": "Listed files with their transfer state"
      },
      {
        "name": "texts",
        "type": "UploadLabels | undefined",
        "description": "Custom texts (the React library's `labels` prop; renamed because `labels` is the form control's `<label>` list); each one overrides the localized default"
      },
      {
        "name": "files",
        "type": "File[]",
        "readonly": true,
        "description": "Files of the listed items (submitted with the form)"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the control is disabled (itself or by a disabled fieldset)."
      },
      {
        "name": "form",
        "type": "HTMLFormElement | null",
        "readonly": true,
        "description": "The form owning the element"
      },
      {
        "name": "labels",
        "type": "NodeList | null",
        "readonly": true,
        "description": "`<label>` elements associated with the element"
      },
      {
        "name": "validity",
        "type": "ValidityState | undefined",
        "readonly": true,
        "description": "Validity state (same as `<input>.validity`)"
      },
      {
        "name": "validationMessage",
        "type": "string",
        "readonly": true,
        "description": "Message describing the current validation error (empty when valid)"
      },
      {
        "name": "willValidate",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the element is a candidate for constraint validation"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void",
        "description": "Focuses the select button"
      },
      {
        "name": "showPicker",
        "signature": "() => void",
        "description": "Opens the file picker"
      },
      {
        "name": "checkValidity",
        "signature": "() => boolean",
        "description": "Checks validity; fires `invalid` when invalid."
      },
      {
        "name": "reportValidity",
        "signature": "() => boolean",
        "description": "Checks validity and shows the browser's validation message."
      },
      {
        "name": "setCustomValidity",
        "signature": "(message: string) => void",
        "description": "Sets (or clears, with `\"\"`) a custom validation error."
      },
      {
        "name": "formResetCallback",
        "signature": "() => void"
      },
      {
        "name": "formDisabledCallback",
        "signature": "(disabled: boolean) => void"
      },
      {
        "name": "formStateRestoreCallback",
        "signature": "(state: string | File | FormData | null) => void"
      }
    ],
    "events": [
      {
        "name": "change",
        "description": "The listed files changed through the user"
      },
      {
        "name": "minerva-files-selected",
        "description": "Valid files were picked or dropped; `detail: { files }`; cancelable (the files are then not listed)"
      },
      {
        "name": "minerva-change",
        "description": "The listed files changed through the user; `detail: { value }` (the items)"
      },
      {
        "name": "minerva-remove",
        "description": "The remove button of an item was activated; `detail: { item }`; cancelable (keeps the item)"
      },
      {
        "name": "minerva-retry",
        "description": "The retry button of a failed item was activated; `detail: { item }`"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The container (`role=group`)"
      },
      {
        "name": "label",
        "description": "The visible label"
      },
      {
        "name": "dropzone",
        "description": "The drop target"
      },
      {
        "name": "select-button",
        "description": "The select button"
      },
      {
        "name": "error",
        "description": "The selection error"
      },
      {
        "name": "list",
        "description": "The file list"
      },
      {
        "name": "item",
        "description": "A file"
      },
      {
        "name": "item--status-uploading",
        "description": "Item state of `item`: status uploading"
      },
      {
        "name": "item--status-done",
        "description": "Item state of `item`: status done"
      },
      {
        "name": "item--status-error",
        "description": "Item state of `item`: status error"
      },
      {
        "name": "remove-button",
        "description": "The remove button of a file"
      },
      {
        "name": "retry-button",
        "description": "The retry button of a failed file"
      }
    ],
    "cssProperties": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      },
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

## Example: 基础用法

选择或拖入文件。accept 与 max-size 会以提示拒绝无效文件；replace 替换单个文件，multiple + max-count 允许多个文件，removable 添加删除按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/upload/wc/basic.html

```html
<div style="display: grid; gap: 16px; max-width: 480px">
  <minerva-upload
    label="Avatar (image, 1 MB max)"
    accept="image/*"
    max-size="1048576"
    replace
    removable
  ></minerva-upload>
  <minerva-upload
    label="Attachments (up to 3 files)"
    multiple
    max-count="3"
    removable
  ></minerva-upload>
</div>

```

## Example: 在表单中

每个列出的文件都以 name 提交（multipart FormData）；required 在没有文件时阻止提交，reset 清空列表。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/upload/wc/form.html

```html
<form id="up-form" style="display: grid; gap: 12px; max-width: 480px">
  <minerva-upload
    name="receipts"
    label="Receipts (PDF or image)"
    accept=".pdf,image/*"
    multiple
    required
    removable
  ></minerva-upload>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Submit expense</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="up-form-result"></output>
</form>

```

### apps/docs/src/docs/pages/upload/wc/form.ts

```tsx
// Every listed file is submitted under `name` (multipart FormData);
// `required` blocks submission without files and reset empties the list.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#up-form")!;
  const result = root.querySelector<HTMLOutputElement>("#up-form-result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const files = new FormData(form).getAll("receipts") as File[];
    result.value = `FormData: ${files.map((file) => `${file.name} (${file.size} B)`).join(", ")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}

```

## Example: 上传进度与重试

取消 minerva-files-selected 后由页面管理 items：文件先显示为上传中，然后成功或失败（每隔一个文件失败一次）；retryable 显示触发 minerva-retry 的重试按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/upload/wc/transfer.html

```html
<minerva-upload
  id="up-transfer"
  label="Documents"
  multiple
  removable
  retryable
  style="max-width: 480px"
></minerva-upload>

```

### apps/docs/src/docs/pages/upload/wc/transfer.ts

```tsx
// Canceling `minerva-files-selected` lets the page own `items`: each file is
// listed as "uploading", then "done" (every second file fails once, to show
// the retry button and `minerva-retry`).
type Item = {
  id: string;
  name: string;
  status: "uploading" | "done" | "error";
  error?: string;
  file?: File;
};
type Upload = HTMLElement & { items: Item[] };

export function setup(root: HTMLElement) {
  const upload = root.querySelector<Upload>("#up-transfer")!;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let count = 0;
  const update = (id: string, patch: Partial<Item>) => {
    upload.items = upload.items.map((item) =>
      item.id === id ? { ...item, ...patch } : item,
    );
  };
  const send = (id: string, fail: boolean) => {
    update(id, { status: "uploading", error: undefined });
    const timer = setTimeout(() => {
      timers.delete(timer);
      update(
        id,
        fail ? { status: "error", error: "Network error" } : { status: "done" },
      );
    }, 1500);
    timers.add(timer);
  };
  const onSelected = (event: Event) => {
    event.preventDefault();
    const { files } = (event as CustomEvent<{ files: File[] }>).detail;
    for (const file of files) {
      const id = `doc-${++count}`;
      upload.items = [
        ...upload.items,
        { id, name: file.name, status: "uploading", file },
      ];
      send(id, count % 2 === 0);
    }
  };
  const onRetry = (event: Event) => {
    send((event as CustomEvent<{ item: Item }>).detail.item.id, false);
  };
  upload.addEventListener("minerva-files-selected", onSelected);
  upload.addEventListener("minerva-retry", onRetry);
  return () => {
    timers.forEach(clearTimeout);
    upload.removeEventListener("minerva-files-selected", onSelected);
    upload.removeEventListener("minerva-retry", onRetry);
  };
}

```
