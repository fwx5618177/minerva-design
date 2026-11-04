# TagInput 标签输入

带建议的自由标签输入：Enter、添加按钮或失焦会添加草稿，方向键选择建议，输入法组字期间不会提交。

Package: minerva-design@1.20.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## TagInput

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Selected tags (controlled); omit for an uncontrolled field"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Initial tags of an uncontrolled field"
  },
  {
    "name": "options",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Suggestions; already selected tags are hidden and duplicates merged"
  },
  {
    "name": "commitOnBlur",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Adds the typed draft as a tag when the input loses focus"
  },
  {
    "name": "separators",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Keys that commit the draft: a literal string (e.g. \",\" or \";\") splits the typed or pasted text into tags; \"Enter\" commits on the Enter key (and also splits pasted text on line breaks)"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the text input (defaults to the FormControl id)"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Submits every selected tag under this name (hidden inputs); the draft is not submitted"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the text input"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the text input when there is no FormControl label"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Ids of the elements labelling the text input (wins over the FormControl label)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra ids describing the text input"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the field (also set by FormControl)"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the tags without editing controls (also set by FormControl)"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Error state (also set by an invalid FormControl)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "TagInputSize | undefined",
    "typeRef": "type:8480937d67628f2e44f1",
    "default": "medium",
    "required": false,
    "description": "Size of the text input"
  },
  {
    "name": "emptyText",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text of the suggestion list when nothing matches"
  },
  {
    "name": "addLabel",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the add button"
  },
  {
    "name": "clearLabel",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the clear button"
  },
  {
    "name": "removeLabel",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "function",
    "typeText": "((tag: string) => string) | undefined",
    "typeRef": "type:1639362050e315476a66",
    "parameters": [
      {
        "name": "tag",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible label of a tag's remove button"
  },
  {
    "name": "createLabel",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "function",
    "typeText": "((tag: string) => string) | undefined",
    "typeRef": "type:e6083852fde45a5a80b2",
    "parameters": [
      {
        "name": "tag",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Text of the \"create this tag\" suggestion"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/TagInput/types.ts",
    "kind": "function",
    "typeText": "((value: string[]) => void) | undefined",
    "typeRef": "type:70f3064926d2f654b375",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the next tags after an addition, a removal or clearing"
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

## API

```json
{
  "TagInputProps": {
    "source": "react/src/components/TagInput/types.ts",
    "description": "`data-*` attributes are forwarded to the wrapper.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "value",
        "type": "readonly string[]",
        "required": false,
        "description": "Selected tags (controlled); omit for an uncontrolled field"
      },
      {
        "name": "defaultValue",
        "type": "readonly string[]",
        "required": false,
        "default": "[]",
        "description": "Initial tags of an uncontrolled field"
      },
      {
        "name": "onChange",
        "type": "(value: string[]) => void",
        "required": false,
        "description": "Called with the next tags after an addition, a removal or clearing"
      },
      {
        "name": "options",
        "type": "readonly string[]",
        "required": false,
        "default": "[]",
        "description": "Suggestions; already selected tags are hidden and duplicates merged"
      },
      {
        "name": "commitOnBlur",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Adds the typed draft as a tag when the input loses focus"
      },
      {
        "name": "separators",
        "type": "readonly string[]",
        "required": false,
        "default": "[\",\", \"Enter\"]",
        "description": "Keys that commit the draft: a literal string (e.g. \",\" or \";\") splits the typed or pasted text into tags; \"Enter\" commits on the Enter key (and also splits pasted text on line breaks)"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the text input (defaults to the FormControl id)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Submits every selected tag under this name (hidden inputs); the draft is not submitted"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder of the text input"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible name of the text input when there is no FormControl label"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Ids of the elements labelling the text input (wins over the FormControl label)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra ids describing the text input"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the field (also set by FormControl)"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the tags without editing controls (also set by FormControl)"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Error state (also set by an invalid FormControl)"
      },
      {
        "name": "size",
        "type": "TagInputSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of the text input"
      },
      {
        "name": "emptyText",
        "type": "string",
        "required": false,
        "default": "\"No matches\" (localized)",
        "description": "Text of the suggestion list when nothing matches"
      },
      {
        "name": "addLabel",
        "type": "string",
        "required": false,
        "default": "\"Add tag\" (localized)",
        "description": "Accessible label of the add button"
      },
      {
        "name": "clearLabel",
        "type": "string",
        "required": false,
        "default": "\"Clear tags\" (localized)",
        "description": "Accessible label of the clear button"
      },
      {
        "name": "removeLabel",
        "type": "(tag: string) => string",
        "required": false,
        "default": "tag => `Remove ${tag}` (localized)",
        "description": "Accessible label of a tag's remove button"
      },
      {
        "name": "createLabel",
        "type": "(tag: string) => string",
        "required": false,
        "default": "tag => `Add \"${tag}\"` (localized)",
        "description": "Text of the \"create this tag\" suggestion"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Class name of the wrapper"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline style of the wrapper"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the text <input>"
      }
    ]
  }
}
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

## Example: 基础用法

已选标签不会出现在建议中；Escape 丢弃草稿。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/demos/basic.tsx

```tsx
import { TagInput } from "minerva-design";
import { useState } from "react";

export default function BasicDemo() {
  const [tags, setTags] = useState<readonly string[]>(["React"]);
  return (
    <TagInput
      aria-label="Tags"
      placeholder="Type a tag and press Enter"
      value={tags}
      onChange={setTags}
      options={["React", "Vue", "Svelte", "Solid"]}
    />
  );
}

```

## Example: 表单

name 会将每个标签作为隐藏输入提交；FormField 提供标签和只读状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/demos/form-control.tsx

```tsx
import { FormField, TagInput } from "minerva-design";

export default function FormControlDemo() {
  return (
    <>
      <FormField
        label="Article tags"
        helperText="Submitted as repeated tags fields."
      >
        <TagInput name="tags" defaultValue={["news", "tech"]} size="small" />
      </FormField>
      <FormField label="Read-only tags" readOnly>
        <TagInput defaultValue={["archived"]} />
      </FormField>
    </>
  );
}

```

## Example: 分隔符

separators 列出将输入或粘贴的文本拆分为标签的字符串；"Enter" 表示按下回车键时提交，并按换行拆分粘贴内容。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tag-input/demos/separators.tsx

```tsx
import { TagInput } from "minerva-design";
import { useState } from "react";

export default function SeparatorsDemo() {
  const [tags, setTags] = useState<readonly string[]>(["alice@example.com"]);
  return (
    <TagInput
      aria-label="Recipients"
      placeholder='Type or paste "a; b, c"'
      value={tags}
      onChange={setTags}
      separators={[",", ";", "Enter"]}
    />
  );
}

```
