# NavTree

Sidebar navigation with sections, expandable branches, an active item and a compact icon-only mode. Arrow keys move between items and open or close branches.

Package: minerva-design@1.19.3

Renderer: vue

Locale: en

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

## NavTree

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "NavTree"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "sections",
    "type": "NavTreeSection[]",
    "required": true,
    "description": "Sections of items",
    "typeText": "NavTreeSection[]"
  },
  {
    "name": "activeId",
    "type": "string",
    "required": false,
    "description": "Id of the active (current page) item; its ancestors expand",
    "typeText": "string"
  },
  {
    "name": "collapsed",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Compact mode: icons only (titles, labels, trailing content and children\nare hidden)",
    "typeText": "boolean"
  },
  {
    "name": "wrapLabels",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Wraps long labels and descriptions instead of truncating them",
    "typeText": "boolean"
  },
  {
    "name": "defaultExpandedIds",
    "type": "string[]",
    "required": false,
    "description": "Initially expanded branch ids (uncontrolled)",
    "typeText": "string[]"
  },
  {
    "name": "expandedIds",
    "type": "string[]",
    "required": false,
    "description": "Expanded branch ids (controlled: `v-model:expandedIds`)",
    "typeText": "string[]"
  },
  {
    "name": "renderLink",
    "type": "((item: NavTreeItem, content: VNodeChild, state: NavTreeItemState) => VNodeChild)",
    "required": false,
    "description": "Custom rendering of leaf links (e.g. a `<RouterLink>`), or the `link`\nscoped slot. Render `content` inside and put `state.className` on the\nlink",
    "typeText": "((item: NavTreeItem, content: VNodeChild, state: NavTreeItemState) => VNodeChild)"
  }
]
```

### events

```json
[
  {
    "name": "update:expandedIds",
    "type": "[expandedIds: string[]]",
    "typeText": "[expandedIds: string[]]",
    "parameters": [
      {
        "name": "expandedIds",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "type": "[expandedIds: string[]]",
    "typeText": "[expandedIds: string[]]",
    "parameters": [
      {
        "name": "expandedIds",
        "position": 0,
        "typeText": "string[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "itemSelect",
    "type": "[item: NavTreeItem]",
    "typeText": "[item: NavTreeItem]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "NavTreeItem",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "link",
    "type": "{ item: NavTreeItem; content: VNode<RendererNode, RendererElement, { [key: string]: any; }>[]; state: NavTreeItemState; }",
    "description": "Custom leaf link (like `renderLink`): render `content` inside",
    "typeText": "{ item: NavTreeItem; content: VNode<RendererNode, RendererElement, { [key: string]: any; }>[]; state: NavTreeItemState; }"
  }
]
```

### bindings

```json
[
  {
    "prop": "expandedIds",
    "event": "update:expandedIds",
    "syntax": "v-model:expandedIds"
  }
]
```

## CSS variables

```json
{
  "css:NavTree": {
    "kind": "cssVars",
    "source": "react/src/components/NavTree",
    "vars": [
      {
        "name": "--nav-tree-gap",
        "description": "Space between the sections"
      },
      {
        "name": "--nav-tree-item-height",
        "description": "Minimum height of a top-level row (defaults to the density's control height)"
      },
      {
        "name": "--nav-tree-item-padding-x",
        "description": "Horizontal padding of a row (follows the density's row padding)"
      },
      {
        "name": "--nav-tree-item-radius",
        "description": "Corner radius of a row (defaults to --radius-md)"
      },
      {
        "name": "--nav-tree-indent",
        "description": "Indentation of nested rows"
      },
      {
        "name": "--nav-tree-active-background",
        "description": "Background of the active row"
      },
      {
        "name": "--nav-tree-active-color",
        "description": "Accent color of the active row's icon"
      },
      {
        "name": "--nav-tree-hover-background",
        "description": "Background of a hovered row (defaults to --hover-color)"
      },
      {
        "name": "--nav-tree-guide-color",
        "description": "Color of the indent guide of an expanded branch (defaults to --border-color)"
      },
      {
        "name": "--nav-tree-guide-active-color",
        "description": "Color of the indent guide of the branch holding the active row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { NavTree } from "minerva-design/vue";
const active = ref("overview");
const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", href: "#overview" },
      {
        id: "projects",
        label: "Projects",
        children: [
          { id: "design", label: "Design", href: "#design" },
          { id: "web", label: "Website", href: "#web" },
        ],
      },
      { id: "settings", label: "Settings", href: "#settings" },
    ],
  },
];
</script>
<template>
  <NavTree
    :sections="sections"
    :active-id="active"
    aria-label="Workspace navigation"
    @item-select="(item) => (active = item.id)"
  /><output>Selected: {{ active }}</output>
</template>

```

## Example: collapsed

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/vue/collapsed.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { NavTree, Button, VStack } from "minerva-design/vue";
const active = ref("overview");
const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", href: "#overview" },
      {
        id: "projects",
        label: "Projects",
        children: [
          { id: "design", label: "Design", href: "#design" },
          { id: "web", label: "Website", href: "#web" },
        ],
      },
      { id: "settings", label: "Settings", href: "#settings" },
    ],
  },
];
const collapsed = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="collapsed = !collapsed">{{
      collapsed ? "Expand navigation" : "Collapse navigation"
    }}</Button
    ><NavTree
      :sections="sections"
      :active-id="active"
      :collapsed="collapsed"
      @item-select="(item) => (active = item.id)"
      aria-label="Compact navigation"
  /></VStack>
</template>

```

## Example: expansion

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/vue/expansion.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { NavTree, Button, VStack } from "minerva-design/vue";
const active = ref("overview");
const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", href: "#overview" },
      {
        id: "projects",
        label: "Projects",
        children: [
          { id: "design", label: "Design", href: "#design" },
          { id: "web", label: "Website", href: "#web" },
        ],
      },
      { id: "settings", label: "Settings", href: "#settings" },
    ],
  },
];
const expanded = ref(["projects"]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="expanded = expanded.length ? [] : ['projects']"
      >Toggle project group</Button
    ><NavTree
      v-model:expanded-ids="expanded"
      :sections="sections"
      :active-id="active"
      @item-select="(item) => (active = item.id)"
      aria-label="Controlled navigation"
    /><output>Expanded: {{ expanded.join(", ") || "none" }}</output></VStack
  >
</template>

```
