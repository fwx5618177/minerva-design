# Cascader 级联选择

从层级数据中逐级选择一个值，例如国家 / 地区 / 城市。

Package: minerva-design@1.19.3

Renderer: native

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

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Cascader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "array",
    "typeText": "CascaderOption[]",
    "typeRef": "type:facda7174478ab560175",
    "required": true
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:fcee8879a48b94da00b4",
    "required": false
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:fcee8879a48b94da00b4",
    "required": false
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "changeOnSelect",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "showSearch",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "filter",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((query: string, path: CascaderOption[]) => boolean) | undefined",
    "typeRef": "type:1fb42bda0dec8800d9ff",
    "parameters": [
      {
        "name": "query",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      },
      {
        "name": "path",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:facda7174478ab560175"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false
  },
  {
    "name": "loadData",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((path: CascaderOption[]) => void) | undefined",
    "typeRef": "type:d15c06685679e7698fc3",
    "parameters": [
      {
        "name": "path",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:facda7174478ab560175"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "displayRender",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "node",
    "typeText": "((labels: string[], path: CascaderOption[]) => ReactNode) | undefined",
    "typeRef": "type:93bf0ae3c8dea8f1a601",
    "parameters": [
      {
        "name": "labels",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:876798c326dba0ca62bf"
      },
      {
        "name": "path",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:facda7174478ab560175"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false
  },
  {
    "name": "optionRender",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "node",
    "typeText": "((option: CascaderOption, level: number) => ReactNode) | undefined",
    "typeRef": "type:74eb69dd56fed4a8fe25",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption",
        "typeRef": "type:8a60099ae7e5d4d5dd4f"
      },
      {
        "name": "level",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false
  },
  {
    "name": "allowClear",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false
  },
  {
    "name": "maxLevel",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 6,
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((value: (string | number)[], options: CascaderOption[]) => void) | undefined",
    "typeRef": "type:504a51e4962c0fc7cade",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "(string | number)[]",
        "typeRef": "type:d30b7a57953f3032038a"
      },
      {
        "name": "options",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:facda7174478ab560175"
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
    "source": "packages/native/src/components/Cascader/index.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:171f26ef457895029d16",
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

## API

```json
{
  "native:CascaderProps": {
    "source": "native/src/components/Cascader/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "options",
        "type": "CascaderOption[]",
        "required": true
      },
      {
        "name": "value",
        "type": "(string | number)[]",
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "(string | number)[]",
        "required": false
      },
      {
        "name": "onChange",
        "type": "(value: (string | number)[], options: CascaderOption[]) => void",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false
      },
      {
        "name": "changeOnSelect",
        "type": "boolean",
        "required": false
      },
      {
        "name": "showSearch",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "filter",
        "type": "(query: string, path: CascaderOption[]) => boolean",
        "required": false
      },
      {
        "name": "loadData",
        "type": "(path: CascaderOption[]) => void",
        "required": false
      },
      {
        "name": "displayRender",
        "type": "(labels: string[], path: CascaderOption[]) => ReactNode",
        "required": false
      },
      {
        "name": "optionRender",
        "type": "(option: CascaderOption, level: number) => ReactNode",
        "required": false
      },
      {
        "name": "allowClear",
        "type": "boolean",
        "required": false,
        "default": "true"
      },
      {
        "name": "maxLevel",
        "type": "number",
        "required": false,
        "default": "6"
      }
    ]
  }
}
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

## Example: 基础用法

点击输入框（或按 Enter、Space、向下箭头）打开面板，再点击选项展开下一级；选择叶子选项即完成选择。下拉框会随列数变宽。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/native/basic.tsx

```tsx
import { Cascader } from "minerva-design/native";
export default function Basic() {
  return (
    <Cascader
      label="Region"
      showSearch
      allowClear
      options={[
        {
          value: "cn",
          label: "China",
          children: [
            { value: "sh", label: "Shanghai" },
            { value: "bj", label: "Beijing" },
          ],
        },
        {
          value: "fr",
          label: "France",
          children: [{ value: "paris", label: "Paris" }],
        },
      ]}
    />
  );
}

```
