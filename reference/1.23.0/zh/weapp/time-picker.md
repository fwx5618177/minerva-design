# TimePicker 时间选择器

通过时、分、秒列选择一天中的时间，也可以直接输入。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

在输入框上按向下箭头打开面板；点击外部关闭面板。

每一列（时、分、秒、上午/下午）都是 listbox：向上 / 向下箭头、Home 和 End 在列内移动，向左 / 向右箭头切换列。

Enter 或 Space 选择当前聚焦的选项。

Escape 关闭面板并把焦点还给输入框。在最后一列按 Tab 会关闭面板并移到下一个字段；在第一列按 Shift+Tab 会关闭面板并回到输入框。

输入的文本只有在构成完整且有效的时间时才会提交。失焦时会采用更宽松的解析；文本为空则清除值，无法解析则恢复之前的值。

## TimePicker

Support: beta

Core strict/lenient typed parsing, controlled/default serialized time and null clear, seconds/format/12-hour mode, stepped hour/minute/second columns, bounds, labels/field flags, guarded opening and openchange. Native values use HH:mm[:ss] strings and null instead of Date/undefined; browser focus and keyboard panel navigation have native input equivalents. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/time-picker/index",
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
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": false
  },
  {
    "name": "start",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "end",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "placeholder",
    "typeText": "string",
    "required": false,
    "default": "Select time"
  },
  {
    "name": "defaultValue",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "format",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "use12Hours",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showSecond",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "hourStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "minuteStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "secondStep",
    "typeText": "number",
    "required": false,
    "default": 1
  },
  {
    "name": "minTime",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "maxTime",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": false,
    "default": "time-picker"
  },
  {
    "name": "label",
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
    "typeText": "{ value: string | null }",
    "description": "Serialized HH:mm[:ss], or null on clear; Date is not transmitted across the native property boundary."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
  }
]
```

## CSS variables

```json
{
  "css:TimePicker": {
    "kind": "cssVars",
    "source": "react/src/components/TimePicker",
    "vars": [
      {
        "name": "--time-picker-width",
        "description": "Width of the field"
      },
      {
        "name": "--time-picker-panel-radius",
        "description": "Corner radius of the panel (defaults to --radius-sm)"
      },
      {
        "name": "--time-picker-panel-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--time-picker-column-width",
        "description": "Width of an hours / minutes / seconds column"
      },
      {
        "name": "--time-picker-column-height",
        "description": "Height of the columns before they scroll"
      },
      {
        "name": "--time-picker-cell-height",
        "description": "Height of a time cell (defaults to the density's small control height)"
      },
      {
        "name": "--time-picker-cell-padding-x",
        "description": "Horizontal padding of a time cell (follows the density's row padding)"
      },
      {
        "name": "--time-picker-selected-background",
        "description": "Background of the selected time cell"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
