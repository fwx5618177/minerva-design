# Empty 空の状態

表示するデータがないときに表示されるプレースホルダーです。

Package: minerva-design@1.23.2

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Empty

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/empty",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "heading",
    "typeText": "string",
    "attribute": "heading",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "attribute": "description",
    "required": false
  },
  {
    "name": "hideDescription",
    "typeText": "boolean",
    "attribute": "hide-description",
    "required": false
  },
  {
    "name": "hideIcon",
    "typeText": "boolean",
    "attribute": "hide-icon",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "attribute": "size",
    "required": false
  },
  {
    "name": "useSvg",
    "typeText": "boolean",
    "attribute": "use-svg",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | undefined",
    "attribute": "width",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "showShadow",
    "typeText": "boolean",
    "attribute": "show-shadow",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Footer content"
  },
  {
    "name": "icon",
    "description": "Custom icon replacing the default one"
  },
  {
    "name": "heading",
    "description": "Heading (alternative to the `heading` attribute)"
  },
  {
    "name": "description",
    "description": "Description (alternative to the `description` attribute)"
  },
  {
    "name": "action",
    "description": "Primary call to action"
  },
  {
    "name": "secondary-action",
    "description": "Secondary action, after `action`"
  }
]
```

## API

```json
{
  "wc:minerva-empty": {
    "kind": "element",
    "source": "web-components/src/components/empty/empty.ts",
    "className": "MinervaEmpty",
    "summary": "Empty state with icon, heading, description and actions.",
    "description": "Empty state (`<Empty>` of React): an icon, an optional heading, a description (localized \"No Data\" by default), actions and footer content. It is a `role=\"status\"` region named by its heading (or its description) unless `aria-label` is set.",
    "properties": [
      {
        "name": "heading",
        "attribute": "heading",
        "type": "string",
        "default": "\"\"",
        "description": "Heading of the empty state; also its accessible name (the React library's `title`)"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string | undefined",
        "description": "Description text (default: localized \"No Data\")"
      },
      {
        "name": "hideDescription",
        "attribute": "hide-description",
        "type": "boolean",
        "default": "false",
        "description": "Hides the description (the React library's `description={null}`)"
      },
      {
        "name": "hideIcon",
        "attribute": "hide-icon",
        "type": "boolean",
        "default": "false",
        "description": "Renders no icon at all (the React library's `icon={null}`)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\" | undefined",
        "description": "Unframed sized layout; omit for the classic surface layout"
      },
      {
        "name": "useSvg",
        "attribute": "use-svg",
        "type": "boolean",
        "default": "false",
        "description": "Uses the built-in SVG illustration instead of the default icon"
      },
      {
        "name": "width",
        "attribute": "width",
        "type": "string | undefined",
        "description": "Width of the container (CSS value, numbers are pixels)"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "string | undefined",
        "description": "Height of the container (CSS value, numbers are pixels)"
      },
      {
        "name": "showShadow",
        "attribute": "show-shadow",
        "type": "boolean",
        "default": "false",
        "description": "Adds a drop shadow"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Footer content"
      },
      {
        "name": "icon",
        "description": "Custom icon replacing the default one"
      },
      {
        "name": "heading",
        "description": "Heading (alternative to the `heading` attribute)"
      },
      {
        "name": "description",
        "description": "Description (alternative to the `description` attribute)"
      },
      {
        "name": "action",
        "description": "Primary call to action"
      },
      {
        "name": "secondary-action",
        "description": "Secondary action, after `action`"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The region (role=status); size only for the unframed sized layout"
      },
      {
        "name": "icon",
        "description": "The icon wrapper"
      },
      {
        "name": "title",
        "description": "The title (accessible name of the region)"
      },
      {
        "name": "description",
        "description": "The description"
      },
      {
        "name": "actions",
        "description": "The actions row"
      },
      {
        "name": "footer",
        "description": "The footer content"
      }
    ],
    "cssProperties": [
      {
        "name": "--empty-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--empty-gap",
        "description": "Space between the icon, title, description and actions (sized layout)"
      },
      {
        "name": "--empty-icon-size",
        "description": "Size of the illustration icon (every size)"
      },
      {
        "name": "--empty-color",
        "description": "Text color of the description"
      },
      {
        "name": "--empty-background",
        "description": "Background of the framed (unsized) layout"
      },
      {
        "name": "--empty-radius",
        "description": "Corner radius of the framed (unsized) layout (defaults to --radius-sm)"
      },
      {
        "name": "--empty-description-max-width",
        "description": "Maximum width of the description (sized layout)"
      },
      {
        "name": "--empty-icon-background",
        "description": "Background of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-border-color",
        "description": "Ring color of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-radius",
        "description": "Corner radius of the icon tile (sized layout; defaults to --radius-lg)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Empty": {
    "kind": "cssVars",
    "source": "react/src/components/Empty",
    "vars": [
      {
        "name": "--empty-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--empty-gap",
        "description": "Space between the icon, title, description and actions (sized layout)"
      },
      {
        "name": "--empty-icon-size",
        "description": "Size of the illustration icon (every size)"
      },
      {
        "name": "--empty-color",
        "description": "Text color of the description"
      },
      {
        "name": "--empty-background",
        "description": "Background of the framed (unsized) layout"
      },
      {
        "name": "--empty-radius",
        "description": "Corner radius of the framed (unsized) layout (defaults to --radius-sm)"
      },
      {
        "name": "--empty-description-max-width",
        "description": "Maximum width of the description (sized layout)"
      },
      {
        "name": "--empty-icon-background",
        "description": "Background of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-border-color",
        "description": "Ring color of the icon tile (sized layout)"
      },
      {
        "name": "--empty-icon-radius",
        "description": "Corner radius of the icon tile (sized layout; defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 見出し・アイコン・アクション

heading と description でテキストを設定し、icon スロットでアイコンを置き換え、action / secondary-action にボタンを置きます。デフォルトスロットはフッターです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/empty/wc/actions.html

```html
<minerva-empty
  heading="No projects yet"
  description="Create your first project to start tracking work."
>
  <span slot="icon" aria-hidden="true" style="font-size: 40px">📁</span>
  <minerva-button slot="action" id="create">Create project</minerva-button>
  <minerva-button slot="secondary-action" variant="ghost" color="neutral"
    >Import</minerva-button
  >
  <output id="status"></output>
</minerva-empty>

```

### apps/docs/src/docs/pages/empty/wc/actions.ts

```tsx
// Actions are regular elements slotted into `action` / `secondary-action`;
// the default slot is the footer.
export function setup(root: HTMLElement) {
  const create = root.querySelector<HTMLElement>("#create")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  const onClick = () => (status.value = "Project created");
  create.addEventListener("click", onClick);
  return () => create.removeEventListener("click", onClick);
}

```

## Example: 基本的な使い方

属性なしの場合：既定のアイコンとローカライズされた「データがありません」の説明を status 領域に表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/empty/wc/basic.html

```html
<minerva-empty></minerva-empty>

```

## Example: サイズとスタイル

3 種類のサイズ、イラスト（use-svg）、影、カスタムの幅 / 高さ、リッチな heading と description スロット、hide-icon / hide-description。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/empty/wc/sizes-styles.html

```html
<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  "
>
  <minerva-empty size="small" heading="Small" hide-description></minerva-empty>
  <minerva-empty size="medium" use-svg show-shadow>
    <span slot="heading">No results</span>
    <span slot="description">Try <em>another</em> search term.</span>
  </minerva-empty>
  <minerva-empty
    size="large"
    hide-icon
    heading="Inbox zero"
    description="You are all caught up."
    width="100%"
    height="200px"
  ></minerva-empty>
</div>

```
