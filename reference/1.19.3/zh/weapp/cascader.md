# Cascader 级联选择

从层级数据中逐级选择一个值，例如国家 / 地区 / 城市。

Package: minerva-design@1.19.3

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

在输入框上按 Enter、Space 或向下箭头会打开面板并把焦点移入其中；仅聚焦输入框不会打开面板。

向上 / 向下箭头、Home 和 End 在当前列内移动。

向右箭头或 Enter 展开下一列（懒加载后同样适用），Enter 选中叶子选项；向左箭头返回上一列。

Escape 关闭面板并把焦点还给输入框；Tab 也会关闭面板。

输入框具有 combobox 角色。默认占位文字和 "Clear selection"（清除选择）按钮标签会跟随 React 版的语言设置。

## Cascader

Support: beta

Controlled/default nested paths, separate browsing, configure({filter,optionRender,loadData}), lazy-load coalescing/loading/errors/retry, maxLevel, disabled branches, search and clear. Function callbacks use the native instance configure() API. optionRender returns native text; ReactNode renderers and pointer-hover expansion have no native equivalent. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/cascader/index",
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
    "name": "maxLevel",
    "typeText": "number",
    "required": false,
    "default": 6
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultValue",
    "typeText": "array",
    "required": false
  },
  {
    "name": "changeOnSelect",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showSearch",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "allowClear",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
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
  },
  {
    "name": "load",
    "typeText": "{ selectedOptions: unknown[] }",
    "description": "Lazy branch expansion requested."
  },
  {
    "name": "loaderror",
    "typeText": "{ message: string; selectedOptions: unknown[] }",
    "description": "Lazy load failed; the branch can be retried."
  }
]
```

## CSS variables

```json
{
  "css:Cascader": {
    "kind": "cssVars",
    "source": "react/src/components/Cascader",
    "vars": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
