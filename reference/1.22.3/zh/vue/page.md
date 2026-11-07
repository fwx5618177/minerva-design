# Page 页面

页面骨架：Page、PageHeader、PageSection、StatCard 和 Toolbar，构建一致的页面。

Package: minerva-design@1.22.3

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Page

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Page"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "maxWidth",
    "type": "string | number",
    "required": false,
    "description": "Maximum width: numbers are pixels, strings are CSS lengths (`style` wins)",
    "typeText": "string | number"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## PageHeader

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PageHeader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "type": "string | number",
    "required": false,
    "description": "Heading text (or the `title` slot)",
    "typeText": "string | number"
  },
  {
    "name": "description",
    "type": "string | number",
    "required": false,
    "description": "Supporting text under the heading; omitted when empty (0 is rendered)",
    "typeText": "string | number"
  }
]
```

### slots

```json
[
  {
    "name": "title",
    "type": "any",
    "description": "Heading content (the `title` prop)",
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
    "description": "Supporting content (the `description` prop)",
    "typeText": "any"
  },
  {
    "name": "actions",
    "type": "any",
    "description": "Actions next to the heading",
    "typeText": "any"
  }
]
```

## PageSection

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "PageSection"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "type": "string | number",
    "required": false,
    "description": "Heading text (or the `title` slot)",
    "typeText": "string | number"
  },
  {
    "name": "description",
    "type": "string | number",
    "required": false,
    "description": "Supporting text under the heading; omitted when empty (0 is rendered)",
    "typeText": "string | number"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "description": "Section content",
    "typeText": "any"
  },
  {
    "name": "title",
    "type": "any",
    "description": "Heading content (the `title` prop)",
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
    "description": "Supporting content (the `description` prop)",
    "typeText": "any"
  },
  {
    "name": "actions",
    "type": "any",
    "description": "Actions next to the heading",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Decorative icon before the title, hidden from assistive technology",
    "typeText": "any"
  }
]
```

## StatCard

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "StatCard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "type": "string | number",
    "required": false,
    "description": "Metric name (or the `label` slot)",
    "typeText": "string | number"
  },
  {
    "name": "value",
    "type": "string | number",
    "required": false,
    "description": "Metric value (or the `value` slot; 0 is rendered)",
    "typeText": "string | number"
  },
  {
    "name": "description",
    "type": "string | number",
    "required": false,
    "description": "Explanatory text under the value (or the `description` slot)",
    "typeText": "string | number"
  }
]
```

### slots

```json
[
  {
    "name": "label",
    "type": "any",
    "description": "Metric name (the `label` prop)",
    "typeText": "any"
  },
  {
    "name": "value",
    "type": "any",
    "description": "Metric value (the `value` prop)",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Decorative icon, hidden from assistive technology",
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
    "description": "Explanatory content under the value (the `description` prop)",
    "typeText": "any"
  }
]
```

## Toolbar

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Toolbar"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "wrap",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Wraps controls onto multiple lines; `false` keeps one bounded row",
    "typeText": "boolean"
  },
  {
    "name": "density",
    "type": "ToolbarDensity",
    "default": "\"default\"",
    "required": false,
    "description": "Gap between controls: `default` (space-3) or `compact` (space-1, with\ncentered direct-child vertical dividers)",
    "typeText": "ToolbarDensity"
  },
  {
    "name": "asChild",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Applies the toolbar attributes and classes to its single child (e.g. a\nCard) instead of rendering a wrapper div",
    "typeText": "boolean"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:Page": {
    "kind": "cssVars",
    "source": "react/src/components/Page",
    "vars": [
      {
        "name": "--page-padding",
        "description": "Padding around the page content (smaller on narrow screens by default)"
      },
      {
        "name": "--page-max-width",
        "description": "Maximum readable page width (defaults to 90rem)"
      },
      {
        "name": "--page-gap",
        "description": "Space between the header and the sections"
      },
      {
        "name": "--page-title-font-size",
        "description": "Font size of the page title"
      },
      {
        "name": "--page-section-gap",
        "description": "Space between the blocks of a section"
      },
      {
        "name": "--page-section-padding",
        "description": "Inner spacing of a framed page section"
      },
      {
        "name": "--page-stat-card-padding",
        "description": "Inner padding of a stat card"
      },
      {
        "name": "--page-stat-card-radius",
        "description": "Corner radius of a stat card (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/page/vue/basic.vue

```vue
<script setup lang="ts">
import { Page, PageHeader, PageSection } from "minerva-design/vue";
</script>
<template>
  <Page max-width="900px"
    ><PageHeader
      title="Projects"
      description="Manage your team’s work"
    /><PageSection title="Recent activity"
      ><p>No updates today.</p></PageSection
    ></Page
  >
</template>

```

## Example: stat-cards

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/page/vue/stat-cards.vue

```vue
<script setup lang="ts">
import { ResponsiveGrid, StatCard } from "minerva-design/vue";
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 3 }" :gap="4"
    ><StatCard
      label="Revenue"
      value="$24,560"
      description="+12% this month" /><StatCard
      label="Customers"
      :value="1280"
      description="84 new customers" /><StatCard
      label="Availability"
      value="99.9%"
      description="Last 30 days"
  /></ResponsiveGrid>
</template>

```

## Example: toolbar

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/page/vue/toolbar.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Page,
  PageHeader,
  PageSection,
  Toolbar,
  Button,
  Input,
} from "minerva-design/vue";
const query = ref("");
const invited = ref(0);
</script>
<template>
  <Page
    ><PageHeader title="Members"
      ><template #actions
        ><Button @click="invited++">Invite member</Button></template
      ></PageHeader
    ><Toolbar wrap
      ><Input
        v-model="query"
        aria-label="Search members"
        placeholder="Search members"
      /><output
        >{{ invited }} invitations · {{ query || "All members" }}</output
      ></Toolbar
    ><PageSection title="Directory"
      ><p>Search and manage your members.</p></PageSection
    ></Page
  >
</template>

```
