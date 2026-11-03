# Cascader 级联选择

从层级数据中逐级选择一个值，例如国家 / 地区 / 城市。

Package: minerva-design@1.19.3

Renderer: angular

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

Native Angular: MnCascader. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCascader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "name",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "options",
    "typeText": "CascaderOption[]",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "value",
    "typeText": "CascaderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "CascaderValue | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "displayRender",
    "typeText": "((labels: string[], selectedOptions: CascaderOption[]) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "allowClear",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "expandTrigger",
    "typeText": "\"click\" | \"hover\"",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "showSearch",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "filter",
    "typeText": "((inputValue: string, path: CascaderOption[]) => boolean) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "loadData",
    "typeText": "((selectedOptions: CascaderOption[]) => void) | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "optionRender",
    "typeText": "TemplateRef<CascaderOptionContext> | null",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "width",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "maxLevel",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "dropdownStyle",
    "typeText": "CascaderStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  },
  {
    "name": "optionStyle",
    "typeText": "CascaderStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "CascaderValue | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "selectionChange",
    "typeText": "CascaderSelectionChange",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "CascaderSelectionChange",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "clear",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "search",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/cascader/cascader.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
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

## Example: Hierarchical selection

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCascader } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCascader],
  template: `
<mn-cascader name="region" label="Region" [options]="options" [(value)]="value"/><output>{{value}}</output>
  `,
})
export class Example {
  options = [
  {
    "value": "europe",
    "label": "Europe",
    "children": [
      {
        "value": "france",
        "label": "France"
      },
      {
        "value": "spain",
        "label": "Spain"
      }
    ]
  },
  {
    "value": "asia",
    "label": "Asia",
    "children": [
      {
        "value": "japan",
        "label": "Japan"
      }
    ]
  }
];
  value: string[] = [];
}

```

## Example: Disabled field

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCascader } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCascader],
  template: `
<mn-cascader name="region" label="Locked region" [options]="options" disabled/>
  `,
})
export class Example {
  options = [
  {
    "value": "global",
    "label": "Global"
  }
];
}

```
