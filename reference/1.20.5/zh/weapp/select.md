# Select 选择器

支持完整键盘操作、分组与表单集成的单选下拉框。

Package: minerva-design@1.20.5

Renderer: weapp

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

### 行为与无障碍

触发器是带 combobox 角色的按钮（aria-haspopup="listbox"）。点击、Enter、空格、方向键上/下、Home 或 End 会打开列表并聚焦已选选项（无选中时聚焦第一个可用选项）。方向键移动时不会循环，并跳过禁用选项；Home / End 与 Page Up / Page Down 可快速跳转。Enter 或空格选中并关闭，焦点回到触发器；Escape 关闭且不选择；Tab 关闭并继续移动到下一个字段。

在关闭状态的触发器上输入字母会像原生 select 一样直接改变选中项；打开时则移动高亮项。选项内容不是纯文本时请设置 textValue。

列表锚定在触发器下方，宽度不小于触发器；下方空间不足时翻转到上方，选项超出视口时可滚动。这与组件库其他浮层使用同一种 popper 定位：在触屏与小视口上可预期，并且不会遮挡触发器。将列表覆盖在触发器上并对齐已选项（"item-aligned"）是 macOS 的习惯，因此没有采用。

隐藏的原生 select 承载 name、required 与 disabled：值会出现在 FormData 中，required 参与原生约束校验，重置表单会恢复 defaultValue。值为 undefined 或空字符串时显示占位文本。

列表通过 Portal 渲染到最近的 ConfigProvider 的主题容器中。在 Modal 或 Drawer 内按 Escape 只会关闭列表。

## Select

Support: beta

Controlled/default value and open state, disabled/readonly options, grouped labels/separators, search/textValue, size/invalid/required, native content slots and change/openchange. Serializable nested options represent React SelectItem/Group/Label/Separator; browser keyboard/focus and hidden-select form behavior differ. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/select/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "options",
    "typeText": "array",
    "required": false
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": "Select"
  },
  {
    "name": "searchable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "open",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "contentClassName",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "searchPlaceholder",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "emptyText",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
  }
]
```

### slots

```json
[
  {
    "name": "content"
  },
  {
    "name": "default"
  }
]
```

## SelectGroup

Support: n/a

Native composition uses Select: options type=group with label and nested items. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Select props/slots for the native equivalent.

## SelectItem

Support: n/a

Native composition uses Select: options[].value/label/disabled. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Select props/slots for the native equivalent.

## SelectLabel

Support: n/a

Native composition uses Select: options type=label with label. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Select props/slots for the native equivalent.

## SelectSeparator

Support: n/a

Native composition uses Select: options type=separator. No standalone placeholder component is exported. Native serialized props, slots and parent-owned events replace DOM compound child context. Use Select props/slots for the native equivalent.

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
