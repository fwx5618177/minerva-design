# Cascader 级联选择

从层级数据中逐级选择一个值，例如国家 / 地区 / 城市。

Package: minerva-design@1.21.0

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

在输入框上按 Enter、Space 或向下箭头会打开面板并把焦点移入其中；仅聚焦输入框不会打开面板。

向上 / 向下箭头、Home 和 End 在当前列内移动。

向右箭头或 Enter 展开下一列（懒加载后同样适用），Enter 选中叶子选项；向左箭头返回上一列。

Escape 关闭面板并把焦点还给输入框；Tab 也会关闭面板。

输入框具有 combobox 角色。默认占位文字和 "Clear selection"（清除选择）按钮标签会跟随 React 版的语言设置。

## Cascader

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "label",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Label of the input"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Name of the input"
  },
  {
    "name": "options",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "array",
    "typeText": "CascaderOption[]",
    "typeRef": "type:fb01bf79af86c266acb1",
    "required": true,
    "description": "Option tree"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false,
    "description": "Selected path of values (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "array",
    "typeText": "(string | number)[] | undefined",
    "typeRef": "type:3c201ca43fb6fb3589ff",
    "required": false,
    "description": "Initially selected path of values (uncontrolled)"
  },
  {
    "name": "displayRender",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((labels: string[], selectedOptions: CascaderOption[]) => string) | undefined",
    "typeRef": "type:5d520cc4099ed6070916",
    "parameters": [
      {
        "name": "labels",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      },
      {
        "name": "selectedOptions",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the text shown in the input; by default labels are joined with \" / \""
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the cascader; defaults to the enclosing FormControl's state"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the input"
  },
  {
    "name": "allowClear",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows a clear button when a value is selected"
  },
  {
    "name": "expandTrigger",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "enum",
    "values": [
      "click",
      "hover"
    ],
    "typeText": "\"click\" | \"hover\" | undefined",
    "typeRef": "type:00a6c9839f5572025301",
    "default": "click",
    "required": false,
    "description": "How sub-menus are expanded"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the input; overrides `label` and the label of an enclosing FormControl"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) labelling the input"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the input; defaults to the id of an enclosing FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as required (aria-required); defaults to the enclosing FormControl's state"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the value without allowing changes (the dropdown does not open); defaults to the enclosing FormControl's state"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
  },
  {
    "name": "showSearch",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Allows typing to search all paths"
  },
  {
    "name": "filter",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((inputValue: string, path: CascaderOption[]) => boolean) | undefined",
    "typeRef": "type:22976bcc35782cae0650",
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
        "name": "path",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "boolean",
      "typeRef": "type:7087acd01ef7dd9f1d5c"
    },
    "required": false,
    "description": "Custom search predicate; by default paths whose labels contain the input match"
  },
  {
    "name": "loadData",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((selectedOptions: CascaderOption[]) => void) | undefined",
    "typeRef": "type:697054a38914863f2613",
    "parameters": [
      {
        "name": "selectedOptions",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Loads children lazily: clicking an option that has no children and is not isLeaf expands it and calls loadData with its path (instead of selecting it). Add the children to `options` yourself; set `loading` on the option meanwhile"
  },
  {
    "name": "dropdownClassName",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Additional class name of the dropdown"
  },
  {
    "name": "optionRender",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "node",
    "typeText": "((option: CascaderOption, level: number) => ReactNode) | undefined",
    "typeRef": "type:221c09633fe99cfd9da3",
    "parameters": [
      {
        "name": "option",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption",
        "typeRef": "type:d475b7caa061b4ecc3dc"
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
    "required": false,
    "description": "Custom option renderer"
  },
  {
    "name": "width",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 240,
    "required": false,
    "description": "Width of the component"
  },
  {
    "name": "maxLevel",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 6,
    "required": false,
    "description": "Maximum number of levels shown"
  },
  {
    "name": "dropdownStyle",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:40d68ed00bb536ce8766",
    "required": false,
    "description": "Inline styles of the dropdown"
  },
  {
    "name": "optionStyle",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:40d68ed00bb536ce8766",
    "required": false,
    "description": "Inline styles of every option"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Cascader/types.ts",
    "kind": "function",
    "typeText": "((value: (string | number)[], selectedOptions: CascaderOption[]) => void) | undefined",
    "typeRef": "type:92f5df597f431330bdae",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "(string | number)[]",
        "typeRef": "type:6a8218963ce603035852"
      },
      {
        "name": "selectedOptions",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "CascaderOption[]",
        "typeRef": "type:fb01bf79af86c266acb1"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a leaf option is selected or the value is cleared"
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
  "CascaderProps": {
    "source": "react/src/components/Cascader/types.ts",
    "description": "Props of Cascader; `data-*` attributes are forwarded to the root element",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the inner <input> element"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Label of the input"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of the input"
      },
      {
        "name": "options",
        "type": "CascaderOption[]",
        "required": true,
        "default": "[]",
        "description": "Option tree"
      },
      {
        "name": "value",
        "type": "(string | number)[]",
        "required": false,
        "description": "Selected path of values (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "(string | number)[]",
        "required": false,
        "description": "Initially selected path of values (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: (string | number)[], selectedOptions: CascaderOption[]) => void",
        "required": false,
        "description": "Called when a leaf option is selected or the value is cleared"
      },
      {
        "name": "displayRender",
        "type": "(labels: string[], selectedOptions: CascaderOption[]) => string",
        "required": false,
        "description": "Formats the text shown in the input; by default labels are joined with \" / \""
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the cascader; defaults to the enclosing FormControl's state"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "default": "\"Please select\" (localized)",
        "description": "Placeholder of the input"
      },
      {
        "name": "allowClear",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows a clear button when a value is selected"
      },
      {
        "name": "expandTrigger",
        "type": "\"click\" | \"hover\"",
        "required": false,
        "default": "\"click\"",
        "description": "How sub-menus are expanded"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the input; overrides `label` and the label of an enclosing FormControl"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) labelling the input"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Id(s) of the element(s) describing the input; merged with the helper / error text of an enclosing FormControl"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "Id of the input; defaults to the id of an enclosing FormControl"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as required (aria-required); defaults to the enclosing FormControl's state"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "description": "Shows the value without allowing changes (the dropdown does not open); defaults to the enclosing FormControl's state"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Marks the input as invalid (aria-invalid); defaults to the enclosing FormControl's state"
      },
      {
        "name": "showSearch",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Allows typing to search all paths"
      },
      {
        "name": "filter",
        "type": "(inputValue: string, path: CascaderOption[]) => boolean",
        "required": false,
        "description": "Custom search predicate; by default paths whose labels contain the input match"
      },
      {
        "name": "loadData",
        "type": "(selectedOptions: CascaderOption[]) => void",
        "required": false,
        "description": "Loads children lazily: clicking an option that has no children and is not isLeaf expands it and calls loadData with its path (instead of selecting it). Add the children to `options` yourself; set `loading` on the option meanwhile"
      },
      {
        "name": "dropdownClassName",
        "type": "string",
        "required": false,
        "description": "Additional class name of the dropdown"
      },
      {
        "name": "optionRender",
        "type": "(option: CascaderOption, level: number) => ReactNode",
        "required": false,
        "description": "Custom option renderer"
      },
      {
        "name": "width",
        "type": "number | string",
        "required": false,
        "default": "240",
        "description": "Width of the component"
      },
      {
        "name": "maxLevel",
        "type": "number",
        "required": false,
        "default": "6",
        "description": "Maximum number of levels shown"
      },
      {
        "name": "dropdownStyle",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the dropdown"
      },
      {
        "name": "optionStyle",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of every option"
      }
    ]
  },
  "CascaderOption": {
    "source": "react/src/components/Cascader/types.ts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string | number",
        "required": true,
        "description": "Value of the option, unique among its siblings"
      },
      {
        "name": "label",
        "type": "string | number",
        "required": true,
        "description": "Text displayed for the option"
      },
      {
        "name": "children",
        "type": "CascaderOption[]",
        "required": false,
        "description": "Options of the next level"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Prevents the option from being selected"
      },
      {
        "name": "isLeaf",
        "type": "boolean",
        "required": false,
        "description": "Marks the option as a leaf (no children to load) when using loadData"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "description": "Shows a loading indicator while its children are being loaded"
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

### apps/docs/src/docs/pages/cascader/demos/basic.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function BasicDemo() {
  return <Cascader name="city" label="City" options={options} />;
}

```

## Example: 受控模式

传入 value 并在 onChange 中更新；清除时 onChange 会收到空数组。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function ControlledDemo() {
  const [value, setValue] = useState<(string | number)[]>([
    "fr",
    "idf",
    "paris",
  ]);

  return (
    <div>
      <Cascader
        name="city-controlled"
        label="City"
        options={options}
        value={value}
        onChange={(next) => setValue(next)}
        width={300}
      />
      <p>Value: {value.length ? JSON.stringify(value) : "(empty)"}</p>
    </div>
  );
}

```

## Example: 自定义选项与层级

optionRender 按层级渲染每个选项，maxLevel 限制层级深度（最后一层的选项会被选中），dropdownStyle / optionStyle 用于调整菜单样式。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/custom-option.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";
import { FaGlobeEurope, FaMapMarkerAlt } from "react-icons/fa";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function CustomOptionDemo() {
  return (
    <Cascader
      name="region"
      label="Region (2 levels)"
      options={options}
      maxLevel={2}
      optionRender={(option, level) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {level === 0 ? <FaGlobeEurope /> : <FaMapMarkerAlt />}
          {option.label}
        </span>
      )}
      dropdownStyle={{ minWidth: 360 }}
      optionStyle={{ fontWeight: 500 }}
    />
  );
}

```

## Example: 默认值

defaultValue 接收由每一级的值组成的路径。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/default-value.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function DefaultValueDemo() {
  return (
    <Cascader
      name="city-default"
      label="City"
      options={options}
      defaultValue={["jp", "kansai", "kyoto"]}
      width={300}
    />
  );
}

```

## Example: 禁用

通过 option.disabled 禁用单个选项，或通过 disabled 禁用整个组件。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/disabled.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "a",
    label: "Warehouse A",
    children: [
      { value: "a1", label: "Shelf 1" },
      { value: "a2", label: "Shelf 2 (full)", disabled: true },
    ],
  },
  { value: "b", label: "Warehouse B (closed)", disabled: true },
];

export default function DisabledDemo() {
  return (
    <>
      <Cascader name="location" label="Location" options={options} />
      <Cascader
        name="location-disabled"
        label="Disabled"
        options={options}
        defaultValue={["a", "a1"]}
        disabled
      />
    </>
  );
}

```

## Example: 自定义显示

displayRender 自定义输入框中显示的文本；本例只显示最后一级，并关闭了 allowClear。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/display-render.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function DisplayRenderDemo() {
  return (
    <Cascader
      name="city-display"
      label="City (last level only)"
      options={options}
      defaultValue={["fr", "ara", "lyon"]}
      displayRender={(labels) => labels[labels.length - 1] ?? ""}
      allowClear={false}
    />
  );
}

```

## Example: 悬停展开

设置 expandTrigger="hover" 后，鼠标悬停父级选项时展开子菜单。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/hover.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function HoverDemo() {
  return (
    <Cascader
      name="city-hover"
      label="City"
      options={options}
      expandTrigger="hover"
    />
  );
}

```

## Example: 动态加载

点击没有子项且未设置 isLeaf 的选项时，会展开它并调用 loadData，而不是选中它。请在该选项上设置 loading，数据返回后把子项加入 options，并为加载出的叶子选项设置 isLeaf: true，使其可以被选中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/lazy-load.tsx

```tsx
import { useState } from "react";
import { Cascader, type CascaderOption } from "minerva-design";

const initialOptions: CascaderOption[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "docs", label: "Documentation", isLeaf: true },
];

export default function LazyLoadDemo() {
  const [options, setOptions] = useState(initialOptions);

  const loadData = (path: CascaderOption[]) => {
    const target = path[path.length - 1];
    const update = (patch: Partial<CascaderOption>) =>
      setOptions((prev) =>
        prev.map((option) =>
          option.value === target.value ? { ...option, ...patch } : option,
        ),
      );

    update({ loading: true });
    // Simulate a request
    setTimeout(() => {
      update({
        loading: false,
        // isLeaf: true marks the loaded options as selectable leaves;
        // without it, clicking them would call loadData again
        children: [
          {
            value: `${target.value}-team-a`,
            label: `${target.label} team A`,
            isLeaf: true,
          },
          {
            value: `${target.value}-team-b`,
            label: `${target.label} team B`,
            isLeaf: true,
          },
        ],
      });
    }, 800);
  };

  return (
    <Cascader
      name="team"
      label="Team"
      options={options}
      loadData={loadData}
      width={300}
    />
  );
}

```

## Example: 搜索

showSearch 允许输入文字过滤所有路径，filter 可自定义匹配规则。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/demos/search.tsx

```tsx
import { Cascader, type CascaderOption } from "minerva-design";

const options: CascaderOption[] = [
  {
    value: "fr",
    label: "France",
    children: [
      {
        value: "idf",
        label: "Île-de-France",
        children: [
          { value: "paris", label: "Paris" },
          { value: "versailles", label: "Versailles" },
        ],
      },
      {
        value: "ara",
        label: "Auvergne-Rhône-Alpes",
        children: [
          { value: "lyon", label: "Lyon" },
          { value: "grenoble", label: "Grenoble" },
        ],
      },
    ],
  },
  {
    value: "jp",
    label: "Japan",
    children: [
      {
        value: "kanto",
        label: "Kantō",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "yokohama", label: "Yokohama" },
        ],
      },
      {
        value: "kansai",
        label: "Kansai",
        children: [
          { value: "osaka", label: "Osaka" },
          { value: "kyoto", label: "Kyoto" },
        ],
      },
    ],
  },
];

export default function SearchDemo() {
  return (
    <Cascader
      name="city-search"
      label="City"
      placeholder="Type to search"
      options={options}
      showSearch
      filter={(input, path) =>
        path.some((option) =>
          String(option.label).toLowerCase().includes(input.toLowerCase()),
        )
      }
      width={300}
    />
  );
}

```
