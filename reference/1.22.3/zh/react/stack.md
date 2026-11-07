# Stack 堆叠

弹性布局基础组件（Stack、HStack、VStack），支持基于令牌的间距、分隔符和相连组。子元素不会被额外包裹。

Package: minerva-design@1.22.3

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## HStack

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "HStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "separator",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Rendered between every two items (not before the first or after the last), e.g. a `<Divider orientation=\"vertical\" />` or `\"·\"`. Empty children (null / undefined / booleans) do not get a separator."
  },
  {
    "name": "wrap",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Wraps items onto multiple lines"
  },
  {
    "name": "as",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "union",
    "typeText": "ElementType | undefined",
    "typeRef": "type:a576b79e37ed7758f7d3",
    "parameters": [
      {
        "name": "props",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "any",
        "typeRef": "type:60147dc54bd779d71e81"
      }
    ],
    "returnType": {
      "typeText": "ReactNode | Promise<ReactNode>",
      "typeRef": "type:e41c0ac1000472a34131"
    },
    "default": "div",
    "required": false,
    "description": "Element or component to render"
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Gap between items: numbers and numeric strings select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted."
  },
  {
    "name": "align",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "enum",
    "values": [
      "baseline",
      "center",
      "end",
      "start",
      "stretch"
    ],
    "typeText": "StackAlign | undefined",
    "typeRef": "type:6719ef3d6787e32a41bd",
    "required": false,
    "description": "Cross-axis alignment (`align-items`); unset when omitted"
  },
  {
    "name": "justify",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "enum",
    "values": [
      "around",
      "between",
      "center",
      "end",
      "evenly",
      "start"
    ],
    "typeText": "StackJustify | undefined",
    "typeRef": "type:640f3f7e1a6cec268def",
    "required": false,
    "description": "Main-axis distribution (`justify-content`); unset when omitted"
  },
  {
    "name": "attached",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Joins the items into one attached group (e.g. a segmented row of buttons): no gap, shared borders and outer-only corner radii. The group gets `role=\"group\"` unless a role is given; label it with `aria-label`."
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

## Stack

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Stack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "as",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "union",
    "typeText": "ElementType | undefined",
    "typeRef": "type:a576b79e37ed7758f7d3",
    "parameters": [
      {
        "name": "props",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "any",
        "typeRef": "type:60147dc54bd779d71e81"
      }
    ],
    "returnType": {
      "typeText": "ReactNode | Promise<ReactNode>",
      "typeRef": "type:e41c0ac1000472a34131"
    },
    "default": "div",
    "required": false,
    "description": "Element or component to render"
  },
  {
    "name": "direction",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "enum",
    "values": [
      "column",
      "column-reverse",
      "row",
      "row-reverse"
    ],
    "typeText": "StackDirection | undefined",
    "typeRef": "type:757f1d30b8e7539557c2",
    "default": "column",
    "required": false,
    "description": "Flex direction"
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Gap between items: numbers and numeric strings select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted."
  },
  {
    "name": "align",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "enum",
    "values": [
      "baseline",
      "center",
      "end",
      "start",
      "stretch"
    ],
    "typeText": "StackAlign | undefined",
    "typeRef": "type:6719ef3d6787e32a41bd",
    "required": false,
    "description": "Cross-axis alignment (`align-items`); unset when omitted"
  },
  {
    "name": "justify",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "enum",
    "values": [
      "around",
      "between",
      "center",
      "end",
      "evenly",
      "start"
    ],
    "typeText": "StackJustify | undefined",
    "typeRef": "type:640f3f7e1a6cec268def",
    "required": false,
    "description": "Main-axis distribution (`justify-content`); unset when omitted"
  },
  {
    "name": "wrap",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Wraps items onto multiple lines"
  },
  {
    "name": "separator",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Rendered between every two items (not before the first or after the last), e.g. a `<Divider orientation=\"vertical\" />` or `\"·\"`. Empty children (null / undefined / booleans) do not get a separator."
  },
  {
    "name": "attached",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Joins the items into one attached group (e.g. a segmented row of buttons): no gap, shared borders and outer-only corner radii. The group gets `role=\"group\"` unless a role is given; label it with `aria-label`."
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

## VStack

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "VStack"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "separator",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Rendered between every two items (not before the first or after the last), e.g. a `<Divider orientation=\"vertical\" />` or `\"·\"`. Empty children (null / undefined / booleans) do not get a separator."
  },
  {
    "name": "wrap",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Wraps items onto multiple lines"
  },
  {
    "name": "as",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "union",
    "typeText": "ElementType | undefined",
    "typeRef": "type:a576b79e37ed7758f7d3",
    "parameters": [
      {
        "name": "props",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "any",
        "typeRef": "type:60147dc54bd779d71e81"
      }
    ],
    "returnType": {
      "typeText": "ReactNode | Promise<ReactNode>",
      "typeRef": "type:e41c0ac1000472a34131"
    },
    "default": "div",
    "required": false,
    "description": "Element or component to render"
  },
  {
    "name": "gap",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Gap between items: numbers and numeric strings select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted."
  },
  {
    "name": "align",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "enum",
    "values": [
      "baseline",
      "center",
      "end",
      "start",
      "stretch"
    ],
    "typeText": "StackAlign | undefined",
    "typeRef": "type:6719ef3d6787e32a41bd",
    "required": false,
    "description": "Cross-axis alignment (`align-items`); unset when omitted"
  },
  {
    "name": "justify",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "enum",
    "values": [
      "around",
      "between",
      "center",
      "end",
      "evenly",
      "start"
    ],
    "typeText": "StackJustify | undefined",
    "typeRef": "type:640f3f7e1a6cec268def",
    "required": false,
    "description": "Main-axis distribution (`justify-content`); unset when omitted"
  },
  {
    "name": "attached",
    "source": "packages/react/src/components/Stack/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Joins the items into one attached group (e.g. a segmented row of buttons): no gap, shared borders and outer-only corner radii. The group gets `role=\"group\"` unless a role is given; label it with `aria-label`."
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
  "StackProps": {
    "source": "react/src/components/Stack/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLElement>"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the rendered element"
      },
      {
        "name": "as",
        "type": "ElementType",
        "required": false,
        "default": "\"div\"",
        "description": "Element or component to render"
      },
      {
        "name": "direction",
        "type": "StackDirection",
        "required": false,
        "default": "\"column\"",
        "description": "Flex direction"
      },
      {
        "name": "gap",
        "type": "string | number",
        "required": false,
        "description": "Gap between items: numbers and numeric strings select spacing tokens (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted."
      },
      {
        "name": "align",
        "type": "StackAlign",
        "required": false,
        "description": "Cross-axis alignment (`align-items`); unset when omitted"
      },
      {
        "name": "justify",
        "type": "StackJustify",
        "required": false,
        "description": "Main-axis distribution (`justify-content`); unset when omitted"
      },
      {
        "name": "wrap",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Wraps items onto multiple lines"
      },
      {
        "name": "separator",
        "type": "ReactNode",
        "required": false,
        "description": "Rendered between every two items (not before the first or after the last), e.g. a `<Divider orientation=\"vertical\" />` or `\"·\"`. Empty children (null / undefined / booleans) do not get a separator."
      },
      {
        "name": "attached",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Joins the items into one attached group (e.g. a segmented row of buttons): no gap, shared borders and outer-only corner radii. The group gets `role=\"group\"` unless a role is given; label it with `aria-label`."
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

## Example: 相连组

attached 将各项合并为一组：共享边框、仅保留外侧圆角，类似分段控件。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/stack/demos/attached.tsx

```tsx
import { useState } from "react";
import { Button, HStack } from "minerva-design";

const views = ["Day", "Week", "Month"] as const;

export default function AttachedDemo() {
  const [view, setView] = useState<(typeof views)[number]>("Week");
  return (
    <HStack attached aria-label="Calendar view">
      {views.map((name) => (
        <Button
          key={name}
          size="small"
          color={name === view ? "primary" : "neutral"}
          variant={name === view ? "solid" : "outline"}
          aria-pressed={name === view}
          onClick={() => setView(name)}
        >
          {name}
        </Button>
      ))}
    </HStack>
  );
}

```

## Example: 垂直堆叠

VStack 将子元素纵向排列，默认拉伸填满。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/demos/basic.tsx

```tsx
import { Button, VStack } from "minerva-design";

export default function BasicDemo() {
  return (
    <VStack gap={3} style={{ maxWidth: 240 }}>
      <Button>First</Button>
      <Button color="neutral" variant="outline">
        Second
      </Button>
      <Button color="neutral" variant="outline">
        Third
      </Button>
    </VStack>
  );
}

```

## Example: 间距

数字对应间距令牌（2 = 8px，4 = 16px，6 = 24px）；其他字符串作为 CSS 长度。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/demos/gap.tsx

```tsx
import { Button, HStack, VStack } from "minerva-design";

const gaps = [2, 4, 6] as const;

export default function GapDemo() {
  return (
    <VStack gap={4} align="start">
      {gaps.map((gap) => (
        <HStack key={gap} gap={gap}>
          <code style={{ minWidth: 120 }}>{`gap={${gap}}`}</code>
          <Button size="small">One</Button>
          <Button size="small">Two</Button>
          <Button size="small">Three</Button>
        </HStack>
      ))}
      <HStack gap="12px">
        <code style={{ minWidth: 120 }}>gap=&quot;12px&quot;</code>
        <Button size="small">One</Button>
        <Button size="small">Two</Button>
      </HStack>
    </VStack>
  );
}

```

## Example: 水平堆叠

HStack 在交叉轴上居中对齐；justify 控制主轴分布。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/demos/horizontal.tsx

```tsx
import { Button, HStack } from "minerva-design";

export default function HorizontalDemo() {
  return (
    <HStack gap={2} justify="between" style={{ width: "100%" }}>
      <span>Unsaved changes</span>
      <HStack gap={2}>
        <Button color="neutral" variant="outline">
          Discard
        </Button>
        <Button>Save</Button>
      </HStack>
    </HStack>
  );
}

```

## Example: 分隔符

separator 渲染在相邻项之间，例如竖向 Divider；空子节点不会产生分隔符。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/demos/separator.tsx

```tsx
import { Divider, HStack } from "minerva-design";

export default function SeparatorDemo() {
  return (
    <HStack
      as="nav"
      aria-label="Resources"
      gap={2}
      separator={<Divider orientation="vertical" length={16} spacing={0} />}
    >
      <a href="#docs">Docs</a>
      <a href="#blog">Blog</a>
      <a href="#changelog">Changelog</a>
    </HStack>
  );
}

```

## Example: 换行与语义

wrap 允许项目换行；as 可渲染为列表。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/stack/demos/wrap.tsx

```tsx
import { Stack, Tag } from "minerva-design";

const tags = ["Fantasy", "Mystery", "Romance", "Sci-fi", "History", "Poetry"];

export default function WrapDemo() {
  return (
    <Stack
      as="ul"
      direction="row"
      gap="0.5rem"
      wrap
      style={{ padding: 0, maxWidth: 260, listStyle: "none" }}
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </Stack>
  );
}

```
