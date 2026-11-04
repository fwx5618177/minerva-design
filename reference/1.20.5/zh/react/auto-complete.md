# AutoComplete 自动完成

输入时根据内容提示匹配选项的输入框。

Package: minerva-design@1.20.5

Renderer: react

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

### 键盘与无障碍

↓ / ↑ 在可见选项间移动（首尾循环）。

Enter 选择当前激活的选项（跳过禁用选项），且不会提交所在的表单。

Escape 关闭下拉层，焦点保留在输入框中；下拉层已关闭时再按 Escape 会清空文本（onChange 收到 ""）。位于 Modal 或 Popover 内时只关闭下拉层。

输入框使用 combobox 角色，并通过 aria-expanded、aria-controls 和 aria-activedescendant 关联 listbox 中的选项。

## AutoComplete

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "name",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the input"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the input (without it, give the input an accessible name with inputProps[\"aria-label\"] or an enclosing FormControl label)"
  },
  {
    "name": "mode",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "enum",
    "values": [
      "basic",
      "custom"
    ],
    "typeText": "\"basic\" | \"custom\" | undefined",
    "typeRef": "type:55aee3762c526260e675",
    "default": "basic",
    "required": false,
    "description": "\"basic\" renders icon / label / description; \"custom\" uses renderOption"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Input text (controlled; pair with onChange)"
  },
  {
    "name": "options",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "array",
    "typeText": "AutoCompleteOption[]",
    "typeRef": "type:05a671c1db86ec6f91ea",
    "required": true,
    "description": "Options to suggest"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "",
    "required": false,
    "description": "Initial input value (uncontrolled)"
  },
  {
    "name": "groupBy",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => string) | undefined",
    "typeRef": "type:7c56f82ebc6f1e5f48ca",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:2726b1e761e64345d66d"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Returns the group name of an option; options are grouped under headings"
  },
  {
    "name": "renderOption",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "node",
    "typeText": "((option: AutoCompleteOption) => ReactNode) | undefined",
    "typeRef": "type:f7cb7fec9fdeacf480df",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:2726b1e761e64345d66d"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Custom option renderer (used when mode is \"custom\")"
  },
  {
    "name": "renderEmpty",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "node",
    "typeText": "(() => ReactNode) | undefined",
    "typeRef": "type:303f3545f3559103f49e",
    "parameters": [],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Custom content shown when no option matches"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a loading indicator in the dropdown"
  },
  {
    "name": "inputProps",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "object",
    "typeText": "Omit<InputProps, \"onChange\" | \"defaultValue\" | \"name\" | \"value\" | \"ref\"> | undefined",
    "typeRef": "type:e409611139f6c38f0d73",
    "required": false,
    "description": "Props forwarded to the underlying Input (native attributes, aria-label, size, variant, prefix / suffix, clearable...)"
  },
  {
    "name": "emptyProps",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "object",
    "typeText": "Omit<EmptyProps, \"children\"> | undefined",
    "typeRef": "type:900c2511959220671535",
    "required": false,
    "description": "Props forwarded to the default Empty state"
  },
  {
    "name": "dropdownClassName",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Additional class name of the dropdown (portalled) element. It can set the CSS custom properties `--auto-complete-dropdown-background`, `--auto-complete-option-hover-background` and `--auto-complete-option-highlight-background` to recolor the dropdown, hovered options and highlighted options"
  },
  {
    "name": "placement",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "\"top\" | \"bottom\" | \"left\" | \"right\" | undefined",
    "typeRef": "type:6d53de26e109ca539540",
    "default": "bottom",
    "required": false,
    "description": "Preferred dropdown side; the dropdown is aligned with the input's start edge, is at least as wide as the input, and flips / shifts to stay in the viewport"
  },
  {
    "name": "offset",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "object",
    "typeText": "{ x: number; y: number; } | undefined",
    "typeRef": "type:fdc35ba1dbfcf93557e5",
    "required": false,
    "description": "Dropdown offset in pixels. For top / bottom placements `y` is the gap to the input and `x` shifts along it; for left / right placements `x` is the gap and `y` shifts along it"
  },
  {
    "name": "animation",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Animates the dropdown when it opens"
  },
  {
    "name": "filterOption",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((inputValue: string, option: AutoCompleteOption) => boolean) | undefined",
    "typeRef": "type:d998f62baa171b91621d",
    "parameters": [
      {
        "name": "inputValue",
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
        "typeRef": "type:2726b1e761e64345d66d"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false,
    "description": "Custom filter; by default options whose label contains the input (case-insensitive) are shown"
  },
  {
    "name": "sortOption",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((a: AutoCompleteOption, b: AutoCompleteOption) => number) | undefined",
    "typeRef": "type:cb17175e9e07f382cf51",
    "parameters": [
      {
        "name": "a",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:2726b1e761e64345d66d"
      },
      {
        "name": "b",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:2726b1e761e64345d66d"
      }
    ],
    "returnType": {
      "typeText": "number",
      "typeRef": "type:7d1137535c313783dadd"
    },
    "required": false,
    "description": "Compare function used to sort the filtered options"
  },
  {
    "name": "autoHighlight",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Makes the first enabled option active whenever the dropdown opens or the options change, so Enter picks it right away"
  },
  {
    "name": "fillOnSelect",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Writes the label of the picked option into the input. Set to false to keep the typed text, e.g. when picking navigates away"
  },
  {
    "name": "groupMode",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "enum",
    "values": [
      "adjacent",
      "first"
    ],
    "typeText": "\"first\" | \"adjacent\" | undefined",
    "typeRef": "type:3d11038fe6a88f2c475e",
    "default": "first",
    "required": false,
    "description": "How groupBy groups options: \"first\" collects each group at its first appearance; \"adjacent\" groups runs of consecutive options (a group can appear several times). Options whose group is \"\" get no heading"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:469d622564a04ea92e93",
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
    "description": "Called when the input text changes (typing or selecting an option)"
  },
  {
    "name": "onSelect",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => void) | undefined",
    "typeRef": "type:60e8a5239977a1538771",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:2726b1e761e64345d66d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when an option is picked (mouse or keyboard)"
  },
  {
    "name": "onOptionClick",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((option: AutoCompleteOption) => void) | undefined",
    "typeRef": "type:51bf68ba9cc91109ef7f",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AutoCompleteOption",
        "typeRef": "type:2726b1e761e64345d66d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when an option is clicked with the mouse"
  },
  {
    "name": "onDropdownVisibleChange",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((visible: boolean) => void) | undefined",
    "typeRef": "type:e42562a863dcdab01a49",
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
    "required": false,
    "description": "Called when the dropdown opens or closes"
  },
  {
    "name": "onSubmit",
    "source": "packages/react/src/components/AutoComplete/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:be09332b42c367f6c99a",
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
    "description": "Called with the trimmed input text when Enter is pressed while no option is active (e.g. to run a search); the dropdown closes"
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
  "AutoCompleteProps": {
    "source": "react/src/components/AutoComplete/types.ts",
    "description": "Props of the AutoComplete component",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the inner <input> element"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the input"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Label of the input (without it, give the input an accessible name with inputProps[\"aria-label\"] or an enclosing FormControl label)"
      },
      {
        "name": "mode",
        "type": "\"basic\" | \"custom\"",
        "required": false,
        "default": "\"basic\"",
        "description": "\"basic\" renders icon / label / description; \"custom\" uses renderOption"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Input text (controlled; pair with onChange)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called when the input text changes (typing or selecting an option)"
      },
      {
        "name": "options",
        "type": "AutoCompleteOption[]",
        "required": true,
        "default": "[]",
        "description": "Options to suggest"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Initial input value (uncontrolled)"
      },
      {
        "name": "onSelect",
        "type": "(option: AutoCompleteOption) => void",
        "required": false,
        "description": "Called when an option is picked (mouse or keyboard)"
      },
      {
        "name": "groupBy",
        "type": "(option: AutoCompleteOption) => string",
        "required": false,
        "description": "Returns the group name of an option; options are grouped under headings"
      },
      {
        "name": "renderOption",
        "type": "(option: AutoCompleteOption) => React.ReactNode",
        "required": false,
        "description": "Custom option renderer (used when mode is \"custom\")"
      },
      {
        "name": "renderEmpty",
        "type": "() => React.ReactNode",
        "required": false,
        "description": "Custom content shown when no option matches"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a loading indicator in the dropdown"
      },
      {
        "name": "inputProps",
        "type": "Omit<InputProps, \"value\" | \"defaultValue\" | \"onChange\" | \"name\" | \"ref\">",
        "required": false,
        "description": "Props forwarded to the underlying Input (native attributes, aria-label, size, variant, prefix / suffix, clearable...)"
      },
      {
        "name": "emptyProps",
        "type": "Omit<EmptyProps, \"children\">",
        "required": false,
        "description": "Props forwarded to the default Empty state"
      },
      {
        "name": "dropdownClassName",
        "type": "string",
        "required": false,
        "description": "Additional class name of the dropdown (portalled) element. It can set the CSS custom properties `--auto-complete-dropdown-background`, `--auto-complete-option-hover-background` and `--auto-complete-option-highlight-background` to recolor the dropdown, hovered options and highlighted options"
      },
      {
        "name": "placement",
        "type": "\"top\" | \"bottom\" | \"left\" | \"right\"",
        "required": false,
        "default": "\"bottom\"",
        "description": "Preferred dropdown side; the dropdown is aligned with the input's start edge, is at least as wide as the input, and flips / shifts to stay in the viewport"
      },
      {
        "name": "offset",
        "type": "{ x: number; y: number }",
        "required": false,
        "default": "{ x: 0, y: 4 }",
        "description": "Dropdown offset in pixels. For top / bottom placements `y` is the gap to the input and `x` shifts along it; for left / right placements `x` is the gap and `y` shifts along it"
      },
      {
        "name": "animation",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Animates the dropdown when it opens"
      },
      {
        "name": "filterOption",
        "type": "(inputValue: string, option: AutoCompleteOption) => boolean",
        "required": false,
        "description": "Custom filter; by default options whose label contains the input (case-insensitive) are shown"
      },
      {
        "name": "sortOption",
        "type": "(a: AutoCompleteOption, b: AutoCompleteOption) => number",
        "required": false,
        "description": "Compare function used to sort the filtered options"
      },
      {
        "name": "onOptionClick",
        "type": "(option: AutoCompleteOption) => void",
        "required": false,
        "description": "Called when an option is clicked with the mouse"
      },
      {
        "name": "onDropdownVisibleChange",
        "type": "(visible: boolean) => void",
        "required": false,
        "description": "Called when the dropdown opens or closes"
      },
      {
        "name": "onSubmit",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the trimmed input text when Enter is pressed while no option is active (e.g. to run a search); the dropdown closes"
      },
      {
        "name": "autoHighlight",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the first enabled option active whenever the dropdown opens or the options change, so Enter picks it right away"
      },
      {
        "name": "fillOnSelect",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Writes the label of the picked option into the input. Set to false to keep the typed text, e.g. when picking navigates away"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the root element"
      },
      {
        "name": "groupMode",
        "type": "\"first\" | \"adjacent\"",
        "required": false,
        "default": "\"first\"",
        "description": "How groupBy groups options: \"first\" collects each group at its first appearance; \"adjacent\" groups runs of consecutive options (a group can appear several times). Options whose group is \"\" get no heading"
      }
    ]
  },
  "AutoCompleteOption": {
    "source": "react/src/components/AutoComplete/types.ts",
    "description": "An option of the AutoComplete dropdown",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Text displayed for the option and written to the input when selected"
      },
      {
        "name": "value",
        "type": "string | number",
        "required": true,
        "description": "Unique value of the option"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Prevents the option from being selected"
      },
      {
        "name": "highlight",
        "type": "boolean",
        "required": false,
        "description": "Highlights the option (e.g. as a recommendation)"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon displayed before the label (basic mode)"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Secondary text displayed under the label (basic mode)"
      },
      {
        "name": "group",
        "type": "string",
        "required": false,
        "description": "Free-form group identifier, typically read by groupBy"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles of the option"
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

## Example: 下拉框位置与颜色

自定义位置、偏移和动画，并通过 dropdownClassName 设置 CSS 自定义属性 --auto-complete-dropdown-background、--auto-complete-option-hover-background 和 --auto-complete-option-highlight-background，改变下拉框、悬停选项和高亮选项的背景色。下拉框与输入框的起始边对齐，宽度至少与输入框相同，并会翻转 / 平移以保持在视口内。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/appearance.tsx

```tsx
import { AutoComplete } from "minerva-design";

const options = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium", highlight: true },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

// The dropdown is portalled to <body>: set the custom properties on the
// dropdown itself through dropdownClassName.
const css = `
.priority-dropdown {
  --auto-complete-dropdown-background: #f8fafc;
  --auto-complete-option-highlight-background: #fef3c7;
  --auto-complete-option-hover-background: #e0f2fe;
}
`;

export default function AppearanceDemo() {
  return (
    <div style={{ width: 280, marginTop: 180 }}>
      <style>{css}</style>
      <AutoComplete
        name="priority"
        label="Priority (opens above)"
        options={options}
        placement="top"
        offset={{ x: 0, y: 8 }}
        animation={false}
        dropdownClassName="priority-dropdown"
      />
    </div>
  );
}

```

## Example: 远程搜索

随输入请求选项，并在请求期间显示 loading 状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/async-loading.tsx

```tsx
import { useEffect, useState } from "react";
import { AutoComplete, type AutoCompleteOption } from "minerva-design";

const all = ["Apollo", "Artemis", "Gemini", "Mercury", "Skylab", "Voyager"];

export default function AsyncLoadingDemo() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);

  const search = (next: string) => {
    setQuery(next);
    setLoading(true);
  };

  useEffect(() => {
    // Simulate a request to a search API
    const timer = setTimeout(() => {
      setOptions(
        all
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()))
          .map((name) => ({ label: name, value: name })),
      );
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="mission"
        label="Space mission"
        options={options}
        value={query}
        onChange={search}
        loading={loading}
      />
    </div>
  );
}

```

## Example: 基础用法

提示标签中包含输入内容的选项；inputProps 会透传给输入框。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/basic.tsx

```tsx
import { AutoComplete } from "minerva-design";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
];

export default function BasicDemo() {
  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="framework"
        label="Framework"
        options={options}
        inputProps={{ placeholder: "Type to search…" }}
      />
    </div>
  );
}

```

## Example: 受控模式

value / onChange 控制输入文本，onSelect 返回选中的选项，onDropdownVisibleChange 通知下拉框的显示状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/controlled.tsx

```tsx
import { useState } from "react";
import { AutoComplete, type AutoCompleteOption } from "minerva-design";

const options = [
  { label: "Paris", value: "par" },
  { label: "London", value: "lon" },
  { label: "Tokyo", value: "tyo" },
  { label: "New York", value: "nyc" },
];

export default function ControlledDemo() {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<AutoCompleteOption>();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="city"
        label="City"
        options={options}
        value={text}
        onChange={setText}
        onSelect={setSelected}
        onDropdownVisibleChange={setOpen}
      />
      <p>Input: “{text}”</p>
      <p>Selected value: {selected ? selected.value : "none"}</p>
      <p>Dropdown: {open ? "open" : "closed"}</p>
    </div>
  );
}

```

## Example: 自定义渲染

设置 mode="custom" 和 renderOption 完全自定义选项外观；renderEmpty 替换空状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/custom-render.tsx

```tsx
import { AutoComplete } from "minerva-design";

const users = [
  { label: "Ada Lovelace", value: "ada", description: "ada@example.com" },
  { label: "Alan Turing", value: "alan", description: "alan@example.com" },
  { label: "Grace Hopper", value: "grace", description: "grace@example.com" },
];

export default function CustomRenderDemo() {
  return (
    <div style={{ width: 320 }}>
      <AutoComplete
        name="assignee"
        label="Assignee"
        mode="custom"
        options={users}
        renderOption={(option) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <strong>{option.label}</strong>
            <span style={{ opacity: 0.7 }}>{option.description}</span>
          </div>
        )}
        renderEmpty={() => <div style={{ padding: 12 }}>No user found</div>}
      />
    </div>
  );
}

```

## Example: 自定义过滤与排序

filterOption 替换默认的“包含”匹配逻辑，sortOption 对结果排序。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/filter-sort.tsx

```tsx
import { AutoComplete } from "minerva-design";

const options = [
  { label: "Germany", value: "de" },
  { label: "Denmark", value: "dk" },
  { label: "France", value: "fr" },
  { label: "Finland", value: "fi" },
  { label: "Greece", value: "gr" },
];

export default function FilterSortDemo() {
  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="country"
        label="Country (starts with)"
        options={options}
        filterOption={(input, option) =>
          option.label.toLowerCase().startsWith(input.toLowerCase())
        }
        sortOption={(a, b) => a.label.localeCompare(b.label)}
      />
    </div>
  );
}

```

## Example: 选项分组

groupBy 为每个选项返回分组名，分组按首次出现顺序显示并带有标题。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/grouped.tsx

```tsx
import { AutoComplete } from "minerva-design";

const options = [
  { label: "Apple", value: "apple", group: "Fruits" },
  { label: "Banana", value: "banana", group: "Fruits" },
  { label: "Carrot", value: "carrot", group: "Vegetables" },
  { label: "Broccoli", value: "broccoli", group: "Vegetables" },
  { label: "Almond", value: "almond", group: "Nuts" },
];

export default function GroupedDemo() {
  return (
    <div style={{ width: 280 }}>
      <AutoComplete
        name="food"
        label="Food"
        options={options}
        groupBy={(option) => option.group ?? "Other"}
      />
    </div>
  );
}

```

## Example: 图标、描述与状态

basic 模式下选项可以带图标和描述，也可以高亮或禁用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/rich-options.tsx

```tsx
import { AutoComplete } from "minerva-design";
import { FaApple, FaAndroid, FaLinux, FaWindows } from "react-icons/fa";

const options = [
  {
    label: "macOS",
    value: "macos",
    icon: <FaApple />,
    description: "Recommended for this device",
    highlight: true,
  },
  {
    label: "Windows",
    value: "windows",
    icon: <FaWindows />,
    description: "Windows 10 and later",
  },
  {
    label: "Linux",
    value: "linux",
    icon: <FaLinux />,
    description: "deb and rpm packages",
  },
  {
    label: "Android",
    value: "android",
    icon: <FaAndroid />,
    description: "Coming soon",
    disabled: true,
  },
];

export default function RichOptionsDemo() {
  return (
    <div style={{ width: 320 }}>
      <AutoComplete name="platform" label="Platform" options={options} />
    </div>
  );
}

```

## Example: 搜索框

autoHighlight 让回车直接选中第一项建议，fillOnSelect={false} 保留输入文本，无高亮项时 onSubmit 执行搜索。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/auto-complete/demos/search-box.tsx

```tsx
import { useState } from "react";
import { AutoComplete } from "minerva-design";

const books = [
  { value: "1", label: "Lord of the Mysteries", description: "Cuttlefish" },
  { value: "2", label: "Sword of Coming", description: "Fenghuo" },
  { value: "3", label: "A Record of a Mortal", description: "Wangyu" },
];

export default function SearchBoxDemo() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <AutoComplete
        options={books}
        value={query}
        onChange={setQuery}
        autoHighlight
        fillOnSelect={false}
        onSelect={(book) => setResult(`Open book #${book.value}`)}
        onSubmit={(text) => setResult(`Search for "${text}"`)}
        inputProps={{
          "aria-label": "Search books",
          placeholder: "Title or author",
          clearable: true,
        }}
      />
      <span>{result}</span>
    </div>
  );
}

```
