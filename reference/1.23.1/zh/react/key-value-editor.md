# KeyValueEditor 键值编辑器

编辑有序的字符串键值对列表，键和值支持多行，提供添加与删除操作；行由稳定 id 跟踪。

Package: minerva-design@1.23.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## KeyValueEditor

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "KeyValueEditor"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "entries",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "array",
    "typeText": "KeyValueEntry[] | undefined",
    "typeRef": "type:55ce35412b0ad1ed857b",
    "required": false,
    "description": "Rows (controlled); omit for an uncontrolled editor"
  },
  {
    "name": "defaultEntries",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "array",
    "typeText": "KeyValueEntry[] | undefined",
    "typeRef": "type:55ce35412b0ad1ed857b",
    "required": false,
    "description": "Initial rows of an uncontrolled editor"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables every field and button"
  },
  {
    "name": "keyLabel",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the key fields (followed by the row number for screen readers)"
  },
  {
    "name": "valueLabel",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the value fields"
  },
  {
    "name": "addLabel",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the add button"
  },
  {
    "name": "removeLabel",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the remove buttons (followed by the row number)"
  },
  {
    "name": "errors",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "object",
    "typeText": "Record<string, KeyValueEntryErrors> | undefined",
    "typeRef": "type:ca00b1f07db8373839cb",
    "required": false,
    "description": "Field errors by entry id; validation belongs to the consumer"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/KeyValueEditor/types.ts",
    "kind": "function",
    "typeText": "((entries: KeyValueEntry[]) => void) | undefined",
    "typeRef": "type:ffc81b3a6c4dcf0c3a84",
    "parameters": [
      {
        "name": "entries",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "KeyValueEntry[]",
        "typeRef": "type:99338b184c0b10bc528e"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the next rows after an edit, an addition or a removal"
  }
]
```

## API

```json
{
  "KeyValueEditorProps": {
    "source": "react/src/components/KeyValueEditor/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"onChange\" | \"defaultValue\">"
    ],
    "props": [
      {
        "name": "entries",
        "type": "KeyValueEntry[]",
        "required": false,
        "description": "Rows (controlled); omit for an uncontrolled editor"
      },
      {
        "name": "defaultEntries",
        "type": "KeyValueEntry[]",
        "required": false,
        "default": "[]",
        "description": "Initial rows of an uncontrolled editor"
      },
      {
        "name": "onChange",
        "type": "(entries: KeyValueEntry[]) => void",
        "required": false,
        "description": "Called with the next rows after an edit, an addition or a removal"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables every field and button"
      },
      {
        "name": "keyLabel",
        "type": "string",
        "required": false,
        "default": "\"Key\" (localized)",
        "description": "Label of the key fields (followed by the row number for screen readers)"
      },
      {
        "name": "valueLabel",
        "type": "string",
        "required": false,
        "default": "\"Value\" (localized)",
        "description": "Label of the value fields"
      },
      {
        "name": "addLabel",
        "type": "string",
        "required": false,
        "default": "\"Add entry\" (localized)",
        "description": "Text of the add button"
      },
      {
        "name": "removeLabel",
        "type": "string",
        "required": false,
        "default": "\"Remove entry\" (localized)",
        "description": "Accessible label of the remove buttons (followed by the row number)"
      },
      {
        "name": "errors",
        "type": "Record<string, KeyValueEntryErrors>",
        "required": false,
        "description": "Field errors by entry id; validation belongs to the consumer"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the container <div>"
      }
    ]
  },
  "KeyValueEntry": {
    "source": "react/src/components/KeyValueEditor/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Stable id of the row (React key, error lookup); keep it across edits"
      },
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Key text (whitespace and newlines are preserved)"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value text (whitespace and newlines are preserved)"
      }
    ]
  },
  "KeyValueEntryErrors": {
    "source": "react/src/components/KeyValueEditor/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": false,
        "description": "Error message of the key field"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Error message of the value field"
      }
    ]
  }
}
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

## Example: 基础用法

带自定义标签的受控条目；保留换行和重复键。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/demos/basic.tsx

```tsx
import { KeyValueEditor, type KeyValueEntry } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [entries, setEntries] = useState<KeyValueEntry[]>([
    { id: "greeting", key: "greeting", value: "Hello\nworld" },
  ]);
  return (
    <KeyValueEditor
      entries={entries}
      onChange={setEntries}
      keyLabel="Translation key"
      valueLabel="Translation"
      addLabel="Add translation"
      removeLabel="Remove translation"
    />
  );
}

```

## Example: 校验错误

由使用方校验并按条目 id 传入错误；重新排序后错误仍保持关联。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/key-value-editor/demos/errors.tsx

```tsx
import { KeyValueEditor, type KeyValueEntry } from "minerva-design";
import { useState } from "react";

export default function ErrorsDemo() {
  const [entries, setEntries] = useState<KeyValueEntry[]>([
    { id: "a", key: "Accept", value: "application/json" },
    { id: "b", key: "Accept", value: "" },
  ]);
  const errors = Object.fromEntries(
    entries.map((entry) => [
      entry.id,
      {
        key: entries.some((other) => other !== entry && other.key === entry.key)
          ? "Duplicate header"
          : undefined,
        value: entry.value ? undefined : "Value required",
      },
    ]),
  );
  return (
    <KeyValueEditor entries={entries} onChange={setEntries} errors={errors} />
  );
}

```
