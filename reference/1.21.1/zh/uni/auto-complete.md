# AutoComplete 自动完成

输入时根据内容提示匹配选项的输入框。

Package: minerva-design@1.21.1

Renderer: uni

Locale: zh

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

### 键盘与无障碍

↓ / ↑ 在可见选项间移动（首尾循环）。

Enter 选择当前激活的选项（跳过禁用选项），且不会提交所在的表单。

Escape 关闭下拉层，焦点保留在输入框中；下拉层已关闭时再按 Escape 会清空文本（onChange 收到 ""）。位于 Modal 或 Popover 内时只关闭下拉层。

输入框使用 combobox 角色，并通过 aria-expanded、aria-controls 和 aria-activedescendant 关联 listbox 中的选项。

## AutoComplete

Support: beta

Controlled/model/default text and owner rejection; numeric option identities; selection returns the option and fills its label; fillOnSelect, filter/sort, first/adjacent groups, loading/empty/option slots, autoHighlight, native confirm, H5 keys, IME guards and dropdown visibility events. Reuses Input for field props. Custom content uses native scoped slots instead of React renderOption/renderEmpty functions. Measured native fixed dropdown flips/shifts within the viewport and can animate; it does not use a DOM portal. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Option[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "autoHighlight",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "fillOnSelect",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "filterOption",
    "typeText": "((input: string, option: Option) => boolean) | undefined",
    "required": false
  },
  {
    "name": "sortOption",
    "typeText": "((a: Option, b: Option) => number) | undefined",
    "required": false
  },
  {
    "name": "groupBy",
    "typeText": "((option: Option) => string) | undefined",
    "required": false
  },
  {
    "name": "groupMode",
    "typeText": "\"first\" | \"adjacent\" | undefined",
    "required": false
  },
  {
    "name": "inputProps",
    "typeText": "Record<string, any> | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "animation",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placement",
    "typeText": "\"bottom\" | \"top\" | \"left\" | \"right\" | undefined",
    "required": false
  },
  {
    "name": "offset",
    "typeText": "{ x: number; y: number; } | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "select",
    "typeText": "[option: Option]",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "typeText": "Option",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "optionClick",
    "typeText": "[option: Option]",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "typeText": "Option",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "dropdownVisibleChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "submit",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
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
    "name": "loading",
    "typeText": "{}"
  },
  {
    "name": "empty",
    "typeText": "{}"
  },
  {
    "name": "option",
    "typeText": "{ option: Option; }"
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
