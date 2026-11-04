# Prose 排版

为文章、渲染后的 Markdown、富文本编辑器等语义化 HTML 提供无边框、跟随主题的排版。同样的规则以 Sass mixin 发布：@use "minerva-design/prose.scss" as typography; 然后在你自己的选择器中 @include typography.prose;。

Package: minerva-design@1.20.4

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Prose

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Prose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "asChild",
    "source": "packages/react/src/components/Prose/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Merges the prose class onto its single child (e.g. an editor host) instead of rendering a wrapper <div>"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "ProseProps": {
    "source": "react/src/components/Prose/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Merges the prose class onto its single child (e.g. an editor host) instead of rendering a wrapper <div>"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Prose": {
    "kind": "cssVars",
    "source": "react/src/components/Prose",
    "vars": [
      {
        "name": "--prose-font-size",
        "description": "Base font size of the body text"
      },
      {
        "name": "--prose-border-color",
        "description": "Color of the blockquote, table, code block and rule borders"
      },
      {
        "name": "--prose-code-bg",
        "description": "Background color of inline code and table headers"
      },
      {
        "name": "--prose-pre-bg",
        "description": "Background color of code blocks"
      },
      {
        "name": "--prose-radius",
        "description": "Corner radius of code blocks (defaults to --radius-sm)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 为自有元素加样式

asChild 将排版应用到唯一的子元素（如编辑器容器），不额外包裹。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/prose/demos/as-child.tsx

```tsx
import { Prose } from "minerva-design";

export default function AsChildDemo() {
  return (
    <Prose asChild>
      <article aria-label="Release notes">
        <h3>Release notes</h3>
        <p>
          With asChild the typography is applied to your own element (an article
          or an editor host) without an extra wrapper.
        </p>
      </article>
    </Prose>
  );
}

```

## Example: 基础用法

标题、段落、链接、列表、引用和代码共享主题令牌。Prose 不会净化 HTML。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/prose/demos/basic.tsx

```tsx
import { Prose } from "minerva-design";

export default function BasicDemo() {
  return (
    <Prose>
      <h2>Chapter one</h2>
      <p>
        Prose styles <a href="#notes">links</a>, <code>inline code</code>,
        lists, quotes and tables written as plain semantic HTML.
      </p>
      <blockquote>Sanitize untrusted HTML before rendering it.</blockquote>
      <ul>
        <li>No wrapper surface or padding</li>
        <li>Author inline styles stay authoritative</li>
      </ul>
      <pre>
        <code>{"const answer = 42;"}</code>
      </pre>
    </Prose>
  );
}

```
