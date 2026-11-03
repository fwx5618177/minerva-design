# AutoComplete 自动完成

输入时根据内容提示匹配选项的输入框。

Package: minerva-design@1.19.3

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 键盘与无障碍

↓ / ↑ 在可见选项间移动（首尾循环）。

Enter 选择当前激活的选项（跳过禁用选项），且不会提交所在的表单。

Escape 关闭下拉层，焦点保留在输入框中；下拉层已关闭时再按 Escape 会清空文本（onChange 收到 ""）。位于 Modal 或 Popover 内时只关闭下拉层。

输入框使用 combobox 角色，并通过 aria-expanded、aria-controls 和 aria-activedescendant 关联 listbox 中的选项。

## AutoComplete

Support: beta

Native Angular: MnAutoComplete. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAutoComplete"
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
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "options",
    "typeText": "readonly AutoCompleteOption[]",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "mode",
    "typeText": "AutoCompleteMode",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "groupBy",
    "typeText": "((option: AutoCompleteOption) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "groupMode",
    "typeText": "AutoCompleteGroupMode",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "renderOption",
    "typeText": "TemplateRef<AutoCompleteOptionContext> | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "renderEmpty",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "filterOption",
    "typeText": "((inputValue: string, option: AutoCompleteOption) => boolean) | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "sortOption",
    "typeText": "((a: AutoCompleteOption, b: AutoCompleteOption) => number) | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "placement",
    "typeText": "AutoCompletePlacement",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "offset",
    "typeText": "{ x: number; y: number; }",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "animation",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "dropdownClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "autoHighlight",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "fillOnSelect",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "className",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "size",
    "typeText": "AutoCompleteSize",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "variant",
    "typeText": "AutoCompleteVariant",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "required",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "prefix",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "suffix",
    "typeText": "MnContent",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "clearable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts"
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
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "optionSelect",
    "typeText": "AutoCompleteOption",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "AutoCompleteOption",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "optionClick",
    "typeText": "AutoCompleteOption",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "AutoCompleteOption",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "valueSubmit",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/auto-complete/auto-complete.ts",
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

## Example: Search suggestions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAutoComplete } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAutoComplete],
  template: `
<mn-auto-complete label="City" [options]="options" [(value)]="value"/><output>City: {{value}}</output>
  `,
})
export class Example {
  options = [
  {
    "label": "London",
    "value": "London"
  },
  {
    "label": "Lisbon",
    "value": "Lisbon"
  },
  {
    "label": "Lima",
    "value": "Lima"
  },
  {
    "label": "Tokyo",
    "value": "Tokyo"
  }
];
  value = "";
}

```

## Example: Preselected suggestion

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAutoComplete } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAutoComplete],
  template: `
<mn-auto-complete label="Language" [options]="options" value="TypeScript"/>
  `,
})
export class Example {
  options = [
  {
    "label": "TypeScript",
    "value": "TypeScript"
  },
  {
    "label": "JavaScript",
    "value": "JavaScript"
  },
  {
    "label": "Rust",
    "value": "Rust"
  }
];
}

```
