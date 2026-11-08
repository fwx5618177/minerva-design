# Empty 空状态

没有数据可展示时显示的占位内容。

Package: minerva-design@1.23.0

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

## Example: 标题、图标与操作

heading 和 description 设置文字，icon 插槽替换图标，action / secondary-action 放置按钮，默认插槽为页脚。

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

## Example: 基础用法

不设置任何属性：默认图标和本地化的“暂无数据”描述，位于一个 status 区域中。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/empty/wc/basic.html

```html
<minerva-empty></minerva-empty>

```

## Example: 尺寸与样式

三种尺寸、插画（use-svg）、阴影、自定义宽高、富文本的 heading 和 description 插槽，以及 hide-icon / hide-description。

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
