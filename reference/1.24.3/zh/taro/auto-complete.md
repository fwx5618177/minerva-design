# AutoComplete 自动完成

输入时根据内容提示匹配选项的输入框。

Package: minerva-design@1.24.3

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "bbcef3f0abff568d08e734ec3e117c8cd10b017e",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:aa4b50ed4e7a53906ab6f39a3da2bbb4024583714e780e0cf99a262437a2babd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

↓ / ↑ 在可见选项间移动（首尾循环）。

Enter 选择当前激活的选项（跳过禁用选项），且不会提交所在的表单。

Escape 关闭下拉层，焦点保留在输入框中；下拉层已关闭时再按 Escape 会清空文本（onChange 收到 ""）。位于 Modal 或 Popover 内时只关闭下拉层。

输入框使用 combobox 角色，并通过 aria-expanded、aria-controls 和 aria-activedescendant 关联 listbox 中的选项。

## AutoComplete

Support: beta

Filter/sort/group options including numeric values, loading/empty states, native confirm first-enabled selection, input props, label fill and original selection/click callbacks; four measured placements and offsets with viewport collision fitting. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports arrow-key active-option navigation and Enter commit with input focus retained. Native confirm chooses the first enabled filtered option when autoHighlight is enabled. The popup remains inline. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "placeholder",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "options",
    "source": "packages/taro/src/forms.tsx",
    "kind": "array",
    "typeText": "(string | AutoCompleteOption)[]",
    "typeRef": "type:02007543cc5d35d5f15b",
    "required": true
  },
  {
    "name": "filterOption",
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((input: string, option: AutoCompleteOption) => boolean) | undefined",
    "typeRef": "type:566531cce97a095e642a",
    "parameters": [
      {
        "name": "input",
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
        "typeRef": "type:bdcb02788b509d34a550"
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
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((a: AutoCompleteOption, b: AutoCompleteOption) => number) | undefined",
    "typeRef": "type:aac30a6fca94d345f120",
    "parameters": [
      {
        "name": "a",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:bdcb02788b509d34a550"
      },
      {
        "name": "b",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:bdcb02788b509d34a550"
      }
    ],
    "returnType": {
      "typeText": "number",
      "typeRef": "type:7d1137535c313783dadd"
    },
    "required": false
  },
  {
    "name": "groupBy",
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => string) | undefined",
    "typeRef": "type:7a3796661791b9c080fc",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:bdcb02788b509d34a550"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false
  },
  {
    "name": "groupMode",
    "source": "packages/taro/src/forms.tsx",
    "kind": "enum",
    "values": [
      "adjacent",
      "first"
    ],
    "typeText": "\"first\" | \"adjacent\" | undefined",
    "typeRef": "type:3d11038fe6a88f2c475e",
    "required": false
  },
  {
    "name": "mode",
    "source": "packages/taro/src/forms.tsx",
    "kind": "enum",
    "values": [
      "basic",
      "custom"
    ],
    "typeText": "\"basic\" | \"custom\" | undefined",
    "typeRef": "type:55aee3762c526260e675",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "inputProps",
    "source": "packages/taro/src/forms.tsx",
    "kind": "object",
    "typeText": "Omit<InputProps, \"onChange\" | \"defaultValue\" | \"value\"> | undefined",
    "typeRef": "type:667a93fd7908badd7525",
    "required": false
  },
  {
    "name": "emptyProps",
    "source": "packages/taro/src/forms.tsx",
    "kind": "node",
    "typeText": "{ title?: ReactNode; description?: ReactNode; } | undefined",
    "typeRef": "type:6d73d4f4e9132e07a4e3",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "renderEmpty",
    "source": "packages/taro/src/forms.tsx",
    "kind": "node",
    "typeText": "(() => ReactNode) | undefined",
    "typeRef": "type:55c1709074f2609450e3",
    "parameters": [],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false
  },
  {
    "name": "renderOption",
    "source": "packages/taro/src/forms.tsx",
    "kind": "node",
    "typeText": "((option: AutoCompleteOption) => ReactNode) | undefined",
    "typeRef": "type:7050f98f44925d33a39c",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:bdcb02788b509d34a550"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:a991edaa7809b6d75ba2"
    },
    "required": false
  },
  {
    "name": "fillOnSelect",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "autoHighlight",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "dropdownClassName",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "placement",
    "source": "packages/taro/src/forms.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "\"top\" | \"bottom\" | \"left\" | \"right\" | undefined",
    "typeRef": "type:6d53de26e109ca539540",
    "required": false
  },
  {
    "name": "offset",
    "source": "packages/taro/src/forms.tsx",
    "kind": "object",
    "typeText": "{ x: number; y: number; } | undefined",
    "typeRef": "type:6d27f2cc4dea1f530257",
    "required": false
  },
  {
    "name": "animation",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/forms.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/forms.tsx",
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
    "name": "defaultValue",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "name",
    "source": "packages/taro/src/forms.tsx",
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
  },
  {
    "name": "readOnly",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "invalid",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "required",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "contentClassName",
    "source": "packages/taro/src/forms.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "open",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/taro/src/forms.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onSelect",
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => void) | undefined",
    "typeRef": "type:3426c056e77a49888f6a",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:bdcb02788b509d34a550"
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
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => void) | undefined",
    "typeRef": "type:77645a3818c5dc208038",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:bdcb02788b509d34a550"
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
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((visible: boolean) => void) | undefined",
    "typeRef": "type:f05b1ad1923973e24dfc",
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
    "name": "onChange",
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:add16cce098bbe2e19a6",
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
    "name": "onOpenChange",
    "source": "packages/taro/src/forms.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:8f4be1ba8c0405ba3ef0",
    "parameters": [
      {
        "name": "open",
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
