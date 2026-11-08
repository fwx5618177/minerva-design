# Select 选择器

支持完整键盘操作、分组与表单集成的单选下拉框。

Package: minerva-design@1.23.1

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 行为与无障碍

触发器是带 combobox 角色的按钮（aria-haspopup="listbox"）。点击、Enter、空格、方向键上/下、Home 或 End 会打开列表并聚焦已选选项（无选中时聚焦第一个可用选项）。方向键移动时不会循环，并跳过禁用选项；Home / End 与 Page Up / Page Down 可快速跳转。Enter 或空格选中并关闭，焦点回到触发器；Escape 关闭且不选择；Tab 关闭并继续移动到下一个字段。

在关闭状态的触发器上输入字母会像原生 select 一样直接改变选中项；打开时则移动高亮项。选项内容不是纯文本时请设置 textValue。

列表锚定在触发器下方，宽度不小于触发器；下方空间不足时翻转到上方，选项超出视口时可滚动。这与组件库其他浮层使用同一种 popper 定位：在触屏与小视口上可预期，并且不会遮挡触发器。将列表覆盖在触发器上并对齐已选项（"item-aligned"）是 macOS 的习惯，因此没有采用。

隐藏的原生 select 承载 name、required 与 disabled：值会出现在 FormData 中，required 参与原生约束校验，重置表单会恢复 defaultValue。值为 undefined 或空字符串时显示占位文本。

列表通过 Portal 渲染到最近的 ConfigProvider 的主题容器中。在 Modal 或 Drawer 内按 Escape 只会关闭列表。

## Select

Support: beta

Options open in a bottom sheet (single or multiple)

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Select"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "multiple",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Several values (checkboxes and a confirm button)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:cdf445ffccc04acaf8cd",
    "required": false,
    "description": "Selected value (controlled; pair with `onChange`) Selected values (controlled; pair with `onChange`)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:cdf445ffccc04acaf8cd",
    "required": false,
    "description": "Initially selected value (uncontrolled) Initially selected values (uncontrolled)"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "options",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "array",
    "typeText": "SelectOption[] | undefined",
    "typeRef": "type:e271e6e04b0fbf392840",
    "required": false,
    "description": "The options"
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state of the options sheet"
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown in the trigger while nothing is selected"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Size of the trigger"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the select"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label above the trigger; also its accessible name and the sheet title"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title of the options sheet"
  },
  {
    "name": "searchable",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a search field filtering the options by label"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the trigger when there is no `label`"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Select/Select.tsx",
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
    "name": "onChange",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | ((value: string[]) => void) | undefined",
    "typeRef": "type:68aa65800c73636ebe44",
    "parameters": [
      {
        "name": "value",
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
    "required": false,
    "description": "Called with the picked value (the sheet then closes) Called with the confirmed values"
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "function",
    "typeText": "((open: boolean, reason?: OverlayCloseReason | undefined) => void) | undefined",
    "typeRef": "type:4865fc0abe338cf883c6",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "reason",
        "position": 1,
        "required": false,
        "rest": false,
        "typeText": "OverlayCloseReason | undefined",
        "typeRef": "type:dee0306bddc4ca67a449"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested open state (and, when closing, the reason: \"action\" after a pick, \"confirm\", \"cancel\", \"mask\", \"back\")"
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
  },
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## SelectGroup

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
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

## SelectItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "textValue",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
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

## SelectLabel

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectLabel"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## SelectSeparator

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectSeparator"
  ],
  "kind": "named"
}
```

## API

```json
{
  "native:SelectSingleProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "interface",
    "extends": [
      "SelectBaseProps"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "false",
        "required": false,
        "default": "false",
        "description": "Several values (checkboxes and a confirm button)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected value (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the picked value (the sheet then closes)"
      }
    ]
  },
  "native:SelectMultipleProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "interface",
    "extends": [
      "SelectBaseProps"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "true",
        "required": true,
        "default": "false",
        "description": "Several values (checkboxes and a confirm button)"
      },
      {
        "name": "value",
        "type": "string[]",
        "required": false,
        "description": "Selected values (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultValue",
        "type": "string[]",
        "required": false,
        "description": "Initially selected values (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string[]) => void",
        "required": false,
        "description": "Called with the confirmed values"
      }
    ]
  },
  "native:SelectOption": {
    "source": "native/src/components/Select/Select.tsx",
    "description": "An option of the list",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "group",
        "type": "string",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Visible text (also the accessible name of the row)"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value reported by `onChange`"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the row"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Secondary text under the label"
      }
    ]
  },
  "native:SelectProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "alias",
    "type": "SelectSingleProps | SelectMultipleProps"
  },
  "native:SelectItemProps": {
    "source": "native/src/components/Select/SelectParts.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "required": false
      }
    ]
  },
  "native:SelectGroupProps": {
    "source": "native/src/components/Select/SelectParts.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Select": {
    "kind": "cssVars",
    "source": "react/src/components/Select",
    "vars": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本用法

默认选中 English，选择 Chinese 或 French 后更新受控语言值。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/select/native/basic.tsx

```tsx
import { useState } from "react";
import { Select } from "minerva-design/native";
export default function Basic() {
  const [language, setLanguage] = useState("en");
  return (
    <Select
      accessibilityLabel="Language"
      value={language}
      onChange={setLanguage}
      options={[
        { value: "en", label: "English" },
        { value: "zh", label: "Chinese" },
        { value: "fr", label: "French" },
      ]}
    />
  );
}

```
