# AutoComplete 自动完成

输入时根据内容提示匹配选项的输入框。

Package: minerva-design@1.21.0

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

↓ / ↑ 在可见选项间移动（首尾循环）。

Enter 选择当前激活的选项（跳过禁用选项），且不会提交所在的表单。

Escape 关闭下拉层，焦点保留在输入框中；下拉层已关闭时再按 Escape 会清空文本（onChange 收到 ""）。位于 Modal 或 Popover 内时只关闭下拉层。

输入框使用 combobox 角色，并通过 aria-expanded、aria-controls 和 aria-activedescendant 关联 listbox 中的选项。

## AutoComplete

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "AutoComplete"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "options",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "array",
    "typeText": "AutoCompleteOption[]",
    "typeRef": "type:476293116b40c2c28bf3",
    "required": true
  },
  {
    "name": "value",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false
  },
  {
    "name": "groupBy",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => string) | undefined",
    "typeRef": "type:6efb95b38df465e70c2a",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:47c4ecc885bafa5d9c69"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false
  },
  {
    "name": "renderOption",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "node",
    "typeText": "((option: AutoCompleteOption) => ReactNode) | undefined",
    "typeRef": "type:0bcb0e908c1d33dffd42",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:47c4ecc885bafa5d9c69"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false
  },
  {
    "name": "renderEmpty",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "node",
    "typeText": "(() => ReactNode) | undefined",
    "typeRef": "type:bf2249db7f2ff8c22284",
    "parameters": [],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "inputProps",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "object",
    "typeText": "Omit<InputProps, \"value\" | \"defaultValue\" | \"onChange\"> | undefined",
    "typeRef": "type:4b694bff83ac31867f48",
    "required": false
  },
  {
    "name": "filterOption",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((value: string, option: AutoCompleteOption) => boolean) | undefined",
    "typeRef": "type:e243d0501dc655f9b4cf",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "option",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:47c4ecc885bafa5d9c69"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false
  },
  {
    "name": "sortOption",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((a: AutoCompleteOption, b: AutoCompleteOption) => number) | undefined",
    "typeRef": "type:5a745fdaf70a3668a57f",
    "parameters": [
      {
        "name": "a",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:47c4ecc885bafa5d9c69"
      },
      {
        "name": "b",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:47c4ecc885bafa5d9c69"
      }
    ],
    "returnType": {
      "typeText": "number",
      "typeRef": "type:7d1137535c313783dadd"
    },
    "required": false
  },
  {
    "name": "autoHighlight",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "fillOnSelect",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:b50edf86d8445c4eeb0e",
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
    "required": false
  },
  {
    "name": "onSelect",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => void) | undefined",
    "typeRef": "type:8ff57f13f845d11eb39e",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:47c4ecc885bafa5d9c69"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOptionClick",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => void) | undefined",
    "typeRef": "type:4b5f9bb9f3aeedab551d",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:47c4ecc885bafa5d9c69"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onDropdownVisibleChange",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((visible: boolean) => void) | undefined",
    "typeRef": "type:b9b3d3c01dee468cfbbb",
    "parameters": [
      {
        "name": "visible",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onSubmit",
    "source": "packages/native/src/components/AutoComplete/index.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:3f492d4e2bb9815505b4",
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
    "required": false
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
  "native:AutoCompleteProps": {
    "source": "native/src/components/AutoComplete/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "options",
        "type": "AutoCompleteOption[]",
        "required": true
      },
      {
        "name": "value",
        "type": "string",
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "default": "\"\""
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false
      },
      {
        "name": "onSelect",
        "type": "(option: AutoCompleteOption) => void",
        "required": false
      },
      {
        "name": "onOptionClick",
        "type": "(option: AutoCompleteOption) => void",
        "required": false
      },
      {
        "name": "groupBy",
        "type": "(option: AutoCompleteOption) => string",
        "required": false
      },
      {
        "name": "renderOption",
        "type": "(option: AutoCompleteOption) => ReactNode",
        "required": false
      },
      {
        "name": "renderEmpty",
        "type": "() => ReactNode",
        "required": false
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "inputProps",
        "type": "Omit<InputProps, \"value\" | \"defaultValue\" | \"onChange\">",
        "required": false
      },
      {
        "name": "filterOption",
        "type": "(value: string, option: AutoCompleteOption) => boolean",
        "required": false
      },
      {
        "name": "sortOption",
        "type": "(a: AutoCompleteOption, b: AutoCompleteOption) => number",
        "required": false
      },
      {
        "name": "onDropdownVisibleChange",
        "type": "(visible: boolean) => void",
        "required": false
      },
      {
        "name": "onSubmit",
        "type": "(value: string) => void",
        "required": false
      },
      {
        "name": "autoHighlight",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "fillOnSelect",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:AutoComplete": {
    "kind": "cssVars",
    "source": "react/src/components/AutoComplete",
    "vars": [
      {
        "name": "--auto-complete-dropdown-background",
        "description": "Background of the dropdown"
      },
      {
        "name": "--auto-complete-dropdown-radius",
        "description": "Corner radius of the dropdown (defaults to --radius-lg)"
      },
      {
        "name": "--auto-complete-dropdown-max-height",
        "description": "Maximum height of the option list before it scrolls"
      },
      {
        "name": "--auto-complete-font-size",
        "description": "Font size of the dropdown"
      },
      {
        "name": "--auto-complete-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--auto-complete-option-padding-x",
        "description": "Horizontal padding of an option and of a group label"
      },
      {
        "name": "--auto-complete-option-hover-background",
        "description": "Background of the hovered / keyboard-focused option"
      },
      {
        "name": "--auto-complete-option-highlight-background",
        "description": "Background of options with `highlight: true`"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

提示标签中包含输入内容的选项；inputProps 会透传给输入框。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/native/basic.tsx

```tsx
import { useState } from "react";
import { AutoComplete } from "minerva-design/native";
export default function Basic() {
  const [value, setValue] = useState("");
  return (
    <AutoComplete
      label="Component"
      value={value}
      onChange={setValue}
      options={[
        { label: "Button", value: "button" },
        { label: "Table", value: "table" },
        { label: "Tooltip", value: "tooltip", description: "Contextual help" },
      ]}
    />
  );
}

```
