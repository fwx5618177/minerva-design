# Stack 堆叠

弹性布局基础组件（Stack、HStack、VStack），支持基于令牌的间距、分隔符和相连组。子元素不会被额外包裹。

Package: minerva-design@1.21.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## HStack

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/hstack",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "attribute": "align",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "attribute": "justify",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "attribute": "wrap",
    "required": false
  },
  {
    "name": "separator",
    "typeText": "StackSeparator | undefined",
    "attribute": "separator",
    "required": false
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "attribute": "attached",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Items"
  }
]
```

## Stack

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/stack",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "attribute": "align",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "attribute": "justify",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "attribute": "wrap",
    "required": false
  },
  {
    "name": "separator",
    "typeText": "StackSeparator | undefined",
    "attribute": "separator",
    "required": false
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "attribute": "attached",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Items"
  }
]
```

## VStack

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/vstack",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "direction",
    "typeText": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
    "attribute": "direction",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "attribute": "gap",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
    "attribute": "align",
    "required": false
  },
  {
    "name": "justify",
    "typeText": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
    "attribute": "justify",
    "required": false
  },
  {
    "name": "wrap",
    "typeText": "boolean",
    "attribute": "wrap",
    "required": false
  },
  {
    "name": "separator",
    "typeText": "StackSeparator | undefined",
    "attribute": "separator",
    "required": false
  },
  {
    "name": "attached",
    "typeText": "boolean",
    "attribute": "attached",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Items"
  }
]
```

## API

```json
{
  "wc:minerva-stack": {
    "kind": "element",
    "source": "web-components/src/components/stack/stack.ts",
    "className": "MinervaStack",
    "summary": "Flex row / column layout with gap, alignment, separators and attached groups.",
    "description": "A flex container laying out its children in a row or column with a token-based gap (`<Stack>` of React). Children are not wrapped; a `separator` is inserted between them, and `attached` joins them into one group (shared borders, outer corners only, `role=\"group\"`). Shadow DOM notes: the children stay in the light DOM and are slotted into the React library's `.stack` flex container. Separators are interleaved with manual slot assignment (one slot per child). Where `HTMLSlotElement.assign()` is missing (Safari < 16.4 and other older engines) the stack falls back to named slots: each element child gets a `slot=\"minerva-stack-item-<n>\"` attribute (only while a separator is set; removed again afterwards), so separators render between element children in both modes. Bare text children cannot carry a `slot` attribute: in the fallback they render after the element children without separators (wrap them in an element, e.g. a `<span>`). The `attached` rules style the children through `::slotted()` (top-level children only); their radius rules reach elements whose own box has the radius (native buttons / inputs), not the inner control of a custom element.",
    "properties": [
      {
        "name": "direction",
        "attribute": "direction",
        "type": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
        "default": "\"column\"",
        "description": "Flex direction"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number | undefined",
        "description": "Gap between items: numbers select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
        "description": "Cross-axis alignment (`align-items`); unset when omitted"
      },
      {
        "name": "justify",
        "attribute": "justify",
        "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
        "description": "Main-axis distribution (`justify-content`); unset when omitted"
      },
      {
        "name": "wrap",
        "attribute": "wrap",
        "type": "boolean",
        "default": "false",
        "description": "Wraps items onto multiple lines"
      },
      {
        "name": "separator",
        "attribute": "separator",
        "type": "StackSeparator | undefined",
        "description": "Rendered between every two items: a text (attribute) or a function returning fresh content (e.g. a new `<minerva-divider orientation=\"vertical\">`) per gap"
      },
      {
        "name": "attached",
        "attribute": "attached",
        "type": "boolean",
        "default": "false",
        "description": "Joins the items into one attached group: no gap, shared borders and outer-only corner radii, `role=\"group\"` (name it with `aria-label`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Items"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The flex container"
      }
    ],
    "cssProperties": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  },
  "wc:minerva-hstack": {
    "kind": "element",
    "source": "web-components/src/components/stack/stack.ts",
    "className": "MinervaHStack",
    "summary": "Horizontal stack.",
    "description": "A horizontal stack (`<HStack>` of React): `direction` is always `row` and items are centered on the cross axis unless `align` is set.",
    "properties": [
      {
        "name": "direction",
        "attribute": "direction",
        "type": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
        "default": "\"row\"",
        "description": "Flex direction"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number | undefined",
        "description": "Gap between items: numbers select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
        "description": "Cross-axis alignment (`align-items`); unset when omitted"
      },
      {
        "name": "justify",
        "attribute": "justify",
        "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
        "description": "Main-axis distribution (`justify-content`); unset when omitted"
      },
      {
        "name": "wrap",
        "attribute": "wrap",
        "type": "boolean",
        "default": "false",
        "description": "Wraps items onto multiple lines"
      },
      {
        "name": "separator",
        "attribute": "separator",
        "type": "StackSeparator | undefined",
        "description": "Rendered between every two items: a text (attribute) or a function returning fresh content (e.g. a new `<minerva-divider orientation=\"vertical\">`) per gap"
      },
      {
        "name": "attached",
        "attribute": "attached",
        "type": "boolean",
        "default": "false",
        "description": "Joins the items into one attached group: no gap, shared borders and outer-only corner radii, `role=\"group\"` (name it with `aria-label`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Items"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The flex container"
      }
    ],
    "cssProperties": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  },
  "wc:minerva-vstack": {
    "kind": "element",
    "source": "web-components/src/components/stack/stack.ts",
    "className": "MinervaVStack",
    "summary": "Vertical stack.",
    "description": "A vertical stack (`<VStack>` of React): `direction` is always `column` and items stretch on the cross axis unless `align` is set.",
    "properties": [
      {
        "name": "direction",
        "attribute": "direction",
        "type": "\"row\" | \"column\" | \"row-reverse\" | \"column-reverse\"",
        "default": "\"column\"",
        "description": "Flex direction"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number | undefined",
        "description": "Gap between items: numbers select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\" | \"stretch\" | \"baseline\" | undefined",
        "description": "Cross-axis alignment (`align-items`); unset when omitted"
      },
      {
        "name": "justify",
        "attribute": "justify",
        "type": "\"start\" | \"center\" | \"end\" | \"between\" | \"around\" | \"evenly\" | undefined",
        "description": "Main-axis distribution (`justify-content`); unset when omitted"
      },
      {
        "name": "wrap",
        "attribute": "wrap",
        "type": "boolean",
        "default": "false",
        "description": "Wraps items onto multiple lines"
      },
      {
        "name": "separator",
        "attribute": "separator",
        "type": "StackSeparator | undefined",
        "description": "Rendered between every two items: a text (attribute) or a function returning fresh content (e.g. a new `<minerva-divider orientation=\"vertical\">`) per gap"
      },
      {
        "name": "attached",
        "attribute": "attached",
        "type": "boolean",
        "default": "false",
        "description": "Joins the items into one attached group: no gap, shared borders and outer-only corner radii, `role=\"group\"` (name it with `aria-label`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Items"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The flex container"
      }
    ],
    "cssProperties": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Stack": {
    "kind": "cssVars",
    "source": "react/src/components/Stack",
    "vars": [
      {
        "name": "--stack-gap",
        "description": "Space between the children when the gap prop is not set (default: 0)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 连接组

attached 将项目连接为一个整体（无间距、共享边框），并暴露为 role="group"；请用 aria-label 为其命名。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/attached.html

```html
<minerva-hstack attached aria-label="Text alignment">
  <button
    type="button"
    style="
      padding: 6px 12px;
      border: 1px solid var(--border-color);
      background: var(--surface-color);
      color: inherit;
    "
  >
    Left
  </button>
  <button
    type="button"
    style="
      padding: 6px 12px;
      border: 1px solid var(--border-color);
      background: var(--surface-color);
      color: inherit;
    "
  >
    Center
  </button>
  <button
    type="button"
    style="
      padding: 6px 12px;
      border: 1px solid var(--border-color);
      background: var(--surface-color);
      color: inherit;
    "
  >
    Right
  </button>
</minerva-hstack>
<minerva-vstack
  attached
  aria-label="Account fields"
  style="margin-top: 16px; max-width: 280px"
>
  <input
    aria-label="Email"
    placeholder="Email"
    style="padding: 8px; border: 1px solid var(--border-color)"
  />
  <input
    aria-label="Password"
    type="password"
    placeholder="Password"
    style="padding: 8px; border: 1px solid var(--border-color)"
  />
</minerva-vstack>

```

## Example: 基本用法

以令牌间距排列的一列项目（gap="3" 即 var(--space-3)）。子元素按原样放入插槽，不会被包裹。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/basic.html

```html
<minerva-stack gap="3">
  <minerva-box p="3" bg="bg.muted" rounded="md">First</minerva-box>
  <minerva-box p="3" bg="bg.muted" rounded="md">Second</minerva-box>
  <minerva-box p="3" bg="bg.muted" rounded="md">Third</minerva-box>
</minerva-stack>

```

## Example: HStack、VStack 与对齐

<minerva-hstack> 是交叉轴居中的行，<minerva-vstack> 是拉伸的列；可通过 align、justify 和 direction（包括反向）微调。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/hstack-vstack.html

```html
<minerva-vstack gap="4">
  <minerva-hstack gap="2">
    <minerva-button size="small">Save</minerva-button>
    <minerva-button size="small" variant="outline" color="neutral"
      >Cancel</minerva-button
    >
    <span>HStack centers its items</span>
  </minerva-hstack>
  <minerva-hstack
    gap="2"
    justify="between"
    style="padding: 8px; border: 1px dashed var(--border-color)"
  >
    <span>justify="between"</span>
    <minerva-button size="small" variant="ghost">Edit</minerva-button>
  </minerva-hstack>
  <minerva-stack direction="row-reverse" gap="2" align="end">
    <minerva-box p="2" bg="bg.muted" rounded="sm">1</minerva-box>
    <minerva-box p="4" bg="bg.muted" rounded="sm">2</minerva-box>
    <minerva-box p="6" bg="bg.muted" rounded="sm"
      >3 (row-reverse, align end)</minerva-box
    >
  </minerva-stack>
</minerva-vstack>

```

## Example: 分隔符与换行

separator 在项目之间插入文本；作为 JS 属性设置时也可以是一个函数，为每个间隙返回新的内容（这里是垂直分割线）。wrap 允许项目换行显示。 分隔符通过手动 slot 分配实现；在不支持 slot.assign() 的浏览器（Safari < 16.4）中，Stack 会退回到具名 slot（设置分隔符期间为每个子元素添加 slot="minerva-stack-item-n" attribute），因此元素子项之间仍会显示分隔符（纯文本子项请包裹在元素中）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/stack/wc/wrap-separator.html

```html
<minerva-hstack id="breadcrumb" gap="2" separator="/">
  <a href="#home">Home</a>
  <a href="#library">Library</a>
  <span aria-current="page">Data</span>
</minerva-hstack>
<minerva-hstack id="links" gap="3" style="margin-top: 12px">
  <span>Profile</span>
  <span>Billing</span>
  <span>Team</span>
</minerva-hstack>
<minerva-stack
  direction="row"
  wrap
  gap="2"
  style="margin-top: 12px; max-width: 320px"
>
  <minerva-tag>design</minerva-tag>
  <minerva-tag>accessibility</minerva-tag>
  <minerva-tag>web components</minerva-tag>
  <minerva-tag>tokens</minerva-tag>
  <minerva-tag>layout</minerva-tag>
  <minerva-tag>shadow DOM</minerva-tag>
</minerva-stack>

```

### apps/docs/src/docs/pages/stack/wc/wrap-separator.ts

```tsx
// `separator` set as a property can be a function: it returns fresh content
// for every gap (here a vertical divider).
export function setup(root: HTMLElement) {
  const links = root.querySelector<HTMLElement & { separator: () => Node }>(
    "#links",
  )!;
  links.separator = () => {
    const divider = document.createElement("minerva-divider");
    divider.setAttribute("orientation", "vertical");
    divider.setAttribute("spacing", "0");
    return divider;
  };
  // The docs use hash routing: keep the demo links from navigating
  const onClick = (event: Event) => {
    if ((event.target as Element).closest("a")) event.preventDefault();
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}

```
