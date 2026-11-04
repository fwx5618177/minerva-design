# AppShell 应用外壳

应用外壳：可折叠或浮动的侧边栏、吸顶头部和唯一的 main 地标；768px 及以下时导航移入抽屉。

Package: minerva-design@1.20.5

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## AppShell

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "AppShell"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "brand",
    "type": "string",
    "required": false,
    "description": "Brand shown at the top of the sidebar (not a page heading), or the `brand` slot",
    "typeText": "string"
  },
  {
    "name": "navigationLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the sidebar landmark and title of the mobile drawer",
    "typeText": "string"
  },
  {
    "name": "navigationKey",
    "type": "string",
    "required": false,
    "description": "Change it when a route commits to dismiss the mobile navigation",
    "typeText": "string"
  },
  {
    "name": "sidebarMode",
    "type": "AppShellSidebarMode",
    "required": false,
    "description": "Sidebar mode (controlled, `v-model:sidebar-mode`)",
    "typeText": "AppShellSidebarMode"
  },
  {
    "name": "defaultSidebarMode",
    "type": "AppShellSidebarMode",
    "required": false,
    "description": "Initial sidebar mode (uncontrolled)",
    "typeText": "AppShellSidebarMode"
  },
  {
    "name": "labels",
    "type": "Partial<AppShellLabels>",
    "required": false,
    "description": "Overrides of the control names (localized defaults)",
    "typeText": "Partial<AppShellLabels>"
  },
  {
    "name": "skipLink",
    "type": "string | boolean",
    "default": "true",
    "required": false,
    "description": "\"Skip to content\" link rendered as the first focusable element (visually\nhidden until focused); it moves focus to `main`. A string replaces its\ntext, `false` removes it",
    "typeText": "string | boolean"
  }
]
```

### events

```json
[
  {
    "name": "update:sidebarMode",
    "type": "[mode: AppShellSidebarMode]",
    "typeText": "[mode: AppShellSidebarMode]",
    "parameters": [
      {
        "name": "mode",
        "position": 0,
        "typeText": "AppShellSidebarMode",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "sidebarModeChange",
    "type": "[mode: AppShellSidebarMode]",
    "typeText": "[mode: AppShellSidebarMode]",
    "parameters": [
      {
        "name": "mode",
        "position": 0,
        "typeText": "AppShellSidebarMode",
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
    "name": "navigation",
    "type": "AppShellNavigationState",
    "description": "The navigation, rendered in exactly one place: the sidebar on desktop,\nthe drawer on mobile",
    "typeText": "AppShellNavigationState"
  },
  {
    "name": "brand",
    "type": "any",
    "description": "Brand (the `brand` prop)",
    "typeText": "any"
  },
  {
    "name": "brand-icon",
    "type": "any",
    "description": "Decorative brand icon, still visible in the compact rail",
    "typeText": "any"
  },
  {
    "name": "header-actions",
    "type": "any",
    "description": "Content of the top header bar (account menu, search...), outside `main`",
    "typeText": "any"
  },
  {
    "name": "page-navigation",
    "type": "any",
    "description": "Rendered between the header and `main` (e.g. open-page tabs)",
    "typeText": "any"
  },
  {
    "name": "default",
    "type": "any",
    "description": "Page content, rendered inside the single `main` landmark",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "sidebarMode",
    "event": "update:sidebarMode",
    "syntax": "v-model:sidebarMode"
  }
]
```

## CSS variables

```json
{
  "css:AppShell": {
    "kind": "cssVars",
    "source": "react/src/components/AppShell",
    "vars": [
      {
        "name": "--app-shell-sidebar-width",
        "description": "Width of the expanded sidebar"
      },
      {
        "name": "--app-shell-rail-width",
        "description": "Width of the compact / floating rail"
      },
      {
        "name": "--app-shell-header-height",
        "description": "Minimum height of the header and the sidebar brand row"
      },
      {
        "name": "--app-shell-background",
        "description": "Background of the page area"
      },
      {
        "name": "--app-shell-sidebar-background",
        "description": "Background of the sidebar and the mobile navigation drawer"
      },
      {
        "name": "--app-shell-header-background",
        "description": "Background of the sticky header"
      },
      {
        "name": "--app-shell-drawer-width",
        "description": "Width of the mobile navigation drawer"
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

### apps/docs/src/docs/pages/app-shell/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  PageSection,
} from "minerva-design/vue";
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
  <AppShell
    brand="Minerva"
    style="height: 440px; min-height: 0"
    :navigation-key="active"
    ><template #navigation="{ collapsed, closeNavigation }"
      ><NavTree
        :sections="sections"
        :active-id="active"
        :collapsed="collapsed"
        @item-select="
          (item) => {
            active = item.id;
            closeNavigation();
          }
        " /></template
    ><Page
      ><PageHeader
        :title="active"
        description="Your team workspace"
      /><PageSection title="Overview"
        ><p>Choose an item in the navigation.</p></PageSection
      ></Page
    ></AppShell
  >
</template>

```

## Example: controlled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/vue/controlled.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  PageSection,
  Button,
  VStack,
} from "minerva-design/vue";
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
const mode = ref<"expanded" | "compact" | "floating">("expanded");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="mode = mode === 'expanded' ? 'compact' : 'expanded'"
      >Toggle sidebar: {{ mode }}</Button
    ><AppShell
      brand="Minerva"
      v-model:sidebar-mode="mode"
      style="height: 440px; min-height: 0"
      :navigation-key="active"
      ><template #navigation="{ collapsed, closeNavigation }"
        ><NavTree
          :sections="sections"
          :active-id="active"
          :collapsed="collapsed"
          @item-select="
            (item) => {
              active = item.id;
              closeNavigation();
            }
          " /></template
      ><Page
        ><PageHeader
          :title="active"
          description="Your team workspace"
        /><PageSection title="Overview"
          ><p>Choose an item in the navigation.</p></PageSection
        ></Page
      ></AppShell
    ></VStack
  >
</template>

```

## Example: sidebar-modes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/vue/sidebar-modes.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  PageSection,
  Button,
  HStack,
} from "minerva-design/vue";
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
const modes = ["expanded", "compact", "floating"] as const;
const mode = ref<(typeof modes)[number]>("floating");
</script>
<template>
  <HStack :gap="3" wrap
    ><Button
      v-for="item in modes"
      :key="item"
      variant="outline"
      @click="mode = item"
      >{{ item }}</Button
    ></HStack
  ><AppShell
    brand="Minerva"
    v-model:sidebar-mode="mode"
    style="height: 440px; min-height: 0"
    :navigation-key="active"
    ><template #navigation="{ collapsed, closeNavigation }"
      ><NavTree
        :sections="sections"
        :active-id="active"
        :collapsed="collapsed"
        @item-select="
          (item) => {
            active = item.id;
            closeNavigation();
          }
        " /></template
    ><Page
      ><PageHeader
        :title="active"
        description="Your team workspace"
      /><PageSection title="Overview"
        ><p>Choose an item in the navigation.</p></PageSection
      ></Page
    ></AppShell
  >
</template>

```
