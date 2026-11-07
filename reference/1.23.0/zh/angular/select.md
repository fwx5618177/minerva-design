# Select 选择器

支持完整键盘操作、分组与表单集成的单选下拉框。

Package: minerva-design@1.23.0

Renderer: angular

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

### 行为与无障碍

触发器是带 combobox 角色的按钮（aria-haspopup="listbox"）。点击、Enter、空格、方向键上/下、Home 或 End 会打开列表并聚焦已选选项（无选中时聚焦第一个可用选项）。方向键移动时不会循环，并跳过禁用选项；Home / End 与 Page Up / Page Down 可快速跳转。Enter 或空格选中并关闭，焦点回到触发器；Escape 关闭且不选择；Tab 关闭并继续移动到下一个字段。

在关闭状态的触发器上输入字母会像原生 select 一样直接改变选中项；打开时则移动高亮项。选项内容不是纯文本时请设置 textValue。

列表锚定在触发器下方，宽度不小于触发器；下方空间不足时翻转到上方，选项超出视口时可滚动。这与组件库其他浮层使用同一种 popper 定位：在触屏与小视口上可预期，并且不会遮挡触发器。将列表覆盖在触发器上并对齐已选项（"item-aligned"）是 macOS 的习惯，因此没有采用。

隐藏的原生 select 承载 name、required 与 disabled：值会出现在 FormData 中，required 参与原生约束校验，重置表单会恢复 defaultValue。值为 undefined 或空字符串时显示占位文本。

列表通过 Portal 渲染到最近的 ConfigProvider 的主题容器中。在 Modal 或 Drawer 内按 Escape 只会关闭列表。

## Select

Support: beta

Native Angular: MnSelect. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelect"
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
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "open",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "size",
    "typeText": "SelectSize",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "className",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "contentClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default"
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

## SelectGroup

Support: beta

Native Angular: MnSelectGroup. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectGroup"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectItem

Support: beta

Native Angular: MnSelectItem. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/select/select-item.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select-item.ts"
  },
  {
    "name": "textValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select-item.ts"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectLabel

Support: beta

Native Angular: MnSelectLabel. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectLabel"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectSeparator

Support: beta

Native Angular: MnSelectSeparator. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectSeparator"
  ],
  "kind": "named"
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

## Example: Choose a role

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSelect, MnSelectItem } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSelect, MnSelectItem],
  template: `
<mn-select aria-label="Role" [(value)]="value"><mn-select-item value="designer">Designer</mn-select-item><mn-select-item value="engineer">Engineer</mn-select-item><mn-select-item value="admin" disabled>Administrator</mn-select-item></mn-select><output>Role: {{value}}</output>
  `,
})
export class Example {
  value = "designer";
}

```

## Example: Grouped options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSelect, MnSelectItem, MnSelectGroup, MnSelectLabel, MnSelectSeparator } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSelect, MnSelectItem, MnSelectGroup, MnSelectLabel, MnSelectSeparator],
  template: `
<mn-select aria-label="Location"><mn-select-group><mn-select-label>Europe</mn-select-label><mn-select-item value="london">London</mn-select-item><mn-select-item value="paris">Paris</mn-select-item></mn-select-group><mn-select-separator/><mn-select-item value="tokyo">Tokyo</mn-select-item></mn-select>
  `,
})
export class Example {

}

```
