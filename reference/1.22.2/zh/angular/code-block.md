# CodeBlock 代码块

只读的预格式化文本块（日志、请求体、配置），位于有名称且可键盘聚焦的滚动区域中。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## CodeBlock

Support: beta

Native Angular: MnCodeBlock. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCodeBlock"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "code",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "language",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "copyable",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "highlight",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "showLineNumbers",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "showLanguage",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "marks",
    "typeText": "readonly CodeMark[] | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  },
  {
    "name": "clickableMarks",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "markClick",
    "typeText": "CodeBlockMarkClickEvent",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "CodeBlockMarkClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "copyError",
    "typeText": "unknown",
    "required": false,
    "source": "packages/angular/src/components/data/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## CSS variables

```json
{
  "css:CodeBlock": {
    "kind": "cssVars",
    "source": "react/src/components/CodeBlock",
    "vars": [
      {
        "name": "--code-block-padding",
        "description": "Inner padding"
      },
      {
        "name": "--code-block-radius",
        "description": "Corner radius (defaults to --radius-md)"
      },
      {
        "name": "--code-block-bg",
        "description": "Background color"
      },
      {
        "name": "--code-block-border-color",
        "description": "Border color"
      },
      {
        "name": "--code-block-font-size",
        "description": "Font size of the code"
      },
      {
        "name": "--code-block-max-height",
        "description": "Maximum height before the block scrolls (default: none)"
      },
      {
        "name": "--code-block-line-number-color",
        "description": "Color of the line numbers"
      },
      {
        "name": "--code-block-mark-bg",
        "description": "Default background of the marks (default: a translucent yellow)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Copyable source

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCodeBlock } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCodeBlock],
  template: `
<mn-code-block [code]="code" language="typescript" showLineNumbers showLanguage copyable/>
  `,
})
export class Example {
  code = "const message = \"Hello, Minerva\";\nconsole.log(message);";
}

```

## Example: Plain text

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCodeBlock } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCodeBlock],
  template: `
<mn-code-block code="pnpm add minerva-design" language="shell"/>
  `,
})
export class Example {

}

```

## Example: 标记（已保存的高亮）

marks 在语法高亮之上叠加字符范围（代码中的偏移量；重叠时数组中靠后的标记优先）。minerva-design/core 的 getCodeSelectionRange 将用户的选区转换为可保存的偏移量；onMarkClick 报告被点击的标记（此处为删除）。复制仍复制原始代码。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCodeBlock } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCodeBlock],
  template: `
<mn-code-block [code]="code" language="typescript" showLineNumbers clickableMarks [marks]="marks" (markClick)="note=$event.mark.title ?? ''"/><output aria-live="polite">{{note}}</output>
  `,
})
export class Example {
  code = "const message = \"Hello, Minerva\";\nconsole.log(message);";
  marks = [
  {
    "id": "a",
    "start": 16,
    "end": 32,
    "title": "A string literal"
  },
  {
    "id": "b",
    "start": 34,
    "end": 45,
    "color": "info",
    "title": "A call"
  }
];
  note = "";
}

```
