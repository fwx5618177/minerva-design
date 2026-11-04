# Empty

Placeholder shown when there is no data to display.

Package: minerva-design@1.20.5

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Empty

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "Empty"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "type": "false | null",
    "required": false,
    "description": "`null` or `false` render no icon at all (the `icon` slot replaces the\ndefault one)",
    "typeText": "false | null"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Heading of the empty state (or the `title` slot); also becomes its accessible name",
    "typeText": "string"
  },
  {
    "name": "description",
    "type": "string | null",
    "required": false,
    "description": "Description text (or the `description` slot); `null` hides it",
    "typeText": "string | null"
  },
  {
    "name": "size",
    "type": "EmptySize",
    "required": false,
    "description": "Switches to the unframed sized layout (transparent background, size-based\npadding, icon and font sizes). Omit it for the classic surface layout",
    "typeText": "EmptySize"
  },
  {
    "name": "useSvg",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Uses the built-in SVG illustration instead of the default icon",
    "typeText": "boolean"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the container (a number is in px)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the container (a number is in px)",
    "typeText": "string | number"
  },
  {
    "name": "showShadow",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Adds a drop shadow",
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
    "description": "Footer content, e.g. an action button",
    "typeText": "any"
  },
  {
    "name": "icon",
    "type": "any",
    "description": "Custom icon, replacing the default one",
    "typeText": "any"
  },
  {
    "name": "title",
    "type": "any",
    "description": "Heading (the `title` prop)",
    "typeText": "any"
  },
  {
    "name": "description",
    "type": "any",
    "description": "Description (the `description` prop)",
    "typeText": "any"
  },
  {
    "name": "action",
    "type": "any",
    "description": "Primary call to action (a Button, a link or a group of them)",
    "typeText": "any"
  },
  {
    "name": "secondary-action",
    "type": "any",
    "description": "Secondary action rendered after `action`",
    "typeText": "any"
  }
]
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

## Example: actions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/empty/vue/actions.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { Empty, Button } from "minerva-design/vue";
const created = ref(false);
</script>
<template>
  <Empty
    v-if="!created"
    title="Create your first project"
    description="Start by creating a project to organize your work."
    ><template #action
      ><Button @click="created = true">Create project</Button></template
    ></Empty
  ><output v-else>Project created</output>
</template>

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/vue/basic.vue

```vue
<script setup lang="ts">
import { Empty } from "minerva-design/vue";
</script>
<template>
  <Empty
    title="No projects yet"
    description="Create a project to get started."
  />
</template>

```

## Example: sizes-styles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/empty/vue/sizes-styles.vue

```vue
<script setup lang="ts">
import { Empty, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Empty size="small" title="No matches" :icon="false" /><Empty
      size="large"
      title="All caught up"
      description="Nothing requires your attention."
      :show-shadow="false"
  /></HStack>
</template>

```
