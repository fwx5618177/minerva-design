# Select 选择器

支持完整键盘操作、分组与表单集成的单选下拉框。

Package: minerva-design@1.22.3

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 行为与无障碍

触发器是带 combobox 角色的按钮（aria-haspopup="listbox"）。点击、Enter、空格、方向键上/下、Home 或 End 会打开列表并聚焦已选选项（无选中时聚焦第一个可用选项）。方向键移动时不会循环，并跳过禁用选项；Home / End 与 Page Up / Page Down 可快速跳转。Enter 或空格选中并关闭，焦点回到触发器；Escape 关闭且不选择；Tab 关闭并继续移动到下一个字段。

在关闭状态的触发器上输入字母会像原生 select 一样直接改变选中项；打开时则移动高亮项。选项内容不是纯文本时请设置 textValue。

列表锚定在触发器下方，宽度不小于触发器；下方空间不足时翻转到上方，选项超出视口时可滚动。这与组件库其他浮层使用同一种 popper 定位：在触屏与小视口上可预期，并且不会遮挡触发器。将列表覆盖在触发器上并对齐已选项（"item-aligned"）是 macOS 的习惯，因此没有采用。

隐藏的原生 select 承载 name、required 与 disabled：值会出现在 FormData 中，required 参与原生约束校验，重置表单会恢复 defaultValue。值为 undefined 或空字符串时显示占位文本。

列表通过 Portal 渲染到最近的 ConfigProvider 的主题容器中。在 Modal 或 Drawer 内按 Escape 只会关闭列表。

## Select

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/select",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "attribute": "invalid",
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
    "name": "value",
    "typeText": "string",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Array<SelectOptionData | SelectOptionGroupData>",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "input",
    "typeText": "Event",
    "description": "The value changed (native-like, composed)"
  },
  {
    "name": "change",
    "typeText": "Event",
    "description": "The value changed (native-like)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:80ac7da3b32be412864a"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user selected an option (`detail: { value }`)"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:d1cfae4ed0c75ef94903"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user opened / closed the listbox (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "`<minerva-option>`, `<minerva-option-group>`, `<minerva-select-separator>` elements"
  }
]
```

## SelectGroup

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/option-group",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "A `<minerva-select-label>` and `<minerva-option>` elements"
  }
]
```

## SelectItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/option",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "textValue",
    "typeText": "string | undefined",
    "attribute": "text-value",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "highlighted",
    "typeText": "boolean",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Content of the option (text, icon...)"
  }
]
```

## SelectLabel

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/select-label",
  "exports": [],
  "kind": "side-effect"
}
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label text"
  }
]
```

## SelectSeparator

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/select-separator",
  "exports": [],
  "kind": "side-effect"
}
```

## API

```json
{
  "wc:minerva-option": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaOption",
    "summary": "Selectable option of a select.",
    "description": "An option of a `<minerva-select>` (`<SelectItem>` of React). The element itself is the `role=\"option\"` (it receives focus while the listbox is open); its content is the option's label.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Value of the option (must not be empty)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Prevents selecting the option"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Text shown in the select's trigger when selected (default: the text content)"
      },
      {
        "name": "textValue",
        "attribute": "text-value",
        "type": "string | undefined",
        "description": "Text used for typeahead when the content is not plain text"
      },
      {
        "name": "selected",
        "type": "boolean",
        "default": "false",
        "description": "Whether the option is the selected one (managed by the select)"
      },
      {
        "name": "highlighted",
        "type": "boolean",
        "default": "false",
        "description": "Whether the option is highlighted (managed by the select)"
      },
      {
        "name": "text",
        "type": "string",
        "readonly": true,
        "description": "Text of the option: `textValue`, else `label`, else its text content."
      },
      {
        "name": "displayLabel",
        "type": "string",
        "readonly": true,
        "description": "Label shown in the trigger: `label`, else the text content."
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Content of the option (text, icon...)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The option row"
      },
      {
        "name": "label",
        "description": "The content wrapper"
      },
      {
        "name": "indicator",
        "description": "The check mark (while selected)"
      }
    ],
    "cssProperties": [
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
  },
  "wc:minerva-option-group": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaOptionGroup",
    "summary": "Group of select options.",
    "description": "Groups options of a `<minerva-select>` (`<SelectGroup>` of React, `role=\"group\"`), labelled by its `<minerva-select-label>` child.",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "A `<minerva-select-label>` and `<minerva-option>` elements"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The group wrapper"
      }
    ],
    "cssProperties": [
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
  },
  "wc:minerva-select-label": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaSelectLabel",
    "summary": "Heading of a group of select options.",
    "description": "The (non-selectable) heading of a `<minerva-option-group>` (`<SelectLabel>` of React).",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Label text"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The label"
      }
    ],
    "cssProperties": [
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
  },
  "wc:minerva-select-separator": {
    "kind": "element",
    "source": "web-components/src/components/select/option.ts",
    "className": "MinervaSelectSeparator",
    "summary": "Divider between select options.",
    "description": "A presentational divider between select options or groups (`<SelectSeparator>` of React), hidden from assistive technologies.",
    "properties": [],
    "methods": [],
    "events": [],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The line"
      }
    ],
    "cssProperties": [
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
  },
  "wc:minerva-select": {
    "kind": "element",
    "source": "web-components/src/components/select/select.ts",
    "className": "MinervaSelect",
    "summary": "Single-choice dropdown (select-only combobox + listbox).",
    "description": "Single-choice dropdown (`<Select>` of React) following the WAI-ARIA \"select-only combobox\" pattern: a `<button role=\"combobox\">` trigger and a `role=\"listbox\"` popup anchored below it (flips above when there is no room, at least as wide as the trigger, height capped to the viewport). Options are `<minerva-option>` children (optionally in `<minerva-option-group>` with a `<minerva-select-label>`, separated by `<minerva-select-separator>`) and / or the `options` property (rendered before the children). Keyboard: Enter / Space / ArrowDown / ArrowUp / Home / End open the listbox (DOM focus moves to the highlighted option); typing on the closed trigger selects the matching option without opening; in the listbox the arrows (no wrap, disabled options skipped), Home / End, PageUp / PageDown and typeahead move, Enter / Space / Alt+ArrowUp select, Escape closes (topmost layer only) and Tab closes, focus returning to the trigger. Form-associated: submits `value` under `name`, `required` makes an empty value invalid (`valueMissing`), `form.reset()` restores the `value` attribute, `<fieldset disabled>` disables it.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Initially selected value, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the listbox is open"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string",
        "default": "\"\"",
        "description": "Text shown in the trigger while nothing is selected"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Size of the trigger"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state; sets aria-invalid"
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
        "name": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Selected value (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "options",
        "type": "Array<SelectOptionData | SelectOptionGroupData>",
        "default": "[]",
        "description": "Options rendered before the `<minerva-option>` children"
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
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "blur",
        "signature": "() => void"
      },
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the listbox"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the listbox"
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
        "name": "input",
        "description": "The value changed (native-like, composed)"
      },
      {
        "name": "change",
        "description": "The value changed (native-like)"
      },
      {
        "name": "minerva-change",
        "description": "The user selected an option (`detail: { value }`)"
      },
      {
        "name": "minerva-open-change",
        "description": "The user opened / closed the listbox (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "`<minerva-option>`, `<minerva-option-group>`, `<minerva-select-separator>` elements"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The trigger (`<button role=combobox>`)"
      },
      {
        "name": "value",
        "description": "The selected label / placeholder"
      },
      {
        "name": "icon",
        "description": "The chevron"
      },
      {
        "name": "content",
        "description": "The listbox popup (`role=listbox`)"
      },
      {
        "name": "item",
        "description": "An option rendered from the `options` property"
      },
      {
        "name": "item--selected",
        "description": "Item state of `item`: selected"
      },
      {
        "name": "item--highlighted",
        "description": "Item state of `item`: highlighted"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "group-label",
        "description": "A group heading rendered from the `options` property"
      }
    ],
    "cssProperties": [
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

<minerva-option> 子元素即选项；用外层 <label> 或 aria-label 为选择器命名。size 设置触发器尺寸，禁用的选项无法被选中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/basic.html

```html
<div style="display: grid; gap: 12px; max-width: 280px">
  <label style="display: grid; gap: 4px">
    Fruit
    <minerva-select placeholder="Pick a fruit">
      <minerva-option value="apple">Apple</minerva-option>
      <minerva-option value="banana">Banana</minerva-option>
      <minerva-option value="cherry">Cherry</minerva-option>
      <minerva-option value="durian" disabled
        >Durian (out of stock)</minerva-option
      >
      <minerva-option value="grape">Grape</minerva-option>
    </minerva-select>
  </label>
  <minerva-select aria-label="Small" size="small" value="s">
    <minerva-option value="s">Small</minerva-option>
    <minerva-option value="m">Medium</minerva-option>
  </minerva-select>
  <minerva-select aria-label="Large" size="large" value="l">
    <minerva-option value="m">Medium</minerva-option>
    <minerva-option value="l">Large</minerva-option>
  </minerva-select>
  <minerva-select aria-label="Disabled" placeholder="Disabled" disabled>
    <minerva-option value="a">A</minerva-option>
  </minerva-select>
</div>

```

## Example: 在表单中

该元素与表单关联：以 name 提交其值，设置 required 时为空则阻止提交，重置会恢复 value 属性的值，禁用的 <fieldset> 也会禁用它。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/form.html

```html
<form id="order" style="display: grid; gap: 12px; max-width: 320px">
  <fieldset
    id="fields"
    style="display: grid; gap: 12px; border: 0; padding: 0; margin: 0"
  >
    <label style="display: grid; gap: 4px">
      Shipping
      <minerva-select name="shipping" value="standard">
        <minerva-option value="standard">Standard (3–5 days)</minerva-option>
        <minerva-option value="express">Express (1–2 days)</minerva-option>
      </minerva-select>
    </label>
    <label style="display: grid; gap: 4px">
      Gift wrap (required)
      <minerva-select name="wrap" placeholder="Choose a wrap" required>
        <minerva-option value="none">No wrap</minerva-option>
        <minerva-option value="paper">Paper</minerva-option>
        <minerva-option value="box">Box</minerva-option>
      </minerva-select>
    </label>
  </fieldset>
  <label style="display: flex; gap: 6px; align-items: center">
    <input id="disable" type="checkbox" /> Disable the fieldset
  </label>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Order</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="result"></output>
</form>

```

### apps/docs/src/docs/pages/select/wc/form.ts

```tsx
// The select is form-associated: it submits `value` under `name`, `required`
// blocks submission while empty, form.reset() restores the `value`
// attribute and a disabled <fieldset> disables it.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#order")!;
  const fields = root.querySelector<HTMLFieldSetElement>("#fields")!;
  const disable = root.querySelector<HTMLInputElement>("#disable")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = JSON.stringify(Object.fromEntries(new FormData(form)));
  };
  const onReset = () => {
    result.value = "";
    fields.disabled = false;
  };
  const onToggle = () => (fields.disabled = disable.checked);
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  disable.addEventListener("change", onToggle);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
    disable.removeEventListener("change", onToggle);
  };
}

```

## Example: 分组与富内容选项

<minerva-option-group> 搭配 <minerva-select-label> 标题对选项分组，<minerva-select-separator> 用于分隔。对于富内容选项，label 设置触发器中显示的文本，text-value 设置键入查找所用的文本。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/groups.html

```html
<div style="display: grid; gap: 12px; max-width: 320px">
  <minerva-select aria-label="Time zone" placeholder="Select a time zone">
    <minerva-option-group>
      <minerva-select-label>Europe</minerva-select-label>
      <minerva-option value="europe/london">London (UTC+0)</minerva-option>
      <minerva-option value="europe/paris">Paris (UTC+1)</minerva-option>
      <minerva-option value="europe/berlin">Berlin (UTC+1)</minerva-option>
    </minerva-option-group>
    <minerva-select-separator></minerva-select-separator>
    <minerva-option-group>
      <minerva-select-label>Asia</minerva-select-label>
      <minerva-option value="asia/shanghai">Shanghai (UTC+8)</minerva-option>
      <minerva-option value="asia/tokyo">Tokyo (UTC+9)</minerva-option>
    </minerva-option-group>
  </minerva-select>
  <minerva-select aria-label="Status" value="online">
    <minerva-option value="online" label="Online" text-value="Online">
      <span aria-hidden="true">🟢</span> Online
      <small style="opacity: 0.7">— visible to everyone</small>
    </minerva-option>
    <minerva-option value="away" label="Away" text-value="Away">
      <span aria-hidden="true">🟡</span> Away
      <small style="opacity: 0.7">— notifications muted</small>
    </minerva-option>
    <minerva-option value="offline" label="Offline" text-value="Offline">
      <span aria-hidden="true">⚪</span> Offline
      <small style="opacity: 0.7">— appear offline</small>
    </minerva-option>
  </minerva-select>
</div>

```

## Example: 数据驱动的选项与事件

JS 属性 options 接受普通选项和带标题的分组。minerva-change 报告所选值；minerva-open-change 可取消——勾选复选框即可让列表保持关闭。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/select/wc/options-property.html

```html
<div style="display: grid; gap: 12px; max-width: 320px">
  <minerva-select
    id="country"
    aria-label="Country"
    placeholder="Choose a country"
  >
  </minerva-select>
  <label style="display: flex; gap: 6px; align-items: center">
    <input id="lock" type="checkbox" />
    Keep closed (cancel minerva-open-change)
  </label>
  <output id="log"></output>
</div>

```

### apps/docs/src/docs/pages/select/wc/options-property.ts

```tsx
// `options` is a JS property (flat options and / or labelled groups),
// rendered before any <minerva-option> children. minerva-open-change is
// cancelable: preventDefault() keeps the listbox closed.
type Option = { value: string; label: string; disabled?: boolean };
type Group = { label: string; options: Option[] };

export function setup(root: HTMLElement) {
  const select = root.querySelector<
    HTMLElement & { options: Array<Option | Group> }
  >("#country")!;
  const lock = root.querySelector<HTMLInputElement>("#lock")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  select.options = [
    {
      label: "Europe",
      options: [
        { value: "fr", label: "France" },
        { value: "de", label: "Germany" },
        { value: "it", label: "Italy", disabled: true },
      ],
    },
    {
      label: "Asia",
      options: [
        { value: "cn", label: "China" },
        { value: "jp", label: "Japan" },
      ],
    },
  ];
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    log.value = `minerva-change: ${value}`;
  };
  const onOpenChange = (event: Event) => {
    if (lock.checked) event.preventDefault();
  };
  select.addEventListener("minerva-change", onChange);
  select.addEventListener("minerva-open-change", onOpenChange);
  return () => {
    select.removeEventListener("minerva-change", onChange);
    select.removeEventListener("minerva-open-change", onOpenChange);
  };
}

```
