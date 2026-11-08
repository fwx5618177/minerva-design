# Divider 分割线

用于分隔内容的细线，可水平或垂直，并可带文字。

Package: minerva-design@1.23.1

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Divider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Divider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "enum",
    "values": [
      "dashed",
      "dotted",
      "solid"
    ],
    "typeText": "DividerVariant | undefined",
    "typeRef": "type:8fbf4858d9d96a607668",
    "default": "solid",
    "required": false,
    "description": "Line style"
  },
  {
    "name": "orientation",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "DividerOrientation | undefined",
    "typeRef": "type:a43f1cfe4f5f39a5ea1b",
    "default": "horizontal",
    "required": false,
    "description": "Divider direction"
  },
  {
    "name": "thickness",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Line thickness in pixels"
  },
  {
    "name": "length",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Length of the line (width when horizontal, height when vertical)"
  },
  {
    "name": "spacing",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 16,
    "required": false,
    "description": "Margin around the divider in pixels (top/bottom when horizontal, left/right when vertical)"
  },
  {
    "name": "textAlign",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "enum",
    "values": [
      "center",
      "left",
      "right"
    ],
    "typeText": "DividerTextAlign | undefined",
    "typeRef": "type:18ff15a8c48cf9f8688f",
    "default": "center",
    "required": false,
    "description": "Position of the text"
  },
  {
    "name": "elevation",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a subtle shadow"
  },
  {
    "name": "flexItem",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Vertical divider inside a flex container: stretches to the container height (align-self: stretch) instead of the 1em inline height"
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
  "DividerProps": {
    "source": "react/src/components/Divider/types.ts",
    "description": "The line color comes from the `--divider-color` CSS custom property (default `var(--border-color)`); set it through `className` or `style`.",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLElement>, \"children\" | \"color\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "DividerVariant",
        "required": false,
        "default": "\"solid\"",
        "description": "Line style"
      },
      {
        "name": "orientation",
        "type": "DividerOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Divider direction"
      },
      {
        "name": "thickness",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Line thickness in pixels"
      },
      {
        "name": "length",
        "type": "number | string",
        "required": false,
        "description": "Length of the line (width when horizontal, height when vertical)"
      },
      {
        "name": "spacing",
        "type": "number",
        "required": false,
        "default": "16",
        "description": "Margin around the divider in pixels (top/bottom when horizontal, left/right when vertical)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Optional text rendered inside a horizontal divider (ignored when vertical). Without text the divider is a native <hr>"
      },
      {
        "name": "textAlign",
        "type": "DividerTextAlign",
        "required": false,
        "default": "\"center\"",
        "description": "Position of the text"
      },
      {
        "name": "elevation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds a subtle shadow"
      },
      {
        "name": "flexItem",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Vertical divider inside a flex container: stretches to the container height (align-self: stretch) instead of the 1em inline height"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root element (<hr>, or <div> when rendering text)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Divider": {
    "kind": "cssVars",
    "source": "react/src/components/Divider",
    "vars": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

横向分隔线分开第一段和第二段内容。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/basic.tsx

```tsx
import { Divider } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ width: "100%" }}>
      <p>Content above the divider.</p>
      <Divider />
      <p>Content below the divider.</p>
    </div>
  );
}

```

## Example: 自定义样式

通过 CSS 自定义属性 --divider-color（内联样式、类名或祖先元素）设置线条颜色，并自定义粗细、长度、间距以及 elevation 阴影。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/custom-style.tsx

```tsx
import type { CSSProperties } from "react";
import { Divider } from "minerva-design";

// The line color comes from the --divider-color custom property; set it
// inline, in a class or on an ancestor.
const violet = { "--divider-color": "#7c3aed" } as CSSProperties;
const green = { "--divider-color": "#16a34a" } as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider style={violet} thickness={2} />
      <Divider style={green} thickness={3} variant="dashed" length="50%" />
      <Divider style={violet}>Section</Divider>
      <Divider spacing={32} elevation />
    </div>
  );
}

```

## Example: 在 flex 容器中

flexItem 让竖向分割线拉伸到 flex 容器的高度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/flex-item.tsx

```tsx
import { Divider } from "minerva-design";

export default function FlexItemDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 48 }}>
      <span>Edit</span>
      <Divider orientation="vertical" flexItem spacing={0} />
      <span>Share</span>
      <Divider orientation="vertical" flexItem spacing={0} />
      <span>Delete</span>
    </div>
  );
}

```

## Example: 线条样式

实线（默认）、虚线或点线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/variants.tsx

```tsx
import { Divider } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider variant="solid" />
      <Divider variant="dashed" />
      <Divider variant="dotted" />
    </div>
  );
}

```

## Example: 垂直分割线

纵向分隔线分开 Home、Products 和 About。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/vertical.tsx

```tsx
import { Divider } from "minerva-design";

export default function VerticalDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>Home</span>
      <Divider orientation="vertical" length={16} spacing={12} />
      <span>Products</span>
      <Divider orientation="vertical" length={16} spacing={12} />
      <span>About</span>
    </div>
  );
}

```

## Example: 带文字

比较 Left、Center 和 Right 三种文字对齐方式；右对齐分隔线使用虚线。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/with-text.tsx

```tsx
import { Divider } from "minerva-design";

export default function WithTextDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider textAlign="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider textAlign="right" variant="dashed" thickness={3}>
        Right
      </Divider>
    </div>
  );
}

```
